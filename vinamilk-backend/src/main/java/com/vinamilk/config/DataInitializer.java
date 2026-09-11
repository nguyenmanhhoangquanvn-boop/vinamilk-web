package com.vinamilk.config;

import com.vinamilk.entity.Product;
import com.vinamilk.entity.User;
import com.vinamilk.repository.ProductRepository;
import com.vinamilk.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
public class DataInitializer {
  @Bean
  CommandLineRunner seed(UserRepository users, ProductRepository products, PasswordEncoder encoder) {
    return args -> {
      if (!users.existsByEmail("admin@vinamilk.local")) {
        User admin = new User();
        admin.setEmail("admin@vinamilk.local");
        admin.setPassword(encoder.encode("Admin@123"));
        admin.setFullName("Vinamilk Admin");
        admin.setRole(User.Role.ADMIN);
        admin.setActive(true);
        users.save(admin);
      }
      if (!users.existsByEmail("user@vinamilk.local")) {
        User user = new User();
        user.setEmail("user@vinamilk.local");
        user.setPassword(encoder.encode("User@123"));
        user.setFullName("Vinamilk User");
        user.setRole(User.Role.USER);
        user.setActive(true);
        users.save(user);
      }
      if (products.count() == 0) {
        products.saveAll(List.of(
            product("Sữa tươi tiệt trùng có đường 1L", "Sữa tươi", 29000L, 36000L, 120, "🥛", "https://images.unsplash.com/photo-1600788148184-403f7691d8a1?w=300&h=300&fit=crop"),
            product("Sữa chua uống Probi 65ml", "Sữa chua", 12000L, 15000L, 200, "🧴", "https://images.unsplash.com/photo-1584308666744-24d5f400f7d2?w=300&h=300&fit=crop"),
            product("Sữa đặc Ông Thọ nhãn vàng 380g", "Sữa đặc", 22000L, 26000L, 150, "🥫", "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=300&fit=crop"),
            product("Dielac Alpha Gold S4 900g", "Sữa bột", 375000L, 420000L, 50, "🍼", "https://images.unsplash.com/photo-1618164436241-4473940571db?w=300&h=300&fit=crop"),
            product("Sữa hạt Vinamilk 9 loại hạt", "Sữa thực vật", 35000L, 40000L, 100, "🌾", "https://images.unsplash.com/photo-1585518419759-efe2a6d6c789?w=300&h=300&fit=crop"),
            product("Vinamilk Gelato Sôcôla 400ml", "Kem", 79000L, 89000L, 30, "🍫", "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=300&fit=crop")));
      }
    };
  }

  private Product product(String name, String category, long price, long oldPrice, int stock, String emoji, String image) {
    Product p = new Product();
    p.setName(name); p.setCategory(category); p.setPrice(price); p.setOldPrice(oldPrice);
    p.setStock(stock); p.setEmoji(emoji); p.setImage(image); p.setDiscount((int) Math.max(0, Math.round((1 - (double) price / oldPrice) * 100)));
    p.setRating(4.8); p.setSold(0); p.setActive(true);
    return p;
  }
}
