import Image from "next/image";
import Watches from "@/components/watches";
import ButtonCommonLink from "@/components/button-common-link";
import { ArrowRight } from "lucide-react";

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
            Дизайн
          </h1>
          <p
            className="text-[14px] text-[#c3c5c9] leading-[200%]"
            style={{
              letterSpacing: "2px",
              fontFamily: "serif",
            }}
          >
            У вишуканій тиші міської студії, майстер-дизайнер закладає основу
            для позачасового творіння. Натхненні невимушеною гармонією природи
            та сміливою структурою сучасної архітектури, вони уявляють собі
            годинник, який випромінює елегантність, водночас забезпечуючи
            бездоганну функціональність.
          </p>
        </div>
      </section>
      <Watches titleText="Modern Elegance" type="Best Seller" limit={2} />
      <ButtonCommonLink
        text="Переглянути всі"
        href="/watches"
        customStyles="m-auto mb-5"
      />
      <Watches titleText="Classic " type="Best Seller" limit={2} />
      <ButtonCommonLink
        text="Переглянути всі"
        href="/watches"
        customStyles="m-auto"
      />
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
            Прототипування
          </h1>
          <p
            className="text-[14px] text-[#c3c5c9] leading-[200%]"
            style={{
              letterSpacing: "2px",
              fontFamily: "serif",
            }}
          >
            Маючи в руках макети, досвідчені майстри взялися за створення
            прототипу. Вони обирають високоякісні матеріали — можливо, корпус з
            нержавіючої сталі в поєднанні з сапфіровим склом — щоб втілити
            дизайн в життя.
          </p>
        </div>
      </section>
      <Watches titleText="Elegance " type="Best Seller" limit={4} />
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
            Монтаж і гарантія якості
          </h1>
          <p
            className="text-[14px] text-[#c3c5c9] leading-[200%]"
            style={{
              letterSpacing: "2px",
              fontFamily: "serif",
            }}
          >
            Щойно прототип відповідає суворим стандартам, годинник надходить у
            виробництво. Майстри-годинникарі збирають кожен годинник вручну,
            поєднуючи складний механізм з виготовленим корпусом та ретельно
            скріплюючи циферблат і стрілки.
          </p>
        </div>
      </section>

      <section className="bg-[#2b323f] flex flex-col items-center pt-[20px]">
        <div className="text-center">
          <h1
            className="text-[18px] text-white mb-5"
            style={{
              fontFamily: "serif",
              fontWeight: "400",
              letterSpacing: "3px",
            }}
          >
            Loro Peveriente Emails
          </h1>
          <p
            className="text-[14px] text-[#c3c5c9] leading-[200%]"
            style={{
              letterSpacing: "2px",
              fontFamily: "serif",
            }}
          >
            Отримайте доступ до ексклюзивних пропозицій та кількох секретів час
            від часу.
          </p>
        </div>
        <div className="relative mt-5">
          <input
            type="email"
            placeholder="Email"
            className="
            w-[360px] h-[45px]
            text-white placeholder-[#9fa3a8]
            border border-[#9fa3a8]
            px-6 pr-12
            outline-none focus:ring-0 focus:border-white
            bg-transparent"
          />
          <ArrowRight
            size={18}
            className="
            absolute right-4 top-1/2 -translate-y-1/2
            text-[#9fa3a8]
            cursor-pointer
            transition-colors
            hover:text-white"
          />
        </div>
      </section>
    </div>
  );
}
