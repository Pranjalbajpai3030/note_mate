import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

function NavBar({ isAuthenticated, handleLogout }) {
    let location = useLocation();

    useEffect(() => {
        console.log(location.pathname);
    }, [location]);

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Note Mate</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav-wrapper">
                        {isAuthenticated && (
                            <ul className="navbar-nav mx-auto">
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                                </li>
                            </ul>
                        )}
                        <ul className="navbar-nav align-right">
                            {!isAuthenticated ? (
                                <>
                                    <li className="nav-item my-1">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item my-1">
                                        <Link className="nav-link" to="/signup">Signup</Link>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item my-1">
                                    <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
