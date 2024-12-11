import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Chat from './Chat'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public email: string

  @column()
  public lastLogin: DateTime

  @column()
  public state: number

  @column()
  public fusionauthUserId: string

  @manyToMany(() => Chat, {
    pivotTable: 'chat_users',
  })
  public chats: ManyToMany<typeof Chat>
  
  @column()
  public socketId: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
