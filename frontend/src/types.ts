export type CityType = {
    id: string,
    name: string,
    date: number
}

export type ListCitiesType = {
    id: string,
    name: string, 
    fullname: string,
    color: string,
    cities: number[]
}

export type ListForPost = Omit<ListCitiesType, 'id'>