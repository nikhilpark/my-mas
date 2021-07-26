import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { Modal } from "react-responsive-modal";

import "react-responsive-modal/styles.css";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [bday, setBday] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRpt, setPasswordRpt] = useState("");

  const onCloseModal = () => setOpen(false);
  const onOpenModal = () => setOpen(true);

  const handleForm = (e) =>{
    e.preventDefault();
    const userObj = {
      username:username,
      email:email,
      password:password,
      passwordRpt:passwordRpt,
      bday:bday
    }
    alert(JSON.stringify(userObj))
  }

  return (
    <>
      <Head>
        <title>Yo!</title>
      </Head>
      <div className="grid  cols-1 lg:grid-cols-3 md:grid-cols-2">
        <div className="lg:col-span-2 justify-self-center mt-32">
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
          <div>
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
          <div>
            <span className="text-xl mr-5">Existing user ?</span>
            <button
              className="border-green-600 border-2 transition ease-in duration-100  hover:bg-green-600 
            hover:text-white active:bg-green-800 text-lg rounded  px-9 py-1"
            >
              Log In
            </button>
          </div>
        </div>
        <Modal open={open} onClose={onCloseModal}>
          <h2 className="text-2xl mr-10">Complete the registration</h2>
          <form onSubmit={handleForm}>
          <div className="flex flex-column mt-6 ">
            <div>
              <input
                type="text"
                className="mt-3 border-2 w-full px-2 py-1"
                placeholder="Create an Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                type="text"
                className="mt-3 border-2 w-full px-2 py-1"
                placeholder="Enter your E-mail"
                onChange={(e)=>{
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                type="text"
                className="mt-3 border-2 w-full px-2 py-1"
                placeholder="Create your password"
                onChange={(e) => {setPassword(e.target.value)}}
              />
            </div>
            <div>
              <input
                type="text"
                className="mt-3 border-2 w-full px-2 py-1"
                placeholder="Repeat password"
                onChange={(e) => {setPasswordRpt(e.target.value)}}
              />
            </div>
            <div className="mt-2">
              <span className="text-lg ">You were born on {bday} 🎂</span>
            </div>
            <div className="self-center mt-6">
              <button type="submit" className="border-gray-400 border-2 w-80 pt-2 pb-2  rounded hover:bg-gray-500 hover:text-white transition ease-in duration-100 active:bg-gray-700">
                Sign Up!
              </button>
            </div>
          </div>
          </form>
        </Modal>
      </div>
      <></>
    </>
  );
}
