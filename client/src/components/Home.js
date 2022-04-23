import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';

function Home(){
    const { state, dispatch } = useContext(userContext);
    let dataRecieved;
    let navigate = useNavigate();
    if(state !== true){
        dispatch({type:'USER', payload: false});
        navigate("/login", { replace: true });
    }
    
    async function getData(){
        debugger;
        try {
            let resp = await fetch('/getActiveUser', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            });

            resp = await resp.json();

            if (!resp || resp.status === 422) {
            } else {
                console.log(resp);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(()=>{
        dataRecieved = getData();
    },[dataRecieved])
    

    return (
        <div>home</div>
    );
}


export default Home;