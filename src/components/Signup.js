import React from 'react';
import './form.css';
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <div className="form-container">
            <form className="form">
                <div className="header">Sign Up</div>
                <div className="inputs">
                    <input placeholder="Email" className="input" type="text" />
                    <input placeholder="Password" className="input" type="password" />
                    <input placeholder="Confirm Password" className="input" type="password" />
                    <button className="login-btn">Submit</button>
                    <p className="signup-link">Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Signup;
