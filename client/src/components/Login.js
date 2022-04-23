import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Signup.css';
import logo from '../../src/login.svg';
import { NavLink } from 'react-router-dom';
import {userContext} from '../App';

function Login() {
    let navigate = useNavigate();

    const {state , dispatch} = useContext(userContext);
    const [credentials, setCredentials] = useState({
        name: "",
        password: ""
    });

    let name, value;

    const handleInputs = (e) => {
        name = e.target.id;
        value = e.target.value;
        setCredentials({ ...credentials, [name]: value });
        console.log(credentials);
    }

    const postData = async (e) => {
        e.preventDefault();
        try {
            let resp = await fetch('/signin', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            resp = await resp.json();

            if (!resp || resp.status === 422) {
                console.log('Error occured');
                alert('FAILED');
            } else {
                dispatch({type:'USER', payload: true});
                navigate("/home", { replace: true });
            }
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <>
            <div className='d-flex align-items-center justify-content-center'>
                <div className="card signup shadow" style={{ width: "50%" }}>
                    <div className="card-body row">
                        <div className="col-md-6 align-items-center">
                            <div className="h-65"><img src={logo} alt="" width="100%" height="100%" /></div>
                            <div className="h-35 text-center"><NavLink className="nav-link" aria-current="page" to="/signup">Create an account</NavLink></div>
                        </div>
                        <div className="col-md-6">
                            <form>
                                <div className="mb-3 row">
                                    <div>
                                        <h3>SIGN IN</h3>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-sm-12">
                                        <input type="text" value={credentials.name} onChange={handleInputs} className="form-control" id="name" style={{ fontFamily: "Arial, FontAwesome" }} placeholder="&#xf007;&nbsp; Username" />
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <div className="col-sm-12">
                                        <input type="password" value={credentials.password} onChange={handleInputs} className="form-control" id="password" style={{ fontFamily: "Arial, FontAwesome" }} placeholder="&#xf023;&nbsp; Password" />
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <div className="col-sm-12">
                                        <button type="submit" onClick={postData} className="btn btn-primary">Log In</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Login;