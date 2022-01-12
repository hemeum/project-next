import type { NextPage } from "next";
import Head from "next/head";

import Wrap from "src/components/contain/Wrap";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>로스트아크</title>
      </Head>
      <Wrap></Wrap>
    </div>
  );
};

export default Home;
