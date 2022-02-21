import React from "react";
import css from "./FirstPage.module.css";
import img from "../images/search.png";
import Image from "next/image";

const FirstPage = ({ setNextPage }) => {
  return (
    <div className={css.bg}>
      <div className={css.firstBLock}>
        <h1>Արագ Որոնում1</h1>
        <Image className={css.image} src={img} alt="serch" />
      </div>
      <h2 className={css.boldTitle}>Արագ․ Թեթև․ Հարմար․</h2>
      <div className={css.secondBlock}>
        <div className={css.firstPageFooter}>
          <button
            onClick={() => setNextPage(true)}
            className={css.PageButton}
          >
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
