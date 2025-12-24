import { IWatch } from "@/types/watch.interface";
import Image from "next/image";

interface IProps {
  watch: IWatch;
}

export default function Card({ watch }: IProps) {
  console.log(watch.images[0]);
  return (
    <div className="w-[279px] h-[500px] ">
      <div className="bg-[#f0f0f0] h-[400px] relative overflow-hidden cursor-pointer">
        <Image
          src={watch.images[0]}
          alt="watch"
          fill
          priority
          className="
          object-cover
          transition-transform
          duration-500
          ease-out
          hover:scale-105
          "
        />
      </div>
      <p
        className="text-[10px] mt-5 text-gray cursor-pointer hover:underline"
        style={{
          fontFamily: "serif",
          fontWeight: "100",
          letterSpacing: "2px",
        }}
      >
        {watch.name}
      </p>
      <p
        className="text-[14px] mt-5 cursor-pointer"
        style={{
          fontFamily: "serif",
          fontWeight: "100",
          letterSpacing: "2px",
        }}
      >
        $ {new Intl.NumberFormat("de-DE").format(watch.price)} USD
      </p>
    </div>
  );
}
