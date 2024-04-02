import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../store/slices/UserSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggler = () => [setIsMenuOpen(!isMenuOpen)];

  const userData = useSelector((state) => state.users.user);

  console.log(userData);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    // CLear the user
    dispatch(clearUser());
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const navItems = [
    { path: "/", title: "Start a search" },
    userData ? { path: "/my-job", title: "My Job" } : "",
    { path: "/salary", title: "Salary Estimate" },
   
  ].filter((item) => item !== null);

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-cemter py-6">
        <a href="/" className="flex items-center gap-2 text-2xl text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
          >
            <circle
              cx="12.0143"
              cy="12.5143"
              r="12.0143"
              fill="#3575E2"
              fillOpacity={0.4}
            />
            <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
          </svg>
          <span>WorkSpace</span>
        </a>
        {/*nav items for large devices */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}

          {userData && (
            <li className="text-base text-primary">
              <NavLink
                to="/post-job"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Post a Job
              </NavLink>
            </li>
          )}
        </ul>

        

        {/* Hide signin and signu if logged in */}
        {!userData && (
          <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
            <Link to="/login" className="py-2 px-5 border rounded">
              Log in
            </Link>
            <Link
              to="/sign-up"
              className="py-2 px-5 border rounded bg-blue text-white"
            >
              Sign up
            </Link>
          </div>
        )}

        {/* Logout button and profile pic if signed in */}
        {userData && userData.uid && (
          <>
            {/* Profile pic */}
            {/* <img className="w-12 h-12 rounded " src={userData.photoURL}></img> */}

            <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
              <div className="py-2 px-5 border rounded" onClick={logoutHandler}>
                Log Out
              </div>
            </div>
          </>
        )}

        {/* 
        <img
          src={`http://localhost:5000/${user.profileImagePath.replace(
            "public",
            ""
          )}`}
          alt="profile photo"
          style={{ objectFit: "cover", borderRadius: "50%" }}
        /> */}

        {/* Logout button and profile pic if signed in */}
        {userData && !userData.uid && (
          <>
            {console.log(
              `http://localhost:5000/${userData.photoURL
                .replace("public\\", "")
                .replace(/\\/g, "/")}/`
            )

            }
            
            
            <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
              <div className="py-2 px-5 border rounded" onClick={logoutHandler}>
                Log Out
              </div>
            </div>


          </>
        )}

        {/* {mobile menu} */}
        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>
      {/* {navitems for mobile} */}
      <div
        className={`px-4 bg-black py-5 rounded-sm ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <li
              key={path}
              className="text-base text-white first:text-white py-1"
            >
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}

          <li className="text-white py-1">
            <Link to="/login" className="py-2 px-5 border rounded">
              Log in
            </Link>
          </li>
          <li>
            <Link
              to="/sign-up"
              className="py-2 px-5 border rounded bg-blue text-white"
            >
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
