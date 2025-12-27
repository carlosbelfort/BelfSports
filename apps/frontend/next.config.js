/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

if (process.env.NODE_ENV === 'development') {
  // NÃO aplicar CSP
}
