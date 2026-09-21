// OSsupport.js - OS判定＆環境チェック（IE4～現代対応）

function detectOS() {
  var ua = navigator.userAgent.toLowerCase();
  var os = "unknown";

  if (ua.indexOf("windows nt 10.0") != -1) {
    var match = ua.match(/windows nt 10\.0\.(\d+)/); // Windowsビルド番号
    if (match && match[1]) {
      var build = parseInt(match[1], 10);
      os = (build >= 22000) ? "Windows 11" : "Windows 10";
    } else {
      os = "Windows 10(推定)";
    }
  } else if (ua.indexOf("windows nt 6.3") != -1) {
    os = "Windows 8.1";
  } else if (ua.indexOf("windows nt 6.2") != -1) {
    os = "Windows 8";
  } else if (ua.indexOf("windows nt 6.1") != -1) {
    os = "Windows 7";
  } else if (ua.indexOf("windows nt 5.1") != -1 || ua.indexOf("windows xp") != -1) {
    os = "Windows XP";
  } else if (ua.indexOf("windows nt 5.0") != -1) {
    os = "Windows 2000";
  } else if (ua.indexOf("mac os") != -1 || ua.indexOf("macintosh") != -1) {
    os = "macOS";
  } else if (ua.indexOf("linux") != -1) {
    os = "Linux";
  } else if (ua.indexOf("android") != -1) {
    os = "Android";
  } else if (ua.indexOf("iphone") != -1 || ua.indexOf("ipad") != -1) {
    os = "iOS";
  } else if (ua.indexOf("cros") != -1) {
    os = "Chrome OS";
  }

  return os;
}

//OS判定(trueかfalse)

function isSupportedOS(os) {
  var supported = {
    "Windows 11": true,
    "Windows 10": true,
    "Windows 10(推定)": true,
    "Windows 8.1": true,
    "Windows 8": true,
    "Windows 7": true,
    "Windows XP": true,
    "Windows 2000": false,
    "macOS": true,
    "Linux": true,
    "Android": false,
    "iOS": false,
    "Chrome OS": true
  };
  return supported[os] === true;
}

function hasKeyboard() {
  var ua = navigator.userAgent.toLowerCase();
  var touchKeywords = ["android", "iphone", "ipad", "mobile", "tablet"];

  for (var i = 0; i < touchKeywords.length; i++) {
    if (ua.indexOf(touchKeywords[i]) != -1) {
      return false;
    }
  }

  if (typeof navigator.maxTouchPoints != "undefined" && navigator.maxTouchPoints > 0) {
    return false;
  }

  return true;
}

function showDetectedOS() {
  var os = detectOS();
  document.write("使用OS: " + os + "<br>");

  var supported = isSupportedOS(os);
  var keyboard = hasKeyboard();

  if (!supported) {
    document.write("<div style='color:red;font-style:italic;'>非対応の環境をお使いのようです(非対応環境では機能しないことが多いです)。</div>");
    return;
  }

  if (!keyboard) {
    document.write("<div style='color:red;font-style:italic;'>キーボードが検出できません。</div>");
    return;
  }

  // 対応OS向け演出
  if (os === "Windows 11") {
    document.write("<div style='color:#0a0;font-style:italic;'>Windows11ですね。</div>");
  } else if (os === "Windows 10") {
    document.write("<div style='color:#666;font-style:italic;'>Windows10ですね。サポート終了日は2025年10月14日です。</div>");
  } else if (os === "Chrome OS") {
    document.write("<div style='color:#0af;font-style:italic;'>Chrome OSですね。Windowsとはまた違った魅力があっていいですよね。</div>");
  }
}