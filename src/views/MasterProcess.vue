<template>
  <section class="page-header">
    <section class="title">
      <span>Master Process</span>
    </section>
    <section class="actions">
      <div>
        <SearchProcess></SearchProcess>
      </div>
      <div>
        <DownloadList></DownloadList>
      </div>
      <div>
        <UploadList></UploadList>
      </div>
      <div>
        <AddProcess></AddProcess>
      </div>
    </section>
  </section>
  <section class="page-options">
    <SelectPlant @plantSelected="onPlantSelected"></SelectPlant>
  </section>
  <section class="page-data">
    <ProcessList :selectedPlant="selectedPlant"></ProcessList>
  </section>
</template>
<script setup>
import { ref } from "vue";
import AddProcess from "../components/Masters/Process/AddProcess";
import DownloadList from "../components/Masters/Process/DownloadList";
import ProcessList from "../components/Masters/Process/ProcessList";
import SearchProcess from "../components/Masters/Process/SearchProcess";
import SelectPlant from "../components/Masters/Process/SelectPlant";
import UploadList from "../components/Masters/Process/UploadList";

// Declare a reactive variable for selected plant
const selectedPlant = ref(null);

// Handle the plant selection
const onPlantSelected = (plantId) => {
  selectedPlant.value = plantId; // Set the selected plant's ID
  console.log(selectedPlant.value);
};
</script>
<style scoped>
.page-header {
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
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
  }
}
</style>
