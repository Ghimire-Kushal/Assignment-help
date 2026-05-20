import { PaymentFlow } from "@/components/dashboard/student/PaymentFlow";

export const metadata = { title: "Checkout — EduNexus AI" };

export default function CheckoutPage() {
  return (
    <div className="max-w-2xl mx-auto py-6">
      <PaymentFlow />
    </div>
  );
}
