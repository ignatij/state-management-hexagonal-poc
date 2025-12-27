import { usePokemonsList } from "./usePokemonsList";

export const PokemonsList = () => {
  const {
    state: { error, isLoading, pokemons },
    actions: { load },
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
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
