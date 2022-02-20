import React, { useRef, useState } from "react";
import css from "./SecondPage.module.css";
import img from "../images/search_2.png";
import menu from "../images/menu.png";
import list from "../images/list.png";
import geo from "../images/geolocation.png";
import { Map, Placemark, Circle, YMaps } from "react-yandex-maps";
import Image from "next/image";
import backIcon from "../svg/back.png";
import searchIcon from "../svg/search.png";
import ArrowPrevTailIcon from "../svg/back.svg";

const SecondPage = () => {
  const [position, setPosition] = useState([]);
  const [radius, setRadius] = useState(1000);

  const RADIUS = 1500;
  const circle = useRef(null);
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    setPosition([coords.latitude, coords.longitude]);
  }, console.log("error"));

  // console.log(position);
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
              <div className={css.inputStyles}>
                <ArrowPrevTailIcon />
              </div>
            </div>
            <div className={css.secondSearchBlock}>
              <input
                type="text"
                onChange={({ target }) => setRadius(+target.value)}
                placeholder={"Մուտքագրեք շաառավիղը"}
              />
              <button onClick={()=> setRadius(+target.value)}>Որոնել</button>
            </div>
            <div className={css.map}>
              <YMaps>
                <Map
                  style={{ with: "80%", height: "72%", paddingTop: "10px" }}
                  defaultState={{ center: position, zoom: 13 }}
                  // instanceRef={(inst) => {
                  //   inst.events.add("click", console.log);
                  // }}
                >
                  <Placemark
                    geometry={position}
                    instanceRef={(inst) => {
                      console.log(
                        ":rocket: ~ file: App.js ~ line 22 ~ App ~ inst",
                        inst
                      );
                      inst &&
                        inst.events.add("click", (e) => {
                          console.log(
                            ":rocket: ~ file: App.js ~ line 26 ~ App ~ e",
                            e
                          );
                        });
                    }}
                  />
                  <Circle
                    geometry={[position, radius]}
                    defaultGeometry={[position, RADIUS]}
                    options={{
                      draggable: false,
                      fillColor: "#8998a377",
                      strokeColor: "#8998a3",
                      strokeOpacity: 0.9,
                      strokeWidth: 2,
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
