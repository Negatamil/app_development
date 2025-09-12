package com.example.parkingpro.parkingg.service;


import org.springframework.stereotype.Service;

import com.example.parkingpro.parkingg.entity.Payment;
import com.example.parkingpro.parkingg.repository.PaymentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    private final PaymentRepository repo;

    public PaymentService(PaymentRepository repo) {
        this.repo = repo;
    }

    public Payment createPayment(Payment payment) {
        return repo.save(payment);
    }

    public List<Payment> getAllPayments() {
        return repo.findAll();
    }

    public Optional<Payment> getPaymentById(Long id) {
        return repo.findById(id);
    }

    public Payment updatePayment(Long id, Payment updated) {
        return repo.findById(id).map(payment -> {
            payment.setBooking(updated.getBooking());
            payment.setAmount(updated.getAmount());
            payment.setPaymentMethod(updated.getPaymentMethod());
            payment.setTransactionId(updated.getTransactionId());
            payment.setStatus(updated.getStatus());
            payment.setPaymentDate(updated.getPaymentDate());
            payment.setRefundAmount(updated.getRefundAmount());
            payment.setGatewayResponse(updated.getGatewayResponse());
            return repo.save(payment);
        }).orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    public void deletePayment(Long id) {
        repo.deleteById(id);
    }
}
