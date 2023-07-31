import { NavLink } from "react-router-dom";
import { AppLogo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { useDispatch } from "react-redux";
import { showAlert } from "../utils/alertSlice";
import { buttonClick } from "../animations";
import { motion } from "framer-motion";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const DBLeftSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    const firebaseAuth = getAuth(app);

    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(removeUser());
        dispatch(
          showAlert({ type: "success", message: "Logged out successfully" })
        );
        setTimeout(() => {
          dispatch(
            showAlert({
              type: "",
              message: "",
            })
          );
        }, 5000);
        navigate("/login", { replace: true });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="h-full py-12 px-4 flex flex-col bg-lightOverlay backdrop-blur-md shadow-md min-w-210 w-300 gap-3">
      <NavLink to="/" className="flex items-center justify-start px-6 gap-4">
        <img src={AppLogo} className="w-10 h-10" alt="res-logo" />
        <p className="font-semibold text-2xl text-headingColor">Food Planet</p>
      </NavLink>
      <hr />

      <ul className="flex flex-col gap-4">
        {/* <NavLink
          to="/dashboard/home"
          className={({ isActive }) => {
            return isActive
              ? //   Extra styles added for border
                `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles;
          }}
        >
          Home
        </NavLink> */}
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) => {
            return isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles;
          }}
        >
          Your Profile
        </NavLink>
        <NavLink
          to="/dashboard/orders"
          className={({ isActive }) => {
            return isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles;
          }}
        >
          Orders
        </NavLink>
        <motion.div
          {...buttonClick}
          className=" w-3/4 group flex items-center justify-center px-3 py-2 mt-6 rounded-md shadow-md bg-slate-200  gap-3 hover:bg-slate-400 cursor-pointer"
        >
          <p
            className="text-textColor text-lg group-hover:text-white"
            onClick={handleSignOut}
          >
            Sign Out
          </p>
        </motion.div>
      </ul>

      {/* Help centre box */}
      <div
        className="w-full items-center justify-center flex h-225 mt-auto
px-2 "
      >
        <div
          className="w-full h-full rounded-md bg-red-400 flex
items-center justify-center flex-col gap-3 px-3"
        >
          <div
            className="w-12 h-12 border bg-white rounded-full flex
items-center justify-center"
          >
            <p className="text-2xl font-bold text-red-500">?</p>
          </div>
          <p className="text-xl text-primary font-semibold">Connect With Me!</p>
          <p className="text-base text-gray-300 text-center">
            Have any suggestions? Feel free to contact me!
          </p>
          <a href="" target="_blank">
            <p
              className="px-4 py-2 rounded-full bg-primary text-red-400
cursor-pointer"
            >
              Get in touch
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};
export default DBLeftSection;
