package com.example.parkingpro.parkingg.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.parkingpro.parkingg.entity.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
