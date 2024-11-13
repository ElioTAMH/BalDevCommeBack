import {
  Star,
  GitFork,
  Eye,
  GitPullRequest,
  GitCommit,
  AlertCircle,
} from "lucide-react";

interface GitHubStatsProps {
  stats: {
    stars: number;
    forks: number;
    watchers: number;
    commits: number;
    pullRequests: number;
    openIssues: number;
  };
}

export default function GitHubStats({ stats }: GitHubStatsProps) {
  const statItems = [
    { icon: <Star className="h-5 w-5" />, value: stats.stars, label: "Stars" },
    {
      icon: <GitFork className="h-5 w-5" />,
      value: stats.forks,
      label: "Forks",
    },
    {
      icon: <Eye className="h-5 w-5" />,
      value: stats.watchers,
      label: "Watchers",
    },
    {
      icon: <GitCommit className="h-5 w-5" />,
      value: stats.commits,
      label: "Commits",
    },
    {
      icon: <GitPullRequest className="h-5 w-5" />,
      value: stats.pullRequests,
      label: "Pull Requests",
    },
    {
      icon: <AlertCircle className="h-5 w-5" />,
      value: stats.openIssues,
      label: "Open Issues",
    },
  ];

  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        GitHub Statistics
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {statItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="text-indigo-600 mb-2">{item.icon}</div>
            <div className="text-2xl font-bold text-gray-900">{item.value}</div>
            <div className="text-sm text-gray-500">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
