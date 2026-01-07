/**
 * Store des habitudes
 * Gère la liste des habitudes de l'utilisateur
 */
const HabitsStore = {
  items: [],
  loading: false,

  async load() {
    this.loading = true;
    try {
      this.items = await HabitService.getAll();
    } finally {
      this.loading = false;
    }
  },

  async create(data) {
    const habit = await HabitService.create(data);
    this.items.push(habit);
    return habit;
  },

  async update(id, data) {
    const habit = await HabitService.update(id, data);
    const index = this.items.findIndex(h => h.id === id);
    if (index !== -1) {
      this.items[index] = habit;
    }
    return habit;
  },

  async delete(id) {
    await HabitService.delete(id);
    this.items = this.items.filter(h => h.id !== id);
  },

  getById(id) {
    return this.items.find(h => h.id === id);
  }
};
