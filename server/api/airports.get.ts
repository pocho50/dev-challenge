import airports from "@/data/iata.json";
import type Airport from "@/types/airport";
export default defineEventHandler((event): Airport[] => {
  return airports;
});