<template>
  <div>
    <el-button @click="onNewUserClickHandler" type="success">
      {{ $t('newUser') }}
    </el-button>

    <Dialog
      v-if="dialogVisible"
      :dialogVisible="dialogVisible"
      :title="$t('newUser')"
      @hideDialog="onHideDialog"
    >
      <template v-slot:content>
        <el-form ref="formRef" :rules="rules" :model="form" label-width="120px">
          <el-form-item :label="$t('name')" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item :label="$t('username')" prop="username">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item :label="$t('email')" prop="email">
            <el-input v-model="form.email" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit(formRef)">{{
              $t('create')
            }}</el-button>
          </el-form-item>
        </el-form>

        <Alert v-if="error" :title="error" type="error" />
        <Alert v-if="alertMessage" :title="alertMessage" type="success" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, inject, reactive } from 'vue';
import Dialog from '@/components/Dialog/index.vue';
import Alert from '@/components/Alert/index.vue';
import { useI18n } from 'vue-i18n';

import usersStore from '@/stores/users.js';

// Props
const props = defineProps({});

//Global variables
const helpers = inject('$helpers');

// Data
const alertMessage = ref(null);

const dialogVisible = ref(false);
const formRef = ref();
const error = ref(null);

const { t } = useI18n();

const form = reactive({
  name: '',
  username: '',
  email: '',
});

const rules = reactive({
  name: [
    { required: true, message: t('errors.requiredName'), trigger: 'blur' },
  ],
  username: [
    { required: true, message: t('errors.requiredUsername'), trigger: 'blur' },
  ],
  email: [
    {
      required: true,
      message: t('errors.requiredEmail'),
      trigger: 'blur',
    },
    {
      type: 'email',
      message: t('errors.requiredEmail'),
      trigger: ['blur', 'change'],
    },
  ],
});

// Stores
const usersModule = usersStore();

// Hooks

// Methods
const onHideDialog = () => {
  onDisplayDialog(false);
};

const onSubmit = async (formEl) => {
  let formIsValid = false;

  const data = {
    name: form.name,
    username: form.username,
    email: form.email,
    address: {
      street: 'test',
      suite: 'test',
      city: 'test',
      zipcode: 'test',
      geo: { lat: '-43.9509', lng: '-34.4618' },
    },
    phone: '0000000',
    website: 'https://www.linkedin.com/in/mihai-laurentiu/',
    company: {
      name: 'test-company',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
  };

  try {
    await formEl.validate();

    formIsValid = true;

    error.value = null;
  } catch (e) {
    formIsValid = false;
    error.value = getErrorMessages(e);
  }

  if (formIsValid) {
    try {
      await usersModule.add(data);
      alertMessage.value = 'successUserAdded';

      setTimeout(() => {
        onClearAlertMessage();
      }, 2000);

      setTimeout(() => {
        onDisplayDialog(false);
      }, 3000);
    } catch (e) {
      error.value = helpers.getFilteredErrorMessage(e.message);
    }
  }
};
const getErrorMessages = (errorObj) => {
  return Object.values(errorObj)
    .flatMap((el) => el)
    .map((err) => err.message + '\n')
    .toString();
};

const onClearAlertMessage = () => {
  alertMessage.value = null;
};

const onNewUserClickHandler = () => {
  onDisplayDialog(true);
  error.value = null;
  alertMessage.value = null;

  resetForm();
};

const resetForm = () => {
  form.name = '';
  form.username = '';
  form.email = '';
};

const onDisplayDialog = (value) => {
  dialogVisible.value = value;
};
</script>

<style scoped></style>
