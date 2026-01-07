/**
 * Service de gestion des logs d'habitudes
 */
const LogService = {
  async toggle(habitId, date, completed) {
    return HttpService.post(`/logs/habit/${habitId}`, { date, completed });
  },

  async getByDate(date) {
    return HttpService.get(`/logs/date/${date}`);
  },

  async getByDateRange(startDate, endDate) {
    return HttpService.get(`/logs/range?startDate=${startDate}&endDate=${endDate}`);
  },

  async getStats(startDate, endDate) {
    return HttpService.get(`/logs/stats?startDate=${startDate}&endDate=${endDate}`);
  },

  async getHabitLogs(habitId, startDate, endDate) {
    return HttpService.get(`/logs/habit/${habitId}?startDate=${startDate}&endDate=${endDate}`);
  }
};
