// NoteState.js

import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "668073b8a8f2f105b5ad3fc5",
            "user": "66807368a8f2f105b5ad3fbc",
            "title": "morning meeting",
            "description": "Wake up to reality",
            "tag": "personal",
            "date": "2024-06-29T20:51:04.473Z",
            "__v": 0
        }
    ];

    const [notes, setNotes] = useState(notesInitial);

    // Add a Note
    const addNote = (title, description, tag) => {
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
    };

    // Delete a Note
    const deleteNote = (id) => {
        const updatedNotes = notes.filter(note => note._id !== id);
        setNotes(updatedNotes);
    };

    // Edit a Note
    const editNote = (id, updatedNote) => {
        // Implement edit functionality if needed
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
