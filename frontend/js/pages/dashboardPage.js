/**
 * Page Dashboard
 * Statistiques et visualisations
 */
function DashboardPage() {
  return {
    loading: false,
    period: 30,
    logs: [],

    // Corrélation
    correlationHabit1: '',
    correlationHabit2: '',

    async init() {
      await this.load();
    },

    async load() {
      this.loading = true;
      try {
        await this.$store.habits.load();
        const range = DateUtils.getDateRange(this.period);
        this.logs = await LogService.getByDateRange(range.start, range.end);
      } finally {
        this.loading = false;
      }
    },

    async changePeriod() {
      await this.load();
    },

    get habits() {
      return this.$store.habits.items;
    },

    // Heatmap
    get heatmapDays() {
      const days = [];
      const end = new Date();
      let current = DateUtils.addDays(end, -this.period);

      const logsMap = {};
      this.logs.forEach(log => {
        if (!logsMap[log.date]) {
          logsMap[log.date] = { total: 0, completed: 0 };
        }
        logsMap[log.date].total++;
        if (log.completed) logsMap[log.date].completed++;
      });

      while (current <= end) {
        const dateStr = DateUtils.format(current);
        const data = logsMap[dateStr];
        let level = 0;

        if (data && data.total > 0) {
          const ratio = data.completed / data.total;
          if (ratio >= 0.25) level = 1;
          if (ratio >= 0.5) level = 2;
          if (ratio >= 0.75) level = 3;
          if (ratio >= 1) level = 4;
        }

        days.push({
          date: dateStr,
          level,
          tooltip: data
            ? `${dateStr}: ${data.completed}/${data.total}`
            : `${dateStr}: -`
        });

        current = DateUtils.addDays(current, 1);
      }

      return days;
    },

    // Streaks
    get streaks() {
      return this.habits
        .map(habit => ({
          habit,
          streak: HabitUtils.calculateStreak(habit, this.logs)
        }))
        .sort((a, b) => b.streak - a.streak);
    },

    // Corrélation
    get correlationResult() {
      const id1 = parseInt(this.correlationHabit1);
      const id2 = parseInt(this.correlationHabit2);

      if (!id1 || !id2 || id1 === id2) {
        return null;
      }

      const habit1 = this.habits.find(h => h.id === id1);
      const habit2 = this.habits.find(h => h.id === id2);

      const logs1 = {};
      const logs2 = {};

      this.logs.forEach(log => {
        if (log.habitId === id1) logs1[log.date] = log.completed;
        if (log.habitId === id2) logs2[log.date] = log.completed;
      });

      const dates = [...new Set([...Object.keys(logs1), ...Object.keys(logs2)])];

      let bothDone = 0;
      let h1Only = 0;
      let h2Only = 0;
      let neither = 0;

      dates.forEach(date => {
        const done1 = logs1[date] || false;
        const done2 = logs2[date] || false;

        if (done1 && done2) bothDone++;
        else if (done1) h1Only++;
        else if (done2) h2Only++;
        else neither++;
      });

      const total = dates.length;
      if (total === 0) return null;

      return {
        habit1: habit1.name,
        habit2: habit2.name,
        bothDone,
        bothPercent: Math.round(bothDone / total * 100),
        h1Only,
        h2Only,
        neither,
        total
      };
    }
  };
}
