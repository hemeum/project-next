import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import Gnb from "src/components/Gnb";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.14.0/css/all.css"
          integrity="sha384-HzLeBuhoNPvSl5KYnjx0BT+WB0QEEqLprO+NBkkk5gbc67FTaL7XIGa2w1L0Xbgc"
          crossOrigin="anonymous"
        />
      </Head>
      <Gnb></Gnb>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
