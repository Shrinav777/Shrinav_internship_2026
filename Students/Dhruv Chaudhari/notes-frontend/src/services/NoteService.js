import axios from "axios";

const API = `${import.meta.env.VITE_API_BASE_URL}/notes`;

const noteService = {

    getAllNotes: async () => {
        const response = await axios.get(API);
        return response.data;
    },

    getNoteById: async (id) => {
        const response = await axios.get(`${API}/${id}`);
        return response.data;
    },

    createNote: async (note) => {
        const response = await axios.post(API, note);
        return response.data;
    },

    updateNote: async (id, noteDetails) => {
        const response = await axios.put(`${API}/${id}`, noteDetails);
        return response.data;
    },

    deleteNote: async (id) => {
        const response = await axios.delete(`${API}/${id}`);
        return response.data;
    },

    favoriteNote: async (id) => {
        const response = await axios.put(`${API}/${id}/favorite`);
        return response.data;
    },

    archiveNote: async (id) => {
        const response = await axios.put(`${API}/${id}/archive`);
        return response.data;
    },

    getFavoriteNotes: async () => {
        const response = await axios.get(`${API}/favorites`);
        return response.data;
    },

    getArchivedNotes: async () => {
        const response = await axios.get(`${API}/archive`);
        return response.data;
    }

};

export default noteService;