export interface ILoginService {
  login(): void;
  logout(): void;
  getIsLoggedIn(): boolean;
}
