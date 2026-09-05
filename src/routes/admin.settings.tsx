import { createFileRoute } from "@tanstack/react-router";
import { Save, Store, Truck, Tag, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/AdminGuard";
import { AdminSidebar } from "@/components/AdminSidebar";
import { useAuth } from "@/context/auth";
import { AdminPasswordForm } from "@/components/AdminPasswordForm";
import { toast } from "sonner";

type Settings = {
  storeName: string;
  email: string;
  standardShipping: string;
  expressShipping: string;
  freeDeliveryThreshold: string;
  promoCode: string;
  promoDiscount: string;
  adminPhone: string;
};
type ShippingRate = { location: string; standard: number; express: number };
const initialSettings: Settings = {
  storeName: "Big Pee Kicks",
  email: "hello@bigpeekicks.com",
  standardShipping: "12",
  expressShipping: "28",
  freeDeliveryThreshold: "200",
  promoCode: "BIGPEE10",
  promoDiscount: "10",
  adminPhone: "",
};
export const Route = createFileRoute("/admin/settings")({ component: AdminSettingsPage });
function AdminSettingsPage() {
  const { isAdmin, adminName } = useAuth();
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [saved, setSaved] = useState(false);
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
  useEffect(() => { if (!isAdmin) return; void Promise.all([fetch("/api/admin/settings"), fetch("/api/admin/shipping-rates")]).then(async ([settingsResponse, ratesResponse]) => { if (!settingsResponse.ok || !ratesResponse.ok) throw new Error(`Settings load failed (${settingsResponse.status}/${ratesResponse.status})`); setSettings(await settingsResponse.json() as Settings); setShippingRates(await ratesResponse.json() as ShippingRate[]); }).catch((error) => toast.error(error instanceof Error ? error.message : "Settings could not be loaded")); }, [isAdmin]);
  if (!isAdmin) return <AdminGuard />;
  const update = (key: keyof Settings, value: string) =>
    setSettings((current) => ({ ...current, [key]: value }));
  const save = (event: React.FormEvent) => {
    event.preventDefault();
    void Promise.all([fetch("/api/admin/settings", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(settings) }), fetch("/api/admin/shipping-rates", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(shippingRates) })]).then(([settingsResponse, ratesResponse]) => { if (!settingsResponse.ok || !ratesResponse.ok) throw new Error(`Settings save failed (${settingsResponse.status}/${ratesResponse.status})`); setSaved(true); toast.success("Settings saved"); }).catch((error) => toast.error(error instanceof Error ? error.message : "Settings could not be saved"));
  };
  return (
    <AdminGuard>
      <div className="min-h-screen bg-background">
        <AdminSidebar />
        <main className="lg:ml-64">
          <div className="mx-auto max-w-4xl px-5 pb-20 pt-8">
            <div className="border-b border-border pb-8">
              <p className="text-xs uppercase tracking-[0.25em] text-primary">
                Admin / Configuration
              </p>
              <h1 className="mt-3 text-5xl leading-none sm:text-6xl">Settings</h1>
              <p className="mt-4 text-muted-foreground">
                Manage store preferences for the frontend prototype.
              </p>
            </div>
            <div className="mt-8">
              <AdminPasswordForm />
            </div>
            <form onSubmit={save} className="mt-8 space-y-5">
              <section className="border border-border bg-surface p-5 sm:p-6">
                <h2 className="flex items-center gap-2 font-display text-lg">
                  <Store className="size-4 text-primary" /> Store information
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="text-sm text-muted-foreground">
                    Store name
                    <input
                      value={settings.storeName}
                      onChange={(event) => update("storeName", event.target.value)}
                      className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </label>
                  <label className="text-sm text-muted-foreground">
                    Support email
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(event) => update("email", event.target.value)}
                      className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </label>
                  <label className="text-sm text-muted-foreground">
                    Admin SMS phone
                    <input
                      type="tel"
                      value={settings.adminPhone}
                      onChange={(event) => update("adminPhone", event.target.value)}
                      placeholder="0241234567"
                      className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </label>
                </div>
              </section>
              <section className="border border-border bg-surface p-5 sm:p-6"><h2 className="flex items-center gap-2 font-display text-lg"><Truck className="size-4 text-primary" /> Delivery by location</h2><div className="mt-5 space-y-4">{shippingRates.map((rate, index) => <div key={rate.location} className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr]"><label className="text-sm text-muted-foreground">Location<input value={rate.location} onChange={(event) => setShippingRates((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, location: event.target.value } : item))} className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-foreground" /></label><label className="text-sm text-muted-foreground">Standard GHS<input type="number" min="0" value={rate.standard} onChange={(event) => setShippingRates((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, standard: Number(event.target.value) } : item))} className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-foreground" /></label><label className="text-sm text-muted-foreground">Express GHS<input type="number" min="0" value={rate.express} onChange={(event) => setShippingRates((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, express: Number(event.target.value) } : item))} className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-foreground" /></label></div>)}</div></section>
              <section className="border border-border bg-surface p-5 sm:p-6">
                <h2 className="flex items-center gap-2 font-display text-lg">
                  <Truck className="size-4 text-primary" /> Shipping rates
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="text-sm text-muted-foreground">
                    Standard delivery
                    <input
                      type="number"
                      min="0"
                      value={settings.standardShipping}
                      onChange={(event) => update("standardShipping", event.target.value)}
                      className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </label>
                  <label className="text-sm text-muted-foreground">
                    Express delivery
                    <input
                      type="number"
                      min="0"
                      value={settings.expressShipping}
                      onChange={(event) => update("expressShipping", event.target.value)}
                      className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </label>
                  <label className="text-sm text-muted-foreground">
                    Free delivery threshold
                    <input
                      type="number"
                      min="0"
                      value={settings.freeDeliveryThreshold}
                      onChange={(event) => update("freeDeliveryThreshold", event.target.value)}
                      className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </label>
                </div>
              </section>
              <section className="border border-border bg-surface p-5 sm:p-6">
                <h2 className="flex items-center gap-2 font-display text-lg">
                  <Tag className="size-4 text-primary" /> Promo code
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="text-sm text-muted-foreground">
                    Code
                    <input
                      value={settings.promoCode}
                      onChange={(event) => update("promoCode", event.target.value.toUpperCase())}
                      className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </label>
                  <label className="text-sm text-muted-foreground">
                    Discount percentage
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={settings.promoDiscount}
                      onChange={(event) => update("promoDiscount", event.target.value)}
                      className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </label>
                </div>
              </section>
              <section className="border border-border bg-surface p-5 sm:p-6">
                <h2 className="flex items-center gap-2 font-display text-lg">
                  <UserRound className="size-4 text-primary" /> Admin profile
                </h2>
                <p className="mt-5 text-sm text-muted-foreground">
                  Signed in as <span className="text-foreground">{adminName}</span>
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Authentication settings will move to the backend.
                </p>
              </section>
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="ember-fill inline-flex items-center gap-2 rounded-md px-5 py-3 font-display text-xs tracking-widest"
                >
                  <Save className="size-4" /> Save settings
                </button>
                {saved && (
                  <span className="text-sm text-primary" role="status">
                    Settings saved
                  </span>
                )}
              </div>
            </form>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
