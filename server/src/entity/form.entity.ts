import { Entity, Column, ObjectIdColumn } from "typeorm"; 

@Entity()
export class Cities {     
    @ObjectIdColumn()
    id: number

    @Column({ unique: true })
    name: string
    
    @Column({ unique: true })
    date: Date   
}

@Entity()
export class ListsOfCities {     
    @ObjectIdColumn()
    id: number   
    
    @Column()
    name: string

    @Column({ unique: true })
    fullName: string

    @Column()
    color: string

    @Column()
    cities: number[]
}
