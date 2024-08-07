// Notes.js
import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItems';
import AddNote from './AddNote';
import './Notes.css';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ _id: '', etitle: '', edescription: '', etag: '' });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ _id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await editNote(note._id, note.etitle, note.edescription, note.etag);
            refClose.current.click();
            getNotes(); // Refresh notes after update
            props.showAlert('Note updated successfully', 'success');
            // Reset note state to clear the form fields
            setNote({ _id: '', etitle: '', edescription: '', etag: '' });
        } catch (error) {
            props.showAlert('Error updating note', 'danger');
            console.error('Error updating note:', error);
        }
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <AddNote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container row my-3">
                <h1 className="notes-heading">Your Notes</h1> {/* Changed to h1 and added class */}
                <div className="container">{notes.length === 0 && 'No Notes To Show'}</div>
                {notes.map((note) => (
                    <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                ))}
            </div>
        </div>
    );
};

export default Notes;
