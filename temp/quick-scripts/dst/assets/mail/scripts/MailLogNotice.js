
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/mail/scripts/MailLogNotice.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5ad66Ay3tFNXq65/tmNOOMR', 'MailLogNotice');
// mail/scripts/MailLogNotice.ts

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
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var ListView_1 = require("../../start-scene/scripts/ListView");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MailLogNotice = /** @class */ (function (_super) {
    __extends(MailLogNotice, _super);
    function MailLogNotice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close_btn = null;
        _this.anywhere_close_btn = null;
        _this.fail_ok_btn = null;
        _this.success_ok_btn = null;
        _this.revenge_btn = null;
        _this.enemy_name_lbl = null;
        _this.enemy_star_lbl = null;
        _this.mail_hero_list = null;
        _this.mail_log_reward_list = null;
        _this.star_lbl = null;
        _this.star_change_lbl = null;
        _this.success_node = null;
        _this.fail_node = null;
        return _this;
    }
    MailLogNotice.prototype.onEnable = function () {
        var _this = this;
        GameManager_1.gm.data.get_player_fight_log_data("1", function () {
            _this._data = GameManager_1.gm.data.mail_temp_data.mail_defense_log_data_array[0];
            _this.update_view();
        });
    };
    MailLogNotice.prototype.onDisable = function () { };
    MailLogNotice.prototype.update_view = function () {
        var data = this._data;
        if (data) {
            this.enemy_name_lbl.string = data.target_nickname;
            this.enemy_star_lbl.string = Math.max(0, data.target_change_star + data.target_star) + "";
            this.star_lbl.string = Math.max(0, data.star + data.change_star) + "";
            this.star_change_lbl.string = (0 < data.change_star ? "+" : "") + data.change_star;
            if ("1" == data.op_type) {
                if (1 == data.op_result) {
                    this.success_node.active = true;
                    this.fail_node.active = false;
                    this.mail_log_reward_list.node.active = false;
                    this.revenge_btn.node.active = false;
                    this.success_ok_btn.node.active = true;
                    this.fail_ok_btn.node.active = false;
                }
                else {
                    this.success_node.active = false;
                    this.fail_node.active = true;
                    this.mail_log_reward_list.node.active = true;
                    this.mail_log_reward_list.setData(data.op_loss_reward);
                    this.revenge_btn.node.active = true;
                    this.success_ok_btn.node.active = false;
                    this.fail_ok_btn.node.active = true;
                }
            }
            this.mail_hero_list.setData(data.target_op_battle);
        }
    };
    MailLogNotice.prototype.editor_on_button_click_handler = function (event) {
        var data;
        if (event.target == this.close_btn.node ||
            event.target == this.anywhere_close_btn.node ||
            event.target == this.fail_ok_btn.node ||
            event.target == this.success_ok_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.MailLogNotice);
        }
        else if (event.target != this.revenge_btn.node || (data = this._data) && "" != data.target_uid) {
            GameManager_1.gm.data.get_rob_record(data.target_uid, function () {
                GameManager_1.gm.ui.mapMainUI.revenge(data.target_uid);
                GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.MailLogNotice);
            });
        }
    };
    __decorate([
        property(cc.Button)
    ], MailLogNotice.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], MailLogNotice.prototype, "anywhere_close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], MailLogNotice.prototype, "fail_ok_btn", void 0);
    __decorate([
        property(cc.Button)
    ], MailLogNotice.prototype, "success_ok_btn", void 0);
    __decorate([
        property(cc.Button)
    ], MailLogNotice.prototype, "revenge_btn", void 0);
    __decorate([
        property(cc.Label)
    ], MailLogNotice.prototype, "enemy_name_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], MailLogNotice.prototype, "enemy_star_lbl", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], MailLogNotice.prototype, "mail_hero_list", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], MailLogNotice.prototype, "mail_log_reward_list", void 0);
    __decorate([
        property(cc.Label)
    ], MailLogNotice.prototype, "star_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], MailLogNotice.prototype, "star_change_lbl", void 0);
    __decorate([
        property(cc.Node)
    ], MailLogNotice.prototype, "success_node", void 0);
    __decorate([
        property(cc.Node)
    ], MailLogNotice.prototype, "fail_node", void 0);
    MailLogNotice = __decorate([
        ccclass
    ], MailLogNotice);
    return MailLogNotice;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbWFpbFxcc2NyaXB0c1xcTWFpbExvZ05vdGljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxRUFBMkQ7QUFDM0QsbUVBQWtFO0FBQ2xFLCtEQUE4RDtBQUd4RCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE0QixpQ0FBVTtJQUF0QztRQUFBLHFFQStGQztRQTdGVyxlQUFTLEdBQWMsSUFBSSxDQUFDO1FBRzVCLHdCQUFrQixHQUFjLElBQUksQ0FBQztRQUdyQyxpQkFBVyxHQUFjLElBQUksQ0FBQztRQUc5QixvQkFBYyxHQUFjLElBQUksQ0FBQztRQUdqQyxpQkFBVyxHQUFjLElBQUksQ0FBQztRQUc5QixvQkFBYyxHQUFhLElBQUksQ0FBQztRQUdoQyxvQkFBYyxHQUFhLElBQUksQ0FBQztRQUdoQyxvQkFBYyxHQUFhLElBQUksQ0FBQztRQUdoQywwQkFBb0IsR0FBYSxJQUFJLENBQUM7UUFHdEMsY0FBUSxHQUFhLElBQUksQ0FBQztRQUcxQixxQkFBZSxHQUFhLElBQUksQ0FBQztRQUdqQyxrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixlQUFTLEdBQVksSUFBSSxDQUFDOztJQXlEdEMsQ0FBQztJQXJEYSxnQ0FBUSxHQUFsQjtRQUFBLGlCQUtDO1FBSkcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsR0FBRyxFQUFFO1lBQ25DLEtBQUksQ0FBQyxLQUFLLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25FLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFUyxpQ0FBUyxHQUFuQixjQUE4QixDQUFDO0lBRXhCLG1DQUFXLEdBQWxC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SUFBSSxDQUFDO29EQUNnQjtJQXRDaEMsYUFBYTtRQURsQixPQUFPO09BQ0YsYUFBYSxDQStGbEI7SUFBRCxvQkFBQztDQS9GRCxBQStGQyxDQS9GMkIsdUJBQVUsR0ErRnJDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ20gfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgR2FtZU1vZHVsZSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1vZHVsZSc7XHJcbmltcG9ydCB7IExpc3RWaWV3IH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9MaXN0Vmlldyc7XHJcbmltcG9ydCB7IE1haWxMb2dJdGVtRGF0YSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTWFpbFRlbXBEYXRhJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBNYWlsTG9nTm90aWNlIGV4dGVuZHMgR2FtZU1vZHVsZSB7XHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSBjbG9zZV9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgYW55d2hlcmVfY2xvc2VfYnRuOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIGZhaWxfb2tfYnRuOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIHN1Y2Nlc3Nfb2tfYnRuOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIHJldmVuZ2VfYnRuOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgZW5lbXlfbmFtZV9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGVuZW15X3N0YXJfbGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KExpc3RWaWV3KVxyXG4gICAgcHJpdmF0ZSBtYWlsX2hlcm9fbGlzdDogTGlzdFZpZXcgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShMaXN0VmlldylcclxuICAgIHByaXZhdGUgbWFpbF9sb2dfcmV3YXJkX2xpc3Q6IExpc3RWaWV3ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIHN0YXJfbGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBzdGFyX2NoYW5nZV9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgc3VjY2Vzc19ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgZmFpbF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9kYXRhOiBNYWlsTG9nSXRlbURhdGE7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmRhdGEuZ2V0X3BsYXllcl9maWdodF9sb2dfZGF0YShcIjFcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhID0gZ20uZGF0YS5tYWlsX3RlbXBfZGF0YS5tYWlsX2RlZmVuc2VfbG9nX2RhdGFfYXJyYXlbMF07XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQgeyB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZV92aWV3KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9kYXRhO1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbXlfbmFtZV9sYmwuc3RyaW5nID0gZGF0YS50YXJnZXRfbmlja25hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbXlfc3Rhcl9sYmwuc3RyaW5nID0gTWF0aC5tYXgoMCwgZGF0YS50YXJnZXRfY2hhbmdlX3N0YXIgKyBkYXRhLnRhcmdldF9zdGFyKSArIFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuc3Rhcl9sYmwuc3RyaW5nID0gTWF0aC5tYXgoMCwgZGF0YS5zdGFyICsgZGF0YS5jaGFuZ2Vfc3RhcikgKyBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJfY2hhbmdlX2xibC5zdHJpbmcgPSAoMCA8IGRhdGEuY2hhbmdlX3N0YXIgPyBcIitcIiA6IFwiXCIpICsgZGF0YS5jaGFuZ2Vfc3RhcjtcclxuICAgICAgICAgICAgaWYgKFwiMVwiID09IGRhdGEub3BfdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKDEgPT0gZGF0YS5vcF9yZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3Nfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmFpbF9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFpbF9sb2dfcmV3YXJkX2xpc3Qubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJldmVuZ2VfYnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzX29rX2J0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWlsX29rX2J0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3Nfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhaWxfbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFpbF9sb2dfcmV3YXJkX2xpc3Qubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFpbF9sb2dfcmV3YXJkX2xpc3Quc2V0RGF0YShkYXRhLm9wX2xvc3NfcmV3YXJkKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJldmVuZ2VfYnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Y2Nlc3Nfb2tfYnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWlsX29rX2J0bi5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tYWlsX2hlcm9fbGlzdC5zZXREYXRhKGRhdGEudGFyZ2V0X29wX2JhdHRsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZWRpdG9yX29uX2J1dHRvbl9jbGlja19oYW5kbGVyKGV2ZW50OiBjYy5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBkYXRhO1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5jbG9zZV9idG4ubm9kZSB8fFxyXG4gICAgICAgICAgICBldmVudC50YXJnZXQgPT0gdGhpcy5hbnl3aGVyZV9jbG9zZV9idG4ubm9kZSB8fFxyXG4gICAgICAgICAgICBldmVudC50YXJnZXQgPT0gdGhpcy5mYWlsX29rX2J0bi5ub2RlIHx8XHJcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldCA9PSB0aGlzLnN1Y2Nlc3Nfb2tfYnRuLm5vZGUpIHtcclxuICAgICAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuTWFpbExvZ05vdGljZSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0ICE9IHRoaXMucmV2ZW5nZV9idG4ubm9kZSB8fCAoZGF0YSA9IHRoaXMuX2RhdGEpICYmIFwiXCIgIT0gZGF0YS50YXJnZXRfdWlkKSB7XHJcbiAgICAgICAgICAgIGdtLmRhdGEuZ2V0X3JvYl9yZWNvcmQoZGF0YS50YXJnZXRfdWlkLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5tYXBNYWluVUkucmV2ZW5nZShkYXRhLnRhcmdldF91aWQpO1xyXG4gICAgICAgICAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuTWFpbExvZ05vdGljZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19