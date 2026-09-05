import { r as __toESM } from "../_runtime.mjs";
import { t as formatPrice } from "./ssr.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { D as Funnel, d as ShoppingBag, m as Search } from "../_libs/lucide-react.mjs";
import { t as SiteHeader } from "./SiteHeader-zWdi2Yrf.mjs";
import { n as useCatalog } from "./catalog-CXuYq-lO.mjs";
import { n as useCart } from "./cart-BtuNJPf4.mjs";
import { n as SiteFooter, t as Reveal } from "./SiteFooter-ksXf7qdC.mjs";
import { t as ProductCard } from "./ProductCard-Brgtbgsw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-Dxqjx4hZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/routes/shop.tsx?tsr-split=component";
function ShopPage() {
	const { addToCart, count, setOpen } = useCart();
	const { products } = useCatalog();
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("All");
	const [size, setSize] = (0, import_react.useState)("All");
	const [maxPrice, setMaxPrice] = (0, import_react.useState)("2000");
	const [sort, setSort] = (0, import_react.useState)("newest");
	const [filtersOpen, setFiltersOpen] = (0, import_react.useState)(false);
	const filteredProducts = products.filter((product) => product.status === "Active").filter((product) => {
		const matchesQuery = `${product.name} ${product.tag}`.toLowerCase().includes(query.toLowerCase());
		const matchesCategory = category === "All" || product.category === category;
		const matchesSize = size === "All" || product.sizes.includes(Number(size));
		return matchesQuery && matchesCategory && matchesSize && product.price <= Number(maxPrice);
	}).sort((a, b) => sort === "price-low" ? a.price - b.price : sort === "price-high" ? b.price - a.price : sort === "popular" ? b.popularity - a.popularity : b.createdAt.localeCompare(a.createdAt));
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteHeader, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 33,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				className: "mx-auto max-w-6xl px-5 pb-16 pt-32",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col justify-between gap-6 border-b border-border pb-10 sm:flex-row sm:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mb-4 text-[11px] uppercase tracking-[0.25em] text-primary",
							children: "Drop 04 / Shop"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 38,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "text-5xl leading-none sm:text-7xl",
							children: "The Shelf"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 39,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-5 max-w-lg text-muted-foreground",
							children: "No filler. Every pair is hand-picked, checked, and ready for the next rotation."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 40,
							columnNumber: 15
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 37,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Funnel, { className: "size-4 text-primary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 46,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [filteredProducts.length, " pairs available"] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 47,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 45,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setOpen(true),
							"aria-label": "Open cart",
							className: "ember-fill relative inline-flex items-center gap-2 rounded-md px-4 py-2 font-display text-xs tracking-widest",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 50,
									columnNumber: 17
								}, this),
								"Bag",
								count > 0 ? ` (${count})` : ""
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 49,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 44,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 36,
					columnNumber: 11
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 35,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-8 grid gap-8 lg:grid-cols-[220px_1fr]",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setFiltersOpen(true),
							className: "fixed bottom-20 left-0 z-30 rounded-r-md border border-border bg-surface px-2 py-4 text-[10px] font-display uppercase tracking-widest text-primary shadow-deep lg:hidden",
							"aria-label": "Open filters",
							children: "Filter"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 58,
							columnNumber: 11
						}, this),
						filtersOpen && /* @__PURE__ */ (void 0)("div", {
							onClick: () => setFiltersOpen(false),
							className: "fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 59,
							columnNumber: 27
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
							className: `fixed bottom-0 left-0 top-0 z-50 w-[min(82vw,280px)] overflow-y-auto border-r border-border bg-surface p-5 transition-transform lg:static lg:z-auto lg:block lg:w-auto lg:overflow-visible lg:border lg:p-5 ${filtersOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between lg:block",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "font-display text-sm",
										children: "Filter the shelf"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 61,
										columnNumber: 73
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: () => setFiltersOpen(false),
										className: "text-sm text-muted-foreground lg:hidden",
										"aria-label": "Close filters",
										children: "Close"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 61,
										columnNumber: 129
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 61,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "mt-4 flex items-center gap-2 border border-border bg-background px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "size-4 text-muted-foreground" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 62,
										columnNumber: 106
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										value: query,
										onChange: (event) => setQuery(event.target.value),
										placeholder: "Search",
										className: "min-w-0 flex-1 bg-transparent text-sm outline-none"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 62,
										columnNumber: 157
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 62,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "mt-4 block text-xs uppercase tracking-widest text-muted-foreground",
									children: ["Category", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
										value: category,
										onChange: (event) => setCategory(event.target.value),
										className: "mt-2 w-full border border-border bg-background px-3 py-2 text-sm normal-case tracking-normal",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "All" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 63,
												columnNumber: 289
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Shoes" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 63,
												columnNumber: 309
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Sneakers" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 63,
												columnNumber: 331
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Slippers" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 63,
												columnNumber: 356
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 63,
										columnNumber: 107
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 63,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "mt-4 block text-xs uppercase tracking-widest text-muted-foreground",
									children: ["Size", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
										value: size,
										onChange: (event) => setSize(event.target.value),
										className: "mt-2 w-full border border-border bg-background px-3 py-2 text-sm normal-case tracking-normal",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "All" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 64,
											columnNumber: 277
										}, this), [
											39,
											40,
											41,
											42,
											43,
											44,
											45,
											46
										].map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: item,
											children: ["EU ", item]
										}, item, true, {
											fileName: _jsxFileName,
											lineNumber: 64,
											columnNumber: 343
										}, this))]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 64,
										columnNumber: 103
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 64,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "mt-4 block text-xs uppercase tracking-widest text-muted-foreground",
									children: ["Sort", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
										value: sort,
										onChange: (event) => setSort(event.target.value),
										className: "mt-2 w-full border border-border bg-background px-3 py-2 text-sm normal-case tracking-normal",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "newest",
												children: "Newest"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 65,
												columnNumber: 277
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "price-low",
												children: "Price: low to high"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 65,
												columnNumber: 315
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "price-high",
												children: "Price: high to low"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 65,
												columnNumber: 368
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "popular",
												children: "Popularity"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 65,
												columnNumber: 422
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 65,
										columnNumber: 103
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 65,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "mt-5 block text-xs uppercase tracking-widest text-muted-foreground",
									children: ["Max price", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "mt-2 flex items-center gap-2 normal-case tracking-normal",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
											type: "range",
											min: "50",
											max: "2000",
											step: "10",
											value: maxPrice,
											onChange: (event) => setMaxPrice(event.target.value),
											className: "min-w-0 flex-1 accent-[var(--primary)]"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 66,
											columnNumber: 183
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-primary",
											children: formatPrice(Number(maxPrice))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 66,
											columnNumber: 355
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 66,
										columnNumber: 108
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 66,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 60,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3",
							children: filteredProducts.map((product, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
								delay: index * 90,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, {
									product,
									onAdd: addToCart
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 71,
									columnNumber: 15
								}, this)
							}, product.id, false, {
								fileName: _jsxFileName,
								lineNumber: 70,
								columnNumber: 53
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 69,
							columnNumber: 9
						}, this),
						!filteredProducts.length && /* @__PURE__ */ (void 0)("p", {
							className: "py-20 text-center text-muted-foreground",
							children: "No pairs match those filters."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 74,
							columnNumber: 38
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 57,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 34,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteFooter, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 77,
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
export { ShopPage as component };
