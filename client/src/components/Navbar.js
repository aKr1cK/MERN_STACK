import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { userContext } from '../App';
import logo from '../logo.svg'
import './Navbar.css';


const Navbar = () => {
    const { state, dispatch } = useContext(userContext);

    const Routing = () => {
        if(state){
            return (
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/home">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/logout">Logout</NavLink>
                    </li>
                </ul>
            );
        }else{
            return (
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {/* <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/signup">Signup</NavLink>
                    </li> */}
                </ul>
            );
        }
        
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand">
                        <img src={logo} alt="" width="30" height="24" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <Routing></Routing>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;