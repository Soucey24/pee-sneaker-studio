import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as logo_default } from "./logo-QaqyrFYo.mjs";
import { n as useWishlist } from "./wishlist-CmAouWio.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Heart } from "../_libs/lucide-react.mjs";
import { t as BackButton } from "./BackButton-ZAxhczcQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteHeader-zWdi2Yrf.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/components/SiteHeader.tsx";
function SiteHeader({ showBack = true }) {
	const { ids } = useWishlist();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
		className: "fixed inset-x-0 top-0 z-30 border-b border-border bg-background/80 backdrop-blur-lg",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto flex max-w-6xl items-center justify-between px-5 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-3",
				children: [showBack && /* @__PURE__ */ (void 0)(BackButton, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 14,
					columnNumber: 24
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					className: "font-display text-lg leading-none",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: logo_default,
						alt: "Big Pee Kicks",
						className: "h-9 w-auto object-contain"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 16,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 15,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 13,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/wishlist",
				"aria-label": "Open wishlist",
				className: "relative rounded-md border border-border p-2 text-muted-foreground hover:border-primary hover:text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 20,
					columnNumber: 11
				}, this), ids.length > 0 && /* @__PURE__ */ (void 0)("span", {
					className: "absolute -right-2 -top-2 min-w-5 rounded-full bg-primary px-1 text-center text-[10px] leading-5 text-primary-foreground",
					children: ids.length
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 21,
					columnNumber: 30
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 19,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 12,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 11,
		columnNumber: 5
	}, this);
}
//#endregion
export { SiteHeader as t };
