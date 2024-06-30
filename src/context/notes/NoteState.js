import React, { useState } from "react";
import NoteContext from "./noteContext.js";

const NoteState = (props) => {
    // Initial state using useState hook
    const [state, setState] = useState({
        name: "Pranjal",
        class: "10 C"
    });

    // Update function to update state
    const update = () => {
        setTimeout(() => {
            setState({
                name: "Anjal",
                class: "10 D"
            });
        }, 1000); // Example setTimeout delay of 1000 ms (1 second)
    };

    return (
        <NoteContext.Provider value={{ state, update }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
