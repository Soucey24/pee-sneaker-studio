import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useAuth } from "./auth-kaOw91JT.mjs";
import { m as useNavigate, p as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Lock, O as Eye, k as EyeOff } from "../_libs/lucide-react.mjs";
import { t as BackButton } from "./BackButton-ZAxhczcQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-login-BKHHU_mQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/routes/admin-login.tsx?tsr-split=component";
function AdminLoginPage() {
	const { isAdmin, login } = useAuth();
	const navigate = useNavigate();
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	if (isAdmin) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Navigate, { to: "/admin" }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 16,
		columnNumber: 23
	}, this);
	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setError("");
		await new Promise((resolve) => setTimeout(resolve, 300));
		if (await login(password)) navigate({ to: "/admin" });
		else {
			setError("Invalid password. Try again.");
			setPassword("");
		}
		setLoading(false);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-5",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-sm border border-border bg-surface p-8 rounded-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BackButton, { homeOnly: true }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 36,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-8 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "size-8 text-primary" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 38,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 37,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-center font-display text-2xl",
					children: "Admin Access"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 41,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-center text-sm text-muted-foreground",
					children: "Enter the password to manage inventory."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 42,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					onSubmit: handleSubmit,
					className: "mt-8 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: showPassword ? "text" : "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: "Password",
								disabled: loading,
								className: "w-full rounded-md border border-border bg-background px-4 py-3 pr-11 text-sm outline-none transition-colors focus:border-primary disabled:opacity-50",
								autoFocus: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 47,
								columnNumber: 37
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setShowPassword((value) => !value),
								className: "absolute right-2 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground",
								"aria-label": showPassword ? "Hide password" : "Show password",
								children: showPassword ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EyeOff, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 47,
									columnNumber: 613
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 47,
									columnNumber: 645
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 47,
								columnNumber: 362
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 47,
							columnNumber: 11
						}, this),
						error && /* @__PURE__ */ (void 0)("p", {
							className: "text-sm text-red-400",
							children: error
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 48,
							columnNumber: 21
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "submit",
							disabled: loading,
							className: "ember-fill w-full rounded-md py-3 font-display text-sm tracking-widest transition-all hover:scale-[1.01] disabled:opacity-50",
							children: loading ? "Checking..." : "Enter"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 49,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 46,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-6 text-center text-xs text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "block",
						children: "Use the configured admin password."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 55,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 54,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 35,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 34,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminLoginPage as component };
