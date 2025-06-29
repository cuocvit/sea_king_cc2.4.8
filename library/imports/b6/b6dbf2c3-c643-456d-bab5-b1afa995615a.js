"use strict";
cc._RF.push(module, 'b6dbfLDxkNFbbq1sa+plWFa', 'FileSaver');
// start-scene/scripts/FileSaver.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleBlobResponse = void 0;
var globalScope = typeof window !== "undefined" && window.window === window
    ? window
    : typeof self !== "undefined" && self.self === self
        ? self
        : typeof global !== "undefined" && global.global === global
            ? global
            : {};
function isUrlValid(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, false);
    try {
        xhr.send();
    }
    catch (error) {
        console.error("Lỗi khi kiểm tra URL:", error);
        return false;
    }
    return xhr.status >= 200 && xhr.status <= 299;
}
function triggerClick(element) {
    try {
        element.dispatchEvent(new MouseEvent("click"));
    }
    catch (error) {
        var mouseEvent = document.createEvent("MouseEvents");
        mouseEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
        element.dispatchEvent(mouseEvent);
    }
}
function downloadFileFromUrl(url, fileName, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function () { return handleBlobResponse(xhr.response, fileName, callback); };
    xhr.onerror = function () { return console.error("Không thể tải xuống tệp"); };
    xhr.send();
}
function handleBlobResponse(blob, fileName, callback) {
    var urlCreator = globalScope.URL || globalScope.webkitURL;
    var downloadLink = document.createElement("a");
    fileName = fileName || "download";
    downloadLink.download = fileName;
    downloadLink.rel = "noopener";
    if (typeof blob === "string") {
        downloadLink.href = blob;
        if (downloadLink.origin !== location.origin) {
            isUrlValid(downloadLink.href)
                ? downloadFileFromUrl(blob, fileName, callback)
                : triggerClick(downloadLink);
        }
        else {
            triggerClick(downloadLink);
        }
    }
    else {
        downloadLink.href = urlCreator.createObjectURL(blob);
        setTimeout(function () { return urlCreator.revokeObjectURL(downloadLink.href); }, 40000); // 40s
        setTimeout(function () { return triggerClick(downloadLink); }, 0);
    }
}
exports.handleBlobResponse = handleBlobResponse;
globalScope.saveAs = handleBlobResponse;

cc._RF.pop();