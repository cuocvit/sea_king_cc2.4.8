
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/mail/scripts/MailLogItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9016bULZixNyqGJv50qO4pz', 'MailLogItem');
// mail/scripts/MailLogItem.ts

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
// file này không import ở đâu
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var ListView_1 = require("../../start-scene/scripts/ListView");
var ListViewItem_1 = require("../../start-scene/scripts/ListViewItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MailLogItem = /** @class */ (function (_super) {
    __extends(MailLogItem, _super);
    function MailLogItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enemy_name_lbl = null;
        _this.enemy_star_lbl = null;
        _this.replay_btn = null;
        _this.revenge_btn = null;
        _this.mail_hero_list = null;
        _this.mail_log_reward_list = null;
        _this.star_lbl = null;
        _this.star_change_lbl = null;
        _this.result_bg_node = null;
        _this.result_lbl = null;
        _this.reward_lbl = null;
        _this.reward_bg_node = null;
        return _this;
    }
    Object.defineProperty(MailLogItem.prototype, "data", {
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
    MailLogItem.prototype.update_view = function () {
        this.enemy_name_lbl.string = this._data.target_nickname;
        this.enemy_star_lbl.string = Math.max(0, this._data.target_change_star + this._data.target_star) + "";
        this.star_lbl.string = Math.max(0, this._data.star + this._data.change_star) + "";
        this.star_change_lbl.string = (0 < this._data.change_star ? "+" : "") + this._data.change_star;
        if ("1" == this._data.op_type) {
            if (1 == this._data.op_result) {
                this.result_lbl.string = "Bảo vệ thành công!";
                this.result_bg_node.color = cc.color().fromHEX("#9DD3EA");
                this.reward_bg_node.color = cc.color().fromHEX("#FEE693");
                this.reward_lbl.string = "Thưởng";
                this.mail_log_reward_list.node.active = false;
                this.star_change_lbl.node.color = cc.color().fromHEX("#FF0000");
                this.replay_btn.node.active = false;
                this.revenge_btn.node.active = false;
            }
            else {
                this.result_lbl.string = "Phòng thủ thất bại!";
                this.result_bg_node.color = cc.color().fromHEX("#FF9999");
                this.reward_bg_node.color = cc.color().fromHEX("#cfdce5");
                this.reward_lbl.string = "Mất";
                this.mail_log_reward_list.node.active = false;
                this.mail_log_reward_list.setData(this._data.op_loss_reward);
                this.star_change_lbl.node.color = cc.color().fromHEX("#277E27");
                this.replay_btn.node.active = false;
                this.revenge_btn.node.active = true;
            }
        }
        else if ("2" == this._data.op_type) {
            if (1 == this._data.op_result) {
                this.result_lbl.string = "Bạn đã thắng!";
                this.result_bg_node.color = cc.color().fromHEX("#9DD3EA");
                this.reward_bg_node.color = cc.color().fromHEX("#FEE693");
                this.reward_lbl.string = "Thưởng ";
                this.mail_log_reward_list.node.active = true;
                this.mail_log_reward_list.setData(this._data.op_reward);
                this.star_change_lbl.node.color = cc.color().fromHEX("#FF0000");
                this.replay_btn.node.active = false;
                this.revenge_btn.node.active = false;
            }
            else {
                this.result_lbl.string = "Bạn thất bại!";
                this.result_bg_node.color = cc.color().fromHEX("#FF9999");
                this.reward_bg_node.color = cc.color().fromHEX("#cfdce5");
                this.reward_lbl.string = "Mất";
                this.mail_log_reward_list.node.active = false;
                this.star_change_lbl.node.color = cc.color().fromHEX("#277E27");
                this.replay_btn.node.active = false;
                this.revenge_btn.node.active = true;
            }
        }
        this.mail_hero_list.setData(this._data.target_op_battle);
    };
    MailLogItem.prototype.reset = function () {
        // Reset logic here
    };
    MailLogItem.prototype.editor_on_button_click_handler = function (event) {
        var _this = this;
        if (event.target == this.replay_btn.node) {
            GameManager_1.gm.ui.show_notice("Hãy chờ cập nhật sau!");
        }
        else if (event.target == this.revenge_btn.node && this._data && "" != this._data.target_uid) {
            GameManager_1.gm.data.get_rob_record(this._data.target_uid, function () {
                GameManager_1.gm.ui.mapMainUI.revenge(_this._data.target_uid);
                GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Mail);
            });
        }
    };
    __decorate([
        property(cc.Label)
    ], MailLogItem.prototype, "enemy_name_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], MailLogItem.prototype, "enemy_star_lbl", void 0);
    __decorate([
        property(cc.Button)
    ], MailLogItem.prototype, "replay_btn", void 0);
    __decorate([
        property(cc.Button)
    ], MailLogItem.prototype, "revenge_btn", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], MailLogItem.prototype, "mail_hero_list", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], MailLogItem.prototype, "mail_log_reward_list", void 0);
    __decorate([
        property(cc.Label)
    ], MailLogItem.prototype, "star_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], MailLogItem.prototype, "star_change_lbl", void 0);
    __decorate([
        property(cc.Node)
    ], MailLogItem.prototype, "result_bg_node", void 0);
    __decorate([
        property(cc.Label)
    ], MailLogItem.prototype, "result_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], MailLogItem.prototype, "reward_lbl", void 0);
    __decorate([
        property(cc.Node)
    ], MailLogItem.prototype, "reward_bg_node", void 0);
    MailLogItem = __decorate([
        ccclass
    ], MailLogItem);
    return MailLogItem;
}(ListViewItem_1.ListViewItem));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbWFpbFxcc2NyaXB0c1xcTWFpbExvZ0l0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOEJBQThCO0FBQzlCLHFFQUEyRDtBQUMzRCwrREFBOEQ7QUFDOUQsdUVBQXNFO0FBR2hFLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBCLCtCQUFZO0lBQXRDO1FBQUEscUVBcUhDO1FBbkhXLG9CQUFjLEdBQWEsSUFBSSxDQUFDO1FBR2hDLG9CQUFjLEdBQWEsSUFBSSxDQUFDO1FBR2hDLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRzdCLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBRzlCLG9CQUFjLEdBQWEsSUFBSSxDQUFDO1FBR2hDLDBCQUFvQixHQUFhLElBQUksQ0FBQztRQUd0QyxjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLHFCQUFlLEdBQWEsSUFBSSxDQUFDO1FBR2pDLG9CQUFjLEdBQVksSUFBSSxDQUFDO1FBRy9CLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLG9CQUFjLEdBQVksSUFBSSxDQUFDOztJQWtGM0MsQ0FBQztJQTlFRyxzQkFBVyw2QkFBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7YUFFRCxVQUFnQixLQUFzQjtZQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQzs7O09BTEE7SUFPTSxpQ0FBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDO1FBQ3hELElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFH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LENBQUE7U0FDTDtJQUNMLENBQUM7SUFsSEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt1REFDcUI7SUFHeEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt1REFDcUI7SUFHeEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDaUI7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztvREFDa0I7SUFHdEM7UUFEQyxRQUFRLENBQUMsbUJBQVEsQ0FBQzt1REFDcUI7SUFHeEM7UUFEQyxRQUFRLENBQUMsbUJBQVEsQ0FBQzs2REFDMkI7SUFHOUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztpREFDZTtJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3dEQUNzQjtJQUd6QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VEQUNxQjtJQUd2QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO21EQUNpQjtJQUdwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO21EQUNpQjtJQUdwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VEQUNxQjtJQW5DckMsV0FBVztRQURoQixPQUFPO09BQ0YsV0FBVyxDQXFIaEI7SUFBRCxrQkFBQztDQXJIRCxBQXFIQyxDQXJIeUIsMkJBQVksR0FxSHJDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZmlsZSBuw6B5IGtow7RuZyBpbXBvcnQg4bufIMSRw6J1XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IExpc3RWaWV3IH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9MaXN0Vmlldyc7XHJcbmltcG9ydCB7IExpc3RWaWV3SXRlbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTGlzdFZpZXdJdGVtJztcclxuaW1wb3J0IHsgTWFpbExvZ0l0ZW1EYXRhIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9NYWlsVGVtcERhdGEnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIE1haWxMb2dJdGVtIGV4dGVuZHMgTGlzdFZpZXdJdGVtIHtcclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgZW5lbXlfbmFtZV9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGVuZW15X3N0YXJfbGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgcmVwbGF5X2J0bjogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSByZXZlbmdlX2J0bjogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoTGlzdFZpZXcpXHJcbiAgICBwcml2YXRlIG1haWxfaGVyb19saXN0OiBMaXN0VmlldyA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KExpc3RWaWV3KVxyXG4gICAgcHJpdmF0ZSBtYWlsX2xvZ19yZXdhcmRfbGlzdDogTGlzdFZpZXcgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgc3Rhcl9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIHN0YXJfY2hhbmdlX2xibDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSByZXN1bHRfYmdfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSByZXN1bHRfbGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSByZXdhcmRfbGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHJld2FyZF9iZ19ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgX2RhdGE6IE1haWxMb2dJdGVtRGF0YTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGEoKTogTWFpbExvZ0l0ZW1EYXRhIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRhdGEodmFsdWU6IE1haWxMb2dJdGVtRGF0YSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZV92aWV3KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZW5lbXlfbmFtZV9sYmwuc3RyaW5nID0gdGhpcy5fZGF0YS50YXJnZXRfbmlja25hbWU7XHJcbiAgICAgICAgdGhpcy5lbmVteV9zdGFyX2xibC5zdHJpbmcgPSBNYXRoLm1heCgwLCB0aGlzLl9kYXRhLnRhcmdldF9jaGFuZ2Vfc3RhciArIHRoaXMuX2RhdGEudGFyZ2V0X3N0YXIpICsgXCJcIjtcclxuICAgICAgICB0aGlzLnN0YXJfbGJsLnN0cmluZyA9IE1hdGgubWF4KDAsIHRoaXMuX2RhdGEuc3RhciArIHRoaXMuX2RhdGEuY2hhbmdlX3N0YXIpICsgXCJcIjtcclxuICAgICAgICB0aGlzLnN0YXJfY2hhbmdlX2xibC5zdHJpbmcgPSAoMCA8IHRoaXMuX2RhdGEuY2hhbmdlX3N0YXIgPyBcIitcIiA6IFwiXCIpICsgdGhpcy5fZGF0YS5jaGFuZ2Vfc3RhcjtcclxuXHJcbiAgICAgICAgaWYgKFwiMVwiID09IHRoaXMuX2RhdGEub3BfdHlwZSkge1xyXG4gICAgICAgICAgICBpZiAoMSA9PSB0aGlzLl9kYXRhLm9wX3Jlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRfbGJsLnN0cmluZyA9IFwiQuG6o28gduG7hyB0aMOgbmggY8O0bmchXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdF9iZ19ub2RlLmNvbG9yID0gY2MuY29sb3IoKS5mcm9tSEVYKFwiIzlERDNFQVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkX2JnX25vZGUuY29sb3IgPSBjYy5jb2xvcigpLmZyb21IRVgoXCIjRkVFNjkzXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRfbGJsLnN0cmluZyA9IFwiVGjGsOG7n25nXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haWxfbG9nX3Jld2FyZF9saXN0Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJfY2hhbmdlX2xibC5ub2RlLmNvbG9yID0gY2MuY29sb3IoKS5mcm9tSEVYKFwiI0ZGMDAwMFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVwbGF5X2J0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXZlbmdlX2J0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0X2xibC5zdHJpbmcgPSBcIlBow7JuZyB0aOG7pyB0aOG6pXQgYuG6oWkhXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdF9iZ19ub2RlLmNvbG9yID0gY2MuY29sb3IoKS5mcm9tSEVYKFwiI0ZGOTk5OVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkX2JnX25vZGUuY29sb3IgPSBjYy5jb2xvcigpLmZyb21IRVgoXCIjY2ZkY2U1XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRfbGJsLnN0cmluZyA9IFwiTeG6pXRcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbF9sb2dfcmV3YXJkX2xpc3Qubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbF9sb2dfcmV3YXJkX2xpc3Quc2V0RGF0YSh0aGlzLl9kYXRhLm9wX2xvc3NfcmV3YXJkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3Rhcl9jaGFuZ2VfbGJsLm5vZGUuY29sb3IgPSBjYy5jb2xvcigpLmZyb21IRVgoXCIjMjc3RTI3XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXBsYXlfYnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJldmVuZ2VfYnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKFwiMlwiID09IHRoaXMuX2RhdGEub3BfdHlwZSkge1xyXG4gICAgICAgICAgICBpZiAoMSA9PSB0aGlzLl9kYXRhLm9wX3Jlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRfbGJsLnN0cmluZyA9IFwiQuG6oW4gxJHDoyB0aOG6r25nIVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRfYmdfbm9kZS5jb2xvciA9IGNjLmNvbG9yKCkuZnJvbUhFWChcIiM5REQzRUFcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJld2FyZF9iZ19ub2RlLmNvbG9yID0gY2MuY29sb3IoKS5mcm9tSEVYKFwiI0ZFRTY5M1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkX2xibC5zdHJpbmcgPSBcIlRoxrDhu59uZyBcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbF9sb2dfcmV3YXJkX2xpc3Qubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWlsX2xvZ19yZXdhcmRfbGlzdC5zZXREYXRhKHRoaXMuX2RhdGEub3BfcmV3YXJkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3Rhcl9jaGFuZ2VfbGJsLm5vZGUuY29sb3IgPSBjYy5jb2xvcigpLmZyb21IRVgoXCIjRkYwMDAwXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXBsYXlfYnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJldmVuZ2VfYnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdF9sYmwuc3RyaW5nID0gXCJC4bqhbiB0aOG6pXQgYuG6oWkhXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdF9iZ19ub2RlLmNvbG9yID0gY2MuY29sb3IoKS5mcm9tSEVYKFwiI0ZGOTk5OVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkX2JnX25vZGUuY29sb3IgPSBjYy5jb2xvcigpLmZyb21IRVgoXCIjY2ZkY2U1XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRfbGJsLnN0cmluZyA9IFwiTeG6pXRcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbF9sb2dfcmV3YXJkX2xpc3Qubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3Rhcl9jaGFuZ2VfbGJsLm5vZGUuY29sb3IgPSBjYy5jb2xvcigpLmZyb21IRVgoXCIjMjc3RTI3XCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXBsYXlfYnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJldmVuZ2VfYnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1haWxfaGVyb19saXN0LnNldERhdGEodGhpcy5fZGF0YS50YXJnZXRfb3BfYmF0dGxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gUmVzZXQgbG9naWMgaGVyZVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZWRpdG9yX29uX2J1dHRvbl9jbGlja19oYW5kbGVyKGV2ZW50OiBjYy5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5yZXBsYXlfYnRuLm5vZGUpIHtcclxuICAgICAgICAgICAgZ20udWkuc2hvd19ub3RpY2UoXCJIw6N5IGNo4budIGPhuq1wIG5o4bqtdCBzYXUhXCIpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLnJldmVuZ2VfYnRuLm5vZGUgJiYgdGhpcy5fZGF0YSAmJiBcIlwiICE9IHRoaXMuX2RhdGEudGFyZ2V0X3VpZCkge1xyXG4gICAgICAgICAgICBnbS5kYXRhLmdldF9yb2JfcmVjb3JkKHRoaXMuX2RhdGEudGFyZ2V0X3VpZCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZ20udWkubWFwTWFpblVJLnJldmVuZ2UodGhpcy5fZGF0YS50YXJnZXRfdWlkKTtcclxuICAgICAgICAgICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0Lk1haWwpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=