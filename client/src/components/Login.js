import {
  LoginBg,
  AppLogo,
  EmailIcon,
  PasswordIcon,
  GoogleIcon,
} from "../assets/index";
import { useState, useEffect } from "react";
import LoginInput from "./LoginInput";
import { motion } from "framer-motion";
import { buttonClick, fadeInOut } from "../animations";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { validateUserJWTToken } from "../api";
import { Link, useNavigate } from "react-router-dom";

import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import MainLoader from "./MainLoader";
import Alert from "./Alert";
import { showAlert } from "../utils/alertSlice";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.userDetails);

  const alert = useSelector((store) => store.alert);

  useEffect(() => {
    if (user) {
      //If user exists then don't go to login page instead redirect to home page
      // navigate("/", { replace: true });
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, []);

  const logInWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          // console.log(cred);
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              dispatch(addUser(data));
              //console.log(data);
            });
            // Go back to home page after sign in

            //Show alert
            dispatch(
              showAlert({
                type: "success",
                message: "Google Sign In Successful",
              })
            );

            setTimeout(() => {
              dispatch(
                showAlert({
                  type: "",
                  message: "",
                })
              );
            }, 3000);

            //Get cart details of user

            navigate("/", { replace: true });
          });
        }
        dispatch(
          showAlert({ type: "danger", message: "Google Sign In Unsuccessful" })
        );
        setTimeout(() => {
          dispatch(
            showAlert({
              type: "",
              message: "",
            })
          );
        }, 3000);
      });
    });
  };

  const signUpWithEmailAndPassword = async () => {
    if (userEmail === "" || password === "" || confirmPassword === "") {
      //display alert message
      dispatch(
        showAlert({
          type: "warning",
          message: "All fields need to be filled",
        })
      );
      setTimeout(() => {
        dispatch(
          showAlert({
            type: "",
            message: "",
          })
        );
      }, 3000);
    } else {
      if (password === confirmPassword) {
        await createUserWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          password
        ).then((userCred) => {
          setConfirmPassword("");
          setUserEmail("");
          setPassword("");
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              // console.log(cred);
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(addUser(data));
                  //console.log(data);
                });
                // Go back to home page after sign up
                dispatch(
                  showAlert({
                    type: "success",
                    message: "Sign Up was Successful",
                  })
                );
                setTimeout(() => {
                  dispatch(
                    showAlert({
                      type: "",
                      message: "",
                    })
                  );
                }, 3000);

                navigate("/", { replace: true });
              });
            }
          });
        });
      } else {
        //display alert message
        dispatch(
          showAlert({ type: "danger", message: "Passwords do not match!" })
        );
        setTimeout(() => {
          dispatch(
            showAlert({
              type: "",
              message: "",
            })
          );
        }, 3000);
      }
    }
  };

  const signInWithEmailAndPass = async () => {
    if (userEmail === "" || password === "") {
      dispatch(
        showAlert({ type: "warning", message: "All fields need to be filled" })
      );
      setTimeout(() => {
        dispatch(
          showAlert({
            type: "",
            message: "",
          })
        );
      }, 3000);
    } else {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(
        (userCred) => {
          setUserEmail("");
          setPassword("");
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              // console.log(cred);
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  //dispatch(addUser(data));
                  //console.log(data);
                });
                // Go back to home page after sign in

                dispatch(
                  showAlert({
                    type: "success",
                    message: "Sign In was successful",
                  })
                );
                setTimeout(() => {
                  dispatch(
                    showAlert({
                      type: "",
                      message: "",
                    })
                  );
                }, 3000);
                navigate("/", { replace: true });
              });
            }
            dispatch(
              showAlert({
                type: "danger",
                message: "Sign In was not Successful",
              })
            );
            setTimeout(() => {
              dispatch(
                showAlert({
                  type: "",
                  message: "",
                })
              );
            }, 3000);
          });
        }
      );
      dispatch(
        showAlert({
          type: "danger",
          message: "Sign In was not Successful",
        })
      );
      setTimeout(() => {
        dispatch(
          showAlert({
            type: "",
            message: "",
          })
        );
      }, 3000);
    }
  };

  return isLoading === true ? (
    <motion.div
      {...fadeInOut}
      className="fixed z-50 inset-0 bg-primary backdrop-blur-md flex items-center justify-center w-full"
    >
      <MainLoader />
    </motion.div>
  ) : (
    <div className="w-screen h-screen relative overflow-hidden flex">
      {/* Background Image */}
      <img
        className="w-full h-full object-cover absolute top-0 left-0"
        src={LoginBg}
        alt="loginBg"
      />
      {/* Content Box */}
      <div className="flex flex-col items-center bg-cardOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6 no-scrollbar overflow-y-auto">
        {/* Top Logo Section */}
        <Link to="/">
          <div className="flex items-center gap-3 justify-start w-full">
            <img src={AppLogo} className="w-10 h-10" alt="res-logo" />
            <p className="font-semibold text-2xl text-headingColor">
              Food Planet
            </p>
          </div>
        </Link>

        {/* Welcome text */}
        <p className="text-3xl font-semibold">Welcome Back</p>
        <p className="text-xl text-textColor -mt-6">
          {isSignUp ? "Sign Up " : "Sign In "} With The Following
        </p>

        {/* Login Form */}
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeholder="Email Here..."
            icon={EmailIcon}
            inputState={userEmail}
            setInputState={setUserEmail}
            type="email"
            isSignUp={isSignUp}
          />

          <LoginInput
            placeholder="Password Here..."
            icon={PasswordIcon}
            inputState={password}
            setInputState={setPassword}
            type="password"
            isSignUp={isSignUp}
          />

          {/* Show only when user has to sign Up */}
          {isSignUp && (
            <LoginInput
              placeholder="Confirm Password Here..."
              icon={PasswordIcon}
              inputState={confirmPassword}
              setInputState={setConfirmPassword}
              type="password"
              isSignUp={isSignUp}
            />
          )}

          {!isSignUp ? (
            <p>
              Don't Have an Account :
              <motion.button
                {...buttonClick}
                className="text-red-500 bg-transparent cursor-pointer underline ml-2"
                onClick={() => {
                  setIsSignUp(true);
                }}
              >
                Create one here
              </motion.button>
            </p>
          ) : (
            <p>
              Already Have an Account :
              <motion.button
                {...buttonClick}
                className="text-red-500 bg-transparent cursor-pointer underline ml-2"
                onClick={() => {
                  setIsSignUp(false);
                }}
              >
                Sign-In here
              </motion.button>
            </p>
          )}

          {/* Button to Submit */}

          {isSignUp ? (
            <motion.button
              {...buttonClick}
              className="px-4 py-2 bg-red-500 w-full rounded-md cursor-pointer text-white capitalize hover:bg-red-600 transition-all duration-150"
              onClick={() => {
                signUpWithEmailAndPassword();
              }}
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              className="px-4 py-2 bg-red-500 w-full rounded-md cursor-pointer text-white capitalize hover:bg-red-600 transition-all duration-150"
              onClick={() => {
                signInWithEmailAndPass();
              }}
            >
              Sign In
            </motion.button>
          )}
        </div>

        <div className="flex items-center justify-between gap-14">
          <div className="bg-white h-[1px] w-24 rounded-md"></div>
          <div className="text-white">or</div>
          <div className="bg-white h-[1px] w-24 rounded-md"></div>
        </div>

        <motion.div
          {...buttonClick}
          className="flex items-center justify-center bg-cardOverlay px-20 py-2 backdrop-blur-md cursor-pointer rounded-3xl gap-4"
          onClick={() => {
            logInWithGoogle();
          }}
        >
          <img src={GoogleIcon} alt="google-logo" className="w-10 h-10" />
          <p className="text-base capitalize text-textColor">
            Sign In with Google
          </p>
        </motion.div>
      </div>
      <Alert type={alert.type} message={alert.message} />;
    </div>
  );
};

export default Login;
