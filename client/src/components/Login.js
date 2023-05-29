import {
  LoginBg,
  AppLogo,
  EmailIcon,
  PasswordIcon,
  GoogleIcon,
} from "../assets/index";
import { useState } from "react";
import LoginInput from "./LoginInput";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { validateUserJWTToken } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();

  const logInWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          // console.log(cred);
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              console.log(data);
            });
            // Go back to home page after sign in
            navigate("/", { replace: true });
          });
        }
      });
    });
  };

  const signUpWithEmailAndPassword = async () => {
    if (userEmail === "" || password === "" || confirmPassword === "") {
      //display alert message
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
                  console.log(data);
                });
                // Go back to home page after sign up
                navigate("/", { replace: true });
              });
            }
          });
        });
      } else {
        //display alert message
      }
    }
  };

  const signInWithEmailAndPass = async () => {
    if (userEmail === "" || password === "") {
      //display alert message
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
                  console.log(data);
                });
                // Go back to home page after sign in
                navigate("/", { replace: true });
              });
            }
          });
        }
      );
    }
  };

  return (
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
        <div className="flex items-center gap-3 justify-start w-full">
          <img src={AppLogo} className="w-10 h-10" alt="res-logo" />
          <p className="font-semibold text-2xl text-headingColor">
            Food Planet
          </p>
        </div>

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
    </div>
  );
};

export default Login;