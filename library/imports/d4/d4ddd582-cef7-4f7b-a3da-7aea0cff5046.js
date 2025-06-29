"use strict";
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