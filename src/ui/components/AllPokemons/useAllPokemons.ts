import { useQuery } from "@tanstack/react-query";
import { useQuarzoDependencies } from "../../../bootstrap/use-quarzo-dependencies";
import type { UiContract } from "../../ui-contract";
import type { Actions, State } from "./AllPokemons";
import { useSelection } from "../../../state/selection";
import { error, pending, success } from "../../../utils/Result";
import { queryKey } from "../../../cache/all-pokemons.cache";

export const useAllPokemons = (): UiContract<State, Actions> => {
  const { bff } = useQuarzoDependencies();
  const setSelection = useSelection((state) => state.setSelection);

  const {
    data,
    error: e,
    isFetching,
  } = useQuery({
    queryKey: queryKey(),
    queryFn: () => bff.getAllPokemons(),
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
      if (isFetching) {
        return pending([]);
      }
      if (errorMessage) {
        return error(errorMessage);
      }
      return success(data || []);
    })(),
    actions: {
      select: setSelection,
    },
  };
};
