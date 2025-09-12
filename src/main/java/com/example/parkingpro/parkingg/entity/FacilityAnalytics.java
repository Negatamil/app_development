package com.example.parkingpro.parkingg.entity;



import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Date;

@Entity
@Table(name = "FacilityAnalytics")
@Getter
@Setter
public class FacilityAnalytics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long analyticsId;

    @ManyToOne
    @JoinColumn(name = "facilityId", nullable = false)
    private Facility facility;

    private Date date = new Date(System.currentTimeMillis());

    private int totalBookings = 0;

    @Column(precision = 5, scale = 2)
    private BigDecimal occupancyRate = BigDecimal.ZERO;

    @Column(precision = 12, scale = 2)
    private BigDecimal revenue = BigDecimal.ZERO;

    @Column(precision = 5, scale = 2)
    private BigDecimal averageBookingDuration = BigDecimal.ZERO;

    private String peakHours;

    @Column(precision = 5, scale = 2)
    private BigDecimal utilizationScore = BigDecimal.ZERO;
}
