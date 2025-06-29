
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/SingletonBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFNpbmdsZXRvbkJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsS0FBSztBQUNMO0lBQUE7SUFZQSxDQUFDO0lBVEcsMkJBQTJCO0lBRTNCLElBQUk7SUFDVSwwQkFBWSxHQUExQjtRQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBTyxDQUFDO1NBQ3BDO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFWYyx1QkFBUyxHQUFRLElBQUksQ0FBQztJQVd6QyxvQkFBQztDQVpELEFBWUMsSUFBQTtBQVpZLHNDQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQEBcclxuZXhwb3J0IGNsYXNzIFNpbmdsZXRvbkJhc2Uge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIC8vIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0X2luc3RhbmNlPFQ+KCk6IFQge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyB0aGlzKCkgYXMgVDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==