import type { Pokemon } from "../../../entities/pokemon";
import type { CreatePokemonGatewayPort } from "../../../core/ports/create-pokemon.gateway.port";
import type { ProtoPokemon } from "../../../ui/CreatePokemon/CreatePokemon";

export const createPokemonGateway = (): CreatePokemonGatewayPort => ({
  createPokemon: async (request: ProtoPokemon): Promise<Pokemon> => {
    // Note: Commented this call since the endpoint does not exist
    // const response = await fetch('https://pokeapi.co/api/v2/pokemon', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(request),
    // });

    const response = JSON.stringify({
      name: request.name,
      url: request.url,
    });

    return new Promise((resolve) => {
      setTimeout(() => resolve(JSON.parse(response)), 2000);
    });
  },
});
