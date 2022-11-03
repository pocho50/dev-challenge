import airports from "@/data/iata.json";
import flights from "@/data/dataset.json";
import { createError, sendError } from "h3";
import type Airport from "@/types/Airport";
import type Flight from "@/types/Flight";
import type Package from "@/types/Package";
import type Search from "@/types/Search";

export default defineEventHandler((event): Package[] => {
  const query = getQuery(event);
  if (!query.origin) {
    return error(event, "origin required");
  }
  const origin: string = query.origin;
  const budget: number = query.budget || Infinity;
  const passengers: number = query.passengers || 1;

  const allFlights: Flight[] = addFlightId(flights);
  const availablePackages: Package[] = allFlights
    // filtramos por origen
    .filter((outwardFlight: Flight) => outwardFlight.origin == origin)
    // por cada vuelo de ida obtenemos todos los vuelos de vuelta
    .flatMap((outwardFlight: Flight): Package[] => {
      const outwardFlightDate = new Date(outwardFlight.date);

      // obtenemos los posible vuelos de vuelta teniendo en cuenta el vuelo de ida
      const returnsFlight: Flight[] = allFlights.filter(
        (returnFlight: Flight) =>
          returnFlight.origin == outwardFlight.destination &&
          returnFlight.destination == origin &&
          new Date(returnFlight.date) > outwardFlightDate
      );
      // retornamos todos los paquetes posibles para este vuelo de ida
      return returnsFlight.map((returnFlight: Flight): Package[] => {
        return getPackage(outwardFlight, returnFlight, passengers);
      });
    });

  // filtramos segun presupuesto y cantidad de pasajeros
  return filterByBudgetAndPassangers(availablePackages, budget, passengers);
});

function error(event, msg) {
  sendError(
    event,
    createError({
      statusCode: 400,
      data: msg,
    })
  );
}

function addFlightId(flights): Flight[] {
  return flights.map((flight, index) => {
    return {
      ...flight,
      id: index,
    };
  });
}

function diffDays(outwardFlightDate: Date, returnFlightDate: Date): number {
  return Math.ceil(
    (returnFlightDate.getTime() - outwardFlightDate.getTime()) /
      (1000 * 3600 * 24)
  );
}

function getDestination(flight: Flight): Package.destination {
  const airport: Airport = airports.find(
    (airport: Airport) => airport.IATA == flight.destination
  );
  return {
    province: airport.PROVINCIA,
    city: airport.CIUDAD,
    iata: airport.IATA,
  };
}

function getPackage(
  outwardFlight: Flight,
  returnFlight: Flight,
  passengers: number
): Package {
  /*
    Retornamos el paquete completo vuelo de ida y vuelta
  */
  const outwardFlightDate = new Date(outwardFlight.date);
  const returnFlightDate = new Date(returnFlight.date);
  return {
    outwardFlight,
    returnFlight,
    totalPrice: parseFloat(
      (outwardFlight.price + returnFlight.price).toFixed(2)
    ),
    totalDays: diffDays(outwardFlightDate, returnFlightDate),
    passengers,
    destination: getDestination(outwardFlight),
    availability: Math.min(
      outwardFlight.availability,
      returnFlight.availability
    ),
    id: `${outwardFlight.id}-${returnFlight.id}`,
  };
}

function filterByBudgetAndPassangers(
  packages: Package[],
  budget: number,
  passengers: number
) {
  return packages.filter(
    (pack: Package) =>
      pack.totalPrice * passengers <= budget && pack.availability >= passengers
  );
}
