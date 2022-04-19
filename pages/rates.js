/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useCallback } from "react";

import axios from "axios";
import AC from "../pages/images/1x1/ac.svg";
import АМ from "../pages/images/1x1/am.svg";
import RU from "../pages/images/1x1/ru.svg";
import BJ from "../pages/images/1x1/bj.svg";
import AN from "../pages/images/1x1/tg.svg";
import { useRouter } from "next/router";

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
        "http://api.exchangeratesapi.io/v1/latest?access_key=3f64795a5f8cd497d7a823ffacf26680"
      )
      .then((res) => setRate(res.data));
    if (currencyList.length !== 0) {
      const { calc, unit } = callback();
      setUnit(unit);
      setResult(calc);
    }
  }, [callback, currencyList.length]);

  const { rates } = rate;
  if (!rates) return null;
  console.log(rates.RUS);

  return (
    <>
      <h3 style={{ textAlign: "center" }}>Արտարժույթի փոխանակում</h3>
      <div>
        <table style={{ width: "100%", textAlign: "center" }}>
          <thead>
            <tr>
              <td>Հաշվարկվող արտարժույթ</td>
              <td>{rate.base}</td>
              <td>{rate.date}</td>
            </tr>
            <tr>
              <th style={{ padding: "0 10px", backgroundColor: "#84b1d0" }}>
                Երկիր
              </th>
              <th style={{ padding: "0 10px", backgroundColor: "#84b1d0" }}>
                ISO(կոդ)
              </th>
              <th style={{ padding: "0 10px", backgroundColor: "#84b1d0" }}>
                Արտարժույթ
              </th>
              <th style={{ padding: "0 10px", backgroundColor: "#84b1d0" }}>
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
              <td style={{ backgroundColor: "#dedede" }}>{rates.AMD}</td>
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
              <td style={{ backgroundColor: "#efefef" }}>{rates.BOB}</td>
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
              <td style={{ backgroundColor: "#dedede" }}>{rates.RUB}</td>
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
              <td style={{ backgroundColor: "#efefef" }}>{rates.AED}</td>
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
              <td style={{ backgroundColor: "#efefef" }}>{rates.ANG}</td>
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
        <h1 style={{ textAlign: "center" }}>Հաշվիչ</h1>

        <div className="container">
          <div className="result">
            <p>{`${Number(result.toFixed(2)).toLocaleString("en")} ${unit}`}</p>
          </div>
          <label htmlFor="value__input">
            Քանակ:
            <input
              className="input"
              id="value__input"
              type="number"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
          </label>
          <label htmlFor="fromCurrency">
            Արտարժույթ 1:
            <select
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
          <label htmlFor="toCurrency">
            Արտարժույթ 2:
            <select
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
      <div style={{ position: "fixed", width: "100%", bottom: "0" }}>
        <a
          onClick={() => router.back()}
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#82b6be",
            margin: 0,
            height: "50px",
            fontSize: "20px",
          }}
        >
          հետ գնալ
        </a>
      </div>
    </>
  );
};

export default rates;
