/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    // express 서버와 연동
    return [
      {
        source: "/:path*",
        destination: "http://localhost:6000/:path*",
      },
    ];
  },
};
