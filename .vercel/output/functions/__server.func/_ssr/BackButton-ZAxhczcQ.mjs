import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { h as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as ArrowLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/BackButton-ZAxhczcQ.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/components/BackButton.tsx";
function BackButton({ homeOnly = false }) {
	const router = useRouter();
	const goBack = () => {
		if (homeOnly) router.navigate({ to: "/" });
		else if (typeof window !== "undefined" && window.history.length > 1) router.history.back();
		else router.navigate({ to: "/" });
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		type: "button",
		onClick: goBack,
		"aria-label": "Go back",
		title: "Go back",
		className: "rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-4" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 25,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 18,
		columnNumber: 5
	}, this);
}
//#endregion
export { BackButton as t };
