package com.foodorder.service;

import com.foodorder.model.MenuItem;
import com.foodorder.repository.MenuItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MenuItemServiceTest {

    @Mock 
    private MenuItemRepository menuItemRepository;

    @InjectMocks
    private MenuItemService menuItemService;

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
    void testCreateMenuItem() {
        when(menuItemRepository.save(any(MenuItem.class))).thenReturn(pizza);

        MenuItem created = menuItemService.createMenuItem(pizza);

        assertNotNull(created);
        assertEquals("Veg Pizza", created.getName());
        verify(menuItemRepository, times(1)).save(pizza);
    }

    @Test
    void testGetAllMenuItems() {
        when(menuItemRepository.findAll()).thenReturn(Arrays.asList(pizza, burger));

        List<MenuItem> items = menuItemService.getAllMenuItems();

        assertEquals(2, items.size());
        assertEquals("Veg Pizza", items.get(0).getName());
        assertEquals("Cheese Burger", items.get(1).getName());
        verify(menuItemRepository, times(1)).findAll();
    }

    @Test
    void testGetMenuItemById_Found() {
        when(menuItemRepository.findById(1L)).thenReturn(Optional.of(pizza));

        Optional<MenuItem> found = menuItemService.getMenuItemById(1L);

        assertTrue(found.isPresent());
        assertEquals("Veg Pizza", found.get().getName());
        verify(menuItemRepository, times(1)).findById(1L);
    }

    @Test
    void testGetMenuItemById_NotFound() {
        when(menuItemRepository.findById(99L)).thenReturn(Optional.empty());

        Optional<MenuItem> found = menuItemService.getMenuItemById(99L);

        assertFalse(found.isPresent());
        verify(menuItemRepository, times(1)).findById(99L);
    }

    @Test
    void testGetMenuItemsByCategory() {
        when(menuItemRepository.findByCategory("Pizza")).thenReturn(Collections.singletonList(pizza));

        List<MenuItem> items = menuItemService.getMenuItemsByCategory("Pizza");

        assertEquals(1, items.size());
        assertEquals("Veg Pizza", items.get(0).getName());
        verify(menuItemRepository, times(1)).findByCategory("Pizza");
    }

    @Test
    void testSearchMenuItems() {
        when(menuItemRepository.findByNameContainingIgnoreCase("pizza")).thenReturn(Collections.singletonList(pizza));

        List<MenuItem> items = menuItemService.searchMenuItems("pizza");

        assertEquals(1, items.size());
        assertEquals("Veg Pizza", items.get(0).getName());
        verify(menuItemRepository, times(1)).findByNameContainingIgnoreCase("pizza");
    }

    @Test
    void testUpdateMenuItem_Success() {
        MenuItem updatedDetails = new MenuItem();
        updatedDetails.setName("Veg Cheese Pizza");
        updatedDetails.setDescription("Extra cheese");
        updatedDetails.setPrice(new BigDecimal("349.00"));
        updatedDetails.setCategory("Pizza");
        updatedDetails.setImageUrl("new-pizza.jpg");
        updatedDetails.setAvailable(false);

        when(menuItemRepository.findById(1L)).thenReturn(Optional.of(pizza));
        when(menuItemRepository.save(any(MenuItem.class))).thenAnswer(invocation -> invocation.getArgument(0));

        MenuItem updated = menuItemService.updateMenuItem(1L, updatedDetails);

        assertNotNull(updated);
        assertEquals("Veg Cheese Pizza", updated.getName());
        assertEquals("Extra cheese", updated.getDescription());
        assertEquals(new BigDecimal("349.00"), updated.getPrice());
        assertFalse(updated.getAvailable());
        verify(menuItemRepository, times(1)).findById(1L);
        verify(menuItemRepository, times(1)).save(any(MenuItem.class));
    }

    @Test
    void testUpdateMenuItem_NotFound() {
        MenuItem updatedDetails = new MenuItem();
        when(menuItemRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            menuItemService.updateMenuItem(99L, updatedDetails);
        });

        assertEquals("Menu item not found with id: 99", exception.getMessage());
        verify(menuItemRepository, times(1)).findById(99L);
        verify(menuItemRepository, never()).save(any(MenuItem.class));
    }

    @Test
    void testDeleteMenuItem_Success() {
        when(menuItemRepository.findById(1L)).thenReturn(Optional.of(pizza));
        doNothing().when(menuItemRepository).delete(pizza);

        assertDoesNotThrow(() -> menuItemService.deleteMenuItem(1L));

        verify(menuItemRepository, times(1)).findById(1L);
        verify(menuItemRepository, times(1)).delete(pizza);
    }

    @Test
    void testDeleteMenuItem_NotFound() {
        when(menuItemRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            menuItemService.deleteMenuItem(99L);
        });

        assertEquals("Menu item not found with id: 99", exception.getMessage());
        verify(menuItemRepository, times(1)).findById(99L);
        verify(menuItemRepository, never()).delete(any(MenuItem.class));
    }
}
