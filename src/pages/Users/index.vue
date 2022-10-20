<script setup>
import { onMounted, ref } from 'vue';
import usersStore from '@/stores/users.js';
import UsersTable from '@/components/UsersTable/index.vue';
import Alert from '@/components/Alert/index.vue';
import NewUserForm from '@/components/NewUserForm/index.vue';

import { inject } from 'vue';

const error = ref(null);

// Global variables
const helpers = inject('$helpers');

// Data

// Stores
const usersModule = usersStore();

// Hooks
onMounted(async () => {
  try {
    await usersModule.get();
  } catch (e) {
    error.value = helpers.getFilteredErrorMessage(e.message);
  }
});

// Methods
</script>

<template>
  <div>
    <NewUserForm />

    <UsersTable
      :dataSource="usersModule.users"
      :enableDetails="true"
      :enableDelete="true"
    />

    <Alert v-if="error" :title="error" type="error" />
  </div>
</template>

<style></style>
