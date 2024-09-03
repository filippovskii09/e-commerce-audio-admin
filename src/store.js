import ordersReducer from "./features/orders/ordersSlice"
const { configureStore } = require("@reduxjs/toolkit")

export const store = configureStore({
	reducer: {
		orders: ordersReducer,
	}
})