import type Airport from "@/types/Airport";
import type Flight from "@/types/Flight";
import type Package from "@/types/Package";

export default function useBuildPackage() {
  const nuxtApp = useNuxtApp();
  // Retornamos el paquete completo vuelo de ida y vuelta
  const getDestination = (
    flight: Flight,
    airports: Airport[]
  ): Package.destination => {
    const airport: Airport = airports.find(
      (airport: Airport) => airport.IATA == flight.destination
    );
    return {
      province: airport.PROVINCIA,
      city: airport.CIUDAD,
      iata: airport.IATA,
    };
  };
  const buildPackage = (
    outwardFlight: Flight,
    returnFlight: Flight,
    passengers: number,
    airports: Airport[]
  ): Package => {
    const outwardFlightDate = nuxtApp.$getDate(outwardFlight.date);
    const returnFlightDate = nuxtApp.$getDate(returnFlight.date);
    return {
      outwardFlight,
      returnFlight,
      totalPrice: parseFloat(
        (outwardFlight.price + returnFlight.price).toFixed(2)
      ),
      totalDays: nuxtApp.$diffDays(outwardFlightDate, returnFlightDate),
      passengers,
      destination: getDestination(outwardFlight, airports),
      availability: Math.min(
        outwardFlight.availability,
        returnFlight.availability
      ),
      id: `${outwardFlight.id}-${returnFlight.id}`,
    };
  };
  return buildPackage;
}
