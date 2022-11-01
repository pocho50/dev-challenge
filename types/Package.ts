import type Flight from "./Flight";
export default interface Package {
  outwardFlight: Flight;
  returnFlight: Flight;
  totalPrice: number;
  totalDays: number;
  passengers: number;
  destination: {
    province: string;
    city: string;
    iata: string;
  };
  availability: number;
}
