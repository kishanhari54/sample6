<template>
  <!-- <v-data-table sticky-header :headers="headers" :items="items">
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
  </v-data-table> -->
  <v-container>
    <!-- v-data-table with sticky header -->
    <v-data-table
      sticky-header
      :headers="headers"
      :items="filteredItems"
      item-value="id"
      :loading="loading"
      :search="searchQuery"
    >
      <!-- Loading state for the table -->
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>

      <!-- Actions column template -->
      <template v-slot:item="props">
        <tr>
          <td>{{ props.item.sno }}</td>
          <td>{{ props.item.process }}</td>
          <td>{{ props.item.description }}</td>
          <td>
            <!-- Action buttons with icons -->
            <v-btn icon @click="editProcess(props.item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="deleteProcess(props.item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn icon @click="toggleActiveStatus(props.item)">
              <v-icon>{{
                props.item.isActive
                  ? "mdi-toggle-switch"
                  : "mdi-toggle-switch-off"
              }}</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>
<script setup>
import axios from "axios";
import { computed, defineProps, onMounted, ref, watch } from "vue";
const loading = ref(true); // Loading state
const processes = ref([]); // List of processes

// Declare props to receive selectedPlant from parent
const props = defineProps({
  selectedPlant: {
    type: Number,
    default: null,
  },
  tableSearch: {
    type: String,
    default: "",
  },
});

const headers = [
  { title: "S No", key: "itemId" },
  { title: "Process", key: "processName" },
  { title: "Description", key: "description" },
  { title: "Actions", key: "actions" },
];
const searchQuery = ref("");

// Fetch processes from API
const fetchProcesses = async (plantId) => {
  let url =
    "https://my-json-server.typicode.com/kishanhari54/sample6/processes";
  if (plantId) {
    url = url + `?plantId=${plantId}`;
  }

  try {
    const response = await axios.get(url);
    processes.value = response.data; // Store the data in the processes array
    loading.value = false; // Set loading to false once data is loaded
  } catch (error) {
    console.error("Error fetching processes:", error);
    loading.value = false;
  }
};

// Watch for changes in the selected plant and refetch processes
watch(
  () => props.selectedPlant,
  (newPlantId) => {
    //console.log(newPlantId);
    fetchProcesses(newPlantId);

    /*if (newPlantId) {
      fetchProcesses(newPlantId);
    } else {
      
      //processes.value = []; // Clear processes if no plant is selected
    } */
  },
  { immediate: true } // Trigger fetchProcesses immediately when component mounts
);

watch(
  () => props.tableSearch,
  (value) => {
    console.log(value);
    searchQuery.value = value;
  }
);

// Edit process function
const editProcess = (process) => {
  // Logic for editing the process (can be a modal or navigation to an edit page)
  console.log("Editing process:", process);
};

// Delete process function
const deleteProcess = (id) => {
  // Logic for deleting the process (confirm and remove from the list or make API call)
  console.log("Deleting process with ID:", id);
  const index = processes.value.findIndex((process) => process.id === id);
  if (index !== -1) {
    processes.value.splice(index, 1); // Remove from the list
  }
};

// Toggle active/inactive status function
const toggleActiveStatus = async (process) => {
  // Toggle the local state first (optimistic UI update)
  const newStatus = !process.isActive;
  // process.isActive = newStatus;

  try {
    // Construct the URL for the process API
    //const url = `https://my-json-server.typicode.com/kishanhari54/sample6/processes/${process.id}`;
    const url = `http://localhost:3000/processes/${process.id}`;

    // Send the PATCH request to update the process status
    const response = await axios.patch(
      url,
      {
        isActive: newStatus,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    process.isActive = response.data.isActive;
    console.log("Status updated successfully:", response.data);
  } catch (error) {
    // If the request fails, revert the local state to the previous value
    // process.isActive = !newStatus;
    console.error("Error updating status:", error);
  }
};

const filteredItems = computed(() => {
  return processes.value.filter((item) => {
    return (
      item.description &&
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});

onMounted(fetchProcesses);
</script>
