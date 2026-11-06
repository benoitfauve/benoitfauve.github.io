// Waveform audio players for posts (shortcodes "waveplayer" and "waveplayers"),
// built on wavesurfer.js. Progressive enhancement: each player wraps a native
// <audio controls>, which stays visible if this script or wavesurfer.js does not load.
(() => {
  if (typeof WaveSurfer === "undefined") return;

  const players = [];

  // Compact styles: fixed colours and shape, whatever the site theme.
  // grid: vertical grid lines every 0.25 s (spacing computed from the duration).
  const STYLES = {
    retro: { colors: { waveColor: "#19d219", progressColor: "#b6ff6a", cursorColor: "#ffe14d" }, shape: {}, grid: true },
    mint: { colors: { waveColor: "#48e8a0", progressColor: "#c4ffe6", cursorColor: "#ffffff" }, shape: {}, grid: false },
    scope: { colors: { waveColor: "#36d6ff", progressColor: "#c8f4ff", cursorColor: "#ff5c8a" }, shape: {}, grid: true },
    amber: { colors: { waveColor: "#ffb000", progressColor: "#ffe2a0", cursorColor: "#ffffff" }, shape: {}, grid: false },
    paper: {
      colors: { waveColor: "#9a9a9a", progressColor: "#1e1e1e", cursorColor: "#e46e1a" },
      shape: { barWidth: 1, barGap: 1 },
      grid: false,
    },
    ember: {
      colors: { waveColor: ["#ffb338", "#e46e1a"], progressColor: ["#fff1cc", "#ffb338"], cursorColor: "#ffffff" },
      shape: { barWidth: 2, barGap: 1, barRadius: 1 },
      grid: false,
    },
  };

  const styleOf = (el) => {
    const m = el.className.match(/waveplayer--(\w+)/g) || [];
    for (const c of m) {
      const name = c.replace("waveplayer--", "");
      if (STYLES[name]) return STYLES[name];
    }
    return null;
  };

  // Default style: follows the site's light / dark theme.
  const themeColors = () => {
    const root = getComputedStyle(document.documentElement);
    const dark = document.documentElement.dataset.theme === "dark";
    return {
      waveColor: dark ? "rgba(218, 218, 219, 0.35)" : "rgba(60, 60, 67, 0.3)",
      progressColor: root.getPropertyValue("--blue-accent").trim() || "#219bff",
      cursorColor: dark ? "rgb(218, 218, 219)" : "rgb(30, 30, 30)",
    };
  };

  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  function init(el) {
    const audio = el.querySelector("audio");
    const wave = el.querySelector(".wp-wave");
    const button = el.querySelector(".wp-play");
    const time = el.querySelector(".wp-time");
    const style = styleOf(el);

    const shape = style
      ? { height: 40, cursorWidth: 1, ...style.shape }
      : { height: 56, barWidth: 2, barGap: 1, barRadius: 2, cursorWidth: 1 };

    // normalize: false keeps one amplitude scale for all players, so level differences
    // (noisy versus denoised) stay visible.
    const ws = WaveSurfer.create({
      container: wave,
      media: audio,
      ...shape,
      normalize: false,
      dragToSeek: true,
      ...(style ? style.colors : themeColors()),
    });
    ws.el = el;
    ws.themed = !style;

    if (style && style.grid) {
      const setGrid = () => {
        const d = ws.getDuration();
        if (d > 0) wave.style.setProperty("--wp-grid-x", `${(wave.clientWidth * 0.25) / d}px`);
      };
      ws.on("ready", setGrid);
      new ResizeObserver(setGrid).observe(wave);
    }

    const setPlaying = (playing) => {
      el.classList.toggle("is-playing", playing);
      button.setAttribute("aria-label", playing ? "Pause" : "Play");
    };

    ws.on("ready", (duration) => {
      el.classList.add("is-ready");
      time.textContent = `0:00 / ${fmt(duration)}`;
    });
    ws.on("timeupdate", (t) => {
      time.textContent = `${fmt(t)} / ${fmt(ws.getDuration())}`;
    });
    ws.on("play", () => {
      setPlaying(true);
      for (const other of players) if (other !== ws) other.pause();
    });
    ws.on("pause", () => setPlaying(false));
    ws.on("finish", () => setPlaying(false));

    button.addEventListener("click", () => ws.playPause());
    players.push(ws);
  }

  document.querySelectorAll(".waveplayer").forEach(init);

  // Follow the site's light / dark toggle (default style only).
  new MutationObserver(() => {
    const c = themeColors();
    for (const ws of players) if (ws.themed) ws.setOptions(c);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
})();
