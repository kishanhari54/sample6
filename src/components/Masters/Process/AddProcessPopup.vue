<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Add Process</span>
      </v-card-title>

      <v-card-subtitle>
        <v-form v-model="formValid" ref="form">
          <div v-for="(field, index) in fields" :key="index" class="mb-4">
            <!-- Problem Field (Mandatory) -->
            <v-row>
              <v-col cols="12" md="4">
                <v-label>
                  <span>Problem</span>
                  <span class="text-danger"> *</span>
                  <!-- Asterisk for mandatory -->
                </v-label>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field
                  v-model="field.problem"
                  label="Problem"
                  required
                  :rules="[required]"
                />
              </v-col>
            </v-row>

            <!-- Description Field (Text Area) -->
            <v-row>
              <v-col cols="12" md="4">
                <v-label>Description</v-label>
              </v-col>
              <v-col cols="12" md="8">
                <v-textarea
                  v-model="field.description"
                  label="Description"
                  rows="3"
                  clearable
                />
              </v-col>
            </v-row>
          </div>

          <!-- Add More Button -->
          <v-btn @click="addMoreFields" color="primary" class="mt-3">
            Add More
          </v-btn>
        </v-form>
      </v-card-subtitle>

      <v-card-actions>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn @click="submitForm" :disabled="!formValid" color="primary"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { required } from "@/common/forms/formValidations.js"; // Import validation rules
import { defineEmits, defineProps, onMounted, onUnmounted, ref } from "vue";
import axiosInstance from "../../../services/axiosInstance";
/*
// Define props (directly access it instead of destructuring)
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
}); */
const props = defineProps({
  selectedPlant: {
    type: Number,
  },
});
// Emit event to notify parent when dialog visibility changes
const emit = defineEmits(["update:modelValue"]);

// Reactive state for the form
const dialog = ref(false);
const formValid = ref(true);
const fields = ref([]); // Initial field

/*
// Watch the modelValue to reset form fields when dialog is opened
watch(props.modelValue, (newValue) => {
  if (newValue) {
    // Reset fields when dialog is opened
    fields.value = [{ problem: "", description: "" }];
    formValid.value = true; // Reset the form validity
  }
});
*/
// Watch for changes to the internal dialog state
/*watch(dialog, (newVal) => {
  emit("update:modelValue", newVal); // Update the parent when dialog state changes
});
*/
// Add more fields
const addMoreFields = () => {
  fields.value.push({ problem: "", description: "" });
};

// Close the dialog
const closeDialog = () => {
  emit("update:modelValue", false);
};

// Submit the form
const submitForm = async () => {
  // Process form submission
  console.log(fields.value);
  const newProcess = {
    id: 12,
    sNo: 1,
    plantId: props.selectedPlant,
    process: fields.value.problem,
    description: fields.value.description,
    isActive: true,
  };
  let response = await axiosInstance.post(
    "http://localhost:3000/processes",
    newProcess
  );
  console.log(response);
  closeDialog();
};

/*
// Show the dialog (you can trigger this from the parent)
// eslint-disable-next-line
const showDialog = () => {
  dialog.value = true;
};
*/
onUnmounted(() => {
  fields.value = [];
});

onMounted(() => {
  fields.value = [{ problem: "", description: "" }];
});
</script>

<style scoped></style>
