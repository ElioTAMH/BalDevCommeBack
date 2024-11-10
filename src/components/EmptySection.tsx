import { FilePlus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";

export default function EmptySection({ category }: { category: string }) {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
      <FilePlus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {t("contribute.emptySection.title")}
      </h3>
      <p className="text-gray-500 mb-4">
        {t("contribute.emptySection.description")}
      </p>
      <Link
        to={`/contribute?category=${category}`}
        className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
      >
        <Plus className="w-5 h-5 mr-2" />
        {t("contribute.emptySection.button")}
      </Link>
    </div>
  );
}
