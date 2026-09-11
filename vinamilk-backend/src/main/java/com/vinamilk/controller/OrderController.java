package com.vinamilk.controller;

import com.vinamilk.dto.OrderDto;
import com.vinamilk.entity.User;
import com.vinamilk.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
  private final OrderService orderService;
  public OrderController(OrderService orderService) { this.orderService=orderService; }
  @PostMapping @ResponseStatus(HttpStatus.CREATED) public OrderDto.OrderResponse create(@AuthenticationPrincipal User user, @Valid @RequestBody OrderDto.CreateOrderRequest req) { return orderService.create(user, req); }
  @GetMapping public List<OrderDto.OrderResponse> all(@AuthenticationPrincipal User user) { return user.getRole()==User.Role.ADMIN ? orderService.findAll() : orderService.findForUser(user); }
  @GetMapping("/{id}") public OrderDto.OrderResponse one(@AuthenticationPrincipal User user, @PathVariable String id) { return orderService.findOne(user,id); }
  @PatchMapping("/{id}/cancel") public OrderDto.OrderResponse cancel(@AuthenticationPrincipal User user, @PathVariable String id) { return orderService.cancel(user, id); }
}
