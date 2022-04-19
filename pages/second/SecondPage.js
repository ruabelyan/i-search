/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useRef, useState } from "react";
import css from "./SecondPage.module.css";
import img from "../images/search_2.png";
import menu from "../images/menu.png";
import geo from "../images/geolocation.png";
import exchange from "../images/Group.png";
import {
  Map,
  Placemark,
  Circle,
  YMaps,
  SearchControl,
} from "react-yandex-maps";
import Image from "next/image";
import backIcon from "../svg/back.png";
import searchIcon from "../svg/search.png";
import ArrowPrevTailIcon from "../svg/back.svg";
import Link from "next/link";
import Sidebar from "../sidebar";
import { slide as Menu } from "react-burger-menu";
import "react-open-weather-widget/lib/css/ReactWeather.css";
var ReactWeather = require("react-open-weather-widget").default;

const SecondPage = () => {
  const [position, setPosition] = useState([]);
  const [radius, setRadius] = useState(1000);

  const RADIUS = 1500;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setPosition([coords.latitude, coords.longitude]);
    }, console.log("error"));
  }, []);

  // console.log(position);
  return (
    <div className={css.main}>
      <Sidebar outerContainerId={"App"} />
      <Menu>
        <a id="home" className="menu-item" href="/rates">
          Rates
        </a>
        <a id="about" className="menu-item" href="/news">
          News
        </a>
        <a className="menu-item--small" href="">
          Settings
        </a>
      </Menu>

      <div className={css.secondPage}>
        <div className={css.bg}>
          <div className={css.bgContainer}>
            <div style={{ height: "50px", width: "301px", marginTop: "10px" }}>
              <Image src={img} alt="search" />
            </div>
            {/* <div className={css.firstSearchBlock}>
              <input type="text" placeholder={"Մուտքագրեք որոնման տվյալները"} />
              <div className={css.inputStyles}>
                <ArrowPrevTailIcon />
              </div>
            </div> */}
            <div className={css.secondSearchBlock}>
              <input
                type="text"
                onChange={({ target }) => (radius = +target.value)}
                placeholder={"Մուտքագրեք շաառավիղը"}
              />
              <button onClick={() => setRadius(radius)}>Որոնել</button>
            </div>
            <div className={css.map}>
              <YMaps>
                <Map
                  style={{ with: "80%", height: "78%", paddingTop: "10px" }}
                  defaultState={{ center: position, zoom: 13 }}
                  // instanceRef={(inst) => {
                  //   inst.events.add("click", console.log);
                  // }}
                >
                  <SearchControl sumbit={(events) => console.log(events)} />
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
              {/* <div className={css.mapSuggestion}>
                <div className={css.suggestionContainer}>
                  <span>Երևան մոլ - (Արշակունյանց 14) - 500մ</span>
                  <span>Երևան մոլ - (Արշակունյանց 14) - 500մ</span>
                  <span>Երևան մոլ - (Արշակունյանց 14) - 500մ</span>
                  <span>Երևան մոլ - (Արշակունյանց 14) - 500մ</span>
                  <span>Երևան մոլ - (Արշակունյանց 14) - 500մ</span>
                  <span>Երևան մոլ - (Արշակունյանց 14) - 500մ</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="wheather">
          <ReactWeather
            forecast="today"
            apikey="7cc0a3060e58f17a24e70b46ad9ed851"
            type="city"
            city="Yerevan"
            lang="am"
          />
        </div>
        <div className={css.secondPageFooter}>
          <Image src={backIcon} alt="backIcon" />
          <Image src={geo} alt="geo" />
          <Link href="rates">
            <Image src={exchange} alt="list" />
          </Link>
          <span style={{ opacity: "0" }}>
            <Image style={{ opacity: "none" }} src={exchange} alt="list" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
