package com.max.Football_Club.controller;

import com.max.Football_Club.model.League;
import com.max.Football_Club.service.LeagueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LeagueController {

    @Autowired
    private LeagueService leagueService;

    @GetMapping("/leagues")
    private List<League> getAllLeagues() {
        return leagueService.getAllLeagues();
    }
}
