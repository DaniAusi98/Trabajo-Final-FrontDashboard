import React from "react";
import { Box, IconButton, Paper, Popper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EventConfigurationPopper = ({ open, anchorEl, onClose, children }) => {
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      sx={{
        zIndex: 1300,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: 500,
          maxHeight: "80vh",
          overflow: "auto",
          borderRadius: 2,
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
          }}
        >
          <Typography variant="h6">Configurar evento</Typography>

          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* CONTENIDO */}
        <Box sx={{ px: 2, pb: 2 }}>{children}</Box>
      </Paper>
    </Popper>
  );
};

export default EventConfigurationPopper;
