import { ObjectId } from "mongodb";
import { AppDataSource } from "../data-source";
import { Cities, ListsOfCities } from "../entity/form.entity";

export const getAllCities = async(req, res) => {
  const tableCities = AppDataSource.getMongoRepository(Cities);
  try {
    const data = await tableCities.find({cache: true});
    res.json(data);
  } catch(error) {
    res.status(500).json({ error: 'Ошибка получения данных' });
  }
}

export const getAllListsOfCities = async(req, res) => {
  const tableListsOfCities = AppDataSource.getMongoRepository(ListsOfCities);
  try {
    const data = await tableListsOfCities.find();
    res.json(data);
  } catch(error) {
    res.status(500).json({ error: 'Ошибка получения данных' });
  }
}

export const getListOfCities = async(req, res) => {
  const tableCities = AppDataSource.getMongoRepository(Cities);
  const tableListsOfCities = AppDataSource.getMongoRepository(ListsOfCities);

  const idList = req.params.id
  
  try {
    const listCitiesId = await tableListsOfCities.findOne({ where: { _id: new ObjectId(idList)}, cache: true});
    const listCities = await tableCities.find({where: {
      _id: {
        $in: listCitiesId.cities.map(id => new ObjectId(id))
      }
    }, cache: true});
    res.json(listCities);

  } catch(error) {
    res.status(500).json({ error: 'Нет такого объекта' });
  }
}

export const addListOfCities = async (req, res) => {
  const tableListsOfCities = AppDataSource.getMongoRepository(ListsOfCities);
  const { name, fullname, color, cities } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Получены некорректные данные' });
  }
  
  const hasItem = await tableListsOfCities.findOneBy({name: name})
  const newList = await tableListsOfCities.create({ name: name, fullName: fullname, color: color, cities: cities });
  
  try {
    if(hasItem) res.status(500).json({ error: 'Объект уже сущестует.' + JSON.stringify(hasItem)});
    else {
      await tableListsOfCities.save(newList);
      res.json(newList);
    }
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сохранения данных' });
  }
}

export const deleteListOfCities = async(req, res) => {
  const tableListsOfCities = AppDataSource.getMongoRepository(ListsOfCities);

  const idList = req.params.id
  
  const hasItem = await tableListsOfCities.findOne({ where: { _id: new ObjectId(idList)}, cache: true})

  try {
    if(!hasItem) throw new Error()
    await tableListsOfCities.delete(new ObjectId(idList))
    res.status(200).json('Объект удален');
  } catch(error) {
    res.status(500).json({ error: 'Нет такого объекта' });
  }
}