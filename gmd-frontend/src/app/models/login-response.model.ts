import {UiUser} from './ui-user.model';

export class LoginResponse {
  constructor(
    public token: string,
    public uiUser: UiUser,
  ) {}
}
