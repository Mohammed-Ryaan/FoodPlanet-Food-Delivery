import { CDN_LINK } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  buttonClick,
  slideIn,
  slideTop,
  staggerFadeInOut,
} from "../animations";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { addItem, removeItem, setCart } from "../utils/cartSlice";
import { updateCart } from "../api";
import { showAlert } from "../utils/alertSlice";
import { getCart, addToCart, removeFromCart } from "../api";

const FoodItemCard = ({ item, resId }) => {
  //Destructuring things that we need from resData
  //console.log(item);
  const { imageId, name, description, price, id, inStock } = item;
  const [showDescription, setShowDescription] = useState(false);

  //If item quantity is zero then we show add item, otherwise we show plus minus buttons
  const [showAddButton, setShowAddButton] = useState(false);

  const [allowChangeInCart, setAllowChangeInCart] = useState(true);

  const dispatch = useDispatch();

  const cart = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user.userDetails);

  const navigate = useNavigate();

  if (!item) {
    navigate("/", { replace: true });
  }

  const handleAddItem = async () => {
    setAllowChangeInCart(false);
    //Add first in the firebase
    addToCart(user.uid, item, resId);

    //Update the UI
    getCart(user.uid).then((cart) => dispatch(setCart(cart)));

    setAllowChangeInCart(true);

    dispatch(
      showAlert({
        type: "success",
        message: "Added to Cart",
      })
    );

    setTimeout(() => {
      dispatch(
        showAlert({
          type: "",
          message: "",
        })
      );
    }, 3000);
  };

  const handleRemoveItem = async () => {
    setAllowChangeInCart(false);
    //Remove from firebase
    removeFromCart(user.uid, item);

    //Update the UI
    getCart(user.uid).then((cart) => dispatch(setCart(cart)));

    setAllowChangeInCart(true);

    dispatch(
      showAlert({
        type: "success",
        message: "Removed from Cart",
      })
    );

    setTimeout(() => {
      dispatch(
        showAlert({
          type: "",
          message: "",
        })
      );
    }, 3000);
  };

  const getItemQuantity = () => {
    const index = cart.cartItems.findIndex((item) => item.id === id);
    if (index === -1) {
      setShowAddButton(0);
      return 0;
    }
    return cart.cartItems[index].inStock;
  };

  useEffect(() => {
    const itemQuantity = getItemQuantity();
    itemQuantity > 0 ? setShowAddButton(true) : setShowAddButton(false);
  }, [cart]);

  return (
    <motion.div
      className="w-46 bg-white shadow-lg rounded-lg overflow-hidden m-20 hover:bg-primary"
      onClick={() => {
        setShowDescription(false);
      }}
      {...staggerFadeInOut(1)}
    >
      {showDescription && (
        <motion.div
          className="px-6 py-4 w-[160px] bg-cardOverlay
backdrop-blur-md rounded-md shadow-md absolute
flex flex-col gap-4 -m-14 ml-[200px]"
          onBlur={() => setShowDescription(false)}
          onMouseLeave={() => setShowDescription(false)}
          {...slideTop}
        >
          <p className="text-gray-600 mb-4 flex flex-wrap">{description}</p>
        </motion.div>
      )}
      <img
        src={CDN_LINK + imageId}
        alt="Food"
        className="w-full h-48 object-cover"
        onMouseEnter={() => {
          setShowDescription(true);
        }}
      />
      <div className="p-4">
        <h3 className="text-xl font-medium text-gray-800">{name}</h3>
        {/* <p className="text-gray-600 mb-4 flex flex-wrap">{description}</p> */}
        {/* {showDescription && ( */}
        <p className="text-gray-600">
          ₹ {!price ? item?.defaultPrice / 100 : price / 100}
        </p>
        <div className="flex items-center justify-between mt-2">
          {showAddButton ? (
            <div className="flex items-center">
              <motion.button
                type="button"
                className="w-16 bg-red-400 hover:bg-red-500 text-white px-3 py-2 rounded-l"
                {...buttonClick}
                onClick={handleRemoveItem}
                {...slideIn}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M20 12H4"></path>
                </svg>
              </motion.button>
              <motion.input
                type="number"
                value={getItemQuantity()}
                className="w-16 text-center bg-primary px-3 py-2"
                {...slideIn}
              />

              <motion.button
                type="button"
                className="w-16 bg-red-400 hover:bg-red-500 text-white px-3 py-2 rounded-r"
                {...buttonClick}
                {...slideIn}
                onClick={handleAddItem}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M12 4v16m8-8H4"></path>
                </svg>
              </motion.button>
            </div>
          ) : (
            <motion.button
              type="button"
              {...buttonClick}
              {...slideTop}
              className="px-4 py-2 bg-red-400 text-white font-semibold rounded-md hover:bg-red-500 focus:outline-none "
              onClick={() => {
                handleAddItem();
              }}
            >
              Add Item
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

{
  /* // <div classNameName="res-card">
    //   <h3 classNameName="font-bold">{name}</h3>
    //   <img src={CDN_LINK + imageId} alt="Food Logo" classNameName="res-logo"></img>
    //   <h5>₹{price / 100}</h5>
    //   <h5>Quantity : {inStock}</h5>
    //   <h5>{description}</h5>
    //   <div>
    //     <button
    //       classNameName="p-2 m-5 bg-green-100" */
}
//       // onClick={() => {
//       //   addFoodItem(item);
//       // }}
//     >
//       Add Item
//     </button>
//     <button
//       classNameName="border p-2 m-5 bg-red-100"
//       // onClick={() => {
//       //   removeFoodItem(id);
//       // }}
//     >
//       Remove Item
//     </button>
//   </div>
// </div>

export default FoodItemCard;
