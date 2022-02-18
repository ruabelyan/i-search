import SecondPage from "./second/SecondPage";
import FirstPage from "./first/FirstPage";
import { useState } from "react";

export default function Home() {
  const [nextPage, setNextPage] = useState(false);
  return (
    <>
      {!nextPage && <FirstPage setNextPage={() => setNextPage(true)} />}
      {nextPage && <SecondPage />}
    </>
  );
}
