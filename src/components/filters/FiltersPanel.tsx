import { useFlightStore } from "../../store/flightStore";

export const FiltersPanel = () => {
  const { setFilters, setSearch } = useFlightStore();

  return (
    <div>
      <input
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <select onChange={(e) => setFilters({ status: e.target.value })}>
        <option value="">All</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
  );
};