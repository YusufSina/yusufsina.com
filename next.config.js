/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export configuration
  output: 'export',
  trailingSlash: true, // Required for proper static hosting (generates index.html in folders)
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Optimize build performance
  swcMinify: true,
};

module.exports = nextConfig;

