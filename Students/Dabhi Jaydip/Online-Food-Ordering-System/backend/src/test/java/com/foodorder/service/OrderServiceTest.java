package com.foodorder.service;

import com.foodorder.dto.OrderRequest;
import com.foodorder.model.Order;
import com.foodorder.model.OrderItem;
import com.foodorder.repository.OrderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private OrderService orderService;

    private Order order;

    @BeforeEach
    void setUp() {
        order = new Order();
        order.setId(1L);
        order.setCustomerName("John Doe");
        order.setCustomerPhone("1234567890");
        order.setCustomerAddress("123 Main St, City");
        order.setStatus("PENDING");
        order.setTotalAmount(new BigDecimal("450.00"));
        order.setOrderItems(new ArrayList<>());
    }

    @Test
    void testCreateOrder() {
        // Prepare Request
        OrderRequest request = new OrderRequest();
        request.setCustomerName("John Doe");
        request.setCustomerPhone("1234567890");
        request.setCustomerAddress("123 Main St, City");

        OrderRequest.OrderItemRequest item1 = new OrderRequest.OrderItemRequest();
        item1.setMenuItemId(1L);
        item1.setMenuItemName("Veg Pizza");
        item1.setQuantity(1);
        item1.setPrice(new BigDecimal("300.00"));

        OrderRequest.OrderItemRequest item2 = new OrderRequest.OrderItemRequest();
        item2.setMenuItemId(2L);
        item2.setMenuItemName("Cheese Burger");
        item2.setQuantity(1);
        item2.setPrice(new BigDecimal("150.00"));

        request.setItems(List.of(item1, item2));

        // Mock repository
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> {
            Order savedOrder = invocation.getArgument(0);
            savedOrder.setId(1L);
            return savedOrder;
        });

        Order created = orderService.createOrder(request);

        assertNotNull(created);
        assertEquals(1L, created.getId());
        assertEquals("John Doe", created.getCustomerName());
        assertEquals("PENDING", created.getStatus());
        assertEquals(new BigDecimal("450.00"), created.getTotalAmount()); // 300 * 1 + 150 * 1
        assertEquals(2, created.getOrderItems().size());

        // Check first item details
        OrderItem orderItem1 = created.getOrderItems().get(0);
        assertEquals(1L, orderItem1.getMenuItemId());
        assertEquals("Veg Pizza", orderItem1.getMenuItemName());
        assertEquals(1, orderItem1.getQuantity());
        assertEquals(new BigDecimal("300.00"), orderItem1.getPrice());

        verify(orderRepository, times(1)).save(any(Order.class));
    }

    @Test
    void testGetAllOrders() {
        when(orderRepository.findAllByOrderByCreatedAtDesc()).thenReturn(Collections.singletonList(order));

        List<Order> orders = orderService.getAllOrders();

        assertEquals(1, orders.size());
        assertEquals("John Doe", orders.get(0).getCustomerName());
        verify(orderRepository, times(1)).findAllByOrderByCreatedAtDesc();
    }

    @Test
    void testGetOrderById_Found() {
        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));

        Optional<Order> found = orderService.getOrderById(1L);

        assertTrue(found.isPresent());
        assertEquals("John Doe", found.get().getCustomerName());
        verify(orderRepository, times(1)).findById(1L);
    }

    @Test
    void testGetOrderById_NotFound() {
        when(orderRepository.findById(99L)).thenReturn(Optional.empty());

        Optional<Order> found = orderService.getOrderById(99L);

        assertFalse(found.isPresent());
        verify(orderRepository, times(1)).findById(99L);
    }

    @Test
    void testGetOrdersByStatus() {
        when(orderRepository.findByStatus("PENDING")).thenReturn(Collections.singletonList(order));

        List<Order> orders = orderService.getOrdersByStatus("PENDING");

        assertEquals(1, orders.size());
        assertEquals("PENDING", orders.get(0).getStatus());
        verify(orderRepository, times(1)).findByStatus("PENDING");
    }

    @Test
    void testUpdateOrderStatus_Success() {
        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Order updated = orderService.updateOrderStatus(1L, "COMPLETED");

        assertNotNull(updated);
        assertEquals("COMPLETED", updated.getStatus());
        verify(orderRepository, times(1)).findById(1L);
        verify(orderRepository, times(1)).save(order);
    }

    @Test
    void testUpdateOrderStatus_NotFound() {
        when(orderRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            orderService.updateOrderStatus(99L, "COMPLETED");
        });

        assertEquals("Order not found with id: 99", exception.getMessage());
        verify(orderRepository, times(1)).findById(99L);
        verify(orderRepository, never()).save(any(Order.class));
    }

    @Test
    void testDeleteOrder_Success() {
        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));
        doNothing().when(orderRepository).delete(order);

        assertDoesNotThrow(() -> orderService.deleteOrder(1L));

        verify(orderRepository, times(1)).findById(1L);
        verify(orderRepository, times(1)).delete(order);
    }

    @Test
    void testDeleteOrder_NotFound() {
        when(orderRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            orderService.deleteOrder(99L);
        });

        assertEquals("Order not found with id: 99", exception.getMessage());
        verify(orderRepository, times(1)).findById(99L);
        verify(orderRepository, never()).delete(any(Order.class));
    }
}
