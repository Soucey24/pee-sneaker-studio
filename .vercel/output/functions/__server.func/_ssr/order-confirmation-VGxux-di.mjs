import { r as __toESM } from "../_runtime.mjs";
import { t as formatPrice } from "./ssr.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useOrders } from "./orders-7YVft8mE.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as Check, i as Truck, y as Package } from "../_libs/lucide-react.mjs";
import { t as SiteHeader } from "./SiteHeader-zWdi2Yrf.mjs";
import { t as Route } from "./order-confirmation-D4s3xEzw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order-confirmation-VGxux-di.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/routes/order-confirmation.tsx?tsr-split=component";
function OrderConfirmationPage() {
	const { orderId } = Route.useSearch();
	const { orders } = useOrders();
	const order = orders.find((item) => item.id === orderId) ?? orders[0];
	const [paymentState, setPaymentState] = (0, import_react.useState)("checking");
	(0, import_react.useEffect)(() => {
		const reference = new URLSearchParams(window.location.search).get("reference") ?? new URLSearchParams(window.location.search).get("trxref");
		if (!reference) {
			setPaymentState(order ? "paid" : "failed");
			return;
		}
		fetch("/api/payments/paystack/verify", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ reference })
		}).then((response) => {
			setPaymentState(response.ok ? "paid" : "failed");
		}).catch(() => setPaymentState("failed"));
	}, [order]);
	if (!order && paymentState === "checking") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background text-muted-foreground",
		children: "Verifying payment..."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 35,
		columnNumber: 53
	}, this);
	if (!order && paymentState === "paid") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteHeader, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 36,
			columnNumber: 93
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
			className: "mx-auto max-w-3xl px-5 pb-20 pt-36 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-8" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 36,
						columnNumber: 286
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 36,
					columnNumber: 172
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-6 text-xs uppercase tracking-[0.25em] text-primary",
					children: "Payment received"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 36,
					columnNumber: 320
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mt-3 text-5xl leading-none",
					children: "Order confirmed"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 36,
					columnNumber: 409
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mx-auto mt-5 max-w-md text-muted-foreground",
					children: [
						"Your payment was verified successfully. Order reference: ",
						orderId,
						"."
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 36,
					columnNumber: 472
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/shop",
					className: "ember-fill mt-10 inline-block rounded-md px-5 py-3 font-display text-xs tracking-widest",
					children: "Continue shopping"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 36,
					columnNumber: 602
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 36,
			columnNumber: 107
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 36,
		columnNumber: 49
	}, this);
	if (!order && paymentState === "failed") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteHeader, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 37,
			columnNumber: 95
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
			className: "mx-auto max-w-3xl px-5 pb-20 pt-36 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-4xl",
					children: "Payment needs attention"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 37,
					columnNumber: 174
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-4 text-muted-foreground",
					children: [
						"We could not verify this payment yet. Please contact support with reference ",
						orderId,
						"."
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 37,
					columnNumber: 227
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/checkout",
					className: "ember-fill mt-8 inline-block rounded-md px-5 py-3 font-display text-xs tracking-widest",
					children: "Return to checkout"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 37,
					columnNumber: 359
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 37,
			columnNumber: 109
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 37,
		columnNumber: 51
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteHeader, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 38,
			columnNumber: 54
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
			className: "mx-auto max-w-3xl px-5 pb-20 pt-36",
			children: order ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mx-auto flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-8" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 38,
								columnNumber: 275
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 38,
							columnNumber: 161
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-6 text-xs uppercase tracking-[0.25em] text-primary",
							children: "Order confirmed"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 38,
							columnNumber: 309
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "mt-3 text-5xl leading-none sm:text-6xl",
							children: "Heat is on the way"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 38,
							columnNumber: 397
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mx-auto mt-5 max-w-md text-muted-foreground",
							children: [
								"Order ",
								order.id,
								" is being prepared. Estimated delivery: ",
								new Date(order.estimatedDelivery).toLocaleDateString(),
								"."
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 38,
							columnNumber: 475
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 38,
					columnNumber: 132
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-12 grid gap-4 border-y border-border py-6 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs uppercase tracking-widest text-muted-foreground",
						children: "Delivery to"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 38,
						columnNumber: 739
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm",
						children: [
							order.delivery.name,
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 38,
								columnNumber: 874
							}, this),
							order.delivery.address,
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 38,
								columnNumber: 904
							}, this),
							order.delivery.city,
							", ",
							order.delivery.country
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 38,
						columnNumber: 825
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 38,
						columnNumber: 734
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs uppercase tracking-widest text-muted-foreground",
						children: "Order total"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 38,
						columnNumber: 972
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 font-display text-2xl text-primary",
						children: formatPrice(order.total)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 38,
						columnNumber: 1058
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 38,
						columnNumber: 967
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 38,
					columnNumber: 657
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-8 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "flex gap-3 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Package, { className: "size-4 text-primary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 38,
								columnNumber: 1243
							}, this),
							" ",
							order.lines.length,
							" product line(s)"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 38,
						columnNumber: 1187
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "flex gap-3 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Truck, { className: "size-4 text-primary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 38,
								columnNumber: 1383
							}, this),
							" ",
							order.status,
							" · estimated delivery in 2–5 days"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 38,
						columnNumber: 1327
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 38,
					columnNumber: 1155
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-10 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/account",
						className: "ember-fill rounded-md px-5 py-3 font-display text-xs tracking-widest",
						children: "Track order"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 38,
						columnNumber: 1541
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/shop",
						className: "rounded-md border border-border px-5 py-3 font-display text-xs tracking-widest text-muted-foreground",
						children: "Continue shopping"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 38,
						columnNumber: 1660
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 38,
					columnNumber: 1482
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 38,
				columnNumber: 130
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-4xl",
					children: "No order found"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 38,
					columnNumber: 1855
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/shop",
					className: "ember-fill mt-6 inline-block rounded-md px-5 py-3 font-display text-xs tracking-widest",
					children: "Back to shop"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 38,
					columnNumber: 1899
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 38,
				columnNumber: 1826
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 38,
			columnNumber: 68
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 38,
		columnNumber: 10
	}, this);
}
//#endregion
export { OrderConfirmationPage as component };
