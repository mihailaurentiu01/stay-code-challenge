<template>
  <div>
    <el-table :data="filterTableData" class="table-width">
      <el-table-column :label="$t('name')" prop="name" />
      <el-table-column :label="$t('username')" prop="username" />
      <el-table-column :label="$t('email')" prop="email" />

      <el-table-column align="right">
        <template #header>
          <el-input
            v-model="search"
            size="small"
            :placeholder="$t('typeToSearch')"
          />
        </template>
        <template #default="scope" v-if="enableDetails || enableDelete">
          <el-button
            v-if="enableDetails"
            size="small"
            @click="handleView(scope.$index, scope.row)"
            >{{ $t('details') }}</el-button
          >

          <el-button
            v-if="enableDelete"
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >{{ $t('delete') }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <Dialog
      v-if="dialogVisibleDetails"
      :dialogVisible="dialogVisibleDetails"
      :title="$t('userDetails')"
      @hideDialog="onHideDialogDetails"
    >
      <template v-slot:content>
        <p>{{ $t('name') }}: {{ selectedUser.name }}</p>
        <p>{{ $t('email') }}: {{ selectedUser.email }}</p>
        <p>{{ $t('username') }}: {{ selectedUser.username }}</p>
        <p>{{ $t('phone') }}: {{ selectedUser.phone }}</p>
        <p>{{ $t('website') }}: {{ selectedUser.website }}</p>
        <p>
          {{ $t('address') }}: {{ selectedUser.address.street }} -
          {{ selectedUser.address.city }}
        </p>
        <p>{{ $t('company') }}: {{ selectedUser.company.name }}</p>
      </template>
    </Dialog>

    <Alert v-if="error" :title="error" type="error" />
    <Alert v-if="alertMessage" :title="alertMessage" type="success" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Dialog from '@/components/Dialog/index.vue';
import Alert from '@/components/Alert/index.vue';

import usersStore from '@/stores/users.js';
import { inject } from 'vue';

// Props
const props = defineProps({
  dataSource: {
    type: Array,
    required: true,
    default: () => [],
  },
  enableDetails: {
    type: Boolean,
    required: true,
    default: true,
  },
  enableDelete: {
    type: Boolean,
    required: true,
    default: true,
  },
});

//Global variables
const helpers = inject('$helpers');

// Data
const search = ref('');
const selectedUser = ref(null);
const dialogVisibleDetails = ref(false);
const alertMessage = ref(null);

const error = ref('');

const filterTableData = computed(() =>
  props.dataSource.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase()) ||
      data.email.toLowerCase().includes(search.value.toLowerCase()) ||
      data.username.toLowerCase().includes(search.value.toLowerCase())
  )
);

// Stores
const usersModule = usersStore();

// Hooks

// Methods
const handleView = (index, row) => {
  selectedUser.value = row;

  onDisplayDialogDetails(true);
};

const handleDelete = async (index, row) => {
  try {
    await usersModule.delete(row.id);
    alertMessage.value = 'successUserDeleted';

    setTimeout(() => {
      onClearAlertMessage();
    }, 2000);
  } catch (e) {
    error.value = helpers.getFilteredErrorMessage(e.message);
  }
};

const onClearAlertMessage = () => {
  alertMessage.value = null;
};

const onHideDialogDetails = () => {
  onDisplayDialogDetails(false);
};

const onDisplayDialogDetails = (value) => {
  dialogVisibleDetails.value = value;
};
</script>

<style scoped>
@import url('./UsersTable.css');
</style>
