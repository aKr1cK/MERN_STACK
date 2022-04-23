import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';

function Logout(){
    let navigate = useNavigate();
    const {state , dispatch} = useContext(userContext);
    useEffect(()=>{

        fetch('/logout').then((resp) => {
            dispatch({type:'USER', payload: false});
            navigate("/login", { replace: true });
        }).catch((e) => {
            console.log(e);
        })

    });
    return (
        <div></div>
    );
}

export default Logout;