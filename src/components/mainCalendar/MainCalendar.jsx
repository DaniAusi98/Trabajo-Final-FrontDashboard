import { useRef, useState, useEffect } from "react";
import esLocale from "@fullcalendar/core/locales/es";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import CalendarToolbar from "./CalendarToolbar";
import { getCalendarEvents } from "./calendarServiceMock";
import ActivityPopover from "./ActivityPopover";

export default function MainCalendar() {
  const calendarRef = useRef(null);

  const [view, setView] = useState("dayGridMonth");
  const [title, setTitle] = useState("");
  const [events, setEvents] = useState([]);

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [anchorPosition, setAnchorPosition] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsData = await getCalendarEvents("2026-01-01", "2026-12-31");

        setEvents(eventsData);
      } catch (error) {
        console.error(error);
      }
    };

    loadEvents();
  }, []);

  return (
    <>
      <CalendarToolbar
        view={view}
        setView={setView}
        title={title}
        calendarRef={calendarRef}
      />

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        locale="es"
        locales={[esLocale]}
        headerToolbar={false}
        events={events}
        eventClick={(info) => {
          setSelectedActivity(info.event.extendedProps.actividad);

          setSelectedSlot(info.event.extendedProps.slotSeleccionado);

          setAnchorPosition({
            top: info.jsEvent.clientY,
            left: info.jsEvent.clientX,
          });
        }}
        height="auto"
        views={{
          dayGridMonth: {
            titleFormat: { year: "numeric", month: "long" },
          },
          timeGridWeek: {
            titleFormat: { year: "numeric", month: "long" },
          },
          timeGridDay: {
            titleFormat: {
              year: "numeric",
              month: "long",
              day: "numeric",
            },
          },
        }}
        datesSet={(info) => {
          const raw = info.view.title;
          setTitle(raw.charAt(0).toUpperCase() + raw.slice(1));
        }}
        dayHeaderContent={(arg) => {
          // 👉 MES: usar el texto original de FullCalendar
          if (arg.view.type === "dayGridMonth") {
            return arg.text.toUpperCase();
          }

          // 👉 SEMANA / DÍA: custom
          const weekday = arg.date
            .toLocaleDateString("es-ES", {
              weekday: "short",
            })
            .toUpperCase();

          const day = arg.date.getDate();

          return `${weekday} ${day}`;
        }}
      />
      <ActivityPopover
        open={Boolean(anchorPosition)}
        position={anchorPosition}
        activity={selectedActivity}
        slot={selectedSlot}
        onClose={() => {
          setAnchorPosition(null);
          setSelectedActivity(null);
          setSelectedSlot(null);
        }}
      />
    </>
  );
}
