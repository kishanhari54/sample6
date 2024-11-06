<template>
  <v-container>
    <v-row>
      <v-col cols="6" class="d-flex flex-column align-center justify-center">
        <section
          class="form-container d-flex flex-column align-center justify-center"
        >
          <section class="title d-flex flex-column align-center justify-center">
            <div>Asa-ichi</div>
            <div>Integrated Dashboard</div>
          </section>

          <section>
            <v-form @submit.prevent="handleSubmit">
              <v-text-field
                label="Email"
                v-model="formData.email"
                type="email"
                :rules="[rules.required, rules.email]"
              ></v-text-field>
              <v-text-field
                label="Password"
                v-model="formData.password"
                type="password"
                :rules="[rules.required, rules.minLength]"
              ></v-text-field>

              <v-btn type="submit" color="primary" class="button-primary"
                >Login</v-btn
              >
            </v-form>
          </section>
        </section>
      </v-col>
      <v-col cols="6">
        <v-img :src="require('@/assets/DensoLandingImage.svg')" contain />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../../stores/useUserStore.js";
const userStore = useUserStore();

const formData = ref({
  email: "",
  password: "",
});
//const userStore = useUserStore();

const rules = {
  required: (value) => !!value || "This field is required",
  email: (value) =>
    (!!value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) || "Invalid email",
  minLength: (value) =>
    (value && value.length >= 6) || "Password must be at least 6 characters",
};

const handleSubmit = async () => {
  // Handle form submission, e.g., send data to server

  let email = formData.value.email;
  let password = formData.value.password;

  console.log(`Email: ${email}, Password: ${password}`);
  await userStore.login({ email, password });
};
</script>
<style scoped>
.v-container {
  background: gray;
}
.form-container {
  width: 500px;
  background: white;
  padding: 50px;
  section {
    width: 100%;
  }
  .title {
    display: flex;
    justify-content: center;
  }
}
</style>
