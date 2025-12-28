import type { Bff } from "../bootstrap/quarzo.dependencies";
import { vi } from "vitest";
import type { AllPokemons } from "../ui/components/AllPokemons/AllPokemons";
import type { OnePokemon } from "../ui/components/OnePokemon/OnePokemon";
import type { ProtoPokemon } from "../ui/components/AllPokemons/CreatePokemon/CreatePokemon";

type GetAllPokemonsOptions = {
  feedWithPokemons?: AllPokemons;
  failWithError?: Error;
};

type GetOnePokemonOptions = {
  feedWithPokemons?: OnePokemon[];
};

type CreatePokemonOptions = {
  feedWithError?: string;
};

export const buildInMemoryBff = (partialBff: Partial<Bff> = {}) => {
  const bff: Bff = {
    getAllPokemons: vi.fn(),
    getOnePokemon: vi.fn(),
    createPokemon: vi.fn(),
    ...partialBff,
  };

  return {
    withGetAllPokemons: (options: GetAllPokemonsOptions) => {
      const { feedWithPokemons = [], failWithError } = options;

      const getAllPokemons = () => {
        if (failWithError) {
          return Promise.reject(failWithError);
        }

        return Promise.resolve(feedWithPokemons);
      };

      return buildInMemoryBff({ getAllPokemons });
    },

    withGetOnePokemon: (options: GetOnePokemonOptions) => {
      const { feedWithPokemons = [] } = options;

      const getOnePokemon = (pokemonId: number) => {
        const result = feedWithPokemons.find(
          (pokemon) => pokemon.id === pokemonId
        );

        if (!result) {
          return Promise.reject(`There is no Pokemon with id=${pokemonId}`);
        }

        return Promise.resolve(result);
      };

      return buildInMemoryBff({ getOnePokemon });
    },

    withCreatePokemon: (options: CreatePokemonOptions) => {
      const { feedWithError } = options;

      const error: string | null = feedWithError ?? null;

      const createPokemon = (pokemon: ProtoPokemon) => {
        if (error) {
          return Promise.reject(error);
        }

        return Promise.resolve(pokemon);
      };

      return buildInMemoryBff({ createPokemon });
    },

    build: () => bff,
  };
};
