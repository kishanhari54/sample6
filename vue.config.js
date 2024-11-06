const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    /*css: {
      loaderOptions: {
        sass: {
          additionalData: `@import "@/assets/styles/global.scss";`, // Automatically import the SCSS globally
        },
      },
    }, */
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
});
