import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useWishlist } from "./wishlist-CmAouWio.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Heart } from "../_libs/lucide-react.mjs";
import { t as SiteHeader } from "./SiteHeader-zWdi2Yrf.mjs";
import { n as useCatalog } from "./catalog-CXuYq-lO.mjs";
import { n as useCart } from "./cart-BtuNJPf4.mjs";
import { t as ProductCard } from "./ProductCard-Brgtbgsw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wishlist-DbCEnMoL.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/routes/wishlist.tsx?tsr-split=component";
function WishlistPage() {
	const { products } = useCatalog();
	const { ids } = useWishlist();
	const { addToCart } = useCart();
	const savedProducts = products.filter((product) => ids.includes(product.id));
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteHeader, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 20,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
			className: "mx-auto max-w-6xl px-5 pb-20 pt-32",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs uppercase tracking-[0.25em] text-primary",
					children: "Your saved pairs"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 22,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mt-3 text-5xl leading-none sm:text-6xl",
					children: "Wishlist"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 23,
					columnNumber: 9
				}, this),
				!savedProducts.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-10 border-y border-border py-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: "size-8 text-primary" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 25,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-4 text-muted-foreground",
							children: "Your wishlist is empty."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 26,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/shop",
							className: "ember-fill mt-6 inline-block rounded-md px-5 py-3 font-display text-xs tracking-widest",
							children: "Browse the shelf"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 27,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 24,
					columnNumber: 34
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3",
					children: savedProducts.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, {
						product,
						onAdd: addToCart
					}, product.id, false, {
						fileName: _jsxFileName,
						lineNumber: 29,
						columnNumber: 43
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 28,
					columnNumber: 20
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 21,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 19,
		columnNumber: 10
	}, this);
}
//#endregion
export { WishlistPage as component };
