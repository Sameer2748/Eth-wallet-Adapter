/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["cdn-icons-png.flaticon.com"],  // Correct way to specify allowed image domains
    },
  };
  
  export default nextConfig;
  