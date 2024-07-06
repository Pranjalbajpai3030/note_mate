import React from 'react';
import Notes from './Notes';
import logo from './logo.png'; // Adjust the path if logo.png is in a different directory

export const Home = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px', marginBottom: '50px' }}>
            <img src={logo} alt="Logo" style={{ width: '70%', maxWidth: '500px' }} />
            <Notes />
        </div>
    );
}

export default Home;
