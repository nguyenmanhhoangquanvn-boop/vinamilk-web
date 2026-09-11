package com.vinamilk.exception;

import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.*;

@RestControllerAdvice
public class ApiExceptionHandler {
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String,Object>> invalid(MethodArgumentNotValidException e) { String message=e.getBindingResult().getFieldErrors().stream().findFirst().map(x->x.getDefaultMessage()).orElse("Dữ liệu không hợp lệ"); return ResponseEntity.badRequest().body(Map.of("success",false,"message",message)); }
  @ExceptionHandler(ResponseStatusException.class)
  public ResponseEntity<Map<String,Object>> status(ResponseStatusException e) { return ResponseEntity.status(e.getStatusCode()).body(Map.of("success",false,"message",e.getReason()==null?"Có lỗi xảy ra":e.getReason())); }
  @ExceptionHandler(Exception.class)
  public ResponseEntity<Map<String,Object>> unknown(Exception e) { return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("success",false,"message","Lỗi máy chủ nội bộ")); }
}
