/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useRef, useState } from "react";
import css from "../styles/second/SecondPage.module.css";
import img from "./images/search_3.png";
import backIcon from "./images/back.png";
import geo from "./images/icon2.png";
import news from "./images/news.png";
import exchange from "./images/icon3.png";
import {
  Map,
  Placemark,
  Circle,
  YMaps,
  SearchControl,
} from "react-yandex-maps";
import Image from "next/image";

import ArrowPrevTailIcon from "./svg/back.svg";
import Link from "next/link";
import Sidebar from "./sidebar";
import { slide as Menu } from "react-burger-menu";
import "react-open-weather-widget/lib/css/ReactWeather.css";

import { useRouter } from "next/router";
import Doth from "./components/doth";

const SecondPage = () => {
  const router = useRouter();

  const [position, setPosition] = useState([]);
  const [radius, setRadius] = useState(1000);

  const RADIUS = 1500;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setPosition([coords.latitude, coords.longitude]);
    }, console.log("error"));
  }, []);

  console.log(router.pathname);

  return (
    <div className={css.main}>
      <Sidebar outerContainerId={"App"} />
      <Menu>
        <div style={{ fontSize: "16px" }} className="menu-item--small">
          <Link href="/main">Գլխավոր</Link>
        </div>
        <div style={{ fontSize: "16px" }} className="menu-item">
          <Link href="/main">Արտարժույթի փոխանակում</Link>
        </div>
        <div
          style={{ fontSize: "16px" }}
          id="about"
          className="menu-item"
          href="/news"
        >
          <Link href="/news">Նորություններ</Link>
        </div>
      </Menu>

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
                onChange={({ target }) => (radius = +target.value)}
                placeholder={"Մուտքագրեք շաառավիղը"}
              />
              <button onClick={() => setRadius(radius)}>Որոնել</button>
            </div>
            <div className={css.map}>
              <YMaps>
                <Map
                  style={{ with: "80%", height: "75%", paddingTop: "10px" }}
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
        <div className={css.secondPageFooter}>
          <div>
            <Image
              onClick={() => router.back()}
              src={backIcon}
              alt="backIcon"
            />
          </div>
          <div>
            <Image src={geo} alt="geo" />
            {router.pathname === "/main" && <Doth />}
          </div>

          <div>
            <Link href="rates">
              <Image src={exchange} alt="list" />
            </Link>
          </div>
          <div>
            <Link href="/news">
              <Image src={news} alt="news" />
            </Link>
          </div>
          <span style={{ opacity: "0" }}>
            <Image style={{ opacity: "none" }} src={exchange} alt="list" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
