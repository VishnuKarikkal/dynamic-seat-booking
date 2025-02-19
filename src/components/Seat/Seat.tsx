import { seat } from "../SeatLayout/seats";
import { useAppStore } from "../../store/store";
import { Seat } from "./Types";

const Seats = () => {
  const selectedSeats = useAppStore((state) => state.selectedSeats);
  const bookedSeats = useAppStore((state) => state.bookedSeats);

  const setSelectedSeats = useAppStore((state) => state.setSelectedSeats);

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
    if (box.label === box.rowLabel)
      return "border-0  text-amber-950 text-sm font-bold";
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

  const getSeats = () =>
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

  return getSeats();
};

export default Seats;
