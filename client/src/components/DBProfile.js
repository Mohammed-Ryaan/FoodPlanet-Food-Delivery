import React from "react";
import { useSelector } from "react-redux";
import { isNotActiveStyles } from "../utils/styles";

const DBItems = () => {
  const user = useSelector((store) => store.user.userDetails);
  console.log(user);

  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
      <div className="flex flex-col items-start justify-start">
        <h1 className={isNotActiveStyles}>User Name : {user?.name}</h1>
        <h1 className={isNotActiveStyles}>User Email : {user?.email}</h1>
      </div>
    </div>
  );
};

export default DBItems;
