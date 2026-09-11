package com.vinamilk.repository;

import com.vinamilk.entity.OrderItem;
import com.vinamilk.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
  List<OrderItem> findByOrder(Order order);
}
