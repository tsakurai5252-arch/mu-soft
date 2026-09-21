// menu.js バージョン260921-MU-SOFT版
// 共通メニューのCSSスタイルを適用
const menuStyle = document.createElement('style');
menuStyle.textContent = `
/* ▼ 追加: カスタムプロパティ（デザイン可変用の設定） ▼ */
  :root {
    /* フォント設定 */
    --common-font-family: inherit;
    --toc-font-family: 'HG正楷書体PRO', 'HGSeikaishotaiPRO', 'MS PMincho', 'MS P明朝', 'Hiragino Mincho ProN', serif;
    
    /* カラー設定 (ライトモード初期値) */
    --menu-bg-color: #FFFFFF;
    --menu-text-color: #000000;
    --dropdown-bg-color: #ffffff;
    --dropdown-hover-bg: #f5f7fa;
    --accent-color: #0056b3;
    --border-color: #eaeaea;
    --box-bg-color: #f8f9fa;
  }

  /* ▼ ダークモード適用時の設定 ▼ */
  .common-header-bar.dark-mode {
    --menu-bg-color: #1a1a1a;
    --menu-text-color: #ffffff;
    --dropdown-bg-color: #2a2a2a;
    --dropdown-hover-bg: #3a3a3a;
    --accent-color: #4da6ff;
    --border-color: #333333;
    --box-bg-color: #2a2a2a;
  }

/* 枠線や背景の枠指定だけを打ち消す場合 */
  .common-header-bar img,
  .back-to-top img {
    border: none !important;
    outline: none !important;
    background: transparent !important;
    padding: 0 !important;
  }

  /* ▼ 追加: スムーズなスクロールと、固定メニューの下に隠れないための余白設定 ▼ */
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 70px; 
    font-family: var(--common-font-family);
  }

  .common-header-bar {
    background-color: var(--menu-bg-color);
    color: var(--menu-text-color);
    padding: 12px 20px;
    margin: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    position: sticky;
    top: 0;
    z-index: 100;
    transition: box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease;
    width: 100%;
    box-sizing: border-box;
  }

  /* （中略：スタイル構造やレイアウトはそのまま固定） */

  .page-link-item:hover {
    background-color: var(--dropdown-hover-bg);
    color: var(--accent-color);
  }

  .page-link-current {
    font-size: 13px;
    font-weight: bold;
    color: var(--accent-color);
    background-color: var(--dropdown-hover-bg);
    padding: 4px 10px;
    border-radius: 12px;
    white-space: nowrap;
  }

  .toc-btn, .ellipsis-btn {
    font-family: var(--toc-font-family);
    color: var(--menu-text-color);
    /* その他のスタイルは維持 */
  }

  .toc-item, .ellipsis-item {
    color: var(--menu-text-color);
    font-family: var(--toc-font-family);
    /* その他のスタイルは維持 */
  }

  .toc-item:hover, .ellipsis-item:hover {
    background-color: var(--dropdown-hover-bg);
    padding-left: 24px;
    color: var(--accent-color);
  }

  input:checked + .slider {
    background-color: var(--accent-color);
  }

  /* ▼ 追加: スムーズなスクロールと、固定メニューの下に隠れないための余白設定 ▼ */
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 70px; 
  }

  .common-nav-list {
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    list-style: none;
    padding: 0;
    box-sizing: border-box;
  }

  .header-main-group {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .header-logo {
    max-height: 35px;
    width: auto;
    transition: transform 0.2s ease;
  }
  
  .header-logo:hover {
    transform: scale(1.05);
  }

  .common-nav-link {
    color: var(--menu-text-color);
    text-decoration: none;
    font-size: 14px;
    font-weight: bold;
    padding: 6px 10px;
    border-radius: 6px;
    white-space: nowrap;
    position: relative;
    transition: color 0.3s ease, opacity 0.3s ease;
  }

  /* リンクのホバー時に下線が伸びるアニメーション */
  .common-nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 80%;
    height: 2px;
    background-color: currentColor;
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.3s ease;
  }

  .common-nav-link:hover::after {
    transform: scaleX(1);
  }
  
  .common-nav-link:hover {
    opacity: 0.7;
  }

  .header-copyright {
    color: var(--menu-text-color);
    font-size: 12px;
    white-space: nowrap;
    margin: 0;
  }

  /* 右側のグループ（角丸枠と三点リーダー） */
  .header-right-group {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  /* ▼三点リーダーの左側にある角丸の枠▼ */
  .page-links-container {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: var(--box-bg-color);
    border: 1px solid var(--border-color);
    padding: 4px 8px;
    border-radius: 20px;
  }

  .page-link-item {
    text-decoration: none;
    font-size: 13px;
    font-weight: bold;
    color: var(--menu-text-color);
    padding: 4px 10px;
    border-radius: 12px;
    transition: background-color 0.2s ease, color 0.2s ease;
    white-space: nowrap;
  }

  .page-link-item:hover {
    background-color: var(--dropdown-hover-bg);
    color: var(--accent-color);
  }

  /* 現在地を示すテキスト用のスタイル */
  .page-link-current {
    font-size: 13px;
    font-weight: bold;
    color: var(--accent-color);
    background-color: var(--dropdown-hover-bg);
    padding: 4px 10px;
    border-radius: 12px;
    white-space: nowrap;
  }

  .page-link-item.coming-soon {
    color: #999;
    cursor: not-allowed;
    background-color: transparent;
  }

  /* ▼ 目次・三点リーダードロップダウン共通 ▼ */
  .toc-dropdown, .ellipsis-dropdown {
    position: relative;
  }

  .toc-btn, .ellipsis-btn {
    background: none;
    border: none;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    padding: 6px 10px;
    border-radius: 6px;
    transition: background-color 0.2s ease, color 0.2s ease;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .ellipsis-btn {
    font-size: 20px;
    padding: 0 12px;
  }

  .toc-btn:hover, .ellipsis-btn:hover {
    background-color: var(--dropdown-hover-bg);
  }

  /* アニメーション付きドロップダウンメニュー */
  .toc-menu, .ellipsis-menu {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    position: absolute;
    right: 0;
    top: calc(100% + 10px);
    background: var(--dropdown-bg-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    padding: 8px 0;
    z-index: 20;
    min-width: 160px;
    transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease;
  }

  /* jsで .show クラスが付与されたら表示する */
  .toc-menu.show, .ellipsis-menu.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .toc-item, .ellipsis-item {
    display: block;
    padding: 10px 20px;
    text-decoration: none;
    color: var(--menu-text-color);
    font-size: 14px;
    transition: background-color 0.2s ease, padding-left 0.2s ease;
  }

  .toc-item:hover, .ellipsis-item:hover {
    background-color: var(--dropdown-hover-bg);
    padding-left: 24px; /* ホバー時に少し右へスライドするエフェクト */
    color: var(--accent-color);
  }

/* ▼ スライドスイッチ用のCSSスタイル ▼ */
  .device-switch-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    font-size: 14px;
    color: var(--menu-text-color);
    cursor: default;
    user-select: none;
  }

  .device-switch-container:hover {
    background-color: transparent;
    padding-left: 20px; /* ホバー時のスライド効果を無効化 */
    color: var(--menu-text-color);
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
    margin-left: 12px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: #ccc;
    transition: .3s;
    border-radius: 24px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .3s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: var(--accent-color);
  }

  input:checked + .slider:before {
    transform: translateX(20px);
  }

  /* TOPに戻るボタンのコンテナ（右下に固定） */
  .back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 1000;
    cursor: pointer;
    /* ▼ 追加: 初期状態は透明にしておく ▼ */
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s ease, visibility 0.4s ease, transform 0.4s ease;
    /* 上下にゆっくり動くアニメーション */
    animation: floatSlow 2s ease-in-out infinite;
  }

  /* ▼ 追加: スクロールされたら表示するクラス ▼ */
  .back-to-top.show-btn {
    opacity: 1;
    visibility: visible;
  }

  /* 画像の設定（影をつける） */
  .back-to-top img {
    display: block;
    filter: drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.3));
    transition: filter 0.3s ease;
  }

  /* カーソルを合わせた時のホバー演出（さらに激しく動かす） */
  .back-to-top:hover {
    animation: floatFast 2.0s ease-in-out infinite;
    transform: scale(1.7); /* 少し拡大も加える場合 */
  }

  .back-to-top:hover img {
    filter: drop-shadow(0px 12px 20px rgba(0, 0, 0, 0.4));
  }

  /* 通常時のゆっくりした上下運動 */
  @keyframes floatSlow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  /* ホバー時の激しい上下運動 */
  @keyframes floatFast {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-16px); }
  }

  /* スマホ向け対応 */
  @media (max-width: 900px) {
    .common-header-bar { padding: 10px 15px; }
    .common-nav-list { flex-direction: column; gap: 8px; padding: 0; }
    .header-main-group { gap: 12px; flex-wrap: wrap; justify-content: center; }
    .header-right-group { width: 100%; justify-content: center; flex-wrap: wrap; gap: 8px; }
    .header-logo { max-height: 28px; }
    .common-nav-link, .toc-btn { font-size: 12px; padding: 4px 8px; }
    .toc-menu, .ellipsis-menu { right: auto; left: 50%; transform: translateX(-50%) translateY(-10px); }
    .toc-menu.show, .ellipsis-menu.show { transform: translateX(-50%) translateY(0); }

/* ▼ スマホ時に角丸枠や内部の文字サイズ・余白を縮小してはみ出しを防止 ▼ */
    .page-links-container {
      width: 100%;
      justify-content: space-around;
      padding: 4px 4px;
      gap: 2px;
      overflow-x: auto;
    }
    
    /* スマホ時にTOPに戻るボタンの画像を40%の大きさにする */
    .back-to-top img {
      width: 40%;
      height: auto;
      margin-left: auto;
    }
    .back-to-top {
      right: 15px;
      bottom: 15px;
      text-align: right;
    }

    /* メインコンテンツ枠やラッパーの幅を画面に合わせて可変にし、内部の画像をレスポンシブ化 */
    #wrapper, #banner, .contentmain {
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
      padding-left: 10px !important;
      padding-right: 10px !important;
      border-left: none !important;
      border-right: none !important;
    }

    .leftcontent, .rightcontent, 
    .leftcolumn, .rightcolumn {
      width: 100% !important;
      float: none !important;
      border-left: none !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
      text-align: left !important;
      box-sizing: border-box;
    }

    #wrapper img, .contentmain img, .leftcontent img, .rightcontent img, .leftcolumn img, .rightcolumn img {
      max-width: 100% !important;
      height: auto !important;
    }
  }


/* ▼ ガラケーなどの極小画面（横幅350px以下）向けの折りたたみ調整 ▼ */
  @media (max-width: 350px) {
    .page-links-container {
      display: none; /* 極小画面では通常のボタン群を隠し、三点リーダー内に統合する */
    }
    #seasonal-icon span {
      font-size: 11px !important;
    }
    #seasonal-icon img {
      height: 28px !important;
    }
  }
`;

