package com.vinamilk.service;

import com.vinamilk.dto.AuthDto;
import com.vinamilk.dto.ProfileDto;
import com.vinamilk.entity.User;
import com.vinamilk.repository.UserRepository;
import com.vinamilk.security.JwtUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtUtils jwtUtils;

  public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtUtils = jwtUtils;
  }

  public AuthDto.UserResponse register(AuthDto.RegisterRequest request) {
    String email = request.getEmail().trim().toLowerCase();
    if (userRepository.existsByEmail(email)) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Email đã được đăng ký");
    }
    User user = new User();
    user.setEmail(email);
    user.setFullName(request.getFullName().trim());
    user.setPhone(request.getPhone());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setRole(User.Role.USER);
    user.setActive(true);
    return toResponse(userRepository.save(user));
  }

  public AuthDto.LoginResponse login(AuthDto.LoginRequest request) {
    User user = userRepository.findByEmail(request.getEmail().trim().toLowerCase())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email hoặc mật khẩu không đúng"));
    if (!user.getActive() || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email hoặc mật khẩu không đúng");
    }
    return new AuthDto.LoginResponse(jwtUtils.generateToken(user.getEmail(), user.getRole().name()), toResponse(user));
  }

  public AuthDto.UserResponse getMe(User user) { return toResponse(user); }

  public AuthDto.UserResponse updateProfile(User user, ProfileDto.UpdateProfileRequest request) {
    user.setFullName(request.getFullName().trim());
    user.setPhone(request.getPhone());
    user.setAddress(request.getAddress());
    return toResponse(userRepository.save(user));
  }

  public void changePassword(User user, ProfileDto.ChangePasswordRequest request) {
    if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Mật khẩu hiện tại không đúng");
    }
    if (request.getNewPassword().length() < 6) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Mật khẩu mới ít nhất 6 ký tự");
    }
    user.setPassword(passwordEncoder.encode(request.getNewPassword()));
    userRepository.save(user);
  }

  public static AuthDto.UserResponse toResponse(User user) {
    AuthDto.UserResponse response = new AuthDto.UserResponse();
    response.setId(user.getId());
    response.setEmail(user.getEmail());
    response.setFullName(user.getFullName());
    response.setPhone(user.getPhone());
    response.setAddress(user.getAddress());
    response.setRole(user.getRole().name());
    return response;
  }
}
