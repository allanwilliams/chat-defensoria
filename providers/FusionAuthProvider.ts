import { ApplicationContract } from '@ioc:Adonis/Core/Application';
import FusionAuthService from 'App/Services/FusionAuthService';

export default class FusionAuthProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton('App/FusionAuth', () => {
      return FusionAuthService;
    });
  }
}
