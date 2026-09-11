package com.vinamilk.dto;

import lombok.Data;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class ProductDto {
  @Data
  public static class ProductResponse {
    private Long id;
    private String _id;
    private String name;
    private String description;
    private Long price;
    private Long oldPrice;
    private String category;
    private String image;
    private Integer discount;
    private Integer stock;
    private Double rating;
    private Integer sold;
    private String emoji;
  }

  @Data
  public static class CreateProductRequest {
    @NotBlank(message = "Tên không được để trống")
    private String name;
    private String description;
    
    @NotNull(message = "Giá không được để trống")
    @Min(value = 0, message = "Giá không được âm")
    private Long price;
    
    private Long oldPrice;
    
    @NotBlank(message = "Danh mục không được để trống")
    private String category;
    
    private String image;
    private Integer discount = 0;
    
    @NotNull(message = "Tồn kho không được để trống")
    @Min(value = 0, message = "Tồn kho không được âm")
    private Integer stock = 0;
    
    private String emoji = "🥛";
  }
}
