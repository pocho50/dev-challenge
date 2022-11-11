import type Airport from "@/types/Airport";
import type Flight from "@/types/Flight";
import type Package from "@/types/Package";
import useAirports from "@/composables/useAirports";

export default async function useBuildPackage() {
  const { airports } = await useAirports();
  const getDestination = (flight: Flight): Package.destination => {
    const airport: Airport = airports.value.find(
      (airport: Airport) => airport.IATA == flight.destination
    );
    return {
      province: airport.PROVINCIA,
      city: airport.CIUDAD,
      iata: airport.IATA,
    };
  };
  // Retornamos el paquete completo vuelo de ida y vuelta
  const buildPackage = (
    outwardFlight: Flight,
    returnFlight: Flight,
    passengers: number
  ): Package => {
    const nuxtApp = useNuxtApp();
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
      destination: getDestination(outwardFlight),
      availability: Math.min(
        outwardFlight.availability,
        returnFlight.availability
      ),
      id: `${outwardFlight.id}-${returnFlight.id}`,
    };
  };
  return buildPackage;
}
