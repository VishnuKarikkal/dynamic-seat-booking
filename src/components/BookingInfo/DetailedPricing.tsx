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
      let label = `${seat.label}${seat.rowLabel}`;
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

  return (
    <>
      <div
        className={`mt-1 font-bold  ${
          props.pricing ? "text-red-400" : "text-gray-700"
        }`}
      >
        {props.pricing ? "Seats Chosen :   " : ""}
        {getTicketDetails().bookedRows}
      </div>

      {props.pricing ? null : (
        <>
          <div className="mt-2 text-sm text-blue-600">
            {getTicketDetails().pricePerTier1}
          </div>
          <div className="mt-2 text-sm text-blue-600">
            {getTicketDetails().pricePerTier2}
          </div>
          <div className="mt-2 text-sm text-blue-600">
            {getTicketDetails().pricePerTier3}
          </div>
        </>
      )}
      <div
        className={`mt-2 text-lg font-bold text-amber-950 ${
          props.pricing ? "mx-3" : ""
        }`}
      >
        Total: {getTicketDetails().Total}
      </div>
    </>
  );
};

export default DetailedPricing;
