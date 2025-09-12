package com.example.parkingpro.parkingg.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.parkingpro.parkingg.entity.FacilityAnalytics;
import com.example.parkingpro.parkingg.service.FacilityAnalyticsService;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
public class FacilityAnalyticsController {

    private final FacilityAnalyticsService service;

    public FacilityAnalyticsController(FacilityAnalyticsService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<FacilityAnalytics> create(@RequestBody FacilityAnalytics analytics) {
        return ResponseEntity.ok(service.createAnalytics(analytics));
    }

    @GetMapping
    public ResponseEntity<List<FacilityAnalytics>> getAll() {
        return ResponseEntity.ok(service.getAllAnalytics());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FacilityAnalytics> getById(@PathVariable Long id) {
        return service.getAnalyticsById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<FacilityAnalytics> update(@PathVariable Long id, @RequestBody FacilityAnalytics analytics) {
        return ResponseEntity.ok(service.updateAnalytics(id, analytics));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteAnalytics(id);
        return ResponseEntity.noContent().build();
    }
}
