interface SchedulerConfig {
  priceUpdateInterval: string;
  cacheCleanupInterval: string;
}

// Определение расписаний задач
const schedulerConfig: SchedulerConfig = {
  priceUpdateInterval: "*/5 * * * *",
  cacheCleanupInterval: "0 0 * * *",
};

export default schedulerConfig;
