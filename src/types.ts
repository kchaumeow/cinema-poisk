export interface CinemaSmall {
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

export interface Cinema extends CinemaSmall {
  description: string | null;
  year: number;
  genres: {
    name: string;
  }[];
  persons: Person[];
  networks: null | [];
}

export type Person = {
  id: number;
  photo: string;
  name: string;
  description: string;
  profession: string;
};
