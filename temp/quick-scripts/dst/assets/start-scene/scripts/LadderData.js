
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/LadderData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXExhZGRlckRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUE0QztBQUM1Qyx5Q0FBMEU7QUFDMUUsdUNBQStDO0FBQy9DLHVDQUFzQztBQUN0Qyx1Q0FBd0M7QUFDeEMsNkNBQW1DO0FBR25DLElBQUk7QUFDSjtJQUFnQyw4QkFBVztJQVd2QyxJQUFJO0lBQ0o7UUFBQSxZQUNJLGlCQUFPLFNBQ1Y7UUFaRCxFQUFFO1FBQ0ssaUJBQVcsR0FBVyxZQUFZLENBQUM7UUFDbkMsb0JBQWMsR0FBVyxDQUFDLENBQUM7UUFDM0IsZ0JBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsaUJBQVcsR0FBVyxDQUFDLENBQUM7UUFDL0IsRUFBRTtRQUNNLGtCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLGlCQUFXLEdBQVcsQ0FBQyxDQUFDOztJQUtoQyxDQUFDO0lBR0Qsc0JBQUksbUNBQVc7UUFEZixJQUFJO2FBQ0o7WUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSxrQ0FBVTtRQURkLElBQUk7YUFDSjtZQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUVELElBQUk7SUFDRyxnREFBMkIsR0FBbEMsVUFBbUMsRUFBVTtRQUN6QyxJQUFNLFNBQVMsR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMseUJBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDO1NBQzNCO1FBRUQsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7UUFDdkIsZ0JBQUUsQ0FBQyxJ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QUMsQ0FBQztRQUN6RCxpQkFBTSxnQkFBZ0IsWUFBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBL0ZzQiw0QkFBaUIsR0FBRyxtQkFBbUIsQ0FBQztJQWdHbkUsaUJBQUM7Q0FqR0QsQUFpR0MsQ0FqRytCLHlCQUFXLEdBaUcxQztBQWpHWSxnQ0FBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0b3JhZ2VCYXNlIH0gZnJvbSAnLi9TdG9yYWdlQmFzZSc7XHJcbmltcG9ydCB7IEJ1aWxkVHlwZUVudW0sIFJld2FyZElkRW51bSwgU2V0SXRlbU51bUVudW0gfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IFRhc2tDb25kaXRpb25UeXBlIH0gZnJvbSAnLi9UYXNrRGF0YSc7XHJcbmltcG9ydCB7IFRlbXBEYXRhIH0gZnJvbSAnLi9UZW1wRGF0YSc7XHJcbmltcG9ydCB7IFJlcG9ydERhdGEgfSBmcm9tICcuL05ldFV0aWxzJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgTGFkZGVyQWNoaWV2ZW1lbnRDb25maWcgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9sYWRkZXJfYWNoaWV2ZW1lbnQnO1xyXG5cclxuLy8gQFxyXG5leHBvcnQgY2xhc3MgTGFkZGVyRGF0YSBleHRlbmRzIFN0b3JhZ2VCYXNlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRVZFTlRfREFUQV9DSEFOR0UgPSBcImZpZ2h0X2RhdGFfY2hhbmdlXCI7XHJcbiAgICAvL1xyXG4gICAgcHVibGljIFNUT1JBR0VfS0VZOiBzdHJpbmcgPSBcIkxhZGRlckRhdGFcIjtcclxuICAgIHB1YmxpYyBhY2hpZXZlbWVudF9pZDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBmYWlsX2NvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGZpZ2h0X2NvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgLy9cclxuICAgIHByaXZhdGUgX2xhZGRlcl9zdGFyOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfdG90YWxfc3RhcjogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvLyBAXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIGdldCBsYWRkZXJfc3RhcigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sYWRkZXJfc3RhcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBnZXQgdG90YWxfc3RhcigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90b3RhbF9zdGFyO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBhZGRfbGFkZGVyX2FjaGlldmVtZW50X3N0YXIodHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGJ1aWxkRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldEJ1aWxkRGF0YUJ5VHlwZShCdWlsZFR5cGVFbnVtLkdBUlJJU0lPTl9UWVBFKTtcclxuICAgICAgICBpZiAoIWJ1aWxkRGF0YSB8fCBidWlsZERhdGEuYnVpbGRMdmwgPCAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhZGRlcl9zdGFyICs9IHR0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdG90YWxfc3RhciArPSB0dDtcclxuICAgICAgICBnbS5kYXRhLnRhc2tfZGF0YS51cGRhdGVfdGFza19wcm9ncmVzcyhUYXNrQ29uZGl0aW9uVHlwZS5HRVRfU1RBUiwgdHQpO1xyXG4gICAgICAgIGNvbnN0IExhZGRlckFjaGlldmVtZW50Q29uZmlnID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkxhZGRlckFjaGlldmVtZW50Q29uZmlnRGF0YVwiLCB0aGlzLmFjaGlldmVtZW50X2lkICsgXCJcIikgYXMgTGFkZGVyQWNoaWV2ZW1lbnRDb25maWc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuX3RvdGFsX3N0YXIgPj0gTGFkZGVyQWNoaWV2ZW1lbnRDb25maWcuc3Rhcikge1xyXG4gICAgICAgICAgICBjb25zdCByZXdhcmRBcnJheSA9IGdtLmRhdGEubGFkZGVyX3RlbXBfZGF0YS5sYWRkZXJfYWNoaWV2ZW1lbnRfZGF0YV9hcnJheVt0aGlzLmFjaGlldmVtZW50X2lkIC0gMV0ucmV3YXJkX2FycmF5O1xyXG4gICAgICAgICAgICBUZW1wRGF0YS5pc19uZWVkX29wZW5fYmFycmtQYW5lbCA9ICExO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcmV3YXJkQXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXdhcmQgPSByZXdhcmRBcnJheVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAoMjMwMDEgPD0gcmV3YXJkLnJld2FyZF9pZCAmJiByZXdhcmQucmV3YXJkX2lkIDw9IDIzMDk5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEucmVlbFVubGNva0hlcm8ocmV3YXJkLnJld2FyZF9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuQ2FudmFzLmluc3RhbmNlLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5HZXRSZWVsLmtleSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LkdldFJlZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDAuMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgVGVtcERhdGEuaXNfbmVlZF9vcGVuX2JhcnJrUGFuZWwgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmV3YXJkLnJld2FyZF9pZCA9PSBSZXdhcmRJZEVudW0uR09MRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNldEFkZEdhbWVDb2luKFNldEl0ZW1OdW1FbnVtLkFERF9JVEVNX1RZUEUsIHJld2FyZC5yZXdhcmRfbnVtKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJld2FyZC5yZXdhcmRfaWQgPT0gUmV3YXJkSWRFbnVtLkRJQU1PTkQpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zZXRBZGRHYW1lRGlhbW9uZChTZXRJdGVtTnVtRW51bS5BRERfSVRFTV9UWVBFLCByZXdhcmQucmV3YXJkX251bSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJld2FyZC5yZXdhcmRfaWQgPT0gUmV3YXJkSWRFbnVtLkJBUlJFTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZEJhcnJlbE51bShyZXdhcmQucmV3YXJkX251bSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnI6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCByZXdhcmQucmV3YXJkX251bTsgcisrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChyZXdhcmQucmV3YXJkX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5hZGRXYXJlSG91c2VMaXN0KGFycilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5hY2hpZXZlbWVudF9pZCsrO1xyXG4gICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwNzAwICsgdGhpcy5hY2hpZXZlbWVudF9pZCk7XHJcbiAgICAgICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5lbWl0KFwibGFkZGVyX2FjaGlldmVtZW50X3VwZ3JhZGVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgIGdtLnVpLnNob3dfY29pbl9mbHkoUmV3YXJkSWRFbnVtLlNUQVIsIGdtLnVpLm1hcE1haW5VSS5zaGlwLmNvbnZlcnRUb05vZGVTcGFjZUFSKGNjLlZlYzMuWkVSTykpO1xyXG4gICAgfSAvLyBlbmQ6IGFkZF9sYWRkZXJfYWNoaWV2ZW1lbnRfc3RhclxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBhc3luY19yZWFkX2RhdGE8VD4oY2FsbGJhY2s6IChkYXRhOiBUKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc3VwZXIuYXN5bmNfcmVhZF9kYXRhKChkYXRhOiBUKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmlzX2luaXQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZmlnaHRfY291bnQgPSBzZWxmLmZpZ2h0X2NvdW50ID09PSBudWxsID8gMCA6IHNlbGYuZmlnaHRfY291bnQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmFjaGlldmVtZW50X2lkID0gMTtcclxuICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTA3MDAgKyBzZWxmLmFjaGlldmVtZW50X2lkKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2xhZGRlcl9zdGFyID0gMDtcclxuICAgICAgICAgICAgICAgIHNlbGYuZmlnaHRfY291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5pc19pbml0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBhc3luY193cml0ZV9kYXRhKGNhbGxiYWNrPzogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5lbWl0KExhZGRlckRhdGEuRVZFTlRfREFUQV9DSEFOR0UpO1xyXG4gICAgICAgIHN1cGVyLmFzeW5jX3dyaXRlX2RhdGEoY2FsbGJhY2spO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==