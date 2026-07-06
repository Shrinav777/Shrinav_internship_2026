package com.example.copper_rivet_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.copper_rivet_management.entity.Rivet;

@Repository
public interface RivetRepository extends JpaRepository<Rivet, Long> {

}