"use strict";
cc._RF.push(module, '1646bqHdctOE47JZg66+CKb', 'Announcement');
// settings/scripts/Announcement.ts

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
var Announcement = /** @class */ (function (_super) {
    __extends(Announcement, _super);
    function Announcement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close_btn = null;
        _this.anywhere_close_btn = null;
        return _this;
    }
    Announcement.prototype.onEnable = function () {
        GameManager_1.gm.data.event_emitter.on(SettingsData_1.SettingsData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
        GameManager_1.gm.channel.show_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    Announcement.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off(SettingsData_1.SettingsData.EVENT_DATA_CHANGE, this.update_view, this);
        GameManager_1.gm.channel.hide_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    Announcement.prototype.update_view = function () { };
    Announcement.prototype.editor_on_button_click_handler = function (event) {
        if (!(event.target != this.close_btn.node && event.target != this.anywhere_close_btn.node)) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Announcement);
        }
    };
    __decorate([
        property(cc.Button)
    ], Announcement.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Announcement.prototype, "anywhere_close_btn", void 0);
    Announcement = __decorate([
        ccclass
    ], Announcement);
    return Announcement;
}(GameModule_1.GameModule));

cc._RF.pop();