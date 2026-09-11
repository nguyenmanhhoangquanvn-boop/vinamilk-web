package com.vinamilk.service;

import com.vinamilk.dto.ProductDto;
import com.vinamilk.entity.Product;
import com.vinamilk.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class ProductService {
  private final ProductRepository productRepository;

  public ProductService(ProductRepository productRepository) { this.productRepository = productRepository; }

  public List<ProductDto.ProductResponse> findAll(String search, String category) {
    return productRepository.findByActiveTrue().stream()
        .filter(p -> search == null || search.isBlank() || p.getName().toLowerCase().contains(search.toLowerCase()) || p.getCategory().toLowerCase().contains(search.toLowerCase()))
        .filter(p -> category == null || category.isBlank() || p.getCategory().equalsIgnoreCase(category))
        .map(this::toResponse).toList();
  }

  public ProductDto.ProductResponse findById(Long id) { return toResponse(getEntity(id)); }
  public Product getEntity(Long id) { return productRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy sản phẩm")); }

  public ProductDto.ProductResponse create(ProductDto.CreateProductRequest req) {
    Product product = new Product(); apply(product, req); return toResponse(productRepository.save(product));
  }
  public ProductDto.ProductResponse update(Long id, ProductDto.CreateProductRequest req) {
    Product product = getEntity(id); apply(product, req); return toResponse(productRepository.save(product));
  }
  public void delete(Long id) { productRepository.delete(getEntity(id)); }

  private void apply(Product p, ProductDto.CreateProductRequest req) {
    p.setName(req.getName().trim()); p.setDescription(req.getDescription()); p.setPrice(req.getPrice()); p.setOldPrice(req.getOldPrice());
    p.setCategory(req.getCategory().trim()); p.setImage(req.getImage()); p.setStock(req.getStock()); p.setEmoji(req.getEmoji());
    p.setDiscount(req.getDiscount() == null ? 0 : req.getDiscount()); p.setActive(true);
  }
  public ProductDto.ProductResponse toResponse(Product p) {
    ProductDto.ProductResponse dto = new ProductDto.ProductResponse();
    dto.setId(p.getId()); dto.set_id(String.valueOf(p.getId())); dto.setName(p.getName()); dto.setDescription(p.getDescription());
    dto.setPrice(p.getPrice()); dto.setOldPrice(p.getOldPrice()); dto.setCategory(p.getCategory()); dto.setImage(p.getImage());
    dto.setDiscount(p.getDiscount()); dto.setStock(p.getStock()); dto.setRating(p.getRating()); dto.setSold(p.getSold()); dto.setEmoji(p.getEmoji()); return dto;
  }
}
