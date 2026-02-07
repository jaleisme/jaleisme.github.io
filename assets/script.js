gsap.registerPlugin(ScrollTrigger);

// Hero photo-strips: follow scroll, rotate opposite directions
gsap.to(".photo-strip", {
  y: -18,
  duration: 2,
  ease: "sine.inOut",
  repeat: -1,
  yoyo: true
});





const track = document.querySelector(".beginning-track");
const cards = gsap.utils.toArray(".card");

gsap.to(track, {
  x: () => -(track.scrollWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: ".beginning",
    start: "top top",
    end: () => "+=" + (track.scrollWidth - window.innerWidth),
    scrub: 1,
    pin: true,
    anticipatePin: 1,
    snap: {
      snapTo: 1 / (cards.length - 1),
      duration: 0.3,
      ease: "power2.out"
    }
  }
});


ScrollTrigger.create({
  trigger: ".beginning",
  start: "top 60%",
  onEnter: () => {
    gsap.to("#scroll-container", {
      backgroundColor: "#101010",
      duration: 0.6,
      ease: "power2.out"
    });

    gsap.to(".beginning-title", {
      color: "#ffffff",
      textShadow: "0 0 12px rgba(255,255,255,0.25)",
      duration: 0.6,
      ease: "power2.out"
    });
  },
  onLeaveBack: () => {
    gsap.to("#scroll-container", {
      backgroundColor: "#F9F5EC",
      duration: 0.6,
      ease: "power2.out"
    });

    gsap.to(".beginning-title", {
      color: "#101010",
      textShadow: "0 0 0 rgba(0,0,0,0)",
      duration: 0.6,
      ease: "power2.out"
    });
  }
});


function playAnimation(shape) {
  let tl = gsap.timeline();
  tl.from(shape, {
    opacity: 0,
    scale: 0,
    ease: "elastic.out(1,0.3)",
  })
  .to(shape, {
    rotation: "random([-360, 360])",
  }, "<")
  .to(shape, {
    y: "120vh",
    ease: "back.in(.4)",
    duration: 1,
  }, 0);
}

/* --------------------------------
Scoped to .final hover only
------------------------------------*/
const finalSection = document.querySelector(".final");
let flair = gsap.utils.toArray(".flair");

let gap = 100;
let index = 0;
let wrapper = gsap.utils.wrap(0, flair.length);
gsap.defaults({ duration: 1 });

let mousePos = { x: 0, y: 0 };
let lastMousePos = { x: 0, y: 0 };
let cachedMousePos = { x: 0, y: 0 };

let isHoveringFinal = false;

// Only track mouse inside .final
finalSection.addEventListener("mousemove", (e) => {
  mousePos = {
    x: e.clientX,
    y: e.clientY
  };
});

finalSection.addEventListener("mouseenter", () => {
  isHoveringFinal = true;
});

finalSection.addEventListener("mouseleave", () => {
  isHoveringFinal = false;
});

gsap.ticker.add(ImageTrail);

function ImageTrail() {
  if (!isHoveringFinal) return;

  let travelDistance = Math.hypot(
    lastMousePos.x - mousePos.x,
    lastMousePos.y - mousePos.y
  );

  cachedMousePos.x = gsap.utils.interpolate(
    cachedMousePos.x || mousePos.x,
    mousePos.x,
    0.1
  );
  cachedMousePos.y = gsap.utils.interpolate(
    cachedMousePos.y || mousePos.y,
    mousePos.y,
    0.1
  );

  if (travelDistance > gap) {
    animateImage();
    lastMousePos = { ...mousePos };
  }
}

function animateImage() {
  if (!flair.length) return;

  let wrappedIndex = wrapper(index);
  let img = flair[wrappedIndex];
  if (!img) return;

  gsap.killTweensOf(img);

  gsap.set(img, { clearProps: "all" });

  gsap.set(img, {
    opacity: 1,
    left: mousePos.x,
    top: mousePos.y,
    xPercent: -50,
    yPercent: -50,
  });

  playAnimation(img);
  index++;
}
