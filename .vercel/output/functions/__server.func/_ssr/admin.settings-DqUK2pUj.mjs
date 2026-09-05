import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useAuth } from "./auth-kaOw91JT.mjs";
import { O as Eye, c as Tag, h as Save, i as Truck, k as EyeOff, l as Store, r as UserRound, w as LockKeyhole } from "../_libs/lucide-react.mjs";
import { t as AdminSidebar } from "./AdminSidebar-DYo-WF0Z.mjs";
import { t as AdminGuard } from "./AdminGuard-CgMUWJXc.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.settings-DqUK2pUj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/components/AdminPasswordForm.tsx";
function AdminPasswordForm() {
	const [currentPassword, setCurrentPassword] = (0, import_react.useState)("");
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const submit = async (event) => {
		event.preventDefault();
		const response = await fetch("/api/admin/password", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				currentPassword,
				newPassword
			})
		});
		setMessage(response.ok ? "Password updated. Please sign in again." : "Password change failed.");
		if (response.ok) {
			setCurrentPassword("");
			setNewPassword("");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "border border-border bg-surface p-5 sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
			className: "flex items-center gap-2 font-display text-lg",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LockKeyhole, { className: "size-4 text-primary" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 15,
				columnNumber: 135
			}, this), " Admin password"]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 15,
			columnNumber: 74
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
			onSubmit: submit,
			className: "mt-5 space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						required: true,
						type: show ? "text" : "password",
						value: currentPassword,
						onChange: (event) => setCurrentPassword(event.target.value),
						placeholder: "Current password",
						className: "w-full rounded-md border border-border bg-background px-4 py-3 pr-11 text-sm"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 15,
						columnNumber: 279
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setShow((value) => !value),
						className: "absolute right-2 top-1/2 -translate-y-1/2 p-2",
						"aria-label": "Toggle password visibility",
						children: show ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EyeOff, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 15,
							columnNumber: 707
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 15,
							columnNumber: 739
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 15,
						columnNumber: 536
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 15,
					columnNumber: 253
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					required: true,
					minLength: 10,
					type: show ? "text" : "password",
					value: newPassword,
					onChange: (event) => setNewPassword(event.target.value),
					placeholder: "New password (10+ characters)",
					className: "w-full rounded-md border border-border bg-background px-4 py-3 text-sm"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 15,
					columnNumber: 781
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "submit",
					className: "ember-fill rounded-md px-4 py-2 font-display text-xs tracking-widest",
					children: "Update password"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 15,
					columnNumber: 1052
				}, this),
				message && /* @__PURE__ */ (void 0)("p", {
					className: "text-sm text-muted-foreground",
					role: "status",
					children: message
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 15,
					columnNumber: 1191
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 15,
			columnNumber: 202
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 15,
		columnNumber: 10
	}, this);
}
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/routes/admin.settings.tsx?tsr-split=component";
var initialSettings = {
	storeName: "Big Pee Kicks",
	email: "hello@bigpeekicks.com",
	standardShipping: "12",
	expressShipping: "28",
	freeDeliveryThreshold: "200",
	promoCode: "BIGPEE10",
	promoDiscount: "10",
	adminPhone: ""
};
function AdminSettingsPage() {
	const { isAdmin, adminName } = useAuth();
	const [settings, setSettings] = (0, import_react.useState)(initialSettings);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [shippingRates, setShippingRates] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (!isAdmin) return;
		Promise.all([fetch("/api/admin/settings"), fetch("/api/admin/shipping-rates")]).then(async ([settingsResponse, ratesResponse]) => {
			if (!settingsResponse.ok || !ratesResponse.ok) throw new Error(`Settings load failed (${settingsResponse.status}/${ratesResponse.status})`);
			setSettings(await settingsResponse.json());
			setShippingRates(await ratesResponse.json());
		}).catch((error) => toast.error(error instanceof Error ? error.message : "Settings could not be loaded"));
	}, [isAdmin]);
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminGuard, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 49,
		columnNumber: 24
	}, this);
	const update = (key, value) => setSettings((current) => ({
		...current,
		[key]: value
	}));
	const save = (event) => {
		event.preventDefault();
		Promise.all([fetch("/api/admin/settings", {
			method: "PUT",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(settings)
		}), fetch("/api/admin/shipping-rates", {
			method: "PUT",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(shippingRates)
		})]).then(([settingsResponse, ratesResponse]) => {
			if (!settingsResponse.ok || !ratesResponse.ok) throw new Error(`Settings save failed (${settingsResponse.status}/${ratesResponse.status})`);
			setSaved(true);
			toast.success("Settings saved");
		}).catch((error) => toast.error(error instanceof Error ? error.message : "Settings could not be saved"));
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminGuard, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminSidebar, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 76,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
			className: "lg:ml-64",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-4xl px-5 pb-20 pt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border-b border-border pb-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs uppercase tracking-[0.25em] text-primary",
								children: "Admin / Configuration"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 80,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								className: "mt-3 text-5xl leading-none sm:text-6xl",
								children: "Settings"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 83,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-4 text-muted-foreground",
								children: "Manage store preferences for the frontend prototype."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 84,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 79,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminPasswordForm, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 89,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 88,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						onSubmit: save,
						className: "mt-8 space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
								className: "border border-border bg-surface p-5 sm:p-6",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "flex items-center gap-2 font-display text-lg",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Store, { className: "size-4 text-primary" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 94,
										columnNumber: 19
									}, this), " Store information"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 93,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-5 grid gap-4 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
											className: "text-sm text-muted-foreground",
											children: ["Store name", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
												value: settings.storeName,
												onChange: (event) => update("storeName", event.target.value),
												className: "mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 99,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 97,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
											className: "text-sm text-muted-foreground",
											children: ["Support email", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
												type: "email",
												value: settings.email,
												onChange: (event) => update("email", event.target.value),
												className: "mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 103,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 101,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
											className: "text-sm text-muted-foreground",
											children: ["Admin SMS phone", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
												type: "tel",
												value: settings.adminPhone,
												onChange: (event) => update("adminPhone", event.target.value),
												placeholder: "0241234567",
												className: "mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 107,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 105,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 96,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 92,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
								className: "border border-border bg-surface p-5 sm:p-6",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "flex items-center gap-2 font-display text-lg",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Truck, { className: "size-4 text-primary" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 111,
										columnNumber: 140
									}, this), " Delivery by location"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 111,
									columnNumber: 79
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-5 space-y-4",
									children: shippingRates.map((rate, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-3 sm:grid-cols-[1fr_1fr_1fr]",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
												className: "text-sm text-muted-foreground",
												children: ["Location", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
													value: rate.location,
													onChange: (event) => setShippingRates((current) => current.map((item, itemIndex) => itemIndex === index ? {
														...item,
														location: event.target.value
													} : item)),
													className: "mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 111,
													columnNumber: 407
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 111,
												columnNumber: 350
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
												className: "text-sm text-muted-foreground",
												children: ["Standard GHS", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
													type: "number",
													min: "0",
													value: rate.standard,
													onChange: (event) => setShippingRates((current) => current.map((item, itemIndex) => itemIndex === index ? {
														...item,
														standard: Number(event.target.value)
													} : item)),
													className: "mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 114,
													columnNumber: 200
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 114,
												columnNumber: 139
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
												className: "text-sm text-muted-foreground",
												children: ["Express GHS", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
													type: "number",
													min: "0",
													value: rate.express,
													onChange: (event) => setShippingRates((current) => current.map((item, itemIndex) => itemIndex === index ? {
														...item,
														express: Number(event.target.value)
													} : item)),
													className: "mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 117,
													columnNumber: 199
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 117,
												columnNumber: 139
											}, this)
										]
									}, rate.location, true, {
										fileName: _jsxFileName,
										lineNumber: 111,
										columnNumber: 275
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 111,
									columnNumber: 207
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 111,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
								className: "border border-border bg-surface p-5 sm:p-6",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "flex items-center gap-2 font-display text-lg",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Truck, { className: "size-4 text-primary" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 123,
										columnNumber: 19
									}, this), " Shipping rates"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 122,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-5 grid gap-4 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
											className: "text-sm text-muted-foreground",
											children: ["Standard delivery", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
												type: "number",
												min: "0",
												value: settings.standardShipping,
												onChange: (event) => update("standardShipping", event.target.value),
												className: "mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 128,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 126,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
											className: "text-sm text-muted-foreground",
											children: ["Express delivery", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
												type: "number",
												min: "0",
												value: settings.expressShipping,
												onChange: (event) => update("expressShipping", event.target.value),
												className: "mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 132,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 130,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
											className: "text-sm text-muted-foreground",
											children: ["Free delivery threshold", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
												type: "number",
												min: "0",
												value: settings.freeDeliveryThreshold,
												onChange: (event) => update("freeDeliveryThreshold", event.target.value),
												className: "mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 136,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 134,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 125,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 121,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
								className: "border border-border bg-surface p-5 sm:p-6",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "flex items-center gap-2 font-display text-lg",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tag, { className: "size-4 text-primary" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 142,
										columnNumber: 19
									}, this), " Promo code"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 141,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-5 grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "text-sm text-muted-foreground",
										children: ["Code", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
											value: settings.promoCode,
											onChange: (event) => update("promoCode", event.target.value.toUpperCase()),
											className: "mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 147,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 145,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "text-sm text-muted-foreground",
										children: ["Discount percentage", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
											type: "number",
											min: "0",
											max: "100",
											value: settings.promoDiscount,
											onChange: (event) => update("promoDiscount", event.target.value),
											className: "mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 151,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 149,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 144,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 140,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
								className: "border border-border bg-surface p-5 sm:p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
										className: "flex items-center gap-2 font-display text-lg",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserRound, { className: "size-4 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 157,
											columnNumber: 19
										}, this), " Admin profile"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 156,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-5 text-sm text-muted-foreground",
										children: ["Signed in as ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-foreground",
											children: adminName
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 160,
											columnNumber: 32
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 159,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-2 text-xs text-muted-foreground",
										children: "Authentication settings will move to the backend."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 162,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 155,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "submit",
									className: "ember-fill inline-flex items-center gap-2 rounded-md px-5 py-3 font-display text-xs tracking-widest",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Save, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 168,
										columnNumber: 19
									}, this), " Save settings"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 167,
									columnNumber: 17
								}, this), saved && /* @__PURE__ */ (void 0)("span", {
									className: "text-sm text-primary",
									role: "status",
									children: "Settings saved"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 170,
									columnNumber: 27
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 166,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 91,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 78,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 77,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 75,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 74,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminSettingsPage as component };
