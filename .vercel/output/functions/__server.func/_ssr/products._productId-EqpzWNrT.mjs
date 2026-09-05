import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products._productId-EqpzWNrT.js
var $$splitComponentImporter = () => import("./products._productId-BKvuH6-v.mjs");
var Route = createFileRoute("/products/$productId")({
	head: ({ params }) => ({ meta: [{ title: `${params.productId} | Big Pee Kicks` }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
