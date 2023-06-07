import { useDispatch, useSelector } from "react-redux";
import { buttonClick, staggerFadeInOut } from "../animations";
import { motion } from "framer-motion";
import { getOrders, updateOrderSts } from "../api";
import { setOrder } from "../utils/orderSlice";

const OrderData = ({ order }) => {
  const user = useSelector((store) => store.user.userDetails);
  const dispatch = useDispatch();

  const handleClick = (orderId, sts) => {
    updateOrderSts(orderId, sts, user.uid).then((response) => {
      getOrders(user.uid).then((data) => {
        dispatch(setOrder(data));
      });
    });
  };
  return (
    <motion.div
      {...staggerFadeInOut(2)}
      className="w-full flex flex-col items-start justify-start px-3 py-2
border relative border-gray-300 bg-lightOverlay drop-shadow-md
rounded-md gap-4"
    >
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl text-headingColor font-semibold">
          Order ID : {order?.orderId}
        </h1>
        <div className=" flex items-center gap-4">
          <p className="flex items-center gap-1 ☐text-textColor">
            Total :
            <span className="text-headingColor font-bold">
              ₹ {order?.amount / 100}
            </span>
          </p>
          <p
            className="px-2 py-[2px] text-sm text-heading Color
font-semibold capitalize rounded-md bg-emerald-400
drop-shadow-md"
          >
            {order?.status}
          </p>
          <p
            className={`text-base font-semibold capitalize border
border-gray-300 px-2 py-[2px] rounded-md ${
              (order?.sts === "preparing" && "text-orange-500 bg-orange-100") ||
              (order?.sts === "cancelled" && "text-red-500 bg-red-100") ||
              (order?.sts === "delivered" && "text-emerald-500 bg-emerald-100")
            }`}
          >
            {order?.sts}
          </p>
          <div className="flex items-center justify-center gap-2">
            <p className="text-lg font-semibold text-headingColor">Mark As</p>
            <motion.p
              {...buttonClick}
              onClick={() => handleClick(order?.orderId, "preparing")}
              className="text-orange-500 text-base font-semibold
capitalize border border-gray-300 px-2 py-[2px] rounded-md
cursor-pointer"
            >
              Preparing
            </motion.p>
            <motion.p
              {...buttonClick}
              onClick={() => handleClick(order?.orderId, "cancelled")}
              className="text-red-500 text-base font-semibold capitalize
border border-gray-300 px-2 py-[2px] rounded-md
cursor-pointer"
            >
              Cancelled
            </motion.p>
            <motion.p
              {...buttonClick}
              onClick={() => handleClick(order?.orderId, "delivered")}
              className="text-emeral-500 text-base font-semibold
capitalize border border-gray-300 px-2 py-[2px] rounded-md
cursor-pointer"
            >
              Delivered
            </motion.p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start flex-wrap w-full">
        <h1 className="text-xl text-headingColor font-bold mb-4">
          {order?.restaurantName}
        </h1>
        <div className="flex flex-col items-start justify-start gap-1">
          {order?.items &&
            order.items.map((item, j) => (
              <motion.div
                {...staggerFadeInOut(j)}
                key={j}
                className="flex items-center justify-center gap-1"
              >
                <div className="flex items-start flex-col">
                  <p className="text-base font-semibold text-headingColor">
                    {item.name}
                  </p>
                  <div className="flex items-start gap-2">
                    <p className="text-sm text-textColor">
                      Qty: {item.inStock}
                    </p>
                    <p className="flex items-center gap-1 text-textColor">
                      ₹ {parseFloat(item.price / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default OrderData;
