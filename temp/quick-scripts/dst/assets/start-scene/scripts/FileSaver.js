
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/FileSaver.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}(function (global){
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9hc3NldHNcXHN0YXJ0LXNjZW5lXFxzY3JpcHRzXFxGaWxlU2F2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQU0sV0FBVyxHQUNiLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLE1BQU07SUFDckQsQ0FBQyxDQUFDLE1BQU07SUFDUixDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUssV0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSTtRQUNuRCxDQUFDLENBQUMsSUFBSTtRQUNOLENBQUMsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxNQUFNO1lBQzNELENBQUMsQ0FBQyxNQUFNO1lBQ1IsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUdiLFNBQVMsVUFBVSxDQUFDLEdBQVc7SUFDM0IsSUFBTSxHQUFHLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztJQUNqQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0IsSUFBSTtRQUNBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNkO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLHVCQUF1QixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlDLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0lBQ0QsT0FBTyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQztBQUNsRCxDQUFDO0FBR0QsU0FBUyxZQUFZLENBQUMsT0FBb0I7SUFDdEMsSUFBSTtRQUNBLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUNsRDtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ1osSUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RCxVQUFVLENBQUMsY0FBYyxDQUNyQixPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUM5QixDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQ1osS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQ3RDLENBQUM7UUFDRixPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3JDO0FBQ0wsQ0FBQztBQUdELFNBQVMsbUJBQW1CLENBQUMsR0FBVyxFQUFFLFFBQWdCLEVBQUUsUUFBcUI7SUFDN0UsSUFBTSxHQUFHLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztJQUNqQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNyQixHQUFHLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztJQUMxQixHQUFHLENBQUMsTUFBTSxHQUFHLGNBQU0sT0FBQSxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBcEQsQ0FBb0QsQ0FBQztJQUN4RSxHQUFHLENBQUMsT0FBTyxHQUFHLGNBQU0sT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDLEVBQXhDLENBQXdDLENBQUM7SUFDN0QsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2YsQ0FBQztBQUdELFNBQWdCLGtCQUFrQixDQUFDLElBQW1CLEVBQUUsUUFBZ0IsRUFBRSxRQUFxQjtJQUMzRixJQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUM7SUFDNUQsSUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVqRCxRQUFRLEdBQUcsUUFBUSxJQUFJLFVBQVUsQ0FBQztJQUNsQyxZQUFZLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUNqQyxZQUFZLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQztJQUU5QixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUMxQixZQUFZLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUN6QyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztnQkFDekIsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO2dCQUMvQyxDQUFDLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO2FBQU07WUFDSCxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDOUI7S0FDSjtTQUFNO1FBQ0gsWUFBWSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JELFVBQVUsQ0FBQyxjQUFNLE9BQUEsVUFBVSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQTdDLENBQTZDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNO1FBQzlFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsWUFBWSxDQUFDLFlBQVksQ0FBQyxFQUExQixDQUEwQixFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ25EO0FBQ0wsQ0FBQztBQXRCRCxnREFzQkM7QUFFRCxXQUFXLENBQUMsTUFBTSxHQUFHLGtCQUFrQixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6W251bGxdfQ==