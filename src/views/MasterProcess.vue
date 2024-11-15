<template class="d-flex">
  <section class="page-container">
    <section class="page-header">
      <section class="title">
        <span>Master Process</span>
      </section>
      <section class="actions">
        <div>
          <SearchProcess @searchProcess="searchProcess"></SearchProcess>
        </div>
        <div>
          <DownloadList></DownloadList>
        </div>
        <div>
          <UploadList></UploadList>
        </div>
        <div>
          <AddProcess
            @addProcessButtonClicked="addNewProcess(value)"
          ></AddProcess>
        </div>
      </section>
    </section>
    <section class="page-options">
      <SelectPlant @plantSelected="onPlantSelected"></SelectPlant>
    </section>
    <section class="page-data">
      <ProcessList
        ref="processLista"
        :selectedPlant="selectedPlant"
        :tableSearch="tableSearch"
        @editProcess="editProcess"
      ></ProcessList>

      <AddProcessPopup
        v-model="openDialogForm"
        :mode="mode"
        :processId="processId"
        @processUpdated="reloadProcessList"
      />
    </section>
  </section>
</template>
<script setup>
import { ref, watch } from "vue";
import AddProcess from "../components/Masters/Process/AddProcess";
import AddProcessPopup from "../components/Masters/Process/AddProcessPopup";
import DownloadList from "../components/Masters/Process/DownloadList";
import ProcessList from "../components/Masters/Process/ProcessList";
import SearchProcess from "../components/Masters/Process/SearchProcess";
import SelectPlant from "../components/Masters/Process/SelectPlant";
import UploadList from "../components/Masters/Process/UploadList";
// Declare a reactive variable for selected plant
const selectedPlant = ref(null);
const tableSearch = ref(null);
let openDialogForm = ref(false);

// New reactive variables for mode and processId
const mode = ref("add"); // default to 'add'
const processId = ref(null); // To store the ID for editing
const processLista = ref(null); // Correctly define ref

// Handle the plant selection
const onPlantSelected = (plantId) => {
  selectedPlant.value = plantId; // Set the selected plant's ID
  console.log(selectedPlant.value);
};

const searchProcess = (value) => {
  console.log("search " + value);
  tableSearch.value = value;
};

const addNewProcess = (value) => {
  // If value is set, it means this is an edit, otherwise, it's an add
  if (value) {
    mode.value = "edit"; // Set mode to edit if a process is passed
    processId.value = value.id; // Pass the process ID for editing
  } else {
    mode.value = "add"; // Set to add mode
    processId.value = null; // Reset the ID for add mode
  }

  openDialogForm.value = true;
};

// New function to handle editProcess event from ProcessList
const editProcess = (id) => {
  mode.value = "edit"; // Set mode to edit
  processId.value = id; // Set the process ID
  openDialogForm.value = true; // Open the dialog
};
//const childRef = useTemplateRef("processList");

const reloadProcessList = async () => {
  debugger;

  if (processLista.value) {
    await processLista.value.fetchProcesses(selectedPlant.value); // Reload data from the ProcessList component
  }
  openDialogForm.value = false; // Close the modal
};
// Watch for dialog visibility change
watch(openDialogForm, (newValue) => {
  if (!newValue) {
    //console.log("Dialog is closed.");
    //ProcessList.fetchProcesses;
  }
});
</script>
<style scoped>
.page-container {
  display: flex;
  gap: 10px;
  flex-direction: column;
  height: 100%;
}

.page-options {
  height: 105px;
}
.page-header {
  height: 50px;
  display: flex;
  justify-content: space-between;
  .title,
  .actions {
    flex: 1;
    display: flex;
  }

  .actions {
    justify-content: end;
    gap: 5px;
  }

  .title {
    font-family: Open Sans;
    font-size: 24px;
    font-weight: 700;
    line-height: 32.68px;
    letter-spacing: 0.04em;
    text-align: left;
  }
}

.page-data {
  max-height: calc(100% - 170px);
}
</style>
