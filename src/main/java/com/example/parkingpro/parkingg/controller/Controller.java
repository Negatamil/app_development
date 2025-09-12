package com.example.parkingpro.parkingg.controller;


import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    @RequestMapping("/welcome")
    public String loginVerify(Authentication authentication)
    {
        String username=authentication.getName();
        return "Welcome "+username+" to Skcet";
    }
}
