import { r as __toESM } from "../_runtime.mjs";
import { t as formatPrice } from "./ssr.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useAuth } from "./auth-kaOw91JT.mjs";
import { n as useOrders } from "./orders-7YVft8mE.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as ArrowLeft, i as Truck, y as Package } from "../_libs/lucide-react.mjs";
import { t as AdminSidebar } from "./AdminSidebar-DYo-WF0Z.mjs";
import { t as AdminGuard } from "./AdminGuard-CgMUWJXc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.orders-BXNVw3NS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/routes/admin.orders.tsx?tsr-split=component";
function AdminOrdersPage() {
	const { isAdmin } = useAuth();
	const { orders, updateOrder, reloadOrders } = useOrders();
	(0, import_react.useEffect)(() => {
		if (isAdmin) reloadOrders().catch(() => void 0);
	}, [isAdmin, reloadOrders]);
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminGuard, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 21,
		columnNumber: 24
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminSidebar, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 22,
			columnNumber: 54
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
			className: "lg:ml-64",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-6xl px-5 pb-20 pt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/admin",
						className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 22,
							columnNumber: 258
						}, this), " Inventory"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 22,
						columnNumber: 148
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 border-b border-border pb-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs uppercase tracking-[0.25em] text-primary",
								children: "Admin / Fulfillment"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 22,
								columnNumber: 357
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								className: "mt-3 text-5xl leading-none",
								children: "Orders"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 22,
								columnNumber: 444
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-4 text-muted-foreground",
								children: "Review buyer orders, payment state, and fulfillment progress."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 22,
								columnNumber: 498
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 22,
						columnNumber: 307
					}, this),
					orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "py-16 text-muted-foreground",
						children: "No buyer orders yet."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 22,
						columnNumber: 634
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 space-y-4",
						children: orders.map((order) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
							className: "border border-border bg-surface p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap items-start justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "font-display",
										children: order.id
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 22,
										columnNumber: 900
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: [
											order.delivery.name,
											" · ",
											order.delivery.email,
											" · ",
											new Date(order.placedAt).toLocaleDateString()
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 22,
										columnNumber: 942
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 22,
										columnNumber: 895
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "font-display text-xl text-primary",
										children: formatPrice(order.total)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 22,
										columnNumber: 1098
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 22,
									columnNumber: 829
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-5 grid gap-3 border-y border-border py-4 text-sm sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "flex gap-2 text-muted-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Package, { className: "size-4 text-primary" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 22,
													columnNumber: 1315
												}, this),
												" ",
												order.lines.length,
												" item(s)"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 22,
											columnNumber: 1267
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "flex gap-2 text-muted-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Truck, { className: "size-4 text-primary" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 22,
													columnNumber: 1439
												}, this),
												" ",
												order.delivery.city,
												", ",
												order.delivery.country
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 22,
											columnNumber: 1391
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-muted-foreground",
											children: ["Payment: ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-foreground",
												children: order.paymentStatus
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 22,
												columnNumber: 1578
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 22,
											columnNumber: 1532
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 22,
									columnNumber: 1183
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-4 flex flex-wrap items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "text-xs text-muted-foreground",
										children: ["Fulfillment ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
											value: order.status,
											onChange: (event) => updateOrder(order.id, { status: event.target.value }),
											className: "ml-2 rounded border border-border bg-background px-2 py-1 text-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Processing" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 24,
													columnNumber: 107
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Shipped" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 24,
													columnNumber: 134
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Delivered" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 24,
													columnNumber: 158
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Cancelled" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 24,
													columnNumber: 184
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 22,
											columnNumber: 1767
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 22,
										columnNumber: 1706
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "text-xs text-muted-foreground",
										children: ["Payment ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
											value: order.paymentStatus,
											onChange: (event) => updateOrder(order.id, { paymentStatus: event.target.value }),
											className: "ml-2 rounded border border-border bg-background px-2 py-1 text-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Pending" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 26,
													columnNumber: 107
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Paid" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 26,
													columnNumber: 131
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Failed" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 26,
													columnNumber: 152
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Refunded" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 26,
													columnNumber: 175
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 24,
											columnNumber: 284
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 24,
										columnNumber: 227
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 22,
									columnNumber: 1650
								}, this)
							]
						}, order.id, true, {
							fileName: _jsxFileName,
							lineNumber: 22,
							columnNumber: 757
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 22,
						columnNumber: 704
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 22,
				columnNumber: 97
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 22,
			columnNumber: 70
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 22,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminOrdersPage as component };
