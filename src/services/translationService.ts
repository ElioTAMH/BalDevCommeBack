const GOOGLE_TRANSLATE_API =
  "https://translation.googleapis.com/language/translate/v2";
const API_KEY = "YOUR_GOOGLE_API_KEY"; // You'll need to get an API key from Google Cloud Console

interface TranslationResponse {
  data: {
    translations: Array<{
      translatedText: string;
    }>;
  };
}

export async function translateText(
  text: string,
  targetLang: string
): Promise<string> {
  try {
    const response = await fetch(`${GOOGLE_TRANSLATE_API}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        target: targetLang,
      }),
    });

    if (!response.ok) {
      throw new Error("Translation failed");
    }

    const data: TranslationResponse = await response.json();
    return data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
}

export async function translateHTML(
  html: string,
  targetLang: string
): Promise<string> {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const textNodes: Text[] = [];
  const walker = document.createTreeWalker(tempDiv, NodeFilter.SHOW_TEXT, null);

  let node;
  while ((node = walker.nextNode())) {
    if (node.textContent?.trim()) {
      textNodes.push(node as Text);
    }
  }

  const translations = await Promise.all(
    textNodes.map(async (node) => {
      if (node.textContent?.trim()) {
        return translateText(node.textContent, targetLang);
      }
    })
  );

  let translatedHTML = html;
  translations.forEach((translatedText, index) => {
    if (textNodes[index].textContent && translatedText) {
      translatedHTML = translatedHTML.replace(
        textNodes[index].textContent,
        translatedText
      );
    }
  });

  return translatedHTML;
}
