import { Box, Button, Flex, Heading, Input, Select } from "@chakra-ui/react";
import { UseFiltersResult } from "../hooks/useFilters";
import { Field } from "../types";
import { useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";

const ratings = [
  { label: "18+", value: "18" },
  { label: "12+", value: "12-17" },
  { label: "6+", value: "6-12" },
  { label: "0+", value: "0-6" },
];

type FiltersProps = UseFiltersResult & {
  genres: Field[];
  countries: Field[];
};
export default function Filters({
  genre,
  country,
  year,
  ageRating,
  genres,
  countries,
  setAllFilters,
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
          variant="outline"
          onClick={() => {
            setAllFilters({});
          }}
        >
          Стереть
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
          <option value={undefined}>Жанр</option>
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
          <option value={undefined}>Страна</option>
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
          <option value={undefined}>Возрастной рейтинг</option>
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
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, year: e.target.value }))
          }
        />
        <Button
          colorScheme="orange"
          variant="solid"
          size="md"
          onClick={() => {
            console.log(filters);
            setAllFilters(filters);
          }}
        >
          <Search2Icon />
        </Button>
      </Flex>
    </Box>
  );
}
