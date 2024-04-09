import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cinemasApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.kinopoisk.dev/v1.4/movie",
    credentials: "same-origin",
    prepareHeaders: (headers) => {
      headers.set("X-API-KEY", process.env.TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCinemas: builder.query({
      query: (args) => {
        let params = new URLSearchParams();
        for (let arg of args.selectFields) params.append("selectFields", arg);
        params.append("page", args.page);
        params.append("limit", args.limit);
        return {
          url: "",
          params,
        };
      },
    }),
    getCinemaById: builder.query({
      query: (arg) => {
        return {
          url: `/${arg}`,
        };
      },
    }),
  }),
  reducerPath: "api",
});

export const { useGetAllCinemasQuery, useGetCinemaByIdQuery } = cinemasApi;
