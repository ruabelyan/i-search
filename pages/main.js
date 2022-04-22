/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useRef, useState } from "react";
import css from "../styles/second/SecondPage.module.css";
import img from "./images/Group-6.png";
import erevan from "./images/slider/erevan.jpg";
import dilijan from "./images/slider/dilijan.jpg";
import gyumri from "./images/slider/gyumri.jpg";
import caxkadzor from "./images/slider/caxkadzor.jpg";
import Logo from "./images/Group-5.svg";
import Euro from "./images/icons/euro.svg";
import Back from "./images/icons/back.svg";
import News from "./images/icons/news.svg";
import Location from "./images/icons/map.svg";

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
import "bootstrap/dist/css/bootstrap.css";

import { useRouter } from "next/router";
import Doth from "./components/doth";
import { layer_names } from "../layerNames";
import Range from "./components/range";
import { isoCountries } from "../countries";
import Loader2 from "./loader/Loader2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function getCountryName(countryCode) {
  if (isoCountries.hasOwnProperty(countryCode)) {
    return isoCountries[countryCode];
  } else {
    return countryCode;
  }
}

function parsePlural(label) {
  var sb_single = new Array("");
  var sb_plural = new Array("");
  var spaces = 0;
  for (var i = 0; i < label.length; i++) {
    var ch = label.charAt(i);
    if (ch != "[") {
      sb_single.push(ch);
      sb_plural.push(ch);
      if (ch == " ") {
        spaces++;
      } else {
        spaces = 0;
      }
    } else {
      var sb = new Array("");
      var j = i + 1;
      for (; j < label.length; j++) {
        ch = label.charAt(j);
        if (ch == "]") break;
        sb.push(ch);
      }
      var len = j - i - 1;
      i = sb_plural.length;
      sb_plural.splice(Math.max(0, i - len), len);
      sb_plural.push(sb.join(""));
      if (spaces != 0) {
        i = sb_single.length;
        sb_single.splice(Math.max(0, i - spaces), spaces);
      }
      i = j;
    }
  }
  return {
    single: capitalizeFirstLetter(sb_single.join("")),
    plural: sb_plural.join(""),
  };
}

function getCategoryName(kinds) {
  let names = [];
  kinds.split(",").forEach(function (kind) {
    let item = layer_names[kind];
    if (item) names.push(parsePlural(item.n).single);
  });
  return names.join(", ");
}

