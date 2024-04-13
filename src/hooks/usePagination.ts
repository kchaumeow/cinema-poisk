import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

export type UsePaginationResult = {
  page: number;
  limit: string;
  setPage: (page: number) => void;
  setLimit: (limit: string) => void;
};

export function usePagination(prefix: string): UsePaginationResult {
  const [searchParams, setSearchParams] = useSearchParams();
  const page: number = parseInt(searchParams.get(prefix + "page") || "1");
  const limit: string = searchParams.get(prefix + "limit") || "10";
  const setPage = useCallback(
    (page: number) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(prefix + "page", page.toString());
      setSearchParams(newSearchParams);
    },
    [setSearchParams],
  );
  const setLimit = useCallback(
    (limit: string) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(prefix + "limit", limit);
      setSearchParams(newSearchParams);
    },
    [setSearchParams],
  );

  return { page, limit, setPage, setLimit };
}
