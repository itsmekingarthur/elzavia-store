import CartItems from "@/components/CartItems";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-950 via-primary-900 to-primary-950">
      <div className="absolute inset-0 bg-forest pointer-events-none" />
      <div className="container mx-auto px-4 py-12 relative z-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-10">سلة الشراء</h1>
        <CartItems />
      </div>
    </div>
  );
}
