/**
 * Service d'authentification
 */
const AuthService = {
  async register(name, email, password) {
    const result = await HttpService.post('/auth/register', { name, email, password });
    HttpService.setToken(result.token);
    return result.user;
  },

  async login(email, password) {
    const result = await HttpService.post('/auth/login', { email, password });
    HttpService.setToken(result.token);
    return result.user;
  },

  async me() {
    return HttpService.get('/auth/me');
  },

  logout() {
    HttpService.setToken(null);
    window.location.reload();
  },

  isAuthenticated() {
    return !!HttpService.getToken();
  }
};
