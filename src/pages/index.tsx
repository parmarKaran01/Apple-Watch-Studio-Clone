import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Landing from "@/components/landing/Landing";

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
