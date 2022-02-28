/* eslint-disable prettier/prettier */
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites(){
    return [{source:'/path*', destination:'https://project-next-3dedkvr1u-lamenking.vercel.app/path*'}]
  }
};
