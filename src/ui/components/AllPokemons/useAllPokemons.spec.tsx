import { describe, expect, test } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QuarzoDependenciesProvider } from "../../../bootstrap/quarzo.provider";
import type { QuarzoDependencies } from "../../../bootstrap/quarzo.dependencies";
import { renderHook, waitFor } from "@testing-library/react";
import { useAllPokemons } from "./useAllPokemons";
import { success } from "../../../utils/Result";
import { buildInMemoryBff } from "../../../test-utils/in-memory-dependencies";
import { buildInMemoryDependencies } from "../../../test-utils/in-memory-bff";
import type { AllPokemonsItem } from "./AllPokemons";

const queryClient = new QueryClient();

const wrapper =
  (dependencies: QuarzoDependencies) =>
  ({ children }: { children: React.ReactNode }) =>
    (
      <QueryClientProvider client={queryClient}>
        <QuarzoDependenciesProvider dependencies={dependencies}>
          {children}
        </QuarzoDependenciesProvider>
      </QueryClientProvider>
    );

describe("Test of useAllPokemons hook", () => {
  test("success (no user action)", () => {
    // Given
    const bff = buildInMemoryBff().build();
    const dependencies = buildInMemoryDependencies(bff, queryClient);

    // When
    const { result } = renderHook(() => useAllPokemons(), {
      wrapper: wrapper(dependencies),
    });

    // Then
    expect(result.current.state).toEqual(success([]));
  });

  test("success (user has triggered fetching data)", async () => {
    // Given
    const pokemon: AllPokemonsItem = {
      id: 1,
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    };
    const bff = buildInMemoryBff()
      .withGetAllPokemons({ feedWithPokemons: [pokemon] })
      .build();
    const dependencies = buildInMemoryDependencies(bff, queryClient);
    const { result } = renderHook(() => useAllPokemons(), {
      wrapper: wrapper(dependencies),
    });

    // When
    result.current.actions.load();

    // Then
    await waitFor(() => {
      expect(result.current.state).toEqual(
        success([
          {
            id: 1,
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/",
          },
        ])
      );
    });
  });
});
