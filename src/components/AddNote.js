import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import './AddNote.css';  // Make sure to import the CSS file

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: '', description: '', tag: 'default' });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="note-container my-3">
      <h2 className="note-heading">Add a Note</h2>
      <form className="note-form my-3">
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="note-input" id="title" name="title" onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="note-input" id="description" name="description" onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Tag</label>
          <input type="text" className="note-input" id="tag" name="tag" onChange={onChange} />
        </div>
        <button type="submit" className="note-submit-button" onClick={handleClick}>Submit</button>
      </form>
    </div>
  );
};

export default AddNote;
