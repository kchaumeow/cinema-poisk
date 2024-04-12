import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

export type UsePaginationResult = {
  page: number;
  limit: string;
  setPage: (page: number) => void;
  setLimit: (limit: string) => void;
};

export function usePagination(): UsePaginationResult {
  const [searchParams, setSearchParams] = useSearchParams();
  const page: number = parseInt(searchParams.get("page") || "1");
  const limit: string = searchParams.get("limit") || "10";
  const setPage = useCallback(
    (page: number) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("page", page.toString());
      setSearchParams(newSearchParams);
    },
    [setSearchParams],
  );
  const setLimit = useCallback(
    (limit: string) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("limit", limit);
      setSearchParams(newSearchParams);
    },
    [setSearchParams],
  );

  return { page, limit, setPage, setLimit };
}
