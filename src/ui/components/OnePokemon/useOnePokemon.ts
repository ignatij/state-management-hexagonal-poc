import { useQuery } from "@tanstack/react-query";
import { useQuarzoDependencies } from "../../../bootstrap/use-quarzo-dependencies";
import type { UiContract } from "../../ui-contract";
import type { Actions, State } from "./OnePokemon";
import { useSelection } from "../../../state/selection";
import { onePokemonQueryKey } from "../../../cache/one-pokemon.cache";
import { error, pending, success } from "../../../utils/Result";

export const useOnePokemon = (): UiContract<State, Actions> => {
  const { bff } = useQuarzoDependencies();
  const selection = useSelection((state) => state.selection);

  if (!selection) {
    throw `selection should not be null`;
  }

  const {
    data,
    error: e,
    isFetching,
  } = useQuery({
    queryKey: onePokemonQueryKey(selection),
    queryFn: () => bff.getOnePokemon(selection),
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const errorMessage = e
    ? e instanceof Error
      ? e.message
      : "Unknown error"
    : null;

  return {
    state: (() => {
      if (isFetching || !data) {
        return pending(undefined);
      }
      if (errorMessage) {
        return error(errorMessage);
      }
      return success(data);
    })(),
    actions: {},
  };
};
