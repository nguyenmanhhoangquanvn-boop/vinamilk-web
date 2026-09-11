package com.vinamilk.controller;

import com.vinamilk.dto.ProductDto;
import com.vinamilk.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
  private final ProductService productService;
  public ProductController(ProductService productService) { this.productService=productService; }
  @GetMapping public List<ProductDto.ProductResponse> all(@RequestParam(required=false) String search, @RequestParam(required=false) String category) { return productService.findAll(search, category); }
  @GetMapping("/{id}") public ProductDto.ProductResponse one(@PathVariable Long id) { return productService.findById(id); }
  @PostMapping @ResponseStatus(HttpStatus.CREATED) public ProductDto.ProductResponse create(@Valid @RequestBody ProductDto.CreateProductRequest req) { return productService.create(req); }
  @PutMapping("/{id}") public ProductDto.ProductResponse update(@PathVariable Long id, @Valid @RequestBody ProductDto.CreateProductRequest req) { return productService.update(id, req); }
  @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id) { productService.delete(id); }
}
