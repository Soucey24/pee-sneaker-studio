import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-kaOw91JT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/context/auth.tsx";
var Ctx = (0, import_react.createContext)(null);
function useAuth() {
	const ctx = (0, import_react.useContext)(Ctx);
	if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
	return ctx;
}
function AuthProvider({ children }) {
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(false);
	const [adminName, setAdminName] = (0, import_react.useState)(null);
	const [buyer, setBuyer] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		fetch("/api/admin/session").then((response) => response.json()).then((session) => {
			setIsAdmin(session.isAdmin);
			setAdminName(session.name);
		}).catch(() => setIsAdmin(false));
		fetch("/api/buyer/session").then((response) => response.ok ? response.json() : null).then(setBuyer).catch(() => setBuyer(null));
	}, []);
	const buyerLogin = async (email, password) => {
		const response = await fetch("/api/buyer/login", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				email,
				password
			})
		});
		if (!response.ok) return false;
		setBuyer(await response.json());
		return true;
	};
	const buyerRegister = async (name, email, password) => {
		const response = await fetch("/api/buyer/register", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				name,
				email,
				password
			})
		});
		if (!response.ok) return false;
		setBuyer(await response.json());
		return true;
	};
	const buyerLogout = () => {
		fetch("/api/buyer/logout", { method: "POST" });
		setBuyer(null);
	};
	const login = async (password) => {
		const response = await fetch("/api/admin/login", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ password })
		});
		if (!response.ok) return false;
		const session = await response.json();
		setIsAdmin(true);
		setAdminName(session.name);
		return true;
	};
	const logout = async () => {
		await fetch("/api/admin/logout", { method: "POST" });
		setIsAdmin(false);
		setAdminName(null);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Ctx.Provider, {
		value: {
			isAdmin,
			adminName,
			login,
			logout,
			buyer,
			buyerLogin,
			buyerRegister,
			buyerLogout
		},
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 72,
		columnNumber: 5
	}, this);
}
//#endregion
export { useAuth as n, AuthProvider as t };
