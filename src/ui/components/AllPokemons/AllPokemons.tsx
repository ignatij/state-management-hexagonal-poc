import ErrorResult from "../../../utils/ErrorResult";
import PendingResult from "../../../utils/PendingResult";
import {
  isError,
  isPending,
  isSuccess,
  type Result,
} from "../../../utils/Result";
import CreatePokemon from "./CreatePokemon/CreatePokemon";
import { useAllPokemons } from "./useAllPokemons";

export type AllPokemonsItem = {
  id: number;
  name: string;
  url: string;
};

export type AllPokemons = AllPokemonsItem[];

export type State = Result<AllPokemons, AllPokemons, string>;

export type Actions = {
  select: (pokemonId: number) => void;
};

const Component = () => {
  const {
    state,
    actions: { select },
  } = useAllPokemons();

  return (
    <div>
      <h3>Pokemons list</h3>
      {isPending(state) && <PendingResult />}
      {isError(state) && <ErrorResult>{state.error}</ErrorResult>}
      {isSuccess(state) && (
        <ul>
          {state.value.map((pokemon) => (
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
