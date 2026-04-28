export type Flight = {
  id: string;
  aoc: string;
  flightNumber: string;
  origin: string;
  destination: string;
  std: string;
  sta: string;
  daysOfOperation: number[];
  bodyType: "narrow_body" | "wide_body";
  startDate: string;
  endDate: string;
  status: "Active" | "Inactive";
};