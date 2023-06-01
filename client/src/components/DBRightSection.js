import React from "react";
import { Outlet } from "react-router-dom";
const DBRightSection = () => {
  return (
    <div className="flex flex-col py-12 px-12 flex-1 h-full ">
      <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-none">
        <Outlet />
      </div>
    </div>
  );
};

export default DBRightSection;
