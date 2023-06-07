import { useSelector, useDispatch } from "react-redux";
import FoodItemCard from "./FoodItemCard";
import { clearCart } from "../utils/cartSlice";
import { CDN_LINK } from "../utils/constants";
import { motion } from "framer-motion";
import { buttonClick, slideIn } from "../animations";
import { useEffect, useState } from "react";
import CartEmpty from "./CartEmpty";
import { updateCart } from "../api";
import { clearCartInFB } from "../api";
import { showAlert } from "../utils/alertSlice";
import { getCart } from "../api";
import { checkOut } from "../api/index";
import { addToCart, removeFromCart } from "../api";
import { setCart } from "../utils/cartSlice";
import useRestaurant from "../utils/useRestaurant";

const Cart = () => {
  const cart = useSelector((store) => store.cart);
  const resId = cart.restaurantId;
  const user = useSelector((store) => store.user.userDetails);
  const [allowChangeInCart, setAllowChangeInCart] = useState(true);

  const { restaurant, menu } = useRestaurant(resId);
  //console.log(restaurant?.name);

  const dispatch = useDispatch();

  const handleClearCart = async () => {
    //To clear cart in FireBase database
    await clearCartInFB(user.uid);

    //To clear the cart
    dispatch(clearCart());

    dispatch(
      showAlert({
        type: "success",
        message: "Cart Cleared Successfully",
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

  useEffect(() => {
    //Update cart in database
    //handleUpdateCart();

    // Initialize cart to get users previous cart items
    // It returns a return on resolving it gives data which we initialize the cart with
    getCart(user.uid).then((data) => dispatch(setCart(data)));
  });

  const handleAddItem = async (item) => {
    setAllowChangeInCart(false);
    addToCart(user.uid, item, resId);

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

  const handleRemoveItem = async (item) => {
    setAllowChangeInCart(false);

    removeFromCart(user.uid, item);

    getCart(user.uid).then((cart) => dispatch(setCart(cart)));

    setAllowChangeInCart(true);

    if (cart.quantity === 0) {
      handleClearCart();
    }

    dispatch(
      showAlert({
        type: "success",
        message: "Removed From Cart",
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

  const getItemQuantity = (id) => {
    const index = cart.cartItems.findIndex((item) => item.id === id);

    return cart.cartItems[index].inStock;
  };

  const handleCheckOut = async (cart) => {
    await checkOut(cart);
  };

  return cart && cart.quantity === 0 ? (
    <CartEmpty />
  ) : (
    <div class="container mx-auto py-10">
      <div class="mt-4 flex justify-between">
        <h2 class="text-2xl font-bold mb-4">Checkout</h2>
        <motion.button
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => handleClearCart()}
          {...buttonClick}
        >
          Clear Cart
        </motion.button>
      </div>
      <div className="bg-primary">
        {cart.cartItems.map((item) => (
          <div class="flex flex-col flex-wrap items-start justify-start bg-primary">
            <div class="border p-4 w-[850px] flex item-start justify-start">
              <img
                src={CDN_LINK + item.imageId}
                alt="Item 1"
                class="w-50 h-40 mx-6"
              />
              <div className="py-4 pr-10">
                <h3 class="text-lg font-semibold flex flex-wrap">
                  {item.name}
                </h3>
                <p class="text-gray-600 pt-2">
                  Price:{" ₹ "}
                  {item?.price > 0
                    ? (item.price / 100) * item.inStock
                    : (item.defaultPrice / 100) * item.inStock}
                </p>
                <div className="flex items-center pt-8">
                  {allowChangeInCart ? (
                    <div>
                      <motion.button
                        type="button"
                        className="w-12 bg-red-400 hover:bg-red-500 text-white px-3 py-2 rounded-l"
                        {...buttonClick}
                        onClick={() => {
                          handleRemoveItem(item);
                        }}
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
                        value={getItemQuantity(item.id)}
                        className="w-16 text-center bg-primary px-3 py-2"
                        {...slideIn}
                      />

                      <motion.button
                        type="button"
                        className=" w-12 bg-red-400 hover:bg-red-500 text-white px-3 py-2 rounded-r"
                        {...buttonClick}
                        {...slideIn}
                        onClick={() => {
                          handleAddItem(item);
                        }}
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
                    <div className="animate-pulse">
                      <motion.button
                        type="button"
                        className="w-12 bg-red-400 hover:bg-red-500 text-white px-3 py-2 rounded-l"
                        {...buttonClick}
                        onClick={() => {
                          //handleRemoveItem(item);
                        }}
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
                        value={getItemQuantity(item.id)}
                        className="w-16 text-center bg-primary px-3 py-2"
                        {...slideIn}
                      />

                      <motion.button
                        type="button"
                        className=" w-12 bg-red-400 hover:bg-red-500 text-white px-3 py-2 rounded-r"
                        {...buttonClick}
                        {...slideIn}
                        onClick={() => {
                          //handleAddItem(item);
                        }}
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
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="ml-8">
        <div class="mt-8">
          <h4 class="text-2xl font-semibold">Total Price :</h4>
          <p class="text-gray-600 text-xl pt-2" id="totalPrice">
            ₹ {cart.total}
          </p>
        </div>

        {/* Proceed to Payment only when user is signed in */}
        {user?.uid ? (
          <div class="mt-4">
            <motion.button
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              {...buttonClick}
              onClick={() => {
                checkOut(user?.uid, cart, restaurant?.name);
              }}
            >
              Proceed To Payment
            </motion.button>
          </div>
        ) : (
          <div class="mt-4">
            <motion.button
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              {...buttonClick}
              onClick={() => {
                dispatch(
                  showAlert({
                    type: "danger",
                    message: "Need To Sign In before Proceeding to Payment",
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
              }}
            >
              Proceed To Payment
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
