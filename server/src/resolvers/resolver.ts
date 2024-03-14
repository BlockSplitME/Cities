import { ObjectId } from "mongodb";
import { AppDataSource } from "../data-source";
import { Cities, ListsOfCities } from "../entity/form.entity";

export const getAllCities = async(req, res) => {
  const tableCities = AppDataSource.getMongoRepository(Cities);
  try {
    const data = await tableCities.find({cache: true});
    res.json(data);
  } catch(error) {
    res.status(500).json({ error: 'Ошибка получения даных' });
  }
}

export const getAllListsOfCities = async(req, res) => {
  const tableListsOfCities = AppDataSource.getMongoRepository(ListsOfCities);
  try {
    const data = await tableListsOfCities.find({cache: true});
    res.json(data);
  } catch(error) {
    res.status(500).json({ error: 'Ошибка получения даных' });
  }
}

export const getListById = async(req, res) => {
  const tableListsOfCities = AppDataSource.getMongoRepository(ListsOfCities);

  const idList = req.params.id
  
  try {
    const list = await tableListsOfCities.findOne({ where: { _id: new ObjectId(idList)}, cache: true});
    res.json(list);
  } catch(error) {
    res.status(500).json({ error: 'Ошибка получения даных' });
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
    res.status(500).json({ error: 'Ошибка получения даных' });
  }
}

export const addListOfCities = async (req, res) => {
  const tableListsOfCities = AppDataSource.getMongoRepository(ListsOfCities);
  const { name, fullname, color, cities } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Получены некорректные данные' });
  }
  
  const hasItem = await tableListsOfCities.findOneBy({name: name})
  const newList = tableListsOfCities.create({ name: name, fullName: fullname, color: color, cities: cities });
  
  try {
    if(hasItem) res.status(400).json({ error: 'Объект уже сущестует.' + JSON.stringify(hasItem)});
    else {
      await tableListsOfCities.save(newList);
      res.json('Объект сохранен');
    }
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сохранения данных' });
  }
}

export const updateListOfCities = async (req, res) => {
  const tableListsOfCities = AppDataSource.getMongoRepository(ListsOfCities);
  const { name, fullname, color, cities } = req.body;
  const idList = req.params.id
  
  if (!name) {
    return res.status(400).json({ error: 'Получены некорректные данные' });
  }
  
  try {
    const newList = await tableListsOfCities.updateOne({_id: new ObjectId(idList)},{$set: {
      name: name,
      fullname: fullname,
      color: color,
      cities: cities
    }})
    res.json('Объект сохранен');
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сохранения данных' });
  }
}

export const deleteListOfCities = async(req, res) => {
  const tableListsOfCities = AppDataSource.getMongoRepository(ListsOfCities);

  const idList = req.params.id
  
  const hasItem = await tableListsOfCities.findOne({ where: { _id: new ObjectId(idList)}, cache: true})

  try {
    if(!hasItem) res.status(400).json({ error: 'Такого объекта нет.'})
    else {
      await tableListsOfCities.delete(new ObjectId(idList))
      res.status(200).json('Объект удален');
    }
  } catch(error) {
    res.status(500).json({ error: 'Ошибка удаления' });
  }
}