import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";

export default function Home() {
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
              <label>Whens your birthday? : </label>
              <input className="border" type="date" />
            </div>
          </div>
          <div>
            <span className="text-xl mr-5">Existing user ?</span>
            <button className="border-green-600 border-2 transition ease-in duration-100  hover:bg-green-600 hover:text-white active:bg-green-800 text-lg rounded  px-9 py-1">
              Log In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
