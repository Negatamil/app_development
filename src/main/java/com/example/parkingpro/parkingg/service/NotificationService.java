    package com.example.parkingpro.parkingg.service;


import org.springframework.stereotype.Service;

import com.example.parkingpro.parkingg.entity.Notification;
import com.example.parkingpro.parkingg.repository.NotificationRepository;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    private final NotificationRepository repo;

    public NotificationService(NotificationRepository repo) {
        this.repo = repo;
    }

    public Notification createNotification(Notification notification) {
        return repo.save(notification);
    }

    public List<Notification> getAllNotifications() {
        return repo.findAll();
    }

    public Optional<Notification> getNotificationById(Long id) {
        return repo.findById(id);
    }

    public Notification updateNotification(Long id, Notification updated) {
        return repo.findById(id).map(notification -> {
            notification.setUser(updated.getUser());
            notification.setMessage(updated.getMessage());
            notification.setType(updated.getType());
            notification.setRead(updated.isRead());
            notification.setCreatedDate(updated.getCreatedDate());
            notification.setPriority(updated.getPriority());
            notification.setRelatedEntityType(updated.getRelatedEntityType());
            notification.setRelatedEntityId(updated.getRelatedEntityId());
            return repo.save(notification);
        }).orElseThrow(() -> new RuntimeException("Notification not found"));
    }

    public void deleteNotification(Long id) {
        repo.deleteById(id);
    }
}
