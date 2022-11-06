import flights from "@/data/dataset.json";
import { createError, sendError } from "h3";
import type Flight from "@/types/Flight";

export default defineEventHandler((event): Flight[] => {
  // agregamos un id a cada vuelo
  return flights.map((flight, index) => {
    return {
      ...flight,
      id: index,
    };
  });
});
