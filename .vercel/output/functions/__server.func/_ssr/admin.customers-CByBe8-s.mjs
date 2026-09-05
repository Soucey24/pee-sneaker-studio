import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useAuth } from "./auth-kaOw91JT.mjs";
import { n as useOrders } from "./orders-7YVft8mE.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as ArrowLeft, n as Users } from "../_libs/lucide-react.mjs";
import { t as AdminSidebar } from "./AdminSidebar-DYo-WF0Z.mjs";
import { t as AdminGuard } from "./AdminGuard-CgMUWJXc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.customers-CByBe8-s.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/routes/admin.customers.tsx?tsr-split=component";
function AdminCustomersPage() {
	const { isAdmin } = useAuth();
	const { orders } = useOrders();
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminGuard, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 14,
		columnNumber: 24
	}, this);
	const customers = Array.from(new Map(orders.map((order) => [order.delivery.email, order.delivery])).values());
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminSidebar, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 16,
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
							lineNumber: 16,
							columnNumber: 258
						}, this), " Inventory"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 16,
						columnNumber: 148
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 border-b border-border pb-8",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs uppercase tracking-[0.25em] text-primary",
							children: "Admin / People"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 16,
							columnNumber: 357
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "mt-3 text-5xl leading-none",
							children: "Customers"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 16,
							columnNumber: 439
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 16,
						columnNumber: 307
					}, this),
					customers.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "py-16 text-muted-foreground",
						children: "Customers appear after their first order."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 16,
						columnNumber: 528
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: customers.map((customer) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "border border-border bg-surface p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "size-5 text-primary" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 16,
									columnNumber: 783
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-4 font-display",
									children: customer.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 16,
									columnNumber: 824
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: customer.email
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 16,
									columnNumber: 876
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-3 text-xs text-muted-foreground",
									children: [
										customer.city,
										", ",
										customer.country
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 16,
									columnNumber: 946
								}, this)
							]
						}, customer.email, true, {
							fileName: _jsxFileName,
							lineNumber: 16,
							columnNumber: 709
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 16,
						columnNumber: 619
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 16,
				columnNumber: 97
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 16,
			columnNumber: 70
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 16,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminCustomersPage as component };
