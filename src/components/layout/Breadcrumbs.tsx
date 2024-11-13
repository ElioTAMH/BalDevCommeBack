import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";

export default function Breadcrumbs() {
  const location = useLocation();
  const { t } = useTranslation();

  const pathSegments = location.pathname.split("/").filter(Boolean);

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("navigation.home"),
        item: "https://baldev.jean-winter.fr",
      },
    ],
  };

  let currentPath = "";

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="flex items-center space-x-2 text-sm text-gray-500 mb-8"
      >
        <Link to="/" className="hover:text-gray-900">
          {t("navigation.home")}
        </Link>
        {pathSegments.map((segment, index) => {
          currentPath += `/${segment}`;
          breadcrumbsSchema.itemListElement.push({
            "@type": "ListItem",
            position: index + 2,
            name: t(`navigation.${segment}`),
            item: `https://baldev.jean-winter.fr${currentPath}`,
          });

          return (
            <span key={segment} className="flex items-center">
              <ChevronRight className="h-4 w-4" />
              <Link
                to={currentPath}
                className="ml-2 hover:text-gray-900 capitalize"
              >
                {t(`navigation.${segment}`)}
              </Link>
            </span>
          );
        })}
      </nav>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbsSchema)}
      </script>
    </>
  );
}
