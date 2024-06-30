import React ,{useContext, useEffect} from 'react';
import noteContext from '../context/notes/noteContext.js';


function About() {
    const { state, update } = useContext(noteContext);

    return (
        <div>
            <h1>About Us</h1>
            <p>Name: {state.name}</p>
            <p>Class: {state.class}</p>
            <button onClick={update}>Update State</button>
        </div>
    );
}

export default About;

