package com.max.Football_Club.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class League {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int leagueId;
    private String name;
    private int numberOfTeams;
    @OneToMany(mappedBy = "league", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Team> teams = new ArrayList<>();
}
