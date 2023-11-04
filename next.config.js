/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    prependData: `@import "~/assets/scss/variables.scss"; @import "~/assets/scss/mixins.scss";`,
  },
  // reactStrictMode: false,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ["raw-loader", "glslify-loader"],
    });

    return config;
  },
};

module.exports = nextConfig;
