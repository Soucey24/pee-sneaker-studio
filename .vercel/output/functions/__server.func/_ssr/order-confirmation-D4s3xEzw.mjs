import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order-confirmation-D4s3xEzw.js
var $$splitComponentImporter = () => import("./order-confirmation-VGxux-di.mjs");
var Route = createFileRoute("/order-confirmation")({
	validateSearch: (search) => ({ orderId: String(search["orderId"] ?? "") }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
