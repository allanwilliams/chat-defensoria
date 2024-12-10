import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('users', (table) => {
      table.string('email')
      table.timestamp('last_login')
      table.integer('state')
      table.string('fusionauth_user_id')
    })
  }
}
