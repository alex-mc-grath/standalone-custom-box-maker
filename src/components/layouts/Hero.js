import React, { useState, Fragment } from "react";

const Hero = (props) => {
  const [maskActive, toggleMask] = useState(false);

  const handleToggleMask = () => {
    toggleMask(!maskActive);
  };

  // window.addEventListener("scroll", (event) => {
  //   let waitTime = 0;

  //   if ((waitTime = 0)) {
  //     handleToggleMask();
  //     console.log("mask active");
  //     // window.onscroll = null;
  //     let waitTime = waitTime + 3;
  //   } else {
  //     window.onscroll = null;
  //   }
  // });

  // window.addEventListener("scroll", (event) => {

  // }

  // const scrollManager = () => {
  //   window.addEventListener("scroll", (event) => {
  //     toggleMask(!maskActive);
  //     setTimeout(scrollManager, 4);
  //     console.log("scroll manager");
  //   });
  // };

  return (
    <>
      <div className="hero clip-ellipse">
        <div className={`hero-mask ${maskActive ? "active" : ""}`}></div>
        <div className={`hero-mask2 ${maskActive ? "active" : ""}`}></div>
        {/* <h1>De-risk your most important transactions</h1> */}
        <h1>{props.content.title}</h1>
        <p>{props.content.description}</p>
        {/* <button onClick={handleToggleMask}>click</button> */}
      </div>
    </>
  );
};

export default Hero;
