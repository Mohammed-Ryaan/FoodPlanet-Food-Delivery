import { CDN_LINK } from "../utils/constants";
import { useContext } from "react";
import { motion } from "framer-motion";
import { buttonClick, staggerFadeInOut } from "../animations";

const RestaurantCard = (props) => {
  //props is an object which contains all the attributes we passed, we are destructuring it below;
  const { resData } = props;
  //Destructuring things that we need from resData
  const {
    cloudinaryImageId,
    name,
    cuisines,
    deliveryTime,
    costForTwo,
    avgRating,
  } = resData?.data;

  //Getting the data from useContext
  //const { user } = useContext(UserContext);

  return (
    <motion.div
      className="max-w-xs bg-white rounded-lg overflow-hidden hover:bg-primary hover:shadow-lg"
      {...staggerFadeInOut(1)}
      {...buttonClick}
    >
      <img
        src={CDN_LINK + cloudinaryImageId}
        alt="Restaurant"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-2xl font-semibold text-gray-800">{name}</h3>
        <p>{cuisines.join(", ")}</p>
        <div className="flex items-center mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-yellow-500"
          >
            <path
              fill-rule="evenodd"
              d="M23.25 9.433l-7.434-.953L12 1.02 8.184 8.48l-7.433.953 5.385 5.247-1.27 7.41L12 18.198l6.133 3.89-1.27-7.41L23.25 9.433zM12 15.937l-3.866 1.827.78-4.54L6.5 9.428l4.54-.584L12 4.666l1.96 3.178 4.54.584-3.413 3.796.78 4.54L12 15.938z"
              clip-rule="evenodd"
            />
          </svg>
          <span className="text-gray-600 ml-1">{avgRating}</span>
        </div>
        <div className="flex items-center mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-gray-600"
          >
            <path
              fill-rule="evenodd"
              d="M12 1l3.09 6.272 6.911.98-5 4.867 1.182 6.879L12 17.467l-6.091 3.343 1.182-6.879-5-4.867 6.911-.98L12 1z"
              clip-rule="evenodd"
            />
          </svg>
          <span className="text-gray-600 ml-1">{deliveryTime + " "} min </span>
        </div>
        <div className="flex items-center mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-gray-600"
          >
            <path
              fill-rule="evenodd"
              d="M6.47 16.634l-.62-3.802-4.76-.692a.75.75 0 0 1-.414-1.293l3.448-3.356-.814-4.737a.75.75 0 0 1 1.09-.79l4.268 2.244 4.268-2.244a.75.75 0 0 1 1.09.79l-.814 4.737 3.448 3.356a.75.75 0 0 1-.414 1.293l-4.76.692-.62 3.802a.75.75 0 0 1-1.37 0zm2.53-5.634a.75.75 0 0 1 .316.068l3.118 1.65 3.118-1.65a.75.75 0 0 1 .884 1.202l-2.27 2.208.536 3.124a.75.75 0 0 1-1.087.79L12 16.857l-2.655 1.395a.75.75 0 0 1-1.087-.79l.536-3.124-2.27-2.208a.75.75 0 0 1 .884-1.202l3.118 1.65 3.118-1.65a.75.75 0 0 1 .316-.068z"
              clip-rule="evenodd"
            />
          </svg>
          <span className="text-gray-600 ml-1">
            ₹{" " + costForTwo / 100} For Two
          </span>
        </div>
      </div>
    </motion.div>
  );
};
{
  /* //       We are getting individual restaurant images from Swiggy Cloud where they have stored these images */
}
{
  //         {...staggerFadeInOut(1)}
  //         className=" w-400 h-320 p-4 ☐bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-wrap
  // items-center justify-center drop-shadow-lg hover:bg-gray-100"
  //       >
  //         <img
  //           src={CDN_LINK + cloudinaryImageId}
  //           alt="Food Logo"
  //           className="w-[50%] h-full object-contain "
  //         />
  //         <div className="flex flex-col flex-wrap justify-between items-start">
  //           <p className="text-2xl font-bold">{name}</p>
  //           <p className="text-2xl font-semibold">{avgRating}</p>
  //           <p className="text-2xl font-semibold">{deliveryTime}</p>
  //           <p className="text-[12px] text-center font-semibold capitalize">
  //             {cuisines.join(", ")}
  //           </p>
  //           <p className="text-xl font-semibold">
  //             <span className="text-xl text-red-600">
  //               ₹{costForTwo / 100} For Two
  //             </span>
  //           </p>
  //         </div>
  //       </motion.div>
  //     </div>
}

export default RestaurantCard;
