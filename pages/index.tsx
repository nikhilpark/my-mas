import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import { CircularProgress } from '@mui/material';

import swal from "sweetalert"
import axios from "axios";

import "react-responsive-modal/styles.css";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [bday, setBday] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRpt, setPasswordRpt] = useState("");

  const [isSignupLoading, signUpLoading] = useState(false)
  const [isLoginLoading, loginLoading] = useState(false)
  
  const [signUpMsg, setSignUpMsg] = useState(null)

  const [showLoginForm, setShowLoginForm] = useState(false)

  const [signupStyle, setSignupStyle] = useState({ display: 'block' })

  const onCloseModal = () => {
    setOpen(false)
    setPassword("")
    setPasswordRpt("")
    setEmail("")
    setUsername("")
    setUsername("")
    setSignUpMsg(null)
  };
  const onOpenModal = () => setOpen(true);

  const handleSignupForm = (e) => {
    e.preventDefault();

    const userObj = {
      username,
      email,
      password,
      bday,
    };
    if (password === passwordRpt) {
      signUpLoading(true)
      axios.post("users/signup", userObj).then((res) => {
        if (res.data.status === "success") {
          signUpLoading(false)
          setOpen(false)
          swal("Sucess", "Signed up succesfully", "success")
        } else {
          signUpLoading(false)
          setSignUpMsg(res.data.msg)
        }
      })


    } else {
      swal("Oops!", "Passwords dont match!", "error");
    }
  };


  const loginClick = () => {
    setUsername("")
    setPassword("")
    setSignupStyle({ display: 'none' })
    setShowLoginForm(true)
 

    
  }
  const handleBackToSignup = () => {
    setUsername("")
    setPassword("")
    setSignupStyle({ display: 'block' })
    setShowLoginForm(false)
  }

  const handleLoginForm = (e) => {
    e.preventDefault();
    loginLoading(true)
    const userObj = {
      username,
      password
    }
    axios.post("users/login",userObj).then((res)=>{
      if(res.data.status === "success"){
        swal("Success","Logged in succesfully !","success")
        loginLoading(false)
      } else {
        swal("Oops!", `${res.data.msg}`, "error");
        loginLoading(false)

      }
    })
  }

  return (
    <>
      <Head>
        <title>Yo!</title>
      </Head>
      <div className="grid  cols-1 lg:grid-cols-3 md:grid-cols-2">
        <div className="lg:col-span-2 justify-self-center mt-12">
          <h1 className="text-4xl">Welcome to My Mas!</h1>
          <div className="mt-10">
            <div className="w-400 h-200 overflow-hidden">
              <Image
                layout="responsive"
                src="https://images.unsplash.com/photo-1567861911437-538298e4232c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
                height={120}
                width={100}
                placeholder="empty"
                alt="banner"
              />
            </div>
          </div>
        </div>
        <div className="justify-self-center mt-16 flex flex-col justify-between">
          <div style={signupStyle}>
            <div className="text-3xl">First time around?</div>
            <div className="mt-5">
              <label className="text-lg">Whens your birthday? :- </label>
              <br />
              <br />
              <input
                className="border py-2 px-4 rounded"
                type="date"
                onChange={(e) => {
                  setBday(e.target.value);
                }}
              />
              {bday === "" ? (
                <button
                  disabled
                  className="border-gray-400 border-2 mx-2 px-4 py-2 rounded "
                  onClick={onOpenModal}
                >
                  Select a date
                </button>
              ) : (
                <button
                  className="border-gray-400 border-2 hover:bg-gray-500 hover:text-white transition ease-in 
                  duration-100 active:bg-gray-700  mx-2 px-8 py-2 rounded "
                  onClick={onOpenModal}
                >
                  Proceed
                </button>
              )}
            </div>
          </div>
          {!showLoginForm ? <div className="mt-10 mb-10">
            <span className="text-xl">Existing user ?</span>
            <button
              onClick={loginClick}
              className="border-green-600 ml-4 border-2 transition ease-in duration-100  hover:bg-green-600 
            hover:text-white active:bg-green-800 text-lg rounded  px-9 py-1"
            >
              Log In
            </button>
          </div> :
            <div className="mt-10 mb-10">
              <form onSubmit={handleLoginForm}>
              <div className="text-3xl">Login
                <div className="flex justify-end w-60 border-black">
                  <div className="text-sm hover:underline hover:cursor-pointer hover:font-semibold" onClick={handleBackToSignup}>back to signup?</div>
                </div>
              </div>
              <div className="mt-10 flex flex-col gap-6">
                <div className="flex  gap-6 content-center">
                  <div className=" py-2 px-4">
                    Username :
                  </div>
                  <div>
                    <input required onChange={(e)=>{setUsername(e.target.value)}} className="border py-2 px-4 rounded"
                      placeholder="Enter username"></input>
                  </div>
                </div>
                <div className="flex  gap-6 content-center">
                  <div className=" py-2 px-4">
                    Password :
                  </div>
                  <div>
                    <input className="border py-2 px-4 rounded"
                      placeholder="Enter password`" onChange={(e)=>{setPassword(e.target.value)}} required type="password"></input>
                  </div>
                </div>
                <button
                  type="submit"
                  className="border-green-600 ml-4 border-2 transition ease-in duration-100  hover:bg-green-600 
                hover:text-white active:bg-green-800 text-lg rounded  px-9 py-1"
                >
                  Log In
                </button> {isLoginLoading ? <CircularProgress size={20} /> : <></>}
              </div>
              </form>
            </div>
          }

        </div>
        <Modal open={open} onClose={onCloseModal}>
          <h2 className="text-2xl mr-10">Complete the registration</h2>
          <form onSubmit={handleSignupForm}>
            <div className="flex flex-column mt-6 ">
              <div>
                <input
                  type="text"
                  className="mt-3 border-2 w-full px-2 py-1"
                  placeholder="Create an Username"
                  required
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  type="email"
                  className="mt-3 border-2 w-full px-2 py-1"
                  placeholder="Enter your E-mail"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  type="password"
                  className="mt-3 border-2 w-full px-2 py-1"
                  placeholder="Create your password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  type="password"
                  className="mt-3 border-2 w-full px-2 py-1"
                  placeholder="Repeat password"
                  required
                  onChange={(e) => {
                    setPasswordRpt(e.target.value);
                  }}
                />
              </div>
              <div className="mt-2 flex justify-center">
                <span className="text-lg ">You were born on {bday} 🎂</span>
              </div>
              <div className="self-center mt-6">
                <button
                  type="submit"
                  className="border-gray-400 border-2 w-80 pt-2 pb-2  rounded hover:bg-gray-500 hover:text-white transition ease-in duration-100 active:bg-gray-700"
                > 
                  Sign Up!
                </button> {isSignupLoading ? <CircularProgress size={20} /> : <></>}
              </div>
              <div
                className="mt-1 text-sm flex justify-end text-red-700"
              >
                {signUpMsg ? <>`*${signUpMsg}`</> : <></>}
              </div>
            </div>
          </form>
        </Modal>
      </div>
      <></>
    </>
  );
}
