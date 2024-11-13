import { defineStore } from "pinia";
import { ref } from "vue";

export const useMasterProcessStore = defineStore("masterProcess", () => {
  // Store reactive state for the selected plant
  const selectedPlant = ref(null);

  // Define the method to update the selected plant
  const setPlant = (value) => {
    selectedPlant.value = value;
    console.log("set selected plant " + value);
  };

  return {
    selectedPlant,
    setPlant, // Make sure setPlant is returned to be used externally
  };
});
