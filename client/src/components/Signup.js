import React, { useState } from 'react';
import './Signup.css';
import logo from '../../src/blogging.svg';
import { NavLink } from 'react-router-dom';

const Signup = () => {
    const [user, setUser] = useState({
        "name": "",
        "email": "",
        "phone": "",
        "work": "",
        "cpassword": "",
        "password": ""
    });

    let name, value;

    const handleInputs = (e) => {
        name = e.target.id;
        value = e.target.value;
        setUser({ ...user, [name]: value });
        console.log(user);
    }

    const postData = async (e) => {
        e.preventDefault();

        try {
            let resp = await fetch('/register', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            resp = await resp.json();

            if (!resp || resp.status === 422) {
                console.log('Error occured');
                alert('FAILED');
            } else {
                console.log('registration successful');
                alert('SUCCESS');
            }
        } catch (e) {
            console.log(e);
            alert(e);
        }
    }
    return (
        <>
            <div className='d-flex align-items-center justify-content-center'>
                <div className="card signup shadow" style={{ width: "50%" }}>
                    <div className="card-body row">
                        <div className="col-md-6">
                            <form method='POST'>
                                <div className="mb-2 row">
                                    <div>
                                        <h3>SIGN UP</h3>
                                    </div>
                                </div>
                                <div className="mb-2 row">
                                    <div className="col-sm-12">
                                        <input type="text" value={user.name} onChange={handleInputs} className="form-control" id="name" style={{ fontFamily: "Arial, FontAwesome" }} placeholder="&#xf007;&nbsp; Username" />
                                    </div>
                                </div>

                                <div className="mb-2 row">
                                    <div className="col-sm-12">
                                        <input type="email" value={user.email} onChange={handleInputs} className="form-control" id="email" style={{ fontFamily: "Arial, FontAwesome" }} placeholder="&#xf0e0;&nbsp; Email" />
                                    </div>
                                </div>

                                <div className="mb-2 row">
                                    <div className="col-sm-12">
                                        <input type="number" value={user.phone} onChange={handleInputs} className="form-control" id="phone" style={{ fontFamily: "Arial, FontAwesome" }} placeholder="&#xf098;&nbsp; Contact No." />
                                    </div>
                                </div>

                                <div className="mb-2 row">
                                    <div className="col-sm-12">
                                        <input type="text" value={user.work} onChange={handleInputs} className="form-control" id="work" style={{ fontFamily: "Arial, FontAwesome" }} placeholder="&#xf0b1;&nbsp; Work." />
                                    </div>
                                </div>

                                <div className="mb-2 row">
                                    <div className="col-sm-12">
                                        <input type="password" value={user.password} onChange={handleInputs} className="form-control" id="password" style={{ fontFamily: "Arial, FontAwesome" }} placeholder="&#xf023;&nbsp; Password" />
                                    </div>
                                </div>

                                <div className="mb-2 row">
                                    <div className="col-sm-12">
                                        <input type="password" value={user.cpassword} onChange={handleInputs} className="form-control" id="cpassword" style={{ fontFamily: "Arial, FontAwesome" }} placeholder="&#xf023;&nbsp; Confirm password" />
                                    </div>
                                </div>

                                <div className="mb-2 row">
                                    <div className="col-sm-12">
                                        <button type="submit" onClick={postData} className="btn btn-success form-control">Register</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6 row">
                            <div>
                                <img className="h-85" src={logo} alt="" width="100%" height="85%" />
                                <div className="h-15 text-center"><NavLink className="nav-link" aria-current="page" to="/login">I already have account</NavLink></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
}

export default Signup;