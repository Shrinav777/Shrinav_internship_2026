package com.example.notes_backend.service;

import com.example.notes_backend.model.Note;
import java.util.List;

public interface NoteService {

    /**
     * Creates a new note and persists it in the database.
     *
     * @param note the note to be created
     * @return the created note with generated id and timestamps
     */
    Note createNote(Note note);

    /**
     * Updates an existing note identified by its ID.
     *
     * @param id the unique identifier of the note to update
     * @param note the note containing updated fields
     * @return the updated note
     */
    Note updateNote(String id, Note note);

    /**
     * Deletes a note from the database by its ID.
     *
     * @param id the unique identifier of the note to delete
     */
    void deleteNote(String id);

    /**
     * Retrieves all notes from the database.
     *
     * @return a list of all notes
     */
    List<Note> getAllNotes();

    /**
     * Retrieves a single note by its ID.
     *
     * @param id the unique identifier of the note
     * @return the note if found
     */
    Note getNoteById(String id);

    /**
     * Toggles the favorite status of a note.
     *
     * @param id the unique identifier of the note
     * @return the updated note
     */
    Note favoriteNote(String id);

    /**
     * Toggles the archived status of a note.
     *
     * @param id the unique identifier of the note
     * @return the updated note
     */
    Note archiveNote(String id);

    /**
     * Retrieves all notes marked as favorites.
     *
     * @return a list of favorite notes
     */
    List<Note> getFavoriteNotes();

    /**
     * Retrieves all notes marked as archived.
     *
     * @return a list of archived notes
     */
    List<Note> getArchivedNotes();
}
