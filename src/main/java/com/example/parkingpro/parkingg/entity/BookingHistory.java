package com.example.parkingpro.parkingg.entity;



import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "BookingHistory")
@Getter
@Setter
public class BookingHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyId;

    @ManyToOne
    @JoinColumn(name = "bookingId", nullable = false)
    private Booking booking;

    @Column(nullable = false, length = 50)
    private String statusChange;

    @Column(length = 50)
    private String previousStatus;

    @Column(length = 50)
    private String newStatus;

    private Timestamp changeDate = new Timestamp(System.currentTimeMillis());

    @ManyToOne
    @JoinColumn(name = "changedBy", nullable = false)
    private User changedBy;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(length = 200)
    private String reason;
}
