import React from "react";
import spinner from "../images/spinner.gif";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: "300px", margin: "auto", display: "block" }}
      />
    </div>
  );
};
