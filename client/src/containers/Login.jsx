import React, { useEffect, useState } from "react";
import { LoginBg, Logo } from "../assets";
import { LoginInput } from "../components";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { useNavigate } from "react-router-dom";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { validateUserJWTToken } from "../api";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigation = useNavigate();

  // login with google

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token)
              .then((data) => console.log(data))
              .catch((error) => console.error(error));
          });
        }
      });
    });
  };

  // Sign Up With Email ans Password
  const singUpWithEmail = async () => {
    if (userEmail && userPassword && confirmPassword) {
      if (userPassword === confirmPassword) {
        var validRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (userEmail.match(validRegex)) {
          if (userPassword.length >= 6) {
            setUserEmail("");
            setConfirmPassword("");
            setUserPassword("");
            await createUserWithEmailAndPassword(
              firebaseAuth,
              userEmail,
              userPassword
            ).then((userCred) => {
              firebaseAuth.onAuthStateChanged((cred) => {
                if (cred) {
                  cred.getIdToken().then((token) => {
                    validateUserJWTToken(token).then((data) => {
                      console.log(data);
                    });
                  });
                }
              });
            });
          } else {
            console.log("Password weak please enter password atlease 6");
          }
        } else {
          console.log("Invalid Email");
        }
        console.log(userEmail, userPassword, confirmPassword);
      } else {
        console.log("password not matched");
      }
    } else {
      console.log("fill all the fields");
    }
  };

  const singInWithEmail = async () => {
    if (userEmail !== "" && userPassword !== "") {
      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (userEmail.match(validRegex)) {
        await signInWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          userPassword
        ).then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  console.log(data);
                  navigation("/");
                });
              });
            }
          });
        });
      } else {
        alert("Enter valid email");
      }
    } else {
      alert("Fill all the field");
    }
  };
  return (
    <div className="w-screen h-screen  relative overflow-hidden flex">
      <img
        className="w-full h-full object-cover  aspect-square absolute top-0 left-0"
        src={LoginBg}
        alt="bannerbg "
      />
      {/* content */}
      <div className="h-full flex flex-col  bg-lightOverlay items-center  w-[100%]  md:w-[480px] z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">
        {/* top logo section */}
        <div className="flex items-center justify-start gap-4 w-full ">
          <img src={Logo} className="w-8 " alt="logo" />
          <div className="text-headingColor font-semibold text-2xl ">
            Nawab's Khana
          </div>
        </div>
        {/* Welcome  Section */}
        <p className="text-3xl text-headingColor font-semibold">
          {" "}
          Welcome Back!
        </p>
        <p className="text-xl text-textColor -mt-6 ">
          {isSignUp ? " Sign Up" : " Sign In"} in with following!
        </p>

        {/* Input section */}
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeHolder={"Email Here"}
            icon={<FaEnvelope className="text-textColor text-xl" />}
            inputState={userEmail}
            inputStateFunction={setUserEmail}
            type={"email"}
            isSignUp={isSignUp}
          />
          <LoginInput
            placeHolder={"Password Here"}
            icon={<FaLock className="text-textColor text-xl" />}
            inputState={userPassword}
            inputStateFunction={setUserPassword}
            type={"password"}
            isSignUp={isSignUp}
          />
          {isSignUp && (
            <LoginInput
              placeHolder={"Confirm Password Here"}
              icon={<FaLock className="text-textColor text-xl" />}
              inputState={confirmPassword}
              inputStateFunction={setConfirmPassword}
              type={"password"}
              isSignUp={isSignUp}
            />
          )}
          {!isSignUp ? (
            <p className="text-sm">
              Doesn't have an account:{" "}
              <motion.button
                className="text-red-700 underline bg-transparent font-extrabold cursor-pointer"
                {...buttonClick}
                onClick={() => setIsSignUp(true)}
              >
                Create New
              </motion.button>
            </p>
          ) : (
            <p className="text-sm">
              Already have an account:{" "}
              <motion.button
                className="text-red-700 underline font-extrabold  bg-transparent cursor-pointer"
                {...buttonClick}
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </motion.button>
            </p>
          )}

          {/* button section */}
          {isSignUp ? (
            <motion.button
              {...buttonClick}
              onClick={singUpWithEmail}
              className="w-full px-4 py-2 rounded-md bg-red-400 text-white cursor-pointer text-xl capitalize hover:bg-red-500 transition-all duration-150 "
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              onClick={singInWithEmail}
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 text-white cursor-pointer text-xl capitalize hover:bg-red-500 transition-all duration-150 "
            >
              Sign In
            </motion.button>
          )}
        </div>
        <div className="flex items-center justify-between gap-16 ">
          <div className="w-24 h-[1px] bg-white"></div>
          <p className="text-white"> Or</p>
          <div className="w-24 h-[1px] bg-white"></div>
        </div>
        <motion.button
          onClick={loginWithGoogle}
          {...buttonClick}
          className="flex items-center justify-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4"
        >
          <FcGoogle className="text-3xl" />
          <p className="capitalize text-base text-headingColor">
            Signin with Google
          </p>
        </motion.button>
      </div>
    </div>
  );
};

export default Login;
