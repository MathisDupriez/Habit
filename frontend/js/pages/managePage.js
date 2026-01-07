/**
 * Page Gestion
 * CRUD des habitudes
 */
function ManagePage() {
  return {
    loading: false,
    modalOpen: false,
    editingId: null,

    // Formulaire
    form: {
      name: '',
      frequencyType: 'daily',
      weeklyDays: [],
      monthlyDays: ''
    },

    async init() {
      await this.load();
    },

    async load() {
      this.loading = true;
      try {
        await this.$store.habits.load();
      } finally {
        this.loading = false;
      }
    },

    get habits() {
      return this.$store.habits.items;
    },

    formatFrequency(habit) {
      return HabitUtils.formatFrequency(habit);
    },

    openModal(habit = null) {
      this.editingId = habit?.id || null;
      this.form = {
        name: habit?.name || '',
        frequencyType: habit?.frequencyType || 'daily',
        weeklyDays: habit?.frequencyType === 'weekly' ? [...habit.frequencyDays] : [],
        monthlyDays: habit?.frequencyType === 'monthly' ? habit.frequencyDays.join(', ') : ''
      };
      this.modalOpen = true;
    },

    closeModal() {
      this.modalOpen = false;
      this.editingId = null;
    },

    toggleWeekday(day) {
      const index = this.form.weeklyDays.indexOf(day);
      if (index === -1) {
        this.form.weeklyDays.push(day);
      } else {
        this.form.weeklyDays.splice(index, 1);
      }
    },

    isWeekdaySelected(day) {
      return this.form.weeklyDays.includes(day);
    },

    async handleSubmit() {
      const frequencyDays = this.getFrequencyDays();
      const data = {
        name: this.form.name.trim(),
        frequencyType: this.form.frequencyType,
        frequencyDays
      };

      try {
        if (this.editingId) {
          await this.$store.habits.update(this.editingId, data);
        } else {
          await this.$store.habits.create(data);
        }
        this.closeModal();
      } catch (err) {
        alert(err.message);
      }
    },

    getFrequencyDays() {
      switch (this.form.frequencyType) {
        case 'weekly':
          return this.form.weeklyDays;
        case 'monthly':
          return this.form.monthlyDays
            .split(',')
            .map(d => parseInt(d.trim()))
            .filter(d => !isNaN(d) && d >= 1 && d <= 31);
        default:
          return [];
      }
    },

    async deleteHabit(id) {
      if (!confirm('Supprimer cette habitude ?')) return;
      try {
        await this.$store.habits.delete(id);
      } catch (err) {
        alert(err.message);
      }
    }
  };
}