const SecondPage = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState([]);
  const [radius, setRadius] = useState(1000);
  const [search, setSearch] = useState(false);
  const [prevColApi, setPrevColApi] = useState(false);

  const apiKey = "5ae2e3f221c38a28845f05b6de78eb52c36e8f89040073523a3752d4";

  function apiGet(method, query) {
    return new Promise(function (resolve, reject) {
      var otmAPI =
        "https://api.opentripmap.com/0.1/en/places/" +
        method +
        "?apikey=" +
        apiKey;
      if (query !== undefined) {
        otmAPI += "&" + query;
      }
      fetch(otmAPI)
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
          setPrevColApi(true);
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err);
        });
    });
  }

  const pageLength = 5;

  let offset = 0;
  let lon = 0;
  let lat = 0;
  let count = 0;

  function onShowPOI(data) {
    let poi = document.getElementById("poi");
    poi.innerHTML = "";
    if (data.preview) {
      poi.innerHTML += `<img src="${data.preview.source}">`;
    }
    poi.innerHTML += data.wikipedia_extracts
      ? data.wikipedia_extracts.html
      : data.info
      ? data.info.descr
      : "No description";

    poi.innerHTML += `<p><a target="_blank" href="${data.otm}">Show more at OpenTripMap</a></p>`;
  }

  function createListItem(item) {
    let a = document.createElement("a");
    a.className = "list-group-item list-group-item-action";
    a.setAttribute("data-id", item.xid);
    a.innerHTML = `<h5 class="list-group-item-heading">${item.name}</h5>
          <p class="list-group-item-text">${getCategoryName(item.kinds)}</p>`;

    a.addEventListener("click", function () {
      document.querySelectorAll("#list a").forEach(function (item) {
        item.classList.remove("active");
      });
      this.classList.add("active");
      let xid = this.getAttribute("data-id");
      apiGet("xid/" + xid).then((data) => onShowPOI(data));
    });
    return a;
  }
  function loadList() {
    apiGet(
      "radius",
      `radius=${radius}&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=json`
    ).then(function (data) {
      console.log(data);
      let list = document.getElementById("list");
      list.innerHTML = "";
      data.forEach((item) => list.appendChild(createListItem(item)));
      let nextBtn = document.getElementById("next_button");
      if (count < offset + pageLength) {
        nextBtn.style.visibility = "hidden";
      } else {
        nextBtn.style.visibility = "visible";
        nextBtn.innerText = `Հաջորդ էջ (${offset + pageLength}-ը ${count}-ից)`;
      }
    });
  }

  function firstLoad() {
    apiGet(
      "radius",
      `radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=count`
    ).then(function (data) {
      count = data.count;
      offset = 0;
      document.getElementById(
        "info"
      ).innerHTML += `<p>${count} 1կմ շառավղով օբյեկտներ</p>`;
      loadList();
    });
  }

  return (
    <div className={css.main}>
      <Sidebar outerContainerId={"App"} />
      <Menu right>
        <div
          style={{
            fontSize: "15px",
            display: "flex",
            top: "140px",
            position: "absolute",
          }}
          className="menu-item"
        >
          <Euro />
          <Link href="/main">Գլխավոր</Link>
        </div>
        <div
          style={{
            fontSize: "15px",
            display: "flex",
            top: "190px",
            position: "absolute",
          }}
          className="menu-item"
        >
          <Euro />

          <Link href="/main">Արտարժույթի փոխանակում</Link>
        </div>
        <div
          style={{
            fontSize: "15px",
            display: "flex",
            top: "240px",
            position: "absolute",
          }}
          id="about"
          className="menu-item"
          href="/news"
        >
          <Euro />

          <Link href="/news">Նորություններ</Link>
        </div>
      </Menu>

      <div className={css.secondPage}>
        <div className={css.bg}>
          <div className={css.bgContainer}>
            <div style={{ height: "40px", width: "312px", marginTop: "10px" }}>
              <Logo />
              {/* <Image src={img} alt="search" /> */}
            </div>
            <div className={css.firstSearchBlock}>
              <input
                onInput={({ target }) => setInputValue(target.value)}
                type="text"
                placeholder={"Մուտքագրեք տարածաշրջանը"}
              />
              <button
                className={css.searchButton}
                onClick={() => {
                  apiGet("geoname", "name=" + inputValue).then(function (data) {
                    let message = "Անունը չի գտնվել";
                    if (data.status == "OK") {
                      message = data.name + ", " + getCountryName(data.country);
                      lon = data.lon;
                      lat = data.lat;
                      firstLoad();
                    }
                    document.getElementById(
                      "info"
                    ).innerHTML = `<p>${message}</p>`;
                  });

                  setSearch(true);
                  setTimeout(() => {
                    setSearch(false);
                  }, 2000);
                }}
              >
                {!search ? <div>Որոնել</div> : <Loader2 />}
              </button>
              {/* <div className={css.inputStyles}></div> */}
            </div>

            <div className={css.secondSearchBlock}>
              <Range />
            </div>
            <div
              style={{
                with: "80%",
                height: "50%",
                paddingTop: "10px",
                marginBottom: "80px",
              }}
              className={css.map}
            >
              {prevColApi ? (
                <div className="container">
                  <div
                    id="info"
                    className="alert alert-primary"
                    style={{
                      color: "#2a1616",
                      backgroundColor: "#f8607075",
                      borderColor: "#b6d4fe",
                    }}
                  ></div>
                  <div className="row">
                    <div className="col-12 col-lg-5">
                      <div id="list" className="list-group"></div>
                      <nav className="text-center">
                        <button
                          onClick={() => {
                            offset += pageLength;
                            loadList();
                          }}
                          id="next_button"
                          type="button"
                          className="btn btn-primary"
                          // className={{ background: "red" }}
                          style={{
                            background: "#F86070",
                            borderColor: "#F86070",
                            marginTop: "10px",
                          }}
                        >
                          Հաջորդ էջ
                        </button>
                      </nav>
                    </div>
                    <div className="col-12 col-lg-7">
                      <div id="poi" className="alert"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div>Գաղափարներ նոր ճամփորդության համար</div>
                  <Swiper
                    pagination={true}
                    modules={[Pagination]}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                      <img src={dilijan.src} />
                      <div
                        style={{
                          padding: "20px 16px 16px",
                          background: "rgb(217, 59, 48)",
                        }}
                      >
                        <div style={{ textAlign: "left", fontWeight: "bold" }}>
                          Դիլիջան
                        </div>
                        <div style={{ textAlign: "left", fontSize: "14px" }}>
                          69կմ
                        </div>
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
                        <div style={{ textAlign: "left", fontWeight: "bold" }}>
                          Երևան
                        </div>
                        <div style={{ textAlign: "left", fontSize: "14px" }}>
                          B 1 km
                        </div>
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
                        <div style={{ textAlign: "left", fontWeight: "bold" }}>
                          Գյումրի
                        </div>
                        <div style={{ textAlign: "left", fontSize: "14px" }}>
                          125 կմ
                        </div>
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
                        <div style={{ textAlign: "left", fontWeight: "bold" }}>
                          Ծաղկաձոր
                        </div>
                        <div style={{ textAlign: "left", fontSize: "14px" }}>
                          54 կմ
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </>
              )}

              {/* <YMaps>
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
              </YMaps> */}
            </div>
          </div>
        </div>
        <div className={css.secondPageFooter}>
          <div>
            <Back onClick={() => router.back()} />
          </div>
          <div style={{ position: "relative" }}>
            <Location />
            {router.pathname === "/main" && <Doth left={-6} />}
          </div>
          <div>
            <Link href="rates">
              <Euro />
            </Link>
          </div>
          <div>
            <Link href="/news">
              <News />
            </Link>
          </div>
          <span style={{ opacity: "0", width: "20px" }}>
            <Image src={img} alt="list" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
