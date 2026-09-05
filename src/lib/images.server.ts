import { mkdir, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";

const mimeExtensions: Record<string, string> = { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp" };

function supabaseStorageConfig() {
  const url = process.env["SUPABASE_URL"];
  const serviceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  if (!url || !serviceRoleKey || url.startsWith("your_")) return null;
  return {
    url: url.replace(/\/$/, ""),
    serviceRoleKey,
    bucket: process.env["SUPABASE_STORAGE_BUCKET"] ?? "product-images",
  };
}

async function ensurePublicBucket(storage: { url: string; serviceRoleKey: string; bucket: string }) {
  const bucketUrl = `${storage.url}/storage/v1/bucket/${storage.bucket}`;
  const headers = {
    apikey: storage.serviceRoleKey,
    Authorization: `Bearer ${storage.serviceRoleKey}`,
    "Content-Type": "application/json",
  };

  const existing = await fetch(bucketUrl, { headers });
  if (existing.status === 404) {
    const create = await fetch(`${storage.url}/storage/v1/bucket`, {
      method: "POST",
      headers,
      body: JSON.stringify({ name: storage.bucket, public: true, allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"] }),
    });
    if (!create.ok) {
      const details = await create.text().catch(() => "");
      throw new Error(`Supabase bucket creation failed (${create.status})${details ? `: ${details}` : ""}`);
    }
    return;
  }

  if (existing.ok) {
    const bucket = await existing.json().catch(() => null) as { public?: boolean } | null;
    if (bucket && bucket.public === false) {
      const update = await fetch(bucketUrl, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ public: true, allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"] }),
      });
      if (!update.ok) {
        const details = await update.text().catch(() => "");
        throw new Error(`Supabase bucket public access update failed (${update.status})${details ? `: ${details}` : ""}`);
      }
    }
  }
}

export async function storeProductImage(id: string, dataUrl: string): Promise<string> {
  const match = dataUrl.match(/^data:(image\/(?:jpeg|png|webp));base64,(.+)$/);
  if (!match) return dataUrl;
  const mimeType = match[1];
  const encoded = match[2];
  if (!mimeType || !encoded) return dataUrl;
  const extension = mimeExtensions[mimeType] ?? extname(mimeType);
  const storage = supabaseStorageConfig();
  if (storage) {
    await ensurePublicBucket(storage);
    const objectPath = `products/${id}${extension}`;
    const upload = await fetch(`${storage.url}/storage/v1/object/${storage.bucket}/${objectPath}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${storage.serviceRoleKey}`,
        apikey: storage.serviceRoleKey,
        "Content-Type": mimeType,
        "x-upsert": "true",
      },
      body: Buffer.from(encoded, "base64"),
    });
    if (!upload.ok) throw new Error(`Supabase image upload failed (${upload.status})`);
    return `${storage.url}/storage/v1/object/public/${storage.bucket}/${objectPath}`;
  }
  const directory = join(process.cwd(), "uploads", "products");
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, `${id}${extension}`), Buffer.from(encoded, "base64"));
  return `/uploads/products/${id}${extension}`;
}