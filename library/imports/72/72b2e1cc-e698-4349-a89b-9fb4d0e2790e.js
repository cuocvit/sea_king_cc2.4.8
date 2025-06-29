"use strict";
cc._RF.push(module, '72b2eHM5phDSaibn7TQ4nkO', 'MoreEntry');
// start-scene/scripts/MoreEntry.ts

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
exports.MoreEntry = void 0;
// +-+
var NodePoolItem_1 = require("./NodePoolItem");
var Constants_1 = require("./Constants");
var SettingsData_1 = require("./SettingsData");
var SignData_1 = require("./SignData");
var GameManager_1 = require("./GameManager");
var SettingsEntry_1 = require("./SettingsEntry");
var SignEntry_1 = require("./SignEntry");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MoreEntry = /** @class */ (function (_super) {
    __extends(MoreEntry, _super);
    function MoreEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.entry_btn = null;
        _this.more_btn = null;
        _this.more_red_node = null;
        _this.mail_node = null;
        _this.settings_node = null;
        _this.close_btn = null;
        _this.extend_node = null;
        _this.sign_node = null;
        return _this;
    }
    MoreEntry.prototype.onEnable = function () {
        this.extend_node.active = false;
        this.node.x = 0;
        this.node.y = 0;
        this.show_settings_entry();
        GameManager_1.gm.data.event_emitter.on(SignData_1.SignData.EVENT_DATA_CHANGE, this.update_red_view, this);
        GameManager_1.gm.data.event_emitter.on(SettingsData_1.SettingsData.EVENT_DATA_CHANGE, this.update_red_view, this);
    };
    MoreEntry.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off(SignData_1.SignData.EVENT_DATA_CHANGE, this.update_red_view, this);
        GameManager_1.gm.data.event_emitter.off(SettingsData_1.SettingsData.EVENT_DATA_CHANGE, this.update_red_view, this);
    };
    MoreEntry.prototype.update_red_view = function () {
        var isFreeRename = GameManager_1.gm.data.server_data.free_rename == 0;
        this.more_red_node.active = isFreeRename;
    };
    MoreEntry.prototype.show_settings_entry = function () {
        var _this = this;
        var _a;
        if (((_a = this.settings_node) === null || _a === void 0 ? void 0 : _a.childrenCount) == 0) {
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.SETTINGS, "prefabs/settings_entry", SettingsEntry_1.SettingsEntry, function (item) {
                var _a;
                if (!item)
                    return;
                if (((_a = _this.settings_node) === null || _a === void 0 ? void 0 : _a.childrenCount) == 0) {
                    _this.settings_node.addChild(item.node);
                }
                else {
                    GameManager_1.gm.pool.put(item.node);
                }
            });
        }
    };
    MoreEntry.prototype.show_sign_entry = function () {
        var _this = this;
        var _a;
        if (((_a = this.sign_node) === null || _a === void 0 ? void 0 : _a.childrenCount) == 0) {
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.SIGN, "prefabs/sign_entry", SignEntry_1.SignEntry, function (item) {
                var _a;
                if (!item)
                    return;
                if (((_a = _this.sign_node) === null || _a === void 0 ? void 0 : _a.childrenCount) == 0) {
                    _this.sign_node.addChild(item.node);
                }
                else {
                    GameManager_1.gm.pool.put(item.node);
                }
            });
        }
    };
    MoreEntry.prototype.editor_on_button_click_handler = function (event) {
        var _a, _b;
        if (event.target == this.entry_btn.node) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.Ladder);
        }
        else if (event.target == ((_a = this.more_btn) === null || _a === void 0 ? void 0 : _a.node)) {
            this.extend_node.active = !this.extend_node.active;
        }
        else if (event.target == ((_b = this.close_btn) === null || _b === void 0 ? void 0 : _b.node)) {
            this.extend_node.active = false;
        }
    };
    __decorate([
        property(cc.Button)
    ], MoreEntry.prototype, "entry_btn", void 0);
    __decorate([
        property(cc.Button)
    ], MoreEntry.prototype, "more_btn", void 0);
    __decorate([
        property(cc.Node)
    ], MoreEntry.prototype, "more_red_node", void 0);
    __decorate([
        property(cc.Node)
    ], MoreEntry.prototype, "mail_node", void 0);
    __decorate([
        property(cc.Node)
    ], MoreEntry.prototype, "settings_node", void 0);
    __decorate([
        property(cc.Button)
    ], MoreEntry.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Node)
    ], MoreEntry.prototype, "extend_node", void 0);
    __decorate([
        property(cc.Node)
    ], MoreEntry.prototype, "sign_node", void 0);
    MoreEntry = __decorate([
        ccclass
    ], MoreEntry);
    return MoreEntry;
}(NodePoolItem_1.NodePoolItem));
exports.MoreEntry = MoreEntry;

cc._RF.pop();