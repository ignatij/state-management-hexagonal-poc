import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuarzoDependencies } from "../../../../bootstrap/use-quarzo-dependencies";
import type { UiContract } from "../../../ui-contract";
import type { State, Actions, ProtoPokemon } from "./CreatePokemon";
import { error, pending, success } from "../../../../utils/Result";
import { queryKey } from "../../../../cache/all-pokemons.cache";

export const useCreatePokemon = (): UiContract<State, Actions> => {
  const { bff } = useQuarzoDependencies();
  const queryClient = useQueryClient();

  const createPokemonMutation = useMutation({
    mutationFn: (pokemon: ProtoPokemon) => bff.createPokemon(pokemon),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey() });
    },
  });

  const addPokemon = useCallback(
    (pokemon: ProtoPokemon) => {
      createPokemonMutation.mutate(pokemon);
    },
    [createPokemonMutation]
  );

  return {
    state: (() => {
      if (createPokemonMutation.isPending) {
        return pending(undefined);
      }
      if (createPokemonMutation.error) {
        return error(createPokemonMutation.error?.message);
      }
      return success(undefined);
    })(),
    actions: {
      addPokemon,
    },
  };
};
