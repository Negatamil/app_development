package com.example.parkingpro.parkingg.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.parkingpro.parkingg.entity.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
