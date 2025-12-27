import type { Pokemon } from "../../../entities/pokemon";
import type { ProtoPokemon } from "../../../ui/CreatePokemon/CreatePokemon";

type GetPokemonsOptions = {
  feedWithPokemons?: { name: string; url: string }[];
  failWithError?: Error;
};

type CreatePokemonOptions = {
  feedWithError?: string;
};

export const inMemoryBff = {
  getPokemons: (options: GetPokemonsOptions = {}) => {
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

    return async (request: ProtoPokemon): Promise<Pokemon> => {
      if (error) {
        throw new Error(error);
      }

      return Promise.resolve({
        name: request.name,
        url: request.url,
      });
    };
  },
};
