import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useAuth } from "./auth-kaOw91JT.mjs";
import { t as logo_default } from "./logo-QaqyrFYo.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as Bell, S as LogOut, T as LayoutDashboard, g as RotateCcw, j as CreditCard, n as Users, p as Settings, t as X, u as ShoppingCart, x as Menu, y as Package } from "../_libs/lucide-react.mjs";
import { t as BackButton } from "./BackButton-ZAxhczcQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AdminSidebar-DYo-WF0Z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/components/AdminSidebar.tsx";
var navItems = [
	{
		label: "Dashboard",
		to: "/admin/dashboard",
		icon: LayoutDashboard
	},
	{
		label: "Inventory",
		to: "/admin",
		icon: Package
	},
	{
		label: "Orders",
		to: "/admin/orders",
		icon: ShoppingCart
	},
	{
		label: "Payments",
		to: "/admin/payments",
		icon: CreditCard
	},
	{
		label: "Customers",
		to: "/admin/customers",
		icon: Users
	},
	{
		label: "Returns",
		to: "/admin/returns",
		icon: RotateCcw
	},
	{
		label: "Settings",
		to: "/admin/settings",
		icon: Settings
	}
];
function AdminSidebar() {
	const { adminName, logout } = useAuth();
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [notifications, setNotifications] = (0, import_react.useState)([]);
	const [showNotifications, setShowNotifications] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		fetch("/api/admin/notifications").then((response) => response.ok ? response.json() : Promise.reject()).then(setNotifications).catch(() => void 0);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
			className: `fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-surface transition-transform lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`,
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex h-full flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between border-b border-border px-5 py-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BackButton, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 31,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/",
								className: "font-display text-lg leading-none",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
									src: logo_default,
									alt: "Big Pee Kicks",
									className: "h-10 w-auto object-contain"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 33,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 32,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 30,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setIsOpen(false),
							className: "lg:hidden rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground",
							"aria-label": "Close sidebar",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 41,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 36,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 29,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
						className: "min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => {
									setShowNotifications((value) => !value);
									if (notifications.some((notification) => !notification.read_at)) fetch("/api/admin/notifications/read", { method: "POST" }).then(() => setNotifications((current) => current.map((notification) => ({
										...notification,
										read_at: notification.read_at ?? (/* @__PURE__ */ new Date()).toISOString()
									}))));
								},
								className: "flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-sm font-display text-muted-foreground hover:text-foreground",
								"aria-label": "Open notifications",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bell, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 46,
										columnNumber: 579
									}, this),
									" Notifications ",
									notifications.filter((notification) => !notification.read_at).length > 0 && /* @__PURE__ */ (void 0)("span", {
										className: "ml-auto rounded-full bg-primary px-2 py-0.5 text-[10px] text-primary-foreground",
										children: notifications.filter((notification) => !notification.read_at).length
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 46,
										columnNumber: 698
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 46,
								columnNumber: 44
							}, this), showNotifications && /* @__PURE__ */ (void 0)("div", {
								className: "absolute left-3 right-3 top-12 z-10 max-h-64 overflow-y-auto border border-border bg-background p-3 shadow-deep",
								children: notifications.length === 0 ? /* @__PURE__ */ (void 0)("p", {
									className: "p-2 text-xs text-muted-foreground",
									children: "No notifications yet."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 46,
									columnNumber: 1064
								}, this) : notifications.map((notification) => /* @__PURE__ */ (void 0)("div", {
									className: `border-b border-border px-2 py-3 last:border-0 ${notification.read_at ? "opacity-60" : ""}`,
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center justify-between gap-2",
											children: [/* @__PURE__ */ (void 0)("p", {
												className: "text-xs font-display",
												children: notification.title
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 46,
												columnNumber: 1366
											}, this), !notification.read_at && /* @__PURE__ */ (void 0)("span", {
												className: "text-[10px] text-primary",
												children: "New"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 46,
												columnNumber: 1452
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 46,
											columnNumber: 1309
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "mt-1 text-xs text-muted-foreground",
											children: notification.message
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 46,
											columnNumber: 1512
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "mt-1 text-[10px] text-muted-foreground",
											children: new Date(notification.created_at).toLocaleString()
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 46,
											columnNumber: 1588
										}, this)
									]
								}, notification.id, true, {
									fileName: _jsxFileName,
									lineNumber: 46,
									columnNumber: 1177
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 46,
								columnNumber: 905
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 46,
							columnNumber: 13
						}, this), navItems.map(({ label, to, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to,
							activeOptions: { exact: to === "/admin" },
							onClick: () => setIsOpen(false),
							activeProps: { className: "ember-fill" },
							inactiveProps: { className: "text-muted-foreground hover:text-foreground" },
							className: "flex items-center gap-3 rounded-md px-4 py-2.5 text-sm font-display transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 57,
								columnNumber: 17
							}, this), label]
						}, to, true, {
							fileName: _jsxFileName,
							lineNumber: 48,
							columnNumber: 15
						}, this))]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 45,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-3 border-t border-border px-3 py-5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: ["Logged in as ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-foreground font-display",
								children: adminName
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 65,
								columnNumber: 28
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 64,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: logout,
							className: "flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-xs font-display tracking-widest text-muted-foreground transition-colors hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 71,
								columnNumber: 15
							}, this), "Logout"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 67,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 63,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 28,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 27,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
			onClick: () => setIsOpen(true),
			className: "fixed left-5 top-20 z-40 flex items-center justify-center rounded-full border border-border bg-surface p-3 shadow-deep lg:hidden",
			"aria-label": "Open sidebar",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, { className: "size-5 text-primary" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 83,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 78,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			onClick: () => setIsOpen(false),
			className: `fixed inset-0 z-40 bg-background/70 backdrop-blur-sm transition-opacity lg:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`,
			"aria-hidden": !isOpen
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 86,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 26,
		columnNumber: 5
	}, this);
}
//#endregion
export { AdminSidebar as t };
