
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/WeakGuide.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c82b8DnPVdE0LZn5XJ8Li+D', 'WeakGuide');
// start-scene/scripts/WeakGuide.ts

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
exports.WeakGuide = exports.Direction = void 0;
// @
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var TempData_1 = require("./TempData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
// @
var Direction;
(function (Direction) {
    Direction[Direction["LEFT"] = -1] = "LEFT";
    Direction[Direction["RIGHT"] = 1] = "RIGHT";
})(Direction = exports.Direction || (exports.Direction = {}));
//
var WeakGuide = /** @class */ (function (_super) {
    __extends(WeakGuide, _super);
    function WeakGuide() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //
        _this.finger_anim = null; // (public mode not used)
        _this.tip_node = null;
        _this.tip_txt = null;
        // @
        _this._data = null;
        return _this;
    }
    Object.defineProperty(WeakGuide.prototype, "data", {
        // @
        get: function () {
            return this._data;
        },
        // @
        set: function (value) {
            this._data = value;
            this.update_view();
        },
        enumerable: false,
        configurable: true
    });
    // @ !!!
    WeakGuide.prototype.update_view = function () {
        var _this = this;
        TempData_1.TempData.task_have_hand = true;
        if (this._data && this._data.tip_content !== "") {
            this.tip_node.active = true;
            this.tip_node.position = this._data.tip_offset;
            this.tip_txt.string = this._data.tip_content;
            this.tip_node.scaleX = this._data.dir;
            this.tip_txt.node.scaleX = this._data.dir;
        }
        else {
            this.tip_node.active = false;
        }
        //
        if (this._data && this._data.disappear_time > 0) {
            this.scheduleOnce(function () {
                GameManager_1.gm.pool.put(_this.node);
            }, this._data.disappear_time);
        }
        //
        if (this._data && this._data.target) {
            var button = this._data.target.getComponent(cc.Button);
            var toggle = this._data.target.getComponent(cc.Toggle);
            if (button) {
                this._data.target.on("click", this.on_click_or_touch_start_handler, this);
            }
            else if (toggle) {
                this._data.target.on("toggle", this.on_click_or_touch_start_handler, this);
            }
            else {
                this._data.target.on(cc.Node.EventType.TOUCH_START, this.on_click_or_touch_start_handler, this);
            }
        }
    }; // end: update_view
    // @
    WeakGuide.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        if (this._data && this._data.target) {
            this._data.target.off("click", this.on_click_or_touch_start_handler, this);
            this._data.target.off("toggle", this.on_click_or_touch_start_handler, this);
            this._data.target.off(cc.Node.EventType.TOUCH_START, this.on_click_or_touch_start_handler, this);
            this._data = null;
        }
        this.unscheduleAllCallbacks(); // (cc.Component method)
    };
    // @
    WeakGuide.prototype.on_click_or_touch_start_handler = function () {
        TempData_1.TempData.task_have_hand = false;
        if (this._data && this._data.callback) {
            this._data.callback();
        }
        GameManager_1.gm.pool.put(this.node);
    };
    __decorate([
        property(cc.Animation)
    ], WeakGuide.prototype, "finger_anim", void 0);
    __decorate([
        property(cc.Node)
    ], WeakGuide.prototype, "tip_node", void 0);
    __decorate([
        property(cc.RichText)
    ], WeakGuide.prototype, "tip_txt", void 0);
    WeakGuide = __decorate([
        ccclass
    ], WeakGuide);
    return WeakGuide;
}(NodePoolItem_1.NodePoolItem));
exports.WeakGuide = WeakGuide;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFdlYWtHdWlkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSTtBQUNKLDZDQUFtQztBQUNuQywrQ0FBOEM7QUFDOUMsdUNBQXNDO0FBRWhDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQUk7QUFDSixJQUFZLFNBR1g7QUFIRCxXQUFZLFNBQVM7SUFDakIsMENBQVMsQ0FBQTtJQUNULDJDQUFTLENBQUE7QUFDYixDQUFDLEVBSFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFHcEI7QUFZRCxFQUFFO0FBRUY7SUFBK0IsNkJBQVk7SUFBM0M7UUFBQSxxRUE2RUM7UUE1RUcsRUFBRTtRQUVNLGlCQUFXLEdBQXdCLElBQUksQ0FBQyxDQUFDLHlCQUF5QjtRQUdsRSxjQUFRLEdBQW1CLElBQUksQ0FBQztRQUdoQyxhQUFPLEdBQXVCLElBQUksQ0FBQztRQUUzQyxJQUFJO1FBQ0ksV0FBSyxHQUFnQixJQUFJLENBQUM7O0lBaUV0QyxDQUFDO0lBOURHLHNCQUFXLDJCQUFJO1FBRGYsSUFBSTthQUNKO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7UUFFRCxJQUFJO2FBQ0osVUFBZ0IsS0FBVztZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQzs7O09BTkE7SUFRRCxRQUFRO0lBQ0EsK0JBQVcsR0FBbkI7UUFBQSxpQkE2QkM7UUE1QkcsbUJBQVEsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQy9CLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsS0FBSyxFQUFFLEVBQUU7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Q0ksbUJBQVEsQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBekVEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7a0RBQ3lCO0lBR2hEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7K0NBQ3NCO0lBR3hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7OENBQ3FCO0lBVGxDLFNBQVM7UUFEckIsT0FBTztPQUNLLFNBQVMsQ0E2RXJCO0lBQUQsZ0JBQUM7Q0E3RUQsQUE2RUMsQ0E3RThCLDJCQUFZLEdBNkUxQztBQTdFWSw4QkFBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgTm9kZVBvb2xJdGVtIH0gZnJvbSAnLi9Ob2RlUG9vbEl0ZW0nO1xyXG5pbXBvcnQgeyBUZW1wRGF0YSB9IGZyb20gJy4vVGVtcERhdGEnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8vIEBcclxuZXhwb3J0IGVudW0gRGlyZWN0aW9uIHtcclxuICAgIExFRlQgPSAtMSxcclxuICAgIFJJR0hUID0gMVxyXG59XHJcblxyXG4vLyBAXHJcbmludGVyZmFjZSBEYXRhIHtcclxuICAgIHRpcF9jb250ZW50OiBzdHJpbmc7XHJcbiAgICB0aXBfb2Zmc2V0OiBjYy5WZWMzO1xyXG4gICAgZGlyOiBudW1iZXI7XHJcbiAgICBkaXNhcHBlYXJfdGltZTogbnVtYmVyO1xyXG4gICAgdGFyZ2V0PzogY2MuTm9kZTtcclxuICAgIGNhbGxiYWNrPzogKCkgPT4gdm9pZDtcclxufVxyXG5cclxuLy9cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIFdlYWtHdWlkZSBleHRlbmRzIE5vZGVQb29sSXRlbSB7XHJcbiAgICAvL1xyXG4gICAgQHByb3BlcnR5KGNjLkFuaW1hdGlvbilcclxuICAgIHByaXZhdGUgZmluZ2VyX2FuaW06IGNjLkFuaW1hdGlvbiB8IG51bGwgPSBudWxsOyAvLyAocHVibGljIG1vZGUgbm90IHVzZWQpXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHRpcF9ub2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlJpY2hUZXh0KVxyXG4gICAgcHJpdmF0ZSB0aXBfdHh0OiBjYy5SaWNoVGV4dCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgX2RhdGE6IERhdGEgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGEoKTogRGF0YSB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBzZXQgZGF0YSh2YWx1ZTogRGF0YSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQCAhISFcclxuICAgIHByaXZhdGUgdXBkYXRlX3ZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgVGVtcERhdGEudGFza19oYXZlX2hhbmQgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhICYmIHRoaXMuX2RhdGEudGlwX2NvbnRlbnQgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgdGhpcy50aXBfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnRpcF9ub2RlLnBvc2l0aW9uID0gdGhpcy5fZGF0YS50aXBfb2Zmc2V0O1xyXG4gICAgICAgICAgICB0aGlzLnRpcF90eHQuc3RyaW5nID0gdGhpcy5fZGF0YS50aXBfY29udGVudDtcclxuICAgICAgICAgICAgdGhpcy50aXBfbm9kZS5zY2FsZVggPSB0aGlzLl9kYXRhLmRpcjtcclxuICAgICAgICAgICAgdGhpcy50aXBfdHh0Lm5vZGUuc2NhbGVYID0gdGhpcy5fZGF0YS5kaXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50aXBfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICBpZiAodGhpcy5fZGF0YSAmJiB0aGlzLl9kYXRhLmRpc2FwcGVhcl90aW1lID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnbS5wb29sLnB1dCh0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICB9LCB0aGlzLl9kYXRhLmRpc2FwcGVhcl90aW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICBpZiAodGhpcy5fZGF0YSAmJiB0aGlzLl9kYXRhLnRhcmdldCkge1xyXG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSB0aGlzLl9kYXRhLnRhcmdldC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKTtcclxuICAgICAgICAgICAgY29uc3QgdG9nZ2xlID0gdGhpcy5fZGF0YS50YXJnZXQuZ2V0Q29tcG9uZW50KGNjLlRvZ2dsZSk7XHJcbiAgICAgICAgICAgIGlmIChidXR0b24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEudGFyZ2V0Lm9uKFwiY2xpY2tcIiwgdGhpcy5vbl9jbGlja19vcl90b3VjaF9zdGFydF9oYW5kbGVyLCB0aGlzKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0b2dnbGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEudGFyZ2V0Lm9uKFwidG9nZ2xlXCIsIHRoaXMub25fY2xpY2tfb3JfdG91Y2hfc3RhcnRfaGFuZGxlciwgdGhpcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhLnRhcmdldC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vbl9jbGlja19vcl90b3VjaF9zdGFydF9oYW5kbGVyLCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gLy8gZW5kOiB1cGRhdGVfdmlld1xyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyB1bnVzZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci51bnVzZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhICYmIHRoaXMuX2RhdGEudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEudGFyZ2V0Lm9mZihcImNsaWNrXCIsIHRoaXMub25fY2xpY2tfb3JfdG91Y2hfc3RhcnRfaGFuZGxlciwgdGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEudGFyZ2V0Lm9mZihcInRvZ2dsZVwiLCB0aGlzLm9uX2NsaWNrX29yX3RvdWNoX3N0YXJ0X2hhbmRsZXIsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhLnRhcmdldC5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25fY2xpY2tfb3JfdG91Y2hfc3RhcnRfaGFuZGxlciwgdGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTsgLy8gKGNjLkNvbXBvbmVudCBtZXRob2QpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHJpdmF0ZSBvbl9jbGlja19vcl90b3VjaF9zdGFydF9oYW5kbGVyKCk6IHZvaWQge1xyXG4gICAgICAgIFRlbXBEYXRhLnRhc2tfaGF2ZV9oYW5kID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGEgJiYgdGhpcy5fZGF0YS5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdtLnBvb2wucHV0KHRoaXMubm9kZSk7XHJcbiAgICB9XHJcbn1cclxuIl19