"use server";

import prisma from "@/utils/prisma";
import type { IWatch } from "@/types/watch.interface";

export async function fetchWatch(): Promise<IWatch[]> {
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

export async function fetchWatchById(id: number): Promise<IWatch | null> {
  const watch = await prisma.watch.findUnique({ where: { id } });
  if (!watch) return null;

  return {
    id: watch.id.toString(),
    name: watch.name,
    price: watch.price.toNumber(),
    description: watch.description,
    material: watch.material,
    movement: watch.movement,
    waterResistance: watch.waterResistance,
    diameter: watch.diameter,
    size: watch.size,
    images: watch.images,
    tag: watch.tag,
  };
}
