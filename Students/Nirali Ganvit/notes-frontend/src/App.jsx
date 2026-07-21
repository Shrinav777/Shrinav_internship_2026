import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import MyNotes from './pages/MyNotes';
import Favorites from './pages/Favorites';
import Archive from './pages/Archive';
import NoteEditorPage from './pages/NoteEditorPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';

// Define context to manage auth state dynamically
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

function App() {
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('user')) || null;
        } catch (e) {
            return null;
        }
    });

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            <ThemeProvider>
                <BrowserRouter>
                    <Routes>
                        {/* Public auth pages */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />

                        {/* Protected layout and pages */}
                        <Route element={<ProtectedRoute />}>
                            <Route element={<MainLayout />}>
                                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/notes" element={<MyNotes />} />
                                <Route path="/add-note" element={<NoteEditorPage />} />
                                <Route path="/edit/:id" element={<NoteEditorPage />} />
                                <Route path="/favorites" element={<Favorites />} />
                                <Route path="/archive" element={<Archive />} />
                            </Route>
                        </Route>

                        {/* Catch-all path handler */}
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </AuthContext.Provider>
    );
}

export default App;
