package com.shrinav.PAVAN_220130107018.Controller;

import com.shrinav.PAVAN_220130107018.Entity.CheatMeal;
import com.shrinav.PAVAN_220130107018.service.CheatMealService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meals")
public class CheatMealController {

    private final CheatMealService service;

    public CheatMealController(CheatMealService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<CheatMeal> createMeal(@RequestBody CheatMeal meal) {
        return ResponseEntity.ok(service.saveMeal(meal));
    }

    @GetMapping
    public ResponseEntity<List<CheatMeal>> getAllMeals() {
        return ResponseEntity.ok(service.getAllMeals());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CheatMeal> getMealById(@PathVariable Long id) {
        return service.getMealById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CheatMeal> updateMeal(@PathVariable Long id, @RequestBody CheatMeal meal) {
        try {
            return ResponseEntity.ok(service.updateMeal(id, meal));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeal(@PathVariable Long id) {
        service.deleteMeal(id);
        return ResponseEntity.noContent().build();
    }
}