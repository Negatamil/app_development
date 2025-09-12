package com.example.parkingpro.parkingg.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/simple")
public class SimpleTestController {
    
    @PostMapping("/payment")
    public Map<String, Object> testPayment(@RequestBody Map<String, Object> request) {
        return Map.of(
            "message", "Payment test successful",
            "received", request
        );
    }
    
    @PostMapping("/booking")
    public Map<String, Object> testBooking(@RequestBody Map<String, Object> request) {
        return Map.of(
            "message", "Booking test successful", 
            "received", request
        );
    }
}