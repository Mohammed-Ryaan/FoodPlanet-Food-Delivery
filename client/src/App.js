import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import store from "./utils/store";
import { getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { fadeInOut } from "./animations";
import { addUser } from "./utils/userSlice";
import { validateUserJWTToken } from "./api";
import MainLoader from "./components/MainLoader";
import Alert from "./components/Alert";
import Header from "./components/Header";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const firebaseAuth = getAuth(app);

  const dispatch = useDispatch();

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
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      <Header />
      <Outlet />
      {/* <Alert type="danger" message="Hi There" /> */}
    </div>
  );
};

export default App;
