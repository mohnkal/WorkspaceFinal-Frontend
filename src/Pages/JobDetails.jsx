// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import Swal from 'sweetalert2'
// import PageHeader from '../components/PageHeader';
// import { FaSuitcase } from 'react-icons/fa6';


// const JobDetails = () => {
//     const {id} = useParams();
//     const [job,setJob] = useState([])
//     useEffect(() => {
//         fetch(`http://localhost:5000/all-jobs/${id}`).then(res => res.json()).then(data => setJob(data))
//     }, [])
//     const handleApply = async() =>  {
//         const { value: url } = await Swal.fire({
//             input: "url",
//             inputLabel: "URL address",
//             inputPlaceholder: "Enter the URL"
//           });
//           if (url) {
//             Swal.fire(`Entered URL: ${url}`);
//           }
//     }
//   return (
    
//     <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
//         <PageHeader title={job.jobTitle} path={"Single Job"}/>
//       <h2 className='mb-4'> Job ID: {id}</h2>
//       <h1 className='text-blue text-xl'>Job details</h1>
//       <p className=' italic'>Here's how the job details align with your job preferences. Manage job preferences anytime in your profile.</p>
//       <div className='flex items-center gap-2'>
//         <FaSuitcase/> Job Type
       
//       </div>
//       <button className='bg-[#362DA2] px-8 py-2 text-white mx-2'>{job.employmentType}</button>

//       <button className='bg-blue px-8 py-2 text-white' onClick={handleApply}>Apply Now</button>
//     </div>
//   )
// }

// export default JobDetails
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import PageHeader from '../components/PageHeader';
import { FaSuitcase } from 'react-icons/fa6';

const JobDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate(); // Use the useNavigate hook
    const [job,setJob] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/all-jobs/${id}`).then(res => res.json()).then(data => setJob(data));
    }, [id]);

    const handleApply = async() =>  {
        // Simplified for brevity - assuming you want to navigate directly to the form
        navigate(`/job-form/${id}`); // Adjust the path as needed
    };

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <PageHeader title={job.jobTitle} path={"Single Job"}/>
            <h2 className='mb-4'> Job ID: {id}</h2>
            <h1 className='text-blue text-xl'>Job details</h1>
            <p className=' italic'>Here's how the job details align with your job preferences. Manage job preferences anytime in your profile.</p>
            <div className='flex items-center gap-2'>
                <FaSuitcase/> Job Type
            </div>
            <button className='bg-[#362DA2] px-8 py-2 text-white mx-2'>{job.employmentType}</button>

            <button className='bg-blue px-8 py-2 text-white' onClick={handleApply}>Apply Now</button>
        </div>
    );
};

export default JobDetails;
