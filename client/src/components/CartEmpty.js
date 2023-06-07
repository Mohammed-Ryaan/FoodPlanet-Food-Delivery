import React from "react";
import { Link } from "react-router-dom";
import { buttonClick, slideIn } from "../animations";

const CartEmpty = () => {
  return (
    <div class="flex items-center justify-center h-screen">
      <div class="p-8 bg-white rounded-lg shadow-lg">
        <svg
          class="w-16 h-16 mx-auto text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        <h2 class="mt-4 text-2xl font-bold text-gray-700">
          Your cart is empty
        </h2>
        <p class="mt-2 text-gray-500 pb-5">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link
          to="/order"
          class="mt-4 px-6 py-2 font-medium text-white bg-red-400 rounded-lg hover:bg-red-500"
          {...slideIn}
          {...buttonClick}
        >
          Order Now
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
