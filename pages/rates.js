/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import axios from "axios";
import AC from "../pages/images/1x1/ac.svg";
import АМ from "../pages/images/1x1/am.svg";
import RU from "../pages/images/1x1/ru.svg";
import BJ from "../pages/images/1x1/bj.svg";
import TG from "../pages/images/1x1/tg.svg";

const rates = () => {
  const [rate, setRate] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://api.exchangeratesapi.io/v1/latest?access_key=3f64795a5f8cd497d7a823ffacf26680"
      )
      .then((res) => setRate(res.data));
  }, []);

  const { rates } = rate;
  if (!rates) return null;
  console.log(rates.RUS);

  return (
    <>
      <table style={{ width: "100%", textAlign: "center" }}>
        <caption>Rates</caption>
        <thead>
          <tr>
            <td>Base Rate</td>
            <td>{rate.base}</td>
            <td>{rate.date}</td>
          </tr>
          <tr>
            <th style={{ backgroundColor: "#84b1d0" }}>Country</th>
            <th style={{ backgroundColor: "#84b1d0" }}>ISO(code)</th>
            <th style={{ backgroundColor: "#84b1d0" }}>Rate</th>
            <th style={{ backgroundColor: "#84b1d0" }}>Rate</th>
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
              <span>&#8593;</span>
            </td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#efefef" }}>
              <BJ style={{ width: "30px" }} />
            </td>
            <td style={{ backgroundColor: "#efefef" }}>BOB</td>
            <td style={{ backgroundColor: "#efefef" }}>{rates.BOB}</td>
            <td style={{ backgroundColor: "#efefef" }}>
              <span>&#8595;</span>
            </td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#efefef" }}>
              <RU style={{ width: "30px" }} />
            </td>
            <td style={{ backgroundColor: "#dedede" }}>RUB</td>
            <td style={{ backgroundColor: "#dedede" }}>{rates.RUB}</td>
            <td style={{ backgroundColor: "#dedede" }}>
              <span>&#8593;</span>
            </td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#efefef" }}>
              <AC style={{ width: "30px" }} />
            </td>
            <td style={{ backgroundColor: "#efefef" }}>AED</td>
            <td style={{ backgroundColor: "#efefef" }}>{rates.AED}</td>
            <td style={{ backgroundColor: "#efefef" }}>
              <span>&#8595;</span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default rates;
