<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="30%"
    :before-close="handleClose"
  >
    <slot name="content"> </slot>
  </el-dialog>
</template>

<script setup>
import { defineEmits } from 'vue';

// Global variables

// Props
defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
    default: false,
  },
  title: {
    type: String,
    required: true,
    default: '',
  },
});
// Data
const emit = defineEmits(['hideDialog']);

// Stores

// Hooks

// Methods
const handleClose = (done) => {
  emit('hideDialog');
};
</script>

<style scoped>
@import url('./Dialog.css');
</style>
