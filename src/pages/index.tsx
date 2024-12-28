import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import Landing from "@/components/landing/Landing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {


  return (
    <>
      <Head>
        <title>Apple Watch Studio</title>
        <meta name="description" content="Dummy Studio clone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <div
        className={`${styles.page}`}
      >
         <Landing />
      </div>
    </>
  );
}
