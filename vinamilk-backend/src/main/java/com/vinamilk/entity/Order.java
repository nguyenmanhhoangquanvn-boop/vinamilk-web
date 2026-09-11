package com.vinamilk.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(nullable = false)
  private String orderId;
  
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;
  
  @Column(nullable = false)
  private String fullName;
  
  @Column(nullable = false)
  private String phone;
  
  @Column(nullable = false)
  private String address;
  
  private String note;
  
  @Column(nullable = false)
  private Long subtotal;
  
  @Column(nullable = false)
  private Long shipping = 0L;
  
  @Column(nullable = false)
  private Long total;
  
  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Status status = Status.PENDING;
  
  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private PaymentMethod paymentMethod;
  
  @Column(nullable = false, updatable = false)
  private Long createdAt = System.currentTimeMillis();
  
  @Column(nullable = false)
  private Long updatedAt = System.currentTimeMillis();
  
  public enum Status { PENDING, CONFIRMED, SHIPPING, DELIVERED, CANCELLED }
  public enum PaymentMethod { COD, BANK, EWALLET }
}
