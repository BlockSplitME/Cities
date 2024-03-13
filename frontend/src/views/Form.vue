<template>
  <v-form class="ma-5">
    <v-card>
      <v-card-title> Создание списка </v-card-title>
      <v-card-text>
        <v-text-field v-model="list.name" label="Короткое имя" variant="outlined"  required/>
      </v-card-text>
      <v-card-text>
        <v-text-field v-model="list.fullName" label="Длинное имя" variant="outlined"  required/>
      </v-card-text>
      <v-card-text >
        <v-select autocomplete="false" label="Цвет" v-model="list.color" :items="colors" variant="outlined"></v-select>
      </v-card-text>
      <v-card-text style="max-height: 20vh; overflow-y: auto;">
        <v-row v-for="city in cities" class="ma-3">
          <input type="checkbox" :id="city.name" v-model="selected" :value="city.id" />
          <label :for="city.name">{{ city.name }}</label>
        </v-row>
      </v-card-text>
      <v-checkbox   ></v-checkbox>
      <v-card-actions>
        <v-btn v-if="changeMode"  color="blue-darken-1" @click="change()" variant="text">
            Изменить
        </v-btn>
        <v-btn v-else color="blue-darken-1" @click="save()" variant="text">
            Сохранить
        </v-btn>
        <v-btn color="red-darken-1" @click="cancel()" variant="text">
            Отмена
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang="ts" setup>
  import api from '@/api/api'
  import { deleteInLocalStorage, getFromLocalStorage } from '@/model/localStore';
  import { CityType, ListForPost } from '@/types';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter()

  let changeMode = ref<boolean>(false)
  let selected = ref<number[]>([])
  let list = ref<ListForPost>({name: '', fullName: '', color: '', cities: []})
  let cities = ref<CityType[]>()
  const colors = ['green', 'blue', 'red', 'black', 'yellow', 'pink']

  const loadCities = async () => {
    api.getAllCities().then((data) => {
      cities.value = data
    })
  }

  const change = async () => {
    list.value.cities = selected.value
    api.updateListOfCities(list.value, getFromLocalStorage('currentList')!)
    cancel()
  }

  const save = async () => {
    list.value.cities = selected.value
    api.createListOfCities(list.value)
    cancel()
  }

  const cancel = () =>  {
    deleteInLocalStorage('currentList')
    router.push('/')
  }
  const loadCurrentList = async () => {
    const id = getFromLocalStorage('currentList')
    if(id) {
      await api.getList(id).then((data) => {{
        list.value = data
      }})
      changeMode.value = true
      selected.value = list.value.cities
    } 
  }
  loadCities()
  loadCurrentList()
</script>
