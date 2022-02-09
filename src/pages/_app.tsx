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
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"
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
