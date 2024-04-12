export interface Cinema {
  name: string;
  id: number;
  rating: {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
  };
  poster: {
    url: string;
    previewUrl: string;
  };
  logo: {
    url: string | null;
  };
}

export interface CinemaDetails extends Cinema {
  description: string | null;
  year: number;
  genres: {
    name: string;
  }[];
  persons: Person[];
  networks: null | [];
  similarMovies: SimilarMovie[];
}

export type Person = {
  id: number;
  photo: string;
  name: string;
  description: string;
  profession: string;
};

export type Field = {
  name: string;
  slug: string;
};

export type SimilarMovie = {
  id: number;
  name: string;
  enName: string | null;
  alternativeName: string | null;
  type: string;
  poster: {
    url: string;
    previewUrl: string;
  };
};