document.head.appendChild(menuStyle);

// 共通メニューおよびTOPに戻るボタンのHTML構造を生成して挿入
window.addEventListener('DOMContentLoaded', () => {
  const menuArea = document.getElementById('common-menu-area');

  if (menuArea) {
    // ▼ ID判定および<menu-text>タグの読み取り処理 ▼
    let isDarkMode = false;
    const hasDarkId = document.getElementById('menu-text-dark') !== null;
    const hasDefaultId = document.getElementById('menu-text-default') !== null;
    const menuTextTag = document.querySelector('menu-text');

    if (hasDarkId) {
      isDarkMode = true;
    } else if (hasDefaultId) {
      isDarkMode = false;
    } else if (menuTextTag) {
      const rawVal = menuTextTag.textContent.trim().replace('#', '').toUpperCase();
      if (rawVal === 'FFFFFF' || rawVal === 'DARK') {
        isDarkMode = true;
      } else if (rawVal === '000000' || rawVal === 'LIGHT' || rawVal === 'DEFAULT') {
        isDarkMode = false;
      }
    }

    // ▼ HTML要素（div）の有無によって状態やリンクを判定する
    const isTopPage = document.getElementById('top-page') !== null;
    const isDownload = document.getElementById('download') !== null;
    const isUpdate = document.getElementById('update') !== null;
    const isReq = document.getElementById('req') !== null;
    const isBlog = document.getElementById('blog') !== null;
    const isTerms = document.getElementById('terms') !== null;
    const isPotal = document.getElementById('web-potal') !== null;

    // ▼ ロゴ画像およびTOPに戻る画像のパスをトップページかそれ以外かで切り替え
    const logoSrc = isTopPage ? 'logo.png' : '../logo.png';
    const topImgSrc = isTopPage ? 'top.png' : '../top.png';


// ▼ 追加: ファビコンを動的に設定する処理 ▼
  const faviconSrc = isTopPage ? 'favicon.ico' : '../favicon.ico';
  let faviconLink = document.querySelector("link[rel*='icon']");
  if (!faviconLink) {
    faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    document.head.appendChild(faviconLink);
  }
  faviconLink.href = faviconSrc;

    let tocItemsHTML = '';
    let ellipsisItemsHTML = '';

// スライドスイッチ用のHTMLパーツ（三点リーダーの最後尾に追加）
    const deviceSwitchHTML = `
      <div style="border-top: 1px solid var(--border-color); margin-top: 6px; padding-top: 2px;">
        <div class="device-switch-container">
          <span>PC版表示</span>
          <label class="switch">
            <input type="checkbox" id="deviceSwitchCheckbox">
            <span class="slider"></span>
          </label>
        </div>
      </div>
    `;
    if (isTopPage) {
      tocItemsHTML = `
        <a href="#01" class="toc-item">冒頭</a>
        <a href="#02" class="toc-item">お知らせ・告知</a>
        <a href="#03" class="toc-item">コンテンツ一覧</a>
        <a href="#04" class="toc-item">制作実績</a>
        <a href="#05" class="toc-item">暇人の独り言</a>
        <a href="#06" class="toc-item">推奨環境</a>
      `;
ellipsisItemsHTML = `
        ${deviceSwitchHTML}
      `;

    } else if (isDownload) {

// 現在の日時を取得
      const now = new Date();

      // 公開開始日と公開終了日を設定（必要に応じて日時を変更してください）
      const startDate = new Date('2026-09-21T00:00:00'); // 公開開始日時
      const endDate   = new Date('9999-12-31T23:59:59'); // 公開終了日時

      // 現在日時が公開期間内（開始日時以降かつ終了日時以前）かどうかを判定
      const isVisible = now >= startDate && now <= endDate;

       if (now < startDate) {
            tocItemsHTML = `<span style="font-family: 'HG正楷書体PRO', 'HGSeikaishotaiPRO', 'MS PMincho', 'MS P明朝', 'Hiragino Mincho ProN', serif;">公開まで、しばらく<br>お待ちください。</span>`;
        } else if (now > endDate) {
            tocItemsHTML = `<span style="font-family: 'HG正楷書体PRO', 'HGSeikaishotaiPRO', 'MS PMincho', 'MS P明朝', 'Hiragino Mincho ProN', serif;">公開期間は<br>終了しました。</span>`;
        } else {
            tocItemsHTML = `
        <a href="#01" class="toc-item">冒頭</a>
        <a href="#02" class="toc-item">配信・更新情報</a>
        <a href="#03" class="toc-item">ソフトウェアダウンロード</a>
        <a href="#04" class="toc-item">ご利用上の注意</a>
        <a href="#05" class="toc-item">推奨環境</a>
`;
        }

ellipsisItemsHTML = `
        <!-- <a href="../index.html#14" class="ellipsis-item">問合せ先</a>-->
        ${deviceSwitchHTML}
      `;

    } else if (isUpdate) {
      tocItemsHTML = `
        <a href="#new" class="toc-item">最新の案内</a>
        <a href="#info" class="toc-item">常設案内</a>
        <a href="#thank" class="toc-item">お礼</a>
        <a href="#old" class="toc-item">過去の案内</a>
      `;
      ellipsisItemsHTML = `
        ${deviceSwitchHTML}
      `;
    } else if (isReq) {
      tocItemsHTML = `
        <a href="#os" class="toc-item">OS/ブラウザ環境について</a>
        <a href="#javascript" class="toc-item">ご利用にあたっての設定</a>
      `;
      ellipsisItemsHTML = `
        ${deviceSwitchHTML}
      `;

    } else if (isTerms) {
      tocItemsHTML = `
        <a href="#01" class="toc-item">冒頭</a>
        <a href="#02" class="toc-item">利用規約 本文</a>
      `;
      ellipsisItemsHTML = `
        <p>ソフトウェアのダウンロードに当たって、<br>必ず利用規約をお読みください。</p>
        ${deviceSwitchHTML}
      `;

    } else if (isPotal) {

// 現在の日時を取得
      const now = new Date();

      // 公開開始日と公開終了日を設定（必要に応じて日時を変更してください）
      const startDate = new Date('2026-09-21T00:00:00'); // 公開開始日時
      const endDate   = new Date('9999-12-31T23:59:59'); // 公開終了日時

      // 現在日時が公開期間内（開始日時以降かつ終了日時以前）かどうかを判定
      const isVisible = now >= startDate && now <= endDate;

       if (now < startDate) {
            tocItemsHTML = `<span style="font-family: 'HG正楷書体PRO', 'HGSeikaishotaiPRO', 'MS PMincho', 'MS P明朝', 'Hiragino Mincho ProN', serif;">公開まで、しばらく<br>お待ちください。</span>`;
        } else if (now > endDate) {
            tocItemsHTML = `<span style="font-family: 'HG正楷書体PRO', 'HGSeikaishotaiPRO', 'MS PMincho', 'MS P明朝', 'Hiragino Mincho ProN', serif;">公開期間は<br>終了しました。</span>`;
        } else {
            tocItemsHTML = `
        <a href="#01" class="toc-item">冒頭</a>
        <a href="#02" class="toc-item">Webアプリ・ゲーム</a>
`;
        }

ellipsisItemsHTML = `
        ${deviceSwitchHTML}
      `;

    } else {
      tocItemsHTML = `
        <p>形式を識別できませんでした。</p>
      `;
      ellipsisItemsHTML = `
        <p>形式を識別できませんでした。</p>
        ${deviceSwitchHTML}
      `;
    }

    // ▼ 角丸枠内の表示切り替え（いまいるページならテキスト、それ以外ならリンク）
    const now = new Date();

    // 1. トップページ用
    let topPageHTML = '';
    if (isTopPage) {
      topPageHTML = `<span class="page-link-current">トップページ</span>`;
    } else {
      topPageHTML = `<a href="../index.html" class="page-link-item">トップページ</a>`;
    }

    // 2. ダウンロードページ
    const downloadStart = new Date('2026-09-21T00:00:00');
    const downloadEnd = new Date('9999-12-31T23:59:59');
    let downloadHTML = '';
    const downloadHref = isTopPage ? './download/index.html' : '../download/index.html';

    if (now > downloadEnd) {
      downloadHTML = '';
    } else if (now < downloadStart) {
      downloadHTML = `<span class="page-link-item coming-soon">Coming Soon...</span>`;
    } else if (isDownload) {
      downloadHTML = `<span class="page-link-current">ダウンロード</span>`;
    } else {
      downloadHTML = `<a href="${downloadHref}" class="page-link-item">ダウンロード</a>`;
    }

    // 3. 改定案内
    const updateStart = new Date('2013-01-01T00:00:00');
    const updateEnd = new Date('9999-12-31T23:59:59');
    let updateHTML = '';
    const updateHref = isTopPage ? 'html/update.html' : '../html/update.html';

    if (now > updateEnd) {
      updateHTML = '';
    } else if (now < updateStart) {
      updateHTML = `<span class="page-link-item coming-soon">Coming Soon...</span>`;
    } else if (isUpdate) {
      updateHTML = `<span class="page-link-current">サイト内の表示について</span>`;
    } else {
      updateHTML = `<a href="${updateHref}" class="page-link-item">サイト内の表示について</a>`;
    }

    // 4. 動作推奨環境
    const reqStart = new Date('2013-01-01T00:00:00');
    const reqEnd = new Date('9999-12-31T23:59:59');
    let reqHTML = '';
    const reqHref = isTopPage ? 'html/req.html' : '../html/req.html';

    if (now > reqEnd) {
      reqHTML = '';
    } else if (now < reqStart) {
      reqHTML = `<span class="page-link-item coming-soon">Coming Soon...</span>`;
    } else if (isReq) {
      reqHTML = `<span class="page-link-current">動作推奨環境</span>`;
    } else {
      reqHTML = `<a href="${reqHref}" class="page-link-item">動作推奨環境</a>`;
    }

    // 5. 利用規約
    const termsStart = new Date('2013-01-01T00:00:00');
    const termsEnd = new Date('9999-12-31T23:59:59');
    let termsHTML = '';
    const termsHref = isTopPage ? './about/terms.html' : '../about/terms.html';

    if (now > termsEnd) {
      termsHTML = '';
    } else if (now < termsStart) {
      termsHTML = `<span class="page-link-item coming-soon">Coming Soon...</span>`;
    } else if (isTerms) {
      termsHTML = `<span class="page-link-current">利用規約</span>`;
    } else {
      termsHTML = `<a href="${termsHref}" class="page-link-item">利用規約</a>`;
    }

    // 6. Webアプリポータル MU-WebPlay
    const potalStart = new Date('2013-01-01T00:00:00');
    const potalEnd = new Date('9999-12-31T23:59:59');
    let potalHTML = '';
    const potalHref = isTopPage ? './html/web-potal.html' : '../html/web-potal.html';

    if (now > potalEnd) {
      potalHTML = '';
    } else if (now < potalStart) {
      potalHTML = `<span class="page-link-item coming-soon">Coming Soon...</span>`;
    } else if (isPotal) {
      potalHTML = `<span class="page-link-current">Webアプリポータル</span>`;
    } else {
      potalHTML = `<a href="${potalHref}" class="page-link-item">Webアプリポータル</a>`;
    }



    // メニューのHTML描画
    menuArea.innerHTML = `
    <header class="common-header-bar ${isDarkMode ? 'dark-mode' : ''}" id="commonHeader">
      <nav>
        <div class="common-nav-list">
          <div class="header-main-group">
            <a href="https://tsakurai5252-arch.github.io/mu-soft/">
              <img src="${logoSrc}" alt="ロゴ" class="header-logo">
            </a>

            <!-- ▼ 目次タブ ▼ -->
            <div class="toc-dropdown">
              <button type="button" class="toc-btn" id="tocBtn" style="font-family: MS P明朝, serif;">目次 ▼</button>
              <div class="toc-menu" id="tocMenu">
                ${tocItemsHTML}
              </div>
            </div>
<!--                      <a href="リンク先" class="common-nav-link">リンクタイトル</a>-->
          </div>

          <!-- 右側のグループ（角丸枠 ＆ 三点リーダー） -->
          <div class="header-right-group">
            <div class="page-links-container">
              ${topPageHTML}
              ${downloadHTML}
              ${potalHTML}
              ${termsHTML}
              ${updateHTML}
              ${reqHTML}
            </div>
              <!-- ▼ 追加: 季節ごとの画像を表示するアイコン領域 ▼ -->
              <span id="seasonal-icon" style="display: inline-flex; align-items: center; margin-right: 4px;"></span>
            <!-- ▼ 三点リーダーメニュー ▼ -->
            <div class="ellipsis-dropdown">
              <button type="button" class="ellipsis-btn" id="ellipsisBtn">…</button>
              <div class="ellipsis-menu" id="ellipsisMenu">
                ${ellipsisItemsHTML}
              </div>
            </div>
          </div>

        </div>
      </nav>
    </header>
  `;

// ▼ 季節に応じた画像と日付（特定日判定付き）を挿入する処理 ▼
    const setSeasonalIcon = () => {
      const seasonalIconEl = menuArea.querySelector('#seasonal-icon');
      if (!seasonalIconEl) return;

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; // 1～12月
      const currentDay = currentDate.getDate();       // 1～31日

      // 1. 季節に応じた画像判定
      let imageName = 'leaf.png'; // デフォルト（秋）
      if (currentMonth >= 3 && currentMonth <= 5) {
        imageName = 'spring.png'; // 春（3月～4月）
      } else if (currentMonth >= 5 && currentMonth <= 8) {
        imageName = 'leaf.png';   // 夏（5月～8月）
      } else if (currentMonth >= 9 && currentMonth <= 11) {
        imageName = 'momiji.png'; // 秋（9月～11月）
      } else {
        imageName = 'winter.png'; // 冬（12月～2月）
      }

      const imagePath = isTopPage ? imageName : '../' + imageName;

      // 2. 特別な日付（大会前日・当日など）のテキスト判定
      const currentDateKeyWithYear = `${currentYear}/${currentMonth}/${currentDay}`;
      let specialNote = '';

      if (currentDateKeyWithYear === '9999/12/29') {
        specialNote = ' <span style="color: #d9534f; font-weight: bold;">(そろそろ4桁最後の日)</span>';
      } else if (currentDateKeyWithYear === '9999/12/30') {
        specialNote = ' <span style="color: #c9987f; font-weight: bold;">(明日が4桁最後の日！)</span>';
      } else if (currentDateKeyWithYear === '9999/12/31') {
        specialNote = ' <span style="color: #0275d8;">(今日で4桁は最後！)</span>';
      }


      // 3. アイコン＋日付＋注記テキストをセット
      seasonalIconEl.innerHTML = `
        <span style="font-size: 13px; margin-left: 6px; white-space: nowrap; vertical-align: middle;">
          ${currentYear}年${currentMonth}月${currentDay}日${specialNote}
        </span>&nbsp;
        <img src="${imagePath}" alt="四季" style="height: 40px; width: auto; vertical-align: middle;">
      `;
    };

    setSeasonalIcon();

    // ▼ イベントリスナーの設定
    const tocBtn = menuArea.querySelector('#tocBtn');
    const tocMenu = menuArea.querySelector('#tocMenu');
    const ellipsisBtn = menuArea.querySelector('#ellipsisBtn');
    const ellipsisMenu = menuArea.querySelector('#ellipsisMenu');

    // 目次ボタンのクリック処理（クラスの付け外しでアニメーション）
    if (tocBtn && tocMenu) {
      tocBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        tocMenu.classList.toggle('show');
        if (ellipsisMenu) ellipsisMenu.classList.remove('show');
      });
    }

    // 三点リーダーボタンのクリック処理
    if (ellipsisBtn && ellipsisMenu) {
      ellipsisBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        ellipsisMenu.classList.toggle('show');
        if (tocMenu) tocMenu.classList.remove('show');
      });
    }

