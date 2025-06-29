"use strict";
cc._RF.push(module, 'e70d1Tdb6FHMKBZN24RZdwM', 'LuckyWheelEntry');
// start-scene/scripts/LuckyWheelEntry.ts

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
exports.LuckyWheelEntry = void 0;
// +-+
var LuckyWheelData_1 = require("./LuckyWheelData");
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LuckyWheelEntry = /** @class */ (function (_super) {
    __extends(LuckyWheelEntry, _super);
    function LuckyWheelEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lucky_wheel_btn = null;
        _this.red_point_node = null;
        return _this;
    }
    LuckyWheelEntry.prototype.onEnable = function () {
        GameManager_1.gm.data.event_emitter.on(LuckyWheelData_1.LuckyWheelData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
    };
    LuckyWheelEntry.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off(LuckyWheelData_1.LuckyWheelData.EVENT_DATA_CHANGE, this.update_view, this);
    };
    LuckyWheelEntry.prototype.update_view = function () {
        this.red_point_node.active = GameManager_1.gm.data.lucky_wheel_data.left_lucky_wheel_video_count > 0;
    };
    LuckyWheelEntry.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.lucky_wheel_btn.node) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.LuckyWheel);
        }
    };
    __decorate([
        property(cc.Button)
    ], LuckyWheelEntry.prototype, "lucky_wheel_btn", void 0);
    __decorate([
        property(cc.Node)
    ], LuckyWheelEntry.prototype, "red_point_node", void 0);
    LuckyWheelEntry = __decorate([
        ccclass
    ], LuckyWheelEntry);
    return LuckyWheelEntry;
}(NodePoolItem_1.NodePoolItem));
exports.LuckyWheelEntry = LuckyWheelEntry;

cc._RF.pop();