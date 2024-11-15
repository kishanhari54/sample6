<template>
  <v-btn @click="openDialog" size="large">Add Process</v-btn>

  <!--
  <AddProcessPopup
    v-model="openDialogForm"
    :selectedPlant="props.selectedPlant"
  /> -->
</template>

<script setup>
import { defineEmits, ref } from "vue";
let openDialogForm = ref(false);
const emit = defineEmits("addProcessButtonClicked");
/*
const props = defineProps({
  selectedPlant: {
    type: Number,
    required: true,
  },
}); */
const openDialog = () => {
  openDialogForm.value = true;
  emit("addProcessButtonClicked", true);
};
</script>
