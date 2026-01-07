/**
 * Service de gestion des habitudes
 */
const HabitService = {
  async getAll() {
    return HttpService.get('/habits');
  },

  async getById(id) {
    return HttpService.get(`/habits/${id}`);
  },

  async create(data) {
    return HttpService.post('/habits', data);
  },

  async update(id, data) {
    return HttpService.put(`/habits/${id}`, data);
  },

  async delete(id) {
    return HttpService.delete(`/habits/${id}`);
  }
};
