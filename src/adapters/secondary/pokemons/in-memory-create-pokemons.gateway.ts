import type { CreatePokemonGatewayPort } from "../../../core/ports/create-pokemon.gateway.port";
import type { AllPokemonsItem } from "../../../ui/components/AllPokemons/AllPokemons";
import type { ProtoPokemon } from "../../../ui/components/AllPokemons/CreatePokemon/CreatePokemon";

export const inMemoryCreatePokemonGateway = ({
  feedWithError,
}: {
  feedWithError?: string;
}): CreatePokemonGatewayPort => {
  const error: string | null = feedWithError ?? null;

  return {
    createPokemon: async (pokemon: ProtoPokemon): Promise<AllPokemonsItem> => {
      if (error) {
        throw new Error(error);
      }

      return Promise.resolve(pokemon);
    },
  };
};
