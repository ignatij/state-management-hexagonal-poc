/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useOnePokemon } from "./useOnePokemon";

export type OnePokemon = {
  id: number;
  weight: number;
};

export type State = {
  pokemon: OnePokemon | undefined;
  isLoading: boolean;
  error: string | null;
};

export type Actions = {};

const Component = () => {
  const {
    state: { pokemon, isLoading },
  } = useOnePokemon();
  if (isLoading) {
    return <div>Loading…</div>;
  }

  const { id, weight } = pokemon!; // todo

  return (
    <div>
      <h3>Detail view</h3>
      <div>Id: {id}</div>
      <div>Weight: {weight}</div>
    </div>
  );
};

export default Component;
