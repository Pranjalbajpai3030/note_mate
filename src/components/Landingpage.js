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
                <p>
                    At NoteMate, we are committed to providing a seamless experience for note management. Our platform combines simplicity with powerful features, making it the perfect tool for managing your notes and staying on top of your tasks. Whether you're jotting down quick ideas or managing detailed documents, NoteMate makes note-taking efficient and secure.
                </p>
                <p>
                    Join us today and transform the way you manage your notes with NoteMate – where your thoughts meet organization.
                </p>
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
          background-color: rgba(255, 255, 255, 0.9); /* Slightly transparent background for better text visibility */
          max-width: 50%; /* Ensures content takes up half the screen */
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Optional shadow for a lift effect */
          border-radius: 10px; /* Optional rounded corners */
        }

        .background {
          flex: 1;
          background: url(${backgroundImage}) no-repeat center center;
          background-size: cover;
          height: 100vh; /* Ensures background covers full viewport height */
          width: 50%; /* Ensures background takes up half the screen */
        }

        h1 {
          margin-bottom: 20px;
          font-size: 2.5em;
          font-weight: bold;
        }

        h2 {
          margin: 20px 0;
          font-size: 2em;
          font-weight: normal;
        }

        p {
          margin-bottom: 20px;
          font-size: 1.2em;
          line-height: 1.5;
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
        }
      `}</style>
        </div>
    );
};

export default Landing;
