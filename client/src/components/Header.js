import React from "react";
import { useState } from "react";
import { AppLogo } from "../assets";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "../assets";
import { slideTop } from "../animations";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { removeUser } from "../utils/userSlice";

const Header = () => {
  const user = useSelector((store) => store.user.userDetails);
  const [showSignOutMenu, setShowSignOutMenu] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    const firebaseAuth = getAuth(app);

    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(removeUser());
        navigate("/login", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-6">
      <NavLink to="/" className="flex items-center justify-center gap-4">
        <img src={AppLogo} className="w-10 h-10" alt="res-logo" />
        <p className="font-semibold text-2xl text-headingColor">Food Planet</p>
      </NavLink>

      <nav className="flex items-center justify-center gap-8">
        <ul className="hidden md:flex items-center justify-center gap-16">
          {/* isActive is provided by NavLink and we can use it to check which link is active and style it accordingly */}
          <NavLink
            to="/"
            className={({ isActive }) => {
              return isActive ? isActiveStyles : isNotActiveStyles;
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) => {
              return isActive ? isActiveStyles : isNotActiveStyles;
            }}
          >
            Menu
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) => {
              return isActive ? isActiveStyles : isNotActiveStyles;
            }}
          >
            Services
          </NavLink>
          <NavLink
            to="/aboutUs"
            className={({ isActive }) => {
              return isActive ? isActiveStyles : isNotActiveStyles;
            }}
          >
            About Us
          </NavLink>
        </ul>

        {/* Cart */}
        <motion.div {...buttonClick}>
          <p className="text-3xl text-textColor relative cursor-pointer">
            &#128722;
          </p>
          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center absolute -mt-[50px] ml-[20px]">
            <p className="text-primary text-base font-semibold">2</p>
          </div>
        </motion.div>

        {/* Is User has signed In then */}
        {user?.user_id ? (
          <>
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => {
                setShowSignOutMenu(true);
              }}
            >
              <div className="w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center">
                <motion.img
                  className="w-full h-full object-cover"
                  src={user?.picture ? user?.picture : Avatar}
                  whileHover={{ scale: 1.1 }}
                  referrerPolicy="no-referrer"
                ></motion.img>
              </div>

              {/* If User is on User Icon only then show Sign out menu */}
              {showSignOutMenu && (
                <motion.div
                  className="px-6 py-4 w-[160px] bg-cardOverlay
backdrop-blur-md rounded-md shadow-md absolute
flex flex-col gap-4 -ml-[44px]"
                  onMouseLeave={() => setShowSignOutMenu(false)}
                  {...slideTop}
                >
                  <Link
                    className="hover:text-red-500 text-xl text-textColor"
                    to={"/dashboard"}
                  >
                    Dashboard
                  </Link>
                  <Link
                    className="hover:text-red-500 text-xl text-textColor"
                    to={"/profile"}
                  >
                    My Profile
                  </Link>
                  <Link
                    className="hover:text-red-500 text-xl text-textColor"
                    to={"/user-orders"}
                  >
                    Orders
                  </Link>

                  <hr />

                  <motion.div
                    {...buttonClick}
                    className="group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-100hover: bg-gray-200 gap-3 hover:bg-slate-400"
                  >
                    {/* <MdLogout className="text-2xl text-textColor group-hover::text-headingColor" /> */}
                    <p
                      className="text-textColor text-lg group-hover:text-white"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to="/login">
              <motion.button
                {...buttonClick}
                className="px-4 py-2 rounded-full shadow-md bg-cardOverlay border border-red-300 cursor-pointer text-lg"
              >
                Login
              </motion.button>
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
