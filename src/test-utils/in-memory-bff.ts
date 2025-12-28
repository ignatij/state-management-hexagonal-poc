import type { QueryClient } from "@tanstack/react-query";
import type { Bff, QuarzoDependencies } from "../bootstrap/quarzo.dependencies";
import { createAllPokemonsCacheManager } from "../cache/all-pokemons.cache";
import { createOnePokemonCacheManager } from "../cache/one-pokemon.cache";

export const buildInMemoryDependencies = (
  bff: Bff,
  queryClient: QueryClient
): QuarzoDependencies => ({
  bff,
  cache: {
    allPokemons: createAllPokemonsCacheManager(queryClient),
    onePokemon: createOnePokemonCacheManager(queryClient),
  },
});
