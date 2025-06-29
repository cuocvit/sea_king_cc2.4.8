"use strict";
cc._RF.push(module, '75401pEbX9KKLx2cq41ieCT', 'SingletonBase');
// start-scene/scripts/SingletonBase.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingletonBase = void 0;
// @@
var SingletonBase = /** @class */ (function () {
    function SingletonBase() {
    }
    // private constructor() {}
    // @
    SingletonBase.get_instance = function () {
        if (this._instance === null) {
            this._instance = new this();
        }
        return this._instance;
    };
    SingletonBase._instance = null;
    return SingletonBase;
}());
exports.SingletonBase = SingletonBase;

cc._RF.pop();