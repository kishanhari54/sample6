<template>
  <v-btn @click="openDialog">Add Process</v-btn>

  <!-- Dialog Component -->
  <AddProcessPopup v-model="addProcessForm" />
</template>
<script setup>
import { ref } from "vue";
import AddProcessPopup from "./AddProcessPopup.vue"; // Adjust the import path accordingly
let addProcessForm = ref(false);
const openDialog = () => {
  addProcessForm.value = true;
};
</script>
