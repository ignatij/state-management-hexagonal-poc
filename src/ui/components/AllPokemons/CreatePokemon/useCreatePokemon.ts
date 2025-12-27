import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQuarzoDependencies } from "../../../../bootstrap/use-quarzo-dependencies";
import type { UiContract } from "../../../ui-contract";
import type { State, Actions, ProtoPokemon } from "./CreatePokemon";
import { error, pending, success } from "../../../../utils/Result";

export const useCreatePokemon = (): UiContract<State, Actions> => {
  const { bff, cache } = useQuarzoDependencies();

  // Mutation for creating pokemon with optimistic update
  const createPokemonMutation = useMutation({
    mutationFn: (pokemon: ProtoPokemon) => bff.createPokemon(pokemon),

    // Optimistic update: update cache immediately
    onMutate: async (newPokemon) => {
      // Optimistically add to cache
      cache.allPokemons.addPokemon(newPokemon);
      return { previousPokemons: cache.allPokemons.getAllPokemons().data };
    },

    // In case mutation fails
    onError: (error, newPokemon, context) => {
      console.error(error, newPokemon, context);
    },

    // Note: We could update the state here and not on "onMutate"
    onSuccess: () => {
      // void refetch();
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
