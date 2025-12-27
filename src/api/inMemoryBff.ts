import type {
  AllPokemons,
  AllPokemonsItem,
} from "../ui/components/AllPokemons/AllPokemons";
import type { ProtoPokemon } from "../ui/components/AllPokemons/CreatePokemon/CreatePokemon";

type GetPokemonsOptions = {
  feedWithPokemons?: AllPokemons;
  failWithError?: Error;
};

type CreatePokemonOptions = {
  feedWithError?: string;
};

export const inMemoryBff = {
  getAllPokemons: (options: GetPokemonsOptions = {}) => {
    const { feedWithPokemons = [], failWithError } = options;

    return async () => {
      if (failWithError) {
        throw failWithError;
      }

      return feedWithPokemons;
    };
  },
  createPokemon: ({ feedWithError }: CreatePokemonOptions = {}) => {
    const error: string | null = feedWithError ?? null;

    return async (pokemon: ProtoPokemon): Promise<AllPokemonsItem> => {
      if (error) {
        throw new Error(error);
      }

      return Promise.resolve(pokemon);
    };
  },
};
