package com.vinamilk.service;

import com.vinamilk.dto.ReviewDto;
import com.vinamilk.entity.*;
import com.vinamilk.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ReviewService {
  private final ReviewRepository reviewRepository; private final ProductRepository productRepository;
  public ReviewService(ReviewRepository reviewRepository, ProductRepository productRepository) { this.reviewRepository=reviewRepository; this.productRepository=productRepository; }
  public List<ReviewDto.ReviewResponse> findForProduct(Long productId) { requireProduct(productId); return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId).stream().map(this::toResponse).toList(); }
  public ReviewDto.ReviewResponse create(Long productId, User user, ReviewDto.CreateReviewRequest request) { requireProduct(productId); if (reviewRepository.existsByProductIdAndUserId(productId, user.getId())) throw new ResponseStatusException(HttpStatus.CONFLICT, "Bạn đã đánh giá sản phẩm này"); Review review = new Review(); review.setProductId(productId); review.setUser(user); review.setRating(request.getRating()); review.setComment(request.getComment().trim()); return toResponse(reviewRepository.save(review)); }
  private void requireProduct(Long id) { if (!productRepository.existsById(id)) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy sản phẩm"); }
  private ReviewDto.ReviewResponse toResponse(Review review) { ReviewDto.ReviewResponse dto = new ReviewDto.ReviewResponse(); dto.setId(review.getId()); dto.setProductId(review.getProductId()); dto.setName(review.getUser().getFullName()); dto.setStars(review.getRating()); dto.setContent(review.getComment()); dto.setCreatedAt(review.getCreatedAt()); dto.setDate(DateTimeFormatter.ofPattern("dd/MM/yyyy").withZone(ZoneId.of("Asia/Ho_Chi_Minh")).format(Instant.ofEpochMilli(review.getCreatedAt()))); return dto; }
}
