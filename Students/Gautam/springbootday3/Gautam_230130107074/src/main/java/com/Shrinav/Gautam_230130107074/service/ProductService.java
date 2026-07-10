/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.Shrinav.Gautam_230130107074.service;

/**
 *
 * @author Gautam parmar
 */
import com.Shrinav.Gautam_230130107074.entity.Product;
import com.Shrinav.Gautam_230130107074.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {
    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<Product> getAll() {
        return repo.findAll();
    }

    public Product getById(Integer id) {
        return repo.findById(id).orElse(null);
    }

    public Product save(Product product) {
        return repo.save(product);
    }

    public void delete(Integer id) {
        repo.deleteById(id);
    }    
}
