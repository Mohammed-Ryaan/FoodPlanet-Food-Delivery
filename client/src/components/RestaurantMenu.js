import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CDN_LINK } from "../utils/constants";
import { RESTAURANT_MENU_LINK } from "../utils/constants";
import Shimmer from "./Shimmer";
import useRestaurant from "../utils/useRestaurant";
import { useDispatch } from "react-redux";
// import { addItem } from "../utils/cartSlice";
// import { removeItem } from "../utils/cartSlice";
import FoodItemCard from "./FoodItemCard";
import Alert from "./Alert";
import { useSelector } from "react-redux";
import { getCart } from "../api";
import { setCart } from "../utils/cartSlice";

const RestaurantMenu = () => {
  const param = useParams();
  // console.log(param);
  const { id } = param;
  const alert = useSelector((store) => store.alert);
  const user = useSelector((store) => store.user.userDetails);

  //This custom hook returns res data and its menu by using id
  const { restaurant, menu } = useRestaurant(id); //Using it as a normal JS function

  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize cart to get users previous cart items
    // It returns a return on resolving it gives data which we initialize the cart with
    getCart(user.uid).then((data) => dispatch(setCart(data)));
  });

  return restaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="m-20 mt-25">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <div className="bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={CDN_LINK + restaurant?.cloudinaryImageId}
              alt="Restaurant Image"
              className="w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 ml-4 mb-4">
              <h2>{restaurant?.name}</h2>
            </h2>
            <div className="flex flex-col text-xl">
              <div className="flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="h-5 w-5 text-gray-600 mr-2"
                >
                  <path d="M12 4v16m8-8H4"></path>
                </svg>
                <p className="text-gray-600">
                  <h3>{restaurant?.cuisines.join(", ")}</h3>
                </p>{" "}
              </div>

              <div className="flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="h-5 w-5 text-gray-600 mr-2"
                >
                  <path d="M12 4v16m8-8H4"></path>
                </svg>
                <p className="text-gray-600">
                  <h3>{restaurant?.locality}</h3>
                </p>{" "}
              </div>
              <div className="flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="h-5 w-5 text-gray-600 mr-2"
                >
                  <path d="M12 4v16m8-8H4"></path>
                </svg>
                <p className="text-gray-600">
                  <p className="text-gray-600">
                    <h3>{restaurant?.city}</h3>
                  </p>{" "}
                </p>
              </div>
              <div className="flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="h-5 w-5 text-gray-600 mr-2"
                >
                  <path d="M12 4v16m8-8H4"></path>
                </svg>
                <p className="text-gray-600">
                  <p className="text-gray-600">
                    <h3>{restaurant?.avgRating + " stars"}</h3>
                  </p>{" "}
                </p>
              </div>
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="h-5 w-5 text-gray-600 mr-2"
                >
                  <path d="M12 4v16m8-8H4"></path>
                </svg>
                <p className="text-gray-600">
                  <h3>₹{restaurant?.costForTwo / 100} For Two</h3>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="res-menu">
        <div className="bg-white shadow-lg rounded-lg p-6 mt-10">
          <p className="text-2xl font-semibold text-gray-800 ml-4 mb-4">Menu</p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="bg-white overflow-hidden flex flex-wrap items-start justify-start">
              {menu.map((item) => (
                <FoodItemCard
                  key={item?.id}
                  item={item?.card?.info}
                  resId={id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Alert type={alert.type} message={alert.message} />;
    </div>
  );
};

export default RestaurantMenu;
