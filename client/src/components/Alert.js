import React from "react";
import { motion } from "framer-motion";
import { fadeInOut } from "../animations";

const Alert = ({ type, message }) => {
  if (type === "success") {
    return (
      <motion.div
        {...fadeInOut}
        className="top-32 right-12 z-50 fixed px-4 py-2 rounded-md backdrop-blur-sm bg-emerald-300 shadow-md gap-4 flex items-center"
      >
        <p className="text-xl text-emerald-700">&#x2714; {"  " + message}</p>
      </motion.div>
    );
  }

  if (type === "warning") {
    return (
      <motion.div
        {...fadeInOut}
        className="top-32 right-12 z-50 fixed px-4 py-2 rounded-md backdrop-blur-sm bg-orange-300 shadow-md gap-4 flex items-center"
      >
        <p className="text-2xl text-orange-700">&#x26A0;{"  " + message}</p>
      </motion.div>
    );
  }

  if (type === "danger") {
    return (
      <motion.div
        {...fadeInOut}
        className="top-32 right-12 z-50 fixed px-4 py-2 rounded-md backdrop-blur-sm bg-red-300 shadow-md gap-4 flex items-center"
      >
        <p className="text-2xl text-red-700">&#x26A0;{"  " + message}</p>
      </motion.div>
    );
  }

  if (type === "info") {
    return (
      <motion.div
        {...fadeInOut}
        className="top-32 right-12 z-50 fixed px-4 py-2 rounded-md backdrop-blur-sm bg-blue-300 shadow-md gap-4 flex items-center"
      >
        <p className="text-xl text-blue-700">&#x24D8;{"  " + message}</p>
      </motion.div>
    );
  }
};

export default Alert;
