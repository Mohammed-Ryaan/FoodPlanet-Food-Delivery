import React from "react";
import { useSelector } from "react-redux";
const DBHome = () => {
  const user = useSelector((state) => state.user.userDetails);
  return (
    <div className="w-full flex items-center justify-between gap-3">
      <p className="text-2xl text-headingColor">
        Welcome to City
        {user?.name && (
          <span className="block text-base text-gray-500">{`Hello ${user?.name}...!`}</span>
        )}
      </p>
      <div className=" flex items-center justify-center gap-4 ">
        <div
          className=" flex items-center justify-center gap-3 px-4 py-2
bg-lightOverlay backdrop-blur-md rounded-md shadow-md"
        >
          <input
            type="text"
            placeholder="Search Here..."
            className="border-none qutline-none bg-transparent w-32 text-base font-semibold text-textColor"
          />
          <div className="text-gray-400 text-2xl">Home</div>
        </div>
      </div>
    </div>
  );
};
export default DBHome;
