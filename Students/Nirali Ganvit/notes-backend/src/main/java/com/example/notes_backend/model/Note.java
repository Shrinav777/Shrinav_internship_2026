package com.example.notes_backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "notes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Note {
    @Id
    private String id;
    private String title;
    private String content;
    private String category;
    private boolean favorite;
    private boolean archived;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
