/**
 * Utilitaires de manipulation de dates
 */
const DateUtils = {
  format(date) {
    return date.toISOString().split('T')[0];
  },

  formatDisplay(date) {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('fr-FR', options);
  },

  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },

  getDayOfWeek(date) {
    return Config.DAYS_OF_WEEK[date.getDay()];
  },

  getDayOfMonth(date) {
    return date.getDate();
  },

  getDateRange(days) {
    const end = new Date();
    const start = this.addDays(end, -days);
    return {
      start: this.format(start),
      end: this.format(end)
    };
  }
};
