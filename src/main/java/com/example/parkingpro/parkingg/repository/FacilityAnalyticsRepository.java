package com.example.parkingpro.parkingg.repository;




import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.parkingpro.parkingg.entity.FacilityAnalytics;

@Repository
public interface FacilityAnalyticsRepository extends JpaRepository<FacilityAnalytics, Long> {
}
