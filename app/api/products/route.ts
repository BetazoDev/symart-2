import { products } from "@/lib/data";

export function GET() {
  return Response.json(products);
}
