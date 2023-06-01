import { NavLink } from "react-router-dom";
import { AppLogo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";

const DBLeftSection = () => {
  return (
    <div className="h-full py-12 flex flex-col bg-lightOverlay backdrop-blur-md shadow-md min-w-210 w-300 gap-3">
      <NavLink to="/" className="flex items-center justify-start px-6 gap-4">
        <img src={AppLogo} className="w-10 h-10" alt="res-logo" />
        <p className="font-semibold text-2xl text-headingColor">Food Planet</p>
      </NavLink>
      <hr />

      <ul className="flex flex-col gap-4">
        <NavLink
          to="/dashboard/home"
          className={({ isActive }) => {
            return isActive
              ? //   Extra styles added for border
                `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles;
          }}
        >
          Home
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
        <NavLink
          to="/dashboard/items"
          className={({ isActive }) => {
            return isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles;
          }}
        >
          Items
        </NavLink>
        <NavLink
          to="/dashboard/newItem"
          className={({ isActive }) => {
            return isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles;
          }}
        >
          New Items
        </NavLink>
        <NavLink
          to="/dashboard/addNewItem"
          className={({ isActive }) => {
            return isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles;
          }}
        >
          Add New Item
        </NavLink>
        <NavLink
          to="/dashboard/users"
          className={({ isActive }) => {
            return isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles;
          }}
        >
          Users
        </NavLink>
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
          <p className="text-xl text-primary font-semibold">Help Center</p>
          <p className="text-base text-gray-300 text-center">
            Having trouble in city. Please contact us for more questions
          </p>
          <p
            className="px-4 py-2 rounded-full bg-primary text-red-400
cursor-pointer"
          >
            Get in touch
          </p>
        </div>
      </div>
    </div>
  );
};
export default DBLeftSection;
