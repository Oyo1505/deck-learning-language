import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
import enDecks from './en/decks.json';
import enHome from './en/home.json';
import frDecks from './fr/decks.json';
import frHome from './fr/home.json';
import jaDecks from './ja/decks.json';
import jaHome from './ja/home.json';

export const cookieName = 'i18next';

export const defaultNS = "translation"

export const resources = {
      fr: {
        decks: frDecks,
        home: frHome
      },
      en: {
        decks: enDecks,
        home: enHome
      },
      ja: {
        decks: jaDecks,
        home: jaHome
      }
    } as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "fr",
    supportedLngs: ['en', 'fr', 'ja'],
    fallbackLng: 'fr',
    defaultNS,
    ns: ['translation'],
    resources: resources,
    detection: {
      order: ['cookie'],
      caches: ['cookie'],
      cookieMinutes: 60 * 24 * 365, // 1 year
      lookupCookie: cookieName,
    },
    interpolation: {
      escapeValue: false
    }
  });

  export const setSSRLangage = createIsomorphicFn().server(async () => {
    const language = getCookie(cookieName);
    await i18n.changeLanguage(language || 'fr');
  });
  export default i18n;