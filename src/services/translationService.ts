import { frenchDocumentation } from "../translations/documentation.fr";

export function getDocumentationTranslation(
  category: string,
  language: string
) {
  if (language === "fr") {
    return frenchDocumentation[category as keyof typeof frenchDocumentation];
  }
  return null;
}

export async function translateText(
  text: string,
  targetLang: string
): Promise<string> {
  if (targetLang === "fr") {
    const translations: Record<string, string> = {
      "Search documentation...": "Rechercher dans la documentation...",
      Documentation: "Documentation",
      Search: "Rechercher",
      Home: "Accueil",
    };
    return translations[text] || text;
  }
  return text;
}
