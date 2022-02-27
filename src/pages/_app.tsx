import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import Gnb from "src/components/Gnb";

import { createWrapper } from "next-redux-wrapper";

const store = require("src/redux/store");

export const wrapper = createWrapper(store);

function MyApp({ Component, pageProps }: AppProps) {
  // _app.tsx가 CRA의 index.js와 같은 역할. '/'역할을 함.
  const router = useRouter();
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"
        />
        <script
          src="https://kit.fontawesome.com/2f64c83195.js"
          crossOrigin="anonymous"
        ></script>
        <title>lost-ark</title>
      </Head>
      {router.pathname === "/user/login" ||
      router.pathname === "/user/register" ? undefined : (
        <Gnb></Gnb>
      )}
      <Component {...pageProps} />
    </>
  );
}

// _app.tsx에게 withRedux HOC로 store를 주입. 다른 페이지에서 redux store에 접근 가능.
export default wrapper.withRedux(MyApp);
