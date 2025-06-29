
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/mail/scripts/MailDetails.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '57a0dzQOFFGiaiBJcRKuvw9', 'MailDetails');
// mail/scripts/MailDetails.ts

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
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var ListView_1 = require("../../start-scene/scripts/ListView");
var Utils_1 = require("../../start-scene/scripts/Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MailDetails = /** @class */ (function (_super) {
    __extends(MailDetails, _super);
    function MailDetails() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close_btn = null;
        _this.anywhere_close_btn = null;
        _this.receive_btn = null;
        _this.icon_spr = null;
        _this.title_lbl = null;
        _this.sender_lbl = null;
        _this.content_lbl = null;
        _this.time_lbl = null;
        _this.reward_list = null;
        return _this;
    }
    MailDetails.prototype.onEnable = function () {
        this._args = GameManager_1.gm.ui.get_module_args(GameManager_1.gm.const.MailDetails.key);
        this.update_view();
        GameManager_1.gm.channel.show_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    MailDetails.prototype.onDisable = function () {
        this.reward_list.reset();
        GameManager_1.gm.channel.hide_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    MailDetails.prototype.update_view = function () {
        var mailData = this._args.data;
        this.title_lbl.string = mailData.mail_title;
        this.content_lbl.string = mailData.mail_text;
        this.sender_lbl.string = "Người Gửi：" + mailData.mail_sender;
        Utils_1.Utils.async_set_sprite_frame(this.icon_spr, Constants_1.BundleName.MAIL, "res/icon_" + mailData.mail_type);
        if (!(1 != mailData.mail_type && 2 != mailData.mail_type)) {
            this.reward_list.setData(mailData.reward_array);
        }
        this.receive_btn.interactable = 0 == mailData.reward_status;
        Utils_1.Utils.set_sprite_state(this.receive_btn.node, 0 == mailData.reward_status ? cc.Sprite.State.NORMAL : cc.Sprite.State.GRAY);
    };
    MailDetails.prototype.editor_on_button_click_handler = function (event) {
        var _this = this;
        if (event.target == this.close_btn.node || event.target == this.anywhere_close_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.MailDetails);
        }
        else if (event.target == this.receive_btn.node) {
            var argsData_1 = this._args.data;
            var serverData = GameManager_1.gm.data.server_data;
            var requestData = {
                uid: serverData.uid,
                token: serverData.token,
                mail_id: argsData_1.mail_id,
                op_status: 0,
                reward_status: 1
            };
            serverData.op_player_email(function (response) {
                if (0 == response.ResultCode) {
                    var rewardListNode = _this.reward_list.node;
                    var rewardInfo = {
                        type: 1,
                        idList: [],
                        numList: []
                    };
                    for (var index = 0; index < argsData_1.reward_array.length; index++) {
                        var rewardArr = argsData_1.reward_array[index];
                        if (23001 <= rewardArr.reward_id && rewardArr.reward_id <= 23099) {
                            GameManager_1.gm.data.mapCell_data.reelUnlcokHero(rewardArr.reward_id);
                        }
                        else if (rewardArr.reward_id == Constants_1.RewardIdEnum.GOLD) {
                            GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, rewardArr.reward_num);
                            GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.GOLD, rewardListNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
                            rewardInfo.idList.push(rewardArr.reward_id);
                            rewardInfo.numList.push(rewardArr.reward_num);
                        }
                        else if (rewardArr.reward_id == Constants_1.RewardIdEnum.DIAMOND) {
                            GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, rewardArr.reward_num);
                            GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.DIAMOND, rewardListNode.convertToWorldSpaceAR(cc.Vec3.ZERO));
                            rewardInfo.idList.push(rewardArr.reward_id);
                            rewardInfo.numList.push(rewardArr.reward_num);
                        }
                        else if (rewardArr.reward_id == Constants_1.RewardIdEnum.BARREL) {
                            GameManager_1.gm.data.mapCell_data.addBarrelNum(rewardArr.reward_num);
                            rewardInfo.idList.push(rewardArr.reward_id);
                            rewardInfo.numList.push(rewardArr.reward_num);
                        }
                        else {
                            var rewardList = [];
                            for (var index_1 = 0; index_1 < rewardArr.reward_num; index_1++) {
                                rewardList.push(rewardArr.reward_id);
                            }
                            GameManager_1.gm.data.mapCell_data.addWareHouseList(rewardList);
                            rewardInfo.idList.push(rewardArr.reward_id);
                            rewardInfo.numList.push(rewardArr.reward_num);
                        }
                    }
                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETREWARDOP.key, {
                        idList: rewardInfo.idList,
                        numList: rewardInfo.numList
                    });
                    GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
                    argsData_1.reward_status = 1;
                    GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.MailDetails);
                }
            }, requestData);
        }
    };
    __decorate([
        property(cc.Button)
    ], MailDetails.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], MailDetails.prototype, "anywhere_close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], MailDetails.prototype, "receive_btn", void 0);
    __decorate([
        property(cc.Sprite)
    ], MailDetails.prototype, "icon_spr", void 0);
    __decorate([
        property(cc.Label)
    ], MailDetails.prototype, "title_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], MailDetails.prototype, "sender_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], MailDetails.prototype, "content_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], MailDetails.prototype, "time_lbl", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], MailDetails.prototype, "reward_list", void 0);
    MailDetails = __decorate([
        ccclass
    ], MailDetails);
    return MailDetails;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbWFpbFxcc2NyaXB0c1xcTWFpbERldGFpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkVBQTBFO0FBQzFFLGlFQUErRjtBQUMvRixxRUFBMkQ7QUFDM0QsbUVBQWtFO0FBQ2xFLCtEQUE4RDtBQUU5RCx5REFBd0Q7QUFFbEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFPNUM7SUFBMEIsK0JBQVU7SUFBcEM7UUFBQSxxRUE0SEM7UUExSFcsZUFBUyxHQUFxQixJQUFJLENBQUM7UUFHbkMsd0JBQWtCLEdBQXFCLElBQUksQ0FBQztRQUc1QyxpQkFBVyxHQUFxQixJQUFJLENBQUM7UUFHckMsY0FBUSxHQUFxQixJQUFJLENBQUM7UUFHbEMsZUFBUyxHQUFvQixJQUFJLENBQUM7UUFHbEMsZ0JBQVUsR0FBb0IsSUFBSSxDQUFDO1FBR25DLGlCQUFXLEdBQW9CLElBQUksQ0FBQztRQUdwQyxjQUFRLEdBQW9CLElBQUksQ0FBQztRQUdqQyxpQkFBVyxHQUFvQixJQUFJLENBQUM7O0lBa0doRCxDQUFDO0lBOUZhLDhCQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBb0IsQ0FBQztRQUNoRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsZ0JBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLCtCQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVTLCtCQUFTLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN6QixnQkFBRSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsK0JBQWMsQ0FBQyxH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QixnQkFBRSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztpQkFDakQ7WUFDTCxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUE7U0FDbEI7SUFDTCxDQUFDO0lBekhEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7a0RBQ3VCO0lBRzNDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MkRBQ2dDO0lBR3BEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0RBQ3lCO0lBRzdDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aURBQ3NCO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7a0RBQ3VCO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7bURBQ3dCO0lBRzNDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ3lCO0lBRzVDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7aURBQ3NCO0lBR3pDO1FBREMsUUFBUSxDQUFDLG1CQUFRLENBQUM7b0RBQ3lCO0lBMUIxQyxXQUFXO1FBRGhCLE9BQU87T0FDRixXQUFXLENBNEhoQjtJQUFELGtCQUFDO0NBNUhELEFBNEhDLENBNUh5Qix1QkFBVSxHQTRIbkMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCQU5ORVJfQURfVFlQRSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvQ2hhbm5lbE1hbmFnZXInO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lLCBSZXdhcmRJZEVudW0sIFNldEl0ZW1OdW1FbnVtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTW9kdWxlJztcclxuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0xpc3RWaWV3JztcclxuaW1wb3J0IHsgTWFpbEluYm94SXRlbURhdGEgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL01haWxUZW1wRGF0YSc7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9VdGlscyc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYWlsRGV0YWlsc0FyZ3Mge1xyXG4gICAgZGF0YTogTWFpbEluYm94SXRlbURhdGFcclxufVxyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgTWFpbERldGFpbHMgZXh0ZW5kcyBHYW1lTW9kdWxlIHtcclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIGNsb3NlX2J0bjogY2MuQnV0dG9uIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgYW55d2hlcmVfY2xvc2VfYnRuOiBjYy5CdXR0b24gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSByZWNlaXZlX2J0bjogY2MuQnV0dG9uIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgaWNvbl9zcHI6IGNjLlNwcml0ZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgdGl0bGVfbGJsOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgc2VuZGVyX2xibDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGNvbnRlbnRfbGJsOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgdGltZV9sYmw6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KExpc3RWaWV3KVxyXG4gICAgcHJpdmF0ZSByZXdhcmRfbGlzdDogTGlzdFZpZXcgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9hcmdzOiBNYWlsRGV0YWlsc0FyZ3M7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2FyZ3MgPSBnbS51aS5nZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuTWFpbERldGFpbHMua2V5KSBhcyBNYWlsRGV0YWlsc0FyZ3M7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gICAgICAgIGdtLmNoYW5uZWwuc2hvd19iYW5uZXJfYWQoQkFOTkVSX0FEX1RZUEUuQUxMKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmV3YXJkX2xpc3QucmVzZXQoKTtcclxuICAgICAgICBnbS5jaGFubmVsLmhpZGVfYmFubmVyX2FkKEJBTk5FUl9BRF9UWVBFLkFMTCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVfdmlldygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBtYWlsRGF0YSA9IHRoaXMuX2FyZ3MuZGF0YTtcclxuICAgICAgICB0aGlzLnRpdGxlX2xibC5zdHJpbmcgPSBtYWlsRGF0YS5tYWlsX3RpdGxlO1xyXG4gICAgICAgIHRoaXMuY29udGVudF9sYmwuc3RyaW5nID0gbWFpbERhdGEubWFpbF90ZXh0O1xyXG4gICAgICAgIHRoaXMuc2VuZGVyX2xibC5zdHJpbmcgPSBcIk5nxrDhu51pIEfhu61p77yaXCIgKyBtYWlsRGF0YS5tYWlsX3NlbmRlcjtcclxuICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuaWNvbl9zcHIsIEJ1bmRsZU5hbWUuTUFJTCwgXCJyZXMvaWNvbl9cIiArIG1haWxEYXRhLm1haWxfdHlwZSk7XHJcblxyXG4gICAgICAgIGlmICghKDEgIT0gbWFpbERhdGEubWFpbF90eXBlICYmIDIgIT0gbWFpbERhdGEubWFpbF90eXBlKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJld2FyZF9saXN0LnNldERhdGEobWFpbERhdGEucmV3YXJkX2FycmF5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVjZWl2ZV9idG4uaW50ZXJhY3RhYmxlID0gMCA9PSBtYWlsRGF0YS5yZXdhcmRfc3RhdHVzO1xyXG4gICAgICAgIFV0aWxzLnNldF9zcHJpdGVfc3RhdGUodGhpcy5yZWNlaXZlX2J0bi5ub2RlLCAwID09IG1haWxEYXRhLnJld2FyZF9zdGF0dXMgPyBjYy5TcHJpdGUuU3RhdGUuTk9STUFMIDogY2MuU3ByaXRlLlN0YXRlLkdSQVkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZWRpdG9yX29uX2J1dHRvbl9jbGlja19oYW5kbGVyKGV2ZW50OiBjYy5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5jbG9zZV9idG4ubm9kZSB8fCBldmVudC50YXJnZXQgPT0gdGhpcy5hbnl3aGVyZV9jbG9zZV9idG4ubm9kZSkge1xyXG4gICAgICAgICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5NYWlsRGV0YWlscyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5yZWNlaXZlX2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFyZ3NEYXRhID0gdGhpcy5fYXJncy5kYXRhO1xyXG4gICAgICAgICAgICBjb25zdCBzZXJ2ZXJEYXRhID0gZ20uZGF0YS5zZXJ2ZXJfZGF0YTtcclxuICAgICAgICAgICAgY29uc3QgcmVxdWVzdERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICB1aWQ6IHNlcnZlckRhdGEudWlkLFxyXG4gICAgICAgICAgICAgICAgdG9rZW46IHNlcnZlckRhdGEudG9rZW4sXHJcbiAgICAgICAgICAgICAgICBtYWlsX2lkOiBhcmdzRGF0YS5tYWlsX2lkLFxyXG4gICAgICAgICAgICAgICAgb3Bfc3RhdHVzOiAwLFxyXG4gICAgICAgICAgICAgICAgcmV3YXJkX3N0YXR1czogMVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZXJ2ZXJEYXRhLm9wX3BsYXllcl9lbWFpbCgocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgwID09IHJlc3BvbnNlLlJlc3VsdENvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXdhcmRMaXN0Tm9kZSA9IHRoaXMucmV3YXJkX2xpc3Qubm9kZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXdhcmRJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZExpc3Q6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW1MaXN0OiBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcmdzRGF0YS5yZXdhcmRfYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJld2FyZEFyciA9IGFyZ3NEYXRhLnJld2FyZF9hcnJheVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgyMzAwMSA8PSByZXdhcmRBcnIucmV3YXJkX2lkICYmIHJld2FyZEFyci5yZXdhcmRfaWQgPD0gMjMwOTkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJlZWxVbmxjb2tIZXJvKHJld2FyZEFyci5yZXdhcmRfaWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXdhcmRBcnIucmV3YXJkX2lkID09IFJld2FyZElkRW51bS5HT0xEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zZXRBZGRHYW1lQ29pbihTZXRJdGVtTnVtRW51bS5BRERfSVRFTV9UWVBFLCByZXdhcmRBcnIucmV3YXJkX251bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X2NvaW5fZmx5KFJld2FyZElkRW51bS5HT0xELCByZXdhcmRMaXN0Tm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXdhcmRJbmZvLmlkTGlzdC5wdXNoKHJld2FyZEFyci5yZXdhcmRfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV3YXJkSW5mby5udW1MaXN0LnB1c2gocmV3YXJkQXJyLnJld2FyZF9udW0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXdhcmRBcnIucmV3YXJkX2lkID09IFJld2FyZElkRW51bS5ESUFNT05EKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zZXRBZGRHYW1lRGlhbW9uZChTZXRJdGVtTnVtRW51bS5BRERfSVRFTV9UWVBFLCByZXdhcmRBcnIucmV3YXJkX251bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X2NvaW5fZmx5KFJld2FyZElkRW51bS5ESUFNT05ELCByZXdhcmRMaXN0Tm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXdhcmRJbmZvLmlkTGlzdC5wdXNoKHJld2FyZEFyci5yZXdhcmRfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV3YXJkSW5mby5udW1MaXN0LnB1c2gocmV3YXJkQXJyLnJld2FyZF9udW0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXdhcmRBcnIucmV3YXJkX2lkID09IFJld2FyZElkRW51bS5CQVJSRUwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZEJhcnJlbE51bShyZXdhcmRBcnIucmV3YXJkX251bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXdhcmRJbmZvLmlkTGlzdC5wdXNoKHJld2FyZEFyci5yZXdhcmRfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV3YXJkSW5mby5udW1MaXN0LnB1c2gocmV3YXJkQXJyLnJld2FyZF9udW0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJld2FyZExpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCByZXdhcmRBcnIucmV3YXJkX251bTsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZExpc3QucHVzaChyZXdhcmRBcnIucmV3YXJkX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5hZGRXYXJlSG91c2VMaXN0KHJld2FyZExpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV3YXJkSW5mby5pZExpc3QucHVzaChyZXdhcmRBcnIucmV3YXJkX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZEluZm8ubnVtTGlzdC5wdXNoKHJld2FyZEFyci5yZXdhcmRfbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdFVFJFV0FSRE9QLmtleSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZExpc3Q6IHJld2FyZEluZm8uaWRMaXN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW1MaXN0OiByZXdhcmRJbmZvLm51bUxpc3RcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuR0VUUkVXQVJET1ApO1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3NEYXRhLnJld2FyZF9zdGF0dXMgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0Lk1haWxEZXRhaWxzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgcmVxdWVzdERhdGEpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19