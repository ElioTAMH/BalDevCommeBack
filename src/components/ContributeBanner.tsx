import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";

export default function ContributeBanner() {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-6 shadow-lg mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold mb-2">
            {t("contribute.banner.title")}
          </h2>
          <p className="text-indigo-100">
            {t("contribute.banner.description")}
          </p>
        </div>
        <Link
          to="/contribute"
          className="flex items-center bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          {t("contribute.banner.button")}
        </Link>
      </div>
    </div>
  );
}
