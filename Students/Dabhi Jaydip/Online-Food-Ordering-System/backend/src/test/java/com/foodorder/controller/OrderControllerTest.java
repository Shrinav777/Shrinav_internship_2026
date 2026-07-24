package com.foodorder.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.foodorder.dto.OrderRequest;
import com.foodorder.model.Order;
import com.foodorder.service.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(OrderController.class)
public class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OrderService orderService;

    @Autowired
    private ObjectMapper objectMapper;

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
    }

    @Test
    void testCreateOrder() throws Exception {
        OrderRequest request = new OrderRequest();
        request.setCustomerName("John Doe");
        request.setCustomerPhone("1234567890");
        request.setCustomerAddress("123 Main St, City");

        OrderRequest.OrderItemRequest itemReq = new OrderRequest.OrderItemRequest();
        itemReq.setMenuItemId(1L);
        itemReq.setMenuItemName("Veg Pizza");
        itemReq.setQuantity(1);
        itemReq.setPrice(new BigDecimal("300.00"));
        request.setItems(List.of(itemReq));

        when(orderService.createOrder(any(OrderRequest.class))).thenReturn(order);

        mockMvc.perform(post("/api/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.customerName").value("John Doe"))
                .andExpect(jsonPath("$.totalAmount").value(450.00));

        verify(orderService, times(1)).createOrder(any(OrderRequest.class));
    }

    @Test
    void testGetAllOrders() throws Exception {
        when(orderService.getAllOrders()).thenReturn(Collections.singletonList(order));

        mockMvc.perform(get("/api/orders"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].customerName").value("John Doe"));

        verify(orderService, times(1)).getAllOrders();
    }

    @Test
    void testGetOrderById_Found() throws Exception {
        when(orderService.getOrderById(1L)).thenReturn(Optional.of(order));

        mockMvc.perform(get("/api/orders/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.customerName").value("John Doe"));

        verify(orderService, times(1)).getOrderById(1L);
    }

    @Test
    void testGetOrderById_NotFound() throws Exception {
        when(orderService.getOrderById(99L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/orders/99"))
                .andExpect(status().isNotFound());

        verify(orderService, times(1)).getOrderById(99L);
    }

    @Test
    void testGetOrdersByStatus() throws Exception {
        when(orderService.getOrdersByStatus("PENDING")).thenReturn(Collections.singletonList(order));

        mockMvc.perform(get("/api/orders/status/PENDING"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].status").value("PENDING"));

        verify(orderService, times(1)).getOrdersByStatus("PENDING");
    }

    @Test
    void testUpdateOrderStatus_Success() throws Exception {
        Order completedOrder = new Order();
        completedOrder.setId(1L);
        completedOrder.setCustomerName("John Doe");
        completedOrder.setStatus("COMPLETED");

        when(orderService.updateOrderStatus(eq(1L), eq("COMPLETED"))).thenReturn(completedOrder);

        mockMvc.perform(put("/api/orders/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("status", "COMPLETED"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("COMPLETED"));

        verify(orderService, times(1)).updateOrderStatus(eq(1L), eq("COMPLETED"));
    }

    @Test
    void testUpdateOrderStatus_NotFound() throws Exception {
        when(orderService.updateOrderStatus(eq(99L), eq("COMPLETED")))
                .thenThrow(new RuntimeException("Order not found with id: 99"));

        mockMvc.perform(put("/api/orders/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("status", "COMPLETED"))))
                .andExpect(status().isNotFound());

        verify(orderService, times(1)).updateOrderStatus(eq(99L), eq("COMPLETED"));
    }

    @Test
    void testDeleteOrder_Success() throws Exception {
        doNothing().when(orderService).deleteOrder(1L);

        mockMvc.perform(delete("/api/orders/1"))
                .andExpect(status().isNoContent());

        verify(orderService, times(1)).deleteOrder(1L);
    }

    @Test
    void testDeleteOrder_NotFound() throws Exception {
        doThrow(new RuntimeException("Order not found with id: 99")).when(orderService).deleteOrder(99L);

        mockMvc.perform(delete("/api/orders/99"))
                .andExpect(status().isNotFound());

        verify(orderService, times(1)).deleteOrder(99L);
    }
}
