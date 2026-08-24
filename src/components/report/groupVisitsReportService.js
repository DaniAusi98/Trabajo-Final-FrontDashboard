const mockGroupVisitsSummary = {
  success: true,
  data: {
    id: 0,
    reservasTotales: 3,
    visitanteTotales: 76,
    visitasConfirmadas: 3,
    visitasCanceladas: 0,
    reprogramadas: 0,
    pendientes: 3,
  },
  message: "",
  code: "",
  statusCode: 200,
};

const USE_MOCK = true;

export async function getGroupVisitsSummary() {
  if (USE_MOCK) {
    return Promise.resolve(mockGroupVisitsSummary);
  }

  // Cuando conectemos el backend:
  //
  // const response = await fetch(
  //   "/api/v1/Reportes/VisitasGrupales"
  // );
  //
  // if (!response.ok) {
  //   throw new Error(
  //     "No se pudo obtener el reporte de visitas grupales"
  //   );
  // }
  //
  // return await response.json();
}

// ======================================================
// VISITAS GUIADAS
// ======================================================

export async function getGuidedVisitsReport(fechaDesde, fechaHasta) {
  if (USE_MOCK) {
    return {
      data: {
        id: 0,
        reservasTotales: 1,
        visitanteTotales: 21,
        visitasConfirmadas: 1,
        visitasCanceladas: 0,
        reprogramadas: 0,
        pendientes: 1,
        tasaOcupacion: 0.22826086956521738,
      },
    };
  }

  // const response = await fetch(
  //   `/api/v1/Reportes/VisitasGrupales/Guiadas?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`
  // );
  //
  // if (!response.ok) {
  //   throw new Error(
  //     "No se pudo obtener el reporte de visitas guiadas"
  //   );
  // }
  //
  // return await response.json();
}

// ======================================================
// VISITAS AUTOGUIADAS
// ======================================================

export async function getSelfGuidedVisitsReport(fechaDesde, fechaHasta) {
  if (USE_MOCK) {
    return {
      data: {
        id: 0,
        reservasTotales: 1,
        visitanteTotales: 21,
        visitasConfirmadas: 1,
        visitasCanceladas: 0,
        reprogramadas: 0,
        pendientes: 1,
        tasaOcupacion: 0.22826086956521738,
      },
    };
  }

  // const response = await fetch(
  //   `/api/v1/Reportes/VisitasGrupales/Autoguiadas?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`
  // );
  //
  // if (!response.ok) {
  //   throw new Error(
  //     "No se pudo obtener el reporte de visitas autoguiadas"
  //   );
  // }
  //
  // return await response.json();
}
// import { authenticatedFetch } from "@/services/authService";

