import { translate } from "@vitalets/google-translate-api";

export async function translateText(
  text: string,
  targetLang: string
): Promise<string> {
  try {
    const result = await translate(text, { to: targetLang });
    return result.text;
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

  const textNodes = [];
  const walker = document.createTreeWalker(tempDiv, NodeFilter.SHOW_TEXT, null);

  let node;
  while ((node = walker.nextNode())) {
    textNodes.push(node);
  }

  for (const node of textNodes) {
    if (node.textContent?.trim()) {
      const translatedText = await translateText(node.textContent, targetLang);
      node.textContent = translatedText;
    }
  }

  return tempDiv.innerHTML;
}
