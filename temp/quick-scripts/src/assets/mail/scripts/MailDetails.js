"use strict";
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