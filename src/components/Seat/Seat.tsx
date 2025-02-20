import { useAppStore } from "../../store/store";
import { Seat } from "./Types";
import { useEffect, useState } from "react";

const Seats = () => {
  const [dynamicSeats, setDynamicSeats] = useState<Seat[]>([]);

  const selectedSeats = useAppStore((state) => state.selectedSeats);
  const bookedSeats = useAppStore((state) => state.bookedSeats);

  const setSelectedSeats = useAppStore((state) => state.setSelectedSeats);

  useEffect(() => {
    getDynamicSeats();
  }, []);

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

  const getLabel = (row: number, column: number, isBreak: boolean) => {
    // column = 0 : "A"( if row = 0) , 1 : "1", 2 : "2", 3 : "3" ...
    // isBreak ==> "-"

    if (isBreak) return "-";

    switch (row) {
      case 0:
        if (column == 0) return "A";
        break;
      case 1:
        if (column == 0) return "B";
        break;
      case 2:
        if (column == 0) return "C";
        break;
      case 3:
        if (column == 0) return "D";
        break;
      case 4:
        if (column == 0) return "E";
        break;
      case 5:
        if (column == 0) return "F";
        break;
      case 6:
        if (column == 0) return "G";
        break;
      case 7:
        if (column == 0) return "H";
        break;
      case 8:
        if (column == 0) return "I";
        break;
      case 9:
        if (column == 0) return "J";
        break;
      case 10:
        if (column == 0) return "K";
        break;
      case 11:
        if (column == 0) return "L";
        break;
      case 12:
        if (column == 0) return "M";
        break;
      case 13:
        if (column == 0) return "N";
        break;
      case 14:
        if (column == 0) return "O";
        break;
      case 15:
        if (column == 0) return "P";
        break;
      default:
        if (column == 0) return "Q";
    }

    return `${column}`;
  };

  const getDynamicSeats = () => {
    let dynamicRows = [];

    let rows = 13; // number of rows
    let columns = 26; // number of columns
    let id = 0; // for Seat ID
    let breaks = [4, 8, 13]; // row breaks: [4,8,13] ===> break between 3rd and 5th rows(4th), 7th and 9th rows(8th), after 12th row(13th)
    let tierId = 0;
    let rowLabel = "A";

    for (let i = 0; i < rows; i++) {
      // rows
      for (let j = 0; j < columns; j++) {
        // cols
        let tier = tierId; // for keeping track of tierIds
        let row = rowLabel; // for keeping track of Row Labels
        let label = getLabel(i, j, breaks.includes(i + 1)); // gets labels associated with each seat

        if (isNaN(Number(label))) {
          row = rowLabel = label;
        }

        if (breaks.includes(i + 1) && j == 0) {
          tier = tierId;
          tierId += 1;
        }

        dynamicRows.push({
          seatId: id,
          label: label,
          rowLabel: row,
          visible: true,
          tierId: tier,
        });

        id++;
      }
    }

    setDynamicSeats(dynamicRows);
  };

  const getSeats = () =>
    [...dynamicSeats].reverse().map((item) => (
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
