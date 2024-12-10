import { FusionAuthClient } from '@fusionauth/typescript-client';
import User from 'App/Models/User';

export default class FusionAuthService {
  public clientId;
  public clientSecret;
  public redirectUri = 'http://localhost:3333/auth/callback'
  private client: FusionAuthClient;

  constructor() {
    const apiKey = process.env.FUSIONAUTH_API_KEY;
    const baseUrl = process.env.FUSIONAUTH_BASE_URL;
    this.clientId = process.env.FUSIONAUTH_CLIENT_ID;
    this.clientSecret = process.env.FUSIONAUTH_CLIENT_SECRET;
    
    if (!apiKey || !baseUrl) {
      throw new Error('FUSIONAUTH_API_KEY ou FUSIONAUTH_BASE_URL não configurado.');
    }

    this.client = new FusionAuthClient(apiKey, baseUrl);
  }

  /**
   *  Retorna url de autenticação
   * 
   */
  
  async getLoginUrlFusionAuth(){
    return `${this.client.host}/oauth2/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      this.redirectUri
    )}`;
  }

  /**
   * Processar Reponse Callback
   */

  async validateCallback(authorizationCode){
    try{
      const tokenResponse = await this.client.exchangeOAuthCodeForAccessToken(
        authorizationCode,
        this.clientId,
        this.clientSecret,
        this.redirectUri
      );
  
      const accessToken = tokenResponse.response.access_token;
      if (accessToken){
        const userResponse = await this.client.retrieveUserUsingJWT(accessToken);
        const user = userResponse.response.user;
        const chatUser = await this.getOrCreateChatUser(user)
        return chatUser
      }
    }catch{
      throw new Error('Falha ao validar callback.');
    }
  }

  /**
   * Veriricar e criar usuário dentro da base de dados
   */

  async getOrCreateChatUser(fusionAuthUser){
    let user = await User.findBy('fusionauthUserId', fusionAuthUser.id);

    if (!user) {
      // Criar o usuário no banco de dados
      const chatUser = await User.create({
        email: fusionAuthUser.email,
        nome: `${fusionAuthUser.firstName} ${fusionAuthUser.lastName}`,
        fusionauthUserId: fusionAuthUser.id,
      });
      if (chatUser) return chatUser
    }
    return user
    
  }

  /**
   * Método para autenticar um usuário no FusionAuth.
   */

  async validateUserRegistration(user: any, applicationId: string) {
    const isRegistered = user.registrations?.some(
      (reg: any) => reg.applicationId === applicationId
    );
  
    if (!isRegistered) {
      throw new Error('Usuário não está registrado nesta aplicação.');
    }
  }

  async login(email: string, password: string) {
    const clientId = process.env.FUSIONAUTH_CLIENT_ID;
    const loginRequest = {
      loginId: email,
      password: password,
    };
    const response = await this.client.login(loginRequest);
    if (response.wasSuccessful() && clientId) {
      const user = response.response?.user
      if (user) 
      await this.validateUserRegistration(user, clientId);
      return response.response?.user; // Retorna informações do usuário autenticado
    } else {
    //   throw new Error(response.response?.message || 'Erro ao autenticar o usuário');
      throw new Error('Erro ao autenticar o usuário');
    }
  }

  /**
   * Exemplo de outro método: Buscar um usuário por email.
   */
  async getUserByEmail(email: string) {
    const response = await this.client.retrieveUserByEmail(email);
    if (response.wasSuccessful()) {
      return response.response?.user;
    } else {
    //   throw new Error(response.errorResponse?.message || 'Usuário não encontrado');
      throw new Error('Usuário não encontrado');
    }
  }

  /**
   * destroy session com FusionAuth
   */

  async logout() {
    try {
        await this.client.logout(false);
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
}
}
