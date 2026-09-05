import type { CatalogProduct } from "@/data/products";

export interface CatalogDatabase {
  prepare(query: string): {
    bind(...values: unknown[]): {
      all<T>(): Promise<{ results: T[] }>;
      run(): Promise<void>;
    };
  };
}

type ProductRow = {
  id: string;
  category: CatalogProduct["category"];
  name: string;
  tag: string;
  price: number;
  image_url: string;
  description: string;
  popularity: number;
  created_at: string;
  sizes: string | null;
  stock: number | null;
};

export async function listActiveProducts(database: CatalogDatabase): Promise<CatalogProduct[]> {
  const { results } = await database
    .prepare(
      `SELECT p.id, p.category, p.name, p.tag, p.price, p.image_url, p.description,
              p.popularity, p.created_at,
              GROUP_CONCAT(ps.size) AS sizes,
              COALESCE(MAX(ps.stock), 0) AS stock
       FROM products p
       LEFT JOIN product_sizes ps ON ps.product_id = p.id
       WHERE p.status = ?
       GROUP BY p.id
       ORDER BY p.created_at DESC`,
    )
    .bind("Active")
    .all<ProductRow>();

  return results.map((product) => ({
    id: product.id,
    category: product.category,
    name: product.name,
    tag: product.tag,
    price: product.price,
    image: product.image_url,
    sizes: product.sizes ? product.sizes.split(",").map(Number) : [],
    description: product.description,
    popularity: product.popularity,
    createdAt: product.created_at,
    stock: product.stock ?? 0,
    status: "Active",
  }));
}

export async function createProduct(database: CatalogDatabase, product: CatalogProduct): Promise<void> {
  const now = new Date().toISOString();
  await database.prepare(
    `INSERT INTO products (id, category, name, tag, price, image_url, description, popularity, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).bind(product.id, product.category, product.name, product.tag, product.price, product.image, product.description, product.popularity, product.status, product.createdAt, now).run();
  for (const size of product.sizes) {
    await database.prepare("INSERT INTO product_sizes (product_id, size, stock) VALUES (?, ?, ?)").bind(product.id, size, product.stock).run();
  }
}

export async function updateProduct(database: CatalogDatabase, product: CatalogProduct): Promise<void> {
  await database.prepare(
    `UPDATE products SET category = ?, name = ?, tag = ?, price = ?, image_url = ?, description = ?, popularity = ?, status = ?, updated_at = ? WHERE id = ?`,
  ).bind(product.category, product.name, product.tag, product.price, product.image, product.description, product.popularity, product.status, new Date().toISOString(), product.id).run();
  await database.prepare("DELETE FROM product_sizes WHERE product_id = ?").bind(product.id).run();
  for (const size of product.sizes) {
    await database.prepare("INSERT INTO product_sizes (product_id, size, stock) VALUES (?, ?, ?)").bind(product.id, size, product.stock).run();
  }
}

export async function deleteProduct(database: CatalogDatabase, id: string): Promise<void> {
  await database
    .prepare("UPDATE products SET status = 'Archived', updated_at = ? WHERE id = ?")
    .bind(new Date().toISOString(), id)
    .run();
}