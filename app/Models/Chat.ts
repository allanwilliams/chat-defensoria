import { DateTime } from 'luxon'
import { BaseModel,column, manyToMany, ManyToMany, hasMany, HasMany, computed } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Mensagem from './Mensagem'

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @manyToMany(() => User, {
    pivotTable: 'chat_users',
  })
  public users: ManyToMany<typeof User>

  @hasMany(() => Mensagem)
  public mensagens: HasMany<typeof Mensagem>

  @computed()
  public get nome(): string | null {
    if (!this.$preloaded.users) {
      return null // Retorna null se os usuários não foram pré-carregados
    }

    // Certifique-se de que `users` seja transformado em um array simples
    const usersArray = Array.isArray(this.$preloaded.users)
      ? this.$preloaded.users
      : this.$preloaded.users.toJSON()

    const otherUser = usersArray.find((user) => user.id !== this.$extras.currentUserId)
    return otherUser ? otherUser.name : null
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
