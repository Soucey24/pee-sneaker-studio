import { r as __toESM } from "../_runtime.mjs";
import { t as formatPrice } from "./ssr.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useAuth } from "./auth-kaOw91JT.mjs";
import { n as useOrders } from "./orders-7YVft8mE.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Download, g as RotateCcw, i as Truck, y as Package } from "../_libs/lucide-react.mjs";
import { t as SiteHeader } from "./SiteHeader-zWdi2Yrf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-BJPGI6Mq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/routes/account.tsx?tsr-split=component";
function AccountPage() {
	const { orders, requestReturn, reloadOrders } = useOrders();
	const { buyer } = useAuth();
	const buyerOrders = buyer ? orders : [];
	(0, import_react.useEffect)(() => {
		if (buyer) reloadOrders().catch(() => void 0);
	}, [buyer, reloadOrders]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteHeader, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 22,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
			className: "mx-auto max-w-4xl px-5 pb-20 pt-32",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs uppercase tracking-[0.25em] text-primary",
					children: buyer ? `Welcome, ${buyer.name}` : "Buyer account"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 24,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mt-3 text-5xl leading-none sm:text-6xl",
					children: "Order history"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 27,
					columnNumber: 9
				}, this),
				!buyer ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-10 border-y border-border py-12",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground",
						children: "Sign in to see your orders, track delivery, and request returns."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 29,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/buyer-login",
						className: "ember-fill mt-6 inline-block rounded-md px-5 py-3 font-display text-xs tracking-widest",
						children: "Sign in / register"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 32,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 28,
					columnNumber: 19
				}, this) : buyerOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-10 border-y border-border py-12",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground",
						children: "Your order history will appear here after checkout."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 36,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/shop",
						className: "ember-fill mt-6 inline-block rounded-md px-5 py-3 font-display text-xs tracking-widest",
						children: "Shop the shelf"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 39,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 35,
					columnNumber: 47
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-10 space-y-5",
					children: buyerOrders.map((order) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
						className: "border border-border bg-surface p-5 sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "font-display",
									children: order.id
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 46,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: ["Placed ", new Date(order.placedAt).toLocaleDateString()]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 47,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 45,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-sm text-primary",
									children: order.status
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 51,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 44,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-5 grid gap-3 border-y border-border py-4 text-sm sm:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "flex gap-2 text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Package, { className: "size-4 text-primary" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 55,
												columnNumber: 21
											}, this),
											" ",
											order.lines.length,
											" item(s)"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 54,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "flex gap-2 text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Truck, { className: "size-4 text-primary" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 58,
												columnNumber: 21
											}, this),
											" Arrives",
											" ",
											new Date(order.estimatedDelivery).toLocaleDateString()
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 57,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "font-display text-primary",
										children: formatPrice(order.total)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 61,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 53,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4 flex flex-wrap gap-3",
								children: [order.paymentStatus === "Paid" && order.paymentReference && /* @__PURE__ */ (void 0)("a", {
									href: `/api/orders/${order.id}/receipt?reference=${encodeURIComponent(order.paymentReference)}`,
									className: "inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-xs text-muted-foreground hover:border-primary hover:text-primary",
									children: [/* @__PURE__ */ (void 0)(Download, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 65,
										columnNumber: 23
									}, this), " Download receipt"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 64,
									columnNumber: 80
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									disabled: Boolean(order.returnStatus),
									onClick: () => requestReturn(order.id),
									className: "inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-xs text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-50",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RotateCcw, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 68,
											columnNumber: 21
										}, this),
										" ",
										order.returnStatus ?? "Request return / exchange"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 67,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 63,
								columnNumber: 17
							}, this)
						]
					}, order.id, true, {
						fileName: _jsxFileName,
						lineNumber: 43,
						columnNumber: 39
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 42,
					columnNumber: 20
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 23,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 21,
		columnNumber: 10
	}, this);
}
//#endregion
export { AccountPage as component };
