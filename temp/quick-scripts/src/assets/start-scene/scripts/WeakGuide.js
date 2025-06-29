"use strict";
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