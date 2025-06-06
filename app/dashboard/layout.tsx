import SideNav from "@/components/ui/dashboard/sidenav";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow md:overflow-y-auto px-8 md:px-12 pt-16">{children}</div>
    </div>
  );
}
