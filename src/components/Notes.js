import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItems';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes } = context;

    return (
        <div className="container">
            <AddNote />
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => (
                    <NoteItem key={note._id} note={note} />
                ))}
            </div>
        </div>
    );
};

export default Notes;
