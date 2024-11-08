import React, { createContext, useContext, useState, useEffect } from 'react';
import { setCookie, getCookie } from '../utils/cookies';

type Language = 'en' | 'fr' | 'es';

interface TranslationContextType {
    currentLanguage: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
    const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
        const savedLang = getCookie('preferred-language');
        return (savedLang as Language) ||
            (navigator.language.split('-')[0] as Language) ||
            'en';
    });

    const [translations, setTranslations] = useState<Record<string, any>>({});

    useEffect(() => {
        const loadTranslations = async () => {
            try {
                const translationModule = await import(`../translations/${currentLanguage}.ts`);
                setTranslations(translationModule.default);
            } catch (error) {
                console.error('Failed to load translations:', error);
                const enModule = await import(`../translations/en.ts`);
                setTranslations(enModule.default);
            }
        };

        loadTranslations();
    }, [currentLanguage]);

    const setLanguage = (lang: Language) => {
        setCurrentLanguage(lang);
        setCookie('preferred-language', lang);
    };

    const t = (key: string): string => {
        const keys = key.split('.');
        let current: any = translations;

        for (const k of keys) {
            if (current?.[k] === undefined) {
                console.warn(`Translation missing for key: ${key}`);
                return key;
            }
            current = current[k];
        }

        return current;
    };

    return (
        <TranslationContext.Provider value={{ currentLanguage, setLanguage, t }}>
            {children}
        </TranslationContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(TranslationContext);
    if (undefined === context) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
} 