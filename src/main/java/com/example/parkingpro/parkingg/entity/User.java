package com.example.parkingpro.parkingg.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;
    
    private boolean enabled = true;
    private int failedAttempts = 0;
    private LocalDateTime lockTime;
    private String resetToken;
    private LocalDateTime resetTokenExpiry;
    
    public enum Role {
        ADMIN, USER, MANAGER
    }
}