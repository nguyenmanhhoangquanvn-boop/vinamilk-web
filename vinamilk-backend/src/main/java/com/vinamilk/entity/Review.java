package com.vinamilk.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "reviews", uniqueConstraints = @UniqueConstraint(columnNames = {"product_id", "user_id"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(name = "product_id", nullable = false)
  private Long productId;
  
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;
  
  @Column(nullable = false)
  private Integer rating;
  
  private String comment;
  
  @Column(nullable = false, updatable = false)
  private Long createdAt = System.currentTimeMillis();
}
