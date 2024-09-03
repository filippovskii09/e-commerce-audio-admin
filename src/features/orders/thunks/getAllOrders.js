import { db } from "@/firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from 'firebase/firestore';

export const getAllOrders = createAsyncThunk(
	"orders/getAllOrders",
	async (_, thunkAPI) => {
		try {
      const usersCollectionRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollectionRef);

			const allOrders = [];

      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.orders && Array.isArray(userData.orders)) {
          allOrders.push(...userData.orders);
        }
      });

			return allOrders;
		} catch(error){
			console.error(error);
			return thunkAPI.rejectWithValue(error.message);
		}
	}
)