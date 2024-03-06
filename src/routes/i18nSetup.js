// @ts-nocheck

import { derived, writable } from "svelte/store";
import translations from "./../translations/translations.js";

// Initialize the locale from localStorage or default to "en" if not available
const initialLocale = localStorage.getItem("selectedLocale") || "en";

export const locale = writable(initialLocale);
export const locales = Object.keys(translations);

locale.subscribe(value => {
  localStorage.setItem("selectedLocale", value);
});

export function translate(locale, key, vars) {
  if (!key) throw new Error("no key provided to $t()");
  if (!locale) throw new Error(`no translation for key "${key}"`);

  // Split the key and access the translation
  let [section, item] = key.split('.');
  let text = translations[locale][section][item];

  if (!text) throw new Error(`no translation found for ${locale}.${key}`);

  // Replace any passed-in variables in the translation string
  Object.keys(vars).map((k) => {
    console.log(`Translating key: ${key} for locale: ${locale}`);
    const regex = new RegExp(`{{${k}}}`, "g");
    text = text.replace(regex, vars[k]);
  });

  return text;
}

export const t = derived(locale, ($locale) => (key, vars = {}) =>
  translate($locale, key, vars)
);





  

