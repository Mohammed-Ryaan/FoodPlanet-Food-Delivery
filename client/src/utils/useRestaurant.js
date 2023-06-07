//This is a custom hook which returns restaurant data and its menu when it is given the restaurant id

import { useState, useEffect } from "react";
import { RESTAURANT_MENU_LINK } from "./constants";

const useRestaurant = (id) => {
  const [restaurant, setRestaurant] = useState([]);
  const [menu, setMenu] = useState([]);

  async function getRestaurantMenu() {
    const data = await fetch(RESTAURANT_MENU_LINK + id);
    const json = await data?.json();

    //console.log(json);
    //console.log(json?.data?.cards[2]);
    // console.log(
    //   json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards
    // );

    setMenu(
      //To convert object to array
      Object.values(
        json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
          ?.card?.itemCards
          ? json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]
              ?.card?.card?.itemCards
          : json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]
              ?.card?.card?.itemCards
      )
    );

    setRestaurant(json?.data?.cards[0]?.card?.card?.info);
  }

  useEffect(() => {
    getRestaurantMenu();
  }, []);

  return { restaurant, menu };
};

export default useRestaurant;
