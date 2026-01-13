import ProfileClient from "./profile-client";
import { getOrdersByUserId } from "@/actions/order";
import { auth } from "@/utils/auth";
import { serializePrisma } from "@/utils/serialize";

export default async function Profile() {
  const session = await auth();
  const userId = session?.user?.id;

  const ordersRaw = userId ? await getOrdersByUserId(userId) : [];
  const orders = serializePrisma(ordersRaw);

  return <ProfileClient orders={orders} />;
}
