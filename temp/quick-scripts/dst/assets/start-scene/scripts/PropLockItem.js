
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/PropLockItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c12b2XBzJNC0KYokuYE2jmJ', 'PropLockItem');
// start-scene/scripts/PropLockItem.ts

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
// *-*
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PropLockItem = /** @class */ (function (_super) {
    __extends(PropLockItem, _super);
    function PropLockItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemImg = null;
        _this._parent = null;
        _this._itemData = null;
        return _this;
    }
    PropLockItem.prototype.initData = function (type, path) {
        var resourcePath = type == 3 ? "res/build/" + path : "res/" + path;
        this.itemImg.node.scale = type == 3 ? 0.6666667 : 1;
        Utils_1.Utils.async_set_sprite_frame(this.itemImg, Constants_1.BundleName.TEST, resourcePath);
    };
    PropLockItem.prototype.onEnable = function () {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            _this.itemNode.y += event.getDelta().y;
            _this.itemNode.x += event.getDelta().x;
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            _this.node.zIndex;
            _this.itemNode.y = 0;
            _this.itemNode.x = 0;
        }, this);
    };
    PropLockItem.prototype.onDisable = function () { };
    __decorate([
        property(cc.Sprite)
    ], PropLockItem.prototype, "itemImg", void 0);
    PropLockItem = __decorate([
        ccclass
    ], PropLockItem);
    return PropLockItem;
}(cc.Component));
exports.default = PropLockItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFByb3BMb2NrSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04saUNBQWdDO0FBQ2hDLHlDQUF5QztBQUduQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEyQixnQ0FBWTtJQUF2QztRQUFBLHFFQTZCQztRQTNCVyxhQUFPLEdBQXFCLElBQUksQ0FBQztRQUlqQyxhQUFPLEdBQW1CLElBQUksQ0FBQztRQUMvQixlQUFTLEdBQWtCLElBQUksQ0FBQzs7SUFzQjVDLENBQUM7SUFwQlUsK0JBQVEsR0FBZixVQUFnQixJQUFZLEVBQUUsSUFBWTtRQUN0QyxJQUFNLFlBQVksR0FBVyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFhLElBQU0sQ0FBQyxDQUFDLENBQUMsU0FBTyxJQUFNLENBQUM7UUFDN0UsSUFBSSxDQUFDLE9BQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JELGFBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsT0FBUSxFQUFFLHNCQUFVLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFUywrQkFBUSxHQUFsQjtRQUFBLGlCQVdDO1FBVkcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLFVBQUMsS0FBZTtZQUN2RCxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRVQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFO1lBQ3RDLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ2pCLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwQixLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVTLGdDQUFTLEdBQW5CLGNBQThCLENBQUM7SUExQi9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aURBQ3FCO0lBRnZDLFlBQVk7UUFEakIsT0FBTztPQUNGLFlBQVksQ0E2QmpCO0lBQUQsbUJBQUM7Q0E3QkQsQUE2QkMsQ0E3QjBCLEVBQUUsQ0FBQyxTQUFTLEdBNkJ0QztBQUVELGtCQUFlLFlBQVksQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vICotKlxyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4vVXRpbHMnO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lIH0gZnJvbSAnLi9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBNYXBJdGVtRGF0YVZPIH0gZnJvbSAnLi9NYXBDZWxsQ2ZnRGF0YSc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgUHJvcExvY2tJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIGl0ZW1JbWc6IGNjLlNwcml0ZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgaXRlbU5vZGU6IGNjLk5vZGU7IC8vIHRow6ptIGJp4bq/biBuw6B5XHJcblxyXG4gICAgcHJpdmF0ZSBfcGFyZW50OiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9pdGVtRGF0YTogTWFwSXRlbURhdGFWTyA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIGluaXREYXRhKHR5cGU6IG51bWJlciwgcGF0aDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcmVzb3VyY2VQYXRoOiBzdHJpbmcgPSB0eXBlID09IDMgPyBgcmVzL2J1aWxkLyR7cGF0aH1gIDogYHJlcy8ke3BhdGh9YDtcclxuICAgICAgICB0aGlzLml0ZW1JbWchLm5vZGUuc2NhbGUgPSB0eXBlID09IDMgPyAwLjY2NjY2NjcgOiAxO1xyXG4gICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5pdGVtSW1nISwgQnVuZGxlTmFtZS5URVNULCByZXNvdXJjZVBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgKGV2ZW50OiBjYy5Ub3VjaCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1Ob2RlLnkgKz0gZXZlbnQuZ2V0RGVsdGEoKS55O1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1Ob2RlLnggKz0gZXZlbnQuZ2V0RGVsdGEoKS54O1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS56SW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbU5vZGUueSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbU5vZGUueCA9IDA7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHsgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcm9wTG9ja0l0ZW07XHJcbiJdfQ==