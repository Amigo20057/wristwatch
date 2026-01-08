import { fetchWatchById } from "@/actions/watch";
import ProductClient from "./product-client";
import { getCart } from "@/utils/cart";

export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cartRaw = await getCart();
  const watch = await fetchWatchById(+slug);
  if (!watch) return <div>Not found</div>;
  return <ProductClient watch={watch} cartRaw={cartRaw!} />;
}
