/* eslint-disable */
// Styles
import DownloadFile from "@/assets/icons/DownloadFile";
import UploadDocument from "@/assets/icons/UploadDocument";
import uploadIcon from "@/assets/icons/uploadIcon";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
// Vuetify
import { h } from "vue";
import { createVuetify } from "vuetify";

/*
// Function to load custom SVG icons
const customIconSet = {
  customIcon1: {
    component: () => import("@/assets/logo.svg"), // Dynamically import your custom SVG icon
  },
  customIcon2: {
    component: () => import("@/assets/DensoLandingImage.svg"), // Similarly for other icons
  },
};

*/

const customIcons = { uploadIcon, UploadDocument, DownloadFile };

const custom = {
  component: (props) =>
    h(props.tag, [h(customIcons[props.icon], { class: "v-icon__svg" })]),
};

export default createVuetify(
  {
    /*icons: {
      iconfont: "mdi", // Use Material Design Icons by default
      values: {
        product: "mdi-download-box",
        support: "mdi-lifebuoy",
      },
    }, */
    /*
    icons: {
      iconfont: "svg", // Use SVG as the font source
      values: customIconSet, // Map custom icon names to the SVG components
    }, */
    icons: {
      defaultSet: "mdi",
      sets: {
        custom,
      },
    },

    theme: {
      defaultTheme: "light", // Choose default theme (light or dark)
      themes: {
        light: {
          colors: {
            primary: "#DC0032", // Change this to your desired color code
          },
        },
        dark: {
          colors: {
            primary: "#42A5F5", // Different primary color for dark theme (optional)
          },
        },
      },
    },
  }
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
);
