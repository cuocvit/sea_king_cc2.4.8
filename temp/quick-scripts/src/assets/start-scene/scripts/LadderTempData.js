"use strict";
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