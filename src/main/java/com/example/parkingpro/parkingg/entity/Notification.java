package com.example.parkingpro.parkingg.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "Notifications")
@Getter
@Setter
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationType type = NotificationType.ALERT;

    private boolean isRead = false;

    private Timestamp createdDate = new Timestamp(System.currentTimeMillis());

    @Enumerated(EnumType.STRING)
    private Priority priority = Priority.MEDIUM;

    private String relatedEntityType;

    private String relatedEntityId;

    public enum NotificationType {
        BOOKING_CONFIRMATION, PAYMENT_SUCCESS, REMINDER, ALERT
    }

    public enum Priority {
        LOW, MEDIUM, HIGH, URGENT
    }
}
