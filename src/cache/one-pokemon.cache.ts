import type { QueryClient } from "@tanstack/react-query";
import type { OnePokemon } from "../ui/components/OnePokemon/OnePokemon";
import type { CacheManager } from "./cache-manager";

type OnePokemonState = {
  data: OnePokemon | undefined;
  isLoading: boolean;
  error: Error | null;
};

export type OnePokemonCacheManager = CacheManager<
  (id: number) => ["one-pokemon", number],
  {
    addPokemon: (pokemon: OnePokemon) => Promise<void>;
    getPokemon: (pokemonId: number) => OnePokemonState;
  }
>;

export const createOnePokemonCacheManager = (
  queryClient: QueryClient
): OnePokemonCacheManager => {
  const queryKey = (id: number): ["one-pokemon", number] => ["one-pokemon", id];

  return {
    queryKey,

    addPokemon: async (pokemon) => {
      queryClient.setQueryData<OnePokemon>(queryKey(pokemon.id), (oldData) => {
        if (oldData) {
          return oldData;
        }
        return pokemon;
      });
    },
    getPokemon: (pokemonId: number): OnePokemonState => {
      const queryState = queryClient.getQueryState(queryKey(pokemonId));
      const data = queryState?.data as OnePokemonState["data"];

      return {
        data,
        isLoading: queryState?.fetchStatus === "fetching",
        error: (queryState?.error as Error | null) ?? null,
      };
    },
  };
};
