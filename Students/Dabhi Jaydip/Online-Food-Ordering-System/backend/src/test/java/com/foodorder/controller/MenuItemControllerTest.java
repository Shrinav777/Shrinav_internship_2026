package com.foodorder.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.foodorder.model.MenuItem;
import com.foodorder.service.MenuItemService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(MenuItemController.class)
public class MenuItemControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MenuItemService menuItemService;

    @Autowired
    private ObjectMapper objectMapper;

    private MenuItem pizza;
    private MenuItem burger;

    @BeforeEach
    void setUp() {
        pizza = new MenuItem();
        pizza.setId(1L);
        pizza.setName("Veg Pizza");
        pizza.setDescription("Delicious cheese pizza");
        pizza.setPrice(new BigDecimal("299.00"));
        pizza.setCategory("Pizza");
        pizza.setImageUrl("pizza.jpg");
        pizza.setAvailable(true);

        burger = new MenuItem();
        burger.setId(2L);
        burger.setName("Cheese Burger");
        burger.setDescription("Juicy chicken burger");
        burger.setPrice(new BigDecimal("149.00"));
        burger.setCategory("Burger");
        burger.setImageUrl("burger.jpg");
        burger.setAvailable(true);
    }

    @Test
    void testCreateMenuItem() throws Exception {
        when(menuItemService.createMenuItem(any(MenuItem.class))).thenReturn(pizza);

        mockMvc.perform(post("/api/menu-items")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(pizza)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Veg Pizza"))
                .andExpect(jsonPath("$.price").value(299.00));

        verify(menuItemService, times(1)).createMenuItem(any(MenuItem.class));
    }

    @Test
    void testGetAllMenuItems() throws Exception {
        when(menuItemService.getAllMenuItems()).thenReturn(Arrays.asList(pizza, burger));

        mockMvc.perform(get("/api/menu-items"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].name").value("Veg Pizza"))
                .andExpect(jsonPath("$[1].name").value("Cheese Burger"));

        verify(menuItemService, times(1)).getAllMenuItems();
    }

    @Test
    void testGetMenuItemById_Found() throws Exception {
        when(menuItemService.getMenuItemById(1L)).thenReturn(Optional.of(pizza));

        mockMvc.perform(get("/api/menu-items/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Veg Pizza"));

        verify(menuItemService, times(1)).getMenuItemById(1L);
    }

    @Test
    void testGetMenuItemById_NotFound() throws Exception {
        when(menuItemService.getMenuItemById(99L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/menu-items/99"))
                .andExpect(status().isNotFound());

        verify(menuItemService, times(1)).getMenuItemById(99L);
    }

    @Test
    void testGetMenuItemsByCategory() throws Exception {
        when(menuItemService.getMenuItemsByCategory("Pizza")).thenReturn(Collections.singletonList(pizza));

        mockMvc.perform(get("/api/menu-items/category/Pizza"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].category").value("Pizza"));

        verify(menuItemService, times(1)).getMenuItemsByCategory("Pizza");
    }

    @Test
    void testSearchMenuItems() throws Exception {
        when(menuItemService.searchMenuItems("pizza")).thenReturn(Collections.singletonList(pizza));

        mockMvc.perform(get("/api/menu-items/search").param("name", "pizza"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].name").value("Veg Pizza"));

        verify(menuItemService, times(1)).searchMenuItems("pizza");
    }

    @Test
    void testUpdateMenuItem_Success() throws Exception {
        MenuItem updatedDetails = new MenuItem();
        updatedDetails.setName("Veg Cheese Pizza");
        updatedDetails.setDescription("Extra cheese");
        updatedDetails.setPrice(new BigDecimal("349.00"));
        updatedDetails.setCategory("Pizza");
        updatedDetails.setImageUrl("new-pizza.jpg");
        updatedDetails.setAvailable(false);

        MenuItem mockUpdated = new MenuItem();
        mockUpdated.setId(1L);
        mockUpdated.setName("Veg Cheese Pizza");
        mockUpdated.setDescription("Extra cheese");
        mockUpdated.setPrice(new BigDecimal("349.00"));
        mockUpdated.setCategory("Pizza");
        mockUpdated.setImageUrl("new-pizza.jpg");
        mockUpdated.setAvailable(false);

        when(menuItemService.updateMenuItem(eq(1L), any(MenuItem.class))).thenReturn(mockUpdated);

        mockMvc.perform(put("/api/menu-items/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Veg Cheese Pizza"))
                .andExpect(jsonPath("$.available").value(false));

        verify(menuItemService, times(1)).updateMenuItem(eq(1L), any(MenuItem.class));
    }

    @Test
    void testUpdateMenuItem_NotFound() throws Exception {
        when(menuItemService.updateMenuItem(eq(99L), any(MenuItem.class)))
                .thenThrow(new RuntimeException("Menu item not found with id: 99"));

        mockMvc.perform(put("/api/menu-items/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(pizza)))
                .andExpect(status().isNotFound());

        verify(menuItemService, times(1)).updateMenuItem(eq(99L), any(MenuItem.class));
    }

    @Test
    void testDeleteMenuItem_Success() throws Exception {
        doNothing().when(menuItemService).deleteMenuItem(1L);

        mockMvc.perform(delete("/api/menu-items/1"))
                .andExpect(status().isNoContent());

        verify(menuItemService, times(1)).deleteMenuItem(1L);
    }

    @Test
    void testDeleteMenuItem_NotFound() throws Exception {
        doThrow(new RuntimeException("Menu item not found with id: 99")).when(menuItemService).deleteMenuItem(99L);

        mockMvc.perform(delete("/api/menu-items/99"))
                .andExpect(status().isNotFound());

        verify(menuItemService, times(1)).deleteMenuItem(99L);
    }
}
