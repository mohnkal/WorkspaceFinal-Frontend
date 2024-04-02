import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import PostJob from "../Pages/PostJob";
import MyJobs from "../Pages/MyJobs";
import UpdateJobs from "../Pages/UpdateJobs";
import Login from "../components/Login";
import Signup from "../components/Signup";
import SalaryEstimate from "../Pages/SalaryEstimate";
import JobDetails from "../Pages/JobDetails";
import JobApplicationForm from "../Pages/JobApplicationForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        { path: "/", element: <Home /> },
        {
          path: "/post-job",
          element: <PostJob/>,
        },
        {
          path: "/my-job",
          element: <MyJobs/>,
        },
        {
          path: "/salary",
          element: <SalaryEstimate/>,
        },
        {
          path: "edit-job/:id",
          element: <UpdateJobs/>,
          loader: ({params}) => fetch(`http://localhost:5000/all-jobs/${params.id}`)
        },
        {
          path: "/job/:id",
          element: <JobDetails/>
        },
        {
          path: "/job-form/:id",
          element: <JobApplicationForm/>
        }
        
    ],
  },
  {
   path:"/login",
   element:<Login/>
  },
  {
   path:"/sign-up",
   element:<Signup/>
  },
  {
   path:"/Signup",
   element:<Signup/>
  }
]);
export default router;
