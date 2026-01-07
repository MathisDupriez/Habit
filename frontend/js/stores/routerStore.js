/**
 * Store de navigation
 * Gère la page active et les transitions
 */
const RouterStore = {
  currentPage: 'auth',

  navigate(page) {
    this.currentPage = page;
  },

  isPage(page) {
    return this.currentPage === page;
  }
};
