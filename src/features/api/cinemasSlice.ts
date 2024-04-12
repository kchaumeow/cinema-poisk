import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CinemaDetails, Field } from "../../types";

export const cinemasApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.kinopoisk.dev",
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
        if (args.filters.genre)
          params.append("genres.name", args.filters.genre);
        if (args.filters.country)
          params.append("countries.name", args.filters.country);
        if (args.filters.year) params.append("year", args.filters.year);
        if (args.filters.ageRating)
          params.append("ageRating", args.filters.ageRating);
        return {
          url: "/v1.4/movie",
          params,
        };
      },
    }),
    getCinemaById: builder.query<CinemaDetails, string>({
      query: (arg) => {
        return {
          url: `/v1.4/movie/${arg}`,
        };
      },
    }),
    getCinemaPostersById: builder.query({
      query: (arg) => {
        return {
          url: `/v1.4/image`,
          params: {
            movieId: arg,
          },
        };
      },
    }),
    getGenres: builder.query<Field[], string>({
      query: () => {
        return {
          url: `/v1/movie/possible-values-by-field`,
          params: {
            field: "genres.name",
          },
        };
      },
      keepUnusedDataFor: 86400,
    }),
    getCountries: builder.query<Field[], string>({
      query: () => {
        return {
          url: `/v1/movie/possible-values-by-field`,
          params: {
            field: "countries.name",
          },
        };
      },
      keepUnusedDataFor: 86400,
    }),
  }),
  reducerPath: "api",
});

export const {
  useGetAllCinemasQuery,
  useGetCinemaByIdQuery,
  useGetCinemaPostersByIdQuery,
  useGetGenresQuery,
  useGetCountriesQuery,
} = cinemasApi;
