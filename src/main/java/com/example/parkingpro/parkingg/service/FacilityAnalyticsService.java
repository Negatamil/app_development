package com.example.parkingpro.parkingg.service;


import org.springframework.stereotype.Service;

import com.example.parkingpro.parkingg.entity.FacilityAnalytics;
import com.example.parkingpro.parkingg.repository.FacilityAnalyticsRepository;

import java.util.List;
import java.util.Optional;

@Service
public class FacilityAnalyticsService {

    private final FacilityAnalyticsRepository repo;

    public FacilityAnalyticsService(FacilityAnalyticsRepository repo) {
        this.repo = repo;
    }

    public FacilityAnalytics createAnalytics(FacilityAnalytics analytics) {
        return repo.save(analytics);
    }

    public List<FacilityAnalytics> getAllAnalytics() {
        return repo.findAll();
    }

    public Optional<FacilityAnalytics> getAnalyticsById(Long id) {
        return repo.findById(id);
    }

    public FacilityAnalytics updateAnalytics(Long id, FacilityAnalytics updated) {
        return repo.findById(id).map(analytics -> {
            analytics.setFacility(updated.getFacility());
            analytics.setDate(updated.getDate());
            analytics.setTotalBookings(updated.getTotalBookings());
            analytics.setOccupancyRate(updated.getOccupancyRate());
            analytics.setRevenue(updated.getRevenue());
            analytics.setAverageBookingDuration(updated.getAverageBookingDuration());
            analytics.setPeakHours(updated.getPeakHours());
            analytics.setUtilizationScore(updated.getUtilizationScore());
            return repo.save(analytics);
        }).orElseThrow(() -> new RuntimeException("FacilityAnalytics not found"));
    }

    public void deleteAnalytics(Long id) {
        repo.deleteById(id);
    }
}
