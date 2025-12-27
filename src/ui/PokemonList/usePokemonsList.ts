// adapters/primary/ui/pages/usePokemonsScreen.ts
import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useQuarzoDependencies } from "../../application/use-quarzo-dependencies";
import type { UiContract } from "../ui-contract";
import type { Actions, State } from "./PokemonsList";

export const usePokemonsList = (): UiContract<State, Actions> => {
  const { bff } = useQuarzoDependencies();
  const [hasRequestedFetch, setHasRequestedFetch] = useState(false);

  const requestFetch = useCallback(() => {
    setHasRequestedFetch(true);
  }, []);

  // Query for fetching pokemons
  const { data, error, isFetching, isPending, refetch } = useQuery({
    queryKey: ["pokemons"],
    queryFn: () => bff.getPokemons(),
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

  const errorMessage = error
    ? error instanceof Error
      ? error.message
      : "Unknown error"
    : null;
  const isLoading = hasRequestedFetch ? isPending || isFetching : false;
  const pokemons = data ?? [];

  return {
    state: {
      pokemons,
      isLoading,
      error: errorMessage,
    },
    actions: {
      load,
    },
  };
};
