import { getProduct } from "@/lib/data";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const product = getProduct(slug);
  if (!product) return Response.json({ error: "No encontrado" }, { status: 404 });
  return Response.json(product);
}
