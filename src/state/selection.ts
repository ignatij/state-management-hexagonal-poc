import { create } from "zustand";

type State = {
  selection: number | null;
  setSelection: (pokemonId: number) => void;
};

export const useSelection = create<State>((set) => ({
  selection: null,
  setSelection: (pokemonId) => set({ selection: pokemonId }),
}));
