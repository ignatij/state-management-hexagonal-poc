import type { QueryClient } from "@tanstack/react-query";
import type { OnePokemon } from "../ui/components/OnePokemon/OnePokemon";

type OnePokemonState = {
  data: OnePokemon | undefined;
  isLoading: boolean;
  error: Error | null;
};

export type OnePokemonCacheManager = {
  addPokemon: (pokemon: OnePokemon) => Promise<void>;
  getPokemon: (pokemonId: number) => OnePokemonState;
};

export const onePokemonQueryKey = (id: number): ["one-pokemon", number] => [
  "one-pokemon",
  id,
];

export const createOnePokemonCacheManager = (
  queryClient: QueryClient
): OnePokemonCacheManager => {
  return {
    addPokemon: async (pokemon) => {
      queryClient.setQueryData<OnePokemon>(
        onePokemonQueryKey(pokemon.id),
        (oldData) => {
          if (oldData) {
            return oldData;
          }
          return pokemon;
        }
      );
    },
    getPokemon: (pokemonId: number): OnePokemonState => {
      const queryState = queryClient.getQueryState(
        onePokemonQueryKey(pokemonId)
      );
      const data = queryState?.data as OnePokemonState["data"];

      return {
        data,
        isLoading: queryState?.fetchStatus === "fetching",
        error: (queryState?.error as Error | null) ?? null,
      };
    },
  };
};
