package com.vinamilk.repository;

import com.vinamilk.entity.Order;
import com.vinamilk.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
  List<Order> findByUserOrderByCreatedAtDesc(User user);
  Optional<Order> findByOrderId(String orderId);
  List<Order> findAllByOrderByCreatedAtDesc();
}
