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

  const tl = gsap.timeline();

  tl.to("#preloader-bar-1", {
    height: 0,
    duration: .8,
    ease: "expo.inOut"
  });
  tl.to("#preloader-bar-2", {
    height: 0,
    duration: .8,
    ease: "expo.inOut"
  }, .1);
  tl.to("#preloader-bar-3", {
    height: 0,
    duration: .8,
    ease: "expo.inOut"
  }, .2);
  tl.to("#preloader-bar-4", {
    height: 0,
    duration: .8,
    ease: "expo.inOut"
  }, .3);
  tl.to("#preloader-bar-5", {
    height: 0,
    duration: .8,
    ease: "expo.inOut"
  }, .4);
});
