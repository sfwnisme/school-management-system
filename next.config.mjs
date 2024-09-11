/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "**",
      },
      {
        protocol: 'http',
        hostname: "**",
      }
    ]
  }
};

export default nextConfig;
