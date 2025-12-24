import Image from "next/image";
import Watches from "../../components/watches";
import ButtonCommonLink from "@/components/button-common-link";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <section className="h-[720px] w-full relative flex items-center justify-center mb-[36px]">
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
      <Watches
        titleText="Best Sellers"
        subText="Impress at a glance."
        type="Best Seller"
        limit={4}
      />
      <section className="w-[1200px] m-auto min-h-[400px] flex items-center relative pt-0 pl-[30px] pr-[30px] mb-5">
        <Image
          src="/design.png"
          alt="design"
          width={546}
          height={351}
          className="shrink-0 border border-[#000]"
        />
        <div className="w-[600px] bg-[#2b323f] p-[60px] absolute right-9">
          <h1
            className="text-[25px] text-white mb-5"
            style={{
              fontFamily: "serif",
              fontWeight: "100",
              letterSpacing: "3px",
            }}
          >
            Design
          </h1>
          <p
            className="text-[14px] text-[#c3c5c9] leading-[200%]"
            style={{
              letterSpacing: "2px",
              fontFamily: "serif",
            }}
          >
            In the refined quiet of a city studio, a master designer lays the
            foundation for a timeless creation. Inspired by the effortless
            harmony of nature and the bold structure of modern architecture,
            they envision a watch that exudes elegance while delivering
            impeccable function.
          </p>
        </div>
      </section>
      <Watches titleText="Modern Elegance" type="Best Seller" limit={2} />
      <ButtonCommonLink text="View all" href="/watches" customStyles="m-auto" />
      <Watches titleText="Classic " type="Best Seller" limit={2} />
      <ButtonCommonLink text="View all" href="/watches" customStyles="m-auto" />
      <section className="w-[1200px] m-auto min-h-[400px] flex items-center relative pt-0 pl-[30px] pr-[30px] mb-5 mt-20">
        <Image
          src="/prototyping.png"
          alt="design"
          width={546}
          height={351}
          className="shrink-0 border "
        />
        <div className="w-[600px] bg-[#2b323f] p-[60px] absolute right-9">
          <h1
            className="text-[25px] text-white mb-5"
            style={{
              fontFamily: "serif",
              fontWeight: "100",
              letterSpacing: "3px",
            }}
          >
            Prototyping
          </h1>
          <p
            className="text-[14px] text-[#c3c5c9] leading-[200%]"
            style={{
              letterSpacing: "2px",
              fontFamily: "serif",
            }}
          >
            With designs in hand, skilled artisans set to work crafting a
            prototype. They select premium materials—perhaps a stainless steel
            case paired with a sapphire crystal face—to bring the design to
            life.
          </p>
        </div>
      </section>
    </div>
  );
}
