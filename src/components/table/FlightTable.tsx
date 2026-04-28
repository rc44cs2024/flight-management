
import {
  Box,
  Checkbox,
  Typography,
  Toolbar,
  Button,
} from "@mui/material";
import { useFlights } from "../../hooks/useFlights";
import { VirtualList } from "./VirtualList";
import { FlightRow } from "./FlightRow";
import { useFlightStore } from "../../store/flightStore";
import { useMemo, useCallback } from "react";

export const FlightTable = () => {
  const flights = useFlights();

  const {
    selected,
    deleteFlights,
    clearSelection,
    selectAll,
  } = useFlightStore();

  // ---------------------------
  // SELECT ALL LOGIC
  // ---------------------------
  const allSelected = useMemo(
    () =>
      flights.length > 0 &&
      selected.size === flights.length,
    [flights.length, selected.size]
  );

  const isIndeterminate = useMemo(
    () =>
      selected.size > 0 &&
      selected.size < flights.length,
    [selected.size, flights.length]
  );

  const handleSelectAll = useCallback(() => {
    if (allSelected) {
      clearSelection();
    } else {
      // select only visible flights (important)
      useFlightStore.setState({
        selected: new Set(flights.map((f) => f.id)),
      });
    }
  }, [allSelected, flights]);

  // ---------------------------
  // BULK DELETE
  // ---------------------------
  const handleBulkDelete = useCallback(() => {
    if (!selected.size) return;

    if (window.confirm("Delete selected flights?")) {
      deleteFlights(Array.from(selected));
    }
  }, [selected]);

  // ---------------------------
  // EMPTY STATE
  // ---------------------------
  if (!flights.length) {
    return (
      <Box
        sx={{
          p: 6,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          No flights found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting filters or search
        </Typography>
      </Box>
    );
  }

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* =========================
          TOOLBAR
      ========================== */}
      <Toolbar
        sx={{
          borderBottom: "1px solid #eee",
        }}
      >
        {selected.size > 0 ? (
          <>
            <Typography sx={{ flex: 1 }}>
              {selected.size} selected
            </Typography>

            <Button
              color="error"
              variant="contained"
              onClick={handleBulkDelete}
            >
              Delete Selected
            </Button>
          </>
        ) : (
          <Typography sx={{ flex: 1 }}>
            {flights.length} Flights
          </Typography>
        )}
      </Toolbar>

      {/* =========================
          HEADER (STICKY)
      ========================== */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "50px 1fr 1fr 1fr 120px 150px",
          fontWeight: 600,
          px: 2,
          py: 1,
          borderBottom: "1px solid #ddd",
          position: "sticky",
          top: 0,
          background: "#fff",
          zIndex: 2,
        }}
      >
        <Checkbox
          checked={allSelected}
          indeterminate={isIndeterminate}
          onChange={handleSelectAll}
        />

        <span>Flight</span>
        <span>Route</span>
        <span>Time</span>
        <span>Status</span>
        <span>Actions</span>
      </Box>

      {/* =========================
          TABLE BODY (VIRTUAL)
      ========================== */}
      <Box sx={{ flex: 1 }}>
        <VirtualList data={flights} Row={FlightRow} />
      </Box>
    </Box>
  );
};