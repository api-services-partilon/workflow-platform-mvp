// import { redirect } from "next/navigation";

// import { getCurrent } from "@/features/auth/queries";
import Checkout from "@/components/checkout";

const CheckoutPage = async () => {
//   const user = await getCurrent();

//   if (user) redirect("/");

  return <Checkout />;
};

export default CheckoutPage;
