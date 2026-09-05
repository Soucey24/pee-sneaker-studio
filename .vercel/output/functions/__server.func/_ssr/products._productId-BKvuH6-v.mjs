import { r as __toESM } from "../_runtime.mjs";
import { t as formatPrice } from "./ssr.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useWishlist } from "./wishlist-CmAouWio.mjs";
import { _ as notFound, d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Heart, F as ArrowLeft, f as ShieldCheck, i as Truck } from "../_libs/lucide-react.mjs";
import { t as SiteHeader } from "./SiteHeader-zWdi2Yrf.mjs";
import { n as useCatalog } from "./catalog-CXuYq-lO.mjs";
import { n as useCart } from "./cart-BtuNJPf4.mjs";
import { t as Route } from "./products._productId-EqpzWNrT.mjs";
import { n as SiteFooter } from "./SiteFooter-ksXf7qdC.mjs";
import { t as ProductCard } from "./ProductCard-Brgtbgsw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products._productId-BKvuH6-v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/routes/products.$productId.tsx?tsr-split=component";
function ProductDetailsPage() {
	const { productId } = Route.useParams();
	const { products } = useCatalog();
	const { addToCart } = useCart();
	const { has, toggle } = useWishlist();
	const product = products.find((item) => item.id === productId);
	const [size, setSize] = (0, import_react.useState)(product?.sizes[0] ?? 0);
	const [quantity, setQuantity] = (0, import_react.useState)(1);
	if (!product) throw notFound();
	const stock = product.stock;
	const related = products.filter((item) => item.id !== product.id && item.category === product.category && item.status === "Active").slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteHeader, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 33,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				className: "mx-auto max-w-6xl px-5 pb-20 pt-32",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/shop",
						className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 35,
							columnNumber: 118
						}, this), " Back to shop"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 35,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 grid gap-10 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative overflow-hidden bg-surface-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: product.image,
								alt: `${product.name} ${product.category.toLowerCase()}`,
								className: "aspect-square w-full object-cover"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 38,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "absolute left-4 top-4 rounded-full border border-border bg-background/80 px-3 py-1 text-xs uppercase tracking-widest text-primary",
								children: product.tag
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 39,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 37,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
							className: "flex flex-col justify-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs uppercase tracking-[0.25em] text-primary",
									children: product.category
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 42,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-3 flex items-start justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
										className: "text-4xl leading-none sm:text-6xl",
										children: product.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 44,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: () => toggle(product.id),
										"aria-label": "Toggle wishlist",
										className: "rounded-full border border-border p-3 hover:border-primary",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: `size-5 ${has(product.id) ? "fill-primary text-primary" : ""}` }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 45,
											columnNumber: 158
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 45,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 43,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-5 font-display text-2xl text-primary",
									children: formatPrice(product.price)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 47,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-6 leading-relaxed text-muted-foreground",
									children: product.description
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 48,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-8 border-y border-border py-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "font-display text-sm",
												children: "Select size"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 50,
												columnNumber: 66
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-sm text-muted-foreground",
												children: "EU"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 50,
												columnNumber: 123
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 50,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "mt-4 flex flex-wrap gap-2",
											children: product.sizes.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												onClick: () => setSize(item),
												className: `min-w-11 rounded border px-3 py-2 text-sm ${item === size ? "border-primary text-primary" : "border-border text-muted-foreground hover:border-foreground"}`,
												children: item
											}, item, false, {
												fileName: _jsxFileName,
												lineNumber: 51,
												columnNumber: 85
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 51,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: `mt-4 text-sm ${stock < 5 ? "text-primary" : "text-muted-foreground"}`,
											children: stock > 0 ? `${stock} pairs available` : "Currently sold out"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 52,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 49,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-6 flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center border border-border",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												onClick: () => setQuantity(Math.max(1, quantity - 1)),
												className: "px-3 py-3 text-lg",
												children: "−"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 54,
												columnNumber: 102
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "w-10 text-center text-sm",
												children: quantity
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 54,
												columnNumber: 205
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												onClick: () => setQuantity(Math.min(stock, quantity + 1)),
												className: "px-3 py-3 text-lg",
												children: "+"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 54,
												columnNumber: 265
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 54,
										columnNumber: 46
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										disabled: !stock,
										onClick: () => {
											for (let index = 0; index < quantity; index += 1) addToCart(product, size);
										},
										className: "ember-fill flex-1 rounded-md px-5 py-3 font-display text-xs tracking-widest disabled:opacity-40",
										children: stock ? "Add to bag" : "Sold out"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 54,
										columnNumber: 378
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 54,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Truck, { className: "size-4 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 57,
											columnNumber: 117
										}, this), " 2–5 day delivery"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 57,
										columnNumber: 91
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "size-4 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 57,
											columnNumber: 205
										}, this), " Legit-checked pair"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 57,
										columnNumber: 179
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 57,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 41,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 36,
						columnNumber: 9
					}, this),
					related.length > 0 && /* @__PURE__ */ (void 0)("section", {
						className: "mt-20 border-t border-border pt-12",
						children: [/* @__PURE__ */ (void 0)("h2", {
							className: "text-3xl sm:text-4xl",
							children: "More in the rotation"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 60,
							columnNumber: 88
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
							children: related.map((item) => /* @__PURE__ */ (void 0)(ProductCard, {
								product: item,
								onAdd: addToCart
							}, item.id, false, {
								fileName: _jsxFileName,
								lineNumber: 60,
								columnNumber: 234
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 60,
							columnNumber: 150
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 60,
						columnNumber: 32
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 34,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteFooter, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 62,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 32,
		columnNumber: 10
	}, this);
}
//#endregion
export { ProductDetailsPage as component };
