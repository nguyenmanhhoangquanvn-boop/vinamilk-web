package com.vinamilk.repository;

import com.vinamilk.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
  List<Product> findByCategoryAndActiveTrue(String category);
  List<Product> findByActiveTrue();
}
