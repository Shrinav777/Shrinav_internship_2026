package com.foodorder.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.foodorder.model.MenuItem;
import com.foodorder.repository.MenuItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
public class FoodOrderIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        menuItemRepository.deleteAll();

        MenuItem pizza = new MenuItem();
        pizza.setName("Veg Pizza");
        pizza.setDescription("Cheesy pizza");
        pizza.setPrice(new BigDecimal("299.00"));
        pizza.setCategory("Pizza");
        pizza.setImageUrl("pizza.jpg");
        pizza.setAvailable(true);

        MenuItem burger = new MenuItem();
        burger.setName("Cheese Burger");
        burger.setDescription("Beef burger");
        burger.setPrice(new BigDecimal("149.00"));
        burger.setCategory("Burger");
        burger.setImageUrl("burger.jpg");
        burger.setAvailable(true);

        menuItemRepository.save(pizza);
        menuItemRepository.save(burger);
    }

    @Test
    void testGetAllMenuItemsIntegration() throws Exception {
        mockMvc.perform(get("/api/menu-items"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name").value("Veg Pizza"))
                .andExpect(jsonPath("$[1].name").value("Cheese Burger"));
    }

    @Test
    void testCreateMenuItemIntegration() throws Exception {
        MenuItem pasta = new MenuItem();
        pasta.setName("White Sauce Pasta");
        pasta.setDescription("Creamy pasta");
        pasta.setPrice(new BigDecimal("199.00"));
        pasta.setCategory("Pasta");
        pasta.setImageUrl("pasta.jpg");
        pasta.setAvailable(true);

        mockMvc.perform(post("/api/menu-items")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(pasta)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.name").value("White Sauce Pasta"));
    }
}
