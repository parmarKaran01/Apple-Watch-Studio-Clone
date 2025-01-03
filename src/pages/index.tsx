import Head from "next/head";
import Landing from "@/components/landing/Landing";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Apple Watch Studio</title>
        <meta name="description" content="Dummy Studio clone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Landing />
    </>
  );
}
