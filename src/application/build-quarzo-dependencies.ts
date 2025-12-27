import type { QuarzoDependencies } from "../core/quarzo.dependencies";
import type { QueryClient } from "@tanstack/react-query";
import { createReactQueryStateManager } from "../adapters/secondary/ui-state/react-query-state-manager.adapter";
import { bff } from "../adapters/secondary/pokemons/bff";
import { inMemoryBff } from "../adapters/secondary/pokemons/inMemoryBff";

export const buildQuarzoDependencies = (
  queryClient: QueryClient
): QuarzoDependencies => ({
  bff: bff(),
  stateManager: createReactQueryStateManager(queryClient),
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
  stateManager: createReactQueryStateManager(queryClient),
});
