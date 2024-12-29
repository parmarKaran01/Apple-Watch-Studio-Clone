import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StudioProvider } from "@/context/StudioContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StudioProvider>
      <Component {...pageProps} />
    </StudioProvider>
  );
}
