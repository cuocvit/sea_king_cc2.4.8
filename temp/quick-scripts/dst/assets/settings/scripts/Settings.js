
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/settings/scripts/Settings.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2V0dGluZ3NcXHNjcmlwdHNcXFNldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJFQUEwRjtBQUMxRix1RUFBc0U7QUFDdEUscUVBQTJEO0FBQzNELG1FQUFrRTtBQUU1RCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF1Qiw0QkFBVTtJQUFqQztRQUFBLHFFQXNIQztRQXBIVyxlQUFTLEdBQWMsSUFBSSxDQUFDO1FBRzVCLHdCQUFrQixHQUFjLElBQUksQ0FBQztRQUdyQyxjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRzdCLHFCQUFlLEdBQVksSUFBSSxDQUFDO1FBR2hDLG1CQUFhLEdBQWEsSUFBSSxDQUFDO1FBRy9CLGFBQU8sR0FBYSxJQUFJLENBQUM7UUFHekIsMEJBQW9CLEdBQWMsSUFBSSxDQUFDO1FBR3ZDLGNBQVEsR0FBYyxJQUFJLENBQUM7UUFHM0IsWUFBTSxHQUFhLElBQUksQ0FBQztRQUd4QixpQkFBVyxHQUFhLElBQUksQ0FBQztRQUc3Qix3QkFBa0IsR0FBYyxJQUFJLENBQUM7UUFHckMsd0JBQWtCLEdBQWMsSUFBSSxDQUFDO1FBR3JDLHNCQUFnQixHQUFjLElBQUksQ0FBQzs7SUE2RS9DLENBQUM7SUEzRWEsMkJBQVEsR0FBbEI7UUFDSSxnQkFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLDJCQUFZLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsZ0JBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLCtCQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJ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Q0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzRDQUNhO0lBR2hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7aURBQ2tCO0lBR3JDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7d0RBQ3lCO0lBRzdDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7d0RBQ3lCO0lBRzdDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7c0RBQ3VCO0lBekN6QyxRQUFRO1FBRGIsT0FBTztPQUNGLFFBQVEsQ0FzSGI7SUFBRCxlQUFDO0NBdEhELEFBc0hDLENBdEhzQix1QkFBVSxHQXNIaEMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFubmVsTWFuYWdlciwgQkFOTkVSX0FEX1RZUEUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0NoYW5uZWxNYW5hZ2VyJztcclxuaW1wb3J0IHsgU2V0dGluZ3NEYXRhIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9TZXR0aW5nc0RhdGEnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTW9kdWxlJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBTZXR0aW5ncyBleHRlbmRzIEdhbWVNb2R1bGUge1xyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgY2xvc2VfYnRuOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIGFueXdoZXJlX2Nsb3NlX2J0bjogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIG5hbWVfbGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgcmVuYW1lX2J0bjogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgcmVuYW1lX3JlZF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGRldmljZV9pZF9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIHVpZF9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSBjbGVhcl93YXJlX2hvdXNlX2J0bjogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSBjb3B5X2J0bjogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGNwX2xibDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgdmVyc2lvbl9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSB1c2VyX2FncmVlbWVudF9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgcHJpdmFjeV9wb2xpY3lfYnRuOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIGFubm91bmNlbWVudF9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5vbihTZXR0aW5nc0RhdGEuRVZFTlRfREFUQV9DSEFOR0UsIHRoaXMudXBkYXRlX3ZpZXcsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgICAgICBnbS5jaGFubmVsLnNob3dfYmFubmVyX2FkKEJBTk5FUl9BRF9UWVBFLkFMTCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub2ZmKFNldHRpbmdzRGF0YS5FVkVOVF9EQVRBX0NIQU5HRSwgdGhpcy51cGRhdGVfdmlldywgdGhpcyk7XHJcbiAgICAgICAgZ20uY2hhbm5lbC5oaWRlX2Jhbm5lcl9hZChCQU5ORVJfQURfVFlQRS5BTEwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVfdmlldygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5hbWVfbGJsLnN0cmluZyA9IGdtLmRhdGEuc2VydmVyX2RhdGEubmlja25hbWUgfHwgZ20uZGF0YS5zZXJ2ZXJfZGF0YS51aWQ7XHJcbiAgICAgICAgdGhpcy5kZXZpY2VfaWRfbGJsLnN0cmluZyA9IGdtLmNoYW5uZWwuZ2V0X2RldmljZV9pZCgpO1xyXG4gICAgICAgIHRoaXMudWlkX2xibC5zdHJpbmcgPSBnbS5kYXRhLnNlcnZlcl9kYXRhLnVpZDtcclxuICAgICAgICB0aGlzLmNwX2xibC5zdHJpbmcgPSBcIk5ow6AgcGjDoXQgdHJp4buDbjogREVGSVggTkVUV09SS1wiO1xyXG4gICAgICAgIHRoaXMudmVyc2lvbl9sYmwuc3RyaW5nID0gXCJQaGnDqm4gYuG6o27vvJp2XCIgKyBnbS5jaGFubmVsLmdldF92ZXJzaW9uX25hbWUoKSArIFwiX1wiICsgZ20uY2hhbm5lbC5nZXRfdmVyc2lvbl9jb2RlKCk7XHJcbiAgICAgICAgdGhpcy5yZW5hbWVfcmVkX25vZGUuYWN0aXZlID0gMCA9PSBnbS5kYXRhLnNlcnZlcl9kYXRhLmZyZWVfcmVuYW1lO1xyXG5cclxuICAgICAgICBjb25zdCBjaGFubmVsTmFtZSA9IGdtLmNoYW5uZWwuZ2V0X2NoYW5uZWxfbmFtZSgpO1xyXG4gICAgICAgIGlmIChjaGFubmVsTmFtZSA9PSBDaGFubmVsTWFuYWdlci5UQVBfVEFQX0dBTUUgfHxcclxuICAgICAgICAgICAgY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuT0hBWU9PX0dBTUUgfHxcclxuICAgICAgICAgICAgY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuTU9NT1lVX0dBTUUgfHxcclxuICAgICAgICAgICAgY2hhbm5lbE5hbWUgPT0gQ2hhbm5lbE1hbmFnZXIuS0VfU0hFTkdfR0FNRSkge1xyXG4gICAgICAgICAgICB0aGlzLnByaXZhY3lfcG9saWN5X2J0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudXNlcl9hZ3JlZW1lbnRfYnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jb3B5X2J0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wcml2YWN5X3BvbGljeV9idG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy51c2VyX2FncmVlbWVudF9idG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jb3B5X2J0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVkaXRvcl9vbl9idXR0b25fY2xpY2tfaGFuZGxlcihldmVudDogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMuY2xvc2VfYnRuLm5vZGUgfHwgZXZlbnQudGFyZ2V0ID09IHRoaXMuYW55d2hlcmVfY2xvc2VfYnRuLm5vZGUpIHtcclxuICAgICAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuU2V0dGluZ3MpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLnVzZXJfYWdyZWVtZW50X2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIGlmIChnbS5jaGFubmVsLmdldF9jaGFubmVsX25hbWUoKSA9PSBDaGFubmVsTWFuYWdlci5PSEFZT09fR0FNRSkge1xyXG4gICAgICAgICAgICAgICAgY2Muc3lzLm9wZW5VUkwoXCJodHRwczovL3pqc21zLmNvbS9lZkNmNWMzL1wiKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIShnbS5jaGFubmVsLmdldF9jaGFubmVsX25hbWUoKSAhPSBDaGFubmVsTWFuYWdlci5UQVBfVEFQX0dBTUUgJiZcclxuICAgICAgICAgICAgICAgIGdtLmNoYW5uZWwuZ2V0X2NoYW5uZWxfbmFtZSgpICE9IENoYW5uZWxNYW5hZ2VyLk1PTU9ZVV9HQU1FICYmXHJcbiAgICAgICAgICAgICAgICBnbS5jaGFubmVsLmdldF9jaGFubmVsX25hbWUoKSAhPSBDaGFubmVsTWFuYWdlci5LRV9TSEVOR19HQU1FKSkge1xyXG4gICAgICAgICAgICAgICAgY2Muc3lzLm9wZW5VUkwoXCJodHRwczovL2NkbnJlcy5xc3poZy42aHdhbi5jb20vc2FpbGluZy9yZW1vdGUvdXNlcl9hZ3JlZW1lbnQuaHRtbFwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLnByaXZhY3lfcG9saWN5X2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIGlmIChnbS5jaGFubmVsLmdldF9jaGFubmVsX25hbWUoKSA9PSBDaGFubmVsTWFuYWdlci5PSEFZT09fR0FNRSkge1xyXG4gICAgICAgICAgICAgICAgY2Muc3lzLm9wZW5VUkwoXCJodHRwczovL3pqc21zLmNvbS9lZmhGVFVUL1wiKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIShnbS5jaGFubmVsLmdldF9jaGFubmVsX25hbWUoKSAhPSBDaGFubmVsTWFuYWdlci5UQVBfVEFQX0dBTUUgJiZcclxuICAgICAgICAgICAgICAgIGdtLmNoYW5uZWwuZ2V0X2NoYW5uZWxfbmFtZSgpICE9IENoYW5uZWxNYW5hZ2VyLk1PTU9ZVV9HQU1FICYmXHJcbiAgICAgICAgICAgICAgICBnbS5jaGFubmVsLmdldF9jaGFubmVsX25hbWUoKSAhPSBDaGFubmVsTWFuYWdlci5LRV9TSEVOR19HQU1FKSkge1xyXG4gICAgICAgICAgICAgICAgY2Muc3lzLm9wZW5VUkwoXCJodHRwczovL2NkbnJlcy5xc3poZy42aHdhbi5jb20vc2FpbGluZy9yZW1vdGUvcHJpdmFjeV9hZ3JlZW1lbnQuaHRtbFwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLmNsZWFyX3dhcmVfaG91c2VfYnRuLm5vZGUpIHtcclxuICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuY2xlYXJXYXJlSG91c2VMaXN0KCk7XHJcbiAgICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKFwiQ2FiaW4gxJHDoyDEkcaw4bujYyBk4buNbiBz4bqhY2ghISFcIik7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMuY29weV9idG4ubm9kZSkge1xyXG4gICAgICAgICAgICBjb25zdCBkZXZpY2VJRCA9IHRoaXMuZGV2aWNlX2lkX2xibC5zdHJpbmcudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoXCJcIiAhPSBkZXZpY2VJRCkge1xyXG4gICAgICAgICAgICAgICAgZ20uY2hhbm5lbC5jb3B5X3RvX2NsaXBib2FyZChkZXZpY2VJRCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5yZW5hbWVfYnRuLm5vZGUpIHtcclxuICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuUmVuYW1lKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5hbm5vdW5jZW1lbnRfYnRuLm5vZGUpIHtcclxuICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuQW5ub3VuY2VtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19