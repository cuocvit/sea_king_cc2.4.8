
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/settings/scripts/Rename.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2V0dGluZ3NcXHNjcmlwdHNcXFJlbmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyRUFBMEU7QUFDMUUsaUVBQW1FO0FBQ25FLHVFQUFzRTtBQUN0RSxxRUFBMkQ7QUFDM0QsbUVBQWtFO0FBRTVELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXFCLDBCQUFVO0lBQS9CO1FBQUEscUVBNEVDO1FBMUVXLGVBQVMsR0FBYyxJQUFJLENBQUM7UUFHNUIsd0JBQWtCLEdBQWMsSUFBSSxDQUFDO1FBR3JDLGVBQVMsR0FBZSxJQUFJLENBQUM7UUFHN0IsYUFBTyxHQUFnQixJQUFJLENBQUM7UUFHNUIsWUFBTSxHQUFjLElBQUksQ0FBQztRQUd6QixnQkFBVSxHQUFjLElBQUksQ0FBQztRQUc3QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixpQkFBVyxHQUFhLElBQUksQ0FBQzs7SUFxRHpDLENBQUM7SUFuRGEseUJBQVEsR0FBbEI7UUFDSSxnQkFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLDJCQUFZLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsZ0JBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLCtCQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVTLDBCQUFTLEdBQW5CO1FBQ0ksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQywyQkFBWSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEYsZ0JBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxD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Q0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLDJCQUEyQixDQUFDLENBQUM7YUFDbEQ7U0FDSjthQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRTtZQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDakU7SUFDTCxDQUFDO0lBekVEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NkNBQ2dCO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7c0RBQ3lCO0lBRzdDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7NkNBQ2dCO0lBR3JDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7MkNBQ2M7SUFHcEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzswQ0FDYTtJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzhDQUNpQjtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNtQjtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytDQUNrQjtJQXZCbkMsTUFBTTtRQURYLE9BQU87T0FDRixNQUFNLENBNEVYO0lBQUQsYUFBQztDQTVFRCxBQTRFQyxDQTVFb0IsdUJBQVUsR0E0RTlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQkFOTkVSX0FEX1RZUEUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0NoYW5uZWxNYW5hZ2VyJztcclxuaW1wb3J0IHsgUmV3YXJkSWRFbnVtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBTZXR0aW5nc0RhdGEgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1NldHRpbmdzRGF0YSc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNb2R1bGUnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIFJlbmFtZSBleHRlbmRzIEdhbWVNb2R1bGUge1xyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgY2xvc2VfYnRuOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIGFueXdoZXJlX2Nsb3NlX2J0bjogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcclxuICAgIHByaXZhdGUgbmFtZV9lZGl0OiBjYy5FZGl0Qm94ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUmljaFRleHQpXHJcbiAgICBwcml2YXRlIHRpcF90eHQ6IGNjLlJpY2hUZXh0ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSBva19idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgcmFuZG9tX2J0bjogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgZGlhbW9uZF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGRpYW1vbmRfbGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5vbihTZXR0aW5nc0RhdGEuRVZFTlRfREFUQV9DSEFOR0UsIHRoaXMudXBkYXRlX3ZpZXcsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgICAgICBnbS5jaGFubmVsLnNob3dfYmFubmVyX2FkKEJBTk5FUl9BRF9UWVBFLkFMTCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub2ZmKFNldHRpbmdzRGF0YS5FVkVOVF9EQVRBX0NIQU5HRSwgdGhpcy51cGRhdGVfdmlldywgdGhpcyk7XHJcbiAgICAgICAgZ20uY2hhbm5lbC5oaWRlX2Jhbm5lcl9hZChCQU5ORVJfQURfVFlQRS5BTEwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVfdmlldygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5hbWVfZWRpdC5wbGFjZWhvbGRlckxhYmVsLnN0cmluZyA9IGdtLmRhdGEuc2VydmVyX2RhdGEubmlja25hbWU7XHJcbiAgICAgICAgdGhpcy5uYW1lX2VkaXQuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB0aGlzLnRpcF90eHQubm9kZS5hY3RpdmUgPSAwID09IGdtLmRhdGEuc2VydmVyX2RhdGEuZnJlZV9yZW5hbWU7XHJcbiAgICAgICAgdGhpcy5kaWFtb25kX25vZGUuYWN0aXZlID0gMCA8IGdtLmRhdGEuc2VydmVyX2RhdGEuZnJlZV9yZW5hbWU7XHJcbiAgICAgICAgdGhpcy5kaWFtb25kX2xibC5zdHJpbmcgPSBcInhcIiArIGdtLmNvbnN0LlJFTkFNRV9ESUFNT05EX1BSSUNFO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZWRpdG9yX29uX2J1dHRvbl9jbGlja19oYW5kbGVyKGV2ZW50OiBjYy5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5jbG9zZV9idG4ubm9kZSB8fCBldmVudC50YXJnZXQgPT0gdGhpcy5hbnl3aGVyZV9jbG9zZV9idG4ubm9kZSkge1xyXG4gICAgICAgICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5SZW5hbWUpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLm9rX2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5pY2tuYW1lID0gdGhpcy5uYW1lX2VkaXQuc3RyaW5nLnRyaW0oKVxyXG4gICAgICAgICAgICBpZiAoXCJcIiAhPSBuaWNrbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5zZXJ2ZXJfZGF0YS5yZW5hbWVfbmlja25hbWUobmlja25hbWUsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSBnbS5kYXRhLnNlcnZlcl9kYXRhLmZyZWVfcmVuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEuc2VydmVyX2RhdGEubmlja25hbWUgPSBuaWNrbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5zZXJ2ZXJfZGF0YS5mcmVlX3JlbmFtZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVDb2luRGF0YS5kaWFtb25kTnVtIDwgNTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5HRVRDT0lOT1Aua2V5LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuR0VUQ09JTk9QKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLnNlcnZlcl9kYXRhLm5pY2tuYW1lID0gbmlja25hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmRlbENlbGxJdGVtKFJld2FyZElkRW51bS5ESUFNT05ELCBnbS5jb25zdC5SRU5BTUVfRElBTU9ORF9QUklDRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKFwiVGhheSDEkeG7lWkgdMOqbiB0aMOgbmggY8O0bmchIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLnNldHRpbmdzX2RhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgICAgICAgICAgICAgICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5SZW5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKFwiVMOqbiBraMO0bmcgxJHGsOG7o2MgxJHhu4MgdHLhu5FuZyEhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5yYW5kb21fYnRuLm5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5uYW1lX2VkaXQuc3RyaW5nID0gZ20uZGF0YS5zZXJ2ZXJfZGF0YS5yYW5kb21fbmlja25hbWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=