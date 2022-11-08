import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import es from "../locales/es.json";

const numberFormats = {
  "en-US": {
    currency: {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    },
    decimal: {
      style: "decimal",
      maximumFractionDigits: 2,
    },
  },
  "es-AR": {
    currency: {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 2,
    },
    decimal: {
      style: "decimal",
      maximumSignificantDigits: 2,
    },
  },
};

const datetimeFormats = {
  "en-US": {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  },
  "es-AR": {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  },
};

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "es-AR",
    messages: {
      "es-AR": es,
      "en-US": en,
    },
    numberFormats,
    datetimeFormats,
  });

  vueApp.use(i18n);
});
