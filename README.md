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

The app uses a local SQLite database through Node's built-in `node:sqlite`
module. On the first server request, migrations in `database/migrations` are
applied automatically and the database is created at
`data/big-pee-kicks.sqlite`.

To use another location, set `BIG_PEE_DATABASE_PATH` before starting the app.
Uploaded product images are stored in `uploads/products`; keep that directory
on persistent storage and include it in backups.

Paystack checkout uses Ghana cedis. Set `PAYSTACK_SECRET_KEY` in the server
environment before enabling payment initialization. Amounts are stored in cedis
in the app and converted to pesewas for Paystack.

Set `ADMIN_PHONE` to receive Arkesel SMS alerts for successful payments and
shipments. Use a Ghana number such as `0241234567` or `+233241234567`.
