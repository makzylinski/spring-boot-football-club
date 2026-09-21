package com.max.Football_Club.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.List;

@Entity
public class League {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int leagueId;
    private String name;
    private int numberOfTeams;
    private List<Team> teams;
}
