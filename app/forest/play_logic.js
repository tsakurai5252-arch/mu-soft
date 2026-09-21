const difficulty = localStorage.getItem("kotobaForestDifficulty") || "normal";

// 制限時間補正
function getAdjustedTimeLimit(baseTime) {
  if (difficulty === "easy") return baseTime + 10;
  if (difficulty === "hard") return Math.max(baseTime - 5, 3);
  return baseTime;
}

// ミス時の挙動分岐
function handleMistake() {
  if (difficulty === "hard") {
    alert("語りが拒まれました。一度の揺らぎも許されません。");
    window.location.href = "stage_select.html";
  } else {
    alert("綴りが少し揺らいだようです。もう一度綴ってみましょう。");
  }
}

// 精霊の語り（難易度によって変える例）
function getWhisperText(stageWhisper) {
  if (difficulty === "easy") {
    return stageWhisper + "\n精霊：「ゆっくり綴ってかまいませんよ…」";
  }
  if (difficulty === "hard") {
    return stageWhisper + "\n精霊：「深淵には、揺らぎは許されません…」";
  }
  return stageWhisper;
}