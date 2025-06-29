
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/SDKManagerNew.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFNES01hbmFnZXJOZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7SUFpQkk7UUFaUSxxQ0FBZ0MsR0FBRyxLQUFLLENBQUM7UUFDekMsa0JBQWEsR0FBRyxLQUFLLENBQUM7SUFhOUIsQ0FBQztJQVZhLHNCQUFRLEdBQXRCO1FBQ0ksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksYUFBYSxDQUFDO1NBQ3RDO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFBO0lBQ3pCLENBQUM7SUFPTyxpREFBeUIsR0FBakMsVUFBa0MsVUFBa0IsRUFBRSxVQUFrQixFQUFFLEtBQWtCLEVBQUUsTUFBbUI7UUFDN0csSUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ2YsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDbkQsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEM7UUFDRCxJQUFNLFlBQVksR0FBYSxFQUFFLENBQUM7UUFDbEMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtZQUNoQyxJQUFJLGVBQWUsR0FBRyxHQUFHLENBQUM7WUFDMUIsSUFBTSxZQUFZLEdBQWEsRUFBRSxDQUFDO1lBRWxDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNsQyxJQUFNLE9BQU8sR0FBRyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxVQUFVLElBQUks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M0g7YUFBTTtZQUNILE9BQU8sU0FBUyxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztJQTlNYyx1QkFBUyxHQUF5QixJQUFJLENBQUM7SUFDdkMsMkJBQWEsR0FBNkIsRUFBRSxDQUFDO0lBQzdDLDZCQUFlLEdBQUcsdUNBQXVDLENBQUM7SUE2TTdFLG9CQUFDO0NBaE5ELEFBZ05DLElBQUE7QUFFUSxzQ0FBYTtBQUNyQixNQUFjLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY2xhc3MgU0RLTWFuYWdlck5ldyB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFNES01hbmFnZXJOZXcgfCBudWxsID0gbnVsbDtcclxuICAgIHByaXZhdGUgc3RhdGljIF9jYWxsYmFja19tYXA6IFJlY29yZDxzdHJpbmcsIEZ1bmN0aW9uPiA9IHt9O1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgamF2YV9jbGFzc19uYW1lID0gXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9TREtNYW5hZ2VyTmV3XCI7XHJcblxyXG4gICAgcHJpdmF0ZSBfaXNfbG9hZF9yZXdhcmRfdmlkZW9fYWRfc3VjY2VzcyA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpc0luaXRTdWNjZXNzID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9yZXdhcmRWaWRlb0FkUmV3YXJkQ2FsbGJhY2s/OiAoKSA9PiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5zdGFuY2UoKTogU0RLTWFuYWdlck5ldyB7XHJcbiAgICAgICAgaWYgKG51bGwgPT0gdGhpcy5faW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgU0RLTWFuYWdlck5ldztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGxfbmF0aXZlX3N0YXRpY19tZXRob2QocmV0dXJuVHlwZTogc3RyaW5nLCBtZXRob2ROYW1lOiBzdHJpbmcsIGNhbGwxPzogKCkgPT4gdm9pZCwgY2xhbGwyPzogKCkgPT4gdm9pZCk6IGFueSB7XHJcbiAgICAgICAgY29uc3QgYXJncyA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAyOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgYXJnc1tpbmRleCAtIDJdID0gYXJndW1lbnRzW2luZGV4XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbmF0aXZlUGFyYW1zOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZFNpZ25hdHVyZSA9IFwiKFwiO1xyXG4gICAgICAgICAgICBjb25zdCBjYWxsYmFja0FyZ3M6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBzID0gMDsgcyA8IGFyZ3MubGVuZ3RoOyBzKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFyZ1R5cGUgPSB0eXBlb2YgYXJnc1tzXTtcclxuICAgICAgICAgICAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT0gYXJnVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyZyA9IGFyZ3Nbc107XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFwiXCIgIT0gYXJnLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFTREtNYW5hZ2VyTmV3Ll9jYWxsYmFja19tYXBbYXJnLm5hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoU0RLTWFuYWdlck5ldy5fY2FsbGJhY2tfbWFwW2FyZy5uYW1lXSA9IGFyZ3Nbc10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrQXJncy5wdXNoKFwiY2FsbGJhY2tAXCIgKyBhcmcubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoXCLlh73mlbDlkI3kuI3og73kuLrnqbpcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFja0FyZ3MucHVzaChhcmdzW3NdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG1ldGhvZFNpZ25hdHVyZSArPSB0aGlzLnR5cGVfdG9fcGxhdGZvcm1fZmxhZyhhcmdUeXBlKTtcclxuICAgICAgICAgICAgICAgIG1ldGhvZFNpZ25hdHVyZSArPSBcIilcIiArIHRoaXMudHlwZV90b19wbGF0Zm9ybV9mbGFnKHJldHVyblR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBuYXRpdmVQYXJhbXMucHVzaChTREtNYW5hZ2VyTmV3LmphdmFfY2xhc3NfbmFtZSk7XHJcbiAgICAgICAgICAgIG5hdGl2ZVBhcmFtcy5wdXNoKG1ldGhvZE5hbWUpO1xyXG4gICAgICAgICAgICBuYXRpdmVQYXJhbXMucHVzaChtZXRob2RTaWduYXR1cmUpO1xyXG4gICAgICAgICAgICBuYXRpdmVQYXJhbXMuY29uY2F0KGFyZ3MpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zICE9IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLkuI3mlK/mjIHnmoTlubPlj7BcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmF0aXZlUGFyYW1zLnB1c2goU0RLTWFuYWdlck5ldy5qYXZhX2NsYXNzX25hbWUpO1xyXG4gICAgICAgICAgICBsZXQgaW9zTWV0aG9kU2lnbmF0dXJlID0gU0RLTWFuYWdlck5ldy5qYXZhX2NsYXNzX25hbWU7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHMgPSAwOyBzIDwgYXJncy5sZW5ndGg7IHMrKykge1xyXG4gICAgICAgICAgICAgICAgbmF0aXZlUGFyYW1zLnB1c2goYXJnc1tzXSk7XHJcbiAgICAgICAgICAgICAgICBpb3NNZXRob2RTaWduYXR1cmUgKz0gMCA9PSBzID8gXCI6XCIgOiBcImFyZ1wiICsgcyArIFwiOlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5hdGl2ZVBhcmFtcy5wdXNoKGlvc01ldGhvZFNpZ25hdHVyZSk7XHJcbiAgICAgICAgICAgIG5hdGl2ZVBhcmFtcy5jb25jYXQoYXJncylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwianMgY2FsbCBuYXRpdmUgXCIgKyBKU09OLnN0cmluZ2lmeShuYXRpdmVQYXJhbXMpKTtcclxuICAgICAgICByZXR1cm4ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZC5hcHBseShqc2IucmVmbGVjdGlvbiwgbmF0aXZlUGFyYW1zKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHlwZV90b19wbGF0Zm9ybV9mbGFnKHR5cGU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKFwiYm9vbGVhblwiID09IHR5cGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiWlwiO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoXCJzdHJpbmdcIiA9PSB0eXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkxqYXZhL2xhbmcvU3RyaW5nO1wiO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoXCJudW1iZXJcIiA9PSB0eXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIklcIjtcclxuICAgICAgICB9IGVsc2UgaWYgKFwidm9pZFwiID09IHR5cGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiVlwiO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoXCJmdW5jdGlvblwiID09IHR5cGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiTGphdmEvbGFuZy9TdHJpbmc7XCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuS4jeaUr+aMgeeahOWPguaVsOexu+Wei1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbmF0aXZlX2NhbGxfanMoanNvblN0cmluZzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJuYXRpdmUgY2FsbCBqcyBcIiArIGpzb25TdHJpbmcpO1xyXG4gICAgICAgIGNvbnN0IGNhbGxiYWNrRGF0YSA9IEpTT04ucGFyc2UoanNvblN0cmluZyk7XHJcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdGhpc1tjYWxsYmFja0RhdGEubWV0aG9kX25hbWVdO1xyXG4gICAgICAgIGlmIChtZXRob2QpIHtcclxuICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHRoaXMsIGNhbGxiYWNrRGF0YS5wYXJhbXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKFwiU0RLTWFuYWdlck5ld+S4reayoeacieaJvuWIsOWbnuiwg+WHveaVsFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0KCkgeyB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbl9pbml0X2NhbGxiYWNrKCkgeyB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkX3Jld2FyZF92aWRlb19hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNhbGxfbmF0aXZlX3N0YXRpY19tZXRob2QoXHJcbiAgICAgICAgICAgIFwidm9pZFwiLFxyXG4gICAgICAgICAgICBcImxvYWRSZXdhcmRWaWRlb0FkXCIsXHJcbiAgICAgICAgICAgIHRoaXMub25fbG9hZF9yZXdhcmRfdmlkZW9fYWRfc3VjY2Vzc19jYWxsYmFjayxcclxuICAgICAgICAgICAgdGhpcy5vbl9sb2FkX3Jld2FyZF92aWRlb19hZF9mYWlsX2NhbGxiYWNrXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uX2xvYWRfcmV3YXJkX3ZpZGVvX2FkX3N1Y2Nlc3NfY2FsbGJhY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5faXNfbG9hZF9yZXdhcmRfdmlkZW9fYWRfc3VjY2VzcyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbl9sb2FkX3Jld2FyZF92aWRlb19hZF9mYWlsX2NhbGxiYWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2lzX2xvYWRfcmV3YXJkX3ZpZGVvX2FkX3N1Y2Nlc3MgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dfcmV3YXJkX3ZpZGVvX2FkKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc19sb2FkX3Jld2FyZF92aWRlb19hZF9zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbF9uYXRpdmVfc3RhdGljX21ldGhvZChcclxuICAgICAgICAgICAgICAgIFwidm9pZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzaG93UmV3YXJkVmlkZW9BZFwiLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbl9yZXdhcmRfdmlkZW9fYWRfY29tcGxldGVfY2FsbGJhY2ssXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uX3Jld2FyZF92aWRlb19hZF9jYW5jZWxfY2FsbGJhY2tcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbl9yZXdhcmRfdmlkZW9fYWRfY29tcGxldGVfY2FsbGJhY2soKSB7IH1cclxuICAgIHByaXZhdGUgb25fcmV3YXJkX3ZpZGVvX2FkX2NhbmNlbF9jYWxsYmFjaygpIHsgfVxyXG4gICAgcHJpdmF0ZSBzaG93X2Jhbm5lcl9hZCgpIHsgfVxyXG4gICAgcHJpdmF0ZSBoaWRlX2Jhbm5lcl9hZCgpIHsgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd1Jld2FyZFZpZGVvQWQoY2FsbDogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2FsbF9uYXRpdmVfc3RhdGljX21ldGhvZChcclxuICAgICAgICAgICAgXCJzdHJpbmdcIixcclxuICAgICAgICAgICAgXCJtZXRob2RfbmFtZVwiLFxyXG4gICAgICAgICAgICB0aGlzLm9uUmV3YXJkVmlkZW9BZFJld2FyZENhbGxiYWNrXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNES01hbmFnZXJOZXc6c2hvd1Jld2FyZFZpZGVvQWRcIik7XHJcbiAgICAgICAgdGhpcy5fcmV3YXJkVmlkZW9BZFJld2FyZENhbGxiYWNrID0gY2FsbDtcclxuICAgICAgICBpZiAod2luZG93LmpzYikge1xyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwQWN0aXZpdHlcIiwgXCJzaG93UmV3YXJkVmlkZW9BZFwiLCBcIigpVlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc1Jld2FyZFZpZGVvQWRMb2FkZWQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTREtNYW5hZ2VyTmV3OmlzUmV3YXJkVmlkZW9BZExvYWRlZFwiKTtcclxuICAgICAgICBpZiAoISF3aW5kb3cuanNiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwQWN0aXZpdHlcIiwgXCJpc1Jld2FyZFZpZGVvQWRMb2FkZWRcIiwgXCIoKVpcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25SZXdhcmRWaWRlb0FkUmV3YXJkQ2FsbGJhY2soKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTREtNYW5hZ2VyTmV3Om9uUmV3YXJkVmlkZW9BZFJld2FyZENhbGxiYWNrXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLl9yZXdhcmRWaWRlb0FkUmV3YXJkQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5fcmV3YXJkVmlkZW9BZFJld2FyZENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU0RLTWFuYWdlck5ldzpfcmV3YXJkVmlkZW9BZFJld2FyZENhbGxiYWNrXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dCYW5uZXJBZCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNES01hbmFnZXJOZXc6c2hvd0Jhbm5lckFkXCIpO1xyXG4gICAgICAgIGlmICh3aW5kb3cuanNiKSB7XHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcHBBY3Rpdml0eVwiLCBcInNob3dCYW5uZXJBZFwiLCBcIigpVlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoaWRlQmFubmVyQWQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTREtNYW5hZ2VyTmV3OmhpZGVCYW5uZXJBZFwiKTtcclxuICAgICAgICBpZiAod2luZG93LmpzYikge1xyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwQWN0aXZpdHlcIiwgXCJoaWRlQmFubmVyQWRcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGdldExhbmd1YWdlKCk6IHN0cmluZyB8IGFueSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTREtNYW5hZ2VyTmV3OmdldExhbmd1YWdlXCIpO1xyXG4gICAgICAgIGlmICh3aW5kb3cuanNiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwQWN0aXZpdHlcIiwgXCJnZXRMYW5ndWFnZVwiLCBcIigpTGphdmEvbGFuZy9TdHJpbmc7XCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcInpoLUNOXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0QXBwTmFtZSgpOiBzdHJpbmcgfCBhbnkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU0RLTWFuYWdlck5ldzpnZXRBcHBOYW1lXCIpO1xyXG4gICAgICAgIGlmICh3aW5kb3cuanNiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwQWN0aXZpdHlcIiwgXCJnZXRBcHBOYW1lXCIsIFwiKClMamF2YS9sYW5nL1N0cmluZztcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwidW5rbm93blwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFZlcnNpb25OYW1lKCk6IHN0cmluZyB8IGFueSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTREtNYW5hZ2VyTmV3OmdldFZlcnNpb25OYW1lXCIpO1xyXG4gICAgICAgIGlmICh3aW5kb3cuanNiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBwQWN0aXZpdHlcIiwgXCJnZXRWZXJzaW9uTmFtZVwiLCBcIigpTGphdmEvbGFuZy9TdHJpbmc7XCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcInVua25vd25cIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFNES01hbmFnZXJOZXcgfTtcclxuKHdpbmRvdyBhcyBhbnkpLlNES01hbmFnZXJOZXcgPSBTREtNYW5hZ2VyTmV3Lmluc3RhbmNlOyJdfQ==