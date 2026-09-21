<script>
  // ローカルストレージから進行状況を取得
  const saveData = JSON.parse(localStorage.getItem("kotobaForestSave")) || {
    clearedStages: [], // クリアした章番号を保存
    unlockedStages: [1], // 最初にプレイ可能なステージ
  };

  // 章を選択するボタン群
  const stageButtons = document.querySelectorAll(".stage-button");

  stageButtons.forEach(button => {
    const stageText = button.textContent;
    const match = stageText.match(/第(\d+)章/);
    if (!match) return;

    const stageNumber = parseInt(match[1]);

    // 保存データに応じて解放制御
    if (saveData.unlockedStages.includes(stageNumber)) {
      button.disabled = false;
    } else {
      button.disabled = true;
      button.textContent += "（封印中）";
    }

    // ボタンクリック処理
    button.addEventListener("click", () => {
      enterStage(stageNumber);
    });
  });

  function enterStage(stageNumber) {
    alert(`第${stageNumber}章に進みます…`);
    // ここに遷移処理などを記述
  }

  // ステージクリア時に呼び出す関数例
  function clearStage(stageNumber) {
    if (!saveData.clearedStages.includes(stageNumber)) {
      saveData.clearedStages.push(stageNumber);
    }

    // 次章の解放（例：1章クリア → 2章解放）
    const nextStage = stageNumber + 1;
    if (!saveData.unlockedStages.includes(nextStage)) {
      saveData.unlockedStages.push(nextStage);
    }

    // ローカルストレージに保存
    localStorage.setItem("kotobaForestSave", JSON.stringify(saveData));
  }
</script>