gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  // Hide scroll container initially
  gsap.set("#scroll-container", { opacity: 0 });

  // Create a timeline to sequence animations
  const tl = gsap.timeline();

  // Animate preload shrinking
  tl.to("#preload", {
    height: 0,
    duration: 2,
    ease: "expo.inOut"
  });

  // Fade in scroll container after preload animation
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
Beginning: theme trigger (dark ↔ light)
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
Letter Animation (keeps <br> line breaks)
------------------------------------ */
const letterContainer = document.querySelector(".letter-container");

if (letterContainer) {
  const html = letterContainer.innerHTML.trim();

  const wrappedHTML = html
    .split(/(<br\s*\/?>)/gi) // keep <br>
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
    {
      opacity: 0.15,
      y: "0.6em"
    },
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
Flair animation helper
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
Final: image trail (scoped only to .final)
------------------------------------ */
const finalSection = document.querySelector(".final");
const flair = gsap.utils.toArray(".flair");

let gap = 100;
let index = 0;
let wrapper = gsap.utils.wrap(0, flair.length);
gsap.defaults({ duration: 1 });

let mousePos = { x: 0, y: 0 };
let lastMousePos = { x: 0, y: 0 };
let cachedMousePos = { x: 0, y: 0 };
let isHoveringFinal = false;

if (finalSection) {
  finalSection.addEventListener("mousemove", (e) => {
    mousePos = { x: e.clientX, y: e.clientY };
  });

  finalSection.addEventListener("mouseenter", () => {
    isHoveringFinal = true;
  });

  finalSection.addEventListener("mouseleave", () => {
    isHoveringFinal = false;
  });
}

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