// Mock temporal
export async function getGroupVisitsReport(fechaDesde, fechaHasta) {
  // ---------------------------------------------------------
  // LLAMADA REAL AL BACK - dejar comentada por ahora
  // ---------------------------------------------------------
  /*
  const response = await authenticatedFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/ReportesVisitasGrupales/reportGrid?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`
  );

  if (!response.ok) {
    throw new Error("Error obteniendo el reporte de visitas grupales");
  }

  const result = await response.json();

  return result.data.items;
  */

  // ---------------------------------------------------------
  // MOCK
  // ---------------------------------------------------------

  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: 5,
      estado: "Activa",
      estadoConfirmacion: "PendienteConfirmar",
      tipo: "Autoguiada",
      nivelEducativo: null,
      cantidadPersonas: 21,
      institucion: "Manuel Belgrano",
      provincia: "Córdoba",
      departamento: "Punilla",
      localidad: "Bialet Massé",
      horaInicio: "2026-08-12T09:30:00",
      horaFin: "2026-08-12T10:30:00",
    },
    {
      id: 3,
      estado: "Activa",
      estadoConfirmacion: "PendienteConfirmar",
      tipo: "Guiada",
      nivelEducativo: "Primario",
      cantidadPersonas: 27,
      institucion: "Manuel Belgrano",
      provincia: "Córdoba",
      departamento: "Capital",
      localidad: "Córdoba",
      horaInicio: "2026-08-03T09:30:00",
      horaFin: "2026-08-03T10:30:00",
    },
    {
      id: 4,
      estado: "Activa",
      estadoConfirmacion: "Confirmada",
      tipo: "Guiada",
      nivelEducativo: "Secundario",
      cantidadPersonas: 28,
      institucion: "Sarmiento",
      provincia: "Entre Ríos",
      departamento: "Gualeguay",
      localidad: "Aldea Asunción",
      horaInicio: "2026-08-04T11:00:00",
      horaFin: "2026-08-04T12:00:00",
    },
    {
      id: 6,
      estado: "Cancelada",
      estadoConfirmacion: "Confirmada",
      tipo: "Autoguiada",
      nivelEducativo: null,
      cantidadPersonas: 18,
      institucion: "Colegio San Martín",
      provincia: "Córdoba",
      departamento: "Capital",
      localidad: "Córdoba",
      horaInicio: "2026-08-15T10:00:00",
      horaFin: "2026-08-15T11:00:00",
    },
    {
      id: 7,
      estado: "Reprogramada",
      estadoConfirmacion: "PendienteConfirmar",
      tipo: "Guiada",
      nivelEducativo: "Inicial",
      cantidadPersonas: 15,
      institucion: "Jardín Arcoíris",
      provincia: "Santa Fe",
      departamento: "Rosario",
      localidad: "Rosario",
      horaInicio: "2026-08-20T14:00:00",
      horaFin: "2026-08-20T15:00:00",
    },
  ];
}

export async function getVisitorsByRoom(fechaDesde, fechaHasta) {
  // API real:
  // return authenticatedFetch(
  //   `/api/v1/Reportes/VisitantesPorSala?fechaInicio=${fechaDesde}&fechaFin=${fechaHasta}`
  // );

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: [
          {
            salaId: 1,
            nombreSala: "Hall de Ingreso",
            cantidadVisitantes: 0,
          },
          {
            salaId: 2,
            nombreSala: "Patrimonio Cultural",
            cantidadVisitantes: 0,
          },
          {
            salaId: 3,
            nombreSala: "Arqueología del Siglo XIX",
            cantidadVisitantes: 55,
          },
          {
            salaId: 4,
            nombreSala: "Arqueología Andina",
            cantidadVisitantes: 55,
          },
          {
            salaId: 5,
            nombreSala: "Arqueología del Ambato",
            cantidadVisitantes: 55,
          },
          {
            salaId: 6,
            nombreSala: "Arqueología Serrana",
            cantidadVisitantes: 55,
          },
          {
            salaId: 7,
            nombreSala: "Mensajes de Identidad",
            cantidadVisitantes: 0,
          },
          {
            salaId: 8,
            nombreSala: "Excavación",
            cantidadVisitantes: 55,
          },
          {
            salaId: 9,
            nombreSala: "Identidades y Rituales Andinos",
            cantidadVisitantes: 0,
          },
          {
            salaId: 10,
            nombreSala: "Antropología Social",
            cantidadVisitantes: 55,
          },
          {
            salaId: 11,
            nombreSala: "Huachichocana",
            cantidadVisitantes: 0,
          },
          {
            salaId: 12,
            nombreSala: "Negro sobre Blanco",
            cantidadVisitantes: 55,
          },
          {
            salaId: 13,
            nombreSala: "Biblioteca",
            cantidadVisitantes: 0,
          },
          {
            salaId: 14,
            nombreSala: "Aula Educativa",
            cantidadVisitantes: 0,
          },
          {
            salaId: 15,
            nombreSala: "Auditorio",
            cantidadVisitantes: 0,
          },
        ],
        message: "",
        code: "",
        statusCode: 200,
      });
    }, 300);
  });
}
