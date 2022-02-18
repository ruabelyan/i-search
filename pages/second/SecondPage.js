import React from "react";
import css from "./SecondPage.module.css";
import img from "../images/search_2.png";
import menu from "../images/menu.png";
import list from "../images/list.png";
import geo from "../images/geolocation.png";
import { Map, Placemark, YMaps } from "react-yandex-maps";
import Image from "next/image";
import backIcon from "../svg/back.png";
import searchIcon from "../svg/search.png";
import ArrowPrevTailIcon from "../svg/back.svg";

const SecondPage = () => {
  return (
    <div className={css.main}>
      <div className={css.secondPage}>
        <div className={css.bg}>
          <div className={css.bgContainer}>
            <div style={{ height: "50px", width: "301px", marginTop: "10px" }}>
              <Image src={img} alt="search" />
            </div>
            <div className={css.firstSearchBlock}>
              <input type="text" placeholder={"Մուտքագրեք որոնման տվյալները"} />
              <div
                style={{
                  position: "absolute",
                  top: "23px",
                  right: "10px",
                  height: "50px",
                  width: "50px",
                }}
              >
                <ArrowPrevTailIcon />
              </div>
            </div>
            <div className={css.secondSearchBlock}>
              <input type="text" placeholder={"Մուտքագրեք շաառավիղը"} />
              <button>Որոնել</button>
            </div>
            <div className={css.map}>
              <YMaps>
                <Map
                  style={{ with: "80%", height: "72%", paddingTop: "10px" }}
                  defaultState={{ center: [55.75, 37.57], zoom: 9 }}
                  instanceRef={(inst) => {
                    inst.events.add("click", console.log);
                  }}
                >
                  <Placemark
                    geometry={[55.75, 37.57]}
                    instanceRef={(inst) => {
                      console.log(
                        ":rocket: ~ file: App.js ~ line 22 ~ App ~ inst",
                        inst
                      );
                      inst.events.add("click", (e) => {
                        console.log(
                          ":rocket: ~ file: App.js ~ line 26 ~ App ~ e",
                          e
                        );
                      });
                    }}
                  />
                </Map>
              </YMaps>
              <div className={css.mapSuggestion}>
                <div className={css.suggestionContainer}>
                  <span>Երևան մոլ - (Արշակունյանց 14) - 500մ</span>
                  <span>Երևան մոլ - (Արշակունյանց 14) - 500մ</span>
                  <span>Երևան մոլ - (Արշակունյանց 14) - 500մ</span>
                  <span>Երևան մոլ - (Արշակունյանց 14) - 500մ</span>
                  <span>Երևան մոլ - (Արշակունյանց 14) - 500մ</span>
                  <span>Երևան մոլ - (Արշակունյանց 14) - 500մ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={css.secondPageFooter}>
          <Image src={backIcon} alt="backIcon" />
          <Image src={geo} alt="geo" />

          <Image src={list} alt="list" />

          <Image src={menu} alt="menu" />
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
