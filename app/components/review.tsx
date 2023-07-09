import clsx from "clsx";
import { johnDoe } from "~/assets/images";
import { BASE_IMAGE_URL, ProfileSizes } from "~/utils/tmdb";
import { ChevronDown, Star } from "lucide-react";
import { useId, useState } from "react";

const Review = ({
  author,
  createdDate,
  content,
  rating,
}: {
  author: {
    avatarPath: string | null;
    name: string;
  };
  createdDate: string;
  rating: number | null;
  content: string;
}) => (
  <article className="rounded-xl border border-neutral-700 bg-neutral-800 p-5">
    <div className="flex items-center gap-x-3">
      <img
        src={
          author.avatarPath
            ? author.avatarPath.includes("gravatar")
              ? author.avatarPath.slice(1)
              : `${BASE_IMAGE_URL}${ProfileSizes.xs}${author.avatarPath}`
            : johnDoe
        }
        alt={`${author.name} Avatar`}
        className="h-11 w-11 rounded-full bg-neutral-400"
        width={48}
        height={48}
        loading="lazy"
      />
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold text-neutral-100">{author.name}</h3>
        <p className="text-sm text-neutral-400">{createdDate}</p>
      </div>
      {rating ? (
        <p className="flex shrink-0 items-center gap-x-1 font-normal">
          <Star
            aria-hidden
            className="h-4 w-4 fill-yellow-500 stroke-yellow-500 sm:mb-0"
          />
          <span className="text-sm text-neutral-200">
            {rating}
            <span className="text-xs text-neutral-400">/10</span>
          </span>
        </p>
      ) : null}
    </div>
    <Content content={content} />
  </article>
);

const Content = ({ content }: { content: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const contentId = useId();

  return (
    <div className="pt-4">
      <div
        id={contentId}
        className={clsx(
          !isOpen && "line-clamp-4 md:line-clamp-5 lg:line-clamp-6",
          "prose prose-sm prose-invert max-w-full",
        )}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      <button
        type="button"
        onClick={toggle}
        className="flex items-center gap-x-0.5 text-sm text-cyan-500 transition hover:text-cyan-400"
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        See {isOpen ? "less" : "more"}
        <ChevronDown
          aria-hidden
          className={clsx(isOpen && "rotate-180", "mt-0.5 h-4 w-4")}
        />
      </button>
    </div>
  );
};

export { Review };
