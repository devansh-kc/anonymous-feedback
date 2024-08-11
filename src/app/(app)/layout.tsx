import Navbar from "@/components/navbar";
import ThemeConverter from "@/components/ThemeConverter";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col  min-h-screen  ">
      <Navbar />

      {children}
    </div>
  );
}
