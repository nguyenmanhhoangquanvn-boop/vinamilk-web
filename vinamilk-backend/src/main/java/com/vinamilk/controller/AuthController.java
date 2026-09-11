package com.vinamilk.controller;

import com.vinamilk.dto.*;
import com.vinamilk.entity.User;
import com.vinamilk.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final AuthService authService;
  public AuthController(AuthService authService) { this.authService = authService; }

  @PostMapping("/register")
  @ResponseStatus(HttpStatus.CREATED)
  public Map<String, Object> register(@Valid @RequestBody AuthDto.RegisterRequest request) { return Map.of("message", "Đăng ký thành công", "user", authService.register(request)); }
  @PostMapping("/login")
  public AuthDto.LoginResponse login(@Valid @RequestBody AuthDto.LoginRequest request) { return authService.login(request); }
  @GetMapping("/me")
  public AuthDto.UserResponse me(@AuthenticationPrincipal User user) { return authService.getMe(user); }
  @PutMapping("/me")
  public AuthDto.UserResponse update(@AuthenticationPrincipal User user, @Valid @RequestBody ProfileDto.UpdateProfileRequest request) { return authService.updateProfile(user, request); }
  @PutMapping("/password")
  public Map<String, Object> password(@AuthenticationPrincipal User user, @Valid @RequestBody ProfileDto.ChangePasswordRequest request) { authService.changePassword(user, request); return Map.of("success", true, "message", "Đổi mật khẩu thành công"); }
}
