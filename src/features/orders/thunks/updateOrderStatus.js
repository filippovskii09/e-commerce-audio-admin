import { db } from "@/firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const updateOrderStatus = createAsyncThunk(
	"orders/updateOrderStatus",
	async ({ userId, orderId, newStatus }, thunlAPI) => {
		try {
			console.log("uploading...");
			console.log(userId, orderId, newStatus);
      const userDoc = await getDoc(doc(db, "users", userId));
			if (!userDoc.exists()) {
        throw new Error("User not found");
      }
      const userData = userDoc.data();

			if (!userData.orders || !Array.isArray(userData.orders)) {
        throw new Error("Orders array is undefined or not an array");
      }

      const updatedOrders = userData.orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );

      await updateDoc(doc(db, "users", userId), {
        orders: updatedOrders,
      });

			return { userId, orderId, newStatus };
		} catch(error) {
			console.error(error);
			return thunlAPI.rejectWithValue(error.message)
		}
	}
)