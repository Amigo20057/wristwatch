"use client";

import { IWatch } from "@/types/watch.interface";

export default function ProductClient({ watch }: { watch: IWatch }) {
  const handleAddToCart = ({
    id,
    name,
    images,
    price,
  }: Pick<IWatch, "id" | "name" | "images" | "price">) => {};
  return <section className="pt-10 flex flex-col gap-10">{watch.name}</section>;
}
