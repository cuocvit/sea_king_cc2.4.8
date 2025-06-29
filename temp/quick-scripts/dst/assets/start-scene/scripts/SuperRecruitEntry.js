
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/SuperRecruitEntry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'eef13aiVoRK5KkjN1+rbSq2', 'SuperRecruitEntry');
// start-scene/scripts/SuperRecruitEntry.ts

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
exports.SuperRecruitEntry = void 0;
// *-*
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SuperRecruitEntry = /** @class */ (function (_super) {
    __extends(SuperRecruitEntry, _super);
    function SuperRecruitEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.super_recruit_btn = null;
        _this.red_point_node = null;
        _this._is_show_red = true;
        return _this;
    }
    SuperRecruitEntry.prototype.onEnable = function () {
        this.update_view();
    };
    SuperRecruitEntry.prototype.onDisable = function () {
        // Add any necessary cleanup logic here
    };
    SuperRecruitEntry.prototype.update_view = function () {
        this.red_point_node.active = this._is_show_red;
    };
    SuperRecruitEntry.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.super_recruit_btn.node) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.SuperRecruit);
            if (this._is_show_red) {
                this._is_show_red = false;
                this.update_view();
            }
        }
    };
    __decorate([
        property(cc.Button)
    ], SuperRecruitEntry.prototype, "super_recruit_btn", void 0);
    __decorate([
        property(cc.Node)
    ], SuperRecruitEntry.prototype, "red_point_node", void 0);
    SuperRecruitEntry = __decorate([
        ccclass
    ], SuperRecruitEntry);
    return SuperRecruitEntry;
}(NodePoolItem_1.NodePoolItem));
exports.SuperRecruitEntry = SuperRecruitEntry;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFN1cGVyUmVjcnVpdEVudHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNO0FBQ04sNkNBQW1DO0FBQ25DLCtDQUE4QztBQUV4QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF1QyxxQ0FBWTtJQUFuRDtRQUFBLHFFQThCQztRQTVCVyx1QkFBaUIsR0FBcUIsSUFBSSxDQUFDO1FBRzNDLG9CQUFjLEdBQW1CLElBQUksQ0FBQztRQUV0QyxrQkFBWSxHQUFZLElBQUksQ0FBQzs7SUF1QnpDLENBQUM7SUFyQmEsb0NBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVTLHFDQUFTLEdBQW5CO1FBQ0ksdUNBQXVDO0lBQzNDLENBQUM7SUFFTyx1Q0FBVyxHQUFuQjtRQUNJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDbkQsQ0FBQztJQUVPLDBEQUE4QixHQUF0QyxVQUF1QyxLQUFlO1FBQ2xELElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFO1lBQzdDLGdCQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN4QyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDdEI7U0FDSjtJQUNMLENBQUM7SUEzQkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnRUFDK0I7SUFHbkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2REFDNEI7SUFMckMsaUJBQWlCO1FBRDdCLE9BQU87T0FDSyxpQkFBaUIsQ0E4QjdCO0lBQUQsd0JBQUM7Q0E5QkQsQUE4QkMsQ0E5QnNDLDJCQUFZLEdBOEJsRDtBQTlCWSw4Q0FBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyAqLSpcclxuaW1wb3J0IHsgZ20gfSBmcm9tIFwiLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBOb2RlUG9vbEl0ZW0gfSBmcm9tIFwiLi9Ob2RlUG9vbEl0ZW1cIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgU3VwZXJSZWNydWl0RW50cnkgZXh0ZW5kcyBOb2RlUG9vbEl0ZW0ge1xyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgc3VwZXJfcmVjcnVpdF9idG46IGNjLkJ1dHRvbiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSByZWRfcG9pbnRfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX2lzX3Nob3dfcmVkOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gQWRkIGFueSBuZWNlc3NhcnkgY2xlYW51cCBsb2dpYyBoZXJlXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVfdmlldygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlZF9wb2ludF9ub2RlLmFjdGl2ZSA9IHRoaXMuX2lzX3Nob3dfcmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZWRpdG9yX29uX2J1dHRvbl9jbGlja19oYW5kbGVyKGV2ZW50OiBjYy5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5zdXBlcl9yZWNydWl0X2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuU3VwZXJSZWNydWl0KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzX3Nob3dfcmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc19zaG93X3JlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==