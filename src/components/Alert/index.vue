<script setup>
// Props
const props = defineProps({
  type: {
    type: String,
    default: 'error',
    required: true,
  },
  title: {
    type: String,
    default: 'errors.default',
    required: true,
  },
});

//Methods
</script>
<template>
  <el-alert :title="$t(title)" :type="type" center show-icon />
</template>

<style scoped>
@import url('./Alert.css');
</style>
