import { describe, expect, test } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QuarzoDependenciesProvider } from "../../../bootstrap/quarzo.provider";
import type { QuarzoDependencies } from "../../../bootstrap/quarzo.dependencies";
import { renderHook, waitFor } from "@testing-library/react";
import { useAllPokemons } from "./useAllPokemons";
import { error, success } from "../../../utils/Result";
import { buildInMemoryBff } from "../../../test-utils/in-memory-dependencies";
import { buildInMemoryDependencies } from "../../../test-utils/in-memory-bff";
import type { AllPokemonsItem } from "./AllPokemons";

type Parameters = {
  queryClient: QueryClient;
  dependencies: QuarzoDependencies;
};

const wrapper =
  ({ queryClient, dependencies }: Parameters) =>
  ({ children }: { children: React.ReactNode }) =>
    (
      <QueryClientProvider client={queryClient}>
        <QuarzoDependenciesProvider dependencies={dependencies}>
          {children}
        </QuarzoDependenciesProvider>
      </QueryClientProvider>
    );

describe("Test of useAllPokemons hook", () => {
  test("success", async () => {
    // Given
    const pokemon: AllPokemonsItem = {
      id: 1,
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    };
    const queryClient = new QueryClient();
    const bff = buildInMemoryBff()
      .withGetAllPokemons({ feedWithPokemons: [pokemon] })
      .build();
    const dependencies = buildInMemoryDependencies(bff);

    // When
    const { result } = renderHook(() => useAllPokemons(), {
      wrapper: wrapper({ queryClient, dependencies }),
    });

    // Then
    await waitFor(() => {
      expect(result.current.state).toEqual(success([pokemon]));
    });
  });

  test.only("error", () => {
    // Given
    const queryClient = new QueryClient();
    const bff = buildInMemoryBff()
      .withGetAllPokemons({ failWithError: new Error("Could not fetch") })
      .build();
    const dependencies = buildInMemoryDependencies(bff);

    // When
    const { result } = renderHook(() => useAllPokemons(), {
      wrapper: wrapper({ queryClient, dependencies }),
    });

    // Then
    expect(result.current.state).toEqual(error("Could not fetch"));
  });
});
