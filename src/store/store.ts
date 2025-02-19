import { create } from "zustand";
import { Seat } from "../components/Seat/Types";

interface AppState {
  bookedSeats: Seat[] | [];
  selectedSeats: Seat[] | [];
  setBookedSeats: (seat: Seat[]) => void;
  setSelectedSeats: (seat: Seat[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  bookedSeats: [],
  selectedSeats: [],
  setBookedSeats: (seatsData: Seat[]) => set({ bookedSeats: seatsData }),
  setSelectedSeats: (seatsData: Seat[]) => set({ selectedSeats: seatsData }),
}));
