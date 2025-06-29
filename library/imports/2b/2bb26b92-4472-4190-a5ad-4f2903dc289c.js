"use strict";
cc._RF.push(module, '2bb26uSRHJBkKWtTykD3Cic', 'SDKManager');
// start-scene/scripts/SDKManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LGGlobalLoginCallback = exports.SDKManager = void 0;
// @
var LGGlobalLoginCallback;
(function (LGGlobalLoginCallback) {
    LGGlobalLoginCallback[LGGlobalLoginCallback["Login"] = 1] = "Login";
    LGGlobalLoginCallback[LGGlobalLoginCallback["AccountBind"] = 2] = "AccountBind";
    LGGlobalLoginCallback[LGGlobalLoginCallback["SwitchAccount"] = 3] = "SwitchAccount";
})(LGGlobalLoginCallback || (LGGlobalLoginCallback = {}));
exports.LGGlobalLoginCallback = LGGlobalLoginCallback;
// @
var SDKManager = /** @class */ (function () {
    function SDKManager() {
        this._isInitSuccess = false;
    }
    Object.defineProperty(SDKManager, "instance", {
        get: function () {
            if (this._instance === null) {
                this._instance = new SDKManager();
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    // @
    SDKManager.prototype.getChannelName = function () {
        return window.jsb
            ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getChannelName", "()Ljava/lang/String;")
            : "";
    };
    // @
    SDKManager.prototype.getHostAppName = function () {
        return window.jsb
            ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getHostAppName", "()Ljava/lang/String;")
            : "";
    };
    // @
    SDKManager.prototype.onInitCompleteCallback = function () {
        console.log("SDKManager:onInitCompleteCallback");
        this._isInitSuccess = true;
    };
    // @
    SDKManager.prototype.getDeviceID = function () {
        return window.jsb
            ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getDeviceID", "()Ljava/lang/String;")
            : "";
    };
    // @
    SDKManager.prototype.loadRewardVideoAd = function (callback) {
        console.log("SDKManager:showRewardVideoAd");
        this._rewardVideoAdLoadCallback = callback;
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "loadRewardVideoAd", "()V");
        }
    };
    // @
    SDKManager.prototype.onLoadRewardVideoAdCallback = function () {
        console.log("SDKManager:onLoadRewardVideoAdCallback");
        if (this._rewardVideoAdLoadCallback) {
            this._rewardVideoAdLoadCallback();
            console.log("SDKManager:_rewardVideoAdLoadCallback");
        }
    };
    // @
    SDKManager.prototype.isRewardVideoAdLoaded = function () {
        console.log("SDKManager:isRewardVideoAdLoaded");
        return window.jsb
            ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "isRewardVideoAdLoaded", "()Z")
            : false;
    };
    // @
    SDKManager.prototype.showRewardVideoAd = function (rewardCallback, data) {
        console.log("SDKManager:showRewardVideoAd");
        this._rewardVideoAdRewardCallback = rewardCallback;
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showRewardVideoAd", "(Ljava/lang/String;)V", JSON.stringify(data));
        }
    };
    // @
    SDKManager.prototype.onRewardVideoAdRewardCallback = function () {
        console.log("SDKManager:onRewardVideoAdRewardCallback");
        if (this._rewardVideoAdRewardCallback) {
            this._rewardVideoAdRewardCallback();
            console.log("SDKManager:_rewardVideoAdRewardCallback");
        }
    };
    // @
    SDKManager.prototype.reportEvent = function (eventName, data) {
        console.log("SDKManager:reportEvent");
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "reportEvent", "(Ljava/lang/String;Ljava/lang/String;)V", eventName, JSON.stringify(data));
        }
    };
    // @
    SDKManager.prototype.showInterstitialAd = function (callback) {
        console.log("SDKManager:showInterstitialAd");
        this._interstitialAdCloseCallback = callback;
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showInterstitialAd", "()V");
        }
    };
    // @
    SDKManager.prototype.isInterstitialAdLoaded = function () {
        console.log("SDKManager:isInterstitialAdLoaded");
        return window.jsb
            ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "isInterstitialAdLoaded", "()Z")
            : false;
    };
    // @
    SDKManager.prototype.onInterstitialAdCloseCallback = function () {
        console.log("SDKManager:onInterstitialAdCloseCallback");
        if (this._interstitialAdCloseCallback) {
            this._interstitialAdCloseCallback();
            console.log("SDKManager:_interstitialAdCloseCallback");
        }
    };
    // @
    SDKManager.prototype.showBannerAd = function () {
        console.log("SDKManager:showBannerAd");
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showBannerAd", "()V");
        }
    };
    // @
    SDKManager.prototype.hideBannerAd = function () {
        console.log("SDKManager:hideBannerAd");
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "hideBannerAd", "()V");
        }
    };
    // @
    SDKManager.prototype.getLanguage = function () {
        console.log("SDKManager:getLanguage");
        return window.jsb
            ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getLanguage", "()Ljava/lang/String;")
            : "zh-CN";
    };
    // @
    SDKManager.prototype.getAppName = function () {
        console.log("SDKManager:getAppName");
        return window.jsb
            ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getAppName", "()Ljava/lang/String;")
            : "unknown";
    };
    // @
    SDKManager.prototype.getVersionName = function () {
        console.log("SDKManager:getVersionName");
        return window.jsb
            ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getVersionName", "()Ljava/lang/String;")
            : "unknown";
    };
    // @
    SDKManager.prototype.getVersionCode = function () {
        console.log("SDKManager:getVersionCode");
        return window.jsb
            ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getVersionCode", "()I")
            : 1;
    };
    // @
    SDKManager.prototype.copyToClipboard = function (text) {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "copyToClipboard", "(Ljava/lang/String;)V", text);
        }
    };
    // @
    SDKManager.prototype.getNetworkStateName = function () {
        console.log("SDKManager:getNetworkStateName");
        return window.jsb
            ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getNetworkStateName", "()Ljava/lang/String;")
            : "unknown";
    };
    // @
    SDKManager.prototype.login = function (successCallback, data) {
        console.log("SDKManager:login");
        this._loginSuccessCallback = successCallback;
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "login", "(Ljava/lang/String;)V", JSON.stringify(data));
        }
    };
    // @
    SDKManager.prototype.switchAccount = function (successCallback, data) {
        console.log("SDKManager:switchAccount");
        this._loginSuccessCallback = successCallback;
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "switchAccount", "(Ljava/lang/String;)V", JSON.stringify(data));
        }
    };
    // @
    SDKManager.prototype.visitorBindAccount = function (successCallback, data) {
        console.log("SDKManager:visitorBindAccount");
        this._loginSuccessCallback = successCallback;
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "visitorBindAccount", "(Ljava/lang/String;)V", JSON.stringify(data));
        }
    };
    // @
    SDKManager.prototype.isVisitor = function () {
        console.log("SDKManager:isVisitor");
        return window.jsb
            ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "isVisitor", "()Z")
            : false;
    };
    // @
    SDKManager.prototype.onLoginSuccessCallback = function (jsonStr) {
        console.log("SDKManager:onLoginSuccessCallback jsonStr:" + jsonStr);
        try {
            var data = JSON.parse(jsonStr);
            if (data.apiLoginType === LGGlobalLoginCallback.Login ||
                data.apiLoginType === LGGlobalLoginCallback.AccountBind ||
                data.apiLoginType === LGGlobalLoginCallback.SwitchAccount) {
                this._loginSuccessCallback && this._loginSuccessCallback(data);
            }
        }
        catch (error) {
            console.error("解析onLoginSuccessCallback回调数据失败");
            console.error(error);
        }
    };
    // @
    SDKManager.prototype.onLoginFailCallback = function (jsonStr) {
        console.log("SDKManager:onLoginFailCallback jsonStr:" + jsonStr);
        try {
            var data = JSON.parse(jsonStr);
            if (data.apiLoginType === LGGlobalLoginCallback.Login ||
                data.apiLoginType === LGGlobalLoginCallback.AccountBind) {
                // Handle login failure
            }
        }
        catch (error) {
            console.error("解析onLoginFailCallback回调数据失败");
            console.error(error);
        }
    };
    SDKManager._instance = null;
    return SDKManager;
}());
exports.SDKManager = SDKManager;
window.SDKManager = SDKManager.instance;

cc._RF.pop();