import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import './JobApplicationForm.css';
import axios from "axios";
import { useParams } from "react-router-dom";

function JobApplicationForm() {
  const navigate = useNavigate();

  // Get job id
  const jobId = useParams('id');

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resume: null,
    dateAvailable: "",
    desiredPay: "",
    experienceOSGI: 0,
    jobId:jobId.id
  });
  

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(`Setting ${name} to ${value}`);
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };
  
  
 
  const handleFileChange = (e) => {
    console.log('File selected:', e.target.files[0]);
    setFormData((prevState) => ({
      ...prevState,
      resume: e.target.files[0],
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      console.log(formData.firstName);
      const formDataToSend = new FormData();      
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('resume', formData.resume);
      formDataToSend.append('dateAvailable', formData.dateAvailable);
      formDataToSend.append('desiredPay', formData.desiredPay);
      formDataToSend.append('experienceOSGI', formData.experienceOSGI);
      




  
      // Log the formData before sending the request
      console.log('formData:', formDataToSend);
  
      const response = await axios.post('http://localhost:5000/submit-application', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.status === 201) {
        Swal.fire('Success', 'Job Applied Successfully!', 'success');
        navigate('/');
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          resume: null,
          dateAvailable: "",
          desiredPay: "",
          experienceOSGI: 0, // Corrected field name
        });
      } else {
        Swal.fire('Error', 'Failed to apply for the job. Please try again later.', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to apply for the job. Please try again later.', 'error');
    }
  };
  

  console.log(formData)

  return (
    <form className="apply" >
      <div>
        <label>First Name:</label>
        <input
        className="first"
          type="text"
          name="firstName"
          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
        className="last"
          type="text"
          name="lastName"
          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
        className="mail"
          type="email"
          name="email"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
        className="phone"
          type="tel"
          name="phone"
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          required
        />
      </div>
      <div>
        <label>Resume:</label>
        <input className="resume" type="file" name="resume" onChange={(e) => setFormData({...formData, resume: e.target.value})} required />
      </div>
      <div>
        <label>Date Available:</label>
        <input
        className="date"
          type="date"
          name="dateAvailable"
          onChange={(e) => setFormData({...formData, dateAvailable: e.target.value})}
          required
        />
      </div>
      <div>
        <label>Desired Pay:</label>
        <input
        className="pay"
          type="text"
          name="desiredPay"
          value={formData.desiredPay}
          onChange={(e) => setFormData({...formData, desiredPay: e.target.value})}
          required
        />
      </div>
      <div>
        <label>How many years of experience do you have?</label>
        <input
        className="exp"
          type="number"
          name="experience"
          value={formData.experience}
          onChange={(e) => setFormData({...formData, experience: e.target.value})}
          required
        />
      </div>
      <button className="sub" type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default JobApplicationForm;


