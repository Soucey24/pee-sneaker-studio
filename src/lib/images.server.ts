import { mkdir, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";

const mimeExtensions: Record<string, string> = { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp" };

export async function storeProductImage(id: string, dataUrl: string): Promise<string> {
  const match = dataUrl.match(/^data:(image\/(?:jpeg|png|webp));base64,(.+)$/);
  if (!match) return dataUrl;
  const mimeType = match[1];
  const encoded = match[2];
  if (!mimeType || !encoded) return dataUrl;
  const extension = mimeExtensions[mimeType] ?? extname(mimeType);
  const directory = join(process.cwd(), "uploads", "products");
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, `${id}${extension}`), Buffer.from(encoded, "base64"));
  return `/uploads/products/${id}${extension}`;
}