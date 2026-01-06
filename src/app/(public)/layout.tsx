import Header from "@/components/header/header";
import "../globals.css";
import Footer from "@/components/footer";
import CurrencyProviderServer from "@/hoc/currency-server";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <CurrencyProviderServer>
        <Header />
        {children}
        <Footer />
      </CurrencyProviderServer>
    </div>
  );
}
