<template>
  <v-btn @click="openDialog" size="large">Add Process</v-btn>

  <AddProcessPopup
    v-model="openDialogForm"
    :selectedPlant="props.selectedPlant"
  />
</template>

<script setup>
import { defineProps, ref } from "vue";
import AddProcessPopup from "./AddProcessPopup.vue";
let openDialogForm = ref(false);
const props = defineProps({
  selectedPlant: {
    type: Number,
    required: true,
  },
});
const openDialog = () => {
  openDialogForm.value = true;
};
</script>
