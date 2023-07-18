/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "res.cloudinary.com",
    ],
  },
  webpack: (config, { isServer }) => {
    // Exclude HTML files from being processed by Webpack
    if (!isServer) {
      config.module.rules.push({
        test: /\.html$/,
        exclude: /node_modules/,
        use: "raw-loader",
      });
    }
    return config;
  },
};

module.exports = nextConfig;
