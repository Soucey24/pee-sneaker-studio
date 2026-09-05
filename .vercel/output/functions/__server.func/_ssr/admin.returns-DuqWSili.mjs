import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useAuth } from "./auth-kaOw91JT.mjs";
import { n as useOrders } from "./orders-7YVft8mE.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as ArrowLeft, g as RotateCcw } from "../_libs/lucide-react.mjs";
import { t as AdminSidebar } from "./AdminSidebar-DYo-WF0Z.mjs";
import { t as AdminGuard } from "./AdminGuard-CgMUWJXc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.returns-DuqWSili.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/routes/admin.returns.tsx?tsr-split=component";
function AdminReturnsPage() {
	const { isAdmin } = useAuth();
	const { orders, updateOrder, reloadOrders } = useOrders();
	(0, import_react.useEffect)(() => {
		if (isAdmin) reloadOrders().catch(() => void 0);
	}, [isAdmin, reloadOrders]);
	const returns = orders.filter((order) => order.returnStatus);
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
								children: "Admin / Support"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 22,
								columnNumber: 357
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								className: "mt-3 text-5xl leading-none",
								children: "Returns"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 22,
								columnNumber: 440
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-4 text-muted-foreground",
								children: "Review buyer return and exchange requests."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 22,
								columnNumber: 495
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 22,
						columnNumber: 307
					}, this),
					returns.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "py-16 text-muted-foreground",
						children: "No return requests yet."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 22,
						columnNumber: 613
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 space-y-4",
						children: returns.map((order) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center justify-between gap-4 border border-border bg-surface p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "flex items-center gap-2 font-display",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RotateCcw, { className: "size-4 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 22,
											columnNumber: 915
										}, this), order.id]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 22,
										columnNumber: 863
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: [
											order.delivery.name,
											" · ",
											order.delivery.email
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 22,
										columnNumber: 974
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: ["Reason: ", order.returnReason ?? "Not provided"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 22,
										columnNumber: 1074
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 22,
									columnNumber: 858
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-sm text-primary",
									children: order.returnStatus
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 22,
									columnNumber: 1180
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: () => updateOrder(order.id, { returnStatus: "Approved" }),
										disabled: order.returnStatus === "Approved",
										className: "rounded-md border border-border px-4 py-2 text-xs text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-50",
										children: "Approve"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 22,
										columnNumber: 1274
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: () => updateOrder(order.id, { returnStatus: "Rejected" }),
										disabled: order.returnStatus === "Rejected",
										className: "rounded-md border border-border px-4 py-2 text-xs text-muted-foreground hover:border-red-400 hover:text-red-400 disabled:opacity-50",
										children: "Reject"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 24,
										columnNumber: 224
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 22,
									columnNumber: 1246
								}, this)
							]
						}, order.id, true, {
							fileName: _jsxFileName,
							lineNumber: 22,
							columnNumber: 740
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 22,
						columnNumber: 686
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
export { AdminReturnsPage as component };
