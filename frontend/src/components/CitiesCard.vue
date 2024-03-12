<template>
  <v-list>
    <v-list-item v-for="item in list">
      <v-row>
        <v-col> {{ item.name }} </v-col>
        <v-col> {{ item.date }} </v-col>
      </v-row>
    </v-list-item>
  </v-list>
  <v-row v-if="list" justify="start" class="ma-3">
      <v-btn @click="emit('delete')"> Удалить </v-btn>
      <v-btn @click="emit('update')"> Изменить </v-btn>
  </v-row>
</template>

<script lang="ts" setup>
  import { CityType } from '@/types';

  const props = defineProps({
    list: Object
  })
  const emit = defineEmits(['delete', 'update'])

</script>
