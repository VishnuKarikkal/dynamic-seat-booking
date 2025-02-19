import { Seat } from "../Seat/Types";
import { priceTiers, seat } from "./seats";
import "./seats.css";
import { useAppStore } from "../../store/store";

const SeatLayout = () => {
  const selectedSeats = useAppStore((state) => state.selectedSeats);
  const bookedSeats = useAppStore((state) => state.bookedSeats);

  const setSelectedSeats = useAppStore((state) => state.setSelectedSeats);

  // Price Tier Info on the left
  const getPriceTiers = () =>
    priceTiers
      .filter((tier) => tier.tierId >= 0)
      .reverse()
      .map((info) => (
        <div className="row-span-5 flex flex-col items-center justify-center">
          <span className="text-amber-800 text-sm">
            {info.tierLabel.toUpperCase()}
          </span>
          <span className="text-amber-950 text-sm">{info.price} $</span>
        </div>
      ));

  const getCursor = (box: Seat) => {
    if (box.label === "-" || box.label === box.rowLabel) return "none";

    return checkSeatForBooked(box) ? "not-allowed" : "pointer";
  };

  const checkSeatForSelected = (seat: Seat) =>
    selectedSeats?.some((selected) => selected.seatId == seat.seatId);

  const checkSeatForBooked = (seat: Seat) =>
    bookedSeats?.some((selected) => selected.seatId == seat.seatId);

  const getBoxLabelClasses = (box: Seat) => {
    // tier breaks
    if (box.label === "-") return "border-t-1 text-amber-950 text-xs ";
    // row labels
    if (box.label === box.rowLabel) return "border-0  text-amber-950";
    // seats -- check for selected or booked
    if (checkSeatForSelected(box))
      return "border-1 rounded bg-emerald-600 text-white";

    // check for booked
    return checkSeatForBooked(box)
      ? "border-1 rounded bg-gray-300 text-white"
      : "border-1 rounded text-emerald-600  hover:bg-emerald-600 hover:text-white";
  };

  const onSelection = (seat: Seat) => {
    if (checkSeatForSelected(seat)) {
      // removes already selected
      let updateSelectedSeats = selectedSeats?.filter(
        (selSeat) => selSeat.seatId != seat.seatId
      );
      setSelectedSeats(updateSelectedSeats);
    } else {
      // adds newly selected
      // maximum seat selection check
      if (selectedSeats?.length === 8) {
        alert("Sorry, You can select upto 8 Seats!");
      } else {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  //   Seats Layout on the Right
  const getSeatLayout = () =>
    [...seat].reverse().map((item) => (
      <div
        key={item.seatId}
        style={{
          visibility: item.visible ? "visible" : "hidden",
          cursor: `${getCursor(item)}`,
        }}
        className={`seat  flex justify-center ${getBoxLabelClasses(item)} `}
        onClick={() => (checkSeatForBooked(item) ? "" : onSelection(item))}
      >
        {item.label != "-" ? item.label : ""}
      </div>
    ));

  return (
    <>
      <h3 className="my-5 text-5xl font-extrabold text-cyan-500">
        Interactive Seat Booking...
      </h3>

      <div className="grid grid-cols-8">
        <div className="grid grid-row-12 gap-1">
          {/* Tier Info Column */}
          {getPriceTiers()}
        </div>
        <div className="grid grid-cols-26 grid-rows-13 gap-1 col-span-7">
          {/* Seats layout */}
          {getSeatLayout()}
        </div>
      </div>
    </>
  );
};

export default SeatLayout;
