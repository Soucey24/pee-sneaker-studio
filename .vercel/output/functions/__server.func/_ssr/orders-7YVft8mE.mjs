import { r as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-7YVft8mE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/noraa/Desktop/pee-sneaker-studio/src/context/orders.tsx";
var OrdersContext = (0, import_react.createContext)(null);
function useOrders() {
	const value = (0, import_react.useContext)(OrdersContext);
	if (!value) throw new Error("useOrders must be used inside OrdersProvider");
	return value;
}
function OrdersProvider({ children }) {
	const [orders, setOrders] = (0, import_react.useState)([]);
	const reloadOrders = (0, import_react.useCallback)(async () => {
		const response = (await Promise.all([fetch("/api/buyer/orders"), fetch("/api/orders")])).find((item) => item.ok);
		if (response) setOrders(await response.json());
	}, []);
	(0, import_react.useEffect)(() => {
		reloadOrders().catch(() => void 0);
	}, []);
	const persist = (next) => {
		setOrders(next);
	};
	const placeOrder = (order) => {
		const nextOrder = {
			...order,
			id: `BPK-${Date.now().toString().slice(-8)}`,
			placedAt: (/* @__PURE__ */ new Date()).toISOString(),
			status: "Processing",
			paymentStatus: "Pending",
			estimatedDelivery: new Date(Date.now() + 5 * 864e5).toISOString()
		};
		persist([nextOrder, ...orders]);
		return nextOrder;
	};
	const requestReturn = (id) => {
		const next = orders.map((order) => order.id === id ? {
			...order,
			returnStatus: "Requested"
		} : order);
		fetch(`/api/orders/${id}/return`, { method: "POST" }).then((response) => {
			if (!response.ok) throw new Error("Unable to request return");
			persist(next);
		}).catch(() => void 0);
	};
	const updateOrder = (id, changes) => {
		const next = orders.map((order) => order.id === id ? {
			...order,
			...changes
		} : order);
		if (changes.status || changes.returnStatus) fetch(`/api/orders/${id}`, {
			method: "PATCH",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(changes.status ? { status: changes.status } : { returnStatus: changes.returnStatus })
		}).then((response) => {
			if (!response.ok) throw new Error("Unable to update order");
		}).then(() => persist(next)).catch(() => void 0);
		else persist(next);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(OrdersContext.Provider, {
		value: {
			orders,
			placeOrder,
			requestReturn,
			updateOrder,
			reloadOrders
		},
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 59,
		columnNumber: 10
	}, this);
}
//#endregion
export { useOrders as n, OrdersProvider as t };
