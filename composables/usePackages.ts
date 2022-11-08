import type Airport from "@/types/Airport";
import type Flight from "@/types/Flight";
import type Package from "@/types/Package";
import type Search from "@/types/Search";

export default async function usePackages() {
  const search = ref<Search>({ passengers: 1, budget: Infinity, origin: "" });
  const airports: Airport[] = await $fetch("/api/airports");
  const flights: Flight[] = await $fetch("/api/flights");
  const packages = ref<Package[] | []>([]);

  const fetchPackages = (newSearch: Search) => {
    search.value = { ...newSearch, budget: newSearch.budget || Infinity };
    const nuxtApp = useNuxtApp();
    const buildPackage = useBuildPackage();
    // filtramos por origen
    const availablePackages = flights
      .filter(
        (outwardFlight: Flight) => outwardFlight.origin == search.value.origin
      )
      // por cada vuelo de ida obtenemos todos los vuelos de vuelta
      .flatMap((outwardFlight: Flight): Package[] => {
        const outwardFlightDate = nuxtApp.$getDate(outwardFlight.date);
        // obtenemos los posible vuelos de vuelta teniendo en cuenta el vuelo de ida
        const returnsFlight: Flight[] = flights.filter(
          (returnFlight: Flight) => {
            return (
              returnFlight.origin == outwardFlight.destination &&
              returnFlight.destination == search.value.origin &&
              nuxtApp.$getDate(returnFlight.date) > outwardFlightDate
            );
          }
        );
        // retornamos todos los paquetes posibles para este vuelo de ida
        return returnsFlight.map((returnFlight: Flight): Package[] => {
          return buildPackage(
            outwardFlight,
            returnFlight,
            search.value.passengers,
            airports
          );
        });
      });
    // filtramos segun presupuesto y cantidad de pasajeros
    packages.value = filterByBudgetAndPassangers(availablePackages);
  };

  const filterByBudgetAndPassangers = (packages: Package[]) => {
    return packages.filter((pack: Package) => {
      return (
        pack.totalPrice * search.value.passengers <= search.value.budget &&
        pack.availability >= search.value.passengers
      );
    });
  };

  const getPackages = computed<Package[]>(() => {
    return packages.value
      .sort((pack1: Package, pack2: Package) => {
        return pack1.totalPrice - pack2.totalPrice;
      })
      .slice(0, 10);
  });

  return { getPackages, fetchPackages, airports };
}
