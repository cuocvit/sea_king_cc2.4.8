"use strict";
cc._RF.push(module, '9bcf6JnjwVOg6zfAieE01m1', 'MailInboxItem');
// mail/scripts/MailInboxItem.ts

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
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var ListViewItem_1 = require("../../start-scene/scripts/ListViewItem");
var Utils_1 = require("../../start-scene/scripts/Utils");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MailInboxItem = /** @class */ (function (_super) {
    __extends(MailInboxItem, _super);
    function MailInboxItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.open_btn = null;
        _this.icon_spr = null;
        _this.title_lbl = null;
        _this.content_lbl = null;
        _this.unread_node = null;
        _this.read_node = null;
        return _this;
    }
    Object.defineProperty(MailInboxItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            this.update_view();
        },
        enumerable: false,
        configurable: true
    });
    MailInboxItem.prototype.update_view = function () {
        this.title_lbl.string = this._data.mail_title;
        this.content_lbl.string = this._data.mail_text;
        this.unread_node.active = this._data.op_status == 0;
        this.read_node.active = this._data.op_status == 1;
        Utils_1.Utils.async_set_sprite_frame(this.icon_spr, Constants_1.BundleName.MAIL, "res/icon_" + this._data.mail_type);
    };
    MailInboxItem.prototype.reset = function () {
        this.title_lbl.string = "";
        this.content_lbl.string = "";
        this.unread_node.active = false;
        this.read_node.active = false;
        this.icon_spr.spriteFrame = null;
    };
    MailInboxItem.prototype.editor_on_button_click_handler = function (event) {
        var _this = this;
        if (event.target == this.open_btn.node) {
            if (0 == this._data.op_status) {
                var serverData = GameManager_1.gm.data.server_data;
                var requestData = {
                    uid: serverData.uid,
                    token: serverData.token,
                    mail_id: this._data.mail_id,
                    op_status: 1,
                    reward_status: 0
                };
                serverData.op_player_email(function (response) {
                    if (0 == response.ResultCode) {
                        _this._data.op_status = 1;
                        _this.update_view();
                        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.MailDetails.key, {
                            data: _this._data
                        });
                        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.MailDetails);
                    }
                }, requestData);
            }
            else {
                GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.MailDetails.key, {
                    data: this._data
                });
                GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.MailDetails);
            }
        }
    };
    __decorate([
        property(cc.Button)
    ], MailInboxItem.prototype, "open_btn", void 0);
    __decorate([
        property(cc.Sprite)
    ], MailInboxItem.prototype, "icon_spr", void 0);
    __decorate([
        property(cc.Label)
    ], MailInboxItem.prototype, "title_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], MailInboxItem.prototype, "content_lbl", void 0);
    __decorate([
        property(cc.Node)
    ], MailInboxItem.prototype, "unread_node", void 0);
    __decorate([
        property(cc.Node)
    ], MailInboxItem.prototype, "read_node", void 0);
    MailInboxItem = __decorate([
        ccclass
    ], MailInboxItem);
    return MailInboxItem;
}(ListViewItem_1.ListViewItem));

cc._RF.pop();