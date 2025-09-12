package com.example.parkingpro.parkingg.entity;



import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "Bookings")
@Getter
@Setter
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "slotId", nullable = false)
    private ParkingSlot parkingSlot;

    @Column(nullable = false, length = 20)
    private String vehicleNumber;

    @Column(nullable = false)
    private Timestamp startTime;

    @Column(nullable = false)
    private Timestamp endTime;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalCost;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status = BookingStatus.CONFIRMED;

    private Timestamp createdDate = new Timestamp(System.currentTimeMillis());

    private Timestamp lastModified = new Timestamp(System.currentTimeMillis());

    private Timestamp checkInTime;

    private Timestamp checkOutTime;

    @Column(columnDefinition = "INT DEFAULT 0")
    private Integer extendedTime = 0;

    public enum BookingStatus {
        CONFIRMED, ACTIVE, COMPLETED, CANCELLED
    }
}
