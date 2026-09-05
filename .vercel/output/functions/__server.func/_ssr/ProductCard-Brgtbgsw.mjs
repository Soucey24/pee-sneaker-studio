import { r as __toESM } from "../_runtime.mjs";
import { t as formatPrice } from "./ssr.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useWishlist } from "./wishlist-CmAouWio.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Heart } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-Brgtbgsw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/components/ProductCard.tsx";
function ProductCard({ product, onAdd }) {
	const { has, toggle } = useWishlist();
	const stock = product.stock ?? 99;
	const [size, setSize] = (0, import_react.useState)(product.sizes[Math.floor(product.sizes.length / 2)]);
	const [quantity, setQuantity] = (0, import_react.useState)(1);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
		className: "card-tilt group min-w-0 overflow-hidden rounded-xl border border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative aspect-square overflow-hidden bg-surface-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/products/$productId",
					params: { productId: product.id },
					className: "block size-full",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: product.image,
						alt: `${product.name} ${product.category.toLowerCase()}`,
						loading: "lazy",
						width: 800,
						height: 800,
						className: "size-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 25,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 24,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => {
						const removing = has(product.id);
						toggle(product.id);
						toast.success(removing ? `${product.name} removed from wishlist` : `${product.name} saved to wishlist`);
					},
					"aria-label": has(product.id) ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`,
					className: "absolute right-2 top-2 rounded-full border border-border bg-background/80 p-1.5 backdrop-blur transition-colors hover:border-primary sm:right-3 sm:top-3 sm:p-2",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: `size-3.5 sm:size-4 ${has(product.id) ? "fill-primary text-primary" : "text-foreground"}` }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 35,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 34,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "absolute left-3 top-3 rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] uppercase tracking-widest text-primary backdrop-blur",
					children: product.tag
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 37,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 23,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-2 p-2 sm:space-y-3 sm:p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-baseline justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/products/$productId",
						params: { productId: product.id },
						className: "min-w-0 break-words text-xs transition-colors hover:text-primary sm:text-base",
						children: product.name
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 44,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-display text-xs text-primary sm:text-base",
						children: formatPrice(product.price)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 45,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 43,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap gap-1",
					children: product.sizes.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => setSize(s),
						className: `min-w-7 rounded border px-1.5 py-1 text-[10px] transition-colors sm:min-w-9 sm:px-2 sm:text-xs ${s === size ? "border-primary text-primary" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`,
						children: s
					}, s, false, {
						fileName: _jsxFileName,
						lineNumber: 52,
						columnNumber: 13
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 50,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex shrink-0 items-center border border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setQuantity(Math.max(1, quantity - 1)),
								className: "px-2 py-1.5 text-sm sm:px-3",
								children: "-"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 68,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "w-6 text-center text-xs tabular-nums",
								children: quantity
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 69,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setQuantity(Math.min(stock, quantity + 1)),
								disabled: quantity >= stock,
								className: "px-2 py-1.5 text-sm disabled:opacity-40 sm:px-3",
								children: "+"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 70,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 67,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => onAdd(product, size, quantity),
						disabled: stock < 1,
						className: "min-w-0 flex-1 rounded-md border border-primary py-2 font-display text-[10px] tracking-widest text-primary transition-all duration-300 hover:ember-fill hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 sm:py-2.5 sm:text-xs",
						children: stock < 1 ? "Sold out" : "Add to bag"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 72,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 66,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 42,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 22,
		columnNumber: 5
	}, this);
}
//#endregion
export { ProductCard as t };
