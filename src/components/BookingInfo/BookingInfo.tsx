import { useState } from "react";
import movImg from "../../assets/movie.png";
import { useAppStore } from "../../store/store";
import DetailedPricing from "../DetailedPricing/DetailedPricing";

interface BookingInfoProps {
  onBack: (flag: boolean) => void;
}

const BookingInfo = (props: BookingInfoProps) => {
  const selectedSeats = useAppStore((state) => state.selectedSeats);
  const setBookedSeats = useAppStore((state) => state.setBookedSeats);
  const setSelectedSeats = useAppStore((state) => state.setSelectedSeats);
  const bookedSeats = useAppStore((state) => state.bookedSeats);

  const [isBooking, setIsBooking] = useState(false);

  const onBook = () => {
    setIsBooking(true);
    // updating store to mark selected seats as booked
    setBookedSeats([...bookedSeats, ...selectedSeats]);
    // clearing selected seats store
    setSelectedSeats([]);

    setTimeout(() => {
      setIsBooking(false);
      alert("Booked.... Seats confirmed!");
      props.onBack(false);
    }, 4000);
  };

  return (
    <div className={`border-1 rounded flex items-center justify-center `}>
      <img
        className="rounded-lg"
        src={movImg}
        alt={"img"}
        style={{ width: "250px", height: "200px" }}
      />
      <div className="mt-4 mx-2">
        <div className="text-lg underline font-bold text-sky-500">
          Book Tickets
        </div>
        <DetailedPricing pricing={false} />

        <button
          onClick={() => (isBooking ? null : onBook())}
          className="inline-flex items-center my-5 p-1 border-1 font-bold rounded border-emerald-800 text-emerald-600 hover:border-transparent hover:bg-emerald-600 hover:text-white"
        >
          {isBooking ? "Booking in Progress..." : "Pay & Confirm!"}
        </button>
        <button
          onClick={() => (isBooking ? null : props.onBack(false))}
          className="my-5 mx-3 p-1 w-25 border-1 rounded border-red-400 text-red-600 hover:border-transparent hover:bg-red-600 hover:text-white"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default BookingInfo;
