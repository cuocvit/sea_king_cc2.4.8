"use strict";
cc._RF.push(module, 'd698awVOnxP54nV3/4Hgy98', 'LadderData');
// start-scene/scripts/LadderData.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LadderData = void 0;
var StorageBase_1 = require("./StorageBase");
var Constants_1 = require("./Constants");
var TaskData_1 = require("./TaskData");
var TempData_1 = require("./TempData");
var NetUtils_1 = require("./NetUtils");
var GameManager_1 = require("./GameManager");
// @
var LadderData = /** @class */ (function (_super) {
    __extends(LadderData, _super);
    // @
    function LadderData() {
        var _this = _super.call(this) || this;
        //
        _this.STORAGE_KEY = "LadderData";
        _this.achievement_id = 0;
        _this.fail_count = 0;
        _this.fight_count = 0;
        //
        _this._ladder_star = 0;
        _this._total_star = 0;
        return _this;
    }
    Object.defineProperty(LadderData.prototype, "ladder_star", {
        // @
        get: function () {
            return this._ladder_star;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LadderData.prototype, "total_star", {
        // @
        get: function () {
            return this._total_star;
        },
        enumerable: false,
        configurable: true
    });
    // @
    LadderData.prototype.add_ladder_achievement_star = function (tt) {
        var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.GARRISION_TYPE);
        if (!buildData || buildData.buildLvl < 1) {
            this._ladder_star += tt;
        }
        this._total_star += tt;
        GameManager_1.gm.data.task_data.update_task_progress(TaskData_1.TaskConditionType.GET_STAR, tt);
        var LadderAchievementConfig = GameManager_1.gm.config.get_row_data("LadderAchievementConfigData", this.achievement_id + "");
        if (this._total_star >= LadderAchievementConfig.star) {
            var rewardArray = GameManager_1.gm.data.ladder_temp_data.ladder_achievement_data_array[this.achievement_id - 1].reward_array;
            TempData_1.TempData.is_need_open_barrkPanel = !1;
            for (var index = 0; index < rewardArray.length; index++) {
                var reward = rewardArray[index];
                if (23001 <= reward.reward_id && reward.reward_id <= 23099) {
                    GameManager_1.gm.data.mapCell_data.reelUnlcokHero(reward.reward_id);
                    cc.Canvas.instance.scheduleOnce(function () {
                        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GetReel.key, true);
                        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GetReel);
                    }, 0.1);
                    TempData_1.TempData.is_need_open_barrkPanel = true;
                }
                else if (reward.reward_id == Constants_1.RewardIdEnum.GOLD) {
                    GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, reward.reward_num);
                }
                else if (reward.reward_id == Constants_1.RewardIdEnum.DIAMOND) {
                    GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, reward.reward_num);
                }
                else if (reward.reward_id == Constants_1.RewardIdEnum.BARREL) {
                    GameManager_1.gm.data.mapCell_data.addBarrelNum(reward.reward_num);
                }
                else {
                    var arr = [];
                    for (var r = 0; r < reward.reward_num; r++)
                        arr.push(reward.reward_id);
                    GameManager_1.gm.data.mapCell_data.addWareHouseList(arr);
                }
            }
            this.achievement_id++;
            NetUtils_1.ReportData.instance.report_once_point(10700 + this.achievement_id);
            GameManager_1.gm.data.event_emitter.emit("ladder_achievement_upgrade");
        }
        this.async_write_data();
        GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.STAR, GameManager_1.gm.ui.mapMainUI.ship.convertToNodeSpaceAR(cc.Vec3.ZERO));
    }; // end: add_ladder_achievement_star
    // @
    LadderData.prototype.async_read_data = function (callback) {
        var self = this;
        _super.prototype.async_read_data.call(this, function (data) {
            if (self.is_init) {
                self.fight_count = self.fight_count === null ? 0 : self.fight_count;
            }
            else {
                self.achievement_id = 1;
                NetUtils_1.ReportData.instance.report_once_point(10700 + self.achievement_id);
                self._ladder_star = 0;
                self.fight_count = 0;
                self.is_init = true;
                self.async_write_data();
            }
            callback && callback(data);
        });
    };
    // @
    LadderData.prototype.async_write_data = function (callback) {
        GameManager_1.gm.data.event_emitter.emit(LadderData.EVENT_DATA_CHANGE);
        _super.prototype.async_write_data.call(this, callback);
    };
    LadderData.EVENT_DATA_CHANGE = "fight_data_change";
    return LadderData;
}(StorageBase_1.StorageBase));
exports.LadderData = LadderData;

cc._RF.pop();