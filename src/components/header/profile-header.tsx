"use client";

export default function ProfileHeader({
  handleLogout,
}: {
  handleLogout: () => void;
}) {
  return (
    <div className="w-full border-b border-[#eeeeee]">
      <div className="w-[1100px] mx-auto py-10 flex items-end justify-between">
        <div>
          <p
            className="text-[12px] tracking-[0.25em] text-gray-500"
            style={{ letterSpacing: "0.25em" }}
          >
            АКАУНТ
          </p>
          <h1
            className="mt-3"
            style={{
              fontSize: "53px",
              fontFamily: "serif",
              fontWeight: "100",
            }}
          >
            Профіль
          </h1>
        </div>

        <button
          onClick={handleLogout}
          className="h-[44px] px-6 border border-black text-[12px] tracking-[0.2em] hover:bg-black hover:text-white transition-colors"
        >
          ВИЙТИ
        </button>
      </div>
    </div>
  );
}
