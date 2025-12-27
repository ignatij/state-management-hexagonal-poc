import type { QuarzoDependencies } from "./quarzo.dependencies";
import type { QueryClient } from "@tanstack/react-query";
import { createAllPokemonsCacheManager } from "../cache/all-pokemons.cache";
import { inMemoryBff } from "../api/inMemoryBff";
import { bff } from "../api/bff";
import { createOnePokemonCacheManager } from "../cache/one-pokemon.cache";

export const buildQuarzoDependencies = (
  queryClient: QueryClient
): QuarzoDependencies => ({
  bff: bff(),
  cache: {
    allPokemons: createAllPokemonsCacheManager(queryClient),
    onePokemon: createOnePokemonCacheManager(queryClient),
  },
});

export const buildInMemoryDependencies = (
  queryClient: QueryClient
): QuarzoDependencies => ({
  bff: {
    getAllPokemons: inMemoryBff.getAllPokemons({
      feedWithPokemons: [
        {
          id: 0,
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        },
      ],
    }),
    createPokemon: inMemoryBff.createPokemon({}),
  },
  cache: createAllPokemonsCacheManager(queryClient),
});
