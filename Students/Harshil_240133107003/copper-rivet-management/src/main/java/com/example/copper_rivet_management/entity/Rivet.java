package com.example.copper_rivet_management.entity;

import jakarta.persistence.*;

@Entity
public class Rivet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String rivetType;
    private int quantity;
    private double price;

    public Rivet() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getRivetType() {
        return rivetType;
    }

    public void setRivetType(String rivetType) {
        this.rivetType = rivetType;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}