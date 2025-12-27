import CreatePokemon from "./CreatePokemon/CreatePokemon";
import { usePokemonsList } from "./useAllPokemons";

export type AllPokemonsItem = {
  id: number;
  name: string;
  url: string;
};

export type AllPokemons = AllPokemonsItem[];

export type State = {
  pokemons: AllPokemons;
  isLoading: boolean;
  error: string | null;
};

export type Actions = {
  load: () => void;
  select: (pokemonId: number) => void;
};

const Component = () => {
  const {
    state: { error, isLoading, pokemons },
    actions: { load, select },
  } = usePokemonsList();

  return (
    <div>
      <h3>Pokemons list</h3>
      <button onClick={load}>Get Pokemons</button>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {pokemons.length > 0 && (
        <ul>
          {pokemons.map((pokemon) => (
            <li
              key={pokemon.name}
              onClick={() => {
                select(pokemon.id);
              }}
            >
              {`${pokemon.id}: ${pokemon.name}`}
            </li>
          ))}
        </ul>
      )}

      <CreatePokemon />
    </div>
  );
};

export default Component;
