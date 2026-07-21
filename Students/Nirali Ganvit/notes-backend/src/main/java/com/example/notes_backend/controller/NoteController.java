package com.example.notes_backend.controller;

import com.example.notes_backend.model.Note;
import com.example.notes_backend.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    @GetMapping
    public ResponseEntity<List<Note>> getAllNotes() {
        List<Note> notes = noteService.getAllNotes();
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/favorites")
    public ResponseEntity<List<Note>> getFavoriteNotes() {
        List<Note> favoriteNotes = noteService.getFavoriteNotes();
        return ResponseEntity.ok(favoriteNotes);
    }

    @GetMapping("/archive")
    public ResponseEntity<List<Note>> getArchivedNotes() {
        List<Note> archivedNotes = noteService.getArchivedNotes();
        return ResponseEntity.ok(archivedNotes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable String id) {
        Note note = noteService.getNoteById(id);
        return ResponseEntity.ok(note);
    }

    @PostMapping
    public ResponseEntity<Note> createNote(@RequestBody Note note) {
        Note createdNote = noteService.createNote(note);
        return new ResponseEntity<>(createdNote, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable String id, @RequestBody Note noteDetails) {
        Note updatedNote = noteService.updateNote(id, noteDetails);
        return ResponseEntity.ok(updatedNote);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteNote(@PathVariable String id) {
        noteService.deleteNote(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Note deleted successfully");
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/favorite")
    public ResponseEntity<Note> favoriteNote(@PathVariable String id) {
        Note updatedNote = noteService.favoriteNote(id);
        return ResponseEntity.ok(updatedNote);
    }

    @PutMapping("/{id}/archive")
    public ResponseEntity<Note> archiveNote(@PathVariable String id) {
        Note updatedNote = noteService.archiveNote(id);
        return ResponseEntity.ok(updatedNote);
    }
}
