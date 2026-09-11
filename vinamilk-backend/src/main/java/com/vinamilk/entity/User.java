package com.vinamilk.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(unique = true, nullable = false)
  private String email;
  
  @Column(nullable = false)
  private String password;
  
  @Column(nullable = false)
  private String fullName;
  
  private String phone;
  private String address;
  
  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Role role = Role.USER;
  
  @Column(nullable = false)
  private Boolean active = true;
  
  @Column(name = "created_at", nullable = false, updatable = false)
  private Long createdAt = System.currentTimeMillis();
  
  public enum Role { ADMIN, USER }
}
