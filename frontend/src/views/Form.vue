<template>
  <v-form class="ma-5">
    <v-card>
      <v-card-title> Создание списка </v-card-title>
      <v-card-text>
        <v-text-field v-model="list.name" label="Короткое имя" variant="outlined"  required/>
      </v-card-text>
      <v-card-text>
        <v-text-field v-model="list.fullname" label="Длинное имя" variant="outlined"  required/>
      </v-card-text>
      <v-card-text>
        <v-select label="Цвет" v-model="list.color" :items="colors" variant="outlined"></v-select>
      </v-card-text>
      <v-card-text>
        <v-row v-for="city in cities">
          <input type="checkbox" id="checkbox" v-model="selected" :value="city.id" />
          <label for="checkbox">{{ city.name }}</label>
        </v-row>
      </v-card-text>
      <v-checkbox   ></v-checkbox>
      <v-card-actions>
        <v-btn color="blue-darken-1" @click="save()" variant="text">
            Сохранить
        </v-btn>
        <v-btn color="red-darken-1" @click="router.push('/')" variant="text">
            Отмена
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang="ts" setup>
  import api from '@/api/api'
  import { CityType, ListForPost } from '@/types';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter()

  let selected = ref<number[]>([])
  let list = ref<ListForPost>({name: '', fullname: '', color: '', cities: []})
  let cities = ref<CityType[]>()
  const colors = ['green', 'blue', 'red', 'rose']

  const loadCities = async () => {
    api.getAllCities().then((data) => {
      cities.value = data
    })
  }
  const save = async () => {
    list.value.cities = selected.value
    api.createListOfCities(list.value).then((data) => {
    })
    router.push('/')
  }

  loadCities()
</script>
