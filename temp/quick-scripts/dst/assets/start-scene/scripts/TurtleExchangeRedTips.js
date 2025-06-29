
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/TurtleExchangeRedTips.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a2177Ee+P9GPYDbQK1oLkxM', 'TurtleExchangeRedTips');
// start-scene/scripts/TurtleExchangeRedTips.ts

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
exports.TurtleExchangeRedTips = void 0;
// *-*
var GameManager_1 = require("./GameManager");
var GameModule_1 = require("./GameModule");
var Constants_1 = require("./Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TurtleExchangeRedTips = /** @class */ (function (_super) {
    __extends(TurtleExchangeRedTips, _super);
    function TurtleExchangeRedTips() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.redTipsNode = null;
        return _this;
    }
    TurtleExchangeRedTips.prototype.onEnable = function () {
        GameManager_1.gm.ui.on("refresh_red_tips_stall", this.setStallRed, this);
        this.setStallRed();
    };
    TurtleExchangeRedTips.prototype.setStallRed = function () {
        this.redTipsNode.active = GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.STALL_TYPE] &&
            GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.STALL_TYPE].buildLvl > 0 &&
            GameManager_1.gm.data.store_data.isFree;
    };
    TurtleExchangeRedTips.prototype.onDisable = function () {
        GameManager_1.gm.ui.off("refresh_red_tips_stall", this.setStallRed, this);
    };
    __decorate([
        property(cc.Node)
    ], TurtleExchangeRedTips.prototype, "redTipsNode", void 0);
    TurtleExchangeRedTips = __decorate([
        ccclass
    ], TurtleExchangeRedTips);
    return TurtleExchangeRedTips;
}(GameModule_1.GameModule));
exports.TurtleExchangeRedTips = TurtleExchangeRedTips;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFR1cnRsZUV4Y2hhbmdlUmVkVGlwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLDZDQUFtQztBQUNuQywyQ0FBMEM7QUFDMUMseUNBQTRDO0FBRXRDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTJDLHlDQUFVO0lBQXJEO1FBQUEscUVBa0JDO1FBaEJXLGlCQUFXLEdBQW1CLElBQUksQ0FBQzs7SUFnQi9DLENBQUM7SUFkYSx3Q0FBUSxHQUFsQjtRQUNJLGdCQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU8sMkNBQVcsR0FBbkI7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLHlCQUFhLENBQUMsVUFBVSxDQUFDO1lBQzlFLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMseUJBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQztZQUNyRSxnQkFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQ2xDLENBQUM7SUFFUyx5Q0FBUyxHQUFuQjtRQUNJLGdCQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFmRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhEQUN5QjtJQUZsQyxxQkFBcUI7UUFEakMsT0FBTztPQUNLLHFCQUFxQixDQWtCakM7SUFBRCw0QkFBQztDQWxCRCxBQWtCQyxDQWxCMEMsdUJBQVUsR0FrQnBEO0FBbEJZLHNEQUFxQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vICotKlxyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSAnLi9HYW1lTW9kdWxlJztcclxuaW1wb3J0IHsgQnVpbGRUeXBlRW51bSB9IGZyb20gJy4vQ29uc3RhbnRzJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgVHVydGxlRXhjaGFuZ2VSZWRUaXBzIGV4dGVuZHMgR2FtZU1vZHVsZSB7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgcmVkVGlwc05vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ20udWkub24oXCJyZWZyZXNoX3JlZF90aXBzX3N0YWxsXCIsIHRoaXMuc2V0U3RhbGxSZWQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhbGxSZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFN0YWxsUmVkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVkVGlwc05vZGUuYWN0aXZlID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuYnVpbGREYXRhW0J1aWxkVHlwZUVudW0uU1RBTExfVFlQRV0gJiZcclxuICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYnVpbGREYXRhW0J1aWxkVHlwZUVudW0uU1RBTExfVFlQRV0uYnVpbGRMdmwgPiAwICYmXHJcbiAgICAgICAgICAgIGdtLmRhdGEuc3RvcmVfZGF0YS5pc0ZyZWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS51aS5vZmYoXCJyZWZyZXNoX3JlZF90aXBzX3N0YWxsXCIsIHRoaXMuc2V0U3RhbGxSZWQsIHRoaXMpO1xyXG4gICAgfVxyXG59Il19