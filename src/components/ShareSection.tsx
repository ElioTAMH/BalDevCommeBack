import { Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";

interface ShareSectionProps {
  sectionId: string;
  title: string;
}

export default function ShareSection({ sectionId, title }: ShareSectionProps) {
  const currentUrl = `${window.location.origin}${window.location.pathname}#${sectionId}`;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(
    `Check out this section about ${title} on BalDev`
  );

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={copyToClipboard}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-indigo-600 hover:border-indigo-600 transition-all duration-200"
      >
        <LinkIcon className="h-4 w-4" />
        <span>Share link</span>
      </button>

      <div className="flex items-center gap-1">
        <a
          href={socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-600 hover:text-blue-400 hover:bg-blue-50 rounded-full transition-all duration-200"
          title="Share on Twitter"
        >
          <Twitter className="h-4 w-4" />
        </a>
        <a
          href={socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
          title="Share on Facebook"
        >
          <Facebook className="h-4 w-4" />
        </a>
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-all duration-200"
          title="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
