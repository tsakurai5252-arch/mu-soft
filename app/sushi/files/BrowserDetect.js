function detectBrowserInfo() {
  var ua = navigator.userAgent.toLowerCase();
  var name = "unknown";
  var version = "0";

  if (ua.indexOf("msie") != -1 && ua.indexOf("trident") == -1) {
    name = "Internet Explorer";
    var match = ua.match(/msie (\d+\.\d+)/);
    if (match && match.length > 1) {
      version = match[1];
    }
  } else if (ua.indexOf("trident") != -1) {
    name = "Internet Explorer";
    var match = ua.match(/rv:(\d+\.\d+)/);
    if (match && match.length > 1) {
      version = match[1];
    }
  } else if (ua.indexOf("edge") != -1) {
    name = "Microsoft Edge";
    var match = ua.match(/edge\/(\d+\.\d+)/);
    if (match) version = match[1];
  } else if (ua.indexOf("chrome") != -1 && ua.indexOf("edge") == -1 && ua.indexOf("opr") == -1) {
    name = "Google Chrome";
    var match = ua.match(/chrome\/(\d+)/);
    if (match) version = match[1];
  } else if (ua.indexOf("safari") != -1 && ua.indexOf("chrome") == -1) {
    name = "Safari";
    var match = ua.match(/version\/(\d+\.\d+)/);
    if (match) version = match[1];
  } else if (ua.indexOf("firefox") != -1) {
    name = "Mozilla Firefox";
    var match = ua.match(/firefox\/(\d+)/);
    if (match) version = match[1];
  } else if (ua.indexOf("opera") != -1 || ua.indexOf("opr") != -1) {
    name = "Opera";
    var match = ua.match(/(opera|opr)\/(\d+)/);
    if (match) version = match[2];
  }

  return { name: name, version: parseFloat(version) };
}

function isBrowserSupported() {
  var browser = detectBrowserInfo();
  var name = browser.name;
  var version = browser.version;

  if (name === "Internet Explorer" && version < 12) return false;
  if (name === "Google Chrome" && version < 51) return false;
  if (name === "Mozilla Firefox" && version < 52) return false;

  return true; // その他のブラウザ or 条件を満たす場合はOK
}

function showBrowserStatus() {
  var info = detectBrowserInfo();
  document.write("使用ブラウザ: " + info.name + " " + info.version + "<br>");

  if (!isBrowserSupported()) {
    document.write("<div style='color:red;font-style:italic;'>非対応ブラウザを使っているようです。(対応ブラウザ以外だと動作しないことが多いです)</div>");
  }
}