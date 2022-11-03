import airports from "@/data/iata.json";
import flights from "@/data/dataset.json";
import type Airport from "@/types/airport";

export default defineEventHandler((event): Airport[] => {
  // retornamos solo los aeropuertos que tienen vuelos
  return airports.filter((airport: Airport) => {
    return flights.some((flight) => flight.origin === airport.IATA);
  });
});
