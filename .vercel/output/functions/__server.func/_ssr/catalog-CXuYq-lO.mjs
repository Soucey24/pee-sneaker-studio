import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-CXuYq-lO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var shoe_1_default = "/assets/shoe-1-DbrrTdew.jpg";
var shoe_2_default = "/assets/shoe-2-DMjvfQyy.jpg";
var shoe_3_default = "/assets/shoe-3-D5ChnV_D.jpg";
var shoe_4_default = "/assets/shoe-4-BE7X2uUj.jpg";
var products = [
	{
		id: "ember-hi",
		category: "Sneakers",
		name: "Ember Hi-Top",
		tag: "New drop",
		price: 189,
		image: shoe_1_default,
		images: [shoe_1_default, shoe_2_default],
		sizes: [
			40,
			41,
			42,
			43,
			44,
			45
		],
		description: "A high-top built with a padded collar, durable canvas, and a warm ember finish.",
		popularity: 98,
		createdAt: "2026-08-04"
	},
	{
		id: "static-runner",
		category: "Sneakers",
		name: "Static Runner",
		tag: "Best seller",
		price: 165,
		image: shoe_2_default,
		images: [shoe_2_default, shoe_1_default],
		sizes: [
			39,
			40,
			41,
			42,
			43,
			44
		],
		description: "A lightweight everyday runner with a responsive sole and clean technical lines.",
		popularity: 96,
		createdAt: "2026-07-21"
	},
	{
		id: "dust-low",
		category: "Shoes",
		name: "Dust Low Suede",
		tag: "Limited",
		price: 142,
		image: shoe_3_default,
		images: [shoe_3_default, shoe_4_default],
		sizes: [
			40,
			41,
			42,
			43,
			44
		],
		description: "Soft suede, low profile, and an easy neutral tone for quiet daily rotation.",
		popularity: 89,
		createdAt: "2026-06-15"
	},
	{
		id: "blackout-court",
		category: "Shoes",
		name: "Blackout Court",
		tag: "Big Pee pick",
		price: 210,
		image: shoe_4_default,
		images: [shoe_4_default, shoe_3_default],
		sizes: [
			41,
			42,
			43,
			44,
			45,
			46
		],
		description: "A structured court classic with a blackout upper and serious street presence.",
		popularity: 94,
		createdAt: "2026-05-28"
	},
	{
		id: "cloud-slide",
		category: "Slippers",
		name: "Cloud Slide",
		tag: "New comfort",
		price: 78,
		image: shoe_3_default,
		images: [shoe_3_default, shoe_4_default],
		sizes: [
			39,
			40,
			41,
			42,
			43,
			44
		],
		description: "Cloud-soft slides for recovery days, quick errands, and post-game comfort.",
		popularity: 91,
		createdAt: "2026-08-18"
	},
	{
		id: "after-hours-slide",
		category: "Slippers",
		name: "After Hours Slide",
		tag: "Big Pee pick",
		price: 86,
		image: shoe_4_default,
		images: [shoe_4_default, shoe_3_default],
		sizes: [
			40,
			41,
			42,
			43,
			44,
			45
		],
		description: "A relaxed after-hours slide with a supportive footbed and easy slip-on shape.",
		popularity: 86,
		createdAt: "2026-04-10"
	}
];
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/context/catalog.tsx";
var CatalogContext = (0, import_react.createContext)(null);
var initialProducts = products.map((product) => ({
	...product,
	stock: 12,
	status: "Active"
}));
function useCatalog() {
	const context = (0, import_react.useContext)(CatalogContext);
	if (!context) throw new Error("useCatalog must be used inside CatalogProvider");
	return context;
}
function CatalogProvider({ children }) {
	const [catalogProducts, setCatalogProducts] = (0, import_react.useState)(initialProducts);
	const pendingAdds = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	(0, import_react.useEffect)(() => {
		let active = true;
		fetch("/api/products").then((response) => {
			if (!response.ok) throw new Error(`Catalog request failed with status ${response.status}`);
			return response.json();
		}).then((serverProducts) => {
			if (active) setCatalogProducts([...pendingAdds.current.values(), ...serverProducts.filter((product) => !pendingAdds.current.has(product.id))]);
		}).catch(() => {
			if (active) setCatalogProducts(initialProducts);
		});
		return () => {
			active = false;
		};
	}, []);
	const addProduct = (product) => {
		const nextProduct = {
			...product,
			id: `product-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
		};
		pendingAdds.current.set(nextProduct.id, nextProduct);
		setCatalogProducts((currentProducts) => [nextProduct, ...currentProducts]);
		fetch("/api/products", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				action: "create",
				product: nextProduct
			})
		}).then((response) => {
			if (!response.ok) throw new Error("Unable to save product");
			return response.json();
		}).then(() => {
			pendingAdds.current.delete(nextProduct.id);
		}).catch(() => {
			pendingAdds.current.delete(nextProduct.id);
			setCatalogProducts((currentProducts) => currentProducts.filter((currentProduct) => currentProduct.id !== nextProduct.id));
		});
	};
	const updateProduct = (id, changes) => {
		const nextProducts = catalogProducts.map((product) => product.id === id ? {
			...product,
			...changes
		} : product);
		const nextProduct = nextProducts.find((product) => product.id === id);
		if (!nextProduct) return;
		fetch("/api/products", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				action: "update",
				product: nextProduct
			})
		}).then((response) => {
			if (!response.ok) throw new Error("Unable to update product");
			return response.json();
		}).then(() => setCatalogProducts(nextProducts)).catch(() => setCatalogProducts(nextProducts));
	};
	const removeProduct = (id) => {
		const nextProducts = catalogProducts.filter((product) => product.id !== id);
		fetch("/api/products", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				action: "delete",
				id
			})
		}).then((response) => {
			if (!response.ok) throw new Error("Unable to delete product");
			return response.json();
		}).then(() => setCatalogProducts(nextProducts)).catch(() => setCatalogProducts(nextProducts));
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CatalogContext.Provider, {
		value: {
			products: catalogProducts,
			addProduct,
			updateProduct,
			removeProduct
		},
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 77,
		columnNumber: 5
	}, this);
}
//#endregion
export { useCatalog as n, CatalogProvider as t };
