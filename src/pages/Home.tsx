import CinemaList from "../components/CinemaList";
import { useGetAllCinemasQuery } from "../features/api/cinemasSlice";
import { Spinner } from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  // const cinemas = [
  //   {
  //     rating: {
  //       kp: 8.823,
  //       imdb: 8.5,
  //       filmCritics: 6.8,
  //       russianFilmCritics: 100,
  //       await: null,
  //     },
  //     id: 535341,
  //     name: "1+1",
  //     poster: {
  //       url: "https://image.openmoviedb.com/kinopoisk-images/1946459/bf93b465-1189-4155-9dd1-cb9fb5cb1bb5/orig",
  //       previewUrl:
  //         "https://image.openmoviedb.com/kinopoisk-images/1946459/bf93b465-1189-4155-9dd1-cb9fb5cb1bb5/x1000",
  //     },
  //     logo: {
  //       url: "https://avatars.mds.yandex.net/get-ott/1531675/2a0000017f0262661cde61dc260cb86f7830/orig",
  //     },
  //   },
  //   {
  //     rating: {
  //       kp: 8.567,
  //       imdb: 7.8,
  //       filmCritics: 6.5,
  //       russianFilmCritics: 85.7143,
  //       await: null,
  //     },
  //     id: 1143242,
  //     name: "Джентльмены",
  //     poster: {
  //       url: "https://image.openmoviedb.com/kinopoisk-images/1599028/637271d5-61b4-4e46-ac83-6d07494c7645/orig",
  //       previewUrl:
  //         "https://image.openmoviedb.com/kinopoisk-images/1599028/637271d5-61b4-4e46-ac83-6d07494c7645/x1000",
  //     },
  //     logo: {
  //       url: "https://avatars.mds.yandex.net/get-ott/1534341/2a00000176f18064fd95abb74cbcc02873b8/orig",
  //     },
  //   },
  //   {
  //     rating: {
  //       kp: 8.011,
  //       imdb: 8.2,
  //       filmCritics: 7.8,
  //       russianFilmCritics: 77.4194,
  //       await: null,
  //     },
  //     id: 462682,
  //     name: "Волк с Уолл-стрит",
  //     poster: {
  //       url: "https://image.openmoviedb.com/kinopoisk-images/1946459/5c758ac0-7a5c-4f00-a94f-1be680a312fb/orig",
  //       previewUrl:
  //         "https://image.openmoviedb.com/kinopoisk-images/1946459/5c758ac0-7a5c-4f00-a94f-1be680a312fb/x1000",
  //     },
  //     logo: {
  //       url: "https://avatars.mds.yandex.net/get-ott/1534341/2a00000178c64fe43f3b567acaaa73e861f0/orig",
  //     },
  //   },
  //   {
  //     id: 41519,
  //     name: "Брат",
  //     rating: {
  //       kp: 8.312,
  //       imdb: 7.8,
  //       filmCritics: 7.6,
  //       russianFilmCritics: 0,
  //       await: null,
  //     },
  //     poster: {
  //       url: "https://image.openmoviedb.com/kinopoisk-images/1704946/e9008e2f-433f-43b0-b9b8-2ea8e3fb6c9b/orig",
  //       previewUrl:
  //         "https://image.openmoviedb.com/kinopoisk-images/1704946/e9008e2f-433f-43b0-b9b8-2ea8e3fb6c9b/x1000",
  //     },
  //     logo: {
  //       url: "https://avatars.mds.yandex.net/get-ott/2439731/2a0000017c61da4f185f94d808f4d90182a8/orig",
  //     },
  //   },
  //   {
  //     rating: {
  //       kp: 7.613,
  //       imdb: 7.1,
  //       filmCritics: 6.3,
  //       russianFilmCritics: 72.2222,
  //       await: null,
  //     },
  //     id: 1318972,
  //     name: "Гнев человеческий",
  //     poster: {
  //       url: "https://image.openmoviedb.com/kinopoisk-images/6201401/90d57813-387c-44c4-81c1-ecddb3c417a5/orig",
  //       previewUrl:
  //         "https://image.openmoviedb.com/kinopoisk-images/6201401/90d57813-387c-44c4-81c1-ecddb3c417a5/x1000",
  //     },
  //     logo: {
  //       url: "https://avatars.mds.yandex.net/get-ott/223007/2a00000179d1cc14e6c741017c7f7a2f15c2/orig",
  //     },
  //   },
  //   {
  //     rating: {
  //       kp: 8.277,
  //       imdb: 7.7,
  //       filmCritics: 5.9,
  //       russianFilmCritics: 0,
  //       await: null,
  //     },
  //     id: 8124,
  //     name: "Один дома",
  //     poster: {
  //       url: "https://image.openmoviedb.com/kinopoisk-images/6201401/022a58e3-5b9b-411b-bfb3-09fedb700401/orig",
  //       previewUrl:
  //         "https://image.openmoviedb.com/kinopoisk-images/6201401/022a58e3-5b9b-411b-bfb3-09fedb700401/x1000",
  //     },
  //     logo: {
  //       url: "https://avatars.mds.yandex.net/get-ott/212840/2a00000172550ce8255397b4e3d6f9938ddf/orig",
  //     },
  //   },
  //   {
  //     rating: {
  //       kp: 7.975,
  //       imdb: 7.9,
  //       filmCritics: 7.5,
  //       russianFilmCritics: 75,
  //       await: null,
  //     },
  //     id: 251733,
  //     name: "Аватар",
  //     poster: {
  //       url: "https://image.openmoviedb.com/kinopoisk-images/1599028/4adf61aa-3cb7-4381-9245-523971e5b4c8/orig",
  //       previewUrl:
  //         "https://image.openmoviedb.com/kinopoisk-images/1599028/4adf61aa-3cb7-4381-9245-523971e5b4c8/x1000",
  //     },
  //     logo: {
  //       url: "https://avatars.mds.yandex.net/get-ott/2385704/2a00000176f1bb64212c9df414a8909c8f44/orig",
  //     },
  //   },
  //   {
  //     id: 4959134,
  //     name: "По щучьему велению",
  //     poster: {
  //       url: "https://image.openmoviedb.com/kinopoisk-images/10900341/b3ed4aa7-c38c-4a35-a505-aaa6372ad9da/orig",
  //       previewUrl:
  //         "https://image.openmoviedb.com/kinopoisk-images/10900341/b3ed4aa7-c38c-4a35-a505-aaa6372ad9da/x1000",
  //     },
  //     rating: {
  //       kp: 7.784,
  //       imdb: 6.3,
  //       filmCritics: 0,
  //       russianFilmCritics: 0,
  //       await: null,
  //     },
  //     logo: {
  //       url: null,
  //     },
  //   },
  //   {
  //     rating: {
  //       kp: 8.11,
  //       imdb: 7.9,
  //       filmCritics: 8.3,
  //       russianFilmCritics: 89.4737,
  //       await: null,
  //     },
  //     id: 1188529,
  //     name: "Достать ножи",
  //     poster: {
  //       url: "https://image.openmoviedb.com/kinopoisk-images/1777765/bb8afbd6-c9cd-4631-99e9-3fecf241dbaf/orig",
  //       previewUrl:
  //         "https://image.openmoviedb.com/kinopoisk-images/1777765/bb8afbd6-c9cd-4631-99e9-3fecf241dbaf/x1000",
  //     },
  //     logo: {
  //       url: "https://avatars.mds.yandex.net/get-ott/2385704/2a00000176f1c6464b62d464e2e9ddd8dbb6/orig",
  //     },
  //   },
  //   {
  //     id: 42664,
  //     name: "Иван Васильевич меняет профессию",
  //     rating: {
  //       kp: 8.787,
  //       imdb: 8.2,
  //       filmCritics: 0,
  //       russianFilmCritics: 0,
  //       await: null,
  //     },
  //     poster: {
  //       url: "https://image.openmoviedb.com/kinopoisk-images/6201401/a7ef44b8-1983-4992-a889-da6f87a3f559/orig",
  //       previewUrl:
  //         "https://image.openmoviedb.com/kinopoisk-images/6201401/a7ef44b8-1983-4992-a889-da6f87a3f559/x1000",
  //     },
  //     logo: {
  //       url: "https://avatars.mds.yandex.net/get-ott/2439731/2a000001720d0315b85f00ffcf4f8472e93a/orig",
  //     },
  //   },
  // ];
  const [page, setPage] = useState(3);
  const {
    data: cinemas,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetAllCinemasQuery({
    page,
    selectFields: ["id", "name", "logo", "rating", "poster"],
    limit: 5,
  });
  if (isLoading)
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="orange.300"
        marginTop="200px"
        w={100}
        h={100}
      />
    );
  return (
    <>
      {isError && JSON.stringify(error)}
      {isSuccess && <CinemaList cinemas={cinemas.docs} />}
    </>
  );
}
