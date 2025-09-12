package com.example.parkingpro.parkingg.entity;



import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "Vehicles")
@Getter
@Setter
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vehicleId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @Column(nullable = false, length = 20)
    private String licensePlate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VehicleType vehicleType = VehicleType.CAR;

    @Column(length = 50)
    private String make;

    @Column(length = 50)
    private String model;

    @Column(length = 30)
    private String color;

    private Integer year;

    private Boolean isDefault = false;

    private Timestamp createdDate = new Timestamp(System.currentTimeMillis());

    public enum VehicleType {
        CAR, MOTORCYCLE, TRUCK, VAN
    }
}
