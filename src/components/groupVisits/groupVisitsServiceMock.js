const groupVisitsResponse = {
  count: 3,
  items: [
    {
      id: 2,
      tipo: "Guiada",
      provincia: "Formosa",
      departamento: "Formosa",
      localidad: "Colonia Pastoril",
      cantidadPersonas: 30,
      institucion: "kjkjnkjnj",
      diversidadFuncional: "jo",
      horaInicio: "2026-07-31T11:00:00",
      horaFin: "2026-07-31T12:00:00",
    },
    {
      id: 3,
      tipo: "Guiada",
      provincia: "Córdoba",
      departamento: "Capital",
      localidad: "Córdoba",
      cantidadPersonas: 27,
      institucion: "Manuel Belgrano",
      diversidadFuncional: "",
      horaInicio: "2026-08-03T09:30:00",
      horaFin: "2026-08-03T10:30:00",
    },
    {
      id: 4,
      tipo: "Guiada",
      provincia: "Entre Ríos",
      departamento: "Gualeguay",
      localidad: "Aldea Asunción",
      cantidadPersonas: 28,
      institucion: "sarmiento",
      diversidadFuncional: "",
      horaInicio: "2026-08-04T11:00:00",
      horaFin: "2026-08-04T12:00:00",
    },
  ],
  pageIndex: 1,
  pageSize: 3,
};

export async function getGroupVisits(fechaDesde, fechaHasta) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const desde = new Date(fechaDesde);
  const hasta = new Date(fechaHasta);

  return {
    ...groupVisitsResponse,
    items: groupVisitsResponse.items.filter((visit) => {
      const inicio = new Date(visit.horaInicio);
      return inicio >= desde && inicio <= hasta;
    }),
  };
}
