import type { QuarzoDependencies } from "./quarzo.dependencies";
import type { QueryClient } from "@tanstack/react-query";
import { createCacheManager } from "../cache/cache-manager";
import { inMemoryBff } from "../api/inMemoryBff";
import { bff } from "../api/bff";

export const buildQuarzoDependencies = (
  queryClient: QueryClient
): QuarzoDependencies => ({
  bff: bff(),
  cache: createCacheManager(queryClient),
});

export const buildInMemoryDependencies = (
  queryClient: QueryClient
): QuarzoDependencies => ({
  bff: {
    getPokemons: inMemoryBff.getPokemons({
      feedWithPokemons: [
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      ],
    }),
    createPokemon: inMemoryBff.createPokemon({}),
  },
  cache: createCacheManager(queryClient),
});
