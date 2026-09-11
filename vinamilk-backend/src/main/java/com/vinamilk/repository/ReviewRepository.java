package com.vinamilk.repository;

import com.vinamilk.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
  @EntityGraph(attributePaths = "user")
  List<Review> findByProductIdOrderByCreatedAtDesc(Long productId);
  boolean existsByProductIdAndUserId(Long productId, Long userId);
}
