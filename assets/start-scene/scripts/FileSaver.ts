
const globalScope: any = 
    typeof window !== "undefined" && window.window === window
        ? window
        : typeof self !== "undefined" && self.self === self
        ? self
        : typeof global !== "undefined" && global.global === global
        ? global
        : {};


function isUrlValid(url: string): boolean {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, false);
    try {
        xhr.send();
    } catch (error) {
        console.error("Lỗi khi kiểm tra URL:", error);
        return false;
    }
    return xhr.status >= 200 && xhr.status <= 299;
}


function triggerClick(element: HTMLElement) {
    try {
        element.dispatchEvent(new MouseEvent("click"));
    } catch (error) {
        const mouseEvent = document.createEvent("MouseEvents");
        mouseEvent.initMouseEvent(
            "click", true, true, window, 0,
            0, 0, 80, 20,
            false, false, false, false, 0, null
        );
        element.dispatchEvent(mouseEvent);
    }
}


function downloadFileFromUrl(url: string, fileName: string, callback?: () => void) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = () => handleBlobResponse(xhr.response, fileName, callback);
    xhr.onerror = () => console.error("Không thể tải xuống tệp");
    xhr.send();
}


export function handleBlobResponse(blob: Blob | string, fileName: string, callback?: () => void) {
    const urlCreator = globalScope.URL || globalScope.webkitURL;
    const downloadLink = document.createElement("a");

    fileName = fileName || "download";
    downloadLink.download = fileName;
    downloadLink.rel = "noopener";

    if (typeof blob === "string") {
        downloadLink.href = blob;
        if (downloadLink.origin !== location.origin) {
            isUrlValid(downloadLink.href) 
                ? downloadFileFromUrl(blob, fileName, callback) 
                : triggerClick(downloadLink);
        } else {
            triggerClick(downloadLink);
        }
    } else {
        downloadLink.href = urlCreator.createObjectURL(blob);
        setTimeout(() => urlCreator.revokeObjectURL(downloadLink.href), 40000); // 40s
        setTimeout(() => triggerClick(downloadLink), 0);
    }
}

globalScope.saveAs = handleBlobResponse;
