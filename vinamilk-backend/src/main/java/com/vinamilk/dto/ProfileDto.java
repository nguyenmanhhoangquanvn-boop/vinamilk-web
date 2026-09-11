package com.vinamilk.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

public class ProfileDto {
  @Data
  public static class UpdateProfileRequest {
    @NotBlank(message = "Họ tên không được để trống")
    private String fullName;
    private String phone;
    private String address;
  }

  @Data
  public static class ChangePasswordRequest {
    @NotBlank(message = "Mật khẩu hiện tại không được để trống")
    private String currentPassword;
    
    @NotBlank(message = "Mật khẩu mới không được để trống")
    private String newPassword;
  }
}
