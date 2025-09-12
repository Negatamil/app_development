package com.example.parkingpro.parkingg.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.parkingpro.parkingg.entity.BookingHistory;
import com.example.parkingpro.parkingg.service.BookingHistoryService;

import java.util.List;

@RestController
@RequestMapping("/api/histories")
public class BookingHistoryController {

    private final BookingHistoryService service;

    public BookingHistoryController(BookingHistoryService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody BookingHistory history) {
        try {
            BookingHistory created = service.createHistory(history);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<BookingHistory>> getAll() {
        return ResponseEntity.ok(service.getAllHistories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingHistory> getById(@PathVariable Long id) {
        return service.getHistoryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingHistory> update(@PathVariable Long id, @RequestBody BookingHistory history) {
        return ResponseEntity.ok(service.updateHistory(id, history));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteHistory(id);
        return ResponseEntity.noContent().build();
    }
}
