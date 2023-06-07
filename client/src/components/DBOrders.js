import React from "react";
import { useState, useEffect } from "react";
import { getOrders } from "../api";
import { useSelector, useDispatch } from "react-redux";
import { setOrder } from "../utils/orderSlice";
import OrderData from "./OrderData";

const DBOrders = () => {
  const orders = useSelector((store) => store.order.orders);
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.userDetails);
  useEffect(() => {
    if (orders.length === 0) {
      getOrders(user.uid).then((data) => {
        //console.log(data);
        dispatch(setOrder(data));
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center pt-6 w-full gap-4">
      {orders && orders?.length > 0 ? (
        <>
          {orders.map((order) => (
            <OrderData key={order?.orderId} order={order} />
          ))}
        </>
      ) : (
        <div>
          <h1 className="text-[72px] font-bold text-headingColor">No Data</h1>
        </div>
      )}
    </div>
  );
};

export default DBOrders;
