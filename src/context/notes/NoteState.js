import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    // Fetch all notes
    const getNotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODA3MzY4YThmMmYxMDViNWFkM2ZiYyIsImlhdCI6MTcxOTY5NDIwMH0.7VBZGLxQTZddXJBiO2yvi7Dvc98kbY9N1W5TgHv-lj4'
                }
            });
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
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODA3MzY4YThmMmYxMDViNWFkM2ZiYyIsImlhdCI6MTcxOTY5NDIwMH0.7VBZGLxQTZddXJBiO2yvi7Dvc98kbY9N1W5TgHv-lj4'
                },
                body: JSON.stringify({ title, description, tag })
            });

            const newNote = {
                "_id": Date.now().toString(),
                "user": "66807368a8f2f105b5ad3fbc",
                "title": title,
                "description": description,
                "tag": tag,
                "date": new Date().toISOString(),
                "__v": 0
            };
            setNotes([...notes, newNote]);
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    // Delete a note
    const deleteNote = async (id) => {
        try {
            await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODA3MzY4YThmMmYxMDViNWFkM2ZiYyIsImlhdCI6MTcxOTY5NDIwMH0.7VBZGLxQTZddXJBiO2yvi7Dvc98kbY9N1W5TgHv-lj4'
                }
            });

            const updatedNotes = notes.filter(note => note._id !== id);
            setNotes(updatedNotes);
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        try {
            await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODA3MzY4YThmMmYxMDViNWFkM2ZiYyIsImlhdCI6MTcxOTY5NDIwMH0.7VBZGLxQTZddXJBiO2yvi7Dvc98kbY9N1W5TgHv-lj4'
                },
                body: JSON.stringify({ title, description, tag })
            });

            const updatedNotes = notes.map(note => 
                note._id === id ? { ...note, title, description, tag } : note
            );
            setNotes(updatedNotes);
        } catch (error) {
            console.error("Error editing note:", error);
        }
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
