import React, { useState, useEffect } from 'react';
import NoteContext from './noteContext.js';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const [notes, setNotes] = useState([]);

    // Fetch all notes
    const getNotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch notes');
            }
            const json = await response.json();
            setNotes(json);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    // Add a note
    const addNote = async (title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify({ title, description, tag })
            });
            if (!response.ok) {
                throw new Error('Failed to add note');
            }
            const newNote = await response.json();
            setNotes([...notes, newNote]);
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    // Delete a note
    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete note');
            }
            setNotes(notes.filter(note => note._id !== id));
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify({ title, description, tag })
            });
            if (!response.ok) {
                throw new Error('Failed to update note');
            }
            setNotes(notes.map(note =>
                note._id === id ? { ...note, title, description, tag } : note
            ));
        } catch (error) {
            console.error("Error editing note:", error);
        }
    };

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
