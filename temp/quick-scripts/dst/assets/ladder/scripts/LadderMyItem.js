
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ladder/scripts/LadderMyItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ed423J5qidAg5HGURiVbSeP', 'LadderMyItem');
// ladder/scripts/LadderMyItem.ts

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
var ListViewItem_1 = require("../../start-scene/scripts/ListViewItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LadderMyItem = /** @class */ (function (_super) {
    __extends(LadderMyItem, _super);
    function LadderMyItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bg_spr = null;
        _this.star_bg_node = null;
        _this.lv_spr = null;
        _this.name_lbl = null;
        _this.next_lv_star_lbl = null;
        return _this;
    }
    Object.defineProperty(LadderMyItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            this.update_view();
        },
        enumerable: false,
        configurable: true
    });
    LadderMyItem.prototype.update_view = function () { };
    LadderMyItem.prototype.reset = function () {
        if (this.bg_spr)
            this.bg_spr.spriteFrame = null;
        if (this.lv_spr)
            this.lv_spr.spriteFrame = null;
        if (this.next_lv_star_lbl)
            this.next_lv_star_lbl.string = "";
        if (this.name_lbl)
            this.name_lbl.string = "";
    };
    __decorate([
        property(cc.Sprite)
    ], LadderMyItem.prototype, "bg_spr", void 0);
    __decorate([
        property(cc.Node)
    ], LadderMyItem.prototype, "star_bg_node", void 0);
    __decorate([
        property(cc.Sprite)
    ], LadderMyItem.prototype, "lv_spr", void 0);
    __decorate([
        property(cc.Label)
    ], LadderMyItem.prototype, "name_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], LadderMyItem.prototype, "next_lv_star_lbl", void 0);
    LadderMyItem = __decorate([
        ccclass
    ], LadderMyItem);
    return LadderMyItem;
}(ListViewItem_1.ListViewItem));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbGFkZGVyXFxzY3JpcHRzXFxMYWRkZXJNeUl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsdUVBQXNFO0FBRWhFLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTJCLGdDQUFZO0lBQXZDO1FBQUEscUVBaUNDO1FBL0JXLFlBQU0sR0FBcUIsSUFBSSxDQUFDO1FBR2hDLGtCQUFZLEdBQW1CLElBQUksQ0FBQztRQUdwQyxZQUFNLEdBQXFCLElBQUksQ0FBQztRQUdoQyxjQUFRLEdBQW9CLElBQUksQ0FBQztRQUdqQyxzQkFBZ0IsR0FBb0IsSUFBSSxDQUFDOztJQW1CckQsQ0FBQztJQWpCRyxzQkFBVyw4QkFBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7YUFFRCxVQUFnQixLQUFxQjtZQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQzs7O09BTEE7SUFPTSxrQ0FBVyxHQUFsQixjQUE2QixDQUFDO0lBRXZCLDRCQUFLLEdBQVo7UUFDSSxJQUFJLElBQUksQ0FBQyxNQUFNO1lBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ2hELElBQUksSUFBSSxDQUFDLE1BQU07WUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDaEQsSUFBSSxJQUFJLENBQUMsZ0JBQWdCO1lBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDN0QsSUFBSSxJQUFJLENBQUMsUUFBUTtZQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBOUJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0RBQ29CO0lBR3hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQzBCO0lBRzVDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0RBQ29CO0lBR3hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7a0RBQ3NCO0lBR3pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MERBQzhCO0lBZC9DLFlBQVk7UUFEakIsT0FBTztPQUNGLFlBQVksQ0FpQ2pCO0lBQUQsbUJBQUM7Q0FqQ0QsQUFpQ0MsQ0FqQzBCLDJCQUFZLEdBaUN0QyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExhZGRlckxWQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvbGFkZGVyX2x2JztcclxuaW1wb3J0IHsgTGlzdFZpZXdJdGVtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9MaXN0Vmlld0l0ZW0nO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIExhZGRlck15SXRlbSBleHRlbmRzIExpc3RWaWV3SXRlbSB7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBiZ19zcHI6IGNjLlNwcml0ZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBzdGFyX2JnX25vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBsdl9zcHI6IGNjLlNwcml0ZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgbmFtZV9sYmw6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBuZXh0X2x2X3N0YXJfbGJsOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgZGF0YSgpOiBMYWRkZXJMVkNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkYXRhKHZhbHVlOiBMYWRkZXJMVkNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZV92aWV3KCk6IHZvaWQgeyB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmJnX3NwcikgdGhpcy5iZ19zcHIuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLmx2X3NwcikgdGhpcy5sdl9zcHIuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLm5leHRfbHZfc3Rhcl9sYmwpIHRoaXMubmV4dF9sdl9zdGFyX2xibC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIGlmICh0aGlzLm5hbWVfbGJsKSB0aGlzLm5hbWVfbGJsLnN0cmluZyA9IFwiXCI7XHJcbiAgICB9XHJcbn0iXX0=