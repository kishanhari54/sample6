<template>
  <div class="section">
    <v-row>
      <v-col cols="3">
        <div class="field-box">
          <!-- Label for the Dropdown -->
          <div class="label">Select Plant:</div>

          <!-- v-select to dynamically populate with plant data -->
          <v-select
            label="Select a Plant"
            v-model="selectedPlant"
            :items="plants"
            item-title="name"
            item-value="id"
            variant="solo-filled"
            dense
            clearable
            outlined
            :loading="loading"
            @update:model-value="onPlantSelected"
          ></v-select>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script setup>
import { defineEmits, onMounted, ref } from "vue";
import axiosInstance from "../../../services/axiosInstance"; // Adjust the import path as needed
import { useMasterProcessStore } from "./store/masterprocess";

const masterProcessStore = useMasterProcessStore(); // Use the Pinia store

// Declare reactive variables
const plants = ref([]); // List of plants fetched from API
const loading = ref(true); // List of plants fetched from API
const selectedPlant = ref(null); // The selected plant (its ID)

// Define emit function to send selected plant to the parent
const emit = defineEmits("plantSelected");

// Function to emit the selected plant to the parent when it changes
const onPlantSelected = (value) => {
  // Emit an event with the selected plant value
  emit("plantSelected", value);
  console.log(masterProcessStore);
  // Update Pinia store
  masterProcessStore.setPlant(value); // Access `setPlant` method directly from the store
};

// Fetch the plant list from the API
const fetchPlants = async () => {
  try {
    const response = await axiosInstance.get(
      //  "https://my-json-server.typicode.com/kishanhari54/sample6/plants"
      "http://localhost:3000/plants"
    );

    plants.value = response.data; // Store the plants fetched from the API
    console.log(plants.value);
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error("Error fetching plants:", error);
  }
};

// Fetch plants when the component is mounted
onMounted(fetchPlants);

/*plants.value = [
  {
    id: 1,
    name: "Plant A",
    description: "Description for Plant A",
  },
  {
    id: 2,
    name: "Plant B",
    description: "Description for Plant B",
  },
]; */
</script>
<style scoped>
.section {
  border: 1px solid var(--S-Grey-4, #d2d2d2);
  padding: 10px 30px;
}
</style>
