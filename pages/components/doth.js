import React from "react";

const Doth = ({ left }) => {
  return (
    <div
      style={{
        left,
        width: "32px",
        height: "3px",
        background: "#4a5990",
        position: "absolute",
        borderRadius: "8px",
      }}
    ></div>
  );
};

export default Doth;
