/**
 * Point d'entrée de l'application
 * Initialise Alpine.js et enregistre les composants
 */
document.addEventListener('alpine:init', () => {
  // Enregistrement des stores globaux
  Alpine.store('auth', AuthStore);
  Alpine.store('habits', HabitsStore);
  Alpine.store('logs', LogsStore);
  Alpine.store('router', RouterStore);
});

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', async () => {
  // Vérifier l'authentification au démarrage
  const isAuth = await Alpine.store('auth').checkAuth();
  if (isAuth) {
    Alpine.store('router').navigate('checklist');
  }
});
