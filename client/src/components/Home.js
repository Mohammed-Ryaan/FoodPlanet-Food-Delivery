import React from "react";
import { Delivery } from "../assets";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { HeroBg } from "../assets";
import { Chicken, Biriyani, Rolls, Pizza } from "../assets";
import { staggerFadeInOut } from "../animations";
import { Link } from "react-router-dom";
import HomeSlider from "./HomeSlider";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getCart } from "../api";
import { setCart } from "../utils/cartSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const user = useSelector((store) => store.user.userDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize cart to get users previous cart items
    // It returns a return on resolving it gives data which we initialize the cart with
    getCart(user?.uid).then((data) => dispatch(setCart(data)));
  }, [user]);
  const randomData = [
    {
      imageURL: Biriyani,
      product_name: "Biriyani",
    },
    {
      imageURL: Rolls,
      product_name: "Rolls",
    },
    {
      imageURL: Pizza,
      product_name: "Pizza",
    },
    {
      imageURL: Chicken,
      product_name: "Chicken Kebab",
    },
  ];
  return (
    <>
      <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-start bg-primary">
        <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
          <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-start justify-start gap-8">
              <div className="px-4 py-1 flex items-center justify-center gap-2bg-orange-100 rounded-full">
                <p className="text-lg font-semibold text-red-400">
                  Fastest Delivery
                </p>
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary shadow-md">
                  <img
                    src={Delivery}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <p className="text-[40px] text-headingColor md:text-[72px] font-sans font-extrabold tracking-wider">
                The Fastest Delivery in{" "}
                <span className="text-red-600">Bengaluru</span>
              </p>
              <p className="text-textColor text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                ipsam doloribus et similique distinctio, rem deleniti ipsa,
                nesciunt vitae labore voluptates sunt ducimus mollitia id
                libero! Nostrum expedita libero recusandae?{" "}
              </p>
              <Link to="/order">
                <motion.button
                  {...buttonClick}
                  className="bg-gradient-to-bl from-red-400 to-red-600 px-4
py-2 rounded-xl text-primary text-base font-semibold"
                >
                  Order Now
                </motion.button>
              </Link>
            </div>

            <div className="py-2 flex-1 flex items-center justify-end relative">
              <img
                className="absolute top-0 right-0 md:-right-12 w-full h-420
md:w-auto md:h-650"
                src={HeroBg}
                alt=""
              />
              <div
                className="w-full_md:w-460 ml-0 flex flex-wrap items-center
justify-center gap-4 gap-y-10"
              >
                {randomData &&
                  randomData.map((data, i) => (
                    <motion.div
                      key={i}
                      {...staggerFadeInOut(i)}
                      className=" w-32 h-36 md:h-auto md:w-190 p-4 ☐bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col
items-center justify-center drop-shadow-lg"
                    >
                      <img
                        src={data.imageURL}
                        className="w-12 h-12 md:w-32 md:h-32 md:-mt-16
object-contain "
                        alt=""
                      />
                      <p
                        className="text-sm lg:text-xl font-semibold
☐text-textColor"
                      >
                        {data.product_name.slice(0, 14)}
                      </p>
                      <p className="text-sm font-semibold text-headingColor">
                        <span className=" text-red-600">Starts at ₹ 99!</span>{" "}
                      </p>
                    </motion.div>
                  ))}
              </div>
            </div>
          </motion.div>
          <HomeSlider />
        </div>
      </div>
    </>
  );
};

export default Home;
