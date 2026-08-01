import { useCallback, useMemo, useRef, useState } from "react";
import esLocale from "@fullcalendar/core/locales/es";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import CalendarToolbar from "../mainCalendar/CalendarToolbar";
import GroupVisitPopover from "./GroupVisitPopover";
import GroupVisitsGrid from "./GroupVisitsGrid";
import { getGroupVisits } from "./groupVisitsServiceMock";

export default function GroupVisitsCalendar() {
  const calendarRef = useRef(null);
  const [view, setView] = useState("dayGridMonth");
  const [title, setTitle] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [anchorPosition, setAnchorPosition] = useState(null);

  const todayEvents = useMemo(() => {
    const today = new Date();
    const todayKey = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");

    return events.filter((event) => event.start.slice(0, 10) === todayKey);
  }, [events]);

  const fetchEvents = useCallback(async (fetchInfo) => {
    try {
      const response = await getGroupVisits(
        fetchInfo.startStr,
        fetchInfo.endStr,
      );

      const calendarEvents = response.items.map((visit) => ({
        id: String(visit.id),
        title: `${visit.tipo} - ${visit.institucion}`,
        start: visit.horaInicio,
        end: visit.horaFin,
        visit,
      }));

      setEvents(calendarEvents);
      return calendarEvents;
    } catch (error) {
      console.error("Error cargando visitas grupales:", error);
      return [];
    }
  }, []);

  function closePopover() {
    setAnchorPosition(null);
    setSelectedVisit(null);
  }

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
        slotMinTime="09:00:00"
        slotMaxTime="21:00:00"
        scrollTime="09:00:00"
        events={fetchEvents}
        eventClick={(info) => {
          setSelectedVisit(info.event.extendedProps.visit);
          setAnchorPosition({
            top: info.jsEvent.clientY,
            left: info.jsEvent.clientX,
          });
        }}
        height="auto"
        views={{
          dayGridMonth: { titleFormat: { year: "numeric", month: "long" } },
          timeGridWeek: { titleFormat: { year: "numeric", month: "long" } },
          timeGridDay: {
            titleFormat: { year: "numeric", month: "long", day: "numeric" },
          },
        }}
        datesSet={(info) => {
          const rawTitle = info.view.title;
          const nextTitle =
            rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);

          setTitle((currentTitle) =>
            currentTitle === nextTitle ? currentTitle : nextTitle,
          );
        }}
        dayHeaderContent={(arg) => {
          if (arg.view.type === "dayGridMonth") return arg.text.toUpperCase();

          const weekday = arg.date
            .toLocaleDateString("es-ES", { weekday: "short" })
            .toUpperCase();

          return `${weekday} ${arg.date.getDate()}`;
        }}
      />

      <GroupVisitsGrid rows={todayEvents} title="Visitas de hoy" />

      <GroupVisitsGrid rows={events} />

      <GroupVisitPopover
        open={Boolean(anchorPosition)}
        position={anchorPosition}
        visit={selectedVisit}
        onClose={closePopover}
      />
    </>
  );
}
