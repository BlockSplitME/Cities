import { AppDataSource } from "./data-source"
import * as resolvers from './resolvers/resolver'

const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express');

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

AppDataSource.initialize()
    .then(() => {})
    .catch((error) => console.log(error))

app.get('/getAllCities', resolvers.getAllCities)
app.get('/getAllListsOfCities', resolvers.getAllListsOfCities)
app.get('/getListOfCities/:id', resolvers.getListOfCities);
app.post('/createListOfCities', resolvers.addListOfCities);
app.delete('/deleteListOfCities/:id', resolvers.deleteListOfCities)

app.listen(8050, () => {
  console.log('Сервер запущен на порту 8050');
});
