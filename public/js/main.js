/* ===========================
   LOGIN SYSTEM
=========================== */

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        sessionStorage.setItem("musicAllowed", "yes");
        window.location.href = "home.html";
      } else {
        error.textContent = "Wrong username or password 💔";
      }
    });
}

/* ===========================
   PERSISTENT MUSIC PLAYER
=========================== */

// Create global music if not already made
if (!window.globalMusic) {
  window.globalMusic = new Audio("music/oursong.mp3");
  window.globalMusic.volume = 0.8;
  window.globalMusic.loop = true;
  window.globalMusic.preload = "auto";
}

// Auto-play rules
const playMusic = () => {
  window.globalMusic
    .play()
    .then(() => sessionStorage.setItem("musicAllowed", "yes"))
    .catch(() => {});
};

// If allowed, play immediately
if (sessionStorage.getItem("musicAllowed") === "yes") {
  playMusic();
}

// If not allowed yet → wait for a click (browser policy)
document.addEventListener(
  "click",
  () => {
    if (sessionStorage.getItem("musicAllowed") !== "yes") {
      playMusic();
    }
  },
  { once: true }
);
