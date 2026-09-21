/**
 * リダイレクト一元管理システム (redirect-system.js MU-SOFT版)
 */

// 1. 日付検索用のファイルリスト (パス付きにも対応)
const ALL_FILES = [
    ""
];

// 2. 許可された外部URLプレフィックス (オープンリダイレクト対策)
const ALLOWED_EXTERNAL_URLS = [
    "https://tsakurai5252-arch.github.io/my-page/",
    "https://tsakurai5252-arch.github.io/mu-card/",
    "https://tsakurai5252-arch.github.io/mu-soft/",
    "https://sites.google.com/view/ts-site-senkyo/",
    "https://sites.google.com/view/hima-jin/"
];

// 3. 固定ショートカットの定義
const SHORTCUTS = {
    "top-page": "https://tsakurai5252-arch.github.io/mu-soft/",
    "top": "https://tsakurai5252-arch.github.io/my-page/",
    "update": "https://tsakurai5252-arch.github.io/mu-soft/html/update.html",
    "req": "https://tsakurai5252-arch.github.io/mu-soft/html/req.html",
    "senkyo": "https://sites.google.com/view/ts-site-senkyo/",
    "himajin": "https://sites.google.com/view/hima-jin/",
    "manual": "https://tsakurai5252-arch.github.io/mu-soft/manual/",
    "download": "./download/index.html"
};

// 4. 日付指定によるリダイレクト切り替えルール
// target: クエリパラメータ (例: "tokusetu", "top-page", 外部URLなど)
// startDate: この日時以降に適用 (未指定なら制限なし)
// endDate: この日時より前に適用 (未指定なら制限なし)
// redirectUrl: 切り替え先URL
const DATE_RULES = [
    {
        target: "keihin",
        startDate: "2027-03-25T00:00:00", // 2027年3月25日以降はこちらへ
        redirectUrl: "./keihin_list/keihin2027.html"
    },
    {
        target: "keihin",
        endDate: "2027-03-24T23:59:59",   // 2027年3月24日以前はこちらへ
        redirectUrl: "./keihin_list/keihin.html"
    }
];

/**
 * リダイレクトメイン処理
 */
function initRedirectSystem() {
    const query = window.location.search.substring(1);

    if (!query) {
        document.body.innerHTML = "<p>パラメータが指定されていません。</p>";
        return;
    }

    // --------------------------------------------------
    // A-0. 日付指定ルールの判定 (最優先でチェック)
    // --------------------------------------------------
    const now = new Date();
    const keywordForDate = query.startsWith("sort-") ? query.replace("sort-", "") : query;

    for (const rule of DATE_RULES) {
        if (rule.target === query || rule.target === keywordForDate) {
            const start = rule.startDate ? new Date(rule.startDate) : null;
            const end = rule.endDate ? new Date(rule.endDate) : null;

            const isAfterStart = !start || now >= start;
            const isBeforeEnd = !end || now <= end;

            if (isAfterStart && isBeforeEnd) {
                window.location.href = encodeURI(rule.redirectUrl);
                return;
            }
        }
    }

    // --------------------------------------------------
    // A. 外部URL（http...）が直接指定された場合
    // --------------------------------------------------
    if (query.startsWith("http://") || query.startsWith("https://")) {
        const isAllowed = ALLOWED_EXTERNAL_URLS.some(allowedUrl => query.startsWith(allowedUrl));

        if (isAllowed) {
            const userConfirmed = confirm("リダイレクト先は " + query + " です。\n移動しますか？");
            if (userConfirmed) {
                window.location.href = encodeURI(query);
            } else {
                document.body.innerHTML = "<p>キャンセルしました。<a href='index.html'>トップへ戻る</a></p>";
            }
        } else {
            document.body.innerHTML = "<p>許可されていないURLへのリダイレクトが実行されました。</p>";
        }
        return;
    }

    // --------------------------------------------------
    // B. 固定ショートカットの判定
    // --------------------------------------------------
    if (SHORTCUTS[query]) {
        window.location.href = SHORTCUTS[query];
        return;
    }

    // --------------------------------------------------
    // C. キーワード検索・ファイルへのリダイレクト判定
    //    (?sort-xxx / ?xxx / ?xxx-old の形式に対応)
    // --------------------------------------------------
    let rawKeyword = query.startsWith("sort-") ? query.replace("sort-", "") : query;
    
    // "-old" がついている場合は旧バージョン指定と判定
    const isOldVersion = rawKeyword.endsWith("-old");
    if (isOldVersion) {
        rawKeyword = rawKeyword.replace(/-old$/, "");
    }

    const safeKeyword = rawKeyword.replace(/[^a-zA-Z0-9_-]/g, "");

    if (safeKeyword) {
        // パスからファイル名のみを取り出す補助関数
        const getFilename = (filePath) => filePath.split('/').pop();

        // キーワードに一致するファイルを抽出
        const matchedFiles = ALL_FILES.filter(filePath => {
            const fileName = getFilename(filePath);
            return fileName.startsWith(safeKeyword);
        });

        if (matchedFiles.length > 0) {
            if (isOldVersion) {
                // 旧バージョン指定 (-old) の場合：ファイル名部分で昇順ソート（一番古いファイルを特定）
                matchedFiles.sort((a, b) => {
                    const fileNameA = getFilename(a);
                    const fileNameB = getFilename(b);
                    return fileNameA.localeCompare(fileNameB);
                });
            } else {
                // 通常指定の場合：ファイル名部分で降順ソート（一番新しいファイルを特定）
                matchedFiles.sort((a, b) => {
                    const fileNameA = getFilename(a);
                    const fileNameB = getFilename(b);
                    return fileNameB.localeCompare(fileNameA);
                });
            }

            const targetFile = matchedFiles[0];
            window.location.href = encodeURI(targetFile);
            return;
        }
    }

    // --------------------------------------------------
    // D. 該当ページが存在しない場合のフォールバック
    // --------------------------------------------------
    document.body.innerHTML = "<p>該当するページが見つかりませんでした。3秒後にトップページに戻ります。</p>";
    setTimeout(() => {
        window.location.href = "index.html";
    }, 3000);
}