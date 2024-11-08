import React, { createContext, useContext, useState, useEffect } from "react";
import { setCookie, getCookie } from "../utils/cookies";
import { getTranslatedDocumentation } from "../utils/documentationTranslator";
import { documentationData } from "../data/documentation";

type Language = "en" | "fr" | "es";

interface TranslationContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getDocumentation: (category: string) => Record<string, unknown>;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

export function TranslationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const savedLang = getCookie("preferred-language");
    return (
      (savedLang as Language) ||
      (navigator.language.split("-")[0] as Language) ||
      "en"
    );
  });

  const [translations, setTranslations] = useState<
    Record<string, Record<string, string>>
  >({});

  const [translatedDocs, setTranslatedDocs] = useState<
    Record<string, Record<string, unknown>>
  >({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        const translationModule = await import(
          `../translations/${currentLanguage}.ts`
        );
        setTranslations(translationModule.default);

        const categories = ["javascript", "react", "css", "html", "nodejs"];
        const translatedContent = await Promise.all(
          categories.map(async (category) => {
            const translated = await getTranslatedDocumentation(
              category,
              currentLanguage
            );
            return [category, translated];
          })
        );

        setTranslatedDocs(Object.fromEntries(translatedContent));
      } catch (error) {
        console.error("Failed to load translations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [currentLanguage]);

  const contextValue = {
    currentLanguage,
    setLanguage: (lang: Language) => {
      setCurrentLanguage(lang);
      setCookie("preferred-language", lang);
    },
    t: (key: string): string => {
      const keys = key.split(".");
      let current = translations;

      for (const k of keys) {
        if (!current?.[k]) return key;
        current = current[k] as unknown as Record<
          string,
          Record<string, string>
        >;
      }

      return typeof current === "string" ? current : key;
    },
    getDocumentation: (category: keyof typeof documentationData) =>
      translatedDocs[category] || documentationData[category],
    isLoading,
  };
  return (
    <TranslationContext.Provider value={contextValue as TranslationContextType}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (undefined === context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
