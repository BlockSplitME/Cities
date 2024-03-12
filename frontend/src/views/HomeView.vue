<template>
  <v-card title="Города" variant="outlined" >
    <CitiesCard v-if="choosen" :list="cities" @delete="deleteList(currentListId)" @update=""/>
    <v-tabs>
      <div v-for="item in lists" :key="item.name">
        <v-tab :color="item.color" @click="chooseList(item.id)" > 
          {{ item.name }} 
        </v-tab>
      </div>
    </v-tabs>
  </v-card>
</template>


<script lang="ts" setup>
  import CitiesCard from '@/components/CitiesCard.vue';

  import api from '@/api/api'
  import { CityType, ListCitiesType } from '@/types';
  import { onMounted, onUpdated, ref } from 'vue';
  
  let choosen = ref<boolean>(false)
  let cities = ref<CityType[]>()
  let lists = ref<ListCitiesType[]>()
  let currentListId = ref<string>('')
  
  const chooseList = (id: string) => {
    choosen.value = true
    loadCities(id)
  }

  const loadCities = async (id: string) => { 
    currentListId.value = id
     
    await api.getListOfCities(id).then((data) => {
      cities.value = data 
    })
  }
  const loadLists = async () => {
    await api.getAllListsOfCities().then((data) => {
      lists.value = data
    })
    console.log('Update lists ' + JSON.stringify(lists.value));
  }
  const deleteList = async (id: string) => {
    choosen.value = false
    await api.deleteListOfCities(id).then((data) => {
    })
    await loadLists()
  }
  onMounted(async () => {
    await loadLists()
  })

  loadLists()

</script>
