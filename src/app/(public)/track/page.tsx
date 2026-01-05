import TrackOrderForm from "@/components/track-order-form";

export default function Track() {
  return (
    <div
      className="w-full h-[800px]"
      style={{
        backgroundImage: "url('/track-order.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative h-full w-full flex items-center">
        <div className="absolute left-60">
          <TrackOrderForm />
        </div>
      </div>
    </div>
  );
}
