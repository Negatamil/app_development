package com.example.parkingpro.parkingg.service;




import org.springframework.stereotype.Service;

import com.example.parkingpro.parkingg.entity.User;
import com.example.parkingpro.parkingg.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    // CREATE
    public User createUser(User user) {
        return repo.save(user);
    }

    // READ ALL
    public List<User> getAllUsers() {
        return repo.findAll();
    }

    // READ ONE
    public Optional<User> getUserById(Long id) {
        return repo.findById(id);
    }

    // UPDATE
    public User updateUser(Long id, User updatedUser) {
        return repo.findById(id).map(user -> {
            user.setEmail(updatedUser.getEmail());
            user.setRole(updatedUser.getRole());
            user.setEnabled(updatedUser.isEnabled());
            return repo.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    // DELETE
    public void deleteUser(Long id) {
        repo.deleteById(id);
    }
}
