import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { userContext } from '../App';

export default function UserSubscription() {

    const { state, dispatch } = useContext(userContext);

    let [userList, setUserList] = useState([]);

    let [planList, setPlanList] = useState([]);

    let [selectedUser, setUser] = useState(0);

    let [selectedPlan, setPlan] = useState(0);

    async function getUsers() {
        try {
            let resp = await fetch('/getUsers', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            });

            resp = await resp.json();

            if (!resp || resp.status === 422) {
                dispatch({type:'TOAST', payload: resp.error});
            } else {
                setUserList(resp);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function getPlans() {
        try {
            let resp = await fetch('/getPlans', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            });

            resp = await resp.json();

            if (!resp || resp.status === 422) {
                dispatch({type:'TOAST', payload: resp.error});
            } else {
                setPlanList(resp);
            }
        } catch (e) {
            console.log(e);
        }
    }
    try {
        useEffect(() => {
            getUsers();
            getPlans();
        }, [])

    } catch (e) {
        console.log(e);
    }

    let id, value;

    const handleInputs = (e) => {

        id = e.target.id;
        value = e.target.value;
        if (id === 'userId') {
            setUser(value);
        } else {
            setPlan(value);
        }
    }

    const subscribeUser = async (e) => {
        e.preventDefault();
        console.log(selectedUser+'    '+selectedPlan);
        try {
            let resp = await fetch('/setUserPlan', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({userId: selectedUser, planId: selectedPlan})
            });

            resp = await resp.json();

            if (!resp || resp.status === 422) {
                dispatch({type:'TOAST', payload: resp.error});
            } else {
                dispatch({type:'TOAST', payload: resp.msg});
                setUser('');
                setPlan('');
            }
        } catch (e) {
            dispatch({type:'TOAST', payload: 'User subscription failed !!'});
        }
    }

    return (
        <>
            <div className='d-flex align-items-center justify-content-center'>
                <div className="card signup shadow" style={{ width: "50%" }}>
                    <div className="card-body row">
                        <div className="col-md-12 align-items-center">
                            <form>
                                <div className="mb-3 row">
                                    <div>
                                        <h3>Subscibe plan for user</h3>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-sm-12">
                                        <select className="form-control" value={selectedUser} id="userId" onChange={handleInputs}>
                                            <option defaultValue value="">Select User</option>
                                            {userList.length > 0 && userList.map((item) =>

                                                <option key={item._id} value={item._id}>
                                                    {item.name}
                                                </option>

                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <div className="col-sm-12">
                                        <select className="form-control" id="planId" value={selectedPlan} onChange={handleInputs}>
                                            <option defaultValue value="">Select Plan</option>
                                            {planList.length > 0 && planList.map((item) =>

                                                <option key={item._id} value={item._id}>
                                                    {item.name}
                                                </option>

                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <div className="col-sm-12">
                                        <button type="submit" onClick={subscribeUser} className="btn btn-primary">Subscibe</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
