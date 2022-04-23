import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Logout from './components/Logout';
import { createContext, useReducer } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserSubscription from './components/UserSubscription';

export const userContext = createContext();

function App() {

  let initialValue = null;

  const reducer = (state, action) => {
    if (action.type == 'USER') {
      return action.payload;
    }else if(action.type == 'TOAST'){
      toast(action.payload);
    }
    return state;
  }

  const [state, dispatch] = useReducer(reducer, initialValue);

  return (
    <>
      <userContext.Provider value={{ state, dispatch }}>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<UserSubscription />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </userContext.Provider>

    </>
  );
}

export default App;
