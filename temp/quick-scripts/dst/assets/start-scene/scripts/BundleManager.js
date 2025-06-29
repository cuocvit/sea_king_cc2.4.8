
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/BundleManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd4dddWCzvdPe6PaeuoM/1BG', 'BundleManager');
// start-scene/scripts/BundleManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BundleManager = void 0;
var BundleManager = /** @class */ (function () {
    function BundleManager() {
        this._map = {
            common: { deps: [] },
            loading: { deps: [] },
            start: { deps: [] }
        };
    }
    ;
    Object.defineProperty(BundleManager, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new BundleManager;
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    BundleManager.prototype.async_get_bundle = function (bundleName, callback) {
        var existingBundle = cc.assetManager.getBundle(bundleName);
        if (existingBundle) {
            callback(existingBundle);
        }
        else {
            this._map[bundleName];
            cc.assetManager.loadBundle(bundleName, function (err, bundle) {
                if (err) {
                    console.error(err);
                    return;
                }
                else {
                    console.error("load " + bundleName + " bundle successfully.");
                    void callback(bundle);
                    return;
                }
            });
        }
    };
    BundleManager._instance = null;
    BundleManager.COMMON = "common";
    BundleManager.LOADING = "loading";
    BundleManager.START = "start";
    return BundleManager;
}());
exports.BundleManager = BundleManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEJ1bmRsZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsWUFBWSxDQUFDOzs7QUFFYjtJQVlJO1FBTlEsU0FBSSxHQUFvQztZQUM1QyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ3BCLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDckIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtTQUN0QixDQUFDO0lBRWMsQ0FBQztJQUFBLENBQUM7SUFFbEIsc0JBQWtCLHlCQUFRO2FBQTFCO1lBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxhQUFhLENBQUM7YUFDdEM7WUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFFTyx3Q0FBZ0IsR0FBeEIsVUFBeUIsVUFBa0IsRUFBRSxRQUF5RDtRQUNsRyxJQUFNLGNBQWMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3RCxJQUFJLGNBQWMsRUFBRTtZQUNoQixRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDNUI7YUFBTTtZQUNILElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdEIsRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLFVBQUMsR0FBRyxFQUFFLE1BQU07Z0JBQy9DLElBQUksR0FBRyxFQUFFO29CQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ25CLE9BQU87aUJBQ1Y7cUJBQU07b0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsVUFBVSxHQUFHLHVCQUF1QixDQUFDLENBQUM7b0JBQzlELEtBQUssUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN0QixPQUFPO2lCQUNWO1lBQ0wsQ0FBQyxDQUFDLENBQUE7U0FDTDtJQUNMLENBQUM7SUFyQ2EsdUJBQVMsR0FBeUIsSUFBSSxDQUFDO0lBQzlDLG9CQUFNLEdBQVcsUUFBUSxDQUFDO0lBQzFCLHFCQUFPLEdBQVcsU0FBUyxDQUFDO0lBQzVCLG1CQUFLLEdBQVcsT0FBTyxDQUFDO0lBbUNuQyxvQkFBQztDQXZDRCxBQXVDQyxJQUFBO0FBdkNZLHNDQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQnVuZGxlTWFuYWdlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIF9pbnN0YW5jZTogQnVuZGxlTWFuYWdlciB8IG51bGwgPSBudWxsO1xyXG4gICAgc3RhdGljIENPTU1PTjogc3RyaW5nID0gXCJjb21tb25cIjtcclxuICAgIHN0YXRpYyBMT0FESU5HOiBzdHJpbmcgPSBcImxvYWRpbmdcIjtcclxuICAgIHN0YXRpYyBTVEFSVDogc3RyaW5nID0gXCJzdGFydFwiO1xyXG5cclxuICAgIHByaXZhdGUgX21hcDogUmVjb3JkPHN0cmluZywgeyBkZXBzOiBhbnlbXSB9PiA9IHtcclxuICAgICAgICBjb21tb246IHsgZGVwczogW10gfSxcclxuICAgICAgICBsb2FkaW5nOiB7IGRlcHM6IFtdIH0sXHJcbiAgICAgICAgc3RhcnQ6IHsgZGVwczogW10gfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBpbnN0YW5jZSgpOiBCdW5kbGVNYW5hZ2VyIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2luc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IEJ1bmRsZU1hbmFnZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jX2dldF9idW5kbGUoYnVuZGxlTmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGJ1bmRsZTogY2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZSB8IG51bGwpID0+IHZvaWQpIHtcclxuICAgICAgICBjb25zdCBleGlzdGluZ0J1bmRsZSA9IGNjLmFzc2V0TWFuYWdlci5nZXRCdW5kbGUoYnVuZGxlTmFtZSk7XHJcbiAgICAgICAgaWYgKGV4aXN0aW5nQnVuZGxlKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGV4aXN0aW5nQnVuZGxlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBbYnVuZGxlTmFtZV07XHJcbiAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkQnVuZGxlKGJ1bmRsZU5hbWUsIChlcnIsIGJ1bmRsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJsb2FkIFwiICsgYnVuZGxlTmFtZSArIFwiIGJ1bmRsZSBzdWNjZXNzZnVsbHkuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZvaWQgY2FsbGJhY2soYnVuZGxlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19