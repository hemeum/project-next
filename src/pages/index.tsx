import type { NextPage } from "next";
import Head from "next/head";
import axios from "axios";

import Wrap from "src/components/contain/Wrap";
import { useEffect } from "react";

const Home: NextPage = ({ youtubeList }: any) => {
  useEffect(() => {
    axios.get("/").then((res) => {
      console.log(res.data.hi);
    });
  }, []);
  return (
    <div>
      <Head>
        <title>로스트아크</title>
      </Head>
      <Wrap youtubeList={youtubeList}></Wrap>
    </div>
  );
};

/*
export const getServerSideProps = wrapper.getServerSideProps(
  (store: any): any =>
    async () => {
      store.dispatch({ type: "YOUTUBE_REQUEST" });
    },
);
*/

export async function getServerSideProps() {
  const res = await axios.get(
    `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=PLXJUV6UcSL2y6LQ0twqDA7fC4ybZtRB9O&part=snippet,id&order=date&maxResults=24&channelID=UCL3gnarNIeI_M0cFxjNYdAA&key=${process.env.YOUTUBE_API_KEY}`,
  );
  return { props: { youtubeList: res.data.items } };
}

export default Home;
