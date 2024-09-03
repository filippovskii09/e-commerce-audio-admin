import { createSlice } from "@reduxjs/toolkit";
import { getAllOrders } from "./thunks/getAllOrders";
import { updateOrderStatus } from "./thunks/updateOrderStatus";

const initialState = {
	orders: [],
	isLoading: false,
	error: null
};

export const ordersSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllOrders.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllOrders.fulfilled, (state, action) => {
				state.isLoading = false;
				state.orders = action.payload;
			})
			.addCase(getAllOrders.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(updateOrderStatus.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateOrderStatus.fulfilled, (state, action) => {
				state.isLoading = false;
        const { userId, orderId, newStatus } = action.payload;
        const user = state.orders.find((order) => order.userId === userId);

        if (user) {
          const order = user.orders.find((order) => order.id === orderId);
          if (order) {
            order.status = newStatus;
						console.log(order);
          }
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
				state.isLoading = false;
        state.error = action.payload;
      });
	}
});

const ordersReducer = ordersSlice.reducer;

export default ordersReducer;