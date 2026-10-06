import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Symart | Muebles de oficina a tu medida",
};

export default function Page() {
  return <HomePage />;
}
