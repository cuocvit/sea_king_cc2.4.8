
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/LadderTempData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '549deruUyBNt701m6xZwyP1', 'LadderTempData');
// start-scene/scripts/LadderTempData.ts

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
exports.LadderTempData = exports.LadderRewardData = exports.LadderRankRewardItemData = exports.LadderAchievementItemData = exports.LadderBuildingRankItemData = exports.LadderRankItemData = void 0;
var SingletonBase_1 = require("./SingletonBase");
var GameManager_1 = require("./GameManager");
var Constants_1 = require("./Constants");
// @
var LadderMyItemData = /** @class */ (function () {
    function LadderMyItemData() {
        this.lv = 0;
        this.config = null;
    }
    return LadderMyItemData;
}());
/*
// cũng có thể viết ES5 Constructor Function như bên dưới để tạo ra mã giống phiên bản
// gốc nhưng cần phải tạo thêm interface, không thuận tiện bằng sử dụng ES6 Classes.
interface LadderMyItemData {
    lv: number;
    config: any;
}
export const LadderMyItemData = function () {
    this.lv = 0 as number,
    this.config = null as any;
}; */
// @
var LadderRankItemData = /** @class */ (function () {
    function LadderRankItemData() {
        this.lv = 0;
        this.rank = 0;
        this.name = "";
        this.star = 0;
        this.uid = "";
    }
    return LadderRankItemData;
}());
exports.LadderRankItemData = LadderRankItemData;
// @
var LadderBuildingRankItemData = /** @class */ (function () {
    function LadderBuildingRankItemData() {
        this.lv = 0;
        this.rank = 0;
        this.name = "";
        this.castle_level = 0;
        this.uid = "";
    }
    return LadderBuildingRankItemData;
}());
exports.LadderBuildingRankItemData = LadderBuildingRankItemData;
// @
var LadderAchievementItemData = /** @class */ (function () {
    function LadderAchievementItemData() {
        this.id = 0;
        this.star = 0;
        this.state = 0;
        this.reward_array = [];
    }
    return LadderAchievementItemData;
}());
exports.LadderAchievementItemData = LadderAchievementItemData;
// @
var LadderRankRewardItemData = /** @class */ (function () {
    function LadderRankRewardItemData() {
        this.lv = 0;
        this.rank_a = 0;
        this.rank_b = 0;
        this.reward_array = [];
    }
    return LadderRankRewardItemData;
}());
exports.LadderRankRewardItemData = LadderRankRewardItemData;
//
var LadderRewardData = /** @class */ (function () {
    function LadderRewardData() {
        this.reward_id = 0;
        this.reward_num = 0;
    }
    return LadderRewardData;
}());
exports.LadderRewardData = LadderRewardData;
// @
var LadderTempData = /** @class */ (function (_super) {
    __extends(LadderTempData, _super);
    function LadderTempData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._ladder_achievement_data_array = [];
        _this._ladder_reward_data_array = [];
        _this._total_star = 0;
        _this.rank = 0;
        _this.arch_rank = 0;
        _this.castle_level = 0;
        _this._ladder_my_item_data_array = [];
        _this.ladder_rank_item_data_array = [];
        _this.ladder_building_rank_item_data_array = [];
        _this.self_rank_item_data = null;
        _this.self_building_rank_item_data = null;
        return _this;
    }
    Object.defineProperty(LadderTempData.prototype, "total_star", {
        // @
        get: function () {
            var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.GARRISION_TYPE);
            return !buildData || buildData.buildLvl < 1 ? GameManager_1.gm.data.ladder_data.ladder_star : this._total_star;
        },
        // @
        set: function (value) {
            this._total_star = value;
        },
        enumerable: false,
        configurable: true
    });
    // @
    LadderTempData.prototype.change_star_num = function (value) {
        if (value > 0) {
            GameManager_1.gm.data.ladder_data.add_ladder_achievement_star(value);
            this._total_star += value;
        }
        else {
            this._total_star = Math.max(0, this._total_star + value);
        }
        GameManager_1.gm.data.event_emitter.emit("ladder_star_change");
    };
    Object.defineProperty(LadderTempData.prototype, "ladder_my_item_data_array", {
        // @
        get: function () {
            if (this._ladder_my_item_data_array.length === 0) {
                this.build_ladder_my_item_data_array();
            }
            return this._ladder_my_item_data_array;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LadderTempData.prototype, "ladder_achievement_data_array", {
        // @
        get: function () {
            if (this._ladder_achievement_data_array.length === 0) {
                this.build_ladder_achievement_data_array();
            }
            return this._ladder_achievement_data_array;
        },
        enumerable: false,
        configurable: true
    });
    // @
    LadderTempData.prototype.build_ladder_achievement_data_array = function () {
        this._ladder_achievement_data_array = [];
        var configData = GameManager_1.gm.config.get_config_data("LadderAchievementConfigData");
        for (var key in configData.data) {
            var achievementData = configData.data[key];
            var achievementItem = new LadderAchievementItemData();
            achievementItem.id = achievementData.id;
            achievementItem.star = achievementData.star;
            achievementItem.state = 0;
            achievementItem.reward_array = [];
            for (var _i = 0, _a = achievementData.reward_array; _i < _a.length; _i++) {
                var reward = _a[_i];
                if (reward.reward_id > 0 && reward.reward_num > 0) {
                    var rewardItem = new LadderRewardData();
                    rewardItem.reward_id = reward.reward_id;
                    rewardItem.reward_num = reward.reward_num;
                    achievementItem.reward_array.push(rewardItem);
                }
            }
            this._ladder_achievement_data_array[achievementItem.id - 1] = achievementItem;
        }
    };
    // @
    LadderTempData.prototype.build_ladder_my_item_data_array = function () {
        this._ladder_my_item_data_array = [];
        var configData = GameManager_1.gm.config.get_config_data("LadderLvConfigData");
        var totalItems = Object.keys(configData.data).length;
        for (var key in configData.data) {
            var itemData = configData.data[key];
            var myItem = new LadderMyItemData();
            myItem.lv = itemData.lv;
            myItem.config = itemData;
            this._ladder_my_item_data_array[totalItems - myItem.lv] = myItem;
        }
    };
    // @
    LadderTempData.prototype.async_get_ladder_rank_item_data_array = function (callback) {
        var _this = this;
        var requestData = {
            uid: GameManager_1.gm.data.server_data.uid,
            token: GameManager_1.gm.data.server_data.token,
            op_type: "1"
        };
        GameManager_1.gm.data.server_data.get_score_rank(function (response) {
            if (response.ResultCode === 0 && response.data != null) {
                _this.ladder_rank_item_data_array = [];
                _this.self_rank_item_data = null;
                for (var _i = 0, _a = response.data; _i < _a.length; _i++) {
                    var rankData = _a[_i];
                    var rankItem = new LadderRankItemData();
                    rankItem.lv = _this.convert_rank_to_lv(rankData.rank);
                    rankItem.rank = rankData.rank;
                    rankItem.name = rankData.nickname;
                    rankItem.star = rankData.scores;
                    rankItem.uid = rankData.uid.toString();
                    if (rankItem.uid === GameManager_1.gm.data.server_data.uid) {
                        _this.self_rank_item_data = rankItem;
                    }
                    _this.ladder_rank_item_data_array.push(rankItem);
                }
                if (!_this.self_rank_item_data) {
                    _this.self_rank_item_data = new LadderRankItemData();
                    _this.self_rank_item_data.lv = _this.convert_rank_to_lv(_this.rank);
                    _this.self_rank_item_data.name = GameManager_1.gm.data.server_data.nickname;
                    _this.self_rank_item_data.star = _this.total_star;
                    _this.self_rank_item_data.rank = _this.rank;
                }
                callback();
            }
        }, requestData);
    }; // end: async_get_ladder_rank_item_data_array
    // @
    LadderTempData.prototype.async_get_building_rank_item_data_array = function (callback) {
        var _this = this;
        var requestData = {
            uid: GameManager_1.gm.data.server_data.uid,
            token: GameManager_1.gm.data.server_data.token
        };
        GameManager_1.gm.data.server_data.get_arch_rank(function (response) {
            if (response.ResultCode === 0 && response.data != null) {
                _this.ladder_building_rank_item_data_array = [];
                _this.self_building_rank_item_data = null;
                for (var _i = 0, _a = response.data; _i < _a.length; _i++) {
                    var buildingRankData = _a[_i];
                    var buildingRankItem = new LadderBuildingRankItemData();
                    buildingRankItem.lv = _this.convert_building_rank_to_lv(buildingRankData.rank);
                    buildingRankItem.rank = buildingRankData.rank;
                    buildingRankItem.name = buildingRankData.nickname;
                    buildingRankItem.castle_level = buildingRankData.castle_level;
                    buildingRankItem.uid = buildingRankData.uid.toString();
                    if (buildingRankItem.uid === GameManager_1.gm.data.server_data.uid) {
                        _this.self_building_rank_item_data = buildingRankItem;
                    }
                    _this.ladder_building_rank_item_data_array.push(buildingRankItem);
                }
                if (!_this.self_building_rank_item_data) {
                    _this.self_building_rank_item_data = new LadderBuildingRankItemData();
                    _this.self_building_rank_item_data.lv = _this.convert_building_rank_to_lv(_this.arch_rank);
                    _this.self_building_rank_item_data.name = GameManager_1.gm.data.server_data.nickname;
                    _this.self_building_rank_item_data.castle_level = _this.castle_level;
                    _this.self_building_rank_item_data.rank = _this.arch_rank;
                }
                callback();
            }
        }, requestData);
    }; // end: async_get_building_rank_item_data_array
    // @
    LadderTempData.prototype.convert_rank_to_lv = function (rank) {
        var configData = GameManager_1.gm.config.get_config_data("LadderLvConfigData");
        for (var key in configData.data) {
            var levelData = configData.data[key];
            if (rank >= levelData.ranking_a && rank <= levelData.ranking_b) {
                return levelData.lv;
            }
        }
        return 1;
    };
    // @
    LadderTempData.prototype.convert_building_rank_to_lv = function (rank) {
        var configData = GameManager_1.gm.config.get_config_data("LadderBuildingConfigData");
        for (var key in configData.data) {
            var levelData = configData.data[key];
            if (rank >= levelData.ranking_a && rank <= levelData.ranking_b) {
                return levelData.lv;
            }
        }
        return 1;
    };
    // @
    LadderTempData.prototype.get_ladder_reward_data_array = function (index) {
        this._ladder_reward_data_array = [];
        var rowData = GameManager_1.gm.config.get_row_data_array("LadderRewardConfigData", index.toString());
        console.log("rowData", rowData);
        for (var _i = 0, rowData_1 = rowData; _i < rowData_1.length; _i++) {
            var rewardData = rowData_1[_i];
            var rewardItem = new LadderRankRewardItemData();
            rewardItem.lv = rewardData.lv;
            rewardItem.rank_a = rewardData.ranking_a;
            rewardItem.rank_b = rewardData.ranking_b;
            rewardItem.reward_array = [];
            for (var _a = 0, _b = rewardData.reward_array; _a < _b.length; _a++) {
                var reward = _b[_a];
                if (reward.reward_id > 0 && reward.reward_num > 0) {
                    var rewardDetail = new LadderRewardData();
                    rewardDetail.reward_id = reward.reward_id;
                    rewardDetail.reward_num = reward.reward_num;
                    rewardItem.reward_array.push(rewardDetail);
                }
            }
            this._ladder_reward_data_array[rewardItem.lv - 1] = rewardItem;
        }
        return this._ladder_reward_data_array;
    };
    return LadderTempData;
}(SingletonBase_1.SingletonBase));
exports.LadderTempData = LadderTempData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXExhZGRlclRlbXBEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQsNkNBQW1DO0FBQ25DLHlDQUE0QztBQUs1QyxJQUFJO0FBQ0o7SUFBQTtRQUNXLE9BQUUsR0FBVyxDQUFDLENBQUM7UUFDZixXQUFNLEdBQW1CLElBQUksQ0FBQztJQUN6QyxDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQUhBLEFBR0MsSUFBQTtBQUNEOzs7Ozs7Ozs7O0tBVUs7QUFFTCxJQUFJO0FBQ0o7SUFBQTtRQUNXLE9BQUUsR0FBVyxDQUFDLENBQUM7UUFDZixTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBQ2pCLFNBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsU0FBSSxHQUFXLENBQUMsQ0FBQztRQUNqQixRQUFHLEdBQVcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFBRCx5QkFBQztBQUFELENBTkEsQUFNQyxJQUFBO0FBTlksZ0RBQWtCO0FBUS9CLElBQUk7QUFDSjtJQUFBO1FBQ1csT0FBRSxHQUFXLENBQUMsQ0FBQztRQUNmLFNBQUksR0FBVyxDQUFDLENBQUM7UUFDakIsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUN6QixRQUFHLEdBQVcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFBRCxpQ0FBQztBQUFELENBTkEsQUFNQyxJQUFBO0FBTlksZ0VBQTBCO0FBUXZDLElBQUk7QUFDSjtJQUFBO1FBQ1csT0FBRSxHQUFXLENBQUMsQ0FBQztRQUNmLFNBQUksR0FBVyxDQUFDLENBQUM7UUFDakIsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixpQkFBWSxHQUF1QixFQUFFLENBQUM7SUFDakQsQ0FBQztJQUFELGdDQUFDO0FBQUQsQ0FMQSxBQUtDLElBQUE7QUFMWSw4REFBeUI7QUFPdEMsSUFBSTtBQUNK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QVUsQ0FBQyxTQUFTLENBQUM7WUFDekMsVUFBVSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDO1lBQ3pDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBRTdCLEtBQXFCLFVBQXVCLEVBQXZCLEtBQUEsVUFBVSxDQUFDLFlBQVksRUFBdkIsY0FBdUIsRUFBdkIsSUFBdUIsRUFBRTtnQkFBekMsSUFBTSxNQUFNLFNBQUE7Z0JBQ2IsSUFBSSxNQUFNLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRTtvQkFDL0MsSUFBTSxZQUFZLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO29CQUM1QyxZQUFZLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7b0JBQzFDLFlBQVksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztvQkFDNUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQzlDO2FBQ0o7WUFDRCxJQUFJLENBQUMseUJBQXlCLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUM7U0FDbEU7UUFDRCxPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQztJQUMxQyxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQXZOQSxBQXVOQyxDQXZObUMsNkJBQWEsR0F1TmhEO0FBdk5ZLHdDQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2luZ2xldG9uQmFzZSB9IGZyb20gJy4vU2luZ2xldG9uQmFzZSc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IEJ1aWxkVHlwZUVudW0gfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IExhZGRlckJ1aWxkZGluZyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlncy9sYWRkZXJfYnVpbGRpbmdcIjtcclxuaW1wb3J0IHsgTGFkZGVyTFZDb25maWcgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9sYWRkZXJfbHYnO1xyXG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi9EYXRhTWFuYWdlcic7XHJcblxyXG4vLyBAXHJcbmNsYXNzIExhZGRlck15SXRlbURhdGEge1xyXG4gICAgcHVibGljIGx2OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGNvbmZpZzogTGFkZGVyTFZDb25maWcgPSBudWxsO1xyXG59XHJcbi8qIFxyXG4vLyBjxaluZyBjw7MgdGjhu4Mgdmnhur90IEVTNSBDb25zdHJ1Y3RvciBGdW5jdGlvbiBuaMawIGLDqm4gZMaw4bubaSDEkeG7gyB04bqhbyByYSBtw6MgZ2nhu5FuZyBwaGnDqm4gYuG6o25cclxuLy8gZ+G7kWMgbmjGsG5nIGPhuqduIHBo4bqjaSB04bqhbyB0aMOqbSBpbnRlcmZhY2UsIGtow7RuZyB0aHXhuq1uIHRp4buHbiBi4bqxbmcgc+G7rSBk4bulbmcgRVM2IENsYXNzZXMuXHJcbmludGVyZmFjZSBMYWRkZXJNeUl0ZW1EYXRhIHtcclxuICAgIGx2OiBudW1iZXI7XHJcbiAgICBjb25maWc6IGFueTtcclxufVxyXG5leHBvcnQgY29uc3QgTGFkZGVyTXlJdGVtRGF0YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMubHYgPSAwIGFzIG51bWJlcixcclxuICAgIHRoaXMuY29uZmlnID0gbnVsbCBhcyBhbnk7XHJcbn07ICovXHJcblxyXG4vLyBAXHJcbmV4cG9ydCBjbGFzcyBMYWRkZXJSYW5rSXRlbURhdGEge1xyXG4gICAgcHVibGljIGx2OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHJhbms6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBzdGFyOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHVpZDogc3RyaW5nID0gXCJcIjtcclxufVxyXG5cclxuLy8gQFxyXG5leHBvcnQgY2xhc3MgTGFkZGVyQnVpbGRpbmdSYW5rSXRlbURhdGEge1xyXG4gICAgcHVibGljIGx2OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHJhbms6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBjYXN0bGVfbGV2ZWw6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgdWlkOiBzdHJpbmcgPSBcIlwiO1xyXG59XHJcblxyXG4vLyBAXHJcbmV4cG9ydCBjbGFzcyBMYWRkZXJBY2hpZXZlbWVudEl0ZW1EYXRhIHtcclxuICAgIHB1YmxpYyBpZDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzdGFyOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHN0YXRlOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHJld2FyZF9hcnJheTogTGFkZGVyUmV3YXJkRGF0YVtdID0gW107XHJcbn1cclxuXHJcbi8vIEBcclxuZXhwb3J0IGNsYXNzIExhZGRlclJhbmtSZXdhcmRJdGVtRGF0YSB7XHJcbiAgICBwdWJsaWMgbHY6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgcmFua19hOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHJhbmtfYjogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyByZXdhcmRfYXJyYXk6IExhZGRlclJld2FyZERhdGFbXSA9IFtdO1xyXG59XHJcblxyXG4vL1xyXG5leHBvcnQgY2xhc3MgTGFkZGVyUmV3YXJkRGF0YSB7XHJcbiAgICBwdWJsaWMgcmV3YXJkX2lkOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHJld2FyZF9udW06IG51bWJlciA9IDA7XHJcbn1cclxuXHJcbi8vIEBcclxuZXhwb3J0IGNsYXNzIExhZGRlclRlbXBEYXRhIGV4dGVuZHMgU2luZ2xldG9uQmFzZSB7XHJcbiAgICBwcml2YXRlIF9sYWRkZXJfYWNoaWV2ZW1lbnRfZGF0YV9hcnJheTogTGFkZGVyQWNoaWV2ZW1lbnRJdGVtRGF0YVtdID0gW107XHJcbiAgICBwcml2YXRlIF9sYWRkZXJfcmV3YXJkX2RhdGFfYXJyYXk6IExhZGRlclJhbmtSZXdhcmRJdGVtRGF0YVtdID0gW107XHJcbiAgICBwcml2YXRlIF90b3RhbF9zdGFyOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHJhbms6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgYXJjaF9yYW5rOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGNhc3RsZV9sZXZlbDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX2xhZGRlcl9teV9pdGVtX2RhdGFfYXJyYXk6IExhZGRlck15SXRlbURhdGFbXSA9IFtdO1xyXG4gICAgcHVibGljIGxhZGRlcl9yYW5rX2l0ZW1fZGF0YV9hcnJheTogTGFkZGVyUmFua0l0ZW1EYXRhW10gPSBbXTtcclxuICAgIHB1YmxpYyBsYWRkZXJfYnVpbGRpbmdfcmFua19pdGVtX2RhdGFfYXJyYXk6IExhZGRlckJ1aWxkaW5nUmFua0l0ZW1EYXRhW10gPSBbXTtcclxuICAgIHB1YmxpYyBzZWxmX3JhbmtfaXRlbV9kYXRhOiBMYWRkZXJSYW5rSXRlbURhdGEgfCBudWxsID0gbnVsbDtcclxuICAgIHB1YmxpYyBzZWxmX2J1aWxkaW5nX3JhbmtfaXRlbV9kYXRhOiBMYWRkZXJCdWlsZGluZ1JhbmtJdGVtRGF0YSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIC8vIEBcclxuICAgIGdldCB0b3RhbF9zdGFyKCk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgYnVpbGREYXRhID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0QnVpbGREYXRhQnlUeXBlKEJ1aWxkVHlwZUVudW0uR0FSUklTSU9OX1RZUEUpO1xyXG4gICAgICAgIHJldHVybiAhYnVpbGREYXRhIHx8IGJ1aWxkRGF0YS5idWlsZEx2bCA8IDEgPyBnbS5kYXRhLmxhZGRlcl9kYXRhLmxhZGRlcl9zdGFyIDogdGhpcy5fdG90YWxfc3RhcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBzZXQgdG90YWxfc3Rhcih2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fdG90YWxfc3RhciA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBjaGFuZ2Vfc3Rhcl9udW0odmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh2YWx1ZSA+IDApIHtcclxuICAgICAgICAgICAgZ20uZGF0YS5sYWRkZXJfZGF0YS5hZGRfbGFkZGVyX2FjaGlldmVtZW50X3N0YXIodmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLl90b3RhbF9zdGFyICs9IHZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RvdGFsX3N0YXIgPSBNYXRoLm1heCgwLCB0aGlzLl90b3RhbF9zdGFyICsgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIuZW1pdChcImxhZGRlcl9zdGFyX2NoYW5nZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBnZXQgbGFkZGVyX215X2l0ZW1fZGF0YV9hcnJheSgpOiBMYWRkZXJNeUl0ZW1EYXRhW10ge1xyXG4gICAgICAgIGlmICh0aGlzLl9sYWRkZXJfbXlfaXRlbV9kYXRhX2FycmF5Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkX2xhZGRlcl9teV9pdGVtX2RhdGFfYXJyYXkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhZGRlcl9teV9pdGVtX2RhdGFfYXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgZ2V0IGxhZGRlcl9hY2hpZXZlbWVudF9kYXRhX2FycmF5KCk6IExhZGRlckFjaGlldmVtZW50SXRlbURhdGFbXSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xhZGRlcl9hY2hpZXZlbWVudF9kYXRhX2FycmF5Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkX2xhZGRlcl9hY2hpZXZlbWVudF9kYXRhX2FycmF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9sYWRkZXJfYWNoaWV2ZW1lbnRfZGF0YV9hcnJheTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwcml2YXRlIGJ1aWxkX2xhZGRlcl9hY2hpZXZlbWVudF9kYXRhX2FycmF5KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2xhZGRlcl9hY2hpZXZlbWVudF9kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgY29uc3QgY29uZmlnRGF0YSA9IGdtLmNvbmZpZy5nZXRfY29uZmlnX2RhdGEoXCJMYWRkZXJBY2hpZXZlbWVudENvbmZpZ0RhdGFcIik7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gY29uZmlnRGF0YS5kYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFjaGlldmVtZW50RGF0YSA9IGNvbmZpZ0RhdGEuZGF0YVtrZXldIGFzIExhZGRlckFjaGlldmVtZW50SXRlbURhdGE7XHJcbiAgICAgICAgICAgIGNvbnN0IGFjaGlldmVtZW50SXRlbSA9IG5ldyBMYWRkZXJBY2hpZXZlbWVudEl0ZW1EYXRhKCk7XHJcbiAgICAgICAgICAgIGFjaGlldmVtZW50SXRlbS5pZCA9IGFjaGlldmVtZW50RGF0YS5pZDtcclxuICAgICAgICAgICAgYWNoaWV2ZW1lbnRJdGVtLnN0YXIgPSBhY2hpZXZlbWVudERhdGEuc3RhcjtcclxuICAgICAgICAgICAgYWNoaWV2ZW1lbnRJdGVtLnN0YXRlID0gMDtcclxuICAgICAgICAgICAgYWNoaWV2ZW1lbnRJdGVtLnJld2FyZF9hcnJheSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCByZXdhcmQgb2YgYWNoaWV2ZW1lbnREYXRhLnJld2FyZF9hcnJheSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJld2FyZC5yZXdhcmRfaWQgPiAwICYmIHJld2FyZC5yZXdhcmRfbnVtID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJld2FyZEl0ZW0gPSBuZXcgTGFkZGVyUmV3YXJkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJld2FyZEl0ZW0ucmV3YXJkX2lkID0gcmV3YXJkLnJld2FyZF9pZDtcclxuICAgICAgICAgICAgICAgICAgICByZXdhcmRJdGVtLnJld2FyZF9udW0gPSByZXdhcmQucmV3YXJkX251bTtcclxuICAgICAgICAgICAgICAgICAgICBhY2hpZXZlbWVudEl0ZW0ucmV3YXJkX2FycmF5LnB1c2gocmV3YXJkSXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fbGFkZGVyX2FjaGlldmVtZW50X2RhdGFfYXJyYXlbYWNoaWV2ZW1lbnRJdGVtLmlkIC0gMV0gPSBhY2hpZXZlbWVudEl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgYnVpbGRfbGFkZGVyX215X2l0ZW1fZGF0YV9hcnJheSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9sYWRkZXJfbXlfaXRlbV9kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgY29uc3QgY29uZmlnRGF0YSA9IGdtLmNvbmZpZy5nZXRfY29uZmlnX2RhdGEoXCJMYWRkZXJMdkNvbmZpZ0RhdGFcIik7XHJcbiAgICAgICAgY29uc3QgdG90YWxJdGVtcyA9IE9iamVjdC5rZXlzKGNvbmZpZ0RhdGEuZGF0YSkubGVuZ3RoO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBjb25maWdEYXRhLmRhdGEpIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbURhdGEgPSBjb25maWdEYXRhLmRhdGFba2V5XSBhcyBMYWRkZXJMVkNvbmZpZztcclxuICAgICAgICAgICAgY29uc3QgbXlJdGVtID0gbmV3IExhZGRlck15SXRlbURhdGEoKTtcclxuICAgICAgICAgICAgbXlJdGVtLmx2ID0gaXRlbURhdGEubHY7XHJcbiAgICAgICAgICAgIG15SXRlbS5jb25maWcgPSBpdGVtRGF0YTtcclxuICAgICAgICAgICAgdGhpcy5fbGFkZGVyX215X2l0ZW1fZGF0YV9hcnJheVt0b3RhbEl0ZW1zIC0gbXlJdGVtLmx2XSA9IG15SXRlbTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGFzeW5jX2dldF9sYWRkZXJfcmFua19pdGVtX2RhdGFfYXJyYXkoY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCByZXF1ZXN0RGF0YTogcmVxdWVzdCA9IHtcclxuICAgICAgICAgICAgdWlkOiBnbS5kYXRhLnNlcnZlcl9kYXRhLnVpZCxcclxuICAgICAgICAgICAgdG9rZW46IGdtLmRhdGEuc2VydmVyX2RhdGEudG9rZW4sXHJcbiAgICAgICAgICAgIG9wX3R5cGU6IFwiMVwiXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZ20uZGF0YS5zZXJ2ZXJfZGF0YS5nZXRfc2NvcmVfcmFuaygocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLlJlc3VsdENvZGUgPT09IDAgJiYgcmVzcG9uc2UuZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhZGRlcl9yYW5rX2l0ZW1fZGF0YV9hcnJheSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxmX3JhbmtfaXRlbV9kYXRhID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHJhbmtEYXRhIG9mIHJlc3BvbnNlLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByYW5rSXRlbSA9IG5ldyBMYWRkZXJSYW5rSXRlbURhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICByYW5rSXRlbS5sdiA9IHRoaXMuY29udmVydF9yYW5rX3RvX2x2KHJhbmtEYXRhLnJhbmspO1xyXG4gICAgICAgICAgICAgICAgICAgIHJhbmtJdGVtLnJhbmsgPSByYW5rRGF0YS5yYW5rO1xyXG4gICAgICAgICAgICAgICAgICAgIHJhbmtJdGVtLm5hbWUgPSByYW5rRGF0YS5uaWNrbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICByYW5rSXRlbS5zdGFyID0gcmFua0RhdGEuc2NvcmVzO1xyXG4gICAgICAgICAgICAgICAgICAgIHJhbmtJdGVtLnVpZCA9IHJhbmtEYXRhLnVpZC50b1N0cmluZygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmFua0l0ZW0udWlkID09PSBnbS5kYXRhLnNlcnZlcl9kYXRhLnVpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGZfcmFua19pdGVtX2RhdGEgPSByYW5rSXRlbTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYWRkZXJfcmFua19pdGVtX2RhdGFfYXJyYXkucHVzaChyYW5rSXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNlbGZfcmFua19pdGVtX2RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGZfcmFua19pdGVtX2RhdGEgPSBuZXcgTGFkZGVyUmFua0l0ZW1EYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxmX3JhbmtfaXRlbV9kYXRhLmx2ID0gdGhpcy5jb252ZXJ0X3JhbmtfdG9fbHYodGhpcy5yYW5rKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGZfcmFua19pdGVtX2RhdGEubmFtZSA9IGdtLmRhdGEuc2VydmVyX2RhdGEubmlja25hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxmX3JhbmtfaXRlbV9kYXRhLnN0YXIgPSB0aGlzLnRvdGFsX3N0YXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxmX3JhbmtfaXRlbV9kYXRhLnJhbmsgPSB0aGlzLnJhbms7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgcmVxdWVzdERhdGEpO1xyXG4gICAgfSAvLyBlbmQ6IGFzeW5jX2dldF9sYWRkZXJfcmFua19pdGVtX2RhdGFfYXJyYXlcclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgYXN5bmNfZ2V0X2J1aWxkaW5nX3JhbmtfaXRlbV9kYXRhX2FycmF5KGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcmVxdWVzdERhdGEgPSB7XHJcbiAgICAgICAgICAgIHVpZDogZ20uZGF0YS5zZXJ2ZXJfZGF0YS51aWQsXHJcbiAgICAgICAgICAgIHRva2VuOiBnbS5kYXRhLnNlcnZlcl9kYXRhLnRva2VuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZ20uZGF0YS5zZXJ2ZXJfZGF0YS5nZXRfYXJjaF9yYW5rKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuUmVzdWx0Q29kZSA9PT0gMCAmJiByZXNwb25zZS5kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFkZGVyX2J1aWxkaW5nX3JhbmtfaXRlbV9kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGZfYnVpbGRpbmdfcmFua19pdGVtX2RhdGEgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYnVpbGRpbmdSYW5rRGF0YSBvZiByZXNwb25zZS5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYnVpbGRpbmdSYW5rSXRlbSA9IG5ldyBMYWRkZXJCdWlsZGluZ1JhbmtJdGVtRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkaW5nUmFua0l0ZW0ubHYgPSB0aGlzLmNvbnZlcnRfYnVpbGRpbmdfcmFua190b19sdihidWlsZGluZ1JhbmtEYXRhLnJhbmspO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkaW5nUmFua0l0ZW0ucmFuayA9IGJ1aWxkaW5nUmFua0RhdGEucmFuaztcclxuICAgICAgICAgICAgICAgICAgICBidWlsZGluZ1JhbmtJdGVtLm5hbWUgPSBidWlsZGluZ1JhbmtEYXRhLm5pY2tuYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkaW5nUmFua0l0ZW0uY2FzdGxlX2xldmVsID0gYnVpbGRpbmdSYW5rRGF0YS5jYXN0bGVfbGV2ZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRpbmdSYW5rSXRlbS51aWQgPSBidWlsZGluZ1JhbmtEYXRhLnVpZC50b1N0cmluZygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYnVpbGRpbmdSYW5rSXRlbS51aWQgPT09IGdtLmRhdGEuc2VydmVyX2RhdGEudWlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZl9idWlsZGluZ19yYW5rX2l0ZW1fZGF0YSA9IGJ1aWxkaW5nUmFua0l0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFkZGVyX2J1aWxkaW5nX3JhbmtfaXRlbV9kYXRhX2FycmF5LnB1c2goYnVpbGRpbmdSYW5rSXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNlbGZfYnVpbGRpbmdfcmFua19pdGVtX2RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGZfYnVpbGRpbmdfcmFua19pdGVtX2RhdGEgPSBuZXcgTGFkZGVyQnVpbGRpbmdSYW5rSXRlbURhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGZfYnVpbGRpbmdfcmFua19pdGVtX2RhdGEubHYgPSB0aGlzLmNvbnZlcnRfYnVpbGRpbmdfcmFua190b19sdih0aGlzLmFyY2hfcmFuayk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxmX2J1aWxkaW5nX3JhbmtfaXRlbV9kYXRhLm5hbWUgPSBnbS5kYXRhLnNlcnZlcl9kYXRhLm5pY2tuYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZl9idWlsZGluZ19yYW5rX2l0ZW1fZGF0YS5jYXN0bGVfbGV2ZWwgPSB0aGlzLmNhc3RsZV9sZXZlbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGZfYnVpbGRpbmdfcmFua19pdGVtX2RhdGEucmFuayA9IHRoaXMuYXJjaF9yYW5rO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHJlcXVlc3REYXRhKTtcclxuICAgIH0gLy8gZW5kOiBhc3luY19nZXRfYnVpbGRpbmdfcmFua19pdGVtX2RhdGFfYXJyYXlcclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgY29udmVydF9yYW5rX3RvX2x2KHJhbms6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgY29uZmlnRGF0YSA9IGdtLmNvbmZpZy5nZXRfY29uZmlnX2RhdGEoXCJMYWRkZXJMdkNvbmZpZ0RhdGFcIik7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gY29uZmlnRGF0YS5kYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxldmVsRGF0YSA9IGNvbmZpZ0RhdGEuZGF0YVtrZXldIGFzIExhZGRlckxWQ29uZmlnO1xyXG4gICAgICAgICAgICBpZiAocmFuayA+PSBsZXZlbERhdGEucmFua2luZ19hICYmIHJhbmsgPD0gbGV2ZWxEYXRhLnJhbmtpbmdfYikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxldmVsRGF0YS5sdjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgY29udmVydF9idWlsZGluZ19yYW5rX3RvX2x2KHJhbms6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgY29uZmlnRGF0YSA9IGdtLmNvbmZpZy5nZXRfY29uZmlnX2RhdGEoXCJMYWRkZXJCdWlsZGluZ0NvbmZpZ0RhdGFcIik7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gY29uZmlnRGF0YS5kYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxldmVsRGF0YSA9IGNvbmZpZ0RhdGEuZGF0YVtrZXldIGFzIExhZGRlckJ1aWxkZGluZztcclxuICAgICAgICAgICAgaWYgKHJhbmsgPj0gbGV2ZWxEYXRhLnJhbmtpbmdfYSAmJiByYW5rIDw9IGxldmVsRGF0YS5yYW5raW5nX2IpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsZXZlbERhdGEubHY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldF9sYWRkZXJfcmV3YXJkX2RhdGFfYXJyYXkoaW5kZXg6IG51bWJlcik6IExhZGRlclJhbmtSZXdhcmRJdGVtRGF0YVtdIHtcclxuICAgICAgICB0aGlzLl9sYWRkZXJfcmV3YXJkX2RhdGFfYXJyYXkgPSBbXTtcclxuICAgICAgICBjb25zdCByb3dEYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YV9hcnJheShcIkxhZGRlclJld2FyZENvbmZpZ0RhdGFcIiwgaW5kZXgudG9TdHJpbmcoKSkgYXMgTGFkZGVyQnVpbGRkaW5nW107XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJyb3dEYXRhXCIsIHJvd0RhdGEpO1xyXG4gICAgICAgIGZvciAoY29uc3QgcmV3YXJkRGF0YSBvZiByb3dEYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJld2FyZEl0ZW0gPSBuZXcgTGFkZGVyUmFua1Jld2FyZEl0ZW1EYXRhKCk7XHJcbiAgICAgICAgICAgIHJld2FyZEl0ZW0ubHYgPSByZXdhcmREYXRhLmx2O1xyXG4gICAgICAgICAgICByZXdhcmRJdGVtLnJhbmtfYSA9IHJld2FyZERhdGEucmFua2luZ19hO1xyXG4gICAgICAgICAgICByZXdhcmRJdGVtLnJhbmtfYiA9IHJld2FyZERhdGEucmFua2luZ19iO1xyXG4gICAgICAgICAgICByZXdhcmRJdGVtLnJld2FyZF9hcnJheSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCByZXdhcmQgb2YgcmV3YXJkRGF0YS5yZXdhcmRfYXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXdhcmQucmV3YXJkX2lkID4gMCAmJiByZXdhcmQucmV3YXJkX251bSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXdhcmREZXRhaWwgPSBuZXcgTGFkZGVyUmV3YXJkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJld2FyZERldGFpbC5yZXdhcmRfaWQgPSByZXdhcmQucmV3YXJkX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgIHJld2FyZERldGFpbC5yZXdhcmRfbnVtID0gcmV3YXJkLnJld2FyZF9udW07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkSXRlbS5yZXdhcmRfYXJyYXkucHVzaChyZXdhcmREZXRhaWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2xhZGRlcl9yZXdhcmRfZGF0YV9hcnJheVtyZXdhcmRJdGVtLmx2IC0gMV0gPSByZXdhcmRJdGVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fbGFkZGVyX3Jld2FyZF9kYXRhX2FycmF5O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==