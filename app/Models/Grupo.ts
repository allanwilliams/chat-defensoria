import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Grupo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @manyToMany(()=> User)
  declare membros: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
