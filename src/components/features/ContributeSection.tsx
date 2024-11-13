import { Link } from "react-router-dom";
import { useTranslation } from "../../hooks/useTranslation";
import { Github, BookOpen, Code, Users } from "lucide-react";

export default function ContributeSection() {
  const { t } = useTranslation();

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 rounded-2xl my-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {t("contribute.section.title")}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {t("contribute.section.description")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="bg-indigo-100 rounded-lg p-3 inline-block">
              <BookOpen className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {t("contribute.section.cards.documentation.title")}
            </h3>
            <p className="mt-2 text-gray-600">
              {t("contribute.section.cards.documentation.description")}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="bg-purple-100 rounded-lg p-3 inline-block">
              <Code className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {t("contribute.section.cards.code.title")}
            </h3>
            <p className="mt-2 text-gray-600">
              {t("contribute.section.cards.code.description")}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="bg-pink-100 rounded-lg p-3 inline-block">
              <Users className="h-6 w-6 text-pink-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {t("contribute.section.cards.community.title")}
            </h3>
            <p className="mt-2 text-gray-600">
              {t("contribute.section.cards.community.description")}
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/contribute"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            <Github className="h-5 w-5 mr-2" />
            {t("contribute.section.button")}
          </Link>
        </div>
      </div>
    </div>
  );
}
