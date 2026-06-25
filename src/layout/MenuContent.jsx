import { NavLink } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";

import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

const mainListItems = [
  {
    text: "Calendario General",
    path: "/",
    icon: <CalendarMonthRoundedIcon />,
  },
  {
    text: "Visitas Guiadas",
    path: "/groupVisits",
    icon: <GroupsRoundedIcon />,
  },
  {
    text: "Eventos y Actividades",
    path: "/eventsActivities",
    icon: <EventRoundedIcon />,
  },
  {
    text: "Educación",
    path: "/education",
    icon: <SchoolRoundedIcon />,
  },
  {
    text: "Propuestas de Eventos",
    path: "/eventProposals",
    icon: <DescriptionRoundedIcon />,
  },
];

const secondaryListItems = [
  {
    text: "Configuración",
    path: "/settings",
    icon: <SettingsRoundedIcon />,
  },
];

export default function MenuContent() {
  return (
    <Stack
      sx={{
        flexGrow: 1,
        p: 1,
        justifyContent: "space-between",
      }}
    >
      <List dense>
        {mainListItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton component={NavLink} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>

              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton component={NavLink} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>

              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
