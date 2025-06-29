"use strict";
cc._RF.push(module, 'b589e0df7dE54byj8nDfmKv', 'Rename');
// settings/scripts/Rename.ts

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
var Constants_1 = require("../../start-scene/scripts/Constants");
var SettingsData_1 = require("../../start-scene/scripts/SettingsData");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Rename = /** @class */ (function (_super) {
    __extends(Rename, _super);
    function Rename() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close_btn = null;
        _this.anywhere_close_btn = null;
        _this.name_edit = null;
        _this.tip_txt = null;
        _this.ok_btn = null;
        _this.random_btn = null;
        _this.diamond_node = null;
        _this.diamond_lbl = null;
        return _this;
    }
    Rename.prototype.onEnable = function () {
        GameManager_1.gm.data.event_emitter.on(SettingsData_1.SettingsData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
        GameManager_1.gm.channel.show_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    Rename.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off(SettingsData_1.SettingsData.EVENT_DATA_CHANGE, this.update_view, this);
        GameManager_1.gm.channel.hide_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    Rename.prototype.update_view = function () {
        this.name_edit.placeholderLabel.string = GameManager_1.gm.data.server_data.nickname;
        this.name_edit.string = "";
        this.tip_txt.node.active = 0 == GameManager_1.gm.data.server_data.free_rename;
        this.diamond_node.active = 0 < GameManager_1.gm.data.server_data.free_rename;
        this.diamond_lbl.string = "x" + GameManager_1.gm.const.RENAME_DIAMOND_PRICE;
    };
    Rename.prototype.editor_on_button_click_handler = function (event) {
        var _this = this;
        if (event.target == this.close_btn.node || event.target == this.anywhere_close_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Rename);
        }
        else if (event.target == this.ok_btn.node) {
            var nickname_1 = this.name_edit.string.trim();
            if ("" != nickname_1) {
                GameManager_1.gm.data.server_data.rename_nickname(nickname_1, function () {
                    if (0 == GameManager_1.gm.data.server_data.free_rename) {
                        GameManager_1.gm.data.server_data.nickname = nickname_1;
                        GameManager_1.gm.data.server_data.free_rename = 1;
                    }
                    else {
                        if (GameManager_1.gm.data.mapCell_data.roleCoinData.diamondNum < 50) {
                            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETCOINOP.key, true);
                            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.GETCOINOP);
                            return;
                        }
                        GameManager_1.gm.data.server_data.nickname = nickname_1;
                        GameManager_1.gm.data.mapCell_data.delCellItem(Constants_1.RewardIdEnum.DIAMOND, GameManager_1.gm.const.RENAME_DIAMOND_PRICE);
                    }
                    GameManager_1.gm.ui.show_notice("Thay đổi tên thành công!!");
                    GameManager_1.gm.data.settings_data.async_write_data();
                    _this.update_view();
                    GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Rename);
                });
            }
            else {
                GameManager_1.gm.ui.show_notice("Tên không được để trống!!");
            }
        }
        else if (event.target == this.random_btn.node) {
            this.name_edit.string = GameManager_1.gm.data.server_data.random_nickname();
        }
    };
    __decorate([
        property(cc.Button)
    ], Rename.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Rename.prototype, "anywhere_close_btn", void 0);
    __decorate([
        property(cc.EditBox)
    ], Rename.prototype, "name_edit", void 0);
    __decorate([
        property(cc.RichText)
    ], Rename.prototype, "tip_txt", void 0);
    __decorate([
        property(cc.Button)
    ], Rename.prototype, "ok_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Rename.prototype, "random_btn", void 0);
    __decorate([
        property(cc.Node)
    ], Rename.prototype, "diamond_node", void 0);
    __decorate([
        property(cc.Label)
    ], Rename.prototype, "diamond_lbl", void 0);
    Rename = __decorate([
        ccclass
    ], Rename);
    return Rename;
}(GameModule_1.GameModule));

cc._RF.pop();