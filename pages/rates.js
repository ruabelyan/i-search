/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useCallback } from "react";

import axios from "axios";
import AC from "../pages/images/1x1/ac.svg";
import АМ from "../pages/images/1x1/am.svg";
import RU from "../pages/images/1x1/ru.svg";
import BJ from "../pages/images/1x1/bj.svg";
import AN from "../pages/images/1x1/tg.svg";
import { useRouter } from "next/router";
import Image from "next/image";
import css from "../styles/second/SecondPage.module.css";
import img from "./images/search_3.png";
import backIcon from "./images/back.png";
import geo from "./images/icon2.png";
import news from "./images/news.png";
import exchange from "./images/icon3.png";
import Link from "next/link";
import Doth from "./components/doth";
import Sidebar from "./sidebar";
import { slide as Menu } from "react-burger-menu";

const rates = () => {
  const router = useRouter();

  const [rate, setRate] = useState([]);
  const [inputValue, setInputValue] = useState(1);
  const [currencyList, setCurrencyList] = useState([]);
  const [result, setResult] = useState(1);
  const [unit, setUnit] = useState("BTC");
  const [toCurrency, setToCurrency] = useState("Bitcoin");
  const [fromCurrency, setFromCurrency] = useState("Bitcoin");

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/exchange_rates"
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Error: ${response.status}`);
      }

      const responseData = await response.json();
      // responseData = { rates: {usd: {}, php: {}, gbp: {} } }
      // currencyList = [{}, {}, {}]
      const objectValues = Object.values(responseData.rates);
      setCurrencyList(objectValues);
      setFromCurrency(objectValues[0].name);
      setToCurrency(objectValues[0].name);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const callback = useCallback(() => {
    const calculate = () => {
      const obj1 = currencyList.find((cur) => cur.name === fromCurrency);
      let xToBTC = obj1.value;
      let BTCtoX = 1 / xToBTC;
      let obj2 = currencyList.find((cur) => cur.name === toCurrency);
      let yToBTC = obj2.value;
      let calc = BTCtoX * yToBTC * inputValue;
      let unit = obj2.unit;
      let result = { calc, unit };
      return result;
    };
    return calculate();
  }, [currencyList, fromCurrency, toCurrency, inputValue]);

  useEffect(() => {
    axios
      .get(
        // "https://api.currencyapi.com/v3/latest?apikey=jB3HVzcNdXRA92DH80cxbJTVVIfyx8YFefpDk7hi"
        "1"
      )
      .then((res) => setRate(res.data.data));
    if (currencyList.length !== 0) {
      const { calc, unit } = callback();
      setUnit(unit);
      setResult(calc);
    }
  }, [callback, currencyList.length]);

  if (!rate) return null;
  console.log(router.pathname);

  return (
    <div className={css.main}>
      <Sidebar outerContainerId={"App"} />
      <Menu>
        <a
          style={{ fontSize: "18px" }}
          className="menu-item--small"
          href="/main"
        >
          Գլխավոր
        </a>
        <a
          style={{ fontSize: "18px" }}
          id="home"
          className="menu-item"
          href="/rates"
        >
          Արտարժույթի փոխանակում
        </a>
        <a
          style={{ fontSize: "18px" }}
          id="about"
          className="menu-item"
          href="/news"
        >
          Նորություններ
        </a>
      </Menu>
      <div
        className={css.secondPage}
        style={{ background: "linear-gradient(45deg, #3f4f8a, #6c79a5)" }}
      >
        <div style={{ padding: "1rem" }}>
          <h3
            style={{
              textAlign: "center",
              color: "white",
              margin: "0",
              paddingBottom: "1rem",
            }}
          >
            Արտարժույթի փոխանակում
          </h3>
          <div>
            <table style={{ width: "100%", textAlign: "center" }}>
              <thead>
                <tr style={{ fontSize: "14px" }}>
                  <th
                    style={{
                      padding: "0 10px",
                      backgroundColor: "#84b1d0",
                      fontWeight: "100",
                    }}
                  >
                    Երկիր
                  </th>
                  <th
                    style={{
                      padding: "0 10px",
                      backgroundColor: "#84b1d0",
                      fontWeight: "100",
                    }}
                  >
                    ISO(կոդ)
                  </th>
                  <th
                    style={{
                      padding: "0 10px",
                      backgroundColor: "#84b1d0",
                      fontWeight: "100",
                    }}
                  >
                    Արտարժույթ
                  </th>
                  <th
                    style={{
                      padding: "0 10px",
                      backgroundColor: "#84b1d0",
                      fontWeight: "100",
                    }}
                  >
                    Տատանում
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ backgroundColor: "#efefef" }}>
                    <АМ style={{ width: "30px" }} />
                  </td>
                  <td style={{ backgroundColor: "#dedede" }}>ARM</td>
                  <td style={{ backgroundColor: "#dedede" }}>
                    {rate.AMD?.value}
                  </td>
                  <td style={{ backgroundColor: "#dedede" }}>
                    <span style={{ color: "green", fontSize: "32px" }}>
                      &#8593;
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#efefef" }}>
                    <BJ style={{ width: "30px" }} />
                  </td>
                  <td style={{ backgroundColor: "#efefef" }}>BOB</td>
                  <td style={{ backgroundColor: "#efefef" }}>
                    {rate.BOB?.value}
                  </td>
                  <td style={{ backgroundColor: "#efefef" }}>
                    <span span style={{ color: "red", fontSize: "32px" }}>
                      &#8595;
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#efefef" }}>
                    <RU style={{ width: "30px" }} />
                  </td>
                  <td style={{ backgroundColor: "#dedede" }}>RUB</td>
                  <td style={{ backgroundColor: "#dedede" }}>
                    {rate.RUB?.value}
                  </td>
                  <td style={{ backgroundColor: "#dedede" }}>
                    <span span style={{ color: "green", fontSize: "32px" }}>
                      &#8593;
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#efefef" }}>
                    <AC style={{ width: "30px" }} />
                  </td>
                  <td style={{ backgroundColor: "#efefef" }}>AED</td>
                  <td style={{ backgroundColor: "#efefef" }}>
                    {rate.AED?.value}
                  </td>
                  <td style={{ backgroundColor: "#efefef" }}>
                    <span span style={{ color: "red", fontSize: "32px" }}>
                      &#8595;
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#efefef" }}>
                    <AN style={{ width: "30px" }} />
                  </td>
                  <td style={{ backgroundColor: "#efefef" }}>ANG</td>
                  <td style={{ backgroundColor: "#efefef" }}>
                    {rate.ANG?.value}
                  </td>
                  <td style={{ backgroundColor: "#efefef" }}>
                    <span span style={{ color: "red", fontSize: "32px" }}>
                      &#8595;
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="App">
            <div className="container">
              <div className="result">
                <p
                  style={{ fontFamily: "monospace", color: "white" }}
                >{`${Number(result.toFixed(2)).toLocaleString(
                  "en"
                )} ${unit}`}</p>
              </div>
              <label htmlFor="value__input" style={{ color: "white" }}>
                Քանակ:
                <input
                  style={{
                    padding: "0 18px",
                    color: "#9e9e9e",
                    border: "1px solid #707070",
                    borderRadius: "8px",
                  }}
                  className="input"
                  id="value__input"
                  type="number"
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                />
              </label>
              <label htmlFor="fromCurrency" style={{ color: "white" }}>
                Արտ. 1:
                <select
                  style={{
                    color: "#9e9e9e",
                  }}
                  id="fromCurrency"
                  className="input"
                  aria-label="select From Currency"
                  onChange={(e) => setFromCurrency(e.target.value)}
                >
                  {currencyList &&
                    currencyList.map((currency) => (
                      <option key={currency.name} value={currency.name}>
                        {currency.name}
                      </option>
                    ))}
                </select>
              </label>
              <label htmlFor="toCurrency" style={{ color: "white" }}>
                Արտ. 2:
                <select
                  style={{
                    color: "#9e9e9e",
                  }}
                  id="toCurrency"
                  className="input"
                  aria-label="select To Currency"
                  onChange={(e) => setToCurrency(e.target.value)}
                >
                  {currencyList &&
                    currencyList.map((currency) => (
                      <option key={currency.name} value={currency.name}>
                        {currency.name}
                      </option>
                    ))}
                </select>
              </label>
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
              <Link href="main">
                <Image src={geo} alt="geo" />
              </Link>
            </div>
            <div style={{ position: "relative" }}>
              <Image src={exchange} alt="rate" />
              {router.pathname === "/rates" && <Doth left={5} />}
            </div>
            <div>
              <Link href="main">
                <Image src={news} alt="geo" />
              </Link>
            </div>

            <span style={{ opacity: "0" }}>
              <Image style={{ opacity: "none" }} src={exchange} alt="list" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default rates;
