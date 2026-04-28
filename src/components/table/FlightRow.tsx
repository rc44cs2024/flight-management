import {
  Box,
  Checkbox,
  IconButton,
  TextField,
  Chip,
  CircularProgress,
} from "@mui/material";
import { Edit, Save, Close, Delete } from "@mui/icons-material";
import React, { useState, useCallback } from "react";
import { useFlightStore } from "../../store/flightStore";

export const FlightRow = React.memo(({ flight }: any) => {
  const { updateFlight, toggleStatus, toggleSelect } = useFlightStore();

  const [edit, setEdit] = useState(false);
  const [local, setLocal] = useState(flight);
  const [loading, setLoading] = useState(false);
  const { deleteFlight } = useFlightStore();


  const onDelete = useCallback(() => {
  if (window.confirm("Delete this flight?")) {
    deleteFlight(flight.id);
  }
}, [flight.id]);

  const onSave = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      updateFlight(flight.id, local);
      setEdit(false);
      setLoading(false);
    }, 600);
  }, [local]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "50px 1fr 1fr 1fr 120px 150px",
        px: 2,
        py: 1,
        alignItems: "center",
        borderBottom: "1px solid #eee",
      }}
    >
      <Checkbox onChange={() => toggleSelect(flight.id)} />

      {edit ? (
        <TextField
          size="small"
          value={local.flightNumber}
          onChange={(e) =>
            setLocal({ ...local, flightNumber: e.target.value })
          }
        />
      ) : (
        <span>{flight.flightNumber}</span>
      )}

      <span>
        {flight.origin} → {flight.destination}
      </span>

      <span>
        {flight.std} - {flight.sta}
      </span>

      <Chip
        label={flight.status}
        color={flight.status === "Active" ? "success" : "default"}
        onClick={() => toggleStatus(flight.id)}
      />

      <Box>
        {edit ? (
          <>
            <IconButton onClick={onSave}>
              {loading ? <CircularProgress size={18} /> : <Save />}
            </IconButton>
            <IconButton onClick={() => setEdit(false)}>
              <Close />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={() => setEdit(true)}>
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={onDelete}> 
              <Delete />
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
});