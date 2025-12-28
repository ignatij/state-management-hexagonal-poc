import type { QueryClient } from "@tanstack/react-query";
import { createAllPokemonsCacheManager } from "../cache/all-pokemons.cache";
import type { QuarzoDependencies } from "../bootstrap/quarzo.dependencies";
import { createOnePokemonCacheManager } from "../cache/one-pokemon.cache";
import { bff } from "../api/bff";

export const buildQuarzoDependencies = (
  queryClient: QueryClient
): QuarzoDependencies => ({
  bff: bff(),
  cache: {
    allPokemons: createAllPokemonsCacheManager(queryClient),
    onePokemon: createOnePokemonCacheManager(queryClient),
  },
});
