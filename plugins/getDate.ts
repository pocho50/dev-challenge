export default defineNuxtPlugin(() => {
  return {
    provide: {
      getDate: (stringDate: string): Date => {
        const [year, month, day] = stringDate.split("-");
        return new Date(year, month - 1, day);
      },
    },
  };
});
