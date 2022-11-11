import type Airport from "@/types/Airport";

export default async function useAirports() {
  const { data: airports } = await useFetch("/api/airports");
  const getAirportInfo = (airport: Airport) => {
    return `${airport.PROVINCIA}, ${airport.CIUDAD} - ${airport.AEROPUERTO}`;
  };

  return {
    airports,
    getAirportInfo,
  };
}
