import { useEffect } from "react";
import { Container, Typography, Paper } from "@mui/material";
import { useFlightStore } from "./store/flightStore";
import { FlightTable } from "./components/table/FlightTable";
import { FiltersPanel } from "./components/filters/FiltersPanel";

export default function App() {
  const setFlights = useFlightStore((s) => s.setFlights);

  useEffect(() => {
    fetch("/flights.json")
      .then((res) => res.json())
      .then((data) => setFlights(data.flights));
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Flight Management
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <FiltersPanel />
      </Paper>

      <Paper sx={{ height: 650 }}>
        <FlightTable />
      </Paper>
    </Container>
  );
}