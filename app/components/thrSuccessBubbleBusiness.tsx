"use client";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useMemo, useState } from "react";
import blur3 from "@/public/blurbg3.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
// import Particles, { initParticlesEngine } from "@tsparticles/react";
// import {
//   type Container,
//   type ISourceOptions,
//   MoveDirection,
//   OutMode,
// } from "@tsparticles/engine";
// // import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// // import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
// import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// // import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const SplitWith2 = () => {
  //   const [init, setInit] = useState(false);

  //   // this should be run only once per application lifetime
  //   useEffect(() => {
  //     initParticlesEngine(async (engine) => {
  //       // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
  //       // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
  //       // starting from v2 you can add only the features you need reducing the bundle size
  //       //await loadAll(engine);
  //       //await loadFull(engine);
  //       await loadSlim(engine);
  //       //await loadBasic(engine);
  //     }).then(() => {
  //       setInit(true);
  //     });
  //   }, []);

  //   const particlesLoaded = async (container?: Container): Promise<void> => {
  //     console.log(container);
  //   };

  //   const options: ISourceOptions = useMemo(
  //     () => ({
  //       background: {
  //         color: {
  //           value: "#0d47a1",
  //         },
  //       },
  //       fpsLimit: 120,
  //       interactivity: {
  //         events: {
  //           onClick: {
  //             enable: true,
  //             mode: "push",
  //           },
  //           onHover: {
  //             enable: true,
  //             mode: "repulse",
  //           },
  //         },
  //         modes: {
  //           push: {
  //             quantity: 4,
  //           },
  //           repulse: {
  //             distance: 200,
  //             duration: 0.4,
  //           },
  //         },
  //       },
  //       particles: {
  //         color: {
  //           value: "#ffffff",
  //         },
  //         links: {
  //           color: "#ffffff",
  //           distance: 150,
  //           enable: true,
  //           opacity: 0.5,
  //           width: 1,
  //         },
  //         move: {
  //           direction: MoveDirection.none,
  //           enable: true,
  //           outModes: {
  //             default: OutMode.out,
  //           },
  //           random: false,
  //           speed: 6,
  //           straight: false,
  //         },
  //         number: {
  //           density: {
  //             enable: true,
  //           },
  //           value: 80,
  //         },
  //         opacity: {
  //           value: 0.5,
  //         },
  //         shape: {
  //           type: "circle",
  //         },
  //         size: {
  //           value: { min: 1, max: 5 },
  //         },
  //       },
  //       detectRetina: true,
  //     }),
  //     []
  //   );

  useEffect(() => {
    AOS.init();
  }, []);

  // if (init) {
  return (
    <>
      <div
        className="split-bubble-with-title auth-bubble action-bubble"
        data-aos="fade-right"
        data-aos-delay="150"
      >
        <div className="header-bubble auth">Success</div>
        <div
          className="box-pic"
          id="resBub"
          style={{
            backgroundImage: `url(${blur3.src})`,
          }}
        ></div>
        <div className="square">
          <div className="cont" style={{ paddingTop: "25px" }}>
            <h3>Tax History Report Successfully Requested!</h3>
            <p style={{ marginTop: "35px" }}>
              <strong>You&apos;re on your way </strong>
              to getting your Free Tax History Report. Now we need your
              business&apos; information.
            </p>
            {/* <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}
              /> */}
          </div>
          <div className="action-btn-cont">
            <Link
              href="/dashboard/action1/1/business"
              style={{ width: "450px" }}
              className="next-btn"
            >
              CONFIRM BUSINESS
            </Link>
          </div>
        </div>
        <div className="header-bubble-back auth"></div>
        <div className="back-square"></div>
      </div>
    </>
  );
  // }
};

export default SplitWith2;
