"use strict";
cc._RF.push(module, '266baOnyXFNO42+6F7sRDEb', 'DebugEntry');
// start-scene/scripts/DebugEntry.ts

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
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DebugEntry = /** @class */ (function (_super) {
    __extends(DebugEntry, _super);
    function DebugEntry() {
        var _this = _super.call(this) || this;
        _this._touch_start_position = cc.Vec3.ZERO;
        _this._touch_start_timestamp = 0;
        return _this;
    }
    DebugEntry.prototype.onLoad = function () {
        GameManager_1.gm.data.catch_error_log();
    };
    DebugEntry.prototype.onEnable = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.on_touch_start_handler, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move_handler, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
    };
    DebugEntry.prototype.onDisable = function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.on_touch_start_handler, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move_handler, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
    };
    DebugEntry.prototype.on_touch_move_handler = function (event) {
        this.node.y += event.getDelta().y;
        this.node.x += event.getDelta().x;
    };
    DebugEntry.prototype.on_touch_start_handler = function () {
        this._touch_start_position = this.node.position;
        this._touch_start_timestamp = Date.now();
    };
    DebugEntry.prototype.on_touch_end_handler = function () {
        if (Date.now() - this._touch_start_timestamp < 200) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.Debug);
        }
    };
    DebugEntry = __decorate([
        ccclass
    ], DebugEntry);
    return DebugEntry;
}(NodePoolItem_1.NodePoolItem));
exports.default = DebugEntry;

cc._RF.pop();