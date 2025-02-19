import { priceTiers } from "./seats";
import "./seats.css";
import Seats from "../Seat/Seat";

const SeatLayout = () => {
  // Price Tier Info on the left
  const getPriceTiers = () =>
    priceTiers
      .filter((tier) => tier.tierId >= 0)
      .reverse()
      .map((info) => (
        <div
          key={info.tierId}
          className="row-span-5 flex flex-col items-center justify-center font-bold"
        >
          <span className="text-amber-800 text-sm ">
            {info.tierLabel.toUpperCase()}
          </span>
          <span className="text-amber-950 text-sm ">{info.price} $</span>
        </div>
      ));

  return (
    <>
      <h3 className="mb-5 text-5xl font-extrabold text-cyan-500">
        Interactive Seat Booking
      </h3>

      <div className="container py-4 px-6 rounded-4xl border-dashed border-1 border-sky-600 grid grid-cols-8">
        <div className="grid grid-row-12 gap-1">
          {/* Tier Info Column */}
          {getPriceTiers()}
        </div>
        <div className="grid grid-cols-26 grid-rows-13 gap-1 col-span-7">
          {/* Seats layout */}
          {<Seats />}
        </div>
        <div className="grid col-span-9  justify-center ">
          <div className=" w-4 h-4 my-0 border-r-5 border-b-5 transform rotate-45 border-gray-800"></div>
        </div>
      </div>
    </>
  );
};

export default SeatLayout;
