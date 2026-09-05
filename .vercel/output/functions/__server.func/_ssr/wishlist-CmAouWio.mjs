import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wishlist-CmAouWio.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/context/wishlist.tsx";
var WishlistContext = (0, import_react.createContext)(null);
function useWishlist() {
	const value = (0, import_react.useContext)(WishlistContext);
	if (!value) throw new Error("useWishlist must be used inside WishlistProvider");
	return value;
}
function WishlistProvider({ children }) {
	const [ids, setIds] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return [];
		const saved = window.localStorage.getItem("big-pee-wishlist");
		if (!saved) return [];
		try {
			const parsed = JSON.parse(saved);
			return Array.isArray(parsed) && parsed.every((id) => typeof id === "string") ? parsed : [];
		} catch {
			return [];
		}
	});
	(0, import_react.useEffect)(() => {
		window.localStorage.setItem("big-pee-wishlist", JSON.stringify(ids));
	}, [ids]);
	const toggle = (id) => {
		setIds((current) => {
			return current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
		});
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WishlistContext.Provider, {
		value: {
			ids,
			toggle,
			has: (id) => ids.includes(id)
		},
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 41,
		columnNumber: 10
	}, this);
}
//#endregion
export { useWishlist as n, WishlistProvider as t };
