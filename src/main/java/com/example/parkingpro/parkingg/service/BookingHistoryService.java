package com.example.parkingpro.parkingg.service;


import org.springframework.stereotype.Service;

import com.example.parkingpro.parkingg.entity.BookingHistory;
import com.example.parkingpro.parkingg.repository.BookingHistoryRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BookingHistoryService {

    private final BookingHistoryRepository repo;

    public BookingHistoryService(BookingHistoryRepository repo) {
        this.repo = repo;
    }

    public BookingHistory createHistory(BookingHistory history) {
        return repo.save(history);
    }

    public List<BookingHistory> getAllHistories() {
        return repo.findAll();
    }

    public Optional<BookingHistory> getHistoryById(Long id) {
        return repo.findById(id);
    }

    public BookingHistory updateHistory(Long id, BookingHistory updated) {
        return repo.findById(id).map(history -> {
            history.setBooking(updated.getBooking());
            history.setStatusChange(updated.getStatusChange());
            history.setPreviousStatus(updated.getPreviousStatus());
            history.setNewStatus(updated.getNewStatus());
            history.setChangeDate(updated.getChangeDate());
            history.setChangedBy(updated.getChangedBy());
            history.setNotes(updated.getNotes());
            history.setReason(updated.getReason());
            return repo.save(history);
        }).orElseThrow(() -> new RuntimeException("BookingHistory not found"));
    }

    public void deleteHistory(Long id) {
        repo.deleteById(id);
    }
}
