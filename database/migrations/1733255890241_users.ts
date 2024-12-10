import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('users', (table) => {
      table.string('nome')
    })
  }
}
