package com.example.parkingpro.parkingg.service;




import org.springframework.stereotype.Service;

import com.example.parkingpro.parkingg.entity.Facility;
import com.example.parkingpro.parkingg.repository.FacilityRepository;

import java.util.List;
import java.util.Optional;

@Service
public class FacilityService {

    private final FacilityRepository repo;

    public FacilityService(FacilityRepository repo) {
        this.repo = repo;
    }

    public Facility createFacility(Facility facility) {
        return repo.save(facility);
    }

    public List<Facility> getAllFacilities() {
        return repo.findAll();
    }

    public Optional<Facility> getFacilityById(Long id) {
        return repo.findById(id);
    }

    public Facility updateFacility(Long id, Facility updated) {
        return repo.findById(id).map(facility -> {
            facility.setFacilityName(updated.getFacilityName());
            facility.setAddress(updated.getAddress());
            facility.setCity(updated.getCity());
            facility.setState(updated.getState());
            facility.setZipCode(updated.getZipCode());
            facility.setTotalSlots(updated.getTotalSlots());
            facility.setOperatingHours(updated.getOperatingHours());
            facility.setContactInfo(updated.getContactInfo());
            facility.setManagerId(updated.getManagerId());
            facility.setLatitude(updated.getLatitude());
            facility.setLongitude(updated.getLongitude());
            return repo.save(facility);
        }).orElseThrow(() -> new RuntimeException("Facility not found"));
    }

    public void deleteFacility(Long id) {
        repo.deleteById(id);
    }
}
