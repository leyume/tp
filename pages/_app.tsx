import { Urbanist } from "@next/font/google";
import type { AppProps } from "next/app";

import { TripPlannerProvider } from "../store/TripPlannerContext";

import Layout from "../layouts/Index";

import "windi.css";
import "../styles/globals.scss";

const urbanist = Urbanist({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TripPlannerProvider>
      <Layout>
        <style jsx global>{`
          html {
            font-family: ${urbanist.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
      </Layout>
    </TripPlannerProvider>
  );
}
