package com.example.parkingpro.parkingg.service;




import org.springframework.stereotype.Service;

import com.example.parkingpro.parkingg.entity.Vehicle;
import com.example.parkingpro.parkingg.repository.VehicleRepository;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    private final VehicleRepository repo;

    public VehicleService(VehicleRepository repo) {
        this.repo = repo;
    }

    public Vehicle createVehicle(Vehicle vehicle) {
        return repo.save(vehicle);
    }

    public List<Vehicle> getAllVehicles() {
        return repo.findAll();
    }

    public Optional<Vehicle> getVehicleById(Long id) {
        return repo.findById(id);
    }

    public Vehicle updateVehicle(Long id, Vehicle updated) {
        return repo.findById(id).map(vehicle -> {
            vehicle.setUser(updated.getUser());
            vehicle.setLicensePlate(updated.getLicensePlate());
            vehicle.setVehicleType(updated.getVehicleType());
            vehicle.setMake(updated.getMake());
            vehicle.setModel(updated.getModel());
            vehicle.setColor(updated.getColor());
            vehicle.setYear(updated.getYear());
            vehicle.setIsDefault(updated.getIsDefault());
            return repo.save(vehicle);
        }).orElseThrow(() -> new RuntimeException("Vehicle not found"));
    }

    public void deleteVehicle(Long id) {
        repo.deleteById(id);
    }
}
