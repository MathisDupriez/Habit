/**
 * Page Checklist
 * Affiche les habitudes du jour à cocher
 */
function ChecklistPage() {
  return {
    currentDate: new Date(),
    loading: false,

    async init() {
      await this.load();
    },

    async load() {
      this.loading = true;
      try {
        await this.$store.habits.load();
        await this.$store.logs.loadForDate(this.dateString);
      } finally {
        this.loading = false;
      }
    },

    get dateString() {
      return DateUtils.format(this.currentDate);
    },

    get displayDate() {
      return DateUtils.formatDisplay(this.currentDate);
    },

    get scheduledHabits() {
      return this.$store.habits.items.filter(h =>
        HabitUtils.isScheduledForDate(h, this.currentDate)
      );
    },

    isCompleted(habitId) {
      return this.$store.logs.isCompleted(habitId);
    },

    async prevDay() {
      this.currentDate = DateUtils.addDays(this.currentDate, -1);
      await this.$store.logs.loadForDate(this.dateString);
    },

    async nextDay() {
      this.currentDate = DateUtils.addDays(this.currentDate, 1);
      await this.$store.logs.loadForDate(this.dateString);
    },

    async toggle(habitId) {
      const current = this.isCompleted(habitId);
      try {
        await this.$store.logs.toggle(habitId, this.dateString, !current);
      } catch (err) {
        console.error('Erreur toggle:', err);
      }
    }
  };
}
