// deleteNote.js

import React, { useContext } from 'react';
import NoteContext from './noteContext';

const DeleteNote = ({ id }) => {
    const { deleteNote } = useContext(NoteContext);

    const handleDelete = () => {
        deleteNote(id);
    };

    return (
        <button onClick={handleDelete}>Delete</button>
    );
};

export default DeleteNote;
