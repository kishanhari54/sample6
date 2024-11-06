import axiosInstance from "@/services/axiosInstance";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

let urls = {
  loginUrl: "/userprofile/api/Account/Login",
};
export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const router = useRouter();
  const login = async (credentials) => {
    try {
      const response = await axiosInstance.post(
        urls.loginUrl,

        { UserName: credentials.email, Password: credentials.password }
      );
      user.value = response.data;
      localStorage.setItem("user", JSON.stringify(response.data));
      router.push("/alerts");
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem("user");
  };

  return { user, login, logout };
});
