import "@/assets/styles/global.scss";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";
import { useUserStore } from "./stores/useUserStore";

loadFonts();
const pinia = createPinia();

// Check for user in local storage on app startup
const storedUser = localStorage.getItem("user");
if (storedUser) {
  const userStore = useUserStore(pinia);
  userStore.user = JSON.parse(storedUser);
}

createApp(App).use(router).use(vuetify).use(pinia).mount("#app");
