const difficulty = localStorage.getItem("difficulty") || "normal";
document.getElementById("titleLabel").textContent = `選ばれし言葉：${difficulty}`;

let phrases;
let clearThreshold;

switch (difficulty) {
  case "easy":
    phrases = ["正義", "光", "心", "希望", "絆", "風", "夢", "道", "命"];
    clearThreshold = 120;
    break;
  case "normal":
    phrases = ["正義の心", "みんなの思い", "期待を裏切らない",
               "世界を守る力", "信じる勇気", "未来を託す",
               "静かな祈り", "光の言葉", "変わる勇気"];
    clearThreshold = 250;
    break;
  case "hard":
    phrases = ["正義の心をもって", "時を超える。", "世界を救うんだ！",
               "自分を信じる力", "仲間との絆を信じて", "諦めないことがすべて",
               "運命を変える言葉", "迷いを超える勇気", "夜を越える光"];
    clearThreshold = 450;
    break;
  case "lunatic":
    phrases = ["正義の心をもって行動するスーパーマン",
               "世界にゆがみが発生している。これは大変まずい状態だ",
               "せかいの終焉...!うわああああああ",
               "神の言葉が崩れ始めた。世界が叫んでいる",
               "目覚めよ、忘却の精霊よ。今こそ過去を取り戻せ",
               "時空に裂け目が…誰かが封印を解こうとしている",
               "――この世界は偽物なのか？それとも――",
               "さけぶな、ことばがこわれる…ああああ…",
               "記憶の霧が、あたりを包みこむ…"];
    clearThreshold = 1000;
    break;
}

let currentPhrase = "";
let missCount = 0;
let timeLeft = 60;
let score = 0;
let timer;
let isCleared = false;

const phraseBox = document.getElementById("phrase-box");
const input = document.getElementById("type-input");
const feedback = document.getElementById("feedback");
const missDisplay = document.getElementById("miss-count");
const spiritVisual = document.getElementById("spirit-visual");

// 表示要素追加
const timeDisplay = document.createElement("div");
timeDisplay.id = "timer";
document.querySelector(".centered").appendChild(timeDisplay);

const scoreDisplay = document.createElement("div");
scoreDisplay.id = "score";
document.querySelector(".centered").appendChild(scoreDisplay);

const goalDisplay = document.createElement("div");
goalDisplay.id = "clear-goal";
goalDisplay.textContent = `クリア目標: ${clearThreshold}点`;
document.querySelector(".centered").appendChild(goalDisplay);

const resetBtn = document.createElement("button");
resetBtn.textContent = "🧼 記録の浄化";
resetBtn.className = "reset-button";
resetBtn.onclick = resetGameData;
document.querySelector(".centered").appendChild(resetBtn);

function setNewPhrase() {
  currentPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  phraseBox.textContent = `精霊に伝える言葉：「${currentPhrase}」`;
  input.value = "";
  feedback.textContent = "";
  spiritVisual.innerHTML = "";
  input.focus();
}

function recordClear(difficulty) {
  localStorage.setItem(`${difficulty}Cleared`, "true");
  const clearedAll = ["easy", "normal", "hard"].every(diff =>
    localStorage.getItem(`${diff}Cleared`) === "true"
  );
  if (clearedAll) {
    localStorage.setItem("lunaticUnlocked", "true");
    console.log("🌙 Lunatic難易度が解禁されました！");
  }
}

function endGame() {
  phraseBox.textContent = "⏳ 言葉の力が途絶えました…";
  input.disabled = true;
  spiritVisual.innerHTML = "🌑";
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = `残り時間: ${timeLeft}秒`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function updateScore(points) {
  if (isCleared) return;

  score += points;
  scoreDisplay.textContent = `得点: ${score}点`;
  goalDisplay.textContent = `クリアまであと: ${Math.max(clearThreshold - score, 0)}点`;

  if (score >= clearThreshold) {
    isCleared = true;
    clearInterval(timer);
    input.disabled = true;
    recordClear(difficulty);
    window.location.href = `ending_${difficulty}.html`;
  }
}

function handleCorrectTyping() {
  const typed = wanakana.toHiragana(input.value.trim());
  const target = wanakana.toHiragana(currentPhrase.trim());

  if (typed === target) {
    feedback.textContent = "✨ 精霊が応えてくれた";
    spiritVisual.innerHTML = "🧚‍♂️";
    timeLeft += 5;
    input.disabled = true;
    updateScore(20);
    setTimeout(() => {
      if (!isCleared) {
        input.disabled = false;
        setNewPhrase();
      }
    }, 1500);
  } else {
    missCount++;
    feedback.textContent = "⚡ 精霊が戸惑っています...";
    spiritVisual.innerHTML = "🌫️";
    missDisplay.textContent = `Miss: ${missCount}`;
  }
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleCorrectTyping();
  }
});

function resetGameData() {
  const confirmReset = confirm("❓確認：\n記憶を浄化してもよろしいですか？");
  if (confirmReset) {
    localStorage.removeItem("easyCleared");
    localStorage.removeItem("normalCleared");
    localStorage.removeItem("hardCleared");
    localStorage.removeItem("lunaticUnlocked");
    localStorage.removeItem("difficulty");
    alert("🌿 精霊の記憶は静かに霧となり、世界に溶けました");
    location.href = "index.html";
  } else {
    alert("🛡️ 精霊はそっと頷きました：記憶は守られました");
  }
}

// 起動処理
setNewPhrase();
startTimer();
scoreDisplay.textContent = `得点: ${score}点`;
timeDisplay.textContent = `残り時間: ${timeLeft}秒`;