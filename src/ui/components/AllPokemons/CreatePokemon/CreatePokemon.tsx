import { useCreatePokemon } from "./useCreatePokemon";
import { useCallback } from "react";

export type ProtoPokemon = {
  id: number;
  name: string;
  url: string;
};

export type State = {
  isCreating: boolean;
  error: string | null;
};

export type Actions = {
  addPokemon: (pokemon: ProtoPokemon) => void;
};

const Component = () => {
  const {
    state: { isCreating, error },
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
      <form onSubmit={onSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="url" placeholder="URL" />
        <button type="submit">Create</button>
      </form>
      {error && <p>{error}</p>}
      {isCreating && <p>Creating the Pokemon...</p>}
    </div>
  );
};

export default Component;
