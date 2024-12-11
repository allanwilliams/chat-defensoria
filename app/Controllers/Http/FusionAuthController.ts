  import { inject } from '@adonisjs/core/build/standalone';

  @inject(['App/Services/FusionAuthService'])
  export default class FusionAuthController {
    constructor(private fusionAuthService) {}

    /**
     * Redireciona o usuário para o FusionAuth para login.
     */
    public async authLogin({ response }) {
      const authUrl = await this.fusionAuthService.getLoginUrlFusionAuth()
      return response.redirect(authUrl);
    }

    /**
     * Desautentica usuário atual e retorna para login
     */

    public async logout({auth,request,response}){
      await auth.use('web').logout()
      await this.fusionAuthService.logout()
      return response.redirect('/chat')
    }

    /**
     * Callback após autenticação no FusionAuth.
     */
    public async callback({auth, request, response }) {
      const authorizationCode = request.qs().code;
      if (!authorizationCode) {
        return response.status(400).send('Código de autorização não encontrado.');
      }

      try {
        // Trocar o código de autorização por um token de acesso
        const user = await this.fusionAuthService.validateCallback(authorizationCode)
        
        await auth.use('web').login(user)
        // Exemplo: Retornar informações do usuário
        return response.redirect('/chat')
      } catch (error) {
        console.error('Erro no callback OAuth:', error.message);
        return response.status(500).send('Erro ao processar login.');
      }
    }

    public async getUser({auth, request, response }){
      const user = auth.user
      return response.status(200).json(user)
    }
  }
