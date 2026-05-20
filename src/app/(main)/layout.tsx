import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Leaves from "@/components/Leaves";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Leaves />
      <Header />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
