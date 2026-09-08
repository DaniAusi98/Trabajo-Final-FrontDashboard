import React from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";

const EventConfiguration = ({
  selectedStart,
  selectedEnd,
  onSave,
  onCancel,
}) => {
  return (
    <Box>
      {/* =======================================================
          DATOS DEL EVENTO
      ======================================================= */}
      <Stack spacing={2}>
        <Typography variant="subtitle1" fontWeight={600}>
          Datos del evento
        </Typography>

        {/* Acá van los campos del evento */}
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* =======================================================
          FECHA Y HORARIO
      ======================================================= */}
      <Stack spacing={2}>
        <Typography variant="subtitle1" fontWeight={600}>
          Fecha y horario
        </Typography>

        {/* Acá van fecha, hora inicio, hora fin, etc. */}
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* =======================================================
          REPETICIÓN
      ======================================================= */}
      <Stack spacing={2}>
        <Typography variant="subtitle1" fontWeight={600}>
          Repetición
        </Typography>

        {/* Acá va la configuración de recurrencia */}
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* =======================================================
          SALAS
      ======================================================= */}
      <Stack spacing={2}>
        <Typography variant="subtitle1" fontWeight={600}>
          Salas
        </Typography>

        {/* Acá va la selección de salas */}
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* =======================================================
          ACCIONES
      ======================================================= */}
      <Stack
        direction="row"
        spacing={1}
        justifyContent="flex-end"
        sx={{ mt: 3 }}
      >
        <Button variant="outlined" onClick={onCancel}>
          Cancelar
        </Button>

        <Button variant="contained" onClick={onSave}>
          Guardar
        </Button>
      </Stack>
    </Box>
  );
};

export default EventConfiguration;
