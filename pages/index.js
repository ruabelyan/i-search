import React from "react";
import css from "../styles/first/FirstPage.module.css";
import img from "./images/Group-5.png";
import Image from "next/image";
// import { RateApi, rateApi } from "../api/rate";
import { useState } from "react";
Loader;
import { useRouter } from "next/router";
import Loader from "./loader/Loader";

const FirstPage = ({ setNextPage }) => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  setTimeout(() => setLoading(false), 2000);
  return (
    <div className={css.bg}>
      {/* <RateApi onRates={(rate) => setRates(rate)} /> */}
      <div className={css.firstBLock}>
        <div>
          {/* <h3 style={{ margin: "0", color: "#F86070", textAlign: "left" }}>
            Արագ{" "}
          </h3>
          <h1 style={{ margin: "0" }}> Որոնում</h1> */}
        </div>
        <div className={css.image}>
          <Image src={img} alt="serch" />
        </div>
      </div>

      <div className={css.secondBlock}>
        <div className={css.firstPageFooter}>
          {loading ? (
            <Loader />
          ) : (
            <button
              onClick={() => router.push("main")}
              className={css.PageButton}
            >
              Շարունակել
            </button>
          )}

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
