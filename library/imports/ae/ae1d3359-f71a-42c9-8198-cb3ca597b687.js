"use strict";
cc._RF.push(module, 'ae1d3NZ9xpCyYGYyzyll7aH', 'SDKManagerNew');
// start-scene/scripts/SDKManagerNew.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDKManagerNew = void 0;
var SDKManagerNew = /** @class */ (function () {
    function SDKManagerNew() {
        this._is_load_reward_video_ad_success = false;
        this.isInitSuccess = false;
    }
    SDKManagerNew.instance = function () {
        if (null == this._instance) {
            this._instance = new SDKManagerNew;
        }
        return this._instance;
    };
    SDKManagerNew.prototype.call_native_static_method = function (returnType, methodName, call1, clall2) {
        var args = [];
        for (var index = 2; index < arguments.length; index++) {
            args[index - 2] = arguments[index];
        }
        var nativeParams = [];
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            var methodSignature = "(";
            var callbackArgs = [];
            for (var s = 0; s < args.length; s++) {
                var argType = typeof args[s];
                if ("function" == argType) {
                    var arg = args[s];
                    if ("" != arg.name) {
                        if (!SDKManagerNew._callback_map[arg.name]) {
                            (SDKManagerNew._callback_map[arg.name] = args[s]);
                        }
                        callbackArgs.push("callback@" + arg.name);
                    }
                    else {
                        cc.error("函数名不能为空");
                    }
                }
                else {
                    callbackArgs.push(args[s]);
                }
                methodSignature += this.type_to_platform_flag(argType);
                methodSignature += ")" + this.type_to_platform_flag(returnType);
            }
            nativeParams.push(SDKManagerNew.java_class_name);
            nativeParams.push(methodName);
            nativeParams.push(methodSignature);
            nativeParams.concat(args);
        }
        else {
            if (cc.sys.os != cc.sys.OS_IOS) {
                console.error("不支持的平台");
                return;
            }
            nativeParams.push(SDKManagerNew.java_class_name);
            var iosMethodSignature = SDKManagerNew.java_class_name;
            for (var s = 0; s < args.length; s++) {
                nativeParams.push(args[s]);
                iosMethodSignature += 0 == s ? ":" : "arg" + s + ":";
            }
            nativeParams.push(iosMethodSignature);
            nativeParams.concat(args);
        }
        console.log("js call native " + JSON.stringify(nativeParams));
        return jsb.reflection.callStaticMethod.apply(jsb.reflection, nativeParams);
    };
    SDKManagerNew.prototype.type_to_platform_flag = function (type) {
        if ("boolean" == type) {
            return "Z";
        }
        else if ("string" == type) {
            return "Ljava/lang/String;";
        }
        else if ("number" == type) {
            return "I";
        }
        else if ("void" == type) {
            return "V";
        }
        else if ("function" == type) {
            return "Ljava/lang/String;";
        }
        else {
            console.error("不支持的参数类型");
            return "";
        }
    };
    SDKManagerNew.prototype.native_call_js = function (jsonString) {
        console.log("native call js " + jsonString);
        var callbackData = JSON.parse(jsonString);
        var method = this[callbackData.method_name];
        if (method) {
            method.apply(this, callbackData.params);
        }
        else {
            cc.error("SDKManagerNew中没有找到回调函数");
        }
    };
    SDKManagerNew.prototype.init = function () { };
    SDKManagerNew.prototype.on_init_callback = function () { };
    SDKManagerNew.prototype.load_reward_video_ad = function () {
        this.call_native_static_method("void", "loadRewardVideoAd", this.on_load_reward_video_ad_success_callback, this.on_load_reward_video_ad_fail_callback);
    };
    SDKManagerNew.prototype.on_load_reward_video_ad_success_callback = function () {
        this._is_load_reward_video_ad_success = true;
    };
    SDKManagerNew.prototype.on_load_reward_video_ad_fail_callback = function () {
        this._is_load_reward_video_ad_success = false;
    };
    SDKManagerNew.prototype.show_reward_video_ad = function () {
        if (this._is_load_reward_video_ad_success) {
            this.call_native_static_method("void", "showRewardVideoAd", this.on_reward_video_ad_complete_callback, this.on_reward_video_ad_cancel_callback);
        }
    };
    SDKManagerNew.prototype.on_reward_video_ad_complete_callback = function () { };
    SDKManagerNew.prototype.on_reward_video_ad_cancel_callback = function () { };
    SDKManagerNew.prototype.show_banner_ad = function () { };
    SDKManagerNew.prototype.hide_banner_ad = function () { };
    SDKManagerNew.prototype.showRewardVideoAd = function (call) {
        this.call_native_static_method("string", "method_name", this.onRewardVideoAdRewardCallback);
        console.log("SDKManagerNew:showRewardVideoAd");
        this._rewardVideoAdRewardCallback = call;
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showRewardVideoAd", "()V");
        }
    };
    SDKManagerNew.prototype.isRewardVideoAdLoaded = function () {
        console.log("SDKManagerNew:isRewardVideoAdLoaded");
        if (!!window.jsb) {
            return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "isRewardVideoAdLoaded", "()Z");
        }
    };
    SDKManagerNew.prototype.onRewardVideoAdRewardCallback = function () {
        console.log("SDKManagerNew:onRewardVideoAdRewardCallback");
        if (this._rewardVideoAdRewardCallback) {
            this._rewardVideoAdRewardCallback();
            console.log("SDKManagerNew:_rewardVideoAdRewardCallback");
        }
    };
    SDKManagerNew.prototype.showBannerAd = function () {
        console.log("SDKManagerNew:showBannerAd");
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showBannerAd", "()V");
        }
    };
    SDKManagerNew.prototype.hideBannerAd = function () {
        console.log("SDKManagerNew:hideBannerAd");
        if (window.jsb) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "hideBannerAd", "()V");
        }
    };
    SDKManagerNew.prototype.getLanguage = function () {
        console.log("SDKManagerNew:getLanguage");
        if (window.jsb) {
            return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getLanguage", "()Ljava/lang/String;");
        }
        else {
            return "zh-CN";
        }
    };
    SDKManagerNew.prototype.getAppName = function () {
        console.log("SDKManagerNew:getAppName");
        if (window.jsb) {
            return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getAppName", "()Ljava/lang/String;");
        }
        else {
            return "unknown";
        }
    };
    SDKManagerNew.prototype.getVersionName = function () {
        console.log("SDKManagerNew:getVersionName");
        if (window.jsb) {
            return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getVersionName", "()Ljava/lang/String;");
        }
        else {
            return "unknown";
        }
    };
    SDKManagerNew._instance = null;
    SDKManagerNew._callback_map = {};
    SDKManagerNew.java_class_name = "org/cocos2dx/javascript/SDKManagerNew";
    return SDKManagerNew;
}());
exports.SDKManagerNew = SDKManagerNew;
window.SDKManagerNew = SDKManagerNew.instance;

cc._RF.pop();