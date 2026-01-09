import { fetchWatchById } from "@/actions/watch";
import ProductClient from "./product-client";
import { getCart } from "@/utils/cart";

function parseIdFromSlug(slug: string) {
  const id = Number(slug.split("-")[0]);
  return Number.isFinite(id) ? id : null;
}

export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const id = parseIdFromSlug(slug);
  if (!id) return <div>Not found</div>;

  const cartRaw = await getCart();
  const watch = await fetchWatchById(id);
  if (!watch) return <div>Not found</div>;

  return <ProductClient watch={watch} cartRaw={cartRaw!} />;
}
