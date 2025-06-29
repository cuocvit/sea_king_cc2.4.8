
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/SDKManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFNES01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSTtBQUNKLElBQUsscUJBSUo7QUFKRCxXQUFLLHFCQUFxQjtJQUN0QixtRUFBUyxDQUFBO0lBQ1QsK0VBQWUsQ0FBQTtJQUNmLG1GQUFpQixDQUFBO0FBQ3JCLENBQUMsRUFKSSxxQkFBcUIsS0FBckIscUJBQXFCLFFBSXpCO0FBcVFvQixzREFBcUI7QUFuUTFDLElBQUk7QUFDSjtJQVNJO1FBUFEsbUJBQWMsR0FBWSxLQUFLLENBQUM7SUFPakIsQ0FBQztJQUV4QixzQkFBa0Isc0JBQVE7YUFBMUI7WUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFO2dCQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7YUFDckM7WUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFFRCxJQUFJO0lBQ0csbUNBQWMsR0FBckI7UUFDSSxPQUFPLE1BQU0sQ0FBQyxHQUFHO1lBQ2IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMscUNBQXFDLEVBQUUsZ0JBQWdCLEVBQUUsc0JBQXNCLENBQUM7WUFDbEgsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFFRCxJQUFJO0lBQ0csbUNBQWMsR0FBckI7UUFDSSxPQUFPLE1BQU0sQ0FBQyxHQUFHO1lBQ2IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMscUNBQXFDLEVBQUUsZ0JBQWdCLEVBQUUsc0JBQXNCLENBQUM7WUFDbEgsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFFRCxJQUFJO0lBQ0csMkNBQXNCLEdBQTdCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FB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O1lBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1lBQ2hELE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsSUFBSTtJQUNHLHdDQUFtQixHQUExQixVQUEyQixPQUFlO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLEdBQUcsT0FBTyxDQUFDLENBQUM7UUFDakUsSUFBSTtZQUNBLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakMsSUFDSSxJQUFJLENBQUMsWUFBWSxLQUFLLHFCQUFxQixDQUFDLEtBQUs7Z0JBQ2pELElBQUksQ0FBQyxZQUFZLEtBQUsscUJBQXFCLENBQUMsV0FBVyxFQUN6RDtnQkFDRSx1QkFBdUI7YUFDMUI7U0FDSjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQzdDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBN1BjLG9CQUFTLEdBQXNCLElBQUksQ0FBQztJQThQdkQsaUJBQUM7Q0EvUEQsQUErUEMsSUFBQTtBQUdRLGdDQUFVO0FBQ2xCLE1BQWMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBvc2l0aW9uIH0gZnJvbSBcIi4vQ2hhbm5lbE1hbmFnZXJcIjtcclxuLy8gQFxyXG5lbnVtIExHR2xvYmFsTG9naW5DYWxsYmFjayB7XHJcbiAgICBMb2dpbiA9IDEsXHJcbiAgICBBY2NvdW50QmluZCA9IDIsXHJcbiAgICBTd2l0Y2hBY2NvdW50ID0gM1xyXG59XHJcblxyXG4vLyBAXHJcbmNsYXNzIFNES01hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBTREtNYW5hZ2VyIHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9pc0luaXRTdWNjZXNzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvLyBwcml2YXRlIF9sYXN0Q2FsbFNob3dSZXdhcmRWaWRlb0FkVGltZXN0YW1wOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfcmV3YXJkVmlkZW9BZExvYWRDYWxsYmFjaz86ICgpID0+IHZvaWQ7XHJcbiAgICBwcml2YXRlIF9yZXdhcmRWaWRlb0FkUmV3YXJkQ2FsbGJhY2s/OiAoKSA9PiB2b2lkO1xyXG4gICAgcHJpdmF0ZSBfaW50ZXJzdGl0aWFsQWRDbG9zZUNhbGxiYWNrPzogKCkgPT4gdm9pZDtcclxuICAgIHByaXZhdGUgX2xvZ2luU3VjY2Vzc0NhbGxiYWNrPzogKGRhdGE6IGFueSkgPT4gdm9pZDtcclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBpbnN0YW5jZSgpOiBTREtNYW5hZ2VyIHtcclxuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgU0RLTWFuYWdlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldENoYW5uZWxOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5qc2IgXHJcbiAgICAgICAgICAgID8ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcEFjdGl2aXR5XCIsIFwiZ2V0Q2hhbm5lbE5hbWVcIiwgXCIoKUxqYXZhL2xhbmcvU3RyaW5nO1wiKSBcclxuICAgICAgICAgICAgOiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXRIb3N0QXBwTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB3aW5kb3cuanNiIFxyXG4gICAgICAgICAgICA/IGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcHBBY3Rpdml0eVwiLCBcImdldEhvc3RBcHBOYW1lXCIsIFwiKClMamF2YS9sYW5nL1N0cmluZztcIikgXHJcbiAgICAgICAgICAgIDogXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgb25Jbml0Q29tcGxldGVDYWxsYmFjaygpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNES01hbmFnZXI6b25Jbml0Q29tcGxldGVDYWxsYmFja1wiKTtcclxuICAgICAgICB0aGlzLl9pc0luaXRTdWNjZXNzID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0RGV2aWNlSUQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gd2luZG93LmpzYiBcclxuICAgICAgICAgICAgPyBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwQWN0aXZpdHlcIiwgXCJnZXREZXZpY2VJRFwiLCBcIigpTGphdmEvbGFuZy9TdHJpbmc7XCIpIFxyXG4gICAgICAgICAgICA6IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGxvYWRSZXdhcmRWaWRlb0FkKGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTREtNYW5hZ2VyOnNob3dSZXdhcmRWaWRlb0FkXCIpO1xyXG4gICAgICAgIHRoaXMuX3Jld2FyZFZpZGVvQWRMb2FkQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICBpZiAod2luZG93LmpzYikge1xyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwQWN0aXZpdHlcIiwgXCJsb2FkUmV3YXJkVmlkZW9BZFwiLCBcIigpVlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIG9uTG9hZFJld2FyZFZpZGVvQWRDYWxsYmFjaygpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNES01hbmFnZXI6b25Mb2FkUmV3YXJkVmlkZW9BZENhbGxiYWNrXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLl9yZXdhcmRWaWRlb0FkTG9hZENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jld2FyZFZpZGVvQWRMb2FkQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTREtNYW5hZ2VyOl9yZXdhcmRWaWRlb0FkTG9hZENhbGxiYWNrXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgaXNSZXdhcmRWaWRlb0FkTG9hZGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU0RLTWFuYWdlcjppc1Jld2FyZFZpZGVvQWRMb2FkZWRcIik7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5qc2IgXHJcbiAgICAgICAgICAgID8ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcEFjdGl2aXR5XCIsIFwiaXNSZXdhcmRWaWRlb0FkTG9hZGVkXCIsIFwiKClaXCIpIFxyXG4gICAgICAgICAgICA6IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBzaG93UmV3YXJkVmlkZW9BZChyZXdhcmRDYWxsYmFjazogKCkgPT4gdm9pZCwgZGF0YTogcG9zaXRpb24pOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNES01hbmFnZXI6c2hvd1Jld2FyZFZpZGVvQWRcIik7XHJcbiAgICAgICAgdGhpcy5fcmV3YXJkVmlkZW9BZFJld2FyZENhbGxiYWNrID0gcmV3YXJkQ2FsbGJhY2s7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5qc2IpIHtcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcEFjdGl2aXR5XCIsIFwic2hvd1Jld2FyZFZpZGVvQWRcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIiwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgb25SZXdhcmRWaWRlb0FkUmV3YXJkQ2FsbGJhY2soKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTREtNYW5hZ2VyOm9uUmV3YXJkVmlkZW9BZFJld2FyZENhbGxiYWNrXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLl9yZXdhcmRWaWRlb0FkUmV3YXJkQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5fcmV3YXJkVmlkZW9BZFJld2FyZENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU0RLTWFuYWdlcjpfcmV3YXJkVmlkZW9BZFJld2FyZENhbGxiYWNrXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgcmVwb3J0RXZlbnQoZXZlbnROYW1lOiBzdHJpbmcsIGRhdGE6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU0RLTWFuYWdlcjpyZXBvcnRFdmVudFwiKTtcclxuICAgICAgICBpZiAod2luZG93LmpzYikge1xyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwQWN0aXZpdHlcIiwgXCJyZXBvcnRFdmVudFwiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCBldmVudE5hbWUsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIHNob3dJbnRlcnN0aXRpYWxBZChjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU0RLTWFuYWdlcjpzaG93SW50ZXJzdGl0aWFsQWRcIik7XHJcbiAgICAgICAgdGhpcy5faW50ZXJzdGl0aWFsQWRDbG9zZUNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5qc2IpIHtcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcEFjdGl2aXR5XCIsIFwic2hvd0ludGVyc3RpdGlhbEFkXCIsIFwiKClWXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgaXNJbnRlcnN0aXRpYWxBZExvYWRlZCgpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNES01hbmFnZXI6aXNJbnRlcnN0aXRpYWxBZExvYWRlZFwiKTtcclxuICAgICAgICByZXR1cm4gd2luZG93LmpzYiBcclxuICAgICAgICAgICAgPyBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwQWN0aXZpdHlcIiwgXCJpc0ludGVyc3RpdGlhbEFkTG9hZGVkXCIsIFwiKClaXCIpIFxyXG4gICAgICAgICAgICA6IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBvbkludGVyc3RpdGlhbEFkQ2xvc2VDYWxsYmFjaygpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNES01hbmFnZXI6b25JbnRlcnN0aXRpYWxBZENsb3NlQ2FsbGJhY2tcIik7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ludGVyc3RpdGlhbEFkQ2xvc2VDYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcnN0aXRpYWxBZENsb3NlQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTREtNYW5hZ2VyOl9pbnRlcnN0aXRpYWxBZENsb3NlQ2FsbGJhY2tcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBzaG93QmFubmVyQWQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTREtNYW5hZ2VyOnNob3dCYW5uZXJBZFwiKTtcclxuICAgICAgICBpZiAod2luZG93LmpzYikge1xyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwQWN0aXZpdHlcIiwgXCJzaG93QmFubmVyQWRcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBoaWRlQmFubmVyQWQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTREtNYW5hZ2VyOmhpZGVCYW5uZXJBZFwiKTtcclxuICAgICAgICBpZiAod2luZG93LmpzYikge1xyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwQWN0aXZpdHlcIiwgXCJoaWRlQmFubmVyQWRcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXRMYW5ndWFnZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU0RLTWFuYWdlcjpnZXRMYW5ndWFnZVwiKTtcclxuICAgICAgICByZXR1cm4gd2luZG93LmpzYiBcclxuICAgICAgICAgICAgPyBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwQWN0aXZpdHlcIiwgXCJnZXRMYW5ndWFnZVwiLCBcIigpTGphdmEvbGFuZy9TdHJpbmc7XCIpIFxyXG4gICAgICAgICAgICA6IFwiemgtQ05cIjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0QXBwTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU0RLTWFuYWdlcjpnZXRBcHBOYW1lXCIpO1xyXG4gICAgICAgIHJldHVybiB3aW5kb3cuanNiIFxyXG4gICAgICAgICAgICA/IGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcHBBY3Rpdml0eVwiLCBcImdldEFwcE5hbWVcIiwgXCIoKUxqYXZhL2xhbmcvU3RyaW5nO1wiKSBcclxuICAgICAgICAgICAgOiBcInVua25vd25cIjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0VmVyc2lvbk5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNES01hbmFnZXI6Z2V0VmVyc2lvbk5hbWVcIik7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5qc2IgXHJcbiAgICAgICAgICAgID8ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcEFjdGl2aXR5XCIsIFwiZ2V0VmVyc2lvbk5hbWVcIiwgXCIoKUxqYXZhL2xhbmcvU3RyaW5nO1wiKSBcclxuICAgICAgICAgICAgOiBcInVua25vd25cIjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0VmVyc2lvbkNvZGUoKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNES01hbmFnZXI6Z2V0VmVyc2lvbkNvZGVcIik7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5qc2IgXHJcbiAgICAgICAgICAgID8ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcEFjdGl2aXR5XCIsIFwiZ2V0VmVyc2lvbkNvZGVcIiwgXCIoKUlcIikgXHJcbiAgICAgICAgICAgIDogMTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgY29weVRvQ2xpcGJvYXJkKHRleHQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmIChjYy5zeXMub3MgPT09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcHBBY3Rpdml0eVwiLCBcImNvcHlUb0NsaXBib2FyZFwiLCBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLCB0ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldE5ldHdvcmtTdGF0ZU5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNES01hbmFnZXI6Z2V0TmV0d29ya1N0YXRlTmFtZVwiKTtcclxuICAgICAgICByZXR1cm4gd2luZG93LmpzYiBcclxuICAgICAgICAgICAgPyBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwQWN0aXZpdHlcIiwgXCJnZXROZXR3b3JrU3RhdGVOYW1lXCIsIFwiKClMamF2YS9sYW5nL1N0cmluZztcIikgXHJcbiAgICAgICAgICAgIDogXCJ1bmtub3duXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGxvZ2luKHN1Y2Nlc3NDYWxsYmFjazogKGRhdGE6IGFueSkgPT4gdm9pZCwgZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTREtNYW5hZ2VyOmxvZ2luXCIpO1xyXG4gICAgICAgIHRoaXMuX2xvZ2luU3VjY2Vzc0NhbGxiYWNrID0gc3VjY2Vzc0NhbGxiYWNrO1xyXG4gICAgICAgIGlmICh3aW5kb3cuanNiKSB7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcHBBY3Rpdml0eVwiLCBcImxvZ2luXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCIsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIHN3aXRjaEFjY291bnQoc3VjY2Vzc0NhbGxiYWNrOiAoZGF0YTogYW55KSA9PiB2b2lkLCBkYXRhOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNES01hbmFnZXI6c3dpdGNoQWNjb3VudFwiKTtcclxuICAgICAgICB0aGlzLl9sb2dpblN1Y2Nlc3NDYWxsYmFjayA9IHN1Y2Nlc3NDYWxsYmFjaztcclxuICAgICAgICBpZiAod2luZG93LmpzYikge1xyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwQWN0aXZpdHlcIiwgXCJzd2l0Y2hBY2NvdW50XCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCIsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIHZpc2l0b3JCaW5kQWNjb3VudChzdWNjZXNzQ2FsbGJhY2s6IChkYXRhOiBhbnkpID0+IHZvaWQsIGRhdGE6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU0RLTWFuYWdlcjp2aXNpdG9yQmluZEFjY291bnRcIik7XHJcbiAgICAgICAgdGhpcy5fbG9naW5TdWNjZXNzQ2FsbGJhY2sgPSBzdWNjZXNzQ2FsbGJhY2s7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5qc2IpIHtcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0FwcEFjdGl2aXR5XCIsIFwidmlzaXRvckJpbmRBY2NvdW50XCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCIsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGlzVmlzaXRvcigpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNES01hbmFnZXI6aXNWaXNpdG9yXCIpO1xyXG4gICAgICAgIHJldHVybiB3aW5kb3cuanNiIFxyXG4gICAgICAgICAgICA/IGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcHBBY3Rpdml0eVwiLCBcImlzVmlzaXRvclwiLCBcIigpWlwiKSBcclxuICAgICAgICAgICAgOiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgb25Mb2dpblN1Y2Nlc3NDYWxsYmFjayhqc29uU3RyOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNES01hbmFnZXI6b25Mb2dpblN1Y2Nlc3NDYWxsYmFjayBqc29uU3RyOlwiICsganNvblN0cik7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoanNvblN0cik7XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIGRhdGEuYXBpTG9naW5UeXBlID09PSBMR0dsb2JhbExvZ2luQ2FsbGJhY2suTG9naW4gfHwgXHJcbiAgICAgICAgICAgICAgICBkYXRhLmFwaUxvZ2luVHlwZSA9PT0gTEdHbG9iYWxMb2dpbkNhbGxiYWNrLkFjY291bnRCaW5kIHx8IFxyXG4gICAgICAgICAgICAgICAgZGF0YS5hcGlMb2dpblR5cGUgPT09IExHR2xvYmFsTG9naW5DYWxsYmFjay5Td2l0Y2hBY2NvdW50XHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9naW5TdWNjZXNzQ2FsbGJhY2sgJiYgdGhpcy5fbG9naW5TdWNjZXNzQ2FsbGJhY2soZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi6Kej5p6Qb25Mb2dpblN1Y2Nlc3NDYWxsYmFja+Wbnuiwg+aVsOaNruWksei0pVwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBvbkxvZ2luRmFpbENhbGxiYWNrKGpzb25TdHI6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU0RLTWFuYWdlcjpvbkxvZ2luRmFpbENhbGxiYWNrIGpzb25TdHI6XCIgKyBqc29uU3RyKTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShqc29uU3RyKTtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgZGF0YS5hcGlMb2dpblR5cGUgPT09IExHR2xvYmFsTG9naW5DYWxsYmFjay5Mb2dpbiB8fCBcclxuICAgICAgICAgICAgICAgIGRhdGEuYXBpTG9naW5UeXBlID09PSBMR0dsb2JhbExvZ2luQ2FsbGJhY2suQWNjb3VudEJpbmRcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUgbG9naW4gZmFpbHVyZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuino+aekG9uTG9naW5GYWlsQ2FsbGJhY2vlm57osIPmlbDmja7lpLHotKVcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gRXhwb3J0IHRoZSBTREtNYW5hZ2VyIGFuZCBMR0dsb2JhbExvZ2luQ2FsbGJhY2tcclxuZXhwb3J0IHsgU0RLTWFuYWdlciwgTEdHbG9iYWxMb2dpbkNhbGxiYWNrIH07XHJcbih3aW5kb3cgYXMgYW55KS5TREtNYW5hZ2VyID0gU0RLTWFuYWdlci5pbnN0YW5jZTtcclxuIl19