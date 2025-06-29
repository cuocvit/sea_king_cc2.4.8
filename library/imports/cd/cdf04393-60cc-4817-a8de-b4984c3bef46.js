"use strict";
cc._RF.push(module, 'cdf04OTYMxIF6jetJhMO+9G', 'SignEntry');
// start-scene/scripts/SignEntry.ts

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
exports.SignEntry = void 0;
// +-+
var SignData_1 = require("./SignData");
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SignEntry = /** @class */ (function (_super) {
    __extends(SignEntry, _super);
    function SignEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sign_btn = null;
        _this.red_point_node = null;
        return _this;
    }
    SignEntry.prototype.onEnable = function () {
        GameManager_1.gm.data.event_emitter.on(SignData_1.SignData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
    };
    SignEntry.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off(SignData_1.SignData.EVENT_DATA_CHANGE, this.update_view, this);
    };
    SignEntry.prototype.update_view = function () {
        var signData = GameManager_1.gm.data.sign_data;
        this.red_point_node.active =
            signData.sign_state < 3 ||
                signData.sign_buy_data_array[0].state < 2;
    };
    SignEntry.prototype.editor_on_button_click_handler = function (event) {
        var _a;
        if (event.target === ((_a = this.sign_btn) === null || _a === void 0 ? void 0 : _a.node)) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.Sign);
        }
    };
    __decorate([
        property(cc.Button)
    ], SignEntry.prototype, "sign_btn", void 0);
    __decorate([
        property(cc.Node)
    ], SignEntry.prototype, "red_point_node", void 0);
    SignEntry = __decorate([
        ccclass
    ], SignEntry);
    return SignEntry;
}(NodePoolItem_1.NodePoolItem));
exports.SignEntry = SignEntry;

cc._RF.pop();