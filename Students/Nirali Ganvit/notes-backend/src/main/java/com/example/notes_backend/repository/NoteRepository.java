package com.example.notes_backend.repository;

import com.example.notes_backend.model.Note;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends MongoRepository<Note, String> {

    /**
     * Find notes by their favorite status.
     *
     * @param favorite true to find favorite notes, false for regular notes
     * @return a list of matching notes
     */
    List<Note> findByFavorite(boolean favorite);

    /**
     * Find notes by their archived status.
     *
     * @param archived true to find archived notes, false for active notes
     * @return a list of matching notes
     */
    List<Note> findByArchived(boolean archived);
}