// ▼ スライドスイッチの動作設定
    const deviceSwitchCheckbox = menuArea.querySelector('#deviceSwitchCheckbox');
    if (deviceSwitchCheckbox) {
      // 現在のビューポートの状態に応じてスイッチの初期状態を反映（例: 1200px以上ならON）
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (viewportMeta && viewportMeta.content.includes('width=1200')) {
        deviceSwitchCheckbox.checked = true;
      }

      deviceSwitchCheckbox.addEventListener('change', (e) => {
        let vMeta = document.querySelector('meta[name="viewport"]');
        if (!vMeta) {
          vMeta = document.createElement('meta');
          vMeta.name = 'viewport';
          document.head.appendChild(vMeta);
        }

        if (e.target.checked) {
          // スイッチON：PC版表示（ビューポート固定）
          vMeta.content = 'width=1200';
        } else {
          // スイッチOFF：スマホ版表示（レスポンシブ）
          vMeta.content = 'width=device-width, initial-scale=1.0';
        }
        
        // スイッチ操作時にメニューが閉じないようにする場合は下の行をコメントアウトしてください
        // ellipsisMenu.classList.remove('show');
      });
    }

    // メニュー外部をクリックしたときにメニューを閉じる処理
    document.addEventListener('click', (e) => {
      if (tocMenu && !tocMenu.contains(e.target)) {
        tocMenu.classList.remove('show');
      }
      if (ellipsisMenu && !ellipsisMenu.contains(e.target)) {
        ellipsisMenu.classList.remove('show');
      }
    });
  }

