import { Tier } from "../Seat/Types";

export const breakRows = [
  { seatId: -49, label: "-", rowLabel: "C", visible: true, tierId: -1 },
  { seatId: -48, label: "-", rowLabel: "C", visible: true, tierId: -1 },
];

export const priceTiers: Tier[] = [
  { tierId: -1, tierLabel: "", price: 0 }, // TIER BREAK
  { tierId: 0, tierLabel: "silver", price: 100 },
  { tierId: 1, tierLabel: "gold", price: 150 },
  { tierId: 2, tierLabel: "platinum", price: 200 },
];
