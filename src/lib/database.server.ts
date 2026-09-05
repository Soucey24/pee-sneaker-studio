import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { CatalogDatabase } from "@/lib/catalog.server";

let database: CatalogDatabase | undefined;

function createSupabaseDatabase(url: string, serviceRoleKey: string): CatalogDatabase {
  const client = createClient(url, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const toPostgresQuery = (query: string) => {
    let parameter = 0;
    return query.replace(/\?/g, () => `$${++parameter}`);
  };

  return {
    prepare(query) {
      return {
        bind(...values) {
          return {
            async all<T>() {
              const { data, error } = await execute(client, toPostgresQuery(query), values, true);
              if (error) throw error;
              return { results: (data ?? []) as T[] };
            },
            async run() {
              const { error } = await execute(client, toPostgresQuery(query), values, false);
              if (error) throw error;
            },
          };
        },
      };
    },
  };
}

async function execute(client: SupabaseClient, query: string, values: unknown[], read: boolean) {
  const result = await client.rpc("execute_app_sql", { query_text: query, query_params: JSON.parse(JSON.stringify(values)), return_rows: read });
  return { data: result.data as unknown, error: result.error };
}

export function getDatabase(): CatalogDatabase {
  const url = process.env["SUPABASE_URL"];
  const serviceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  if (!url || !serviceRoleKey || url.startsWith("your_") || serviceRoleKey.startsWith("your_")) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
  }
  database ??= createSupabaseDatabase(url, serviceRoleKey);
  return database;
}
