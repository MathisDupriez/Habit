/**
 * Page d'authentification
 * Gère la connexion et l'inscription
 */
function AuthPage() {
  return {
    activeTab: 'login',
    error: '',
    loading: false,

    // Formulaire login
    loginEmail: '',
    loginPassword: '',

    // Formulaire register
    registerName: '',
    registerEmail: '',
    registerPassword: '',

    switchTab(tab) {
      this.activeTab = tab;
      this.error = '';
    },

    async handleLogin() {
      if (this.loading) return;
      this.error = '';
      this.loading = true;

      try {
        await this.$store.auth.login(this.loginEmail, this.loginPassword);
        this.$store.router.navigate('checklist');
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async handleRegister() {
      if (this.loading) return;
      this.error = '';
      this.loading = true;

      try {
        await this.$store.auth.register(
          this.registerName,
          this.registerEmail,
          this.registerPassword
        );
        this.$store.router.navigate('checklist');
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  };
}
