import { useState } from "react";
import "./App.css";
import Pricing from "./components/PricingInfo/Pricing";
import SeatLayout from "./components/SeatLayout/SeatLayout";
import BookingInfo from "./components/BookingInfo/BookingInfo";
import { useAppStore } from "./store/store";

function App() {
  const selectedSeats = useAppStore((state) => state.selectedSeats);

  const [togglePricingBookingInfo, setTogglePricingBookingInfo] =
    useState(false);

  const proceedToBooking = (flag: boolean) => {
    setTogglePricingBookingInfo(flag);
  };

  return (
    <>
      {!togglePricingBookingInfo ? <SeatLayout /> : null}
      {selectedSeats?.length && !togglePricingBookingInfo ? (
        <Pricing onAction={(flag) => proceedToBooking(flag)} />
      ) : null}
      {togglePricingBookingInfo ? (
        <BookingInfo onBack={(flag) => proceedToBooking(flag)} />
      ) : null}
    </>
  );
}

export default App;
