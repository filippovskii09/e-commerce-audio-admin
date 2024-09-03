"use client";

import { getAllOrders } from "@/features/orders/thunks/getAllOrders";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from '@chakra-ui/react'
import { updateOrderStatus } from "@/features/orders/thunks/updateOrderStatus";

const OrdersComponent = () => {
	const { orders, isLoading } = useSelector((state) => state.orders);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllOrders());
	}, [])

	const handleStatusChange = (userId, orderId, e) => {
		const newStatus = e.target.value;
		dispatch(updateOrderStatus({ userId, orderId, newStatus }));
		dispatch(getAllOrders());
	}

	if(isLoading) return <div className="text-3xl font-bold">Loading...</div>;
	return (
    <div
      className="flex flex-col gap-9 mt-8 px-5 pb-8">
      {orders.map((order) => (
        <div
          className="flex flex-col gap-2.5 text-xs border p-4 rounded-xl shadow-xl"
          key={order.id}>
          <div className="flex items-start justify-between gap-1">
            <p>№{order.id}</p>
            <p className="text-nowrap">
              {new Intl.DateTimeFormat("uk-UA", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(new Date(order.orderedTime))}
            </p>
          </div>
          <div className="">Кількість товарів:<span className="font-bold"> {order.products.length}</span></div>
					<div className="">{order.customerEmail}</div>
          <div className="flex w-full justify-between gap-1 items-center">
            <p
              className={`
  						${order.status === "Очікує підтвердження" ? "text-yellow-500" : ""}
  						${order.status === "Відхилено" ? "text-red-500" : ""}
  						${order.status === "Прийнято" ? "text-green-500" : ""}
							font-semibold
						`}>
              {order.status}
            </p>
						<Select value={order.status} onChange={(e) => handleStatusChange(order.customerId, order.id, e)}>
  						<option value='Очікує підтвердження'>Очікує підтвердження</option>
  						<option value='Відхилено'>Відхилено</option>
  						<option value='Прийнято'>Прийнято</option>
						</Select>
            <p className="text-sm font-bold">
              {order.total.toLocaleString("uk-UA", {
                style: "currency",
                currency: "UAH",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>	)
}

export default OrdersComponent