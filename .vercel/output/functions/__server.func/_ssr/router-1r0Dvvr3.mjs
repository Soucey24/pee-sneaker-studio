import { t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as AuthProvider } from "./auth-kaOw91JT.mjs";
import { t as OrdersProvider } from "./orders-7YVft8mE.mjs";
import { t as logo_default } from "./logo-QaqyrFYo.mjs";
import { t as WishlistProvider } from "./wishlist-CmAouWio.mjs";
import { c as lazyRouteComponent, d as Link, h as useRouter, i as HeadContent, l as createFileRoute, o as createRouter, r as Scripts, s as Outlet, u as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as CatalogProvider } from "./catalog-CXuYq-lO.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as CartProvider } from "./cart-BtuNJPf4.mjs";
import { t as Route$16 } from "./order-confirmation-D4s3xEzw.mjs";
import { t as Route$17 } from "./products._productId-EqpzWNrT.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-1r0Dvvr3.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var styles_default = "/assets/styles-BwEDAk1d.css";
var _jsxFileName$1 = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/components/ui/sonner.tsx";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 7,
		columnNumber: 5
	}, void 0);
};
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/routes/__root.tsx";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 25,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 26,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 27,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 31,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 30,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 24,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 23,
		columnNumber: 5
	}, this);
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 50,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 53,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 57,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 66,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 56,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 49,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 48,
		columnNumber: 5
	}, this);
}
var Route$15 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Big Pee Kicks" },
			{
				name: "description",
				content: "Big Pee Kicks sneaker studio."
			},
			{
				name: "author",
				content: "Big Pee Kicks"
			},
			{
				property: "og:title",
				content: "Big Pee Kicks"
			},
			{
				property: "og:description",
				content: "Big Pee Kicks sneaker studio."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Hind:wght@300;400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: logo_default,
				type: "image/png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeadContent, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 119,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 118,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 123,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 121,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 117,
		columnNumber: 5
	}, this);
}
function RootComponent() {
	const { queryClient } = Route$15.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CatalogProvider, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WishlistProvider, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(OrdersProvider, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CartProvider, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 139,
			columnNumber: 17
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster$1, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 140,
			columnNumber: 17
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 138,
			columnNumber: 15
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 137,
			columnNumber: 13
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 136,
			columnNumber: 11
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 135,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 134,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 133,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$14 = () => import("./routes-KpE38og6.mjs");
var Route$14 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Big Pee Kicks | Sneaker Shop for Rare Heat" },
		{
			name: "description",
			content: "Big Pee Kicks is a sneaker shop built on rare heat — hi-tops, runners and court classics, hand-picked by Big Pee and shipped worldwide."
		},
		{
			property: "og:title",
			content: "Big Pee Kicks | Sneaker Shop for Rare Heat"
		},
		{
			property: "og:description",
			content: "Shop hand-picked sneakers from Big Pee — limited drops, court classics and everyday runners."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./account-BJPGI6Mq.mjs");
var Route$13 = createFileRoute("/account")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./admin-DK5QuI1Y.mjs");
var Route$12 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./admin-login-BKHHU_mQ.mjs");
var Route$11 = createFileRoute("/admin-login")({
	head: () => ({ meta: [{ title: "Admin Login | Big Pee Kicks" }, {
		name: "description",
		content: "Admin access to inventory management."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./buyer-login-D5Maxyc0.mjs");
var Route$10 = createFileRoute("/buyer-login")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./checkout-DFiWhM5o.mjs");
var Route$9 = createFileRoute("/checkout")({
	head: () => ({ meta: [{ title: "Checkout | Big Pee Kicks" }, {
		name: "description",
		content: "Complete your Big Pee Kicks order."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./shop-Dxqjx4hZ.mjs");
var Route$8 = createFileRoute("/shop")({
	head: () => ({ meta: [{ title: "Shop | Big Pee Kicks" }, {
		name: "description",
		content: "Shop the latest hand-picked sneakers from Big Pee Kicks."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./wishlist-DbCEnMoL.mjs");
var Route$7 = createFileRoute("/wishlist")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./admin.index-CaMNpUhB.mjs");
var Route$6 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./admin.customers-CByBe8-s.mjs");
var Route$5 = createFileRoute("/admin/customers")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./admin.dashboard--C8fu4dQ.mjs");
var Route$4 = createFileRoute("/admin/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./admin.orders-BXNVw3NS.mjs");
var Route$3 = createFileRoute("/admin/orders")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./admin.payments-Cfi8C7_J.mjs");
var Route$2 = createFileRoute("/admin/payments")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin.returns-DuqWSili.mjs");
var Route$1 = createFileRoute("/admin/returns")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./admin.settings-DqUK2pUj.mjs");
var Route = createFileRoute("/admin/settings")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$14.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$15
});
var AccountRoute = Route$13.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => Route$15
});
var AdminRoute = Route$12.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$15
});
var AdminLoginRoute = Route$11.update({
	id: "/admin-login",
	path: "/admin-login",
	getParentRoute: () => Route$15
});
var BuyerLoginRoute = Route$10.update({
	id: "/buyer-login",
	path: "/buyer-login",
	getParentRoute: () => Route$15
});
var CheckoutRoute = Route$9.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$15
});
var OrderConfirmationRoute = Route$16.update({
	id: "/order-confirmation",
	path: "/order-confirmation",
	getParentRoute: () => Route$15
});
var ShopRoute = Route$8.update({
	id: "/shop",
	path: "/shop",
	getParentRoute: () => Route$15
});
var WishlistRoute = Route$7.update({
	id: "/wishlist",
	path: "/wishlist",
	getParentRoute: () => Route$15
});
var AdminIndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminCustomersRoute = Route$5.update({
	id: "/customers",
	path: "/customers",
	getParentRoute: () => AdminRoute
});
var AdminDashboardRoute = Route$4.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AdminRoute
});
var AdminOrdersRoute = Route$3.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => AdminRoute
});
var AdminPaymentsRoute = Route$2.update({
	id: "/payments",
	path: "/payments",
	getParentRoute: () => AdminRoute
});
var AdminReturnsRoute = Route$1.update({
	id: "/returns",
	path: "/returns",
	getParentRoute: () => AdminRoute
});
var AdminSettingsRoute = Route.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AdminRoute
});
var ProductsProductIdRoute = Route$17.update({
	id: "/products/$productId",
	path: "/products/$productId",
	getParentRoute: () => Route$15
});
var AdminRouteChildren = {
	AdminCustomersRoute,
	AdminDashboardRoute,
	AdminOrdersRoute,
	AdminPaymentsRoute,
	AdminReturnsRoute,
	AdminSettingsRoute,
	AdminIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AccountRoute,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren),
	AdminLoginRoute,
	BuyerLoginRoute,
	CheckoutRoute,
	OrderConfirmationRoute,
	ShopRoute,
	WishlistRoute,
	ProductsProductIdRoute
};
var routeTree = Route$15._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
