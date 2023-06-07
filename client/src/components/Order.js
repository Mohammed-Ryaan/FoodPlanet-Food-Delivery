import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { ALL_RESTAURANT_LINK } from "../utils/constants";
import { searchRestaurant } from "../utils/helper";
import { getCart } from "../api";
import { setCart } from "../utils/cartSlice";
import { useSelector, useDispatch } from "react-redux";

const Order = () => {
  //Using useState Hook
  const [allRestaurants, setAllRestaurants] = useState([]); // To keep a list of all restaurants
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); // To keep a track of filtered restaurants
  const [searchText, setSearchText] = useState();

  //Fetching data from Swiggy API
  async function fetchData() {
    const data = await fetch(ALL_RESTAURANT_LINK);
    const json = await data.json();
    //console.log(json);
    //Optional chaining to prevent errors in case not found
    setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards); //Contains data that we need
    setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards); //Contains data that we need
  }

  const user = useSelector((store) => store.user.userDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();

    // Initialize cart to get users previous cart items
    // It returns a return on resolving it gives data which we initialize the cart with
    getCart(user.uid).then((data) => dispatch(setCart(data)));
  }, [user]);

  //show shimmer if page is loading otherwise show the page details
  return allRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="mt-[100px]">
      <div className="flex items-center justify-between relative">
        <div>
          <input
            type="text"
            placeholder="Search for restaurants..."
            className="w-64 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            type="button"
            className="mx-1 px-4 py-2 bg-red-400 text-white font-semibold rounded-r-md hover:bg-red-500 focus:outline-none focus:bg-red-400"
            onClick={() => {
              const resultData = searchRestaurant(searchText, allRestaurants);
              setFilteredRestaurants(resultData);
            }}
          >
            Search
          </button>
        </div>

        <div className="pr-12 flex mx-4">
          <button
            type="button"
            onClick={() => {
              //Choosing only those restaurants whose rating is above 4
              const filteredList = allRestaurants.filter(
                (restaurant) => restaurant.data.avgRating > 4
              );

              //Setting the value of our listOfRestaurants
              setFilteredRestaurants(filteredList);
            }}
            className="flex items-center justify-center px-4 py-2 bg-red-400 text-white font-semibold rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500 mx-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
            Top Rated
          </button>
          <button
            type="button"
            onClick={() => {
              setFilteredRestaurants(allRestaurants);
            }}
            className="flex items-center justify-center px-4 py-2 bg-red-400 text-white font-semibold rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-5s00"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
            All
          </button>
        </div>
      </div>

      <div
        className="flex flex-wrap items-start
justify-start gap-12 gap-y-14 pl-10 mt-10"
      >
        {
          //Mapping over all the elements of RestList. Map is better than for loop and is industry standard
          //Always pass a key when mapping over a collection
          filteredRestaurants.map((restaurant) => (
            <Link
              key={restaurant.data.id}
              to={"/restaurant/" + restaurant?.data?.id}
              className="res-menu-link"
            >
              <RestaurantCard resData={restaurant} />
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default Order;
