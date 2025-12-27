import type { CreatePokemonGatewayPort } from "../../../core/ports/create-pokemon.gateway.port";
import type { AllPokemonsItem } from "../../../ui/components/AllPokemons/AllPokemons";
import type { ProtoPokemon } from "../../../ui/components/AllPokemons/CreatePokemon/CreatePokemon";

export const createPokemonGateway = (): CreatePokemonGatewayPort => ({
  createPokemon: async (request: ProtoPokemon): Promise<AllPokemonsItem> => {
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
