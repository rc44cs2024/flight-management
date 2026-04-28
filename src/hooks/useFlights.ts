import { useMemo } from "react";
import { useFlightStore } from "../store/flightStore";

export const useFlights = () => {
  const { flights, filters, search } = useFlightStore();

  return useMemo(() => {
    return flights.filter((f) => {
      const matchesSearch =
        f.flightNumber.includes(search) ||
        f.origin.includes(search) ||
        f.destination.includes(search);

      if (!matchesSearch) return false;

      if (filters.status && f.status !== filters.status) return false;
      if (filters.aoc && f.aoc !== filters.aoc) return false;
      if (filters.bodyType && f.bodyType !== filters.bodyType) return false;

      return true;
    });
  }, [flights, filters, search]);
};