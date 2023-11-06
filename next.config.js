/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    prependData: `@import "~/common/scss/variables.scss"; @import "~/common/scss/mixins.scss";`,
  },
  reactStrictMode: false,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ["raw-loader", "glslify-loader"],
    });

    return config;
  },
};

module.exports = nextConfig;
