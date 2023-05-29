import React from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      <Outlet />
    </div>
  );
};

export default App;
