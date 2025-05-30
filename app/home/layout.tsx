import HeaderLinks from "../ui/home/header-links";
import Footer from "../ui/home/footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex flex-col justify-between min-h-screen">
        <header className="flex flex-row justify-center gap-10 md:gap-30 p-4 border-b-1 border-b-neutral-200">
            <HeaderLinks></HeaderLinks>
        </header>
        {children}
        <Footer></Footer>
      </div>
  );
}
