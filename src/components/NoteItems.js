import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItems = (props) => {
    const { note, updateNote } = props;
    const { deleteNote } = useContext(noteContext);

    const handleDelete = () => {
        deleteNote(note._id);
    };

    return (
        <div className="col-md-3 my-3">
            <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
                <div className="bg-white p-4 sm:p-6">
                    <time dateTime="2022-10-10" className="block text-xs text-gray-500"> 10th Oct 2022 </time>

                    <a href="#">
                        <h3 className="mt-0.5 text-lg text-gray-900">{note.title}</h3>
                    </a>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                        {note.description}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                        <strong>Tag:</strong> {note.tag}
                    </p>

                    <div className="flex justify-end space-x-2 mt-4">
                    <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                        <i className="far fa-trash-alt cursor-pointer mx-1" onClick={handleDelete}></i>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default NoteItems;
