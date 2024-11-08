import { documentationData } from "../data/documentation";
import { translateText, translateHTML } from "../services/translationService";

interface Preview {
  type: string;
  html?: string;
  output?: string;
}

interface Section {
  title: string;
  content: string;
  code?: string;
  preview?: Preview;
}

interface Documentation {
  title: string;
  sections: Section[];
}

const translationCache: Record<string, Documentation> = {};

export async function getTranslatedDocumentation(
  category: string,
  targetLang: string
) {
  const cacheKey = `${category}-${targetLang}`;

  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  const docs = documentationData[category as keyof typeof documentationData];
  if (!docs || targetLang === "en") return docs;

  try {
    const translatedDocs = {
      ...docs,
      title: await translateText(docs.title, targetLang),
      sections: await Promise.all(
        docs.sections.map(async (section) => ({
          ...section,
          title: await translateText(section.title, targetLang),
          content: await translateHTML(section.content, targetLang),
          preview: section.preview
            ? {
                type: section.preview.type,
                ...(section.preview.type === "visual" &&
                "html" in section.preview
                  ? {
                      html: await translateHTML(
                        section.preview.html,
                        targetLang
                      ),
                    }
                  : {}),
                ...(section.preview.type === "output" &&
                "output" in section.preview
                  ? { output: section.preview.output || "" }
                  : "html" in section.preview
                  ? { html: section.preview.html || "" }
                  : {}),
              }
            : undefined,
        }))
      ),
    };

    translationCache[cacheKey] = translatedDocs;
    return translatedDocs;
  } catch (error) {
    console.error(`Translation failed for ${category}:`, error);
    return docs;
  }
}
