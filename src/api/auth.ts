import { ApiService } from "./api-service";

interface LoginBody {
  email: string;
  password: string;
}

interface TokenResponse {
  token: string;
  isAdmin: boolean;
}

export class AuthService extends ApiService {
  async login(credentials: LoginBody) {
    // Login and get a token
    const { data } = await this.http.post<LoginBody, TokenResponse>(
      `${this.baseUrl}/login`,
      credentials,
    );
    const { token, isAdmin } = data;

    // Save obtained token
    this.setToken({ token, isAdmin });

    // Set default Auth header
    this.setAuthHeader(token);

    // Get user information
    return await this.client.users.me();
  }

  /**
   * @returns the user that is currently logged in, based on the token stored in localstorage.
   *          null if no user is currently logged in
   */
  async getLoggedUser() {
    // Get the token from local storage
    const storedToken = this.getToken();

    // Check is the token exists
    if (!storedToken) {
      return null;
    }

    const { token } = storedToken;

    // Save the token in the authorization header
    this.setAuthHeader(token);

    // Get user data
    try {
      const { data: user } = await this.client.users.me();
      return user;
    } catch (error) {
      return null;
    }
  }

  logout() {
    this.removeToken();
    this.removeAuthHeader();
  }

  getToken(): TokenResponse | null {
    try {
      const token = localStorage.getItem("x-auth-token");

      if (!token) {
        return null;
      }

      return JSON.parse(token);
    } catch {
      return null;
    }
  }

  setToken(token: TokenResponse) {
    localStorage.setItem("x-auth-token", JSON.stringify(token));
  }

  removeToken() {
    localStorage.removeItem("x-auth-token");
  }

  setAuthHeader(token: string) {
    this.http.instance.defaults.headers.common["x-auth-token"] = token;
  }

  removeAuthHeader() {
    delete this.http.instance.defaults.headers.common["x-auth-token"];
  }
}
