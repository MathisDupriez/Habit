/**
 * Utilitaires liés aux habitudes
 */
const HabitUtils = {
  isScheduledForDate(habit, date) {
    const dayOfWeek = DateUtils.getDayOfWeek(date);
    const dayOfMonth = DateUtils.getDayOfMonth(date);

    switch (habit.frequencyType) {
      case 'daily':
        return true;
      case 'weekly':
        return habit.frequencyDays.includes(dayOfWeek);
      case 'monthly':
        return habit.frequencyDays.includes(dayOfMonth);
      default:
        return true;
    }
  },

  formatFrequency(habit) {
    switch (habit.frequencyType) {
      case 'daily':
        return 'Tous les jours';
      case 'weekly':
        const days = habit.frequencyDays
          .map(d => Config.DAYS_LABELS[d] || d)
          .join(', ');
        return `Hebdo: ${days}`;
      case 'monthly':
        return `Mensuel: le ${habit.frequencyDays.join(', ')}`;
      default:
        return '';
    }
  },

  calculateStreak(habit, logs) {
    const habitLogs = logs
      .filter(l => l.habitId === habit.id && l.completed)
      .map(l => l.date)
      .sort()
      .reverse();

    if (habitLogs.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    let current = new Date(today);

    while (streak <= 365) {
      const dateStr = DateUtils.format(current);

      if (!this.isScheduledForDate(habit, current)) {
        current = DateUtils.addDays(current, -1);
        continue;
      }

      if (habitLogs.includes(dateStr)) {
        streak++;
        current = DateUtils.addDays(current, -1);
      } else {
        if (dateStr === DateUtils.format(today)) {
          current = DateUtils.addDays(current, -1);
          continue;
        }
        break;
      }
    }

    return streak;
  }
};
