import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import PostJob from "../Pages/PostJob";
import MyJobs from "../Pages/MyJobs";
import UpdateJobs from "../Pages/UpdateJobs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        { path: "/", element: <Home /> },
        {
          path: "post-job",
          element: <PostJob/>,
        },
        {
          path: "my-job",
          element: <MyJobs/>,
        },
        {
          path: "edit-job/:id",
          element: <UpdateJobs/>,
          loader: ({params}) => fetch(`http://localhost:5000/all-jobs/${params.id}`)
        },
    ],
  },
]);
export default router;
