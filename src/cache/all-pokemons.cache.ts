import type { QueryClient } from "@tanstack/react-query";
import type {
  AllPokemons,
  AllPokemonsItem,
} from "../ui/components/AllPokemons/AllPokemons";

type AllPokemonsState = {
  data: AllPokemons | undefined;
  isLoading: boolean;
  error: Error | null;
};

export type AllPokemonsCacheManager = {
  getAllPokemons: () => AllPokemonsState;
  addPokemon: (pokemon: AllPokemonsItem) => Promise<void>;
  removePokemon: (pokemonName: string) => Promise<void>;
  updatePokemon: (pokemon: AllPokemonsItem) => Promise<void>;
};

export const createAllPokemonsCacheManager = (
  queryClient: QueryClient
): AllPokemonsCacheManager => {
  const queryKey = ["all-pokemons"] as const;

  return {
    getAllPokemons: (): AllPokemonsState => {
      const queryState = queryClient.getQueryState(queryKey);
      const data = queryState?.data as AllPokemonsState["data"];

      return {
        data,
        isLoading: queryState?.fetchStatus === "fetching",
        error: (queryState?.error as Error | null) ?? null,
      };
    },

    addPokemon: async (pokemon) => {
      // Optimistically update the cache
      queryClient.setQueryData<AllPokemons>(queryKey, (oldData) => {
        if (!oldData) return [pokemon];
        // Check if pokemon already exists
        if (oldData.some((p) => p.name === pokemon.name)) {
          return oldData;
        }
        return [...oldData, pokemon];
      });
    },

    removePokemon: async (pokemonName) => {
      queryClient.setQueryData<AllPokemons>(queryKey, (oldData) => {
        if (!oldData) return [];
        return oldData.filter((p) => p.name !== pokemonName);
      });
    },

    updatePokemon: async (pokemon) => {
      queryClient.setQueryData<AllPokemons>(queryKey, (oldData) => {
        if (!oldData) return [];
        return oldData.map((p) => (p.name === pokemon.name ? pokemon : p));
      });
    },
  };
};
