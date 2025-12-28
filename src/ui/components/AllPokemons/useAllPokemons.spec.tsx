import { describe, expect, test } from "vitest";
import { QueryClient } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { useAllPokemons } from "./useAllPokemons";
import { error, success } from "../../../utils/Result";
import { buildInMemoryBff } from "../../../test-utils/in-memory-dependencies";
import { buildInMemoryDependencies } from "../../../test-utils/in-memory-bff";
import type { AllPokemonsItem } from "./AllPokemons";
import { createWrapper } from "../../../test-utils/wrapper";

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

    const wrapper = createWrapper({ queryClient, dependencies });

    // When
    const { result } = renderHook(() => useAllPokemons(), { wrapper });

    // Then
    await waitFor(() => {
      expect(result.current.state).toEqual(success([pokemon]));
    });
  });

  test("error", async () => {
    // Given
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const bff = buildInMemoryBff()
      .withGetAllPokemons({ failWithError: new Error("Could not fetch") })
      .build();

    const dependencies = buildInMemoryDependencies(bff);

    const wrapper = createWrapper({ queryClient, dependencies });

    // When
    const { result } = renderHook(() => useAllPokemons(), { wrapper });

    // Then
    await waitFor(() => {
      expect(result.current.state).toEqual(error("Could not fetch"));
    });
  });
});
