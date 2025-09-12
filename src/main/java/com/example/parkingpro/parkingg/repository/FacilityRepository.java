package com.example.parkingpro.parkingg.repository;




import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.parkingpro.parkingg.entity.Facility;

@Repository
public interface FacilityRepository extends JpaRepository<Facility, Long> {
}
