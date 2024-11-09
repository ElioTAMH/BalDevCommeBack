import { createContext, ReactNode, useState, useEffect } from "react";
import { setCookie, getCookie } from "../utils/cookies";
import { getDocumentationTranslation } from "../services/translationService";
import { documentationData } from "../data/documentation";

type Language = "en" | "fr" | "es";

type DocumentationCategory = keyof typeof documentationData;

interface TranslationContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getDocumentation: (
    category: DocumentationCategory
  ) => (typeof documentationData)[DocumentationCategory];
  isLoading: boolean;
}

export const TranslationContext = createContext<TranslationContextType | null>(
  null
);

interface TranslationProviderProps {
  children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
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
    Record<
      DocumentationCategory,
      (typeof documentationData)[DocumentationCategory]
    >
  >(
    {} as Record<
      DocumentationCategory,
      (typeof documentationData)[DocumentationCategory]
    >
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        const translationModule = await import(
          `../translations/${currentLanguage}.ts`
        );
        setTranslations(translationModule.default);

        const categories = [
          "javascript",
          "react",
          "css",
          "html",
          "nodejs",
        ] as const;
        const translatedContent = await Promise.all(
          categories.map(async (category) => {
            const translated =
              (await getDocumentationTranslation(category, currentLanguage)) ||
              documentationData[category];
            return [category, translated];
          })
        );

        setTranslatedDocs(Object.fromEntries(translatedContent));
      } catch (error) {
        console.error("Failed to load translations:", error);
        setTranslatedDocs(documentationData);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [currentLanguage]);

  const contextValue: TranslationContextType = {
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
    getDocumentation: (category: DocumentationCategory) =>
      translatedDocs[category] || documentationData[category],
    isLoading,
  };
  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
}
