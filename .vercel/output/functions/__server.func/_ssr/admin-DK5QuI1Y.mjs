import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useAuth } from "./auth-kaOw91JT.mjs";
import { p as Navigate, s as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AdminSidebar } from "./AdminSidebar-DYo-WF0Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DK5QuI1Y.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/routes/admin.tsx?tsr-split=component";
function AdminLayout() {
	const { isAdmin } = useAuth();
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Navigate, { to: "/admin-login" }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 8,
		columnNumber: 24
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminSidebar, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 10,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
			className: "admin-content min-w-0 lg:ml-64",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 11,
				columnNumber: 56
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 11,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 9,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminLayout as component };
