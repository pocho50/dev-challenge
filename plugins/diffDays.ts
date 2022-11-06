export default defineNuxtPlugin(() => {
  return {
    provide: {
      diffDays: (date_a: Date, date_b: Date): number => {
        return Math.ceil(
          (date_b.getTime() - date_a.getTime()) / (1000 * 3600 * 24)
        );
      },
    },
  };
});
