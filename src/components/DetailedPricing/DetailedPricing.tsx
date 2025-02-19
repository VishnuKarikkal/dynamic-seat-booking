import { useAppStore } from "../../store/store";
import { priceTiers } from "../SeatLayout/seats";

interface DetailedPricingProps {
  pricing: boolean;
}

const DetailedPricing = (props: DetailedPricingProps) => {
  const selectedSeats = useAppStore((state) => state.selectedSeats);

  const getTicketDetails = () => {
    let bookedRows: { "0": string[]; "1": string[]; "2": string[] } = {
      "0": [],
      "1": [],
      "2": [],
    };
    let pricePerTier: string[] = ["", "", ""];

    selectedSeats?.forEach((seat) => {
      let label = `${seat.rowLabel}${seat.label}`;
      if (seat.tierId == 0) bookedRows[0].push(label);
      else if (seat.tierId == 1) bookedRows[1].push(label);
      else bookedRows[2].push(label);
    });

    pricePerTier[0] = `${bookedRows[0].length} * ${priceTiers[1].price}`;
    pricePerTier[1] = `${bookedRows[1].length} * ${priceTiers[2].price}`;
    pricePerTier[2] = `${bookedRows[2].length} * ${priceTiers[3].price}`;

    return {
      bookedRows: [...bookedRows[0], ...bookedRows[1], ...bookedRows[2]].join(
        ", "
      ),
      pricePerTier1: pricePerTier[0],
      pricePerTier2: pricePerTier[1],
      pricePerTier3: pricePerTier[2],
      Total:
        bookedRows[0].length * priceTiers[1].price +
        bookedRows[1].length * priceTiers[2].price +
        bookedRows[2].length * priceTiers[3].price,
    };
  };

  const getSeatsChosen = () => {
    if (props.pricing) {
      return null;
    }

    return (
      <>
        <div className="mt-2 text-sm font-bold text-blue-600">
          <div className="text-emerald-800 inline">Silver : </div>
          {getTicketDetails().pricePerTier1}
        </div>
        <div className="mt-2 text-sm font-bold text-blue-600 ">
          <div className="text-emerald-800 inline">Gold : </div>
          {getTicketDetails().pricePerTier2}
        </div>
        <div className="mt-2 text-sm font-bold text-blue-600">
          <div className="text-emerald-800 inline">Platinum : </div>
          {getTicketDetails().pricePerTier3}
        </div>
      </>
    );
  };

  const getTotalPrice = () => {
    if (props.pricing) {
      return (
        <>
          Total:
          <div className="mx-5 text-sky-500">{getTicketDetails().Total}</div>
        </>
      );
    }

    return (
      <>
        Total:
        <div className=" text-sky-500">{getTicketDetails().Total}</div>
      </>
    );
  };

  return (
    <>
      <div
        className={`mt-1 font-bold  ${props.pricing ? "text-gray-700" : ""}`}
      >
        {props.pricing ? "Seats Chosen :   " : ""}
        <div className={"text-red-400"}>{getTicketDetails().bookedRows}</div>
      </div>

      {getSeatsChosen()}
      <div
        className={`mt-2 text-lg font-bold text-amber-950 ${
          props.pricing ? "mx-3" : ""
        }`}
      >
        {getTotalPrice()}
      </div>
    </>
  );
};

export default DetailedPricing;
