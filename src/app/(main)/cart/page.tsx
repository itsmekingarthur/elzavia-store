import CartItems from "@/components/CartItems";

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="section-title mb-10">سلة الشراء</h1>
      <CartItems />
    </div>
  );
}
