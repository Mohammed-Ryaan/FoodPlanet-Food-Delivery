import { motion } from "framer-motion";
import React from "react";
import { buttonClick, staggerFadeInOut } from "../animations";
import { CDN_LINK } from "../utils/constants";
import { Link } from "react-router-dom";

const SliderCard = ({ data, i }) => {
  const {
    cloudinaryImageId,
    name,
    cuisines,
    deliveryTime,
    costForTwo,
    avgRating,
  } = data.data;

  return (
    <Link to={"/restaurant/" + data.data.id}>
      <motion.div
        className="bg-cardOverlay hover:drop-shadow-lg backdrop-blur-md rounded-xl flex items-center justify-between relative px-4 py-2 w-full md:w-340 md:min-w-350 gap-3"
        {...staggerFadeInOut(i)}
      >
        <img
          src={CDN_LINK + cloudinaryImageId}
          className="w-40 h-40 object-contain"
          alt=""
        />
        <div className="relative pt-12">
          <p className="text-xl text-headingColor font-semibold">{name}</p>
          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 text-red-500"
            >
              <path
                fill-rule="evenodd"
                d="M23.25 9.433l-7.434-.953L12 1.02 8.184 8.48l-7.433.953 5.385 5.247-1.27 7.41L12 18.198l6.133 3.89-1.27-7.41L23.25 9.433zM12 15.937l-3.866 1.827.78-4.54L6.5 9.428l4.54-.584L12 4.666l1.96 3.178 4.54.584-3.413 3.796.78 4.54L12 15.938z"
                clip-rule="evenodd"
              />
            </svg>
            <p className="text-lg font-semibold text-red-500 px-2">
              {avgRating + " "}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
export default SliderCard;
