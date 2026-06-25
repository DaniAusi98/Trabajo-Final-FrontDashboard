export async function getCalendarEvents(fechaDesde, fechaHasta) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const result = {
    success: true,
    data: {
      count: 3,
      items: [
        {
          id: 1,
          tipoActividad: "VisitaGrupalGuiada",
          estado: "Activa",
          cantidadPersonas: 20,
          salas: [
            {
              id: 1,
              nombre: "Sala Principal",
            },
          ],
          recursos: [
            {
              id: 1,
              nombre: "Proyector",
            },
          ],
          timeSlots: [
            {
              inicio: "2026-06-01T09:30:00",
              fin: "2026-06-01T10:30:00",
            },
          ],
        },
        {
          id: 2,
          tipoActividad: "Evento",
          estado: "Activa",
          cantidadPersonas: 50,
          salas: [
            {
              id: 2,
              nombre: "Auditorio",
            },
            {
              id: 3,
              nombre: "Sala de Conferencias",
            },
          ],
          recursos: [
            {
              id: 2,
              nombre: "Equipo de Audio",
            },
            {
              id: 3,
              nombre: "Micrófono",
            },
          ],
          timeSlots: [
            {
              inicio: "2026-06-04T16:00:00",
              fin: "2026-06-04T18:00:00",
            },
          ],
        },
        {
          id: 3,
          tipoActividad: "Curso",
          estado: "Activa",
          cantidadPersonas: 15,
          salas: [
            {
              id: 4,
              nombre: "Sala Educativa",
            },
          ],
          recursos: [],
          timeSlots: [
            {
              inicio: "2026-06-10T09:00:00",
              fin: "2026-06-10T11:00:00",
            },
            {
              inicio: "2026-06-17T09:00:00",
              fin: "2026-06-17T11:00:00",
            },
            {
              inicio: "2026-06-24T09:00:00",
              fin: "2026-06-24T11:00:00",
            },
          ],
        },
      ],
    },
  };

  const actividades = result.data.items;

  const events = [];

  for (const actividad of actividades) {
    for (const slot of actividad.timeSlots) {
      events.push({
        id: `${actividad.id}-${slot.inicio}`,
        title: actividad.tipoActividad,
        start: slot.inicio,
        end: slot.fin,

        actividad,
        slotSeleccionado: slot,
      });
    }
  }

  return events;
}
