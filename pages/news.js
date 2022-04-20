import React from "react";
import bbc from "./images/BBC.png";
import Image from "next/image";
import Pencil from "./images/pencil.svg";
import Share from "./images/share.svg";

console.log(bbc);
const News = () => {
  return (
    <div>
      <div className="news">
        <div className="news__img">
          <img src={bbc.src} alt="news" className="news__img-img" />
        </div>
        <div className="news__info">
          <div className="top_part">
            <div className="warn mark top_part-level">top</div>
            <div className=" mark time">22:56</div>
          </div>

          <div className="title">
            Big Short' investor Michael Burry warns Tesla will face tougher
            competition — and points to Netflix's rivals slashing its growth
            last quarter
          </div>
          <div className="context">
            Burry rang the alarm on Tesla after Netflix partly blamed newer
            rivals for its slower revenue growth and decline in subscribers last
            quarterBurry rang the alarm on Tesla after Netflix partly blamed
            newer rivals for its slower revenue growth and decline in
            subscribers last quarterBurry rang the alarm on Tesla after Netflix
            partly blamed newer rivals for its slower revenue growth and decline
            in subscribers last quarterBurry rang the alarm on Tesla after
            Netflix partly blamed newer rivals for its slower revenue growth and
            decline in subscribers last quarter
          </div>
          <div className="news__info-3 author">
            <span>
              <Pencil className="pencil" />
              Ruben Abelyan
            </span>
            {/* <span className="">Ruben Abelyan</span> */}

            <div className="center">
              <Share className="eye" width="16px" />
              <span>22</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
