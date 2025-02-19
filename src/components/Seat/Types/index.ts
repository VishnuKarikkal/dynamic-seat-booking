export type Seat = {
  seatId: number; //0000, 0001, 0002, 0003
  rowLabel: string; //A, B, C, D, E
  label: string; //1, 2, 3, 4, 5
  tierId: number; // "Silver", "Gold", "Platinum"
  visible: boolean;
};

export type Tier = {
  tierId: number;
  tierLabel: string;
  price: number;
};
