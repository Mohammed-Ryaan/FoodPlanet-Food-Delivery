import React from "react";
import DBLeftSection from "./DBLeftSection";
import DBRightSection from "./DBRightSection";

//Here DB is DashBoard and not DataBase

const Dashboard = () => {
  return (
    <div className="w-screen h-screen flex items-center bg-primary">
      <DBLeftSection />
      <DBRightSection />
    </div>
  );
};

export default Dashboard;
