import type { Pokemon } from "../../../entities/pokemon";
import type { CreatePokemonGatewayPort } from "../../../core/ports/create-pokemon.gateway.port";
import type { ProtoPokemon } from "../../../ui/CreatePokemon/CreatePokemon";

export const inMemoryCreatePokemonGateway = ({
  feedWithError,
}: {
  feedWithError?: string;
}): CreatePokemonGatewayPort => {
  const error: string | null = feedWithError ?? null;

  return {
    createPokemon: async (request: ProtoPokemon): Promise<Pokemon> => {
      if (error) {
        throw new Error(error);
      }

      return Promise.resolve({
        name: request.name,
        url: request.url,
      });
    },
  };
};
