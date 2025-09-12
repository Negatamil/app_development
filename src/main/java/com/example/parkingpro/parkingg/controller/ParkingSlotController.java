package com.example.parkingpro.parkingg.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.parkingpro.parkingg.entity.ParkingSlot;
import com.example.parkingpro.parkingg.service.ParkingSlotService;

import java.util.List;

@RestController
@RequestMapping("/api/slots")
public class ParkingSlotController {

    private final ParkingSlotService service;

    public ParkingSlotController(ParkingSlotService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ParkingSlot> createSlot(@RequestBody ParkingSlot slot) {
        return ResponseEntity.ok(service.createSlot(slot));
    }

    @GetMapping
    public ResponseEntity<List<ParkingSlot>> getAllSlots() {
        return ResponseEntity.ok(service.getAllSlots());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParkingSlot> getSlotById(@PathVariable Long id) {
        return service.getSlotById(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ParkingSlot> updateSlot(@PathVariable Long id, @RequestBody ParkingSlot slot) {
        return ResponseEntity.ok(service.updateSlot(id, slot));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSlot(@PathVariable Long id) {
        service.deleteSlot(id);
        return ResponseEntity.noContent().build();
    }
}
