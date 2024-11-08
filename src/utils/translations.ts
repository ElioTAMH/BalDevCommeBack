import { documentationData } from '../data/documentation';

const translations = {
    en: {
        navigation: {
            documentation: 'Documentation',
            search: 'Search',
            home: 'Home'
        },
        common: {
            copyCode: 'Copy Code',
            preview: 'Preview',
            output: 'Output',
            searchPlaceholder: 'Search documentation...',
            noResults: 'No results found for',
            startTyping: 'Start typing to search...'
        }
    },
    fr: {
        navigation: {
            documentation: 'Documentation',
            search: 'Rechercher',
            home: 'Accueil'
        },
        common: {
            copyCode: 'Copier le code',
            preview: 'Aperçu',
            output: 'Sortie',
            searchPlaceholder: 'Rechercher dans la documentation...',
            noResults: 'Aucun résultat trouvé pour',
            startTyping: 'Commencez à taper pour rechercher...'
        }
    },
    es: {
        navigation: {
            documentation: 'Documentación',
            search: 'Buscar',
            home: 'Inicio'
        },
        common: {
            copyCode: 'Copiar código',
            preview: 'Vista previa',
            output: 'Salida',
            searchPlaceholder: 'Buscar en la documentación...',
            noResults: 'No se encontraron resultados para',
            startTyping: 'Empiece a escribir para buscar...'
        }
    }
};

export function getTranslation(language: string, path: string): string {
    const pathParts = path.split('.');
    let result: any = translations[language as keyof typeof translations];

    for (const part of pathParts) {
        if (result && result[part]) {
            result = result[part];
        } else {
            return path;
        }
    }

    return result;
}

export function getDocumentationInLanguage(language: string, category: string) {
    const docs = documentationData[category as keyof typeof documentationData];
    if (!docs) return null;

    return {
        ...docs,
        sections: docs.sections.map(section => ({
            ...section,
            title: getTranslation(language, `documentation.${category}.${section.title}`) || section.title,
            content: getTranslation(language, `documentation.${category}.${section.content}`) || section.content
        }))
    };
} 