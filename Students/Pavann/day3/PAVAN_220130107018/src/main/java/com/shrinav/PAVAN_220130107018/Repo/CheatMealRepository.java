



package com.shrinav.PAVAN_220130107018.Repo;

import com.shrinav.PAVAN_220130107018.Entity.CheatMeal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheatMealRepository extends JpaRepository<CheatMeal, Long> {
    // Standard CRUD operations are automatically included
}