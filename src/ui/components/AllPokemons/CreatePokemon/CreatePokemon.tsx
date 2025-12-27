import ErrorResult from "../../../../utils/ErrorResult";
import PendingResult from "../../../../utils/PendingResult";
import { isError, isPending, type Result } from "../../../../utils/Result";
import { useCreatePokemon } from "./useCreatePokemon";
import { useCallback } from "react";

export type ProtoPokemon = {
  id: number;
  name: string;
  url: string;
};

export type State = Result<undefined, undefined, string>;

export type Actions = {
  addPokemon: (pokemon: ProtoPokemon) => void;
};

const Component = () => {
  const {
    state,
    actions: { addPokemon },
  } = useCreatePokemon();

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
      const id = 111111;
      const name = formData.get("name") as string;
      const url = formData.get("url") as string;
      addPokemon({ id, name, url });
    },
    [addPokemon]
  );

  return (
    <div>
      <h3>Create Pokemon form</h3>
      {isPending(state) && <PendingResult>Creating the Pokemon…</PendingResult>}
      {isError(state) && <ErrorResult>{state.error}</ErrorResult>}
      <form onSubmit={onSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="url" placeholder="URL" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Component;
