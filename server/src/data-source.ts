import "reflect-metadata"
import { DataSource } from "typeorm"
import { Cities, ListsOfCities } from "./entity/form.entity"

export const AppDataSource = new DataSource({
    type: 'mongodb',
    database: 'cities',
    synchronize: true,
    entities: [ListsOfCities, Cities],
    cache: true
})
