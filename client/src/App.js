import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import store from "./utils/store";
import { getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fadeInOut } from "./animations";
import { addUser } from "./utils/userSlice";
import { validateUserJWTToken } from "./api";
import MainLoader from "./components/MainLoader";
import Alert from "./components/Alert";
import Header from "./components/Header";
import { showDanger } from "./utils/alertSlice";
import Footer from "./components/Footer";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const firebaseAuth = getAuth(app);

  const alert = useSelector((store) => store.alert);

  const dispatch = useDispatch();

  // dispatch(showDanger({ type: "danger", message: "Danger!!!" }));

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        //console.log(cred);
        cred.getIdToken().then((token) => {
          validateUserJWTToken(token).then((data) => {
            dispatch(addUser(data));
            //console.log(data);
          });
        });
      }
    });
    setIsLoading(false);
  }, []);

  return isLoading === true ? (
    <motion.div
      {...fadeInOut}
      className="fixed z-50 inset-0 backdrop-blur-lg flex items-center justify-center w-full "
    >
      <MainLoader />
    </motion.div>
  ) : (
    <div>
      <Alert type={alert.type} message={alert.message} />;
      <Header />
      <Outlet />
      <Footer />
      {/* <Alert type="danger" message="Hi There" /> */}
    </div>
  );
};

export default App;
