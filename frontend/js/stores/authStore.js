/**
 * Store d'authentification
 * Gère l'état de l'utilisateur connecté
 */
const AuthStore = {
  user: null,
  isAuthenticated: false,

  async checkAuth() {
    if (!AuthService.isAuthenticated()) {
      return false;
    }

    try {
      this.user = await AuthService.me();
      this.isAuthenticated = true;
      return true;
    } catch {
      this.isAuthenticated = false;
      return false;
    }
  },

  async login(email, password) {
    this.user = await AuthService.login(email, password);
    this.isAuthenticated = true;
  },

  async register(name, email, password) {
    this.user = await AuthService.register(name, email, password);
    this.isAuthenticated = true;
  },

  logout() {
    this.user = null;
    this.isAuthenticated = false;
    AuthService.logout();
  }
};
