"use strict";
cc._RF.push(module, 'b757870ampGCqhssUWbFH09', 'ConstantsData');
// start-scene/scripts/ConstantsData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstantsData = void 0;
// @
var ConstantsData = /** @class */ (function () {
    // @
    function ConstantsData() {
        // this.CLOSE_BTN_DELAY_TIME = 1;
        this.MAX_FIGHT_TIME = 180;
    }
    Object.defineProperty(ConstantsData, "instance", {
        // @
        get: function () {
            return this._instance || (this._instance = new ConstantsData());
        },
        enumerable: false,
        configurable: true
    });
    // @
    ConstantsData._instance = null;
    return ConstantsData;
}());
exports.ConstantsData = ConstantsData;

cc._RF.pop();