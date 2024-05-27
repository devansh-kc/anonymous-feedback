/** @type {import('next').NextConfig} */
const nextConfig = {
  extends: "next",
  rules: {
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off",
  },
} ;

export default nextConfig;
