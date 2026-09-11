package com.vinamilk.dto;

import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDto {
  @Data
  public static class RegisterRequest {
    @NotBlank(message = "Họ tên không được để trống")
    private String fullName;
    
    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không đúng định dạng")
    private String email;
    
    @NotBlank(message = "Mật khẩu không được để trống")
    @Size(min = 6, message = "Mật khẩu ít nhất 6 ký tự")
    private String password;
    
    private String phone;
  }

  @Data
  public static class LoginRequest {
    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không đúng định dạng")
    private String email;
    
    @NotBlank(message = "Mật khẩu không được để trống")
    private String password;
  }

  @Data
  public static class LoginResponse {
    private String access_token;
    private UserResponse user;
    
    public LoginResponse(String token, UserResponse user) {
      this.access_token = token;
      this.user = user;
    }
  }

  @Data
  public static class UserResponse {
    private Long id;
    private String email;
    private String fullName;
    private String phone;
    private String address;
    private String role;
  }
}
