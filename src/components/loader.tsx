"use client";

export default function FullPageLoader({
  title = "Loading",
  subtitle = "Please wait a moment…",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="fixed inset-0 z-[999] bg-white">
      <div className="absolute top-0 left-0 right-0 h-[3px] overflow-hidden">
        <div className="h-full w-[40%] bg-black animate-[loaderbar_1.2s_ease-in-out_infinite]" />
      </div>

      <div className="h-full w-full flex items-center justify-center">
        <div className="w-[520px] px-6">
          <p
            className="text-[12px] tracking-[0.25em] text-gray-500 text-center"
            style={{ letterSpacing: "0.25em" }}
          >
            ACCOUNT
          </p>

          <h2
            className="mt-4 text-center"
            style={{
              fontSize: "46px",
              fontFamily: "serif",
              fontWeight: "100",
              letterSpacing: "1px",
            }}
          >
            {title}
          </h2>

          <p className="mt-3 text-center text-[13px] text-gray-500">
            {subtitle}
          </p>

          <div className="mt-10 flex items-center justify-center">
            <div className="relative w-[64px] h-[64px]">
              <div className="absolute inset-0 rounded-full border border-[#e9e9e9]" />
              <div className="absolute inset-0 rounded-full border border-black border-t-transparent animate-spin" />
              <div className="absolute inset-[10px] rounded-full border border-[#f0f0f0]" />
            </div>
          </div>

          <div className="mt-12 space-y-3">
            <div className="h-[10px] w-[60%] mx-auto rounded bg-[#f3f3f3] animate-pulse" />
            <div className="h-[10px] w-[80%] mx-auto rounded bg-[#f3f3f3] animate-pulse" />
            <div className="h-[10px] w-[50%] mx-auto rounded bg-[#f3f3f3] animate-pulse" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes loaderbar {
          0% {
            transform: translateX(-120%);
          }
          50% {
            transform: translateX(140%);
          }
          100% {
            transform: translateX(140%);
          }
        }
      `}</style>
    </div>
  );
}
