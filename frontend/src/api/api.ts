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
    console.log(data);
    
    axios.post(url+'/createListOfCities', (data))
    .then(response => {
      // console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}

async function deleteListOfCities(id: string) {
  axios.delete(url+'/deleteListOfCities/'+ id).then(response => {
    // console.log(response.data); 
  })
  .catch(error => {
    console.error(error);
  });
}
export default {
    createListOfCities, getAllCities, getListOfCities, getAllListsOfCities, deleteListOfCities
}