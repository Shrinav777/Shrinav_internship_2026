



package com.shrinav.PAVAN_220130107018.service;

import com.shrinav.PAVAN_220130107018.Entity.CheatMeal;
import com.shrinav.PAVAN_220130107018.Repo.CheatMealRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CheatMealService {

    private final CheatMealRepository repository;

    public CheatMealService(CheatMealRepository repository) {
        this.repository = repository;
    }

    public List<CheatMeal> getAllMeals() {
        return repository.findAll();
    }

    public Optional<CheatMeal> getMealById(Long id) {
        return repository.findById(id);
    }

    public CheatMeal saveMeal(CheatMeal meal) {
        return repository.save(meal);
    }

    public CheatMeal updateMeal(Long id, CheatMeal updatedMeal) {
        return repository.findById(id).map(meal -> {
            meal.setName(updatedMeal.getName());
            meal.setCalories(updatedMeal.getCalories());
            meal.setDate(updatedMeal.getDate());
            return repository.save(meal);
        }).orElseThrow(() -> new RuntimeException("Meal not found with id: " + id));
    }

    public void deleteMeal(Long id) {
        repository.deleteById(id);
    }
}