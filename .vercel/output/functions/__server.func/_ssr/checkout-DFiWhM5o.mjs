import { r as __toESM } from "../_runtime.mjs";
import { t as formatPrice } from "./ssr.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useAuth } from "./auth-kaOw91JT.mjs";
import { d as Link, m as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as ArrowLeft, i as Truck, w as LockKeyhole } from "../_libs/lucide-react.mjs";
import { t as SiteHeader } from "./SiteHeader-zWdi2Yrf.mjs";
import { n as useCart } from "./cart-BtuNJPf4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-DFiWhM5o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/routes/checkout.tsx?tsr-split=component";
function CheckoutPage() {
	const { lines, clearCart } = useCart();
	const { buyer } = useAuth();
	useNavigate();
	const [reviewing, setReviewing] = (0, import_react.useState)(false);
	const [shippingMethod, setShippingMethod] = (0, import_react.useState)("standard");
	const [promo, setPromo] = (0, import_react.useState)("");
	const [promoError, setPromoError] = (0, import_react.useState)("");
	const [discount, setDiscount] = (0, import_react.useState)(0);
	const [paymentError, setPaymentError] = (0, import_react.useState)("");
	const [paying, setPaying] = (0, import_react.useState)(false);
	const [deliverToSomeoneElse, setDeliverToSomeoneElse] = (0, import_react.useState)(false);
	const [city, setCity] = (0, import_react.useState)("");
	const [shippingRate, setShippingRate] = (0, import_react.useState)(0);
	const [freeDeliveryThreshold, setFreeDeliveryThreshold] = (0, import_react.useState)(200);
	const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0);
	const shipping = subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : shippingRate;
	const total = Math.max(0, subtotal + shipping - discount);
	(0, import_react.useEffect)(() => {
		if (document.querySelector("script[data-paystack-inline]")) return;
		const script = document.createElement("script");
		script.src = "https://js.paystack.co/v2/inline.js";
		script.dataset["paystackInline"] = "true";
		document.body.appendChild(script);
	}, []);
	const handleCheckout = async (event) => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		if (!reviewing) {
			if (promo.trim().toUpperCase() === "BIGPEE10") {
				setDiscount(Math.round(subtotal * .1));
				setPromoError("");
			} else if (promo.trim()) {
				setPromoError("That code is not active.");
				return;
			}
			const quoteResponse = await fetch("/api/shipping/quote", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					city: String(form.get("city")),
					method: shippingMethod,
					subtotal
				})
			});
			if (quoteResponse.ok) {
				const quote = await quoteResponse.json();
				setShippingRate(quote.shipping);
				if (typeof quote.freeDeliveryThreshold === "number") setFreeDeliveryThreshold(quote.freeDeliveryThreshold);
			}
			setCity(String(form.get("city")));
			setReviewing(true);
			return;
		}
		setPaying(true);
		setPaymentError("");
		try {
			const response = await fetch("/api/payments/paystack/initialize", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					email: String(form.get("email")),
					phone: String(form.get("phone") ?? ""),
					name: `${String(form.get("firstName"))} ${String(form.get("lastName"))}`,
					address: String(form.get("address")),
					city: String(form.get("city")),
					country: "Ghana",
					subtotal,
					shipping,
					total,
					lines,
					recipient: deliverToSomeoneElse ? {
						name: String(form.get("recipientName")),
						phone: String(form.get("recipientPhone")),
						address: String(form.get("recipientAddress")),
						city: String(form.get("recipientCity")),
						country: "Ghana"
					} : void 0
				})
			});
			const responseText = await response.text();
			let payment;
			try {
				payment = JSON.parse(responseText);
			} catch {
				throw new Error(responseText.startsWith("<!doctype") ? "Payment server error. Check the terminal for details." : "Invalid payment server response");
			}
			if (!response.ok || !payment.reference || !payment.orderId) throw new Error(payment.error ?? "Unable to start payment");
			const publicKey = {
				"BASE_URL": "/",
				"DEV": true,
				"MODE": "production",
				"PROD": false,
				"SSR": true,
				"TSS_DEV_SERVER": "false",
				"TSS_DEV_SSR_STYLES_BASEPATH": "/",
				"TSS_DEV_SSR_STYLES_ENABLED": "true",
				"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
				"TSS_INLINE_CSS_ENABLED": "false",
				"TSS_ROUTER_BASEPATH": "",
				"TSS_SERVER_FN_BASE": "/_serverFn/",
				"VITE_PAYSTACK_PUBLIC_KEY": "pk_test_4bef70424753fd61b2363b9bde5a15cb32497867",
				"VITE_USER_NODE_ENV": "development"
			}["VITE_PAYSTACK_PUBLIC_KEY"];
			const paystack = window.PaystackPop;
			if (!publicKey || !paystack) throw new Error("Paystack popup is not configured");
			new paystack().newTransaction({
				key: publicKey,
				email: String(form.get("email")),
				amount: Math.round(total * 100),
				currency: "GHS",
				ref: payment.reference,
				onSuccess: async (result) => {
					if (!(await fetch("/api/payments/paystack/verify", {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({ reference: result.reference })
					})).ok) throw new Error("Payment could not be verified");
					clearCart();
					window.location.assign(`/order-confirmation?orderId=${encodeURIComponent(payment.orderId)}&reference=${encodeURIComponent(result.reference)}`);
				},
				onCancel: () => setPaying(false)
			});
		} catch (error) {
			setPaymentError(error instanceof Error ? error.message : "Unable to start payment");
			setPaying(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteHeader, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 150,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
			className: "mx-auto max-w-6xl px-5 pb-20 pt-32",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/shop",
				className: "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 153,
					columnNumber: 11
				}, this), "Continue shopping"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 152,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-8 grid gap-12 lg:grid-cols-[1fr_380px]",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-8",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mb-3 text-[11px] uppercase tracking-[0.25em] text-primary",
						children: "Secure checkout"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 160,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "text-5xl leading-none sm:text-6xl",
						children: "Finish the fit"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 163,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 159,
					columnNumber: 13
				}, this), lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "border-y border-border py-12",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground",
						children: "Your bag is empty. Find a pair before checking out."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 167,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/shop",
						className: "ember-fill mt-6 inline-block rounded-md px-6 py-3 font-display text-xs tracking-widest",
						children: "Browse the shelf"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 170,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 166,
					columnNumber: 35
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [!buyer && !reviewing && /* @__PURE__ */ (void 0)("div", {
					className: "mb-8 border border-primary/30 bg-surface p-5",
					children: [
						/* @__PURE__ */ (void 0)("p", {
							className: "font-display text-sm",
							children: "Want order tracking?"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 175,
							columnNumber: 21
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Sign in for order history, saved details, and easy returns. Guest checkout is still available."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 176,
							columnNumber: 21
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "mt-4 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (void 0)(Link, {
								to: "/buyer-login",
								className: "ember-fill rounded-md px-4 py-2 text-xs font-display tracking-widest",
								children: "Sign in / register"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 181,
								columnNumber: 23
							}, this), /* @__PURE__ */ (void 0)("span", {
								className: "flex items-center text-xs text-muted-foreground",
								children: "or continue below as guest"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 184,
								columnNumber: 23
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 180,
							columnNumber: 21
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 174,
					columnNumber: 42
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					onSubmit: handleCheckout,
					className: "space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("fieldset", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("legend", {
									className: "font-display text-lg",
									children: "Contact"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 191,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									name: "email",
									required: true,
									defaultValue: buyer?.email ?? "",
									type: "email",
									placeholder: "Email address",
									className: "w-full rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 192,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									name: "phone",
									required: true,
									type: "tel",
									placeholder: "Phone number, e.g. 0241234567",
									className: "w-full rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 193,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 190,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("fieldset", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("legend", {
									className: "font-display text-lg",
									children: "Delivery details"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 197,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										name: "firstName",
										required: true,
										placeholder: "First name",
										className: "rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 199,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										name: "lastName",
										required: true,
										placeholder: "Last name",
										className: "rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 200,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 198,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									name: "address",
									required: true,
									placeholder: "Address",
									className: "w-full rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 202,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										name: "city",
										required: true,
										placeholder: "City",
										className: "rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 204,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										value: "Ghana",
										readOnly: true,
										className: "rounded-md border border-border bg-background px-4 py-3 text-sm text-muted-foreground"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 205,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 203,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "flex items-center gap-3 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "checkbox",
										checked: deliverToSomeoneElse,
										onChange: (event) => setDeliverToSomeoneElse(event.target.checked)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 207,
										columnNumber: 94
									}, this), " Deliver to someone else"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 207,
									columnNumber: 21
								}, this),
								deliverToSomeoneElse && /* @__PURE__ */ (void 0)("div", {
									className: "space-y-4 border-l-2 border-primary/40 pl-4",
									children: [
										/* @__PURE__ */ (void 0)("p", {
											className: "font-display text-sm",
											children: "Recipient details"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 208,
											columnNumber: 107
										}, this),
										/* @__PURE__ */ (void 0)("input", {
											name: "recipientName",
											required: true,
											placeholder: "Recipient full name",
											className: "w-full rounded-md border border-border bg-surface px-4 py-3 text-sm"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 208,
											columnNumber: 164
										}, this),
										/* @__PURE__ */ (void 0)("input", {
											name: "recipientPhone",
											required: true,
											type: "tel",
											placeholder: "Recipient phone number",
											className: "w-full rounded-md border border-border bg-surface px-4 py-3 text-sm"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 208,
											columnNumber: 317
										}, this),
										/* @__PURE__ */ (void 0)("input", {
											name: "recipientAddress",
											required: true,
											placeholder: "Recipient address",
											className: "w-full rounded-md border border-border bg-surface px-4 py-3 text-sm"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 208,
											columnNumber: 485
										}, this),
										/* @__PURE__ */ (void 0)("input", {
											name: "recipientCity",
											required: true,
											placeholder: "Recipient city",
											className: "w-full rounded-md border border-border bg-surface px-4 py-3 text-sm"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 208,
											columnNumber: 639
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "text-xs text-muted-foreground",
											children: "Delivery country: Ghana"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 208,
											columnNumber: 787
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 208,
									columnNumber: 46
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 196,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("fieldset", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("legend", {
									className: "font-display text-lg",
									children: "Shipping method"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 212,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "flex cursor-pointer items-center justify-between border border-border bg-surface p-4 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "radio",
										name: "shipping",
										checked: shippingMethod === "standard",
										onChange: async () => {
											setShippingMethod("standard");
											const quote = await fetch("/api/shipping/quote", {
												method: "POST",
												headers: { "content-type": "application/json" },
												body: JSON.stringify({
													city,
													method: "standard",
													subtotal
												})
											});
											if (quote.ok) {
												const result = await quote.json();
												setShippingRate(result.shipping);
												if (typeof result.freeDeliveryThreshold === "number") setFreeDeliveryThreshold(result.freeDeliveryThreshold);
											}
										},
										className: "mr-3 accent-[var(--primary)]"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 215,
										columnNumber: 25
									}, this), "Standard delivery"] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 214,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: shipping === 0 ? "Free" : formatPrice(shippingRate)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 239,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 213,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "flex cursor-pointer items-center justify-between border border-border bg-surface p-4 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "radio",
										name: "shipping",
										checked: shippingMethod === "express",
										onChange: async () => {
											setShippingMethod("express");
											const quote = await fetch("/api/shipping/quote", {
												method: "POST",
												headers: { "content-type": "application/json" },
												body: JSON.stringify({
													city,
													method: "express",
													subtotal
												})
											});
											if (quote.ok) {
												const result = await quote.json();
												setShippingRate(result.shipping);
												if (typeof result.freeDeliveryThreshold === "number") setFreeDeliveryThreshold(result.freeDeliveryThreshold);
											}
										},
										className: "mr-3 accent-[var(--primary)]"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 245,
										columnNumber: 25
									}, this), "Express delivery"] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 244,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: shippingMethod === "express" && shipping === 0 ? "Free" : formatPrice(shippingRate)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 269,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 243,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 211,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "font-display text-sm",
								children: "Promo code"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 274,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-2 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									value: promo,
									onChange: (event) => setPromo(event.target.value),
									placeholder: "Try BIGPEE10",
									className: "min-w-0 flex-1 rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-primary"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 276,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex items-center px-2 text-sm text-primary",
									children: discount ? `-${formatPrice(discount)}` : ""
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 277,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 275,
								columnNumber: 21
							}, this),
							promoError && /* @__PURE__ */ (void 0)("p", {
								className: "mt-2 text-sm text-red-400",
								children: promoError
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 281,
								columnNumber: 36
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 273,
							columnNumber: 19
						}, this),
						reviewing && /* @__PURE__ */ (void 0)("div", {
							className: "border border-primary/40 bg-surface p-4 text-sm",
							children: [/* @__PURE__ */ (void 0)("p", {
								className: "font-display",
								children: "Review your order"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 285,
								columnNumber: 23
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "mt-2 text-muted-foreground",
								children: [
									lines.length,
									" item(s) ·",
									" ",
									shippingMethod === "express" ? "Express" : "Standard",
									" delivery ·",
									" ",
									formatPrice(total),
									" total"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 286,
								columnNumber: 23
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 284,
							columnNumber: 33
						}, this),
						paymentError && /* @__PURE__ */ (void 0)("p", {
							className: "text-sm text-red-400",
							role: "alert",
							children: paymentError
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 293,
							columnNumber: 36
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "submit",
							disabled: paying,
							className: "ember-fill w-full rounded-md py-4 font-display text-sm tracking-widest transition-transform hover:scale-[1.01] disabled:opacity-50",
							children: paying ? "Redirecting to Paystack..." : reviewing ? `Pay ${formatPrice(total)}` : "Review order"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 296,
							columnNumber: 19
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 189,
					columnNumber: 17
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 173,
					columnNumber: 24
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 158,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
					className: "h-fit border border-border bg-surface p-6 lg:sticky lg:top-28",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-display text-lg",
							children: "Order summary"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 304,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-6 space-y-4",
							children: [lines.map((line) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: line.product.image,
										alt: line.product.name,
										className: "size-16 rounded-md object-cover"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 307,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "font-display text-xs",
											children: line.product.name
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 309,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-xs text-muted-foreground",
											children: [
												"EU ",
												line.size,
												" · Qty ",
												line.qty
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 310,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 308,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-sm",
										children: formatPrice(line.product.price * line.qty)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 314,
										columnNumber: 19
									}, this)
								]
							}, `${line.product.id}-${line.size}`, true, {
								fileName: _jsxFileName,
								lineNumber: 306,
								columnNumber: 34
							}, this)), lines.length === 0 && /* @__PURE__ */ (void 0)("p", {
								className: "text-sm text-muted-foreground",
								children: "No items yet."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 316,
								columnNumber: 38
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 305,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-6 space-y-3 border-t border-border pt-5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: "Subtotal"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 320,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: formatPrice(subtotal) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 321,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 319,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: "Shipping"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 324,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: shipping === 0 ? "Free" : formatPrice(shipping) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 325,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 323,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex justify-between font-display text-lg",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Total" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 328,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-primary",
										children: formatPrice(total)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 329,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 327,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 318,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-6 space-y-3 border-t border-border pt-5 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LockKeyhole, { className: "size-4 shrink-0 text-primary" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 334,
									columnNumber: 17
								}, this), " Secure payment processing"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 333,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "flex gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Truck, { className: "size-4 shrink-0 text-primary" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 337,
										columnNumber: 17
									}, this),
									" Free delivery over ",
									formatPrice(freeDeliveryThreshold)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 336,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 332,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 303,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 157,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 151,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 149,
		columnNumber: 10
	}, this);
}
//#endregion
export { CheckoutPage as component };