// ▼ 現在の年を取得してリストに含まれるか判定する処理
  const years = [2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050]; // 2025年から2050年まで対応
  const currentYear = new Date().getFullYear(); // 現在の西暦年を取得（例: 2026年）

  // リストに現在の年が含まれている場合は現在年を使用、なければリストの一番新しい年を使用
  const newestYear = years.includes(currentYear) ? currentYear : Math.max(...years);
  const oldestYear = Math.min(...years);

  const siteName = "MU Soft / HomeMade Tools Project"; // 必要に応じてサイト名に変更してください

  const yearDisplay = (oldestYear === newestYear) ? oldestYear : `${oldestYear}-${newestYear}`;
  const copyrightText = `&copy; ${yearDisplay} ${siteName} by Sakurai All Rights Reserved.`;

  const copyrightElement = document.getElementById('copyright');
  if (copyrightElement) {
    copyrightElement.innerHTML = copyrightText;
  }

  // ▼ TOPに戻るボタンの動的追加
  if (!document.querySelector('.back-to-top')) {
    const isTopPage = document.getElementById('top-page') !== null;
    const topImgSrc = isTopPage ? 'top.png' : '../top.png';

    const backToTopBtn = document.createElement('a');
    backToTopBtn.href = '#top';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.onclick = (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    backToTopBtn.innerHTML = `<img src="${topImgSrc}" alt="TOPに戻る">`;
    document.body.appendChild(backToTopBtn);

// ▼ 追加: スクロールに合わせてTOPに戻るボタンの表示・非表示を切り替える処理 ▼
    window.addEventListener('scroll', () => {
      // 画面を200px以上下にスクロールしたら表示、それ以外は非表示
      if (window.scrollY > 200) {
        backToTopBtn.classList.add('show-btn');
      } else {
        backToTopBtn.classList.remove('show-btn');
      }
    });
  }
});