import User from 'App/Models/User';

export default class UserService {
  async getUserById(id){
    const user = await User.findBy('id',id)

    if(!user){
      throw new Error('Usuário Não localizado');
    }

    return user
  }

  async setUserSocketId(id,socketId){
    const user = await User.findBy('id',id)

    if(!user){
      throw new Error('Usuário Não localizado');
    }

    user.socketId = socketId
    await user.save()
  }

  async listUsers(termo,user){
    const users = await User.query()
      .whereRaw(`unaccent(nome) ILIKE unaccent(?)`, [`%${termo}%`])
      .whereRaw(`id <> (?)`,[`${user.id}`]);
    return users
  }

}
