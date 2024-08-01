import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './image.jpg';

const Landing = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <div className="landing">
            <div className="content">
                <h1>Welcome to NoteMate</h1>
                <p>
                    Welcome to NoteMate, a powerful and intuitive platform designed to enhance your note-taking experience. Whether you're a student, professional, or just someone who loves to stay organized, NoteMate is here to simplify the way you manage your notes.
                </p>
                <h2>Why Choose NoteMate?</h2>
                <div className="cards">
                    <div className="card">
                        <h3>Seamless Note Management</h3>
                        <p>
                            With NoteMate, you can effortlessly manage your notes with our user-friendly interface. Organize, search, and retrieve your notes with ease, ensuring you never lose track of your important information.
                        </p>
                    </div>
                    <div className="card">
                        <h3>Secure and Reliable</h3>
                        <p>
                            Your notes are safe with NoteMate. We prioritize your privacy and data security, providing you with a reliable platform to store and access your notes anytime, anywhere.
                        </p>
                    </div>
                </div>
                <button onClick={handleClick}>Get Started</button>
            </div>
            <div className="background"></div>

            <style jsx>{`
    .landing {
        display: flex;
        height: 100vh;
        overflow: hidden;
        font-family: Arial, sans-serif;
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 40px;
        color: black;
        background-color: rgba(255, 255, 255, 0.9);
        max-width: 50%;
        
        margin-top: 60px; /* Adjust this value as needed */
        
    }

    .background {
        flex: 1;
        background: url(${backgroundImage}) no-repeat center center;
        background-size: cover;
        height: 100vh;
        width: 50%;
    }

    h1 {
        margin-bottom: 20px;
        font-size: 2.5em;
        font-weight: bold;
        color: hsl(213, 91%, 63%); /* Eye-catching blue color */
    }

    h2 {
        margin: 20px 0;
        font-size: 2em;
        font-weight: normal;
        color: hsl(348, 100%, 61%); /* Eye-catching red color */
    }

    p {
        margin-bottom: 20px;
        font-size: 1.2em;
        line-height: 1.5;
    }

    .cards {
        display: flex;
        gap: 20px;
        margin: 20px 0;
    }

    .card {
        background-color: white;
        border: 1px solid #ddd;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
        flex: 1;
        max-width: 250px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .card:hover {
        transform: translateY(-10px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .card h3 {
        margin-top: 0;
        font-size: 1.5em;
        margin-bottom: 10px;
        color: hsl(48, 100%, 67%); /* Eye-catching yellow color */
    }

    .card p {
        font-size: 1em;
        line-height: 1.5;
        margin-bottom: 0;
    }

    button {
        padding: 15px 30px;
        font-size: 1.1em;
        background-color: hsl(213, 91%, 63%);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: hsl(213, 91%, 53%);
    }

    @media (max-width: 768px) {
        .landing {
            flex-direction: column;
        }

        .content, .background {
            width: 100%;
            height: auto;
        }

        .content {
            max-width: 100%;
            padding: 20px;
            text-align: center;
        }

        h1 {
            font-size: 2em;
        }

        h2 {
            font-size: 1.5em;
        }

        .cards {
            flex-direction: column;
            gap: 10px;
        }
    }
`}</style>

        </div>
    );
};

export default Landing;
