package com.max.Football_Club.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int teamId;
    private String name;
    private List<Player> players;
}
