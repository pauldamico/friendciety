import React, { useState, useEffect } from "react";

export default function WindowSize(props) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    function handleWidth() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", handleWidth);
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);

  const size = props.arrow === ">" ? windowSize > 900 : windowSize < 900;

  return <>{size ? props.children : null}</>;
}