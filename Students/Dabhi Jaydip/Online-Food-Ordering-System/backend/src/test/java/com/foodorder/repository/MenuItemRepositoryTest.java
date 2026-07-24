package com.foodorder.repository;

import com.foodorder.model.MenuItem;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
public class MenuItemRepositoryTest {

    @Autowired
    private MenuItemRepository menuItemRepository;

    private MenuItem pizza;
    private MenuItem burger;

    @BeforeEach
    void setUp() {
        pizza = new MenuItem();
        pizza.setName("Veg Pizza");
        pizza.setDescription("Delicious cheese pizza");
        pizza.setPrice(new BigDecimal("299.00"));
        pizza.setCategory("Pizza");
        pizza.setImageUrl("pizza.jpg");
        pizza.setAvailable(true);

        burger = new MenuItem();
        burger.setName("Cheese Burger");
        burger.setDescription("Juicy chicken burger");
        burger.setPrice(new BigDecimal("149.00"));
        burger.setCategory("Burger");
        burger.setImageUrl("burger.jpg");
        burger.setAvailable(false);

        menuItemRepository.save(pizza);
        menuItemRepository.save(burger);
    }

    @Test
    void testFindByCategory() {
        List<MenuItem> pizzas = menuItemRepository.findByCategory("Pizza");
        assertEquals(1, pizzas.size());
        assertEquals("Veg Pizza", pizzas.get(0).getName());
    }

    @Test
    void testFindByAvailable() {
        List<MenuItem> availableItems = menuItemRepository.findByAvailable(true);
        assertEquals(1, availableItems.size());
        assertEquals("Veg Pizza", availableItems.get(0).getName());

        List<MenuItem> unavailableItems = menuItemRepository.findByAvailable(false);
        assertEquals(1, unavailableItems.size());
        assertEquals("Cheese Burger", unavailableItems.get(0).getName());
    }

    @Test
    void testFindByNameContainingIgnoreCase() {
        List<MenuItem> searchResult = menuItemRepository.findByNameContainingIgnoreCase("PIZZA");
        assertEquals(1, searchResult.size());
        assertEquals("Veg Pizza", searchResult.get(0).getName());

        List<MenuItem> searchResult2 = menuItemRepository.findByNameContainingIgnoreCase("burger");
        assertEquals(1, searchResult2.size());
        assertEquals("Cheese Burger", searchResult2.get(0).getName());
    }
}
