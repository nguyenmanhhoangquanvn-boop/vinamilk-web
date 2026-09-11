package com.vinamilk.dto;

import lombok.Data;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ReviewDto {
  @Data
  public static class CreateReviewRequest {
    @NotNull(message = "Số sao không được trống")
    @Min(value = 1, message = "Tối thiểu 1 sao")
    @Max(value = 5, message = "Tối đa 5 sao")
    private Integer rating;
    
    @NotBlank(message = "Nội dung đánh giá không được để trống")
    private String comment;
  }

  @Data
  public static class ReviewResponse {
    private Long id;
    private Long productId;
    private String name;
    private Integer stars;
    private String content;
    private String date;
    private Long createdAt;
  }
}
