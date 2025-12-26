import Link from "next/link";
import { GoStar, GoRepoForked, GoRepo } from "react-icons/go";

interface PinnedRepoProps {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  href: string;
}

export default function PinnedRepo({
  name,
  description,
  language,
  languageColor,
  stars,
  forks,
  href,
}: PinnedRepoProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col justify-between p-4 border border-neutral-100 rounded-md bg-white shadow-sm hover:border-neutral-200 hover:shadow-md transition-all h-full"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <GoRepo className="text-neutral-500 text-lg" />
          <span className="font-semibold text-sky-600 truncate">{name}</span>
          <span className="px-1.5 py-0.5 text-[10px] uppercase font-medium border border-neutral-200 text-neutral-500 rounded-full ml-auto">
            Public
          </span>
        </div>
        <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-4 mt-4 text-xs text-neutral-600">
        <div className="flex items-center gap-1.5">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: languageColor }}
          />
          <span>{language}</span>
        </div>
        <div className="flex items-center gap-1 hover:text-sky-600 transition-colors">
          <GoStar />
          <span>{stars}</span>
        </div>
        <div className="flex items-center gap-1 hover:text-sky-600 transition-colors">
          <GoRepoForked />
          <span>{forks}</span>
        </div>
      </div>
    </Link>
  );
}
