<template>
  <v-btn @click="openDialog">Add Process</v-btn>

  <AddProcessPopup v-model="openDialogForm" />
</template>

<script setup>
import { ref } from "vue";
import AddProcessPopup from "./AddProcessPopup.vue";
let openDialogForm = ref(false);
const openDialog = () => {
  openDialogForm.value = true;
};
</script>
