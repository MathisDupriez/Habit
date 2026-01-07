/**
 * Store des logs d'habitudes
 * Gère l'état de complétion par date
 */
const LogsStore = {
  byDate: {},
  byRange: [],

  async loadForDate(date) {
    const logs = await LogService.getByDate(date);
    this.byDate = {};
    logs.forEach(log => {
      this.byDate[log.habitId] = log.completed;
    });
  },

  async loadForRange(startDate, endDate) {
    this.byRange = await LogService.getByDateRange(startDate, endDate);
  },

  async toggle(habitId, date, completed) {
    this.byDate[habitId] = completed;
    try {
      await LogService.toggle(habitId, date, completed);
    } catch (error) {
      this.byDate[habitId] = !completed;
      throw error;
    }
  },

  isCompleted(habitId) {
    return this.byDate[habitId] || false;
  }
};
