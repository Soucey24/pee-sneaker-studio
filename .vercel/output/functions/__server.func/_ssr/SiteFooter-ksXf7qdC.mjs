import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteFooter-ksXf7qdC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/components/Reveal.tsx";
function Reveal({ children, delay = 0, className = "" }) {
	const ref = (0, import_react.useRef)(null);
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(([entry]) => {
			if (entry?.isIntersecting) {
				setVisible(true);
				io.disconnect();
			}
		}, { threshold: .15 });
		io.observe(el);
		return () => io.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		ref,
		className: `reveal ${className}`,
		"data-visible": visible,
		style: { transitionDelay: `${delay}ms` },
		children
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 32,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/components/SiteFooter.tsx";
function SiteFooter() {
	const [subscribed, setSubscribed] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
		id: "contact",
		className: "mx-auto max-w-6xl px-5 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "rounded-2xl border border-border bg-surface p-8 text-center shadow-deep",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-3xl sm:text-4xl",
					children: "Get the drop first"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 10,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mx-auto mt-3 max-w-md text-sm text-muted-foreground",
					children: "One email a month, only when new heat lands."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 11,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						setSubscribed(true);
					},
					className: "mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						type: "email",
						required: true,
						placeholder: "you@email.com",
						className: "flex-1 rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 18,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						disabled: subscribed,
						className: "ember-fill rounded-md px-6 py-3 font-display text-xs tracking-widest transition-transform duration-300 hover:scale-105 disabled:opacity-60",
						children: subscribed ? "You're on the list" : "Notify me"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 24,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 14,
					columnNumber: 13
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 9,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 8,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-10 flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" Big Pee Kicks"
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 32,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Built for sneaker heads, worldwide." }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 33,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 31,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 7,
		columnNumber: 5
	}, this);
}
//#endregion
export { SiteFooter as n, Reveal as t };
