function setDifficulty(level) {
  localStorage.setItem("difficulty", level);
  window.location.href = "game.html";
}

window.onload = () => {
  const lunaticUnlocked = localStorage.getItem("lunaticUnlocked") === "true";
  if (lunaticUnlocked) {
    document.getElementById("lunatic").style.display = "block";
  }
};