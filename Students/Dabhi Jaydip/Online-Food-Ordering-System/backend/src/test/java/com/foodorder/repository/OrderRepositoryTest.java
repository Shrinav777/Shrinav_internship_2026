package com.foodorder.repository;

import com.foodorder.model.Order;
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
public class OrderRepositoryTest {

    @Autowired
    private OrderRepository orderRepository;

    private Order pendingOrder;
    private Order completedOrder;

    @BeforeEach
    void setUp() {
        pendingOrder = new Order();
        pendingOrder.setCustomerName("John Doe");
        pendingOrder.setCustomerPhone("1234567890");
        pendingOrder.setCustomerAddress("123 Street");
        pendingOrder.setTotalAmount(new BigDecimal("250.00"));
        pendingOrder.setStatus("PENDING");

        completedOrder = new Order();
        completedOrder.setCustomerName("Jane Doe");
        completedOrder.setCustomerPhone("0987654321");
        completedOrder.setCustomerAddress("456 Avenue");
        completedOrder.setTotalAmount(new BigDecimal("500.00"));
        completedOrder.setStatus("COMPLETED");

        orderRepository.save(pendingOrder);
        orderRepository.save(completedOrder);
    }

    @Test
    void testFindByStatus() {
        List<Order> pending = orderRepository.findByStatus("PENDING");
        assertEquals(1, pending.size());
        assertEquals("John Doe", pending.get(0).getCustomerName());

        List<Order> completed = orderRepository.findByStatus("COMPLETED");
        assertEquals(1, completed.size());
        assertEquals("Jane Doe", completed.get(0).getCustomerName());
    }

    @Test
    void testFindAllByOrderByCreatedAtDesc() {
        List<Order> orders = orderRepository.findAllByOrderByCreatedAtDesc();
        assertEquals(2, orders.size());
        // Since completedOrder was saved last, its createdAt timestamp is newer or equal, and its ID is larger.
        // It will be returned first in the descending order.
        assertEquals("Jane Doe", orders.get(0).getCustomerName());
        assertEquals("John Doe", orders.get(1).getCustomerName());
    }
}
