import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useQuarzoDependencies } from "../../../bootstrap/use-quarzo-dependencies";
import type { UiContract } from "../../ui-contract";
import type { Actions, State } from "./AllPokemons";
import { useSelection } from "../../../state/selection";
import { error, pending, success } from "../../../utils/Result";

export const usePokemonsList = (): UiContract<State, Actions> => {
  const { bff } = useQuarzoDependencies();
  const setSelection = useSelection((state) => state.setSelection);
  const [hasRequestedFetch, setHasRequestedFetch] = useState(false);

  const requestFetch = useCallback(() => {
    setHasRequestedFetch(true);
  }, []);

  // Query for fetching pokemons
  const {
    data,
    error: e,
    isFetching,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["all-pokemons"],
    queryFn: () => bff.getAllPokemons(),
    enabled: hasRequestedFetch,
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const load = useCallback(() => {
    if (!hasRequestedFetch) {
      requestFetch();
      return;
    }
    void refetch();
  }, [hasRequestedFetch, refetch, requestFetch]);

  const errorMessage = e
    ? e instanceof Error
      ? e.message
      : "Unknown error"
    : null;
  const isLoading = hasRequestedFetch ? isPending || isFetching : false;
  const pokemons = data ?? [];

  return {
    state: (() => {
      if (isLoading) {
        return pending([]);
      }
      if (errorMessage) {
        return error(errorMessage);
      }
      return success(pokemons);
    })(),
    actions: {
      load,
      select: setSelection,
    },
  };
};
