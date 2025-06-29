"use strict";
cc._RF.push(module, '1a938TBeXJP8IG60xBmSxBP', 'LadderUpLvlAnim');
// ladder/scripts/LadderUpLvlAnim.ts

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
var LadderRewardItem_1 = require("./LadderRewardItem");
var TempData_1 = require("../../start-scene/scripts/TempData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LadderUpLvlAnim = /** @class */ (function (_super) {
    __extends(LadderUpLvlAnim, _super);
    function LadderUpLvlAnim() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.star_lbl = null;
        _this.rewardList = [];
        return _this;
    }
    LadderUpLvlAnim.prototype.onEnable = function () {
        this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, this.playAnimEnd, this);
        this.node.getComponent(cc.Animation).play("ladder_up_open");
        this.refreshPanel();
    };
    LadderUpLvlAnim.prototype.refreshPanel = function () {
        var ladderData = GameManager_1.gm.data.ladder_data;
        var rewardArray = GameManager_1.gm.data.ladder_temp_data.ladder_achievement_data_array[ladderData.achievement_id - 2].reward_array;
        var configData = GameManager_1.gm.config.get_row_data("LadderAchievementConfigData", ladderData.achievement_id - 1 + "");
        this.star_lbl.string = configData.star + "";
        for (var index = 0; index < this.rewardList.length; index++) {
            var rewardItem = this.rewardList[index];
            if (index < rewardArray.length) {
                rewardItem.node.active = true;
                rewardItem.data = rewardArray[index];
                var Anim = rewardItem.getComponent(cc.Animation);
                if (Anim) {
                    Anim.play();
                }
            }
            else {
                rewardItem.node.active = !1;
            }
        }
    };
    LadderUpLvlAnim.prototype.playAnimEnd = function (animation, event) {
        if (event.name == "ladder_up_close") {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.LADDERUPLVLANIM);
            if (TempData_1.TempData.is_need_open_barrkPanel) {
                TempData_1.TempData.is_need_open_barrkPanel = false;
                GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.BARRACKS_LIST);
            }
        }
    };
    LadderUpLvlAnim.prototype.onClosePanel = function () {
        this.node.getComponent(cc.Animation).play("ladder_up_close");
    };
    LadderUpLvlAnim.prototype.onDisable = function () {
        this.node.getComponent(cc.Animation).off(cc.Animation.EventType.FINISHED, this.playAnimEnd, this);
    };
    __decorate([
        property(cc.Label)
    ], LadderUpLvlAnim.prototype, "star_lbl", void 0);
    __decorate([
        property([LadderRewardItem_1.LadderRewardItem])
    ], LadderUpLvlAnim.prototype, "rewardList", void 0);
    LadderUpLvlAnim = __decorate([
        ccclass
    ], LadderUpLvlAnim);
    return LadderUpLvlAnim;
}(cc.Component));

cc._RF.pop();