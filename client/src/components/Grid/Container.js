import React from "react";

export const Container = props =>
  <div className={`container${props.fluid ? "-fluid" : ""}`} {...props}>
    {props.children}
  </div>;
