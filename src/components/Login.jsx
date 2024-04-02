import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import {getFirestore, collection, doc, setDoc } from "firebase/firestore"

import { useNavigate  } from 'react-router-dom';
import  axios  from 'axios';

import "./Login.scss";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../firebase/firebase.config"
import { getAuth } from "firebase/auth";

import {useDispatch} from 'react-redux';
import { addUser } from "../store/slices/UserSlice"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();


  // dispatcher
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/normal_login", {
        email,
        password,
      })
      

        const user = response.data.user;

        console.log(user);

        // Create user profile
        const userProfile = {
          displayName: user.firstName,
          email: user.email,
          photoURL: user.profileImagePath,
          // Add any other necessary fields for the user profile
        };


      if (response.status === 200 && response.data.user && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        // set user
        dispatch(addUser(userProfile));
        console.log("Login successful");
        navigate("/");
      } else {
        console.error("Login failed. Response:", response.data);
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };
  
  

  const googleprovider = new GoogleAuthProvider();

  const handleGoogleLogin = () => {
    const googleprovider = new GoogleAuthProvider();
    signInWithPopup(auth, googleprovider)
      .then((result) => {
        const user = result.user;

        // Create user profile
        const userProfile = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          // Add any other necessary fields for the user profile
        };

        // Save user profile to Firestore
        const db = getFirestore();
        const usersRef = collection(db, 'users');
        const userDoc = doc(usersRef, user.uid);
        setDoc(userDoc, userProfile);

        // Save to redux state
        dispatch(addUser(userProfile));

        // Redirect to the jobs page
        navigate('/');
      })
      .catch((error) => {
        console.error('Error logging in with Google:', error.message);
      });
  };
  return ( 
    <>
      <div className="Login">
        <div className="borderline">
          <h1>Login</h1>
          <p className="text">
            Welcome back.If new? Create your account.{" "}
            <a href="/Signup" className="bluetext">
              Signup to get started.
            </a>{" "}
          </p>
          <label className="labelEmail" htmlFor="">
            Email<span className="redstar">*</span>
          </label>
          <input
            type="email"
            placeholder="Please enter Email here"
            className="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label className="labelPass" htmlFor="">
            Password<span className="redstar">*</span>
          </label>
          <input
            type="password"
            placeholder="Please enter Password here"
            className="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <br /> <br />
          <button className="loginbtn" onClick={handleLogin}>
            Login
          </button>{" "}
          <br />
          <span className="or">OR</span> <br />
          <button className="icon" onClick={handleGoogleLogin}>
            <FaGoogle />
            &nbsp;Login with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
