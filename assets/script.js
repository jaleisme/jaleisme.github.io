gsap.registerPlugin(ScrollTrigger);

/* --------------------------------
Desktop-only gate
------------------------------------ */
function isMobileDevice() {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.matchMedia("(pointer: coarse)").matches ||
    window.innerWidth < 1024
  );
}

if (isMobileDevice()) {
  document.body.innerHTML = `
    <div style="
      min-height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      text-align:center;
      padding:2rem;
      font-family: system-ui, sans-serif;
      background:#0f0f0f;
      color:white;
    ">
      <div>
        <h1 style="font-size:2rem; margin-bottom:1rem;">Desktop Experience Only</h1>
        <p style="opacity:.7; max-width:420px; margin:0 auto;">
          This experience is crafted for desktop.  
          Please open it on a laptop or desktop device.
        </p>
      </div>
    </div>
  `;
  throw new Error("Blocked mobile devices");
}

/* --------------------------------
Preload → reveal
------------------------------------ */
window.addEventListener("load", () => {
  gsap.set("#scroll-container", { opacity: 0 });

  const tl = gsap.timeline();

  tl.to("#preload", {
    height: 0,
    duration: 2,
    ease: "expo.inOut"
  });

  tl.to("#scroll-container", {
    opacity: 1,
    duration: 1,
    ease: "sine.inOut"
  });
});

/* --------------------------------
Hero: subtle floating photo strips
------------------------------------ */
gsap.to(".photo-strip", {
  y: -18,
  duration: 2,
  ease: "sine.inOut",
  repeat: -1,
  yoyo: true
});

/* --------------------------------
Beginning: horizontal scroll
------------------------------------ */
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

/* --------------------------------
Beginning: theme trigger
------------------------------------ */
ScrollTrigger.create({
  trigger: ".beginning",
  start: "top 60%",
  end: "bottom top",
  invalidateOnRefresh: true,
  onToggle: self => {
    setBeginningTheme(self.isActive);
  }
});

function setBeginningTheme(isDark) {
  gsap.to("#scroll-container", {
    backgroundColor: isDark ? "#101010" : "#F9F5EC",
    duration: 0.6,
    ease: "power2.out",
    overwrite: "auto"
  });

  gsap.to(".beginning-title", {
    color: isDark ? "#ffffff" : "#101010",
    textShadow: isDark
      ? "0 0 12px rgba(255,255,255,0.25)"
      : "0 0 0 rgba(0,0,0,0)",
    duration: 0.6,
    ease: "power2.out",
    overwrite: "auto"
  });
}

/* --------------------------------
Letter Animation
------------------------------------ */
const letterContainer = document.querySelector(".letter-container");

if (letterContainer) {
  const html = letterContainer.innerHTML.trim();

  const wrappedHTML = html
    .split(/(<br\s*\/?>)/gi)
    .map(chunk => {
      if (chunk.toLowerCase().includes("<br")) return chunk;

      return chunk
        .split(" ")
        .map(word => {
          if (!word.trim()) return word;
          return `<span class="letter-word">${word}</span>`;
        })
        .join(" ");
    })
    .join("");

  letterContainer.innerHTML = wrappedHTML;

  gsap.fromTo(".letter-word",
    { opacity: 0.15, y: "0.6em" },
    {
      opacity: 1,
      y: "0em",
      ease: "power3.out",
      duration: 0.9,
      stagger: 0.03,
      scrollTrigger: {
        trigger: ".letter",
        start: "top 70%",
        once: true
      }
    }
  );
}

/* --------------------------------
Flair helper
------------------------------------ */
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
Final: image trail (scoped)
------------------------------------ */
const finalSection = document.querySelector(".final");
const flair = gsap.utils.toArray(".flair");

let gap = 100;
let index = 0;
let wrapper = gsap.utils.wrap(0, flair.length);

let mousePos = { x: 0, y: 0 };
let lastMousePos = { x: 0, y: 0 };
let cachedMousePos = { x: 0, y: 0 };
let isHoveringFinal = false;

if (finalSection) {
  finalSection.addEventListener("mousemove", (e) => {
    mousePos = { x: e.clientX, y: e.clientY };
  });

  finalSection.addEventListener("mouseenter", () => isHoveringFinal = true);
  finalSection.addEventListener("mouseleave", () => isHoveringFinal = false);
}

gsap.ticker.add(ImageTrail);

function ImageTrail() {
  if (!isHoveringFinal) return;

  let travelDistance = Math.hypot(
    lastMousePos.x - mousePos.x,
    lastMousePos.y - mousePos.y
  );

  cachedMousePos.x = gsap.utils.interpolate(cachedMousePos.x || mousePos.x, mousePos.x, 0.1);
  cachedMousePos.y = gsap.utils.interpolate(cachedMousePos.y || mousePos.y, mousePos.y, 0.1);

  if (travelDistance > gap) {
    animateImage();
    lastMousePos = { ...mousePos };
  }
}

function animateImage() {
  let img = flair[wrapper(index)];
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