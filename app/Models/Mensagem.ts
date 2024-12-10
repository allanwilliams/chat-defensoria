import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Chat from './Chat'

export default class Mensagem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(()=> Chat)
  declare chat: HasOne<typeof Chat>

  @column()
  public body: string

  @column()
  public ack: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
