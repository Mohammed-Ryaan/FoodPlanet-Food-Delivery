import React from "react";
import DataTable from "./DataTable";
import { useSelector } from "react-redux";

const DBItems = () => {
  const user = useSelector((store) => store.user.userDetails);

  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
      <div className="flex flex-col items-center justify-center">
        <h1>User Name : </h1>
        <h1>User Email : </h1>
      </div>
    </div>
  );
};

export default DBItems;
