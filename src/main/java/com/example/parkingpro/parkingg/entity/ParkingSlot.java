package com.example.parkingpro.parkingg.entity;




import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "ParkingSlots")
@Getter
@Setter
public class ParkingSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long slotId;

    @Column(nullable = false, unique = true, length = 10)
    private String slotNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SlotType slotType = SlotType.REGULAR;

    @Column(nullable = false)
    private Long facilityId; // FK → Facilities.facilityId (will map later)

    @Column(nullable = false, precision = 8, scale = 2)
    private BigDecimal hourlyRate;

    private Boolean isAvailable = true;

    @Column(length = 100)
    private String location;

    @Column(columnDefinition = "INT DEFAULT 1")
    private Integer floor = 1;

    @Column(length = 10)
    private String section;

    @Column(length = 50)
    private String coordinates;

    @Column(columnDefinition = "TEXT")
    private String features; // store JSON as text (can use @Convert for real JSON)

    private Timestamp createdDate = new Timestamp(System.currentTimeMillis());

    private Timestamp lastModified = new Timestamp(System.currentTimeMillis());

    public enum SlotType {
        REGULAR, VIP, HANDICAPPED, ELECTRIC_VEHICLE
    }
}
