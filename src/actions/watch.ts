"use server";

import prisma from "@/utils/prisma";
import type { IWatch } from "@/types/watch.interface";

export default async function fetchWatch(): Promise<IWatch[]> {
  const watches = await prisma.watch.findMany();

  return watches.map((w) => ({
    id: w.id.toString(),
    name: w.name,
    price: w.price.toNumber(),
    description: w.description,
    material: w.material,
    movement: w.movement,
    waterResistance: w.waterResistance,
    diameter: w.diameter,
    size: w.size,
    images: w.images,
    tag: w.tag,
  }));
}
