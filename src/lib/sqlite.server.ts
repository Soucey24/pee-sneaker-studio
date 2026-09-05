import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import type { CatalogDatabase } from "@/lib/catalog.server";
import initialSchema from "../../database/migrations/0001_initial_schema.sql?raw";
import seedProducts from "../../database/migrations/0002_seed_products.sql?raw";
import productionTables from "../../database/migrations/0003_production_tables.sql?raw";
import settings from "../../database/migrations/0004_settings.sql?raw";
import buyerAccounts from "../../database/migrations/0005_buyer_accounts.sql?raw";
import recipientDelivery from "../../database/migrations/0006_recipient_delivery.sql?raw";
import carts from "../../database/migrations/0007_carts.sql?raw";
import shippingRates from "../../database/migrations/0008_shipping_rates.sql?raw";

const databasePath = process.env["BIG_PEE_DATABASE_PATH"] ?? (process.env["VERCEL"] ? join("/tmp", "big-pee-kicks.sqlite") : join(process.cwd(), "data", "big-pee-kicks.sqlite"));
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

  nativeDatabase.exec(initialSchema);
  if (isNewDatabase) {
    nativeDatabase.exec(seedProducts);
  }
  nativeDatabase.exec(productionTables);
  nativeDatabase.exec(settings);
  nativeDatabase.exec(buyerAccounts);
  nativeDatabase.exec(recipientDelivery);
  nativeDatabase.exec(carts);
  nativeDatabase.exec(shippingRates);
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