import React from "react";
import css from "./FirstPage.module.css";
import img from "../images/search.png";
import Image from "next/image";
// import { RateApi, rateApi } from "../api/rate";
import { useState } from "react";

const FirstPage = ({ setNextPage }) => {
  const [rates, setRates] = useState([]);
  console.log(rates);
  return (
    <div className={css.bg}>
      {/* <RateApi onRates={(rate) => setRates(rate)} /> */}
      <div className={css.firstBLock}>
        <h1>Արագ Որոնում</h1>
        <Image className={css.image} src={img} alt="serch" />
      </div>
      <h2 className={css.boldTitle}>Արագ , Թեթև , Հարմար</h2>
      <div className={css.secondBlock}>
        <div className={css.firstPageFooter}>
          <button onClick={() => setNextPage(true)} className={css.PageButton}>
            Շարունակել
          </button>
          <p className={css.Pagetext}>
            Օգտագործելով տվյալ հավելվածը դուք <br /> ընդունում եք պայմանները
            համաձայն <span>օգտագոծողի</span> <br /> <span>համաձայնագրի</span> և{" "}
            <span>գաղտնիության քաղաքականություն</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
