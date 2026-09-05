import { t as formatPrice } from "./ssr.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useAuth } from "./auth-kaOw91JT.mjs";
import { n as useOrders } from "./orders-7YVft8mE.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as ArrowRight, a as TriangleAlert, j as CreditCard, o as TrendingUp, u as ShoppingCart, y as Package } from "../_libs/lucide-react.mjs";
import { t as AdminSidebar } from "./AdminSidebar-DYo-WF0Z.mjs";
import { t as AdminGuard } from "./AdminGuard-CgMUWJXc.mjs";
import { n as useCatalog } from "./catalog-CXuYq-lO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.dashboard--C8fu4dQ.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/routes/admin.dashboard.tsx?tsr-split=component";
function AdminDashboardPage() {
	const { isAdmin } = useAuth();
	const { products } = useCatalog();
	const { orders } = useOrders();
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminGuard, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 19,
		columnNumber: 24
	}, this);
	const sales = orders.filter((order) => order.paymentStatus === "Paid").reduce((sum, order) => sum + order.total, 0);
	const pendingPayments = orders.filter((order) => order.paymentStatus === "Pending");
	const lowStock = products.filter((product) => product.stock < 5 && product.status !== "Archived");
	const returnRequests = orders.filter((order) => order.returnStatus === "Requested");
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminGuard, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminSidebar, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 24,
			columnNumber: 66
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
			className: "lg:ml-64",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-7xl px-5 pb-20 pt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border-b border-border pb-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs uppercase tracking-[0.25em] text-primary",
								children: "Big Pee Kicks / Overview"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 24,
								columnNumber: 205
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								className: "mt-3 text-5xl leading-none sm:text-6xl",
								children: "Dashboard"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 24,
								columnNumber: 297
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-4 text-muted-foreground",
								children: "A quick read on the store today."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 24,
								columnNumber: 366
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 24,
						columnNumber: 160
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 py-8 sm:grid-cols-2 xl:grid-cols-4",
						children: [
							[
								TrendingUp,
								"Paid sales",
								formatPrice(sales)
							],
							[
								ShoppingCart,
								"Total orders",
								orders.length
							],
							[
								CreditCard,
								"Pending payments",
								pendingPayments.length
							],
							[
								Package,
								"Low stock",
								lowStock.length
							]
						].map(([Icon, label, value]) => {
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "border border-border bg-surface p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "size-5 text-primary" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 26,
										columnNumber: 95
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-6 text-sm text-muted-foreground",
										children: label
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 26,
										columnNumber: 144
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-2 font-display text-3xl",
										children: value
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 26,
										columnNumber: 215
									}, this)
								]
							}, String(label), true, {
								fileName: _jsxFileName,
								lineNumber: 26,
								columnNumber: 22
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 24,
						columnNumber: 450
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-8 lg:grid-cols-[1.4fr_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
							className: "border border-border bg-surface p-5 sm:p-6",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "font-display text-lg",
									children: "Recent orders"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 27,
									columnNumber: 196
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/admin/orders",
									className: "inline-flex items-center gap-2 text-xs text-primary",
									children: ["View all ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 27,
										columnNumber: 349
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 27,
									columnNumber: 251
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 27,
								columnNumber: 139
							}, this), orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "py-12 text-sm text-muted-foreground",
								children: "Buyer orders will appear here."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 27,
								columnNumber: 418
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-5 divide-y divide-border",
								children: orders.slice(0, 5).map((order) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap items-center justify-between gap-3 py-4",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "font-display text-sm",
										children: order.id
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 27,
										columnNumber: 676
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: [
											order.delivery.name,
											" · ",
											new Date(order.placedAt).toLocaleDateString()
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 27,
										columnNumber: 726
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 27,
										columnNumber: 671
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-right",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "font-display text-primary",
											children: formatPrice(order.total)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 27,
											columnNumber: 885
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "mt-1 text-xs text-muted-foreground",
											children: order.status
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 27,
											columnNumber: 956
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 27,
										columnNumber: 857
									}, this)]
								}, order.id, true, {
									fileName: _jsxFileName,
									lineNumber: 27,
									columnNumber: 584
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 27,
								columnNumber: 506
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 27,
							columnNumber: 75
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "border border-border bg-surface p-5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TriangleAlert, { className: "size-5 text-primary" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 27,
										columnNumber: 1180
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
										className: "font-display text-lg",
										children: "Needs attention"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 27,
										columnNumber: 1229
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 27,
									columnNumber: 1139
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-5 space-y-3 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
											to: "/admin/payments",
											className: "flex items-center justify-between border-t border-border pt-3",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-muted-foreground",
												children: "Pending payments"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 27,
												columnNumber: 1433
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-primary",
												children: pendingPayments.length
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 27,
												columnNumber: 1496
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 27,
											columnNumber: 1332
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
											to: "/admin/returns",
											className: "flex items-center justify-between border-t border-border pt-3",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-muted-foreground",
												children: "Return requests"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 27,
												columnNumber: 1665
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-primary",
												children: returnRequests.length
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 27,
												columnNumber: 1727
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 27,
											columnNumber: 1565
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
											to: "/admin",
											className: "flex items-center justify-between border-t border-border pt-3",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-muted-foreground",
												children: "Low-stock products"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 27,
												columnNumber: 1887
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-primary",
												children: lowStock.length
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 27,
												columnNumber: 1952
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 27,
											columnNumber: 1795
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 27,
									columnNumber: 1292
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 27,
								columnNumber: 1086
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "border border-border bg-surface p-5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "font-display text-lg",
									children: "Quick actions"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 27,
									columnNumber: 2079
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-4 grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/admin",
										className: "border border-border px-4 py-3 text-sm text-muted-foreground hover:border-primary hover:text-primary",
										children: "Manage inventory"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 27,
										columnNumber: 2167
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/admin/orders",
										className: "border border-border px-4 py-3 text-sm text-muted-foreground hover:border-primary hover:text-primary",
										children: "Review orders"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 27,
										columnNumber: 2321
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 27,
									columnNumber: 2134
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 27,
								columnNumber: 2026
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 27,
							columnNumber: 1055
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 27,
						columnNumber: 22
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 24,
				columnNumber: 109
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 24,
			columnNumber: 82
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 24,
		columnNumber: 22
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 24,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminDashboardPage as component };
