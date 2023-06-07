import { Outlet } from "react-router-dom";
import Home from "./Home";
import HomeSlider from "./HomeSlider";
import { useSelector } from "react-redux";
import Alert from "./Alert";

const MainContainer = () => {
  const alert = useSelector((store) => store.alert);
  return (
    <div>
      <div className=" bg-primary p-10">
        <Outlet />
        <Alert type={alert.type} message={alert.message} />;
      </div>
    </div>
  );
};

export default MainContainer;
