import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import erevan from "../../pages/images/slider/erevan.jpg";
import dilijan from "../../pages/images/slider/dilijan.jpg";
import gyumri from "../../pages/images/slider/gyumri.jpg";
import caxkadzor from "../../pages/images/slider/caxkadzor.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
const Slider = () => {
  return (
    <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
      <SwiperSlide>
        <img src={dilijan.src} />
        <div
          style={{
            padding: "20px 16px 16px",
            background: "rgb(217, 59, 48)",
          }}
        >
          <div style={{ textAlign: "left", fontWeight: "bold" }}>Դիլիջան</div>
          <div style={{ textAlign: "left", fontSize: "14px" }}>69կմ</div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img src={erevan.src} />
        <div
          style={{
            padding: "20px 16px 16px",
            background: "rgb(188, 26, 110)",
          }}
        >
          <div style={{ textAlign: "left", fontWeight: "bold" }}>Երևան</div>
          <div style={{ textAlign: "left", fontSize: "14px" }}>B 1 km</div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img src={gyumri.src} />
        <div
          style={{
            padding: "20px 16px 16px",
            background: "rgb(222, 49, 81)",
          }}
        >
          <div style={{ textAlign: "left", fontWeight: "bold" }}>Գյումրի</div>
          <div style={{ textAlign: "left", fontSize: "14px" }}>125 կմ</div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img src={caxkadzor.src} />
        <div
          style={{
            padding: "20px 16px 16px",
            background: "rgb(204, 45, 74)",
          }}
        >
          <div style={{ textAlign: "left", fontWeight: "bold" }}>Ծաղկաձոր</div>
          <div style={{ textAlign: "left", fontSize: "14px" }}>54 կմ</div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
