"use strict";
cc._RF.push(module, 'b8eaboe91REoY/H2ycmhJNz', 'Settings');
// settings/scripts/Settings.ts

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
var ChannelManager_1 = require("../../start-scene/scripts/ChannelManager");
var SettingsData_1 = require("../../start-scene/scripts/SettingsData");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Settings = /** @class */ (function (_super) {
    __extends(Settings, _super);
    function Settings() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close_btn = null;
        _this.anywhere_close_btn = null;
        _this.name_lbl = null;
        _this.rename_btn = null;
        _this.rename_red_node = null;
        _this.device_id_lbl = null;
        _this.uid_lbl = null;
        _this.clear_ware_house_btn = null;
        _this.copy_btn = null;
        _this.cp_lbl = null;
        _this.version_lbl = null;
        _this.user_agreement_btn = null;
        _this.privacy_policy_btn = null;
        _this.announcement_btn = null;
        return _this;
    }
    Settings.prototype.onEnable = function () {
        GameManager_1.gm.data.event_emitter.on(SettingsData_1.SettingsData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
        GameManager_1.gm.channel.show_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    Settings.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off(SettingsData_1.SettingsData.EVENT_DATA_CHANGE, this.update_view, this);
        GameManager_1.gm.channel.hide_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    Settings.prototype.update_view = function () {
        this.name_lbl.string = GameManager_1.gm.data.server_data.nickname || GameManager_1.gm.data.server_data.uid;
        this.device_id_lbl.string = GameManager_1.gm.channel.get_device_id();
        this.uid_lbl.string = GameManager_1.gm.data.server_data.uid;
        this.cp_lbl.string = "Nhà phát triển: DEFIX NETWORK";
        this.version_lbl.string = "Phiên bản：v" + GameManager_1.gm.channel.get_version_name() + "_" + GameManager_1.gm.channel.get_version_code();
        this.rename_red_node.active = 0 == GameManager_1.gm.data.server_data.free_rename;
        var channelName = GameManager_1.gm.channel.get_channel_name();
        if (channelName == ChannelManager_1.ChannelManager.TAP_TAP_GAME ||
            channelName == ChannelManager_1.ChannelManager.OHAYOO_GAME ||
            channelName == ChannelManager_1.ChannelManager.MOMOYU_GAME ||
            channelName == ChannelManager_1.ChannelManager.KE_SHENG_GAME) {
            this.privacy_policy_btn.node.active = true;
            this.user_agreement_btn.node.active = true;
            this.copy_btn.node.active = true;
        }
        else {
            this.privacy_policy_btn.node.active = false;
            this.user_agreement_btn.node.active = false;
            this.copy_btn.node.active = false;
        }
    };
    Settings.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.close_btn.node || event.target == this.anywhere_close_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Settings);
        }
        else if (event.target == this.user_agreement_btn.node) {
            if (GameManager_1.gm.channel.get_channel_name() == ChannelManager_1.ChannelManager.OHAYOO_GAME) {
                cc.sys.openURL("https://zjsms.com/efCf5c3/");
            }
            else if (!(GameManager_1.gm.channel.get_channel_name() != ChannelManager_1.ChannelManager.TAP_TAP_GAME &&
                GameManager_1.gm.channel.get_channel_name() != ChannelManager_1.ChannelManager.MOMOYU_GAME &&
                GameManager_1.gm.channel.get_channel_name() != ChannelManager_1.ChannelManager.KE_SHENG_GAME)) {
                cc.sys.openURL("https://cdnres.qszhg.6hwan.com/sailing/remote/user_agreement.html");
            }
        }
        else if (event.target == this.privacy_policy_btn.node) {
            if (GameManager_1.gm.channel.get_channel_name() == ChannelManager_1.ChannelManager.OHAYOO_GAME) {
                cc.sys.openURL("https://zjsms.com/efhFTUT/");
            }
            else if (!(GameManager_1.gm.channel.get_channel_name() != ChannelManager_1.ChannelManager.TAP_TAP_GAME &&
                GameManager_1.gm.channel.get_channel_name() != ChannelManager_1.ChannelManager.MOMOYU_GAME &&
                GameManager_1.gm.channel.get_channel_name() != ChannelManager_1.ChannelManager.KE_SHENG_GAME)) {
                cc.sys.openURL("https://cdnres.qszhg.6hwan.com/sailing/remote/privacy_agreement.html");
            }
        }
        else if (event.target == this.clear_ware_house_btn.node) {
            GameManager_1.gm.data.mapCell_data.clearWareHouseList();
            GameManager_1.gm.ui.show_notice("Cabin đã được dọn sạch!!!");
        }
        else if (event.target == this.copy_btn.node) {
            var deviceID = this.device_id_lbl.string.trim();
            if ("" != deviceID) {
                GameManager_1.gm.channel.copy_to_clipboard(deviceID);
            }
        }
        else if (event.target == this.rename_btn.node) {
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.Rename);
        }
        else if (event.target == this.announcement_btn.node) {
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.Announcement);
        }
    };
    __decorate([
        property(cc.Button)
    ], Settings.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Settings.prototype, "anywhere_close_btn", void 0);
    __decorate([
        property(cc.Label)
    ], Settings.prototype, "name_lbl", void 0);
    __decorate([
        property(cc.Button)
    ], Settings.prototype, "rename_btn", void 0);
    __decorate([
        property(cc.Node)
    ], Settings.prototype, "rename_red_node", void 0);
    __decorate([
        property(cc.Label)
    ], Settings.prototype, "device_id_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], Settings.prototype, "uid_lbl", void 0);
    __decorate([
        property(cc.Button)
    ], Settings.prototype, "clear_ware_house_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Settings.prototype, "copy_btn", void 0);
    __decorate([
        property(cc.Label)
    ], Settings.prototype, "cp_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], Settings.prototype, "version_lbl", void 0);
    __decorate([
        property(cc.Button)
    ], Settings.prototype, "user_agreement_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Settings.prototype, "privacy_policy_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Settings.prototype, "announcement_btn", void 0);
    Settings = __decorate([
        ccclass
    ], Settings);
    return Settings;
}(GameModule_1.GameModule));

cc._RF.pop();