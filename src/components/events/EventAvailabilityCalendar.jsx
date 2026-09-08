import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import dayjs from "dayjs";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Tooltip,
} from "@mui/material";

import { API_URL } from "../../services/api";
import { authService } from "../../lib/auth";

const EventAvailabilityCalendar = forwardRef(
  ({ salasIds = [], selectedStart, onTimeSelect }, ref) => {
    const [events, setEvents] = useState([]);
    const [slotsOriginales, setSlotsOriginales] = useState([]);
    const [loading, setLoading] = useState(false);
    const calendarRef = useRef(null);

    // =========================================================
    // FETCH DISPONIBILIDAD
    // =========================================================
    const fetchAvailableTimes = async (startStr, endStr) => {
      if (!salasIds || salasIds.length === 0) {
        setEvents([]);
        setSlotsOriginales([]);
        return;
      }

      setLoading(true);

      try {
        const fechaDesde = dayjs(startStr).format("YYYY-MM-DD");
        const fechaHasta = dayjs(endStr).format("YYYY-MM-DD");

        const params = new URLSearchParams();
        params.append("desde", fechaDesde);
        params.append("hasta", fechaHasta);
        salasIds.forEach((salaId) => params.append("salasIds", salaId));

        const response = await authService.authenticatedFetch(
          `${API_URL}/api/v1/eventos/disponibilidad?${params.toString()}`,
          { method: "GET" },
        );

        if (!response.ok) throw new Error("Error al obtener disponibilidad");

        const result = await response.json();
        const slots = result?.data?.horariosDisponibles ?? [];

        setSlotsOriginales(slots);

        const bloqueosMapeados = slots
          .filter((slot) => slot.disponible === false)
          .map((slot) => ({
            id: slot.inicio,
            title: slot.mensaje || "No disponible",
            start: slot.inicio,
            end: slot.fin,
            display: "background",
            color: "#bdbdbd",
            textColor: "#424242",
          }));

        setEvents(bloqueosMapeados);
      } catch (error) {
        console.error("Error fetching disponibilidad:", error);
        setEvents([]);
        setSlotsOriginales([]);
      } finally {
        setLoading(false);
      }
    };

    // =========================================================
    // REFRESH DESDE EL PADRE
    // =========================================================
    useImperativeHandle(
      ref,
      () => ({
        refreshAvailability: () => {
          if (calendarRef.current) {
            const api = calendarRef.current.getApi();
            fetchAvailableTimes(api.view.activeStart, api.view.activeEnd);
          }
        },
      }),
      [salasIds],
    );

    useEffect(() => {
      if (calendarRef.current) {
        const api = calendarRef.current.getApi();
        fetchAvailableTimes(api.view.activeStart, api.view.activeEnd);
      }
    }, [salasIds.join(",")]);

    // =========================================================
    // MANEJO DE SELECCIÓN DESDE CUALQUIER VISTA
    // =========================================================
    const handleSelectSlot = (selectInfo) => {
      const api = calendarRef.current.getApi();

      if (api.view.type === "dayGridMonth") {
        const fechaCeldaStr = dayjs(selectInfo.startStr).format("YYYY-MM-DD");
        const slotsDelDia = slotsOriginales.filter(
          (slot) => dayjs(slot.inicio).format("YYYY-MM-DD") === fechaCeldaStr,
        );

        if (
          slotsDelDia.length > 0 &&
          slotsDelDia.every((s) => s.disponible === false)
        ) {
          api.unselect();
          return;
        }

        onTimeSelect?.(selectInfo.startStr);
        return;
      }

      const seSolapaConBloqueo = events.some(
        (b) => selectInfo.startStr < b.end && selectInfo.endStr > b.start,
      );

      if (seSolapaConBloqueo) {
        api.unselect();
        return;
      }

      onTimeSelect?.(selectInfo.startStr);
    };

    // =========================================================
    // LÓGICA DE CONTROL VISUAL PARA LA VISTA MENSUAL (SIMPLIFICADA)
    // =========================================================
    const handleRenderCeldaMes = (info) => {
      // Eliminamos el getApi(). Al estar en esta función, ya sabemos de forma segura que es el Mes.
      const fechaCeldaStr = dayjs(info.date).format("YYYY-MM-DD");

      const slotsDelDia = slotsOriginales.filter(
        (slot) => dayjs(slot.inicio).format("YYYY-MM-DD") === fechaCeldaStr,
      );

      if (
        slotsDelDia.length > 0 &&
        slotsDelDia.every((s) => s.disponible === false)
      ) {
        info.el.style.backgroundColor = "#bdbdbd";
        info.el.style.cursor = "not-allowed";
        info.el.style.opacity = "0.75";
      }
    };

    return (
      <Box sx={{ position: "relative" }}>
        {loading && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(255,255,255,0.7)",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyBox: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        <Card>
          <CardContent sx={{ "& .fc": { fontFamily: "Roboto, sans-serif" } }}>
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              locale="es"
              allDaySlot={false}
              slotMinTime="08:00:00"
              slotMaxTime="21:00:00"
              slotDuration="00:30:00"
              selectable={true}
              selectMirror={true}
              select={handleSelectSlot}
              events={events}
              dayCellDidMount={handleRenderCeldaMes}
              datesSet={(dateInfo) => {
                fetchAvailableTimes(dateInfo.startStr, dateInfo.endStr);
              }}
              eventContent={(arg) => (
                <Tooltip title={arg.event.title} placement="top" arrow>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      cursor: "not-allowed",
                    }}
                  />
                </Tooltip>
              )}
            />
          </CardContent>
        </Card>
      </Box>
    );
  },
);

export default EventAvailabilityCalendar;
