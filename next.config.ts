import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
};

module.exports = {
  allowedDevOrigins: ['192.168.0.90'],
}

export default nextConfig;
