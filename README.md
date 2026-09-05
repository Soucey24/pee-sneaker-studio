# Big Pee's Sneaker Studio

i want to design a website for a shoes and sneakers business where people shop there like a shop.. the name of the owner is Big Pee.... i want a nice designs with animation and 3d. want nice ui too and mobile responsive

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Backend

The app uses Supabase Postgres for all database reads and writes. Run
`supabase/schema.sql` in the Supabase SQL Editor before starting the app and
configure `SUPABASE_DATABASE_URL` in local development and Vercel.

Paystack checkout uses Ghana cedis. Set `PAYSTACK_SECRET_KEY` in the server
environment before enabling payment initialization. Amounts are stored in cedis
in the app and converted to pesewas for Paystack.

Set `ADMIN_PHONE` to receive Arkesel SMS alerts for successful payments and
shipments. Use a Ghana number such as `0241234567` or `+233241234567`.

## Supabase production storage

Create a public Storage bucket named `product-images` in Supabase. Then set
these server-only variables in Vercel:

```text
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_STORAGE_BUCKET=product-images
```

Use the **Session pooler** connection string from Supabase Project Settings ->
Database. It normally looks like this:

```text
postgresql://postgres.<project-ref>:PASSWORD@aws-0-<region>.pooler.supabase.com:5432/postgres
```

Do not use the direct `db.<project-ref>.supabase.co` host. It may not resolve
from Node or Vercel networking. URL-encode special password characters such as
`@` as `%40`.

Admin product images upload to Supabase Storage when these variables are set.
Never expose `SUPABASE_SERVICE_ROLE_KEY` through a `VITE_*` variable or client code.
The schema also creates a private `execute_app_sql` function used only by the
server adapter with the service-role key.

### Supabase tables used by the app

The application stores data in `products`, `product_sizes`, `customers`,
`orders`, `order_items`, `returns`, `admin_users`, `admin_sessions`,
`buyer_accounts`, `buyer_sessions`, `carts`, `cart_items`, `notifications`,
`store_settings`, and `shipping_rates`. `product_images` is reserved for future
multi-image support; current products use `products.image_url` with the
Supabase Storage URL.

### Notification and SMS timing

- When checkout starts, the admin receives an in-app notification that the order is awaiting payment. No SMS is sent yet.
- After Paystack verification or a successful Paystack webhook, the buyer/recipient and admin receive SMS. The admin also receives an in-app payment-confirmed notification.
- When an admin marks an order as shipped, the buyer/recipient and admin receive SMS and the admin receives an in-app shipped notification.
- When a buyer requests a return, the admin receives a detailed in-app notification. No SMS is sent for the request itself.
- When an admin approves or rejects a return, the buyer/recipient receives SMS and the admin receives an in-app decision notification.
- Buyer registration, login, pending payments, failed payments, delivered status, cancelled status, and refunds do not currently send SMS.

SMS is sent only when `ARKESEL_API_KEY` is configured and the stored Ghana phone
number is valid. Delivery acceptance by Arkesel does not guarantee handset
delivery; provider balance, sender ID, and network delivery still apply.
