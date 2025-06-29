"use strict";
cc._RF.push(module, '5f4bf9+CBFNnYr+ZApa3Yt7', 'SettingsEntry');
// start-scene/scripts/SettingsEntry.ts

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
exports.SettingsEntry = void 0;
// +-+
var SettingsData_1 = require("./SettingsData");
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SettingsEntry = /** @class */ (function (_super) {
    __extends(SettingsEntry, _super);
    function SettingsEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.settings_btn = null;
        _this.red_point_node = null;
        return _this;
    }
    SettingsEntry.prototype.onEnable = function () {
        GameManager_1.gm.data.event_emitter.on(SettingsData_1.SettingsData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
    };
    SettingsEntry.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off(SettingsData_1.SettingsData.EVENT_DATA_CHANGE, this.update_view, this);
    };
    SettingsEntry.prototype.update_view = function () {
        this.red_point_node.active = GameManager_1.gm.data.server_data.free_rename === 0;
    };
    SettingsEntry.prototype.editor_on_button_click_handler = function (event) {
        var _a;
        if (event.target === ((_a = this.settings_btn) === null || _a === void 0 ? void 0 : _a.node)) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.Settings);
        }
    };
    __decorate([
        property(cc.Button)
    ], SettingsEntry.prototype, "settings_btn", void 0);
    __decorate([
        property(cc.Node)
    ], SettingsEntry.prototype, "red_point_node", void 0);
    SettingsEntry = __decorate([
        ccclass
    ], SettingsEntry);
    return SettingsEntry;
}(NodePoolItem_1.NodePoolItem));
exports.SettingsEntry = SettingsEntry;

cc._RF.pop();