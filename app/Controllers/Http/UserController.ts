  import { inject } from '@adonisjs/core/build/standalone';

  @inject(['App/Services/UserService'])
  export default class UserController {
    constructor(private userService) {}

    public async getUser({auth, request, response }){
      const user = auth.user
      return response.status(200).json(user)
    }

    public async listUsers({auth,request,response}){
      const termo = request.input('termo') || ''

      try {
        const users = await this.userService.listUsers(termo,auth.user)

        return response.status(200).json(users)
      } catch (error) {
        return response.status(500).json({ error: error.message })
      }
    }
  }
