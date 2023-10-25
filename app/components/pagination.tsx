import { ArrowIcon } from "~/assets/icons";
import { Link, useSearchParams } from "@remix-run/react";

const Pagination = ({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) => (
  <nav className="flex items-center justify-center gap-x-10 px-4 py-10 sm:px-0 sm:pb-14 sm:pt-16">
    <PaginationLink disabled={page <= 1} page={page - 1}>
      <ArrowIcon
        className="-ml-0.5 mr-2 mt-0.5 h-4 w-4 rotate-180"
        aria-hidden="true"
      />
      Previous
    </PaginationLink>
    <PaginationLink disabled={page >= totalPages} page={page + 1}>
      Next
      <ArrowIcon className="-mr-0.5 ml-2 mt-0.5 h-4 w-4" aria-hidden="true" />
    </PaginationLink>
  </nav>
);

const PaginationLink = ({
  page,
  disabled,
  children,
}: {
  page: number;
  disabled: boolean;
  children: React.ReactNode;
}) => {
  const [searchParams] = useSearchParams();
  searchParams.set("page", page.toString());

  return disabled ? (
    <button
      disabled
      type="button"
      className="flex cursor-not-allowed items-center rounded-lg px-3 py-1 text-base font-bold text-neutral-500"
    >
      {children}
    </button>
  ) : (
    <Link
      to={{ pathname: ".", search: searchParams.toString() }}
      className="flex items-center rounded-lg px-3 py-1 text-base font-bold text-neutral-400 transition hover:bg-neutral-800 hover:text-neutral-200"
      prefetch="intent"
    >
      {children}
    </Link>
  );
};

export { Pagination };
