/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    prependData: `@import "~/assets/scss/variables.scss"; @import "~/assets/scss/mixins.scss";`,
  },
};

module.exports = nextConfig;
