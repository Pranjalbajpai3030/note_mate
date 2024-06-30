import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItems = (props) => {
    const { note } = props;
    const { deleteNote } = useContext(noteContext);

    const handleDelete = () => {
        deleteNote(note._id);
    };

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <div>
                            <i className="far fa-trash-alt mx-2" onClick={handleDelete}></i>
                            {/* Add onClick event for delete */}
                            <i className="far fa-edit mx-2"></i>
                            {/* Add onClick event for edit */}
                        </div>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    );
};

export default NoteItems;
