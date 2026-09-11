package com.vinamilk.dto;

import lombok.Data;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class OrderDto {
  @Data
  public static class CreateOrderRequest {
    @NotEmpty(message = "Danh sách sản phẩm không được trống")
    private List<@Valid OrderItemRequest> items;
    
    @NotBlank(message = "Họ tên người nhận không được trống")
    private String fullName;
    
    @NotBlank(message = "Số điện thoại không được trống")
    private String phone;
    
    @NotBlank(message = "Địa chỉ nhận hàng không được trống")
    private String address;
    
    private String note;
    
    @NotBlank(message = "Phương thức thanh toán không được trống")
    private String paymentMethod;
  }

  @Data
  public static class OrderItemRequest {
    @NotNull(message = "Mã sản phẩm không được trống")
    private Long productId;
    
    @NotNull(message = "Số lượng không được trống")
    @Min(value = 1, message = "Số lượng phải lớn hơn 0")
    private Integer quantity;
  }

  @Data
  public static class OrderResponse {
    private Long id;
    private String _id;
    private String orderId;
    private String fullName;
    private String phone;
    private String address;
    private String note;
    private Long subtotal;
    private Long shipping;
    private Long total;
    private String status;
    private String paymentMethod;
    private String date;
    private Long createdAt;
    private List<OrderItemResponse> items;
  }

  @Data
  public static class OrderItemResponse {
    private Long productId;
    private String name;
    private Long price;
    private Integer quantity;
    private String category;
    private String image;
    private String emoji;
  }
}
