import { gsap } from "/syntra/modules/gsap/index.js";
gsap.fromTo(
  ".logo",
  {
    opacity: 0,
    scale: 0.6,
  },
  {
    opacity: 1,
    scale: 1,
    duration: 0.8,
  },
);
gsap.fromTo(
  ".ctaStagger",
  {
    opacity: 0,
    y: 30,
  },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.3,
    stagger: 0.2,
  },
);
let link = document.getElementById("link");
link.addEventListener("mouseenter", () => {
  if (!gsap.isTweening(".underline")) {
    gsap.fromTo(
      ".underline",
      {
        opacity: 1,
      },
      {
        duration: 0.6,
        ease: "expo.inOut",
        x: "101%",
        onComplete: () => {
          if (!gsap.isTweening(".underline")) {
            gsap.fromTo(
              ".underline",
              {
                x: "-101%",
              },
              {
                delay: 0.2,
                duration: 0.5,
                ease: "expo.out",
                x: "0%",
              },
            );
          }
        },
      },
    );
  }
});

gsap.fromTo(
  ".navItem",
  {
    opacity: 0,
    y: 30,
  },
  {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.1,
  },
);
