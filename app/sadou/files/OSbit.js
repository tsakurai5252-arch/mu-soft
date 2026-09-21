const OSsupport = (() => {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const is16bit = userAgent.indexOf("Win16") !== -1;
    const is32bit = !is16bit && (
        userAgent.indexOf("Win32") !== -1 ||
        userAgent.indexOf("x86") !== -1 ||
        (platform === "Win32")
    );
    const is64bit = userAgent.indexOf("WOW64") !== -1 ||
                    userAgent.indexOf("Win64") !== -1 ||
                    userAgent.indexOf("x64") !== -1 ||
                    userAgent.indexOf("x86_64") !== -1 ||
                    (platform === "Win64");

    const getOSBitness = () => {
        if (is64bit) return '64bit';
        if (is32bit) return '32bit';
        if (is16bit) return '16bit';
        return 'unknown';
    };

    return {
        is16bit,
        is32bit,
        is64bit,
        bitness: getOSBitness()
    };
})();

// 例: 使用方法
// console.log(`win16: ${OSsupport.is16bit}`);
// console.log(`win32: ${OSsupport.is32bit}`);
// console.log(`win64: ${OSsupport.is64bit}`);
// console.log(`OS bitness: ${OSsupport.bitness}`);

document.addEventListener('DOMContentLoaded', () => {
    const displayElement = document.getElementById('os-bitness-display');
    if (displayElement) {
        if (OSsupport.is16bit) {
            displayElement.textContent = `警告: 16bitOSはサポート対象外です。`;
            displayElement.style.color = 'red';
        } else {
            displayElement.textContent = `OS bitness: ${OSsupport.bitness}`;
        }
    }
});