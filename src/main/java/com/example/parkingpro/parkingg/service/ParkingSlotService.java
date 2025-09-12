package com.example.parkingpro.parkingg.service;





import org.springframework.stereotype.Service;

import com.example.parkingpro.parkingg.entity.ParkingSlot;
import com.example.parkingpro.parkingg.repository.ParkingSlotRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ParkingSlotService {

    private final ParkingSlotRepository slotRepo;

    public ParkingSlotService(ParkingSlotRepository slotRepo) {
        this.slotRepo = slotRepo;
    }

    public ParkingSlot createSlot(ParkingSlot slot) {
        return slotRepo.save(slot);
    }

    public List<ParkingSlot> getAllSlots() {
        return slotRepo.findAll();
    }

    public Optional<ParkingSlot> getSlotById(Long id) {
        return slotRepo.findById(id);
    }

    public ParkingSlot updateSlot(Long id, ParkingSlot updatedSlot) {
        return slotRepo.findById(id).map(slot -> {
            slot.setSlotNumber(updatedSlot.getSlotNumber());
            slot.setSlotType(updatedSlot.getSlotType());
            slot.setFacilityId(updatedSlot.getFacilityId());
            slot.setHourlyRate(updatedSlot.getHourlyRate());
            slot.setIsAvailable(updatedSlot.getIsAvailable());
            slot.setLocation(updatedSlot.getLocation());
            slot.setFloor(updatedSlot.getFloor());
            slot.setSection(updatedSlot.getSection());
            slot.setCoordinates(updatedSlot.getCoordinates());
            slot.setFeatures(updatedSlot.getFeatures());
            slot.setLastModified(updatedSlot.getLastModified());
            return slotRepo.save(slot);
        }).orElseThrow(() -> new RuntimeException("Slot not found"));
    }

    public void deleteSlot(Long id) {
        slotRepo.deleteById(id);
    }
}
