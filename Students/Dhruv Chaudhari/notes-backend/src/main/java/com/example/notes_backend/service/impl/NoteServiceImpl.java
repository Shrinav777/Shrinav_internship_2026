package com.example.notes_backend.service.impl;

import com.example.notes_backend.exception.ResourceNotFoundException;
import com.example.notes_backend.model.Note;
import com.example.notes_backend.repository.NoteRepository;
import com.example.notes_backend.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;

    @Override
    public Note createNote(Note note) {
        note.setCreatedAt(LocalDateTime.now());
        note.setUpdatedAt(LocalDateTime.now());
        note.setArchived(false); // Default to active (not archived)
        return noteRepository.save(note);
    }

    @Override
    public Note updateNote(String id, Note noteDetails) {
        Note note = getNoteById(id);

        note.setTitle(noteDetails.getTitle());
        note.setContent(noteDetails.getContent());
        note.setCategory(noteDetails.getCategory());
        note.setFavorite(noteDetails.isFavorite());
        note.setArchived(noteDetails.isArchived());
        note.setUpdatedAt(LocalDateTime.now());

        return noteRepository.save(note);
    }

    @Override
    public void deleteNote(String id) {
        Note note = getNoteById(id);
        noteRepository.delete(note);
    }

    @Override
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    @Override
    public Note getNoteById(String id) {
        return noteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Note not found with id: " + id));
    }

    @Override
    public Note favoriteNote(String id) {
        Note note = getNoteById(id);
        note.setFavorite(!note.isFavorite());
        note.setUpdatedAt(LocalDateTime.now());
        return noteRepository.save(note);
    }

    @Override
    public Note archiveNote(String id) {
        Note note = getNoteById(id);
        note.setArchived(!note.isArchived());
        // UX design: If a note is archived, it is automatically un-favorited
        if (note.isArchived()) {
            note.setFavorite(false);
        }
        note.setUpdatedAt(LocalDateTime.now());
        return noteRepository.save(note);
    }

    @Override
    public List<Note> getFavoriteNotes() {
        return noteRepository.findByFavorite(true);
    }

    @Override
    public List<Note> getArchivedNotes() {
        return noteRepository.findByArchived(true);
    }
}
