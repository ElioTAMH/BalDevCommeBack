import React, { useState } from "react";
import { ChevronDown, ChevronUp, Github, Book, XCircle } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";

interface FormData {
  category: string;
  title: string;
  content: string;
  code: string;
  previewType: "visual" | "console";
  previewContent: string;
}

const encodeBase64 = (str: string): string => {
  return btoa(unescape(encodeURIComponent(str)));
};

const decodeBase64 = (str: string): string => {
  return decodeURIComponent(escape(atob(str)));
};

const validateGithubToken = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      return false;
    }

    const scopes = response.headers.get("x-oauth-scopes")?.split(", ") || [];
    return scopes.includes("repo");
  } catch {
    return false;
  }
};

export default function Contribute() {
  const [formData, setFormData] = useState<FormData>({
    category: "javascript",
    title: "",
    content: "",
    code: "",
    previewType: "visual",
    previewContent: "",
  });

  const [openSections, setOpenSections] = useState({
    structure: false,
    preview: false,
    github: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [githubToken, setGithubToken] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { t } = useTranslation();

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!githubToken) {
      setError(t("contribute.page.submit.error.token"));
      setIsSubmitting(false);
      return;
    }

    try {
      const isValidToken = await validateGithubToken(githubToken);
      if (!isValidToken) {
        setError("Invalid GitHub token or missing 'repo' scope permissions");
        setIsSubmitting(false);
        return;
      }

      const userResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (!userResponse.ok) {
        throw new Error("Failed to get user information");
      }

      const userData = await userResponse.json();
      const username = userData.login;

      const owner = "AigloOo";
      const repo = "BalDevCommeBack";

      const forkResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/forks`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!forkResponse.ok) {
        throw new Error("Failed to fork repository");
      }

      await new Promise((resolve) => setTimeout(resolve, 5000));

      const sanitizedTitle = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const branchName = `doc-${sanitizedTitle}-${Date.now()}`;

      const mainBranchResponse = await fetch(
        `https://api.github.com/repos/${username}/${repo}/git/ref/heads/main`,
        {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!mainBranchResponse.ok) {
        const errorData = await mainBranchResponse.json();
        if (mainBranchResponse.status === 403) {
          throw new Error(
            "Insufficient permissions. Please check your GitHub token has the 'repo' scope."
          );
        } else if (mainBranchResponse.status === 404) {
          throw new Error("Repository not found or token is invalid.");
        }
        throw new Error(`Failed to get main branch: ${errorData.message}`);
      }

      const mainBranchData = await mainBranchResponse.json();
      const mainSha = mainBranchData.object.sha;

      const treeResponse = await fetch(
        `https://api.github.com/repos/${username}/${repo}/git/trees/${mainSha}`,
        {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!treeResponse.ok) {
        const errorData = await treeResponse.json();
        throw new Error(`Failed to get tree: ${errorData.message}`);
      }

      const createBranchResponse = await fetch(
        `https://api.github.com/repos/${username}/${repo}/git/refs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ref: `refs/heads/${branchName}`,
            sha: mainSha,
          }),
        }
      );

      if (!createBranchResponse.ok) {
        const errorData = await createBranchResponse.json();
        throw new Error(`Failed to create branch: ${errorData.message}`);
      }

      const fileResponse = await fetch(
        `https://api.github.com/repos/${username}/${repo}/contents/src/data/documentation.json?ref=main`,
        {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!fileResponse.ok) {
        const errorData = await fileResponse.json();
        throw new Error(`Failed to get file: ${errorData.message}`);
      }

      const fileData = await fileResponse.json();
      const existingContent = JSON.parse(decodeBase64(fileData.content));

      const newSection = {
        title: formData.title,
        content: formData.content,
        code: formData.code,
        preview: {
          type: formData.previewType,
          [formData.previewType === "visual" ? "html" : "output"]:
            formData.previewContent,
        },
      };

      const updatedContent = {
        ...existingContent,
        [formData.category]: {
          ...existingContent[formData.category],
          sections: [
            ...existingContent[formData.category].sections,
            newSection,
          ],
        },
      };

      const updateFileResponse = await fetch(
        `https://api.github.com/repos/${username}/${repo}/contents/src/data/documentation.json`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `Add documentation for ${formData.title}`,
            content: encodeBase64(JSON.stringify(updatedContent, null, 2)),
            sha: fileData.sha,
            branch: branchName,
          }),
        }
      );

      if (!updateFileResponse.ok) {
        const errorData = await updateFileResponse.json();
        throw new Error(`Failed to update file: ${errorData.message}`);
      }

      const prResponse = await fetch(
        `https://api.github.com/repos/${username}/${repo}/pulls`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: `Add documentation: ${formData.title}`,
            body: `Added new documentation section for ${formData.title}`,
            head: `${username}:${branchName}`,
            base: "main",
          }),
        }
      );

      if (!prResponse.ok) {
        const errorData = await prResponse.json();
        throw new Error(`Failed to create PR: ${errorData.message}`);
      }

      alert(t("contribute.page.submit.success"));
      setFormData({
        category: "javascript",
        title: "",
        content: "",
        code: "",
        previewType: "visual",
        previewContent: "",
      });
    } catch (error) {
      console.error("Error submitting documentation:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryOptions = {
    javascript: t("contribute.page.structure.category.options.javascript"),
    html: t("contribute.page.structure.category.options.html"),
    css: t("contribute.page.structure.category.options.css"),
    react: t("contribute.page.structure.category.options.react"),
    nodejs: t("contribute.page.structure.category.options.nodejs"),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            {t("contribute.page.title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("contribute.page.subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection("structure")}
              className="flex items-center justify-between w-full p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-100 rounded-lg p-2">
                  <Book className="h-6 w-6 text-indigo-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {t("contribute.page.structure.title")}
                </h2>
              </div>
              {openSections.structure ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {openSections.structure && (
              <div className="p-6 border-t border-gray-200 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("contribute.page.structure.category.label")}
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      {Object.entries(categoryOptions).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("contribute.page.structure.title_field")}
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("contribute.page.structure.content")}
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    rows={5}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("contribute.page.structure.code")}
                  </label>
                  <textarea
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                    rows={5}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection("preview")}
              className="flex items-center justify-between w-full p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-100 rounded-lg p-2">
                  <Book className="h-6 w-6 text-indigo-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {t("contribute.page.preview.title")}
                </h2>
              </div>
              {openSections.preview ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {openSections.preview && (
              <div className="p-6 border-t border-gray-200 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("contribute.page.preview.type.label")}
                  </label>
                  <select
                    value={formData.previewType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        previewType: e.target.value as "visual" | "console",
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="visual">
                      {t("contribute.page.preview.type.visual")}
                    </option>
                    <option value="console">
                      {t("contribute.page.preview.type.console")}
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("contribute.page.preview.content")}
                  </label>
                  <textarea
                    value={formData.previewContent}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        previewContent: e.target.value,
                      })
                    }
                    rows={5}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection("github")}
              className="flex items-center justify-between w-full p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-100 rounded-lg p-2">
                  <Book className="h-6 w-6 text-indigo-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {t("contribute.page.github.title")}
                </h2>
              </div>
              {openSections.github ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {openSections.github && (
              <div className="p-6 border-t border-gray-200 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("contribute.page.github.token.label")}
                  </label>
                  <input
                    type="password"
                    value={githubToken}
                    onChange={(e) => setGithubToken(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder={t("contribute.page.github.token.placeholder")}
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    {t("contribute.page.github.token.help")}
                    <br />
                    <strong className="text-indigo-600">
                      Important: Make sure to select the 'repo' scope when
                      creating your token.
                    </strong>
                    <br />
                    <a
                      href="https://github.com/settings/tokens/new?scopes=repo&description=BalDev%20Documentation%20Contribution"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      Create a new token with correct permissions →
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-4 border border-red-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                inline-flex items-center px-6 py-3 border border-transparent 
                text-base font-medium rounded-lg shadow-sm text-white 
                transition-all duration-200 ease-in-out
                ${
                  isSubmitting
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-md"
                }
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              `}
            >
              <Github className="h-5 w-5 mr-2" />
              {isSubmitting
                ? t("contribute.page.submit.submitting")
                : t("contribute.page.submit.button")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
