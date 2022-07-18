/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  ignoreBuildErrors: true,
  async rewrites() {
    return [
      {
        // 设置代理
        source: '/api/:path*',
        destination: 'http://localhost:7717/wx/yjdp/api/:path*',
      },
      {
        source: '/',
        destination: '/home',
      },
    ]
  },
}
