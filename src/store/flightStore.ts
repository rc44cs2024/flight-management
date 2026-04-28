
import { create } from "zustand";
import { Flight } from "../types/flight";

type Filters = {
  status?: string;
  aoc?: string;
  bodyType?: string;
};

type State = {
  flights: Flight[];
  selected: Set<string>;
  filters: Filters;
  search: string;

  // setters
  setFlights: (data: Flight[]) => void;
  setSearch: (val: string) => void;
  setFilters: (filters: Partial<Filters>) => void;

  // selection
  toggleSelect: (id: string) => void;
  clearSelection: () => void;
  selectAll: () => void;

  // actions
  updateFlight: (id: string, updated: Partial<Flight>) => void;
  toggleStatus: (id: string) => void;

  // delete
  deleteFlight: (id: string) => void;
  deleteFlights: (ids: string[]) => void;
};

export const useFlightStore = create<State>((set, get) => ({
  flights: [],
  selected: new Set(),
  filters: {},
  search: "",

  // ---------------------------
  // SETTERS
  // ---------------------------
  setFlights: (data) => set({ flights: data }),

  setSearch: (search) => set({ search }),

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),

  // ---------------------------
  // SELECTION
  // ---------------------------
  toggleSelect: (id) =>
    set((state) => {
      const newSet = new Set(state.selected);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      return { selected: newSet };
    }),

  clearSelection: () => set({ selected: new Set() }),

  selectAll: () => {
    const { flights } = get();
    set({
      selected: new Set(flights.map((f) => f.id)),
    });
  },

  // ---------------------------
  // UPDATE
  // ---------------------------
  updateFlight: (id, updated) =>
    set((state) => ({
      flights: state.flights.map((f) =>
        f.id === id ? { ...f, ...updated } : f
      ),
    })),

  toggleStatus: (id) =>
    set((state) => ({
      flights: state.flights.map((f) =>
        f.id === id
          ? {
              ...f,
              status: f.status === "Active" ? "Inactive" : "Active",
            }
          : f
      ),
    })),

  // ---------------------------
  // DELETE (SINGLE)
  // ---------------------------
  deleteFlight: (id) =>
    set((state) => {
      const newFlights = state.flights.filter((f) => f.id !== id);

      const newSelected = new Set(state.selected);
      newSelected.delete(id);

      return {
        flights: newFlights,
        selected: newSelected,
      };
    }),

  // ---------------------------
  // DELETE (BULK)
  // ---------------------------
  deleteFlights: (ids) =>
    set((state) => {
      const idSet = new Set(ids);

      const newFlights = state.flights.filter(
        (f) => !idSet.has(f.id)
      );

      return {
        flights: newFlights,
        selected: new Set(), // reset selection after bulk delete
      };
    }),
}));