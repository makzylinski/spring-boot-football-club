package com.max.Football_Club.repository;

import com.max.Football_Club.model.League;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeagueRepository extends JpaRepository<League, Long> {
}