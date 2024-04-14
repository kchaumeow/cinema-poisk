import { Box, Button, Flex, Heading, Input, Select } from "@chakra-ui/react";
import { UseFiltersResult } from "../hooks/useFilters";
import { Field } from "../types";
import { useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";

const ratings = [
  { label: "18+", value: "18" },
  { label: "16+", value: "16-17" },
  { label: "12+", value: "12-15" },
  { label: "6+", value: "6-11" },
  { label: "0+", value: "0-5" },
];

type FiltersProps = UseFiltersResult & {
  genres: Field[];
  countries: Field[];
  onClickSearch?: () => void;
};
export default function Filters({
  genre,
  country,
  year,
  ageRating,
  genres,
  countries,
  setAllFilters,
  onClickSearch,
}: FiltersProps) {
  const [filters, setFilters] = useState({ genre, country, year, ageRating });
  return (
    <Box display="flex" flexDirection="column" gap={5}>
      <Heading color="white">Фильтры</Heading>
      <Flex gap={5} alignItems="center" color="orange" flexWrap="wrap">
        <Button
          size="lg"
          px={4}
          colorScheme="red"
          variant="solid"
          onClick={() => {
            setAllFilters({});
          }}
        >
          Сбросить
        </Button>
        <Select
          w="300px"
          value={filters.genre || genre}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, genre: e.target.value }))
          }
          colorScheme="orange"
          color="orange"
        >
          <option value="">Жанр</option>
          {genres.map((genre) => (
            <option key={genre.name} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </Select>
        <Select
          w="300px"
          value={filters.country || country}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, country: e.target.value }))
          }
          colorScheme="orange"
          color="orange"
        >
          <option value="">Страна</option>
          {countries.map((country) => (
            <option key={country.name} value={country.name}>
              {country.name}
            </option>
          ))}
        </Select>
        <Select
          w="300px"
          value={filters.ageRating || ageRating}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, ageRating: e.target.value }))
          }
          colorScheme="orange"
          color="orange"
        >
          <option value={"0-18"}>Возрастной рейтинг</option>
          {ratings.map((rating) => (
            <option key={rating.value} value={rating.value}>
              {rating.label}
            </option>
          ))}
        </Select>
        <Input
          w="300px"
          placeholder="Год выхода"
          colorScheme="orange"
          type="text"
          value={filters.year}
          onChange={(e) => {
            setFilters((prev) => ({ ...prev, year: e.target.value }));
          }}
        />
        <Button
          colorScheme="orange"
          variant="solid"
          size="md"
          onClick={() => {
            setAllFilters(filters);
            onClickSearch?.();
          }}
        >
          <Search2Icon />
        </Button>
      </Flex>
    </Box>
  );
}
