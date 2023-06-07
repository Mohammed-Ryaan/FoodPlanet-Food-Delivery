import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../assets/css/swiperStyles.css";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import { Chicken } from "../assets";
import SliderCard from "./SliderCard";
import { useEffect, useState } from "react";
import { ALL_RESTAURANT_LINK } from "../utils/constants";

const Slider = () => {
  const [resData, setResData] = useState([]);

  async function fetchData() {
    const data = await fetch(ALL_RESTAURANT_LINK);
    const json = await data.json();
    //console.log(json);
    //Optional chaining to prevent errors in case not found

    const allRes = json?.data?.cards[2]?.data?.data?.cards;
    //console.log(allRes);
    const filteredRes = allRes.filter((restaurant) => {
      return restaurant?.data?.avgRating > 4;
    });

    setResData(filteredRes);
    //console.log(resData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full pt-24">
      <Swiper
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
        className="mySwiper"
      >
        {resData &&
          resData.map((data, i) => (
            <SwiperSlide key={data?.id}>
              <SliderCard key={data?.id} data={data} index={i} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
export default Slider;
