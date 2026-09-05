import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import type { CatalogDatabase } from "@/lib/catalog.server";

const databasePath = process.env["BIG_PEE_DATABASE_PATH"] ?? join(process.cwd(), "data", "big-pee-kicks.sqlite");
let database: CatalogDatabase | undefined;

type NativeDatabase = {
  exec(sql: string): void;
  prepare(sql: string): {
    all(...parameters: unknown[]): unknown[];
    run(...parameters: unknown[]): void;
  };
};

function createDatabase(): CatalogDatabase {
  mkdirSync(dirname(databasePath), { recursive: true });
  const nativeDatabase = new DatabaseSync(databasePath) as unknown as NativeDatabase;
  const isNewDatabase = !existsSync(databasePath);

  nativeDatabase.exec(readFileSync(join(process.cwd(), "database/migrations/0001_initial_schema.sql"), "utf8"));
  if (isNewDatabase) {
    nativeDatabase.exec(readFileSync(join(process.cwd(), "database/migrations/0002_seed_products.sql"), "utf8"));
  }
  nativeDatabase.exec(readFileSync(join(process.cwd(), "database/migrations/0003_production_tables.sql"), "utf8"));
  nativeDatabase.exec(readFileSync(join(process.cwd(), "database/migrations/0004_settings.sql"), "utf8"));
  nativeDatabase.exec(readFileSync(join(process.cwd(), "database/migrations/0005_buyer_accounts.sql"), "utf8"));
  nativeDatabase.exec(readFileSync(join(process.cwd(), "database/migrations/0007_carts.sql"), "utf8"));
  nativeDatabase.exec(readFileSync(join(process.cwd(), "database/migrations/0008_shipping_rates.sql"), "utf8"));
  const orderColumns = nativeDatabase.prepare("PRAGMA table_info(orders)").all() as Array<{ name: string }>;
  const existingColumns = new Set(orderColumns.map((column) => column.name));
  for (const column of ["recipient_name", "recipient_phone", "recipient_address", "recipient_city", "recipient_country"]) {
    if (!existingColumns.has(column)) nativeDatabase.exec(`ALTER TABLE orders ADD COLUMN ${column} TEXT`);
  }

  return {
    prepare(query) {
      const statement = nativeDatabase.prepare(query);
      return {
        bind(...values) {
          return {
            async all<T>() {
              return { results: statement.all(...values) as T[] };
            },
            async run() {
              statement.run(...values);
            },
          };
        },
      };
    },
  };
}

export function getLocalDatabase(): CatalogDatabase {
  database ??= createDatabase();
  return database;
}