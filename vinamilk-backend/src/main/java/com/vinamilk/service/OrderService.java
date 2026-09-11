package com.vinamilk.service;

import com.vinamilk.dto.OrderDto;
import com.vinamilk.entity.*;
import com.vinamilk.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class OrderService {
  private final OrderRepository orderRepository; private final OrderItemRepository orderItemRepository; private final ProductRepository productRepository;
  public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, ProductRepository productRepository) { this.orderRepository=orderRepository; this.orderItemRepository=orderItemRepository; this.productRepository=productRepository; }

  @Transactional
  public OrderDto.OrderResponse create(User user, OrderDto.CreateOrderRequest request) {
    Map<Long, Product> products = new HashMap<>(); long subtotal = 0;
    for (OrderDto.OrderItemRequest item : request.getItems()) {
      Product product = productRepository.findById(item.getProductId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy sản phẩm: " + item.getProductId()));
      if (!product.getActive()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sản phẩm hiện không bán: " + product.getName());
      if (item.getQuantity() > product.getStock()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Số lượng vượt tồn kho: " + product.getName());
      products.put(product.getId(), product); subtotal += product.getPrice() * item.getQuantity();
    }
    long shipping = subtotal >= 200000 ? 0 : 30000;
    Order order = new Order(); order.setOrderId("VNM" + System.currentTimeMillis()); order.setUser(user); order.setFullName(request.getFullName().trim()); order.setPhone(request.getPhone().trim()); order.setAddress(request.getAddress().trim()); order.setNote(request.getNote()); order.setPaymentMethod(parsePayment(request.getPaymentMethod())); order.setSubtotal(subtotal); order.setShipping(shipping); order.setTotal(subtotal + shipping); order.setStatus(Order.Status.PENDING); order = orderRepository.save(order);
    for (OrderDto.OrderItemRequest req : request.getItems()) {
      Product product = products.get(req.getProductId()); OrderItem item = new OrderItem(); item.setOrder(order); item.setProductId(product.getId()); item.setProductName(product.getName()); item.setPrice(product.getPrice()); item.setQuantity(req.getQuantity()); item.setCategory(product.getCategory()); item.setImage(product.getImage()); orderItemRepository.save(item); product.setStock(product.getStock() - req.getQuantity()); product.setSold(product.getSold() + req.getQuantity()); productRepository.save(product);
    }
    return toResponse(order);
  }
  public List<OrderDto.OrderResponse> findForUser(User user) { return orderRepository.findByUserOrderByCreatedAtDesc(user).stream().map(this::toResponse).toList(); }
  public OrderDto.OrderResponse findOne(User user, String id) { Order order = orderRepository.findByOrderId(id).or(() -> { try { return orderRepository.findById(Long.valueOf(id)); } catch (NumberFormatException e) { return Optional.empty(); } }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy đơn hàng")); if (!order.getUser().getId().equals(user.getId()) && user.getRole()!=User.Role.ADMIN) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Không có quyền xem đơn hàng này"); return toResponse(order); }
  @Transactional
  public OrderDto.OrderResponse cancel(User user, String id) {
    Order order = orderRepository.findByOrderId(id).or(() -> { 
      try { return orderRepository.findById(Long.valueOf(id)); } 
      catch (NumberFormatException e) { return Optional.empty(); } 
    }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy đơn hàng"));
    
    if (!order.getUser().getId().equals(user.getId()) && user.getRole()!=User.Role.ADMIN)
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Không có quyền hủy đơn hàng này");
    
    if (order.getStatus() == Order.Status.DELIVERED)
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Không thể hủy đơn hàng đã giao");
    
    if (order.getStatus() == Order.Status.CANCELLED)
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Đơn hàng đã bị hủy rồi");
    
    if (order.getStatus() == Order.Status.SHIPPING)
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Không thể hủy đơn hàng đang giao. Liên hệ support");
    
    for (OrderItem item : orderItemRepository.findByOrder(order)) {
      Product product = productRepository.findById(item.getProductId()).orElse(null);
      if (product != null) {
        product.setStock(product.getStock() + item.getQuantity());
        product.setSold(Math.max(0, product.getSold() - item.getQuantity()));
        productRepository.save(product);
      }
    }
    
    order.setStatus(Order.Status.CANCELLED);
    order.setUpdatedAt(System.currentTimeMillis());
    order = orderRepository.save(order);
    return toResponse(order);
  }
  public List<OrderDto.OrderResponse> findAll() { return orderRepository.findAllByOrderByCreatedAtDesc().stream().map(this::toResponse).toList(); }
  private Order.PaymentMethod parsePayment(String raw) { try { return Order.PaymentMethod.valueOf(raw.trim().toUpperCase()); } catch (Exception e) { throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Phương thức thanh toán không hợp lệ"); } }
  public OrderDto.OrderResponse toResponse(Order order) { OrderDto.OrderResponse dto = new OrderDto.OrderResponse(); dto.setId(order.getId()); dto.set_id(String.valueOf(order.getId())); dto.setOrderId(order.getOrderId()); dto.setFullName(order.getFullName()); dto.setPhone(order.getPhone()); dto.setAddress(order.getAddress()); dto.setNote(order.getNote()); dto.setSubtotal(order.getSubtotal()); dto.setShipping(order.getShipping()); dto.setTotal(order.getTotal()); dto.setStatus(order.getStatus().name().toLowerCase()); dto.setPaymentMethod(order.getPaymentMethod().name().toLowerCase()); dto.setCreatedAt(order.getCreatedAt()); dto.setDate(DateTimeFormatter.ofPattern("dd/MM/yyyy").withZone(ZoneId.of("Asia/Ho_Chi_Minh")).format(Instant.ofEpochMilli(order.getCreatedAt()))); dto.setItems(orderItemRepository.findByOrder(order).stream().map(item -> { OrderDto.OrderItemResponse i = new OrderDto.OrderItemResponse(); i.setProductId(item.getProductId()); i.setName(item.getProductName()); i.setPrice(item.getPrice()); i.setQuantity(item.getQuantity()); i.setCategory(item.getCategory()); i.setImage(item.getImage()); i.setEmoji("🥛"); return i; }).toList()); return dto; }
}
