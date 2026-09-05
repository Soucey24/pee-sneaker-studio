import { r as __toESM } from "../_runtime.mjs";
import { t as formatPrice } from "./ssr.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useAuth } from "./auth-kaOw91JT.mjs";
import { m as Search, t as X, v as Plus, y as Package } from "../_libs/lucide-react.mjs";
import { t as AdminGuard } from "./AdminGuard-CgMUWJXc.mjs";
import { n as useCatalog } from "./catalog-CXuYq-lO.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-CaMNpUhB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/components/AddProductModal.tsx";
var categoryOptions = [
	"Shoes",
	"Sneakers",
	"Slippers"
];
function AddProductModal({ open, onClose, onAdd }) {
	const [imageFile, setImageFile] = (0, import_react.useState)(null);
	const [imagePreview, setImagePreview] = (0, import_react.useState)("");
	const [imageError, setImageError] = (0, import_react.useState)("");
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		category: "Shoes",
		tag: "",
		description: "",
		price: 0,
		sizes: "40,41,42,43,44",
		stock: 12,
		status: "Active"
	});
	const handleImageChange = (file) => {
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			setImageError("Choose an image file.");
			return;
		}
		if (file.size > 5 * 1024 * 1024) {
			setImageError("Image must be smaller than 5 MB.");
			return;
		}
		setImageError("");
		setImageFile(file);
		const reader = new FileReader();
		reader.onload = () => setImagePreview(String(reader.result));
		reader.readAsDataURL(file);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!imageFile || !imagePreview) {
			setImageError("Upload a product image before saving.");
			return;
		}
		onAdd({
			name: formData.name,
			category: formData.category,
			tag: formData.tag,
			description: formData.description,
			price: formData.price,
			sizes: formData.sizes.split(",").map((s) => parseInt(s.trim(), 10)),
			image: imagePreview,
			popularity: 50,
			createdAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
			stock: formData.stock,
			status: formData.status
		});
		toast.success(`${formData.name} added to inventory`);
		setFormData({
			name: "",
			category: "Shoes",
			tag: "",
			price: 0,
			sizes: "40,41,42,43,44",
			stock: 12,
			status: "Active",
			description: ""
		});
		setImageFile(null);
		setImagePreview("");
		setImageError("");
		onClose();
	};
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		onClick: onClose,
		className: "fixed inset-0 z-40 bg-background/70 backdrop-blur-sm transition-opacity"
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 86,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-4 sm:items-center sm:px-5 sm:py-8",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "my-auto max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto rounded-xl border border-border bg-surface p-5 relative sm:max-h-[calc(100vh-4rem)] sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: onClose,
					className: "absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground",
					"aria-label": "Close modal",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 97,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 92,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-2xl",
					children: "Add new product"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 100,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Fill in the details to add to inventory."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 101,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					onSubmit: handleSubmit,
					className: "mt-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-xs font-display uppercase tracking-[0.1em] text-muted-foreground",
							children: "Product name"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 105,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "text",
							required: true,
							value: formData.name,
							onChange: (e) => setFormData({
								...formData,
								name: e.target.value
							}),
							className: "mt-2 w-full rounded-md border border-border bg-background px-4 py-2 text-sm outline-none transition-colors focus:border-primary"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 108,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 104,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-xs font-display uppercase tracking-[0.1em] text-muted-foreground",
							children: "Description"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 118,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
							required: true,
							value: formData.description,
							onChange: (e) => setFormData({
								...formData,
								description: e.target.value
							}),
							placeholder: "Describe the fit, materials, and feel",
							rows: 3,
							className: "mt-2 w-full resize-none rounded-md border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 119,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 117,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "text-xs font-display uppercase tracking-[0.1em] text-muted-foreground",
								children: "Stock quantity"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 124,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "number",
								required: true,
								min: "0",
								value: formData.stock,
								onChange: (e) => setFormData({
									...formData,
									stock: parseInt(e.target.value, 10) || 0
								}),
								className: "mt-2 w-full rounded-md border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 125,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 123,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "text-xs font-display uppercase tracking-[0.1em] text-muted-foreground",
								children: "Status"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 128,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
								value: formData.status,
								onChange: (e) => setFormData({
									...formData,
									status: e.target.value
								}),
								className: "mt-2 w-full rounded-md border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Active" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 130,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Draft" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 131,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Archived" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 132,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 129,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 127,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 122,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-xs font-display uppercase tracking-[0.1em] text-muted-foreground",
							children: "Category"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 138,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
							value: formData.category,
							onChange: (e) => setFormData({
								...formData,
								category: e.target.value
							}),
							className: "mt-2 w-full rounded-md border border-border bg-background px-4 py-2 text-sm outline-none transition-colors focus:border-primary",
							children: categoryOptions.map((cat) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: cat,
								children: cat
							}, cat, false, {
								fileName: _jsxFileName$1,
								lineNumber: 147,
								columnNumber: 19
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 141,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 137,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-xs font-display uppercase tracking-[0.1em] text-muted-foreground",
							children: "Tag"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 155,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "text",
							required: true,
							value: formData.tag,
							onChange: (e) => setFormData({
								...formData,
								tag: e.target.value
							}),
							placeholder: "e.g., New drop, Best seller",
							className: "mt-2 w-full rounded-md border border-border bg-background px-4 py-2 text-sm outline-none transition-colors focus:border-primary"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 158,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 154,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-xs font-display uppercase tracking-[0.1em] text-muted-foreground",
							children: "Price"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 169,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "number",
							required: true,
							min: "0",
							step: "0.01",
							value: formData.price,
							onChange: (e) => setFormData({
								...formData,
								price: parseFloat(e.target.value)
							}),
							className: "mt-2 w-full rounded-md border border-border bg-background px-4 py-2 text-sm outline-none transition-colors focus:border-primary"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 172,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 168,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-xs font-display uppercase tracking-[0.1em] text-muted-foreground",
							children: "Sizes (comma-separated)"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 184,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "text",
							required: true,
							value: formData.sizes,
							onChange: (e) => setFormData({
								...formData,
								sizes: e.target.value
							}),
							placeholder: "40, 41, 42, 43, 44",
							className: "mt-2 w-full rounded-md border border-border bg-background px-4 py-2 text-sm outline-none transition-colors focus:border-primary"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 187,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 183,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "text-xs font-display uppercase tracking-[0.1em] text-muted-foreground",
								children: "Product image"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 198,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "mt-2 flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-border bg-background px-4 py-4 transition-colors hover:border-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "file",
										accept: "image/png,image/jpeg,image/webp",
										onChange: (event) => handleImageChange(event.target.files?.[0]),
										className: "sr-only"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 202,
										columnNumber: 17
									}, this),
									imagePreview ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: imagePreview,
										alt: "Product preview",
										className: "size-16 rounded-md object-cover"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 209,
										columnNumber: 19
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-sm text-muted-foreground",
										children: "Choose JPG, PNG, or WebP (max 5 MB)"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 211,
										columnNumber: 19
									}, this),
									imageFile && /* @__PURE__ */ (void 0)("span", {
										className: "truncate text-sm text-primary",
										children: imageFile.name
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 213,
										columnNumber: 31
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 201,
								columnNumber: 15
							}, this),
							imageError && /* @__PURE__ */ (void 0)("p", {
								className: "mt-2 text-xs text-red-400",
								children: imageError
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 215,
								columnNumber: 30
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 197,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "pt-2 flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: onClose,
								className: "flex-1 rounded-md border border-border px-4 py-2.5 font-display text-xs tracking-widest text-muted-foreground transition-colors hover:text-foreground",
								children: "Cancel"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 219,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "submit",
								className: "ember-fill flex-1 rounded-md px-4 py-2.5 font-display text-xs tracking-widest transition-transform hover:scale-[1.01]",
								children: "Add product"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 226,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 218,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 103,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 91,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 90,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 85,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/routes/admin.index.tsx?tsr-split=component";
function InventoryPage() {
	const { isAdmin } = useAuth();
	const { products: inventory, addProduct, updateProduct, removeProduct } = useCatalog();
	const [category, setCategory] = (0, import_react.useState)("All");
	const [status, setStatus] = (0, import_react.useState)("All");
	const [search, setSearch] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [sizeEditor, setSizeEditor] = (0, import_react.useState)(null);
	const [sizeValue, setSizeValue] = (0, import_react.useState)("");
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(null);
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminGuard, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 27,
		columnNumber: 24
	}, this);
	const visible = inventory.filter((product) => {
		const text = `${product.name} ${product.tag} ${product.category}`.toLowerCase();
		return (category === "All" || product.category === category) && (status === "All" || product.status === status || status === "Out of stock" && product.stock === 0) && text.includes(search.toLowerCase());
	});
	const editSizes = (product) => {
		setSizeEditor(product);
		setSizeValue(product.sizes.join(", "));
	};
	const saveSizes = () => {
		if (!sizeEditor) return;
		const sizes = sizeValue.split(",").map((item) => Number(item.trim())).filter(Boolean);
		if (!sizes.length) {
			toast.error("Enter at least one EU size");
			return;
		}
		updateProduct(sizeEditor.id, { sizes });
		toast.success(`${sizeEditor.name} sizes updated`);
		setSizeEditor(null);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto max-w-7xl px-5 pb-20 pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col justify-between gap-5 border-b border-border pb-8 sm:flex-row sm:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs uppercase tracking-[0.25em] text-primary",
						children: "Big Pee Kicks / Admin"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 52,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mt-3 text-5xl leading-none sm:text-6xl",
						children: "Inventory"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 53,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-4 text-muted-foreground",
						children: "Manage products, variants, stock, and publishing status."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 54,
						columnNumber: 11
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 51,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => setOpen(true),
					className: "ember-fill inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-display text-xs tracking-widest",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 59,
						columnNumber: 11
					}, this), " Add product"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 58,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 50,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border border-border bg-surface p-5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-muted-foreground",
							children: "Products"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 64,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-2 font-display text-3xl text-primary",
							children: inventory.length
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 65,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 63,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border border-border bg-surface p-5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-muted-foreground",
							children: "Active"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 68,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-2 font-display text-3xl text-primary",
							children: inventory.filter((product) => product.status === "Active").length
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 69,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 67,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border border-border bg-surface p-5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-muted-foreground",
							children: "Low stock"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 74,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-2 font-display text-3xl text-primary",
							children: inventory.filter((product) => product.stock < 5).length
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 75,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 73,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 62,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-8 flex flex-col gap-3 border-y border-border py-5 sm:flex-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "flex flex-1 items-center gap-2 border border-border bg-surface px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "size-4 text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 82,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							value: search,
							onChange: (event) => setSearch(event.target.value),
							placeholder: "Search products",
							className: "min-w-0 flex-1 bg-transparent text-sm outline-none"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 83,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 81,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						value: category,
						onChange: (event) => setCategory(event.target.value),
						className: "border border-border bg-surface px-3 py-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "All" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 86,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Shoes" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 87,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Sneakers" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 88,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Slippers" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 89,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 85,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						value: status,
						onChange: (event) => setStatus(event.target.value),
						className: "border border-border bg-surface px-3 py-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "All" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 92,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Active" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 93,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Draft" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 94,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Archived" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 95,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Out of stock" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 96,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 91,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 80,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-6 space-y-3",
				children: visible.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
					className: "flex flex-col gap-4 border border-border bg-surface p-4 sm:flex-row sm:items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: product.image,
							alt: product.name,
							className: "size-20 rounded-md object-cover"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 101,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "font-display",
									children: product.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 103,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [
										product.category,
										" · ",
										product.tag,
										" · ",
										formatPrice(product.price)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 104,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: ["Sizes: ", product.sizes.join(", ")]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 107,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 102,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "number",
									min: "0",
									value: product.stock,
									onChange: (event) => updateProduct(product.id, { stock: Math.max(0, Number(event.target.value)) }),
									className: "w-20 rounded border border-border bg-background px-2 py-2 text-sm",
									"aria-label": `Stock for ${product.name}`
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 112,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
									value: product.status,
									onChange: (event) => updateProduct(product.id, { status: event.target.value }),
									className: "rounded border border-border bg-background px-2 py-2 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Active" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 118,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Draft" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 119,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { children: "Archived" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 120,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 115,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => editSizes(product),
									className: "rounded border border-border px-3 py-2 text-xs text-muted-foreground hover:border-primary hover:text-primary",
									children: "Sizes"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 122,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => setDeleteTarget(product),
									className: "rounded border border-border px-3 py-2 text-xs text-red-400 hover:border-red-400",
									children: "Delete"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 125,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 111,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Package, { className: "hidden size-4 text-primary sm:block" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 129,
							columnNumber: 13
						}, this)
					]
				}, product.id, true, {
					fileName: _jsxFileName,
					lineNumber: 100,
					columnNumber: 33
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 99,
				columnNumber: 7
			}, this),
			!visible.length && /* @__PURE__ */ (void 0)("p", {
				className: "py-12 text-center text-muted-foreground",
				children: "No products match these filters."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 132,
				columnNumber: 27
			}, this),
			sizeEditor && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-background/75 px-5 backdrop-blur-sm",
				children: /* @__PURE__ */ (void 0)("div", {
					className: "w-full max-w-md border border-border bg-surface p-6 shadow-deep",
					children: [
						/* @__PURE__ */ (void 0)("h2", {
							className: "font-display text-lg",
							children: "Edit EU sizes"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 133,
							columnNumber: 211
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: sizeEditor.name
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 133,
							columnNumber: 266
						}, this),
						/* @__PURE__ */ (void 0)("input", {
							autoFocus: true,
							value: sizeValue,
							onChange: (event) => setSizeValue(event.target.value),
							placeholder: "40, 41, 42, 43",
							className: "mt-5 w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 133,
							columnNumber: 337
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "mt-5 flex justify-end gap-3",
							children: [/* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => setSizeEditor(null),
								className: "rounded-md border border-border px-4 py-2 text-xs text-muted-foreground",
								children: "Cancel"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 133,
								columnNumber: 623
							}, this), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: saveSizes,
								className: "ember-fill rounded-md px-4 py-2 font-display text-xs tracking-widest",
								children: "Save sizes"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 133,
								columnNumber: 780
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 133,
							columnNumber: 578
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 133,
					columnNumber: 130
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 133,
				columnNumber: 22
			}, this),
			deleteTarget && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-background/75 px-5 backdrop-blur-sm",
				children: /* @__PURE__ */ (void 0)("div", {
					className: "w-full max-w-md border border-border bg-surface p-6 shadow-deep",
					children: [
						/* @__PURE__ */ (void 0)("h2", {
							className: "font-display text-lg",
							children: "Delete product?"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 134,
							columnNumber: 213
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: [
								"This will remove ",
								deleteTarget.name,
								" from inventory."
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 134,
							columnNumber: 270
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "mt-5 flex justify-end gap-3",
							children: [/* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => setDeleteTarget(null),
								className: "rounded-md border border-border px-4 py-2 text-xs text-muted-foreground",
								children: "Cancel"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 134,
								columnNumber: 421
							}, this), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => {
									removeProduct(deleteTarget.id);
									toast.success(`${deleteTarget.name} deleted`);
									setDeleteTarget(null);
								},
								className: "rounded-md border border-red-400 px-4 py-2 text-xs text-red-400",
								children: "Delete product"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 134,
								columnNumber: 580
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 134,
							columnNumber: 376
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 134,
					columnNumber: 132
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 134,
				columnNumber: 24
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AddProductModal, {
				open,
				onClose: () => setOpen(false),
				onAdd: addProduct
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 139,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 49,
		columnNumber: 10
	}, this);
}
//#endregion
export { InventoryPage as component };
