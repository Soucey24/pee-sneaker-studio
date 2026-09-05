import { t as formatPrice } from "./ssr.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useAuth } from "./auth-kaOw91JT.mjs";
import { n as useOrders } from "./orders-7YVft8mE.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as ArrowLeft, j as CreditCard } from "../_libs/lucide-react.mjs";
import { t as AdminSidebar } from "./AdminSidebar-DYo-WF0Z.mjs";
import { t as AdminGuard } from "./AdminGuard-CgMUWJXc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.payments-Cfi8C7_J.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/routes/admin.payments.tsx?tsr-split=component";
function AdminPaymentsPage() {
	const { isAdmin } = useAuth();
	const { orders } = useOrders();
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminGuard, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 15,
		columnNumber: 24
	}, this);
	const paid = orders.filter((order) => order.paymentStatus === "Paid").reduce((sum, order) => sum + order.total, 0);
	const pending = orders.filter((order) => order.paymentStatus === "Pending").reduce((sum, order) => sum + order.total, 0);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminSidebar, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 18,
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
							lineNumber: 18,
							columnNumber: 258
						}, this), " Inventory"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 18,
						columnNumber: 148
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 border-b border-border pb-8",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs uppercase tracking-[0.25em] text-primary",
							children: "Admin / Finance"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 18,
							columnNumber: 357
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "mt-3 text-5xl leading-none",
							children: "Payments"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 18,
							columnNumber: 440
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 18,
						columnNumber: 307
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 py-8 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "border border-border bg-surface p-5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm text-muted-foreground",
									children: "Paid"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 18,
									columnNumber: 603
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-2 font-display text-3xl text-primary",
									children: formatPrice(paid)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 18,
									columnNumber: 656
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 18,
								columnNumber: 550
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "border border-border bg-surface p-5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm text-muted-foreground",
									children: "Pending"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 18,
									columnNumber: 793
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-2 font-display text-3xl text-primary",
									children: formatPrice(pending)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 18,
									columnNumber: 849
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 18,
								columnNumber: 740
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "border border-border bg-surface p-5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm text-muted-foreground",
									children: "Transactions"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 18,
									columnNumber: 989
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-2 font-display text-3xl text-primary",
									children: orders.length
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 18,
									columnNumber: 1050
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 18,
								columnNumber: 936
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 18,
						columnNumber: 502
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-3",
						children: orders.map((order) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center justify-between gap-3 border border-border bg-surface p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex items-center gap-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CreditCard, { className: "size-4 text-primary" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 18,
										columnNumber: 1352
									}, this), order.id]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 18,
									columnNumber: 1302
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-sm text-muted-foreground",
									children: order.delivery.email
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 18,
									columnNumber: 1415
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs text-muted-foreground",
									children: order.paymentReference ?? "Awaiting reference"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 18,
									columnNumber: 1492
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-display",
									children: formatPrice(order.total)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 18,
									columnNumber: 1595
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-sm text-primary",
									children: order.paymentStatus
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 18,
									columnNumber: 1659
								}, this)
							]
						}, order.id, true, {
							fileName: _jsxFileName,
							lineNumber: 18,
							columnNumber: 1184
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 18,
						columnNumber: 1136
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 18,
				columnNumber: 97
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 18,
			columnNumber: 70
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 18,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminPaymentsPage as component };
