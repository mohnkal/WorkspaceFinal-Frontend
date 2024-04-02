import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Signup.scss"

const Signup = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        profileImage: null,
    });
    const navigate = useNavigate();

    const handleImage = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setFormData({ ...formData, profileImage: file });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = async () => {
        try {
            // const { email, password, firstName, lastName, profileImage } = formData;
            const formDataToSend = new FormData();
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('firstName', formData.firstName);
            formDataToSend.append('lastName', formData.lastName);
            formDataToSend.append('profileImage', formData.profileImage);


            const data = {
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
                profileImage: formData.profileImage,
            }

            console.log(formDataToSend);

           
            const response = await axios.post('http://localhost:5000/normal_signup', formDataToSend, {
                "headers": {
                  'Content-Type': 'multipart/form-data'
                }
            })

            


            console.log(response.data);
            localStorage.setItem('token', response.data.accessToken);
            navigate('/login');
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className="mainDiv">
            <div className="borderLine">
                <div className="textDetailsDiv">
                    <h1>Create a new user</h1>
                    <p className="description">
                        It looks like you're new here. We need a bit more info to create
                        your new account. Already have an 
                        account?
                        <a href="/login" className="blueText">
                            Login to get started.
                        </a>
                    </p>
                </div>
                <div className="emailBox">
                    <label className="labelEmail" htmlFor="">
                        Email<span className="redstar">*</span>
                    </label>
                    {/* <br /> */}
                    <input
                        className="inputbox"
                        type="email"
                        placeholder="Please enter email here"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="nameBox">
                    <div className="fName">
                        <label className="labelEmail" htmlFor="">
                            First name<span className="redstar">*</span>
                        </label>
                        {/* <br /> */}
                        <input
                            className="nameInputBox"
                            type="text"
                            placeholder="Enter First name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="Lname">
                        <label className="labelLastName" htmlFor="">
                            Last name<span className="redstar">*</span>
                        </label>
                        {/* <br /> */}
                        <input
                            className="lastNameInputBox"
                            type="text"
                            placeholder="Enter Last name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="passBox">
                    <label className="labelPass" htmlFor="">
                        Password<span className="redstar">*</span>
                    </label>
                    {/* <br /> */}
                    <input
                        className="inputbox"
                        type="password"
                        placeholder="Please enter password here"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <br/>
                <div className="profile">
                    <label className="labelProfile" htmlFor="">
                        Profile Photo<span className="redstar">*</span>
                    </label>
                    {/* <br /> */}
                    <input
                        className="inputbox"
                        type="file"
                        id='image'
                        // style={{ display: "none" }}
                        accept='image/*'
                        onChange={handleImage}
                    />
                </div>
                {formData.profileImage && (
                    <img src={URL.createObjectURL(formData.profileImage)} alt="Profile" style={{ maxWidth: "40px"}} />
                )}
                <div className="button">
                    <button className="submitButton" onClick={handleSignup}>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
