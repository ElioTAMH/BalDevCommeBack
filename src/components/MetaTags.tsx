import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

export default function MetaTags({
  title,
  description,
  image = "/og-image.png",
  type = "website",
}: MetaTagsProps) {
  const location = useLocation();
  const { currentLanguage } = useTranslation();

  useEffect(() => {
    const baseUrl = "https://baldev.jean-winter.fr";
    const currentUrl = `${baseUrl}${location.pathname}`;

    document.title = title
      ? `${title} | BalDev`
      : "BalDev - Web Development Documentation";

    const metaTags = {
      "og:title": title,
      "og:description": description,
      "og:image": `${baseUrl}${image}`,
      "og:url": currentUrl,
      "og:type": type,
      "og:locale": currentLanguage === "fr" ? "fr_FR" : "en_US",
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": `${baseUrl}${image}`,
      "twitter:url": currentUrl,
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      if (content) {
        const elements = document.getElementsByTagName("meta");
        for (let i = 0; i < elements.length; i++) {
          if (elements[i].getAttribute("property") === name) {
            elements[i].setAttribute("content", content);
          }
        }
      }
    });
  }, [title, description, image, type, location, currentLanguage]);

  return null;
}
