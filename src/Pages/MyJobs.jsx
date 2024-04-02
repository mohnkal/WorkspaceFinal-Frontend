import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';



const MyJobs = () => {
  const user = useSelector((state) => state.users.user);
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  ///set current page
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 4;

  useEffect(() => {
    if(user && user.email){
    setIsLoading(true);
    fetch(`http://localhost:5000/myJobs/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
    }
  }, [user, searchText]);


  

  //pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem)

  //next btn & previous btn
  const nextPage = () => {
    if(indexOfLastItem < jobs.length){
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1){
      setCurrentPage(currentPage - 1)
    }
  }

  const handleSearch = () =>{
    const filter = jobs.filter(
        (job) => job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
      );
    //   console.log(filter);
    setJobs(filter);
    setIsLoading(false);
  };

  const handleDelete = (id) => {
    console.log(id)
    fetch(`http://localhost:5000/job/${id}`,{method:"DELETE" }).then(res => res.json).then(data => {
      if(data.acknowledged === true){
        alert("Job Deleted Successfully")
      }
    })
  }

  const handleDownload = (id) =>{
    // Get all the data of applications for job
    axios.post("http://localhost:5000/applications_for_job",{id:id})
    .then((res) =>{
      console.log(res.data)
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('applications');
      
      // Add header row
      const header = Object.keys(res.data.data[0]);
      worksheet.addRow(header);

      // Add data rows
      res.data.data.forEach((rowData) => {
        const row = Object.values(rowData);
        worksheet.addRow(row);
      });

      // Save workbook
      workbook.xlsx.writeBuffer()
        .then((buffer) => {
          const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(blob, 'applications.xlsx');
        })
        .catch((error) => {
          console.error('Error saving Excel file:', error);
        });

    })
  }


  useEffect(() =>{
    console.log(currentJobs)

  }, [currentJobs])


  // console.log(searchText)
  return <div classNameName="max-w-screen-2xl container mx-auto xl:px-24 px-4">
    <div classNameName="my-jobs-container">
        <h1 className="text-center p-4"> All My Jobs</h1>
        <div className="search-box p-2 text-center mb-2">
            <input onChange={(e) => setSearchText(e.target.value)} type="text" name="search" id="search" className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"/>
            <button onClick={handleSearch} className="bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4">Search</button>
        </div>
    </div>

    {/* table */}
    <section class="py-1 bg-blueGray-50">
<div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-base text-blueGray-700">All Jobs</h3>
        </div>
        <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
          <Link to="/post-job"><button class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Post A New Job</button></Link>
        </div>
      </div>
    </div>

    <div class="block w-full overflow-x-auto">
      <table class="items-center bg-transparent w-full border-collapse ">
        <thead>
          <tr>
            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          NO.
                        </th>
          <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          TITLE
                        </th>
           <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          COMPANY NAME
                        </th>
          <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          SALARY
                        </th>
          <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          EDIT
                        </th>
          <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          DELETE
                        </th>
          <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Download Application
                        </th>
          </tr>
        </thead>

        {
          isLoading ? (<div className="flex items-center justify-center h-20"><p>Loading.......</p></div> ) : ("")
        }

        <tbody>
          {
            currentJobs.map((job, index) => (

              <tr key={index} >
              <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
               {index + 1}
              </th>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                {job.jobTitle}
              </td>
              <td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {job.companyName}
              </td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {job.minPrice} - {job.maxPrice}
              </td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <button><Link to={`/edit-job/${job?._id}`}>Edit</Link>
                </button>
              </td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
               <button onClick={() => handleDelete(job._id)}  className="bg-red-700 py-2 px-6 text-white rounded-sm">Delete</button>
              </td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
               <button onClick={() => handleDownload(job._id)}  className="bg-green-700 py-2 px-6 text-white rounded-sm">Download Applications</button>
              </td>
            </tr>))
          }
          
          
        </tbody>

      </table>
    </div>
  </div>
</div>

{/* pagination */}

<div className="flex justify-center text-black space-x-8">
  {
  currentPage > 1 && (
    <button className="hover:underline" onClick={prevPage}>Previous</button>
  )
}
{
  indexOfLastItem < jobs.length && (
    <button className="hover:underline" onClick={nextPage} >Next</button>
  )
}
</div>

</section>
    </div>;
};

export default MyJobs;
