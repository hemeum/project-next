import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import Gnb from "src/components/Gnb";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="/releases/v5.14.0/css/all.css"
          integrity="sha384-HzLeBuhoNPvSl5KYnjx0BT+WB0QEEqLprO+NBkkk5gbc67FTaL7XIGa2w1L0Xbgc"
          crossOrigin="anonymous"
        />
      </Head>
      {router.pathname === "/user/login" ||
      router.pathname === "/user/register" ? undefined : (
        <Gnb></Gnb>
      )}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
