"use strict";
cc._RF.push(module, '8a280gecNpM04sTyw7ROPys', 'SignBuyItem');
// sign/scripts/SignBuyItem.ts

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
exports.SignBuyItem = void 0;
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var Utils_1 = require("../../start-scene/scripts/Utils");
var NetUtils_1 = require("../../start-scene/scripts/NetUtils");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SignBuyItem = /** @class */ (function (_super) {
    __extends(SignBuyItem, _super);
    function SignBuyItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.color_spr = null;
        _this.hero_spr = null;
        _this.money_lbl = null;
        _this.receive_btn = null;
        return _this;
    }
    Object.defineProperty(SignBuyItem.prototype, "data", {
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
    SignBuyItem.prototype.update_view = function () {
        var data = this._data;
        this.money_lbl.string = data.reward_data.money > 0 ? data.reward_data.money.toString() : "Miễn Phí";
        this.receive_btn.node.active = data.state > 0;
        this.receive_btn.interactable = data.state === 1;
        Utils_1.Utils.set_sprite_state(this.receive_btn.node, data.state === 2 ? cc.Sprite.State.GRAY : cc.Sprite.State.NORMAL);
        Utils_1.Utils.async_set_sprite_frame(this.hero_spr, Constants_1.BundleName.COMMON, "res/heroCircleImg/" + data.reward_data.reward_id);
    };
    SignBuyItem.prototype.reset = function () {
        this.color_spr.spriteFrame = null;
        this.hero_spr.spriteFrame = null;
    };
    SignBuyItem.prototype.editor_on_button_click_handler = function (event) {
        if (event.target === this.receive_btn.node) {
            var data = this._data;
            if (GameManager_1.gm.data.mapCell_data.roleCoinData.diamondNum < data.reward_data.money) {
                GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETCOINOP.key, true);
                GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.GETCOINOP);
                return;
            }
            if (data.reward_data.money > 0) {
                NetUtils_1.ReportData.instance.report_once_point(10835);
            }
            data.state = 2;
            GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.REDUCE_ITEM_TYPE, data.reward_data.money);
            var rewardIds = [];
            for (var i = 0; i < data.reward_data.reward_num; i++) {
                rewardIds.push(data.reward_data.reward_id);
            }
            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETREWARDOP.key, {
                idList: [data.reward_data.reward_id],
                numList: [data.reward_data.reward_num]
            });
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
            GameManager_1.gm.data.mapCell_data.addWareHouseList(rewardIds);
            GameManager_1.gm.data.mapCell_data.async_write_data();
            GameManager_1.gm.data.sign_data.async_write_data();
        }
    };
    __decorate([
        property(cc.Sprite)
    ], SignBuyItem.prototype, "color_spr", void 0);
    __decorate([
        property(cc.Sprite)
    ], SignBuyItem.prototype, "hero_spr", void 0);
    __decorate([
        property(cc.Label)
    ], SignBuyItem.prototype, "money_lbl", void 0);
    __decorate([
        property(cc.Button)
    ], SignBuyItem.prototype, "receive_btn", void 0);
    SignBuyItem = __decorate([
        ccclass
    ], SignBuyItem);
    return SignBuyItem;
}(NodePoolItem_1.NodePoolItem));
exports.SignBuyItem = SignBuyItem;

cc._RF.pop();