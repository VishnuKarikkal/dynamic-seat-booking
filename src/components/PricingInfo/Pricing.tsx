import DetailedPricing from "../BookingInfo/DetailedPricing";

interface PricingProps {
  onAction: (flag: boolean) => void;
}

const Pricing = (props: PricingProps) => {
  return (
    <div className="border-1 my-3 rounded flex items-center justify-center">
      <DetailedPricing pricing={true} />
      <button
        onClick={() => props.onAction(true)}
        className="my-5 p-1 border-1 text-lg font-extrabold rounded border-emerald-800 text-emerald-600 hover:border-transparent hover:bg-emerald-600 hover:text-white"
      >
        Book Tickets
      </button>
    </div>
  );
};

export default Pricing;
