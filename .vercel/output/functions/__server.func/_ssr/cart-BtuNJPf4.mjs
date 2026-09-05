import { r as __toESM } from "../_runtime.mjs";
import { t as formatPrice } from "./ssr.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as Minus, s as Trash2, t as X, v as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-BtuNJPf4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/components/CartDrawer.tsx";
function CartDrawer({ open, lines, onClose, onQty, onRemove, getLineLimit }) {
	const total = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		onClick: onClose,
		className: `fixed inset-0 z-40 bg-background/70 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 27,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
		className: `fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col border-l border-border bg-surface transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`,
		style: { transitionTimingFunction: "var(--ease-out-soft)" },
		"aria-hidden": !open,
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between border-b border-border px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-lg",
					children: "Your bag"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 41,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: onClose,
					"aria-label": "Close cart",
					className: "rounded-full p-2 text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 47,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 42,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 40,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex-1 space-y-4 overflow-y-auto p-5",
				children: [lines.length === 0 && /* @__PURE__ */ (void 0)("div", {
					className: "py-8 text-center",
					children: [/* @__PURE__ */ (void 0)("p", {
						className: "text-sm text-muted-foreground",
						children: "Your bag is empty."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 52,
						columnNumber: 68
					}, this), /* @__PURE__ */ (void 0)(Link, {
						to: "/shop",
						onClick: onClose,
						className: "mt-4 inline-block text-sm text-primary hover:underline",
						children: "Browse the shop"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 52,
						columnNumber: 135
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 52,
					columnNumber: 34
				}, this), lines.map((line, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex gap-3 rounded-lg border border-border bg-surface-2 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: line.product.image,
						alt: line.product.name,
						loading: "lazy",
						width: 800,
						height: 800,
						className: "size-16 rounded-md object-cover"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 58,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "font-display text-sm",
								children: line.product.name
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 67,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: ["Size EU ", line.size]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 68,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-2 flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: () => onQty(i, -1),
										"aria-label": "Decrease quantity",
										className: "rounded border border-border p-1 transition-colors hover:border-primary",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Minus, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 77,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 72,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-sm tabular-nums",
										children: line.qty
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 79,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: () => onQty(i, 1),
										disabled: line.qty >= getLineLimit(line),
										"aria-label": "Increase quantity",
										className: "rounded border border-border p-1 transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-40",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 86,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 80,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: () => onRemove(i),
										"aria-label": `Remove ${line.product.name}`,
										className: "rounded border border-border p-1 text-muted-foreground hover:border-red-400 hover:text-red-400",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 88,
											columnNumber: 205
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 88,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "ml-auto text-sm text-primary",
										children: formatPrice(line.product.price * line.qty)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 89,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 71,
								columnNumber: 17
							}, this),
							line.qty >= getLineLimit(line) && /* @__PURE__ */ (void 0)("p", {
								className: "mt-2 text-xs text-primary",
								"aria-live": "polite",
								children: "Maximum available quantity reached"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 93,
								columnNumber: 52
							}, this),
							getLineLimit(line) < 5 && getLineLimit(line) > line.qty && /* @__PURE__ */ (void 0)("p", {
								className: "mt-2 text-xs text-primary",
								"aria-live": "polite",
								children: [
									"Only ",
									getLineLimit(line) - line.qty,
									" left"
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 94,
								columnNumber: 77
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 66,
						columnNumber: 15
					}, this)]
				}, `${line.product.id}-${line.size}`, true, {
					fileName: _jsxFileName$1,
					lineNumber: 54,
					columnNumber: 13
				}, this))]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 51,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-3 border-t border-border p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-muted-foreground",
							children: "Subtotal"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 102,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-display text-lg",
							children: formatPrice(total)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 103,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 101,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/checkout",
						onClick: onClose,
						className: `ember-fill block w-full rounded-md py-3 text-center font-display text-sm tracking-wide transition-transform duration-300 hover:scale-[1.02] ${lines.length === 0 ? "pointer-events-none opacity-40" : ""}`,
						"aria-disabled": lines.length === 0,
						children: "Checkout"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 105,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-center text-xs text-muted-foreground",
						children: ["Free delivery on orders over ", formatPrice(200)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 115,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 100,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 33,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 26,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/context/cart.tsx";
var Ctx = (0, import_react.createContext)(null);
function useCart() {
	const ctx = (0, import_react.useContext)(Ctx);
	if (!ctx) throw new Error("useCart must be used inside CartProvider");
	return ctx;
}
function CartProvider({ children }) {
	const [lines, setLines] = (0, import_react.useState)([]);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let active = true;
		fetch("/api/cart").then((response) => response.ok ? response.json() : Promise.reject()).then((savedLines) => {
			if (active) setLines(savedLines);
		}).catch(() => void 0);
		return () => {
			active = false;
		};
	}, []);
	const syncCart = (next) => {
		fetch("/api/cart", {
			method: "PUT",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(next)
		}).catch(() => toast.error("Your bag could not be saved"));
	};
	const value = (0, import_react.useMemo)(() => {
		const count = lines.reduce((s, l) => s + l.qty, 0);
		const addToCart = (product, size, quantity = 1) => {
			setLines((prev) => {
				const i = prev.findIndex((l) => l.product.id === product.id && l.size === size);
				if (i >= 0) {
					const next = [...prev];
					const line = next[i];
					next[i] = {
						...line,
						qty: Math.min(line.qty + quantity, line.product.stock ?? 99)
					};
					syncCart(next);
					return next;
				}
				const next = [...prev, {
					product,
					size,
					qty: Math.min(quantity, product.stock ?? 99)
				}];
				syncCart(next);
				return next;
			});
			toast.success(`${product.name} added to your bag`);
		};
		const changeQty = (index, delta) => {
			const line = lines[index];
			setLines((prev) => {
				const next = prev.map((line, i) => {
					if (i !== index) return line;
					const stock = line.product.stock ?? 99;
					return {
						...line,
						qty: Math.min(stock, line.qty + delta)
					};
				}).filter((line) => line.qty > 0);
				syncCart(next);
				return next;
			});
			if (line) toast.success(delta > 0 ? "Quantity increased" : "Quantity decreased");
		};
		const clearCart = () => {
			setLines([]);
			fetch("/api/cart", { method: "DELETE" }).catch(() => toast.error("Your bag could not be cleared"));
			toast.success("Bag cleared");
		};
		const removeLine = (index) => {
			const line = lines[index];
			setLines((prev) => {
				const next = prev.filter((_, currentIndex) => currentIndex !== index);
				syncCart(next);
				return next;
			});
			if (line) toast.success(`${line.product.name} removed from your bag`);
		};
		const getLineLimit = (line) => line.product.stock ?? 99;
		return {
			lines,
			count,
			open,
			setOpen,
			addToCart,
			changeQty,
			clearCart,
			removeLine,
			getLineLimit
		};
	}, [lines, open]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Ctx.Provider, {
		value,
		children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CartDrawer, {
			open,
			lines,
			onClose: () => setOpen(false),
			onQty: value.changeQty,
			onRemove: value.removeLine,
			getLineLimit: value.getLineLimit
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 102,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 100,
		columnNumber: 5
	}, this);
}
//#endregion
export { useCart as n, CartProvider as t };
