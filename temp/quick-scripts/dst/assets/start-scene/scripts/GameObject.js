
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/GameObject.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f80bai1sHVAQr9XVcE3fHxM', 'GameObject');
// start-scene/scripts/GameObject.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameObject = void 0;
var GameObjectManager_1 = require("./GameObjectManager");
var ccclass = cc._decorator.ccclass;
var GameObject = /** @class */ (function (_super) {
    __extends(GameObject, _super);
    function GameObject() {
        var _this = _super.call(this) || this;
        _this.__unique_id = GameObjectManager_1.GameObjectManager.unique_id;
        _this.__create_time = Date.now();
        GameObjectManager_1.GameObjectManager.instance.add(_this);
        return _this;
    }
    GameObject.prototype.onDestroy = function () {
        this.__destroy_time = Date.now();
        GameObjectManager_1.GameObjectManager.instance.remove(this);
    };
    GameObject = __decorate([
        ccclass
    ], GameObject);
    return GameObject;
}(cc.Component));
exports.GameObject = GameObject;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEdhbWVPYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF3RDtBQUVoRCxJQUFBLE9BQU8sR0FBSyxFQUFFLENBQUMsVUFBVSxRQUFsQixDQUFtQjtBQUdsQztJQUFnQyw4QkFBWTtJQUt4QztRQUFBLFlBQ0ksaUJBQU8sU0FJVjtRQUhHLEtBQUksQ0FBQyxXQUFXLEdBQUcscUNBQWlCLENBQUMsU0FBUyxDQUFDO1FBQy9DLEtBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2hDLHFDQUFpQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLENBQUM7O0lBQ3pDLENBQUM7SUFFUyw4QkFBUyxHQUFuQjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2pDLHFDQUFpQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQWZRLFVBQVU7UUFEdEIsT0FBTztPQUNLLFVBQVUsQ0FnQnRCO0lBQUQsaUJBQUM7Q0FoQkQsQUFnQkMsQ0FoQitCLEVBQUUsQ0FBQyxTQUFTLEdBZ0IzQztBQWhCWSxnQ0FBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVPYmplY3RNYW5hZ2VyIH0gZnJvbSAnLi9HYW1lT2JqZWN0TWFuYWdlcic7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgR2FtZU9iamVjdCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBwdWJsaWMgX191bmlxdWVfaWQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX19jcmVhdGVfdGltZTogbnVtYmVyOyAvLyA/XHJcbiAgICBwdWJsaWMgX19kZXN0cm95X3RpbWU6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX191bmlxdWVfaWQgPSBHYW1lT2JqZWN0TWFuYWdlci51bmlxdWVfaWQ7XHJcbiAgICAgICAgdGhpcy5fX2NyZWF0ZV90aW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICBHYW1lT2JqZWN0TWFuYWdlci5pbnN0YW5jZS5hZGQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9fZGVzdHJveV90aW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICBHYW1lT2JqZWN0TWFuYWdlci5pbnN0YW5jZS5yZW1vdmUodGhpcyk7XHJcbiAgICB9XHJcbn0iXX0=