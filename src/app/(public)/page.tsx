import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full">
      <section className="h-[720px] w-full relative flex items-center justify-center">
        <Image
          src="/main-img.png"
          alt="main img"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute text-center text-white">
          <h1
            className="text-[32px]"
            style={{
              fontFamily: "serif",
              fontWeight: "100",
              letterSpacing: "5px",
            }}
          >
            Time, Reimagined.
          </h1>
          <h3 className="text-white/70">BUY ONCE, WEAR FOREVER.</h3>
        </div>
      </section>
      <section></section>
    </div>
  );
}
