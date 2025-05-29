import type { Metadata } from "next";
import { quicksand } from "../ui/fonts";

export const metadata: Metadata = {
  title: "Dashboard - Login",
  description: "Access to Antonin's portfolio dashboard",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
        {children}
    </div>
  );
}
