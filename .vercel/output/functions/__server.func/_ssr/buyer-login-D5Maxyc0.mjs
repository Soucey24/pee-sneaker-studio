import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useAuth } from "./auth-kaOw91JT.mjs";
import { d as Link, m as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as ArrowLeft, O as Eye, k as EyeOff, r as UserRound } from "../_libs/lucide-react.mjs";
import { t as BackButton } from "./BackButton-ZAxhczcQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/buyer-login-D5Maxyc0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/routes/buyer-login.tsx?tsr-split=component";
function BuyerLoginPage() {
	const { buyer, buyerLogin, buyerRegister } = useAuth();
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	if (buyer) {
		navigate({ to: "/account" });
		return null;
	}
	const submit = async (event) => {
		event.preventDefault();
		setError("");
		if (!(mode === "signin" ? await buyerLogin(email, password) : await buyerRegister(name, email, password))) {
			setError(mode === "signin" ? "Email or password is incorrect." : "An account with that email already exists.");
			return;
		}
		navigate({ to: "/account" });
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-5 py-12",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-md border border-border bg-surface p-6 sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BackButton, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 39,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/shop",
					className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 40,
						columnNumber: 118
					}, this), " Back to shop"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 40,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-8 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserRound, { className: "size-6" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 41,
						columnNumber: 120
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 41,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mt-6 text-4xl leading-none",
					children: "Your rotation"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 42,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: "Sign in to track orders and manage returns, or create an account in a few seconds."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 43,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-8 grid grid-cols-2 border-b border-border",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => {
							setMode("signin");
							setError("");
						},
						className: `border-b-2 pb-3 text-sm ${mode === "signin" ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`,
						children: "Sign in"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 44,
						columnNumber: 71
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => {
							setMode("register");
							setError("");
						},
						className: `border-b-2 pb-3 text-sm ${mode === "register" ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`,
						children: "Create account"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 47,
						columnNumber: 164
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 44,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					onSubmit: submit,
					className: "mt-6 space-y-4",
					children: [
						mode === "register" && /* @__PURE__ */ (void 0)("input", {
							required: true,
							value: name,
							onChange: (event) => setName(event.target.value),
							placeholder: "Full name",
							className: "w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 52,
							columnNumber: 35
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							required: true,
							type: "email",
							value: email,
							onChange: (event) => setEmail(event.target.value),
							placeholder: "Email address",
							className: "w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 53,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								required: true,
								minLength: 6,
								type: showPassword ? "text" : "password",
								value: password,
								onChange: (event) => setPassword(event.target.value),
								placeholder: "Password (6+ characters)",
								className: "w-full rounded-md border border-border bg-background px-4 py-3 pr-11 text-sm outline-none focus:border-primary"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 54,
								columnNumber: 37
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setShowPassword((value) => !value),
								className: "absolute right-2 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground",
								"aria-label": showPassword ? "Hide password" : "Show password",
								children: showPassword ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EyeOff, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 54,
									columnNumber: 593
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 54,
									columnNumber: 625
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 54,
								columnNumber: 342
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 54,
							columnNumber: 11
						}, this),
						error && /* @__PURE__ */ (void 0)("p", {
							className: "text-sm text-red-400",
							children: error
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 55,
							columnNumber: 21
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "submit",
							className: "ember-fill w-full rounded-md py-3 font-display text-xs tracking-widest",
							children: mode === "signin" ? "Sign in" : "Create account"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 56,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 51,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-6 text-center text-xs text-muted-foreground",
					children: "You can still check out as a guest."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 58,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 38,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 37,
		columnNumber: 10
	}, this);
}
//#endregion
export { BuyerLoginPage as component };
