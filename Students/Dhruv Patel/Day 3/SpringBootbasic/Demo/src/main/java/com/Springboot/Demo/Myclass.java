package com.Springboot.Demo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Myclass {

    @GetMapping("/abc")
    public String Hello() {
        return "Hello";
    }
}
