import React from "react";
import DBLeftSection from "./DBLeftSection";
import DBRightSection from "./DBRightSection";
import Alert from "./Alert";

//Here DB is DashBoard and not DataBase

const Dashboard = () => {
  return (
    <div className="w-screen h-screen flex items-center bg-primary">
      <DBLeftSection />
      <DBRightSection />
      <Alert type={alert.type} message={alert.message} />;
    </div>
  );
};

export default Dashboard;
