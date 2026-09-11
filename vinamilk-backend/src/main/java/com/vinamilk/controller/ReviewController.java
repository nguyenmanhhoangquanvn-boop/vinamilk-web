package com.vinamilk.controller;

import com.vinamilk.dto.ReviewDto;
import com.vinamilk.entity.User;
import com.vinamilk.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products/{productId}/reviews")
public class ReviewController {
  private final ReviewService reviewService;
  public ReviewController(ReviewService reviewService) { this.reviewService=reviewService; }
  @GetMapping public List<ReviewDto.ReviewResponse> all(@PathVariable Long productId) { return reviewService.findForProduct(productId); }
  @PostMapping @ResponseStatus(HttpStatus.CREATED) public ReviewDto.ReviewResponse create(@PathVariable Long productId, @AuthenticationPrincipal User user, @Valid @RequestBody ReviewDto.CreateReviewRequest req) { return reviewService.create(productId,user,req); }
}
