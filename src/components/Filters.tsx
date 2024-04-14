import { Box, Button, Flex, Heading, Input, Select } from "@chakra-ui/react";
import { useFilters } from "../hooks/useFilters";
import { Field } from "../types";
import { Search2Icon } from "@chakra-ui/icons";

const ratings = [
  { label: "18+", value: "18" },
  { label: "16+", value: "16-17" },
  { label: "12+", value: "12-15" },
  { label: "6+", value: "6-11" },
  { label: "0+", value: "0-5" },
];

type FiltersProps = {
  genres: Field[];
  countries: Field[];
  onClickSearch: () => void;
};
export default function Filters({
  genres,
  countries,
  onClickSearch,
}: FiltersProps) {
  const { filters, setAllFilters, resetFilters } = useFilters();
  const { genre, country, year, ageRating } = filters;

  return (
    <Box display="flex" flexDirection="column" gap={5}>
      <Heading color="white">Фильтры</Heading>
      <Flex gap={5} alignItems="center" color="orange" flexWrap="wrap">
        <Button
          size="lg"
          px={4}
          colorScheme="red"
          variant="solid"
          onClick={resetFilters}
        >
          Сбросить
        </Button>
        <Select
          w="300px"
          value={genre}
          onChange={(e) =>
            setAllFilters({ country, genre: e.target.value, year, ageRating })
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
          value={country}
          onChange={(e) =>
            setAllFilters({ country: e.target.value, genre, year, ageRating })
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
          value={ageRating}
          onChange={(e) =>
            setAllFilters({ country, genre, year, ageRating: e.target.value })
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
          value={year}
          onChange={(e) => {
            setAllFilters({ country, genre, year: e.target.value, ageRating });
          }}
        />
        <Button
          colorScheme="orange"
          variant="solid"
          size="md"
          onClick={() => {
            onClickSearch();
          }}
        >
          <Search2Icon />
        </Button>
      </Flex>
    </Box>
  );
}
