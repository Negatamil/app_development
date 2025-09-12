package com.example.parkingpro.parkingg.service;







import org.springframework.stereotype.Service;

import com.example.parkingpro.parkingg.entity.Booking;
import com.example.parkingpro.parkingg.repository.BookingRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private final BookingRepository bookingRepo;

    public BookingService(BookingRepository bookingRepo) {
        this.bookingRepo = bookingRepo;
    }

    public Booking createBooking(Booking booking) {
        return bookingRepo.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepo.findById(id);
    }

    public Booking updateBooking(Long id, Booking updatedBooking) {
        return bookingRepo.findById(id).map(booking -> {
            booking.setUser(updatedBooking.getUser());
            booking.setParkingSlot(updatedBooking.getParkingSlot());
            booking.setVehicleNumber(updatedBooking.getVehicleNumber());
            booking.setStartTime(updatedBooking.getStartTime());
            booking.setEndTime(updatedBooking.getEndTime());
            booking.setTotalCost(updatedBooking.getTotalCost());
            booking.setStatus(updatedBooking.getStatus());
            booking.setCheckInTime(updatedBooking.getCheckInTime());
            booking.setCheckOutTime(updatedBooking.getCheckOutTime());
            booking.setExtendedTime(updatedBooking.getExtendedTime());
            booking.setLastModified(updatedBooking.getLastModified());
            return bookingRepo.save(booking);
        }).orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    public void deleteBooking(Long id) {
        bookingRepo.deleteById(id);
    }
}
