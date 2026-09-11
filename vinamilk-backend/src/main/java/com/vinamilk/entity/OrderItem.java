package com.vinamilk.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "order_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "order_id", nullable = false)
  private Order order;
  
  @Column(nullable = false)
  private Long productId;
  
  @Column(nullable = false)
  private String productName;
  
  @Column(nullable = false)
  private Long price;
  
  @Column(nullable = false)
  private Integer quantity;
  
  private String category;
  private String image;
}
