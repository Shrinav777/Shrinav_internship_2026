package com.example.notes_backend.service;

import com.example.notes_backend.model.User;

public interface UserService {

    /**
     * Registers a new user in the system.
     *
     * @param user the user details to register
     * @return the registered user saved in MongoDB
     */
    User registerUser(User user);

    /**
     * Authenticates a user based on email and password.
     *
     * @param email    the user's email address
     * @param password the user's password
     * @return the authenticated User object
     */
    User loginUser(String email, String password);

    /**
     * Resets a user's password if the email exists.
     *
     * @param email       the user's email address
     * @param newPassword the new password to set
     * @return the updated user object
     */
    User forgotPassword(String email, String newPassword);

    /**
     * Retrieves a user by their unique identifier.
     *
     * @param id the user's unique id
     * @return the user object if found
     */
    User getUserById(String id);
}
