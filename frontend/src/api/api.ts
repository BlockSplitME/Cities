import axios from 'axios';
import { CityType, ListCitiesType, ListForPost } from '@/types'

const url = "http://localhost:8050"

async function getAllCities(): Promise<CityType[]> {
    return axios.get(url+'/getAllCities/')
    .then(response => {
        let data = response.data 
        return data
    })
    .catch(error => {
        console.error(error);
    });
}

async function getAllListsOfCities(): Promise<ListCitiesType[]> {
    return axios.get(url+'/getAllListsOfCities/')
    .then(response => {
        let data = response.data 
        return data
    })
    .catch(error => {
        console.error(error);
    });
}

async function getList(id: string): Promise<ListCitiesType> {
  return axios.get(url+'/getList/' + id)
  .then(response => {
      let data = response.data 
      return data
  })
  .catch(error => {
      console.error(error);
  });
}

async function getListOfCities(id: string): Promise<CityType[]> {  
    return axios.get(url+'/getListOfCities/'+ id)
    .then(response => {
      let data = response.data 
      return data
    })
    .catch(error => {
      console.error(error);
    });
}


async function createListOfCities(data: ListForPost) {
    return await axios.post(url+'/createListOfCities', (data))
    .then(response => {
    })
    .catch(error => {
      console.error(error);
    });
}
async function updateListOfCities(data: ListForPost, id: string) {
  return await axios.patch(url +'/updateListOfCities/' + id, (data))
  .then(response => {
  })
  .catch(error => {
    console.error(error);
  });
}

async function deleteListOfCities(id: string) {
  return await axios.delete(url+'/deleteListOfCities/'+ id).then(response => {
  })
  .catch(error => {
    console.error(error);
  });
}
export default {
    createListOfCities, updateListOfCities, getAllCities, getList, getListOfCities, getAllListsOfCities, deleteListOfCities
}