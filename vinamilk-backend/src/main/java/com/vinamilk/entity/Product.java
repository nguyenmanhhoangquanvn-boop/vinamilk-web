package com.vinamilk.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(nullable = false)
  private String name;
  
  private String description;
  
  @Column(nullable = false)
  private Long price;
  
  private Long oldPrice;
  
  @Column(name = "category", nullable = false)
  private String category;
  
  private String image;
  
  @Column(name = "discount")
  private Integer discount = 0;
  
  @Column(name = "stock", nullable = false)
  private Integer stock = 0;
  
  @Column(name = "rating")
  private Double rating = 4.5;
  
  @Column(name = "sold")
  private Integer sold = 0;
  
  @Column(name = "emoji")
  private String emoji = "🥛";
  
  @Column(name = "active", nullable = false)
  private Boolean active = true;
}
