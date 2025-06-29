
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/FightTempData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '942e00+e+1COph70mzQJBIJ', 'FightTempData');
// start-scene/scripts/FightTempData.ts

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
exports.BuffItemData = exports.FightMatchData = exports.FightResultData = exports.FightTargetSortData = exports.FightWallItemData = exports.FightBuildingItemData = exports.EdgeEnum = exports.FightMapItemData = exports.FightMapConfigData = exports.FightRewardItemData = exports.FightResultPropItemData = exports.FightDecorationItemData = exports.FightPropItemData = exports.BasePropItemData = exports.FightHeroItemData = exports.FightTempData = void 0;
var NetUtils_1 = require("./NetUtils");
var ChannelManager_1 = require("./ChannelManager");
var Constants_1 = require("./Constants");
var AStar_1 = require("./AStar");
var GameManager_1 = require("./GameManager");
var SingletonBase_1 = require("./SingletonBase");
var Utils_1 = require("./Utils");
var ConfigData_1 = require("./ConfigData");
var ConstantsData_1 = require("./ConstantsData");
var FightConstants_1 = require("./FightConstants");
var FightData_1 = require("./FightData");
var MapCellCfgData_1 = require("./MapCellCfgData");
//
var FightTempData = /** @class */ (function (_super) {
    __extends(FightTempData, _super);
    //
    function FightTempData() {
        var _this = _super.call(this) || this;
        _this.is_debug = false;
        _this.fight_state = FightData_1.FightState.NONE;
        _this.record_fight_state = FightData_1.FightState.NONE;
        _this.delta_time = 0;
        _this.total_time = 0;
        _this.has_pop_revive = false;
        _this.reward_data_array = [];
        _this.goto_battle_count = 0;
        _this.death_hero_count = 0;
        _this.in_battle_hero_data = null;
        _this.map_item_array = [];
        _this.map_item_data_array = [];
        _this.prop_item_array = [];
        _this.prop_data_array = [];
        _this.building_item_array = [];
        _this.building_data_array = [];
        _this.defense_hero_array = [];
        _this.defense_hero_data_array = [];
        _this.passive_hero_data_array = [];
        _this.hero_item_array = [];
        _this.hero_data_array = [];
        _this.wall_item_array = [];
        _this.wall_data_array = [];
        _this.decoration_item_array = [];
        _this.decoration_data_array = [];
        _this.fight_result_data = null;
        _this.battle_hero_array = [];
        _this.open_battle_panel_state = 0;
        _this.fight_match_data_array = [];
        _this.building_destroy_array = [];
        _this.hero_death_array = [];
        _this.skill_item_array = [];
        _this.skill_data_array = [];
        _this.play_type = -1;
        _this.map_id = 2;
        _this.map_data_id = 1;
        _this.name = "Unknown Island"; // 无名岛 -> Unknown Island
        _this.boat_id = 60001;
        _this.goal_uid = "";
        _this.defensive_data = {
            uid: "",
            nickname: "",
            star: 0,
            boat_id: 0,
            map_data_array: [],
            hero_data_array: []
        };
        _this.offset_col = cc.v2(75, -20);
        _this.offset_row = cc.v2(-31, -51);
        _this.min_offset = cc.Vec2.ZERO;
        _this.max_offset = cc.Vec2.ZERO;
        _this.map_start_position = cc.Vec3.ZERO;
        _this.boat_start_position = cc.Vec3.ZERO;
        _this.map_size = cc.Vec2.ZERO;
        _this.edge_map = {
            LEFT: cc.v2(-1, 0),
            BOTTOM: cc.v2(0, 1),
            RIGHT: cc.v2(1, 0),
            TOP: cc.v2(0, -1)
        };
        _this.map_end_many_times = 1;
        _this.show_return_btn_timestamp = 0;
        return _this;
    } // end: constructor
    ;
    Object.defineProperty(FightTempData.prototype, "left_fight_time", {
        // @
        get: function () {
            return Math.max(0, Math.floor(ConstantsData_1.ConstantsData.instance.MAX_FIGHT_TIME - GameManager_1.gm.data.fight_temp_data.total_time));
        },
        enumerable: false,
        configurable: true
    });
    // @
    FightTempData.prototype.build_play_map_data = function () {
        var t;
        this.map_item_data_array = [];
        this.building_data_array = [];
        this.prop_data_array = [];
        this.defense_hero_data_array = [];
        this.passive_hero_data_array = [];
        this.wall_data_array = [];
        if (0 == this.play_type && "" != this.goal_uid) {
            this.name = this.defensive_data.nickname + "\nUID:" + this.defensive_data.uid;
            this.boat_id = this.defensive_data.boat_id;
            this.map_size.x = GameManager_1.gm.const.MAX_ROW;
            this.map_size.y = GameManager_1.gm.const.MAX_COLUMN;
            var o = [181, 195, 204, 216, 215, 225, 243, 254, 253, 248, 232, 221, 207, 199, 186, 170, 153, 154, 171, 187, 200, 208, 209, 201, 188, 189, 174, 123, 122, 108, , 53, 39, 27, 18, 8, 26, 37, 49, 36, 35, 25, 28, 40, 41, 54, 96, 125, 190, 202, 213, 214, 203, 193, 194, 120, 107, 121, 137];
            var n = [];
            for (var index = 0; index < this.defensive_data.map_data_array.length; index++) {
                var mapData = this.defensive_data.map_data_array[index];
                if (mapData) {
                    var fightMapItemData = new FightMapItemData;
                    fightMapItemData.item_type = mapData.item_type;
                    fightMapItemData.item_id = mapData.item_id;
                    fightMapItemData.skill_lv = mapData.skill_lv;
                    fightMapItemData.star_lv = mapData.star_lv || 0;
                    fightMapItemData.grid_index = GameManager_1.gm.data.config_data.getMapIndexByCellID(mapData.cell_id);
                    fightMapItemData.grid_position = cc.v2(fightMapItemData.grid_index % this.map_size.x, Math.floor(fightMapItemData.grid_index / this.map_size.x));
                    fightMapItemData.position = this.grid_position_to_floor_position(fightMapItemData.grid_position);
                    var mapcellCfg = GameManager_1.gm.data.config_data.getMapCellCfgByID(mapData.cell_id);
                    fightMapItemData.land_id = mapcellCfg.landImgID;
                    if (0 < mapcellCfg.plantID) {
                        var fightDecorationItemData = new FightDecorationItemData;
                        fightDecorationItemData.decoration_id = mapcellCfg.plantID;
                        fightDecorationItemData.plant_x_offset = mapcellCfg.plantXOffset;
                        fightDecorationItemData.plant_y_offset = mapcellCfg.plantYOffset;
                        fightDecorationItemData.grid_index = fightMapItemData.grid_index;
                        fightDecorationItemData.grid_position = fightMapItemData.grid_position;
                        fightDecorationItemData.array_index = this.decoration_data_array.length;
                        fightMapItemData.decoration_index = this.decoration_data_array.length;
                        this.decoration_data_array.push(fightDecorationItemData);
                    }
                    fightMapItemData.cell_id = fightMapItemData.grid_index;
                    fightMapItemData.plant_id = mapcellCfg.plantID;
                    fightMapItemData.land_img_id = mapcellCfg.landImgID;
                    fightMapItemData.land_y_offset = mapcellCfg.landYOffset + 9;
                    fightMapItemData.plant_x_offset = mapcellCfg.plantXOffset;
                    fightMapItemData.plant_y_offset = mapcellCfg.plantYOffset;
                    fightMapItemData.water_img_id = 0;
                    fightMapItemData.is_obstruct = mapcellCfg.isObstruct;
                    fightMapItemData.enter = -1 < o.indexOf(mapData.cell_id) ? 0 : 1;
                    0 == mapcellCfg.plantID && 0 == fightMapItemData.is_obstruct && 0 == fightMapItemData.item_type && n.push(fightMapItemData.grid_index);
                    this.map_item_data_array[fightMapItemData.grid_index] = fightMapItemData;
                }
            }
            var s = undefined;
            for (var r = 0; r < this.map_item_data_array.length; r++) {
                if (s = this.map_item_data_array[r]) {
                    if (1 == s.item_type) {
                        var fightPropItemData = new FightPropItemData;
                        fightPropItemData.grid_index = s.grid_index;
                        fightPropItemData.grid_position = s.grid_position;
                        fightPropItemData.id = s.item_id;
                        fightPropItemData.num = 1;
                        s.prop_index = this.prop_data_array.length;
                        this.prop_data_array.push(fightPropItemData);
                        var common = this.special_prop_to_common_prop(fightPropItemData);
                        this.get_reward_data(common.id).max_num += common.num;
                    }
                    else if (2 == s.item_type) {
                        var fightBuildingItemData = new FightBuildingItemData;
                        fightBuildingItemData.grid_index = s.grid_index;
                        fightBuildingItemData.grid_position = s.grid_position;
                        fightBuildingItemData.id = s.item_id;
                        fightBuildingItemData.reward_array = [];
                        var rowData = GameManager_1.gm.config.get_row_data("BuildConfigData", fightBuildingItemData.id.toString());
                        if (rowData) {
                            fightBuildingItemData.star_count = rowData.star;
                            fightBuildingItemData.hp = fightBuildingItemData.max_hp = rowData.hp;
                            fightBuildingItemData.defense = rowData.defense;
                            fightBuildingItemData.attack_value = rowData.attack;
                            fightBuildingItemData.call_range = rowData.call;
                            fightBuildingItemData.attack_interval = rowData.attack_interval;
                            fightBuildingItemData.attack_range = rowData.attack_range;
                            fightBuildingItemData.fly_weapon_name = rowData.fly_weapon_name;
                            fightBuildingItemData.lv = rowData.buildLv;
                            this.get_reward_data(Constants_1.RewardIdEnum.STAR).max_num += rowData.star;
                            if (0 < rowData.material) {
                                var basePropItemData = new BasePropItemData;
                                basePropItemData.id = rowData.material;
                                basePropItemData.num = rowData.quantity;
                                fightBuildingItemData.reward_array[fightBuildingItemData.reward_array.length] = basePropItemData;
                                var common = this.special_prop_to_common_prop(basePropItemData);
                                this.get_reward_data(common.id).max_num += common.num;
                            }
                            else if (0 < rowData.coin) {
                                var basePropItemData = new BasePropItemData;
                                basePropItemData.id = Constants_1.RewardIdEnum.GOLD;
                                basePropItemData.num = rowData.coin;
                                fightBuildingItemData.reward_array[fightBuildingItemData.reward_array.length] = basePropItemData;
                                this.get_reward_data(basePropItemData.id).max_num += basePropItemData.num;
                            }
                        }
                        fightBuildingItemData.array_index = this.building_data_array.length;
                        s.building_index = this.building_data_array.length;
                        this.building_data_array.push(fightBuildingItemData);
                        this.is_main_city(fightBuildingItemData.id) && (t = fightBuildingItemData);
                    }
                    else if (3 == s.item_type) {
                        var l;
                        var _ = s.item_id;
                        var F = GameManager_1.gm.config.get_row_data("HeroConfigData", _.toString());
                        if (F) {
                            if (10 == F.occupation || 12 == F.occupation) {
                                var fightWallItemData = new FightWallItemData;
                                fightWallItemData.grid_index = s.grid_index;
                                fightWallItemData.grid_position = s.grid_position;
                                fightWallItemData.id = _;
                                fightWallItemData.lv = F.lv;
                                fightWallItemData.skill_id = F.skill_id;
                                fightWallItemData.passive_skill_array = F.passive_skill_array;
                                fightWallItemData.skill_lv = s.skill_lv || 1;
                                fightWallItemData.star_lv = s.star_lv || 0;
                                var d = GameManager_1.gm.data.config_data.getStarCfgByID(F.arms, fightWallItemData.star_lv);
                                fightWallItemData.occupation = F.occupation;
                                fightWallItemData.hp = fightWallItemData.max_hp = Math.floor(F.hp * (d ? d.hp + 1 : 1));
                                fightWallItemData.attack_type = F.attack_type;
                                fightWallItemData.attack_anim_time = F.attack_anim_time;
                                fightWallItemData.fly_weapon_name = F.fly_weapon_name;
                                fightWallItemData.fly_weapon_time = F.fly_weapon_time;
                                if ("" != F.fly_weapon_position_array) {
                                    fightWallItemData.fly_weapon_position_array = [];
                                    var p = F.fly_weapon_position_array.split("|");
                                    for (var h = 0; h < p.length; h++) {
                                        var V = p[h].split(",");
                                        if (2 == V.length) {
                                            fightWallItemData.fly_weapon_position_array[h] = cc.v3(parseInt(V[0].trim()), parseInt(V[1].trim()));
                                        }
                                        else {
                                            // cc.error("配置的数据格式有错误");
                                            cc.error("Định dạng dữ liệu được cấu hình không đúng.");
                                        }
                                    }
                                }
                                fightWallItemData.attack_value = Math.floor(F.attack * (d ? d.attack + 1 : 1));
                                fightWallItemData.attack_interval = F.attack_interval;
                                fightWallItemData.attack_range = F.range;
                                fightWallItemData.search_range = F.search_range;
                                fightWallItemData.defense_value = F.defense + (d ? d.defense : 0);
                                fightWallItemData.last_attack_time = 0;
                                fightWallItemData.call_range = GameManager_1.gm.const.WALL_CALL_RANGE;
                                fightWallItemData.array_index = this.wall_data_array.length;
                                s.wall_index = fightWallItemData.array_index;
                                this.wall_data_array.push(fightWallItemData);
                            }
                            else {
                                var fightHeroItemData = new FightHeroItemData;
                                fightHeroItemData.grid_index = s.grid_index;
                                fightHeroItemData.grid_position = s.grid_position;
                                fightHeroItemData.id = _;
                                fightHeroItemData.lv = F.lv;
                                fightHeroItemData.skill_id = F.skill_id;
                                fightHeroItemData.skill_lv = s.skill_lv || 0;
                                fightHeroItemData.star_lv = s.star_lv || 0;
                                var d_1 = GameManager_1.gm.data.config_data.getStarCfgByID(F.arms, fightHeroItemData.star_lv);
                                fightHeroItemData.passive_skill_array = F.passive_skill_array;
                                fightHeroItemData.hero_type = F.hero_type;
                                fightHeroItemData.hp = fightHeroItemData.max_hp = Math.floor(F.hp * (d_1 ? d_1.hp + 1 : 1));
                                fightHeroItemData.attack_type = F.attack_type;
                                fightHeroItemData.attack_anim_time = F.attack_anim_time;
                                fightHeroItemData.fly_weapon_name = F.fly_weapon_name;
                                fightHeroItemData.fly_weapon_time = F.fly_weapon_time;
                                if ("" != F.fly_weapon_position_array) {
                                    fightHeroItemData.fly_weapon_position_array = [];
                                    var p = F.fly_weapon_position_array.split("|");
                                    for (var u = 0; u < p.length; u++) {
                                        var V = p[u].split(",");
                                        if (2 == V.length) {
                                            fightHeroItemData.fly_weapon_position_array[u] = cc.v3(parseInt(V[0].trim()), parseInt(V[1].trim()));
                                        }
                                        else {
                                            // cc.error("配置的数据格式有错误");
                                            cc.error("Định dạng dữ liệu được cấu hình không đúng.");
                                        }
                                    }
                                }
                                fightHeroItemData.attack_value = Math.floor(F.attack * (d_1 ? d_1.attack + 1 : 1));
                                fightHeroItemData.attack_interval = F.attack_interval;
                                fightHeroItemData.attack_range = F.range;
                                fightHeroItemData.search_range = F.search_range;
                                fightHeroItemData.move_speed = F.speed + (d_1 ? d_1.speed : 0);
                                fightHeroItemData.defense_value = F.defense + (d_1 ? d_1.defense : 0);
                                fightHeroItemData.occupation = F.occupation;
                                fightHeroItemData.type = FightConstants_1.HeroType.DEFENSE;
                                fightHeroItemData.last_attack_time = 0;
                                if (11 == F.occupation) {
                                    fightHeroItemData.array_index = this.passive_hero_data_array.length;
                                    this.passive_hero_data_array.push(fightHeroItemData);
                                }
                                else {
                                    fightHeroItemData.array_index = this.defense_hero_data_array.length;
                                    var l_1 = s.add_defense_hero_index(this.defense_hero_data_array.length);
                                    fightHeroItemData.offset = l_1.offset;
                                    this.defense_hero_data_array.push(fightHeroItemData);
                                }
                            }
                        }
                    }
                }
            }
            var m = [16003, 17002, 16002, 17002, 16001, 17002, 16001];
            for (var r = 0; r < m.length; r++) {
                var g = m[r];
                var mathRandom = Utils_1.Utils.math_random(!0, 0, n.length);
                if (-1 < mathRandom) {
                    var splice = n.splice(mathRandom, 1)[0];
                    var itemData = this.map_item_data_array[splice];
                    if ((itemData) && 0 == itemData.item_type) {
                        itemData.item_type = 1;
                        itemData.item_id = g;
                        var fightPropItemData = new FightPropItemData;
                        fightPropItemData.grid_index = itemData.grid_index;
                        fightPropItemData.grid_position = itemData.grid_position;
                        fightPropItemData.id = g;
                        fightPropItemData.num = 1;
                        itemData.prop_index = this.prop_data_array.length;
                        this.prop_data_array.push(fightPropItemData);
                        var common = this.special_prop_to_common_prop(fightPropItemData);
                        this.get_reward_data(common.id).max_num += common.num;
                    }
                }
            }
            this.a_star = new AStar_1.AStar;
            var y = undefined;
            for (var r = 0; r < this.map_item_data_array.length; r++) {
                y = this.map_item_data_array[r];
                if ((y) && -1 == y.edge_flag) {
                    y.edge_flag = this.calculate_edge_flag(y.grid_position);
                }
            }
            var v = this.grid = new AStar_1.Grid(this.map_size.x, this.map_size.y);
            for (var r = 0; r < this.map_item_data_array.length; r++) {
                y = this.map_item_data_array[r];
                if ((y) && -1 == y.building_index && -1 == y.wall_index && y.is_obstruct <= 0) {
                    v.setWalkable(y.grid_position.x, y.grid_position.y, true);
                }
            }
            if (t) {
                var D = t.grid_position.x - 3;
                var I = t.grid_position.x + 3;
                var E = t.grid_position.y - 3;
                var C = t.grid_position.y + 3;
                var T = undefined;
                for (var r = D; r <= I; r++) {
                    for (var b = E; b <= C; b++) {
                        T = this.get_fight_map_item_data(r, b);
                        if ((T) && 0 < T.enter) {
                            (T.enter = 0);
                        }
                    }
                }
            }
            var w = this.grid_position_to_floor_position(cc.v2(0, this.map_size.y));
            var N = this.grid_position_to_floor_position(cc.v2(this.map_size.x, 0));
            var A = this.grid_position_to_floor_position(cc.v2(0, 0));
            var O = this.grid_position_to_floor_position(cc.v2(this.map_size.x, this.map_size.y));
            this.min_offset.x = -N.x - cc.Canvas.instance.node.width / 2;
            this.max_offset.x = -w.x + cc.Canvas.instance.node.width / 2;
            this.min_offset.y = 0;
            this.max_offset.y = A.y - O.y;
            this.map_start_position = cc.v3(-396, 1110);
            this.boat_start_position = cc.v3(300, -500);
        }
        else {
            var RowData = GameManager_1.gm.config.get_row_data_array("PlayMapConfigData", this.map_id.toString());
            for (var r = 0; r < RowData.length; r++) {
                var S = RowData[r];
                if (S) {
                    if (0 == r) {
                        this.map_size.x = S.col;
                        this.map_size.y = S.row;
                    }
                    var fightMapItemData = new FightMapItemData();
                    fightMapItemData.grid_index = S.cell_id;
                    fightMapItemData.grid_position = cc.v2(fightMapItemData.grid_index % this.map_size.x, Math.floor(fightMapItemData.grid_index / this.map_size.x));
                    fightMapItemData.position = this.grid_position_to_floor_position(fightMapItemData.grid_position);
                    fightMapItemData.land_id = S.land_img_id;
                    if (0 < S.plant_id) {
                        var fightDecorationItemData = new FightDecorationItemData();
                        fightDecorationItemData.decoration_id = S.plant_id;
                        fightDecorationItemData.plant_x_offset = S.plant_x_offset;
                        fightDecorationItemData.plant_y_offset = S.plant_y_offset;
                        fightDecorationItemData.grid_index = fightMapItemData.grid_index;
                        fightDecorationItemData.grid_position = fightMapItemData.grid_position;
                        fightDecorationItemData.array_index = this.decoration_data_array.length;
                        fightMapItemData.decoration_index = this.decoration_data_array.length;
                        this.decoration_data_array.push(fightDecorationItemData);
                    }
                    fightMapItemData.cell_id = S.cell_id;
                    fightMapItemData.plant_id = S.plant_id;
                    fightMapItemData.land_img_id = S.land_img_id;
                    fightMapItemData.land_y_offset = S.land_y_offset + 9;
                    fightMapItemData.plant_x_offset = S.plant_x_offset;
                    fightMapItemData.plant_y_offset = S.plant_y_offset;
                    fightMapItemData.water_img_id = S.water_img_id;
                    this.map_item_data_array[fightMapItemData.grid_index] = fightMapItemData;
                }
            }
            var map = this.map_id + "_" + this.map_data_id;
            var k = undefined;
            if (0 == this.play_type || 1 == this.play_type) {
                k = GameManager_1.gm.config.get_row_data_array("PlayDataConfigData", map);
            }
            else if (2 == this.play_type) {
                k = GameManager_1.gm.config.get_row_data_array("PlayCavesConfigData", map);
            }
            var L = void 0;
            var s = undefined;
            var H = (s = undefined, 0);
            for (var r = 0; r < k.length; r++) {
                L = k[r];
                var s_1 = this.map_item_data_array[L.cell_id];
                var S = RowData[r];
                if (s_1) {
                    s_1.enter = L.enter;
                    0 < s_1.enter && H++;
                    s_1.item_type = L.item_type;
                    s_1.item_id = L.item_id;
                    s_1.is_obstruct = L.is_obstruct;
                    if (1 == L.item_type) {
                        var fightPropItemData = new FightPropItemData();
                        fightPropItemData.grid_index = s_1.grid_index;
                        fightPropItemData.grid_position = s_1.grid_position;
                        fightPropItemData.id = L.item_id;
                        fightPropItemData.num = 1;
                        s_1.prop_index = this.prop_data_array.length;
                        this.prop_data_array.push(fightPropItemData);
                        var c = this.special_prop_to_common_prop(fightPropItemData);
                        this.get_reward_data(c.id).max_num += c.num;
                    }
                    else if (2 == L.item_type) {
                        var fightBuildingItemData = new FightBuildingItemData();
                        fightBuildingItemData.grid_index = s_1.grid_index;
                        fightBuildingItemData.grid_position = s_1.grid_position;
                        fightBuildingItemData.id = L.item_id;
                        fightBuildingItemData.reward_array = [];
                        var rowData = GameManager_1.gm.config.get_row_data("BuildConfigData", fightBuildingItemData.id.toString());
                        if (rowData) {
                            fightBuildingItemData.star_count = rowData.star;
                            fightBuildingItemData.hp = fightBuildingItemData.max_hp = rowData.hp;
                            fightBuildingItemData.defense = rowData.defense;
                            fightBuildingItemData.attack_value = rowData.attack;
                            fightBuildingItemData.call_range = rowData.call;
                            fightBuildingItemData.attack_interval = rowData.attack_interval;
                            fightBuildingItemData.attack_range = rowData.attack_range;
                            fightBuildingItemData.fly_weapon_name = rowData.fly_weapon_name;
                            fightBuildingItemData.lv = rowData.buildLv;
                            this.get_reward_data(Constants_1.RewardIdEnum.STAR).max_num += rowData.star;
                            if (0 < rowData.material) {
                                var basePropItemData = new BasePropItemData();
                                basePropItemData.id = rowData.material;
                                basePropItemData.num = rowData.quantity;
                                fightBuildingItemData.reward_array[fightBuildingItemData.reward_array.length] = basePropItemData;
                                var common = this.special_prop_to_common_prop(basePropItemData);
                                this.get_reward_data(common.id).max_num += common.num;
                            }
                            if (0 < rowData.coin) {
                                var basePropItemData = new BasePropItemData();
                                basePropItemData.id = Constants_1.RewardIdEnum.GOLD;
                                basePropItemData.num = rowData.coin;
                                fightBuildingItemData.reward_array[fightBuildingItemData.reward_array.length] = basePropItemData;
                                this.get_reward_data(basePropItemData.id).max_num += basePropItemData.num;
                            }
                        }
                        fightBuildingItemData.array_index = this.building_data_array.length;
                        s_1.building_index = this.building_data_array.length;
                        this.building_data_array.push(fightBuildingItemData);
                    }
                    else if (3 == L.item_type) {
                        var _ = L.item_id;
                        var F = GameManager_1.gm.config.get_row_data("HeroConfigData", _.toString());
                        if (F) {
                            if (10 == F.occupation || 12 == F.occupation) {
                                var fightWallItemData = new FightWallItemData();
                                fightWallItemData.grid_index = s_1.grid_index;
                                fightWallItemData.grid_position = s_1.grid_position;
                                fightWallItemData.id = _;
                                fightWallItemData.lv = F.lv;
                                fightWallItemData.skill_id = F.skill_id;
                                fightWallItemData.passive_skill_array = F.passive_skill_array;
                                fightWallItemData.skill_lv = L.skill_lv || 0;
                                fightWallItemData.star_lv = L.star_lv || 0;
                                var d_2 = GameManager_1.gm.data.config_data.getStarCfgByID(F.arms, fightWallItemData.star_lv);
                                fightWallItemData.occupation = F.occupation;
                                fightWallItemData.hp = fightWallItemData.max_hp = Math.floor(F.hp * (d_2 ? d_2.hp + 1 : 1));
                                fightWallItemData.attack_type = F.attack_type;
                                fightWallItemData.attack_anim_time = F.attack_anim_time;
                                fightWallItemData.fly_weapon_name = F.fly_weapon_name;
                                fightWallItemData.fly_weapon_time = F.fly_weapon_time;
                                if ("" != F.fly_weapon_position_array) {
                                    fightWallItemData.fly_weapon_position_array = [];
                                    var p = F.fly_weapon_position_array.split("|");
                                    for (var W = 0; W < p.length; W++) {
                                        var V = p[W].split(",");
                                        if (2 == V.length) {
                                            fightWallItemData.fly_weapon_position_array[W] = cc.v3(parseInt(V[0].trim()), parseInt(V[1].trim()));
                                        }
                                        else {
                                            // cc.error("配置的数据格式有错误");
                                            cc.error("Định dạng dữ liệu được cấu hình không đúng.");
                                        }
                                    }
                                }
                                fightWallItemData.attack_value = Math.floor(F.attack * (d_2 ? d_2.attack + 1 : 1));
                                fightWallItemData.attack_interval = F.attack_interval;
                                fightWallItemData.attack_range = F.range;
                                fightWallItemData.search_range = F.search_range;
                                fightWallItemData.defense_value = F.defense + (d_2 ? d_2.defense : 0);
                                fightWallItemData.last_attack_time = 0;
                                fightWallItemData.call_range = GameManager_1.gm.const.WALL_CALL_RANGE;
                                fightWallItemData.array_index = this.wall_data_array.length;
                                s_1.wall_index = fightWallItemData.array_index;
                                this.wall_data_array.push(fightWallItemData);
                            }
                            else {
                                var fightHeroItemData = new FightHeroItemData();
                                fightHeroItemData.grid_index = s_1.grid_index;
                                fightHeroItemData.grid_position = s_1.grid_position;
                                fightHeroItemData.id = _;
                                fightHeroItemData.lv = F.lv;
                                fightHeroItemData.skill_id = F.skill_id;
                                fightHeroItemData.skill_lv = L.skill_lv || 0;
                                fightHeroItemData.star_lv = L.star_lv || 0;
                                var d_3 = GameManager_1.gm.data.config_data.getStarCfgByID(F.arms, fightHeroItemData.star_lv);
                                fightHeroItemData.passive_skill_array = F.passive_skill_array;
                                fightHeroItemData.hero_type = F.hero_type;
                                fightHeroItemData.hp = fightHeroItemData.max_hp = Math.floor(F.hp * (d_3 ? d_3.hp + 1 : 1));
                                fightHeroItemData.attack_type = F.attack_type;
                                fightHeroItemData.attack_anim_time = F.attack_anim_time;
                                fightHeroItemData.fly_weapon_name = F.fly_weapon_name;
                                fightHeroItemData.fly_weapon_time = F.fly_weapon_time;
                                if ("" != F.fly_weapon_position_array) {
                                    fightHeroItemData.fly_weapon_position_array = [];
                                    var p = F.fly_weapon_position_array.split("|");
                                    var V = void 0;
                                    for (var K = 0; K < p.length; K++) {
                                        if (2 == (V = p[K].split(",")).length) {
                                            fightHeroItemData.fly_weapon_position_array[K] = cc.v3(parseInt(V[0].trim()), parseInt(V[1].trim()));
                                        }
                                        else {
                                            // cc.error("配置的数据格式有错误");
                                            cc.error("Định dạng dữ liệu được cấu hình không đúng.");
                                        }
                                    }
                                }
                                fightHeroItemData.attack_value = Math.floor(F.attack * (d_3 ? d_3.attack + 1 : 1));
                                fightHeroItemData.attack_interval = F.attack_interval;
                                fightHeroItemData.attack_range = F.range;
                                fightHeroItemData.search_range = F.search_range;
                                fightHeroItemData.move_speed = F.speed + (d_3 ? d_3.speed : 0);
                                fightHeroItemData.defense_value = F.defense + (d_3 ? d_3.defense : 0);
                                fightHeroItemData.occupation = F.occupation;
                                fightHeroItemData.type = FightConstants_1.HeroType.DEFENSE;
                                fightHeroItemData.last_attack_time = 0;
                                if (11 == F.occupation) {
                                    fightHeroItemData.array_index = this.passive_hero_data_array.length;
                                    this.passive_hero_data_array.push(fightHeroItemData);
                                }
                                else {
                                    fightHeroItemData.array_index = this.defense_hero_data_array.length;
                                    var l_2 = s_1.add_defense_hero_index(this.defense_hero_data_array.length);
                                    fightHeroItemData.offset = l_2.offset;
                                    this.defense_hero_data_array.push(fightHeroItemData);
                                }
                            }
                        }
                    }
                }
            }
            var D = cc.js.formatStr("map_id:%d,map_data_id:%d Bảng cấu hình số điểm hạ cánh %d", this.map_id, this.map_data_id, H);
            H <= 0 ? console.error(D) : console.log(D);
            this.a_star = new AStar_1.AStar;
            var y = undefined;
            for (var r = 0; r < this.map_item_data_array.length; r++) {
                var y_1 = this.map_item_data_array[r];
                if (y_1 && -1 == y_1.edge_flag) {
                    (y_1.edge_flag = this.calculate_edge_flag(y_1.grid_position));
                }
            }
            var v = this.grid = new AStar_1.Grid(this.map_size.x, this.map_size.y);
            for (var r = 0; r < this.map_item_data_array.length; r++) {
                var y_2 = this.map_item_data_array[r];
                if (y_2 && -1 == y_2.building_index && -1 == y_2.wall_index && y_2.is_obstruct <= 0) {
                    v.setWalkable(y_2.grid_position.x, y_2.grid_position.y, true);
                }
            }
            var w = this.grid_position_to_floor_position(cc.v2(0, this.map_size.y));
            var N = this.grid_position_to_floor_position(cc.v2(this.map_size.x, 0));
            var A = this.grid_position_to_floor_position(cc.v2(0, 0));
            var O = this.grid_position_to_floor_position(cc.v2(this.map_size.x, this.map_size.y));
            this.min_offset.x = -N.x - cc.Canvas.instance.node.width / 2;
            this.max_offset.x = -w.x + cc.Canvas.instance.node.width / 2;
            this.min_offset.y = 0;
            this.max_offset.y = A.y - O.y;
            this.map_start_position = cc.v3(-160, 166);
            this.boat_start_position = cc.v3(160, 210);
        }
        return this.map_item_data_array;
    }; // end: build_play_map_data
    // @
    FightTempData.prototype.getWalkable = function (position) {
        return this.grid.getWalkable(position.x, position.y);
    };
    // @
    FightTempData.prototype.get_alive_defense_hero_hp = function (hero_id) {
        for (var index = 0; index < this.fight_result_data.alive_defense_hero_data_array.length; index++) {
            var defenseHero = this.fight_result_data.alive_defense_hero_data_array[index];
            if (defenseHero.id == hero_id) {
                return defenseHero.hp;
            }
        }
        return 0;
    };
    // @
    FightTempData.prototype.get_all_result_data = function () {
        var resultData = [];
        var propDataArray = this.fight_result_data.prop_data_array;
        if (GameManager_1.gm.data.mapCell_data.isGuide) {
            propDataArray = [];
            var guideRewards = [
                [12001, 1],
                [11004, 14],
                [11005, 2],
                [13001, 1]
            ];
            for (var i = 0; i < guideRewards.length; i++) {
                var rewardItem = new FightResultPropItemData();
                rewardItem.type = 1;
                rewardItem.id = guideRewards[i][0];
                rewardItem.num = guideRewards[i][1];
                rewardItem.color = 1;
                propDataArray.push(rewardItem);
            }
        }
        //
        var diamondCount = 0;
        var garrisonData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.GARRISION_TYPE);
        for (var i = 0; i < propDataArray.length; i++) {
            var prop = propDataArray[i];
            if (prop.id !== Constants_1.RewardIdEnum.DIAMOND) {
                if (prop.id === Constants_1.RewardIdEnum.WOOD) {
                    prop.id = 16001;
                }
                else if (prop.id === Constants_1.RewardIdEnum.IRON) {
                    prop.id = 17001;
                }
                //
                if (!garrisonData || garrisonData.buildLvl < 1) {
                    if (prop.id < 30000) {
                        var itemCfg = GameManager_1.gm.data.config_data.getItemCfgByID(prop.id);
                        if (itemCfg) {
                            if (itemCfg.type === Constants_1.PropTypeEnum.WOOD_TYPE ||
                                itemCfg.type === Constants_1.PropTypeEnum.IRON_TYPE ||
                                itemCfg.type === Constants_1.PropTypeEnum.SHELL_MONEY_TYPE) {
                                var currencyId = 0;
                                if (itemCfg.type === Constants_1.PropTypeEnum.WOOD_TYPE) {
                                    currencyId = 16008;
                                }
                                else if (itemCfg.type === Constants_1.PropTypeEnum.IRON_TYPE) {
                                    currencyId = 17008;
                                }
                                else if (itemCfg.type === Constants_1.PropTypeEnum.SHELL_MONEY_TYPE) {
                                    currencyId = 25008;
                                }
                                GameManager_1.gm.data.mapCell_data.splitItemNum(prop.num * this.map_end_many_times, currencyId, 1);
                            }
                            else {
                                for (var j = 0; j < prop.num * this.map_end_many_times; j++) {
                                    resultData.push(prop.id);
                                }
                            }
                        }
                    }
                    else {
                        for (var j = 0; j < prop.num * this.map_end_many_times; j++) {
                            resultData.push(prop.id);
                        }
                    }
                }
                else {
                    var splitItem = GameManager_1.gm.data.high_to_low_level_prop(prop.id, prop.num * this.map_end_many_times);
                    var highProp = GameManager_1.gm.data.low_level_to_high_prop(splitItem.item_id, splitItem.item_num);
                    for (var j = 0; j < highProp.length; j++) {
                        var highItem = highProp[j];
                        for (var k = 0; k < highItem.item_num; k++) {
                            resultData.push(highItem.item_id);
                        }
                    }
                }
            }
            else {
                diamondCount = prop.num * this.map_end_many_times;
            }
        } // end: for
        // Xử lý kết thúc battle
        GameManager_1.gm.data.mapCell_data.isFirstBattle = false;
        GameManager_1.gm.data.mapCell_data.addWareHouseList(resultData);
        var heroBattleData = [];
        var defenseHeroData = [];
        if (this.goal_uid !== "" && this.play_type === 0 && this.defensive_data) {
            for (var i = 0; i < this.hero_data_array.length; i++) {
                var hero = this.hero_data_array[i];
                heroBattleData.push({
                    unique_id: 0,
                    id: hero.id,
                    hp: hero.hp
                });
            }
            //
            for (var i = 0; i < this.defensive_data.hero_data_array.length; i++) {
                var defenseHero = this.defensive_data.hero_data_array[i];
                defenseHeroData.push({
                    unique_id: defenseHero.unique_id,
                    id: defenseHero.hero_id,
                    hp: this.get_alive_defense_hero_hp(defenseHero.hero_id)
                });
            }
        }
        this.hero_data_array = [];
        var ladderLevel = GameManager_1.gm.data.ladder_temp_data.convert_rank_to_lv(GameManager_1.gm.data.ladder_temp_data.rank);
        var ladderConfig = GameManager_1.gm.config.get_row_data("LadderLvConfigData", ladderLevel.toString());
        //
        if (this.fight_result_data.result === 1) {
            if (this.goal_uid && this.play_type === 0) {
                var rewardItems = [];
                var nonStarRewards = [];
                for (var i = 0; i < propDataArray.length; i++) {
                    rewardItems.push({
                        id: propDataArray[i].id,
                        num: propDataArray[i].num
                    });
                }
                //
                var specialRewardIds = [Constants_1.RewardIdEnum.STAR, Constants_1.RewardIdEnum.GOLD, Constants_1.RewardIdEnum.DIAMOND];
                for (var i = 0; i < propDataArray.length; i++) {
                    if (specialRewardIds.indexOf(propDataArray[i].id) === -1) {
                        nonStarRewards.push({
                            id: propDataArray[i].id,
                            num: propDataArray[i].num
                        });
                    }
                }
                GameManager_1.gm.data.update_player_fight_data(this.fight_result_data.star_num, this.defensive_data.uid, this.defensive_data.nickname, this.defensive_data.star, -this.fight_result_data.star_num, this.fight_result_data.result, rewardItems, nonStarRewards, heroBattleData, defenseHeroData);
            }
            else {
                GameManager_1.gm.data.update_player_score_data_request(GameManager_1.gm.data.ladder_temp_data.total_star + this.fight_result_data.star_num);
            }
            GameManager_1.gm.data.ladder_temp_data.change_star_num(this.fight_result_data.star_num);
        }
        else {
            var garrisonData_1 = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.GARRISION_TYPE);
            if (garrisonData_1 && garrisonData_1.buildLvl >= 1) {
                GameManager_1.gm.data.ladder_temp_data.change_star_num(-ladderConfig.failed_star);
                if (this.goal_uid !== "" && this.play_type === 0) {
                    var rewardItems = [];
                    var nonStarRewards = [];
                    for (var i = 0; i < propDataArray.length; i++) {
                        rewardItems.push({
                            id: propDataArray[i].id,
                            num: propDataArray[i].num
                        });
                    }
                    GameManager_1.gm.data.update_player_fight_data(-ladderConfig.failed_star, this.defensive_data.uid, this.defensive_data.nickname, this.defensive_data.star, ladderConfig.success_star, this.fight_result_data.result, rewardItems, nonStarRewards, heroBattleData, defenseHeroData);
                }
                else {
                    GameManager_1.gm.data.update_player_score_data_request(GameManager_1.gm.data.ladder_temp_data.total_star - ladderConfig.failed_star);
                }
            }
        }
        if (diamondCount > 0) {
            GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, diamondCount);
            if (GameManager_1.gm.ui.mapMainUI && GameManager_1.gm.ui.mapMainUI.ship) {
                GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.DIAMOND, GameManager_1.gm.ui.mapMainUI.ship.convertToWorldSpaceAR(cc.Vec3.ZERO));
            }
        }
        GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, this.fight_result_data.gold_num * this.map_end_many_times);
        GameManager_1.gm.ui.mapMainUI.showBattleEndCoin(this.fight_result_data.gold_num * this.map_end_many_times);
    }; // end: get_all_result_data
    // @
    FightTempData.prototype.build_fight_result_data = function (isDebug) {
        if (isDebug === void 0) { isDebug = false; }
        var fightResult = new FightResultData;
        fightResult.result = this.fight_state == FightData_1.FightState.SUCCESS ? 1 : 2;
        fightResult.attacker_name = "???";
        fightResult.defender_name = this.name;
        fightResult.bucket_num = 0;
        fightResult.prop_data_array = [];
        if (!isDebug) {
            for (var r = 0; r < this.reward_data_array.length; r++) {
                var rewardData = this.reward_data_array[r];
                if (rewardData.id == Constants_1.RewardIdEnum.STAR) {
                    fightResult.star_num = rewardData.num;
                }
                else if (rewardData.id == Constants_1.RewardIdEnum.GOLD) {
                    fightResult.gold_num = rewardData.num;
                }
                else if (0 < rewardData.num) {
                    var fightResultPropItemData = new FightResultPropItemData;
                    fightResultPropItemData.type = 1;
                    fightResultPropItemData.id = rewardData.id;
                    fightResultPropItemData.num = 0 < rewardData.max_num ? Math.min(rewardData.num, rewardData.max_num) : rewardData.num;
                    var rowData = GameManager_1.gm.config.get_row_data("ItemConfigData", fightResultPropItemData.id.toString());
                    fightResultPropItemData.color = rowData ? rowData.color : 1;
                    fightResult.prop_data_array.push(fightResultPropItemData);
                }
            }
        }
        fightResult.death_hero_data_array = [];
        fightResult.alive_hero_data_array = [];
        for (var r = 0; r < this.hero_data_array.length; r++) {
            var e = this.hero_data_array[r];
            if (e.hp <= 0 && !isDebug) {
                var fightResultPropItemData = new FightResultPropItemData;
                fightResultPropItemData.type = 2;
                fightResultPropItemData.color = 1;
                fightResultPropItemData.id = e.id;
                fightResultPropItemData.num = 1;
                fightResult.death_hero_data_array.push(fightResultPropItemData);
            }
            else {
                fightResult.alive_hero_data_array.push(e);
            }
        }
        fightResult.alive_defense_hero_data_array = [];
        for (var r = 0; r < this.defense_hero_data_array.length; r++) {
            var a = this.defense_hero_data_array[r];
            if (a && 0 < a.hp) {
                fightResult.alive_defense_hero_data_array.push(a);
            }
        }
        this.fight_result_data = fightResult;
    }; // end: build_fight_result_data
    // @
    FightTempData.prototype.get_battle_hero_is_space = function () {
        var boat = GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE];
        var boatConfig = GameManager_1.gm.data.config_data.getBuildCfgByID(boat.buildID);
        if (boatConfig) {
            return this.battle_hero_array.length < boatConfig.capacity;
        }
        return undefined;
    };
    // @
    FightTempData.prototype.get_defense_hero_is_space = function () {
        var defenseBuilding = GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.GARRISION_TYPE];
        if (defenseBuilding && defenseBuilding.buildLvl >= 1) {
            var config = GameManager_1.gm.data.config_data.getBuildCfgByID(defenseBuilding.buildID);
            return config ? Object.keys(GameManager_1.gm.data.mapCell_data.getDefanseHeroData()).length < config.capacity : undefined;
        }
        return false;
    };
    // @
    FightTempData.prototype.getFightSuperHeroNum = function () {
        var count = 0;
        for (var _i = 0, _a = this.battle_hero_array; _i < _a.length; _i++) {
            var hero = _a[_i];
            if (GameManager_1.gm.data.config_data.getHeroCfgByID(hero.itemID).hero_type === Constants_1.HeroTypeEnum.SUPER_HERO_TYPE) {
                count++;
            }
        }
        return count;
    };
    // @
    FightTempData.prototype.build_hero_array = function (isDebug) {
        if (isDebug === void 0) { isDebug = false; }
        if (GameManager_1.gm.data.fight_temp_data.is_debug) {
            this.battle_hero_array = [];
            var heroIds = [31001, 31002, 31003, 32001, 32002, 32003, 33001, 33002, 33003, 34001, 34002, 34003];
            for (var index = 0; index < heroIds.length; index++) {
                var heroItem = new MapCellCfgData_1.roleGoBattleItemVO;
                heroItem.itemID = heroIds[index];
                this.battle_hero_array[this.battle_hero_array.length] = heroItem;
            }
        }
        for (var index = 0; index < this.battle_hero_array.length; index++) {
            var i;
            var battleHerro = this.battle_hero_array[index];
            var fightHeroItemData = new FightHeroItemData;
            fightHeroItemData.id = battleHerro.itemID;
            fightHeroItemData.cellID = battleHerro.cellID;
            var rowData = GameManager_1.gm.config.get_row_data("HeroConfigData", fightHeroItemData.id.toString());
            if (rowData) {
                fightHeroItemData.lv = rowData.lv;
                fightHeroItemData.skill_id = rowData.skill_id;
                fightHeroItemData.passive_skill_array = rowData.passive_skill_array;
                fightHeroItemData.hero_type = rowData.hero_type;
                var heroStar = GameManager_1.gm.data.hero_star_data.getHeroStarData(rowData.arms);
                fightHeroItemData.star_lv = heroStar ? heroStar.star : 0;
                if (1 == rowData.hero_type) {
                    fightHeroItemData.skill_lv = rowData.lv;
                    if (GameManager_1.gm.data.fight_temp_data.is_debug) {
                        fightHeroItemData.hp = fightHeroItemData.max_hp = Math.floor(rowData.hp * (heroStar ? heroStar.hp + 1 : 1));
                    }
                    else {
                        fightHeroItemData.max_hp = Math.floor(rowData.hp * (heroStar ? heroStar.hp + 1 : 1));
                        fightHeroItemData.hp = isDebug ? fightHeroItemData.max_hp : battleHerro.hp;
                    }
                }
                else {
                    if (GameManager_1.gm.data.fight_temp_data.is_debug) {
                        fightHeroItemData.skill_lv = 1;
                    }
                    else {
                        fightHeroItemData.skill_lv = GameManager_1.gm.data.mapCell_data.getRoleSkillData(fightHeroItemData.skill_id).lvl;
                    }
                    fightHeroItemData.hp = fightHeroItemData.max_hp = Math.floor(rowData.hp * (heroStar ? heroStar.hp + 1 : 1));
                }
                fightHeroItemData.attack_type = rowData.attack_type;
                fightHeroItemData.attack_anim_time = rowData.attack_anim_time;
                fightHeroItemData.fly_weapon_name = rowData.fly_weapon_name;
                fightHeroItemData.fly_weapon_time = rowData.fly_weapon_time;
                if ("" != rowData.fly_weapon_position_array) {
                    fightHeroItemData.fly_weapon_position_array = [];
                    var weaponPosition = rowData.fly_weapon_position_array.split("|");
                    if (2 == weaponPosition.length) {
                        for (var c = 0; c < weaponPosition.length; c++) {
                            var position = weaponPosition[c].split(",");
                            if (2 == position.length) {
                                fightHeroItemData.fly_weapon_position_array[c] = cc.v3(parseInt(position[0].trim()), parseInt(position[1].trim()));
                            }
                            else {
                                // cc.error("配置的数据格式有错误");
                                cc.error("Định dạng dữ liệu được cấu hình không đúng.");
                            }
                        }
                    }
                    else {
                        // cc.error("配置的数据格式有错误");
                        cc.error("Định dạng dữ liệu được cấu hình không đúng.");
                    }
                }
                fightHeroItemData.fly_weapon_name = rowData.fly_weapon_name;
                fightHeroItemData.attack_value = Math.floor(rowData.attack * (heroStar ? heroStar.attack + 1 : 1));
                fightHeroItemData.attack_interval = rowData.attack_interval;
                fightHeroItemData.attack_range = rowData.range;
                fightHeroItemData.search_range = rowData.search_range;
                fightHeroItemData.move_speed = rowData.speed + (heroStar ? heroStar.speed : 0);
                fightHeroItemData.defense_value = rowData.defense + (heroStar ? heroStar.defense : 0);
                fightHeroItemData.occupation = rowData.occupation;
            }
            fightHeroItemData.type = FightConstants_1.HeroType.ATTACK;
            fightHeroItemData.last_attack_time = 0;
            fightHeroItemData.array_index = index;
            this.hero_data_array.push(fightHeroItemData);
        }
    }; // end: build_hero_array
    // @
    FightTempData.prototype.build_reward_array = function () {
        GameManager_1.gm.data.fight_temp_data.is_debug;
    };
    // @
    FightTempData.prototype.build_fight_match_data_array = function () {
        this.fight_match_data_array = [];
        var configData = GameManager_1.gm.config.get_config_data("FightMatchConfigData");
        for (var key in configData.data) {
            var data = configData.data[key];
            var matchData = new FightMatchData();
            matchData.id = data.id;
            var randomMapArray = data.random_map_array.split("|");
            for (var n = 0; n < randomMapArray.length; n++) {
                matchData.random_map_array[n] = parseInt(randomMapArray[n]);
            }
            var failTwoRandomMapArray = data.fail_two_random_map_array.split("|");
            for (var n = 0; n < failTwoRandomMapArray.length; n++) {
                matchData.fail_two_random_map_array[n] = parseInt(failTwoRandomMapArray[n]);
            }
            matchData.battle_map_id = data.battle_map_id;
            var battleDataArray = data.battle_data_array.split("|");
            for (var n = 0; n < battleDataArray.length; n++) {
                matchData.battle_data_array[n] = parseInt(battleDataArray[n]);
            }
            matchData.psychedelic_map_id = data.psychedelic_map_id;
            var psychedelicDataArray = data.psychedelic_data_array.split("|");
            for (var n = 0; n < psychedelicDataArray.length; n++) {
                matchData.psychedelic_data_array[n] = parseInt(psychedelicDataArray[n]);
            }
            matchData.random_name_id = data.random_name_id;
            this.fight_match_data_array[matchData.id - 1] = matchData;
        }
    }; // end: build_fight_match_data_array
    // @
    FightTempData.prototype.match_fight = function () {
        this.goal_uid = "";
        if (this.goal_uid != GameManager_1.gm.data.mail_temp_data.target_uid) {
            GameManager_1.gm.data.match_player(GameManager_1.gm.data.mail_temp_data.target_uid);
            (GameManager_1.gm.data.mail_temp_data.target_uid = "");
            return;
        }
        var t = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.GARRISION_TYPE);
        if (t && 1 <= t.buildLvl && GameManager_1.gm.data.ladder_data.fight_count > ChannelManager_1.ChannelManager.LEVEL_CONFIG.level_array.length) {
            GameManager_1.gm.data.match_player();
        }
        else {
            this.match_map_by_ladder_lv();
            GameManager_1.gm.ui.show_fight();
            GameManager_1.gm.channel.report_event("fight", {
                event_desc: "突袭",
                desc: "开始"
            });
            NetUtils_1.ReportData.instance.report_once_point(10821);
            NetUtils_1.ReportData.instance.report_point(10822);
        }
    };
    // @
    FightTempData.prototype.match_map_by_ladder_lv = function () {
        var ladderData = GameManager_1.gm.data.ladder_data;
        if (0 == this.fight_match_data_array.length) {
            this.build_fight_match_data_array();
        }
        if (GameManager_1.gm.data.mapCell_data.isGuide && !this.is_debug) {
            this.play_type = 0;
            this.map_id = 2;
            this.map_data_id = 1;
            this.boat_id = 60001;
            var matchData_1 = this.fight_match_data_array[0];
            this.name = this.get_random_name(matchData_1.random_name_id);
            ladderData.fight_count++;
            ladderData.async_write_data();
            return true;
        }
        if (ladderData.achievement_id < 1) {
            ladderData.achievement_id = 1;
        }
        else if (ladderData.achievement_id > this.fight_match_data_array.length) {
            ladderData.achievement_id = this.fight_match_data_array.length;
        }
        if (ladderData.fight_count < ChannelManager_1.ChannelManager.LEVEL_CONFIG.level_array.length) {
            this.play_type = 0;
            var levelConfig = ChannelManager_1.ChannelManager.LEVEL_CONFIG.level_array[ladderData.fight_count].split("-");
            this.map_id = 2 == levelConfig.length ? parseInt(levelConfig[0].trim()) : 2;
            this.map_data_id = 2 == levelConfig.length ? parseInt(levelConfig[1].trim()) : ladderData.fight_count + 1;
            var matchData_2 = this.fight_match_data_array[0];
            this.name = this.get_random_name(matchData_2.random_name_id);
            var mapcellData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE);
            this.boat_id = mapcellData ? mapcellData.buildID : 60001;
            ladderData.fight_count++;
            ladderData.async_write_data();
            return true;
        }
        var matchData = this.fight_match_data_array[ladderData.achievement_id - 1];
        if (matchData) {
            var randomIndex = ladderData.fail_count < 2 ? this.get_random_index(matchData.random_map_array) : this.get_random_index(matchData.fail_two_random_map_array);
            if (0 == randomIndex) {
                this.play_type = 0;
                this.map_id = matchData.battle_map_id;
                this.map_data_id = matchData.battle_data_array[Utils_1.Utils.math_random(true, 0, matchData.battle_data_array.length)];
                this.name = this.get_random_name(matchData.random_name_id);
                var mapcellData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE);
                this.boat_id = mapcellData ? mapcellData.buildID : 60001;
                ladderData.fight_count++;
                ladderData.async_write_data();
                return true;
            }
            if (1 == randomIndex) {
                this.play_type = 1;
                this.map_id = matchData.psychedelic_map_id;
                this.map_data_id = matchData.psychedelic_data_array[Utils_1.Utils.math_random(true, 0, matchData.psychedelic_data_array.length)];
                this.name = "迷幻岛";
                var mapcellData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.SEAGOINGBOAT_TYPE);
                this.boat_id = mapcellData ? mapcellData.buildID : 60001;
                ladderData.fight_count++;
                ladderData.async_write_data();
                return true;
            }
        }
        return false;
    }; // end: match_map_by_ladder_lv
    // @
    FightTempData.prototype.match_caves_map = function () {
        var fightData = GameManager_1.gm.data.fight_data;
        var cavesLevelConfig = GameManager_1.gm.config.get_config_data("CavesLevelConfigData");
        var totalLayers = Object.keys(cavesLevelConfig.data).length;
        if (fightData.caves_layer <= totalLayers) {
            this.play_type = 2;
            var rowData = GameManager_1.gm.config.get_row_data("CavesLevelConfigData", fightData.caves_layer.toString());
            if (rowData) {
                this.map_id = rowData.map_id;
                this.map_data_id = rowData.data_id;
            }
            // 洞窟第%d层 -> Cave level %d
            this.name = cc.js.formatStr("Cave level %d", fightData.caves_layer);
            return true;
        }
        return false;
    };
    // @
    FightTempData.prototype.match_happy_map = function () {
        this.play_type = 1;
        this.map_id = Utils_1.Utils.math_random(true, 20, 24);
        this.map_data_id = Utils_1.Utils.math_random(true, 1, 9);
        this.name = "Đảo Ảo Giác"; // 梦幻岛 -> Neverland
    };
    // @
    FightTempData.prototype.get_random_index = function (array) {
        var total = 0;
        for (var i = 0; i < array.length; i++) {
            total += array[i];
        }
        var randomValue = Math.random() * total;
        var cumulative = 0;
        for (var i = 0; i < array.length; i++) {
            cumulative += array[i];
            if (cumulative > randomValue) {
                return i;
            }
        }
        return -1;
    };
    // @
    FightTempData.prototype.get_random_name = function (t) {
        // 无名岛 -> Unknown Island
        var namePool = GameManager_1.gm.config.get_row_data_array("NamePoolConfigData", t.toString());
        return namePool && namePool.length > 0 ? namePool[Utils_1.Utils.math_random(true, 0, namePool.length)].name : "Unknown Island";
    };
    // @
    FightTempData.prototype.get_reward_data = function (t) {
        for (var _i = 0, _a = this.reward_data_array; _i < _a.length; _i++) {
            var reward = _a[_i];
            if (reward && reward.id === t)
                return reward;
        }
        var newReward = new FightRewardItemData();
        newReward.id = t;
        newReward.num = 0;
        var inserted = false;
        for (var i = 0; i < this.reward_data_array.length; i++) {
            var reward = this.reward_data_array[i];
            if (!inserted && newReward.id < reward.id) {
                newReward.index = i;
                this.reward_data_array.splice(i, 0, newReward);
                inserted = true;
            }
            else {
                reward.index = i;
            }
        }
        if (!inserted) {
            newReward.index = this.reward_data_array.length;
            this.reward_data_array.push(newReward);
        }
        return newReward;
    };
    // @
    FightTempData.prototype.grid_position_to_position = function (Vec2) {
        var itemData = this.get_fight_map_item_data(Vec2.x, Vec2.y);
        var position = this.offset_col.mul(Vec2.x).add(this.offset_row.mul(Vec2.y));
        return itemData ? cc.v3(position.x, position.y + itemData.land_y_offset) : cc.v3(position.x, position.y);
    };
    // @
    FightTempData.prototype.grid_position_to_floor_position = function (t) {
        return cc.v3(this.offset_col.mul(t.x).add(this.offset_row.mul(t.y)));
    };
    // @
    FightTempData.prototype.get_fight_map_item = function (x, y) {
        return this.map_item_array[y * this.map_size.x + x];
    };
    // @
    FightTempData.prototype.get_fight_map_item_data = function (x, y) {
        return this.map_item_data_array[y * this.map_size.x + x];
    };
    // @
    FightTempData.prototype.has_wall_item_data = function (t) {
        for (var index = 0; index < this.wall_data_array.length; index++) {
            var wallData = this.wall_data_array[index];
            if (wallData && wallData.grid_position.equals(t))
                return true;
            ;
        }
        return false;
    };
    // h (chưa xác định được I)
    FightTempData.prototype.calculate_edge_flag = function (t) {
        var e, a, i = 0;
        for (a in this.edge_map) {
            !((e = t.add(this.edge_map[a])).x < 0 || e.x >= this.map_size.x || e.y < 0 || e.y >= this.map_size.y) &&
                this.map_item_data_array[e.x + e.y * this.map_size.x] || (i |= EdgeEnum[a]);
        }
        return i;
    };
    // @
    FightTempData.prototype.pick_up_prop = function (index) {
        if (!(index < 0 || index >= this.prop_data_array.length)) {
            var propData = this.prop_data_array[index];
            if (propData) {
                var commonProp = this.special_prop_to_common_prop(propData);
                var data = this.get_reward_data(commonProp.id);
                data.num += commonProp.num;
                this.prop_data_array[index] = null;
                GameManager_1.gm.data.event_emitter.emit("pick_up_prop", data.index);
            }
        }
    };
    // @
    FightTempData.prototype.get_building_destroy_reward = function (t, e) {
        var starReward = this.get_reward_data(Constants_1.RewardIdEnum.STAR);
        starReward.num += e.star_count;
        GameManager_1.gm.data.event_emitter.emit("pick_up_prop", starReward.index);
        // gm.data.event_emitter.emit("pick_up_prop", starReward.index); gốc: lặp lại 2 lần
        var buildingItem = this.building_item_array[t];
        for (var i = 0; i < e.reward_array.length; i++) {
            var reward = e.reward_array[i];
            var commonProp = this.special_prop_to_common_prop(reward);
            var rewardData = this.get_reward_data(commonProp.id);
            rewardData.num += commonProp.num;
            GameManager_1.gm.data.event_emitter.emit("pick_up_prop", rewardData.index);
            if (buildingItem) {
                GameManager_1.gm.ui.fight.fly_to_boat(buildingItem.reward_spr_array[i].node, true);
            }
        }
    };
    // @
    FightTempData.prototype.get_main_city = function () {
        for (var index = 0; index < this.building_data_array.length; index++) {
            var buildingData = this.building_data_array[index];
            if (buildingData && 51e3 <= buildingData.id && buildingData.id < 52e3) {
                return buildingData;
            }
        }
    };
    // @
    FightTempData.prototype.is_main_city = function (t) {
        return 51e3 <= t && t < 52e3 || 61001 <= t && t < 62e3 || 63001 <= t && t < 64e3;
    };
    // @
    FightTempData.prototype.is_lighthouse = function (t) {
        return 59e3 <= t && t < 6e4;
    };
    // @
    FightTempData.prototype.special_prop_to_common_prop = function (fightPropItem) {
        var commonProp = new BasePropItemData;
        if (16001 <= fightPropItem.id && fightPropItem.id <= 16099) {
            var itemData = GameManager_1.gm.config.get_row_data("ItemConfigData", fightPropItem.id + "");
            commonProp.id = Constants_1.RewardIdEnum.WOOD;
            commonProp.num = itemData.number * fightPropItem.num;
        }
        else if (17001 <= fightPropItem.id && fightPropItem.id <= 17099) {
            var itemData = GameManager_1.gm.config.get_row_data("ItemConfigData", fightPropItem.id + "");
            commonProp.id = Constants_1.RewardIdEnum.IRON;
            commonProp.num = itemData.number * fightPropItem.num;
        }
        else if (24001 <= fightPropItem.id && fightPropItem.id <= 24099) {
            var itemData = GameManager_1.gm.config.get_row_data("ItemConfigData", fightPropItem.id + "");
            commonProp.id = Constants_1.RewardIdEnum.DIAMOND;
            commonProp.num = itemData.number * fightPropItem.num;
        }
        else {
            var convertedProp = GameManager_1.gm.data.high_to_low_level_prop(fightPropItem.id, fightPropItem.num);
            commonProp.id = convertedProp.item_id;
            commonProp.num = convertedProp.item_num;
        }
        return commonProp;
    };
    // @
    FightTempData.prototype.get_dynamic_node_layer = function (index, layer) {
        return index * FightConstants_1.FightDynamicNodeLayer.MAX + layer;
    };
    return FightTempData;
}(SingletonBase_1.SingletonBase));
exports.FightTempData = FightTempData;
var FightHeroItemData = /** @class */ (function () {
    // call_range: number;
    // @
    function FightHeroItemData() {
        this.grid_index = 0;
        this.grid_position = cc.Vec2.ZERO;
        this.array_index = -1;
        this.id = 0;
        this.cellID = 0;
        this.lv = 0;
        this.skill_id = 0;
        this.skill_lv = 0;
        this.star_lv = 0;
        this.in_battle_state = FightConstants_1.HeroInBattleState.NOT_IN_BATTLE;
        this.defense_value = 0;
        this.hp = 0;
        this.max_hp = 0;
        this.attack_type = ConfigData_1.AttackType.NONE;
        this.attack_anim_time = 0;
        this.fly_weapon_name = "";
        this.fly_weapon_time = 0;
        this.fly_weapon_position_array = [];
        this.attack_value = 0;
        this.last_attack_time = 0;
        this.attack_count = 0;
        this.attack_interval = 0;
        this.attack_range = 0;
        this.search_range = 0;
        this.move_speed = 0;
        this.move_start = null;
        this.move_end = null;
        this.move_path = [];
        this.offset = cc.Vec3.ZERO;
        this.type = FightConstants_1.HeroType.FREEDOM;
        this.state = FightConstants_1.HeroState.ALIVE;
        this.fight_state = FightConstants_1.HeroFightState.WAITING;
        this.radian = 0;
        this.occupation = 0;
        this.buff_data_array = [];
        this.move_speed_scale = 1;
        this.reduce_damage_ratio = 0;
        this.attack_speed_ratio = 0;
        this.attack_bonus_ratio = 0;
        this.defense_bonus_ratio = 0;
        this.restore_hp_ratio = 0;
        this.passive_attack_bonus_ratio = 0;
        this.passive_defense_bonus_ratio = 0;
    }
    Object.defineProperty(FightHeroItemData.prototype, "real_attack_value", {
        // @
        get: function () {
            return Math.floor(this.attack_value * (1 + Math.max(this.attack_bonus_ratio + this.passive_attack_bonus_ratio, 0)));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FightHeroItemData.prototype, "real_defense_value", {
        // @
        get: function () {
            return Math.floor(this.defense_value * (1 + Math.max(this.defense_bonus_ratio + this.passive_defense_bonus_ratio, 0)));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FightHeroItemData.prototype, "real_attack_interval", {
        // @
        get: function () {
            return this.attack_interval / (1 + Math.max(this.attack_speed_ratio, 0));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FightHeroItemData.prototype, "real_move_speed", {
        // @
        get: function () {
            return Math.floor(this.move_speed * this.move_speed_scale);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FightHeroItemData.prototype, "real_restore_hp", {
        // @
        get: function () {
            return Math.floor(this.max_hp * this.restore_hp_ratio);
        },
        enumerable: false,
        configurable: true
    });
    // @
    FightHeroItemData.prototype.change_hp = function (amount) {
        if (amount < 0) {
            amount *= Math.max(1 - this.reduce_damage_ratio, 0);
            amount = Math.min(0, amount + this.real_defense_value);
            this.hp = Math.max(0, Math.min(this.max_hp, this.hp + amount));
        }
        else {
            this.hp = Math.min(this.max_hp, this.hp + amount);
        }
    };
    return FightHeroItemData;
}());
exports.FightHeroItemData = FightHeroItemData;
var BasePropItemData = /** @class */ (function () {
    //
    function BasePropItemData() {
        this.id = 0;
        this.num = 0;
    }
    return BasePropItemData;
}()); // end: BasePropItemData class
exports.BasePropItemData = BasePropItemData;
var FightPropItemData = /** @class */ (function (_super) {
    __extends(FightPropItemData, _super);
    //
    function FightPropItemData() {
        var _this = _super.call(this) || this;
        _this.grid_index = 0;
        _this.grid_position = cc.Vec2.ZERO;
        return _this;
    }
    return FightPropItemData;
}(BasePropItemData)); // end: FightPropItemData class
exports.FightPropItemData = FightPropItemData;
// @
var FightDecorationItemData = /** @class */ (function () {
    //
    function FightDecorationItemData() {
        this.grid_index = 0;
        this.grid_position = cc.Vec2.ZERO;
        this.array_index = 0;
        this.decoration_id = 0;
        this.plant_x_offset = 0;
        this.plant_y_offset = 0;
    }
    return FightDecorationItemData;
}()); // end: FightDecorationItemData class
exports.FightDecorationItemData = FightDecorationItemData;
// @
var FightResultPropItemData = /** @class */ (function (_super) {
    __extends(FightResultPropItemData, _super);
    //
    function FightResultPropItemData() {
        var _this = _super.call(this) || this;
        _this.type = 0;
        _this.color = 0;
        return _this;
    }
    return FightResultPropItemData;
}(BasePropItemData)); // end: FightResultPropItemData class
exports.FightResultPropItemData = FightResultPropItemData;
// @
var FightRewardItemData = /** @class */ (function (_super) {
    __extends(FightRewardItemData, _super);
    //
    function FightRewardItemData() {
        var _this = _super.call(this) || this;
        _this.index = -1;
        _this.max_num = 0;
        return _this;
    }
    return FightRewardItemData;
}(BasePropItemData)); // end: FightRewardItemData class
exports.FightRewardItemData = FightRewardItemData;
// @
var FightMapConfigData = /** @class */ (function () {
    //
    function FightMapConfigData() {
        this.map_key = "";
        this.map_id = 0;
        this.cell_id = 0;
        this.row = 0;
        this.col = 0;
        this.enter = 0;
        this.item_type = 0;
        this.item_id = 0;
        this.is_obstruct = 0;
        this.plant_id = 0;
        this.land_img_id = 0;
        this.land_y_offset = 0;
        this.plant_x_offset = 0;
        this.plant_y_offset = 0;
        this.water_img_id = 0;
        this.sea_area = 0;
        this.skill_lv = 0;
        this.star_lv = 0;
    }
    return FightMapConfigData;
}()); // end: FightMapConfigData class
exports.FightMapConfigData = FightMapConfigData;
// @
var FightMapItemData = /** @class */ (function (_super) {
    __extends(FightMapItemData, _super);
    // @
    function FightMapItemData() {
        var _this = _super.call(this) || this;
        _this.grid_index = 0;
        _this.grid_position = cc.Vec2.ZERO;
        _this.edge_flag = -1;
        _this.land_id = 0;
        _this.decoration_index = -1;
        _this.hero_index_array = [];
        _this.defense_hero_index_array = [];
        _this.offset_array = [];
        _this.prop_index = -1;
        _this.building_index = -1;
        _this.wall_index = -1;
        _this.position = cc.Vec3.ZERO;
        return _this;
    }
    FightMapItemData.prototype.add_hero_index = function (heroIndex) {
        if (0 == this.offset_array.length) {
            this.offset_array = [].concat(FightConstants_1.FightConstants.HERO_OFFSET_ARRAY);
        }
        for (var index = 0; index < this.hero_index_array.length; index++) {
            if (this.hero_index_array[index].hero_index == t) {
                return this.hero_index_array[index];
            }
        }
        var newHeroIndex = {
            hero_index: heroIndex,
            offset: this.offset_array.shift()
        };
        this.hero_index_array.push(newHeroIndex);
        return newHeroIndex;
    };
    // @
    FightMapItemData.prototype.remove_hero_index = function (heroIndex) {
        for (var i = this.hero_index_array.length - 1; i >= 0; i--) {
            if (this.hero_index_array[i].hero_index === heroIndex) {
                return this.hero_index_array.splice(i, 1);
            }
        }
    };
    // @
    FightMapItemData.prototype.add_defense_hero_index = function (defenseHeroIndex) {
        if (0 == this.offset_array.length) {
            this.offset_array = [].concat(FightConstants_1.FightConstants.HERO_OFFSET_ARRAY);
        }
        for (var index = 0; index < this.defense_hero_index_array.length; index++) {
            if (this.defense_hero_index_array[index].defense_hero_index == t) {
                return this.defense_hero_index_array[index];
            }
        }
        var newDefenseHeroIndex = {
            defense_hero_index: defenseHeroIndex,
            offset: this.offset_array.shift()
        };
        this.defense_hero_index_array.push(newDefenseHeroIndex);
        return newDefenseHeroIndex;
    };
    // @
    FightMapItemData.prototype.remove_defense_hero_index = function (defenseHeroIndex) {
        for (var i = this.defense_hero_index_array.length - 1; i >= 0; i--) {
            if (this.defense_hero_index_array[i].defense_hero_index == defenseHeroIndex) {
                return this.defense_hero_index_array.splice(i, 1);
            }
        }
    };
    return FightMapItemData;
}(FightMapConfigData));
exports.FightMapItemData = FightMapItemData;
var EdgeEnum;
(function (EdgeEnum) {
    EdgeEnum[EdgeEnum["TOP"] = 1] = "TOP";
    EdgeEnum[EdgeEnum["RIGHT"] = 2] = "RIGHT";
    EdgeEnum[EdgeEnum["BOTTOM"] = 4] = "BOTTOM";
    EdgeEnum[EdgeEnum["LEFT"] = 8] = "LEFT";
})(EdgeEnum = exports.EdgeEnum || (exports.EdgeEnum = {}));
// @
var FightBuildingItemData = /** @class */ (function () {
    // @
    function FightBuildingItemData() {
        this.grid_index = 0;
        this.grid_position = cc.Vec2.ZERO;
        this.array_index = -1;
        this.id = 0;
        this.lv = 0;
        this.star_count = 0;
        this.reward_array = [];
        this.hp = 0;
        this.max_hp = 0;
        this.defense = 0;
        this.attack_value = 0;
        this.call_range = 0;
        this.last_attack_time = 0;
        this.attack_interval = 0;
        this.attack_range = 0;
        this.attack_type = ConfigData_1.AttackType.REMOTE;
        this.fly_weapon_name = "";
    }
    return FightBuildingItemData;
}()); // end: FightBuildingItemData class
exports.FightBuildingItemData = FightBuildingItemData;
// @
var FightWallItemData = /** @class */ (function () {
    // @
    function FightWallItemData() {
        this.grid_index = 0;
        this.grid_position = cc.Vec2.ZERO;
        this.array_index = -1;
        this.id = 0;
        this.lv = 0;
        this.skill_id = 0;
        this.skill_lv = 0;
        this.star_lv = 0;
        this.defense_value = 0;
        this.hp = 0;
        this.max_hp = 0;
        this.attack_type = ConfigData_1.AttackType.NONE;
        this.attack_anim_time = 0;
        this.fly_weapon_name = "";
        this.fly_weapon_time = 0;
        this.fly_weapon_position_array = [];
        this.attack_value = 0;
        this.last_attack_time = 0;
        this.attack_interval = 0;
        this.attack_range = 0;
        this.search_range = 0;
        this.state = FightConstants_1.HeroState.ALIVE;
        this.fight_state = FightConstants_1.HeroFightState.ATTACKING;
        this.call_range = 0;
        this.radian = 0;
        this.damage_ratio = 1;
        this.defense_ratio = 1;
    }
    Object.defineProperty(FightWallItemData.prototype, "real_attack_value", {
        // @
        get: function () {
            return Math.floor(this.attack_value * this.damage_ratio);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FightWallItemData.prototype, "real_defense_value", {
        // @
        get: function () {
            return Math.floor(this.defense_value * this.defense_ratio);
        },
        enumerable: false,
        configurable: true
    });
    return FightWallItemData;
}()); // end: FightWallItemData class
exports.FightWallItemData = FightWallItemData;
// @
var FightTargetSortData = /** @class */ (function () {
    //
    function FightTargetSortData() {
        this.distance = 0;
        this.find_path_distance = 0;
        this.pixel_distance = 0;
        this.priority = 0;
        this.type = 0;
        this.index = -1;
    }
    return FightTargetSortData;
}()); // end: FightTargetSortData class
exports.FightTargetSortData = FightTargetSortData;
// @
var FightResultData = /** @class */ (function () {
    //
    function FightResultData() {
        this.result = 0;
        this.attacker_name = "";
        this.defender_name = "";
        this.star_num = 0;
        this.gold_num = 0;
        this.bucket_num = 0;
        this.prop_data_array = [];
        this.death_hero_data_array = [];
        this.alive_hero_data_array = [];
        this.alive_defense_hero_data_array = [];
    }
    return FightResultData;
}()); // end: FightResultData class
exports.FightResultData = FightResultData;
// @
var FightMatchData = /** @class */ (function () {
    //
    function FightMatchData() {
        this.id = 0;
        this.random_map_array = [];
        this.fail_two_random_map_array = [];
        this.battle_map_id = 0;
        this.battle_data_array = [];
        this.psychedelic_map_id = 0;
        this.psychedelic_data_array = [];
        this.random_name_id = 0;
    }
    return FightMatchData;
}()); // end: FightMatchData class
exports.FightMatchData = FightMatchData;
// @
var BuffItemData = /** @class */ (function () {
    //
    function BuffItemData() {
        this.id = ConfigData_1.SkillEffectId.NONE;
        this.valid_time = 0;
        this.start_time = 0;
        this.is_start = false;
        this.is_end = false;
        this.trigger_count = 0;
        this.max_trigger_count = 0;
        this.damage_value = 0;
        this.move_speed_scale = 1;
        this.reduce_damage_ratio = 0;
        this.attack_speed_ratio = 0;
        this.attack_bonus_ratio = 0;
        this.defense_bonus_ratio = 0;
        this.restore_hp_ratio = 0;
        this.value = 0;
    }
    return BuffItemData;
}()); // end: BuffItemData class
exports.BuffItemData = BuffItemData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEZpZ2h0VGVtcERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUF3QztBQUN4QyxtREFBa0Q7QUFDbEQseUNBQXNHO0FBQ3RHLGlDQUE0QztBQUM1Qyw2Q0FBbUM7QUFDbkMsaURBQWdEO0FBQ2hELGlDQUFnQztBQUNoQywyQ0FBeUQ7QUFDekQsaURBQWdEO0FBQ2hELG1EQUFpSTtBQUNqSSx5Q0FBeUM7QUFDekMsbURBQXNEO0FBK0J0RCxFQUFFO0FBQ0Y7SUFBbUMsaUNBQWE7SUE2RDVDLEVBQUU7SUFDRjtRQUFBLFlBQ0ksaUJBQU8sU0ErRFY7UUE5REcsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsS0FBSSxDQUFDLFdBQVcsR0FBRyxzQkFBVSxDQUFDLElBQUksQ0FBQztRQUNuQyxLQUFJLENBQUMsa0JBQWtCLEdBQUcsc0JBQVUsQ0FBQyxJQUFJLENBQUM7UUFDMUMsS0FBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsS0FBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUM1QixLQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDMUIsS0FBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztRQUNoQyxLQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixLQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQzlCLEtBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzFCLEtBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzFCLEtBQUks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b3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcG9ydERhdGEgfSBmcm9tICcuL05ldFV0aWxzJztcclxuaW1wb3J0IHsgQ2hhbm5lbE1hbmFnZXIgfSBmcm9tICcuL0NoYW5uZWxNYW5hZ2VyJztcclxuaW1wb3J0IHsgUmV3YXJkSWRFbnVtLCBCdWlsZFR5cGVFbnVtLCBQcm9wVHlwZUVudW0sIFNldEl0ZW1OdW1FbnVtLCBIZXJvVHlwZUVudW0gfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IEFTdGFyLCBHcmlkLCBOb2RlIH0gZnJvbSAnLi9BU3Rhcic7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IFNpbmdsZXRvbkJhc2UgfSBmcm9tICcuL1NpbmdsZXRvbkJhc2UnO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4vVXRpbHMnO1xyXG5pbXBvcnQgeyBBdHRhY2tUeXBlLCBTa2lsbEVmZmVjdElkIH0gZnJvbSAnLi9Db25maWdEYXRhJztcclxuaW1wb3J0IHsgQ29uc3RhbnRzRGF0YSB9IGZyb20gJy4vQ29uc3RhbnRzRGF0YSc7XHJcbmltcG9ydCB7IEZpZ2h0Q29uc3RhbnRzLCBGaWdodER5bmFtaWNOb2RlTGF5ZXIsIEhlcm9JbkJhdHRsZVN0YXRlLCBIZXJvVHlwZSwgSGVyb1N0YXRlLCBIZXJvRmlnaHRTdGF0ZSB9IGZyb20gJy4vRmlnaHRDb25zdGFudHMnO1xyXG5pbXBvcnQgeyBGaWdodFN0YXRlIH0gZnJvbSAnLi9GaWdodERhdGEnO1xyXG5pbXBvcnQgeyByb2xlR29CYXR0bGVJdGVtVk8gfSBmcm9tICcuL01hcENlbGxDZmdEYXRhJztcclxuaW1wb3J0IHsgUGxheU1hcCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlncy9wbGF5bWFwXCI7XHJcbmltcG9ydCB7IFBsYXlEYXRhIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25maWdzL3BsYXlkYXRhXCI7XHJcbmltcG9ydCB7IFBsYXlDYXZlcyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlncy9wbGF5Y2F2ZXNcIjtcclxuaW1wb3J0IHsgTmFtZVBvb2wgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbmZpZ3MvbmFtZV9wb29sXCI7XHJcbmltcG9ydCB7IEJ1aWxkIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvYnVpbGQnO1xyXG5pbXBvcnQgeyBIZXJvQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvaGVybyc7XHJcbmltcG9ydCB7IExhZGRlckxWQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvbGFkZGVyX2x2JztcclxuaW1wb3J0IHsgSXRlbUNvbmZpZyB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25maWdzL2l0ZW0nO1xyXG5pbXBvcnQgeyBDYXZlc0xldmVsIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvY2F2ZXNsZXZlbCc7XHJcbmltcG9ydCB7IE1hdGNoQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvbWF0Y2gnO1xyXG5pbXBvcnQgeyBGaWdodE1hcEl0ZW0gfSBmcm9tICcuLi8uLi9maWdodC9zY3JpcHRzL0ZpZ2h0TWFwSXRlbSc7XHJcbmltcG9ydCB7IEZpZ2h0UHJvcEl0ZW0gfSBmcm9tICcuLi8uLi9maWdodC9zY3JpcHRzL0ZpZ2h0UHJvcEl0ZW0nO1xyXG5pbXBvcnQgeyBGaWdodEJ1aWxkaW5nSXRlbSB9IGZyb20gJy4uLy4uL2ZpZ2h0L3NjcmlwdHMvRmlnaHRCdWlsZGluZ0l0ZW0nO1xyXG5pbXBvcnQgeyBGaWdodEhlcm9JdGVtIH0gZnJvbSAnLi4vLi4vZmlnaHQvc2NyaXB0cy9GaWdodEhlcm9JdGVtJztcclxuaW1wb3J0IHsgRmlnaHREZWNvcmF0aW9uSXRlbSB9IGZyb20gJy4uLy4uL2ZpZ2h0L3NjcmlwdHMvRmlnaHREZWNvcmF0aW9uSXRlbSc7XHJcbmltcG9ydCB7IEZpZ2h0V2FsbEl0ZW0gfSBmcm9tICcuLi8uLi9maWdodC9zY3JpcHRzL0ZpZ2h0V2FsbEl0ZW0nO1xyXG5pbXBvcnQgeyBOb2RlUG9vbEl0ZW0gfSBmcm9tICcuL05vZGVQb29sSXRlbSc7XHJcbmltcG9ydCB7IFNraWxsSXRlbSwgU2tpbGxJdGVtRGF0YSB9IGZyb20gJy4uLy4uL2ZpZ2h0L3NjcmlwdHMvU2tpbGxJdGVtJztcclxuXHJcbi8vIEAgISEhIVxyXG5pbnRlcmZhY2UgSURlZmVuc2l2ZURhdGEge1xyXG4gICAgdWlkOiBzdHJpbmc7XHJcbiAgICBuaWNrbmFtZTogc3RyaW5nO1xyXG4gICAgc3RhcjogbnVtYmVyO1xyXG4gICAgYm9hdF9pZDogbnVtYmVyO1xyXG4gICAgbWFwX2RhdGFfYXJyYXk6IEZpZ2h0TWFwSXRlbURhdGFbXTtcclxuICAgIGhlcm9fZGF0YV9hcnJheTogRmlnaHRUZW1wRGF0YVtdO1xyXG59XHJcblxyXG5cclxuLy9cclxuZXhwb3J0IGNsYXNzIEZpZ2h0VGVtcERhdGEgZXh0ZW5kcyBTaW5nbGV0b25CYXNlIHtcclxuICAgIHB1YmxpYyBpc19kZWJ1ZzogYm9vbGVhbiB8IG51bWJlciB8IHN0cmluZztcclxuICAgIHB1YmxpYyBmaWdodF9zdGF0ZTogRmlnaHRTdGF0ZTtcclxuICAgIHB1YmxpYyByZWNvcmRfZmlnaHRfc3RhdGU6IEZpZ2h0U3RhdGU7XHJcbiAgICBwdWJsaWMgZGVsdGFfdGltZTogbnVtYmVyO1xyXG4gICAgcHVibGljIHRvdGFsX3RpbWU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBoYXNfcG9wX3Jldml2ZTogYm9vbGVhbjtcclxuICAgIHB1YmxpYyByZXdhcmRfZGF0YV9hcnJheTogRmlnaHRSZXdhcmRJdGVtRGF0YVtdO1xyXG4gICAgcHVibGljIGdvdG9fYmF0dGxlX2NvdW50OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZGVhdGhfaGVyb19jb3VudDogbnVtYmVyO1xyXG4gICAgcHVibGljIGluX2JhdHRsZV9oZXJvX2RhdGE6IEZpZ2h0SGVyb0l0ZW1EYXRhO1xyXG4gICAgcHVibGljIG1hcF9pdGVtX2FycmF5OiBGaWdodE1hcEl0ZW1bXTtcclxuICAgIHB1YmxpYyBtYXBfaXRlbV9kYXRhX2FycmF5OiBGaWdodE1hcEl0ZW1EYXRhW107XHJcbiAgICBwdWJsaWMgcHJvcF9pdGVtX2FycmF5OiBGaWdodFByb3BJdGVtW107XHJcbiAgICBwdWJsaWMgcHJvcF9kYXRhX2FycmF5OiBGaWdodFByb3BJdGVtRGF0YVtdO1xyXG4gICAgcHVibGljIGJ1aWxkaW5nX2l0ZW1fYXJyYXk6IEZpZ2h0QnVpbGRpbmdJdGVtW107XHJcbiAgICBwdWJsaWMgYnVpbGRpbmdfZGF0YV9hcnJheTogRmlnaHRCdWlsZGluZ0l0ZW1EYXRhW107XHJcbiAgICBwdWJsaWMgZGVmZW5zZV9oZXJvX2FycmF5OiBGaWdodEhlcm9JdGVtW107XHJcbiAgICBwdWJsaWMgZGVmZW5zZV9oZXJvX2RhdGFfYXJyYXk6IEZpZ2h0SGVyb0l0ZW1EYXRhW107XHJcbiAgICBwdWJsaWMgcGFzc2l2ZV9oZXJvX2RhdGFfYXJyYXk6IEZpZ2h0SGVyb0l0ZW1EYXRhW107XHJcbiAgICBwdWJsaWMgaGVyb19pdGVtX2FycmF5OiBGaWdodEhlcm9JdGVtW107XHJcbiAgICBwdWJsaWMgaGVyb19kYXRhX2FycmF5OiBGaWdodEhlcm9JdGVtRGF0YVtdO1xyXG4gICAgcHVibGljIHdhbGxfaXRlbV9hcnJheTogRmlnaHRXYWxsSXRlbVtdO1xyXG4gICAgcHVibGljIHdhbGxfZGF0YV9hcnJheTogRmlnaHRXYWxsSXRlbURhdGFbXTtcclxuICAgIHB1YmxpYyBkZWNvcmF0aW9uX2l0ZW1fYXJyYXk6IEZpZ2h0RGVjb3JhdGlvbkl0ZW1bXTtcclxuICAgIHB1YmxpYyBkZWNvcmF0aW9uX2RhdGFfYXJyYXk6IEZpZ2h0RGVjb3JhdGlvbkl0ZW1EYXRhW107XHJcbiAgICBwdWJsaWMgZmlnaHRfcmVzdWx0X2RhdGE6IEZpZ2h0UmVzdWx0RGF0YTtcclxuICAgIHB1YmxpYyBiYXR0bGVfaGVyb19hcnJheTogcm9sZUdvQmF0dGxlSXRlbVZPW107XHJcbiAgICBwdWJsaWMgb3Blbl9iYXR0bGVfcGFuZWxfc3RhdGU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgZmlnaHRfbWF0Y2hfZGF0YV9hcnJheTogRmlnaHRNYXRjaERhdGFbXTtcclxuICAgIHB1YmxpYyBidWlsZGluZ19kZXN0cm95X2FycmF5OiBOb2RlUG9vbEl0ZW1bXTtcclxuICAgIHB1YmxpYyBoZXJvX2RlYXRoX2FycmF5OiBOb2RlUG9vbEl0ZW1bXTtcclxuICAgIHB1YmxpYyBza2lsbF9pdGVtX2FycmF5OiBTa2lsbEl0ZW1bXTtcclxuICAgIHB1YmxpYyBza2lsbF9kYXRhX2FycmF5OiBTa2lsbEl0ZW1EYXRhW107XHJcbiAgICBwdWJsaWMgcGxheV90eXBlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgbWFwX2lkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgbWFwX2RhdGFfaWQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgYm9hdF9pZDogbnVtYmVyO1xyXG4gICAgcHVibGljIGdvYWxfdWlkOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZGVmZW5zaXZlX2RhdGE6IElEZWZlbnNpdmVEYXRhO1xyXG4gICAgcHJpdmF0ZSBvZmZzZXRfY29sOiBjYy5WZWMyO1xyXG4gICAgcHJpdmF0ZSBvZmZzZXRfcm93OiBjYy5WZWMyO1xyXG4gICAgcHVibGljIG1pbl9vZmZzZXQ6IGNjLlZlYzI7XHJcbiAgICBwdWJsaWMgbWF4X29mZnNldDogY2MuVmVjMjtcclxuICAgIHB1YmxpYyBtYXBfc3RhcnRfcG9zaXRpb246IGNjLlZlYzM7XHJcbiAgICBwdWJsaWMgYm9hdF9zdGFydF9wb3NpdGlvbjogY2MuVmVjMztcclxuICAgIHB1YmxpYyBtYXBfc2l6ZTogY2MuVmVjMjtcclxuICAgIHB1YmxpYyBlZGdlX21hcDoge1xyXG4gICAgICAgIExFRlQ6IGNjLlZlYzI7XHJcbiAgICAgICAgQk9UVE9NOiBjYy5WZWMyO1xyXG4gICAgICAgIFJJR0hUOiBjYy5WZWMyO1xyXG4gICAgICAgIFRPUDogY2MuVmVjMjtcclxuICAgIH07XHJcbiAgICBwdWJsaWMgbWFwX2VuZF9tYW55X3RpbWVzOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc2hvd19yZXR1cm5fYnRuX3RpbWVzdGFtcDogbnVtYmVyO1xyXG4gICAgcHVibGljIGFfc3RhcjogQVN0YXI7XHJcbiAgICBwdWJsaWMgZ3JpZDogR3JpZDtcclxuICAgIHB1YmxpYyB1bmlxdWVfaWQ6IG51bWJlcjs7XHJcbiAgICBwdWJsaWMgaGVyb19pZDogbnVtYmVyO1xyXG5cclxuICAgIC8vXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuaXNfZGVidWcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZpZ2h0X3N0YXRlID0gRmlnaHRTdGF0ZS5OT05FO1xyXG4gICAgICAgIHRoaXMucmVjb3JkX2ZpZ2h0X3N0YXRlID0gRmlnaHRTdGF0ZS5OT05FO1xyXG4gICAgICAgIHRoaXMuZGVsdGFfdGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy50b3RhbF90aW1lID0gMDtcclxuICAgICAgICB0aGlzLmhhc19wb3BfcmV2aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZXdhcmRfZGF0YV9hcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZ290b19iYXR0bGVfY291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuZGVhdGhfaGVyb19jb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5pbl9iYXR0bGVfaGVyb19kYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLm1hcF9pdGVtX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5tYXBfaXRlbV9kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5wcm9wX2l0ZW1fYXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLnByb3BfZGF0YV9hcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMuYnVpbGRpbmdfaXRlbV9hcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMuYnVpbGRpbmdfZGF0YV9hcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGVmZW5zZV9oZXJvX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5kZWZlbnNlX2hlcm9fZGF0YV9hcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMucGFzc2l2ZV9oZXJvX2RhdGFfYXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLmhlcm9faXRlbV9hcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMuaGVyb19kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy53YWxsX2l0ZW1fYXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLndhbGxfZGF0YV9hcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGVjb3JhdGlvbl9pdGVtX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5kZWNvcmF0aW9uX2RhdGFfYXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLmZpZ2h0X3Jlc3VsdF9kYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLmJhdHRsZV9oZXJvX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5vcGVuX2JhdHRsZV9wYW5lbF9zdGF0ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5maWdodF9tYXRjaF9kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5idWlsZGluZ19kZXN0cm95X2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5oZXJvX2RlYXRoX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5za2lsbF9pdGVtX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5za2lsbF9kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5wbGF5X3R5cGUgPSAtMTtcclxuICAgICAgICB0aGlzLm1hcF9pZCA9IDI7XHJcbiAgICAgICAgdGhpcy5tYXBfZGF0YV9pZCA9IDE7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJVbmtub3duIElzbGFuZFwiOyAvLyDml6DlkI3lspsgLT4gVW5rbm93biBJc2xhbmRcclxuICAgICAgICB0aGlzLmJvYXRfaWQgPSA2MDAwMTtcclxuICAgICAgICB0aGlzLmdvYWxfdWlkID0gXCJcIjtcclxuICAgICAgICB0aGlzLmRlZmVuc2l2ZV9kYXRhID0ge1xyXG4gICAgICAgICAgICB1aWQ6IFwiXCIsXHJcbiAgICAgICAgICAgIG5pY2tuYW1lOiBcIlwiLFxyXG4gICAgICAgICAgICBzdGFyOiAwLFxyXG4gICAgICAgICAgICBib2F0X2lkOiAwLFxyXG4gICAgICAgICAgICBtYXBfZGF0YV9hcnJheTogW10sXHJcbiAgICAgICAgICAgIGhlcm9fZGF0YV9hcnJheTogW11cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMub2Zmc2V0X2NvbCA9IGNjLnYyKDc1LCAtMjApO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0X3JvdyA9IGNjLnYyKC0zMSwgLTUxKTtcclxuICAgICAgICB0aGlzLm1pbl9vZmZzZXQgPSBjYy5WZWMyLlpFUk87XHJcbiAgICAgICAgdGhpcy5tYXhfb2Zmc2V0ID0gY2MuVmVjMi5aRVJPO1xyXG4gICAgICAgIHRoaXMubWFwX3N0YXJ0X3Bvc2l0aW9uID0gY2MuVmVjMy5aRVJPO1xyXG4gICAgICAgIHRoaXMuYm9hdF9zdGFydF9wb3NpdGlvbiA9IGNjLlZlYzMuWkVSTztcclxuICAgICAgICB0aGlzLm1hcF9zaXplID0gY2MuVmVjMi5aRVJPO1xyXG4gICAgICAgIHRoaXMuZWRnZV9tYXAgPSB7XHJcbiAgICAgICAgICAgIExFRlQ6IGNjLnYyKC0xLCAwKSxcclxuICAgICAgICAgICAgQk9UVE9NOiBjYy52MigwLCAxKSxcclxuICAgICAgICAgICAgUklHSFQ6IGNjLnYyKDEsIDApLFxyXG4gICAgICAgICAgICBUT1A6IGNjLnYyKDAsIC0xKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5tYXBfZW5kX21hbnlfdGltZXMgPSAxO1xyXG4gICAgICAgIHRoaXMuc2hvd19yZXR1cm5fYnRuX3RpbWVzdGFtcCA9IDA7XHJcbiAgICB9IC8vIGVuZDogY29uc3RydWN0b3JcclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0IGxlZnRfZmlnaHRfdGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLmZsb29yKENvbnN0YW50c0RhdGEuaW5zdGFuY2UuTUFYX0ZJR0hUX1RJTUUgLSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS50b3RhbF90aW1lKSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBidWlsZF9wbGF5X21hcF9kYXRhKCk6IEZpZ2h0TWFwSXRlbURhdGFbXSB7XHJcbiAgICAgICAgbGV0IHQ7XHJcbiAgICAgICAgdGhpcy5tYXBfaXRlbV9kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5idWlsZGluZ19kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5wcm9wX2RhdGFfYXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLmRlZmVuc2VfaGVyb19kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5wYXNzaXZlX2hlcm9fZGF0YV9hcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMud2FsbF9kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgaWYgKDAgPT0gdGhpcy5wbGF5X3R5cGUgJiYgXCJcIiAhPSB0aGlzLmdvYWxfdWlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMuZGVmZW5zaXZlX2RhdGEubmlja25hbWUgKyBcIlxcblVJRDpcIiArIHRoaXMuZGVmZW5zaXZlX2RhdGEudWlkO1xyXG4gICAgICAgICAgICB0aGlzLmJvYXRfaWQgPSB0aGlzLmRlZmVuc2l2ZV9kYXRhLmJvYXRfaWQ7XHJcbiAgICAgICAgICAgIHRoaXMubWFwX3NpemUueCA9IGdtLmNvbnN0Lk1BWF9ST1c7XHJcbiAgICAgICAgICAgIHRoaXMubWFwX3NpemUueSA9IGdtLmNvbnN0Lk1BWF9DT0xVTU47XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvID0gWzE4MSwgMTk1LCAyMDQsIDIxNiwgMjE1LCAyMjUsIDI0MywgMjU0LCAyNTMsIDI0OCwgMjMyLCAyMjEsIDIwNywgMTk5LCAxODYsIDE3MCwgMTUzLCAxNTQsIDE3MSwgMTg3LCAyMDAsIDIwOCwgMjA5LCAyMDEsIDE4OCwgMTg5LCAxNzQsIDEyMywgMTIyLCAxMDgsICwgNTMsIDM5LCAyNywgMTgsIDgsIDI2LCAzNywgNDksIDM2LCAzNSwgMjUsIDI4LCA0MCwgNDEsIDU0LCA5NiwgMTI1LCAxOTAsIDIwMiwgMjEzLCAyMTQsIDIwMywgMTkzLCAxOTQsIDEyMCwgMTA3LCAxMjEsIDEzN107XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5kZWZlbnNpdmVfZGF0YS5tYXBfZGF0YV9hcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hcERhdGEgPSB0aGlzLmRlZmVuc2l2ZV9kYXRhLm1hcF9kYXRhX2FycmF5W2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXBEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlnaHRNYXBJdGVtRGF0YSA9IG5ldyBGaWdodE1hcEl0ZW1EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZ2h0TWFwSXRlbURhdGEuaXRlbV90eXBlID0gbWFwRGF0YS5pdGVtX3R5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlnaHRNYXBJdGVtRGF0YS5pdGVtX2lkID0gbWFwRGF0YS5pdGVtX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZ2h0TWFwSXRlbURhdGEuc2tpbGxfbHYgPSBtYXBEYXRhLnNraWxsX2x2O1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZ2h0TWFwSXRlbURhdGEuc3Rhcl9sdiA9IG1hcERhdGEuc3Rhcl9sdiB8fCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZ2h0TWFwSXRlbURhdGEuZ3JpZF9pbmRleCA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0TWFwSW5kZXhCeUNlbGxJRChtYXBEYXRhLmNlbGxfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZ2h0TWFwSXRlbURhdGEuZ3JpZF9wb3NpdGlvbiA9IGNjLnYyKGZpZ2h0TWFwSXRlbURhdGEuZ3JpZF9pbmRleCAlIHRoaXMubWFwX3NpemUueCwgTWF0aC5mbG9vcihmaWdodE1hcEl0ZW1EYXRhLmdyaWRfaW5kZXggLyB0aGlzLm1hcF9zaXplLngpKTtcclxuICAgICAgICAgICAgICAgICAgICBmaWdodE1hcEl0ZW1EYXRhLnBvc2l0aW9uID0gdGhpcy5ncmlkX3Bvc2l0aW9uX3RvX2Zsb29yX3Bvc2l0aW9uKGZpZ2h0TWFwSXRlbURhdGEuZ3JpZF9wb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hcGNlbGxDZmcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldE1hcENlbGxDZmdCeUlEKG1hcERhdGEuY2VsbF9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlnaHRNYXBJdGVtRGF0YS5sYW5kX2lkID0gbWFwY2VsbENmZy5sYW5kSW1nSUQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgwIDwgbWFwY2VsbENmZy5wbGFudElEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZ2h0RGVjb3JhdGlvbkl0ZW1EYXRhID0gbmV3IEZpZ2h0RGVjb3JhdGlvbkl0ZW1EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdodERlY29yYXRpb25JdGVtRGF0YS5kZWNvcmF0aW9uX2lkID0gbWFwY2VsbENmZy5wbGFudElEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdodERlY29yYXRpb25JdGVtRGF0YS5wbGFudF94X29mZnNldCA9IG1hcGNlbGxDZmcucGxhbnRYT2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdodERlY29yYXRpb25JdGVtRGF0YS5wbGFudF95X29mZnNldCA9IG1hcGNlbGxDZmcucGxhbnRZT2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdodERlY29yYXRpb25JdGVtRGF0YS5ncmlkX2luZGV4ID0gZmlnaHRNYXBJdGVtRGF0YS5ncmlkX2luZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdodERlY29yYXRpb25JdGVtRGF0YS5ncmlkX3Bvc2l0aW9uID0gZmlnaHRNYXBJdGVtRGF0YS5ncmlkX3Bvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdodERlY29yYXRpb25JdGVtRGF0YS5hcnJheV9pbmRleCA9IHRoaXMuZGVjb3JhdGlvbl9kYXRhX2FycmF5Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRNYXBJdGVtRGF0YS5kZWNvcmF0aW9uX2luZGV4ID0gdGhpcy5kZWNvcmF0aW9uX2RhdGFfYXJyYXkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlY29yYXRpb25fZGF0YV9hcnJheS5wdXNoKGZpZ2h0RGVjb3JhdGlvbkl0ZW1EYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZpZ2h0TWFwSXRlbURhdGEuY2VsbF9pZCA9IGZpZ2h0TWFwSXRlbURhdGEuZ3JpZF9pbmRleDtcclxuICAgICAgICAgICAgICAgICAgICBmaWdodE1hcEl0ZW1EYXRhLnBsYW50X2lkID0gbWFwY2VsbENmZy5wbGFudElEO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZ2h0TWFwSXRlbURhdGEubGFuZF9pbWdfaWQgPSBtYXBjZWxsQ2ZnLmxhbmRJbWdJRDtcclxuICAgICAgICAgICAgICAgICAgICBmaWdodE1hcEl0ZW1EYXRhLmxhbmRfeV9vZmZzZXQgPSBtYXBjZWxsQ2ZnLmxhbmRZT2Zmc2V0ICsgOTtcclxuICAgICAgICAgICAgICAgICAgICBmaWdodE1hcEl0ZW1EYXRhLnBsYW50X3hfb2Zmc2V0ID0gbWFwY2VsbENmZy5wbGFudFhPZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlnaHRNYXBJdGVtRGF0YS5wbGFudF95X29mZnNldCA9IG1hcGNlbGxDZmcucGxhbnRZT2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZ2h0TWFwSXRlbURhdGEud2F0ZXJfaW1nX2lkID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBmaWdodE1hcEl0ZW1EYXRhLmlzX29ic3RydWN0ID0gbWFwY2VsbENmZy5pc09ic3RydWN0O1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZ2h0TWFwSXRlbURhdGEuZW50ZXIgPSAtMSA8IG8uaW5kZXhPZihtYXBEYXRhLmNlbGxfaWQpID8gMCA6IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgMCA9PSBtYXBjZWxsQ2ZnLnBsYW50SUQgJiYgMCA9PSBmaWdodE1hcEl0ZW1EYXRhLmlzX29ic3RydWN0ICYmIDAgPT0gZmlnaHRNYXBJdGVtRGF0YS5pdGVtX3R5cGUgJiYgbi5wdXNoKGZpZ2h0TWFwSXRlbURhdGEuZ3JpZF9pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBfaXRlbV9kYXRhX2FycmF5W2ZpZ2h0TWFwSXRlbURhdGEuZ3JpZF9pbmRleF0gPSBmaWdodE1hcEl0ZW1EYXRhO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgczogRmlnaHRNYXBJdGVtRGF0YSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCB0aGlzLm1hcF9pdGVtX2RhdGFfYXJyYXkubGVuZ3RoOyByKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChzID0gdGhpcy5tYXBfaXRlbV9kYXRhX2FycmF5W3JdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKDEgPT0gcy5pdGVtX3R5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlnaHRQcm9wSXRlbURhdGEgPSBuZXcgRmlnaHRQcm9wSXRlbURhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0UHJvcEl0ZW1EYXRhLmdyaWRfaW5kZXggPSBzLmdyaWRfaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0UHJvcEl0ZW1EYXRhLmdyaWRfcG9zaXRpb24gPSBzLmdyaWRfcG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0UHJvcEl0ZW1EYXRhLmlkID0gcy5pdGVtX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdodFByb3BJdGVtRGF0YS5udW0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzLnByb3BfaW5kZXggPSB0aGlzLnByb3BfZGF0YV9hcnJheS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcF9kYXRhX2FycmF5LnB1c2goZmlnaHRQcm9wSXRlbURhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tbW9uID0gdGhpcy5zcGVjaWFsX3Byb3BfdG9fY29tbW9uX3Byb3AoZmlnaHRQcm9wSXRlbURhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldF9yZXdhcmRfZGF0YShjb21tb24uaWQpLm1heF9udW0gKz0gY29tbW9uLm51bTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgyID09IHMuaXRlbV90eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZ2h0QnVpbGRpbmdJdGVtRGF0YSA9IG5ldyBGaWdodEJ1aWxkaW5nSXRlbURhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0QnVpbGRpbmdJdGVtRGF0YS5ncmlkX2luZGV4ID0gcy5ncmlkX2luZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdodEJ1aWxkaW5nSXRlbURhdGEuZ3JpZF9wb3NpdGlvbiA9IHMuZ3JpZF9wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRCdWlsZGluZ0l0ZW1EYXRhLmlkID0gcy5pdGVtX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdodEJ1aWxkaW5nSXRlbURhdGEucmV3YXJkX2FycmF5ID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByb3dEYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkJ1aWxkQ29uZmlnRGF0YVwiLCBmaWdodEJ1aWxkaW5nSXRlbURhdGEuaWQudG9TdHJpbmcoKSkgYXMgQnVpbGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3dEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEJ1aWxkaW5nSXRlbURhdGEuc3Rhcl9jb3VudCA9IHJvd0RhdGEuc3RhcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0QnVpbGRpbmdJdGVtRGF0YS5ocCA9IGZpZ2h0QnVpbGRpbmdJdGVtRGF0YS5tYXhfaHAgPSByb3dEYXRhLmhwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRCdWlsZGluZ0l0ZW1EYXRhLmRlZmVuc2UgPSByb3dEYXRhLmRlZmVuc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEJ1aWxkaW5nSXRlbURhdGEuYXR0YWNrX3ZhbHVlID0gcm93RGF0YS5hdHRhY2s7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEJ1aWxkaW5nSXRlbURhdGEuY2FsbF9yYW5nZSA9IHJvd0RhdGEuY2FsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0QnVpbGRpbmdJdGVtRGF0YS5hdHRhY2tfaW50ZXJ2YWwgPSByb3dEYXRhLmF0dGFja19pbnRlcnZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0QnVpbGRpbmdJdGVtRGF0YS5hdHRhY2tfcmFuZ2UgPSByb3dEYXRhLmF0dGFja19yYW5nZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0QnVpbGRpbmdJdGVtRGF0YS5mbHlfd2VhcG9uX25hbWUgPSByb3dEYXRhLmZseV93ZWFwb25fbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0QnVpbGRpbmdJdGVtRGF0YS5sdiA9IHJvd0RhdGEuYnVpbGRMdjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0X3Jld2FyZF9kYXRhKFJld2FyZElkRW51bS5TVEFSKS5tYXhfbnVtICs9IHJvd0RhdGEuc3RhcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA8IHJvd0RhdGEubWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlUHJvcEl0ZW1EYXRhID0gbmV3IEJhc2VQcm9wSXRlbURhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZVByb3BJdGVtRGF0YS5pZCA9IHJvd0RhdGEubWF0ZXJpYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZVByb3BJdGVtRGF0YS5udW0gPSByb3dEYXRhLnF1YW50aXR5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0QnVpbGRpbmdJdGVtRGF0YS5yZXdhcmRfYXJyYXlbZmlnaHRCdWlsZGluZ0l0ZW1EYXRhLnJld2FyZF9hcnJheS5sZW5ndGhdID0gYmFzZVByb3BJdGVtRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21tb24gPSB0aGlzLnNwZWNpYWxfcHJvcF90b19jb21tb25fcHJvcChiYXNlUHJvcEl0ZW1EYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldF9yZXdhcmRfZGF0YShjb21tb24uaWQpLm1heF9udW0gKz0gY29tbW9uLm51bTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKDAgPCByb3dEYXRhLmNvaW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlUHJvcEl0ZW1EYXRhID0gbmV3IEJhc2VQcm9wSXRlbURhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlUHJvcEl0ZW1EYXRhLmlkID0gUmV3YXJkSWRFbnVtLkdPTEQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZVByb3BJdGVtRGF0YS5udW0gPSByb3dEYXRhLmNvaW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRCdWlsZGluZ0l0ZW1EYXRhLnJld2FyZF9hcnJheVtmaWdodEJ1aWxkaW5nSXRlbURhdGEucmV3YXJkX2FycmF5Lmxlbmd0aF0gPSBiYXNlUHJvcEl0ZW1EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0X3Jld2FyZF9kYXRhKGJhc2VQcm9wSXRlbURhdGEuaWQpLm1heF9udW0gKz0gYmFzZVByb3BJdGVtRGF0YS5udW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0QnVpbGRpbmdJdGVtRGF0YS5hcnJheV9pbmRleCA9IHRoaXMuYnVpbGRpbmdfZGF0YV9hcnJheS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuYnVpbGRpbmdfaW5kZXggPSB0aGlzLmJ1aWxkaW5nX2RhdGFfYXJyYXkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkaW5nX2RhdGFfYXJyYXkucHVzaChmaWdodEJ1aWxkaW5nSXRlbURhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX21haW5fY2l0eShmaWdodEJ1aWxkaW5nSXRlbURhdGEuaWQpICYmICh0ID0gZmlnaHRCdWlsZGluZ0l0ZW1EYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKDMgPT0gcy5pdGVtX3R5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgXyA9IHMuaXRlbV9pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgRiA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJIZXJvQ29uZmlnRGF0YVwiLCBfLnRvU3RyaW5nKCkpIGFzIEhlcm9Db25maWc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChGKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMTAgPT0gRi5vY2N1cGF0aW9uIHx8IDEyID09IEYub2NjdXBhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZ2h0V2FsbEl0ZW1EYXRhID0gbmV3IEZpZ2h0V2FsbEl0ZW1EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0V2FsbEl0ZW1EYXRhLmdyaWRfaW5kZXggPSBzLmdyaWRfaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRXYWxsSXRlbURhdGEuZ3JpZF9wb3NpdGlvbiA9IHMuZ3JpZF9wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodFdhbGxJdGVtRGF0YS5pZCA9IF87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRXYWxsSXRlbURhdGEubHYgPSBGLmx2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0V2FsbEl0ZW1EYXRhLnNraWxsX2lkID0gRi5za2lsbF9pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodFdhbGxJdGVtRGF0YS5wYXNzaXZlX3NraWxsX2FycmF5ID0gRi5wYXNzaXZlX3NraWxsX2FycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0V2FsbEl0ZW1EYXRhLnNraWxsX2x2ID0gcy5za2lsbF9sdiB8fCAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0V2FsbEl0ZW1EYXRhLnN0YXJfbHYgPSBzLnN0YXJfbHYgfHwgMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGQgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldFN0YXJDZmdCeUlEKEYuYXJtcywgZmlnaHRXYWxsSXRlbURhdGEuc3Rhcl9sdik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRXYWxsSXRlbURhdGEub2NjdXBhdGlvbiA9IEYub2NjdXBhdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodFdhbGxJdGVtRGF0YS5ocCA9IGZpZ2h0V2FsbEl0ZW1EYXRhLm1heF9ocCA9IE1hdGguZmxvb3IoRi5ocCAqIChkID8gZC5ocCArIDEgOiAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRXYWxsSXRlbURhdGEuYXR0YWNrX3R5cGUgPSBGLmF0dGFja190eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0V2FsbEl0ZW1EYXRhLmF0dGFja19hbmltX3RpbWUgPSBGLmF0dGFja19hbmltX3RpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRXYWxsSXRlbURhdGEuZmx5X3dlYXBvbl9uYW1lID0gRi5mbHlfd2VhcG9uX25hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRXYWxsSXRlbURhdGEuZmx5X3dlYXBvbl90aW1lID0gRi5mbHlfd2VhcG9uX3RpbWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcIlwiICE9IEYuZmx5X3dlYXBvbl9wb3NpdGlvbl9hcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodFdhbGxJdGVtRGF0YS5mbHlfd2VhcG9uX3Bvc2l0aW9uX2FycmF5ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHAgPSBGLmZseV93ZWFwb25fcG9zaXRpb25fYXJyYXkuc3BsaXQoXCJ8XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBoID0gMDsgaCA8IHAubGVuZ3RoOyBoKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFYgPSBwW2hdLnNwbGl0KFwiLFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgyID09IFYubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRXYWxsSXRlbURhdGEuZmx5X3dlYXBvbl9wb3NpdGlvbl9hcnJheVtoXSA9IGNjLnYzKHBhcnNlSW50KFZbMF0udHJpbSgpKSwgcGFyc2VJbnQoVlsxXS50cmltKCkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjYy5lcnJvcihcIumFjee9rueahOaVsOaNruagvOW8j+aciemUmeivr1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihcIsSQ4buLbmggZOG6oW5nIGThu68gbGnhu4d1IMSRxrDhu6NjIGPhuqV1IGjDrG5oIGtow7RuZyDEkcO6bmcuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodFdhbGxJdGVtRGF0YS5hdHRhY2tfdmFsdWUgPSBNYXRoLmZsb29yKEYuYXR0YWNrICogKGQgPyBkLmF0dGFjayArIDEgOiAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRXYWxsSXRlbURhdGEuYXR0YWNrX2ludGVydmFsID0gRi5hdHRhY2tfaW50ZXJ2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRXYWxsSXRlbURhdGEuYXR0YWNrX3JhbmdlID0gRi5yYW5nZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodFdhbGxJdGVtRGF0YS5zZWFyY2hfcmFuZ2UgPSBGLnNlYXJjaF9yYW5nZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodFdhbGxJdGVtRGF0YS5kZWZlbnNlX3ZhbHVlID0gRi5kZWZlbnNlICsgKGQgPyBkLmRlZmVuc2UgOiAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodFdhbGxJdGVtRGF0YS5sYXN0X2F0dGFja190aW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodFdhbGxJdGVtRGF0YS5jYWxsX3JhbmdlID0gZ20uY29uc3QuV0FMTF9DQUxMX1JBTkdFO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0V2FsbEl0ZW1EYXRhLmFycmF5X2luZGV4ID0gdGhpcy53YWxsX2RhdGFfYXJyYXkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMud2FsbF9pbmRleCA9IGZpZ2h0V2FsbEl0ZW1EYXRhLmFycmF5X2luZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbF9kYXRhX2FycmF5LnB1c2goZmlnaHRXYWxsSXRlbURhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlnaHRIZXJvSXRlbURhdGEgPSBuZXcgRmlnaHRIZXJvSXRlbURhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEuZ3JpZF9pbmRleCA9IHMuZ3JpZF9pbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5ncmlkX3Bvc2l0aW9uID0gcy5ncmlkX3Bvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0SGVyb0l0ZW1EYXRhLmlkID0gXztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5sdiA9IEYubHY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEuc2tpbGxfaWQgPSBGLnNraWxsX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0SGVyb0l0ZW1EYXRhLnNraWxsX2x2ID0gcy5za2lsbF9sdiB8fCAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0SGVyb0l0ZW1EYXRhLnN0YXJfbHYgPSBzLnN0YXJfbHYgfHwgMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZCA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0U3RhckNmZ0J5SUQoRi5hcm1zLCBmaWdodEhlcm9JdGVtRGF0YS5zdGFyX2x2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5wYXNzaXZlX3NraWxsX2FycmF5ID0gRi5wYXNzaXZlX3NraWxsX2FycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0SGVyb0l0ZW1EYXRhLmhlcm9fdHlwZSA9IEYuaGVyb190eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0SGVyb0l0ZW1EYXRhLmhwID0gZmlnaHRIZXJvSXRlbURhdGEubWF4X2hwID0gTWF0aC5mbG9vcihGLmhwICogKGQgPyBkLmhwICsgMSA6IDEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5hdHRhY2tfdHlwZSA9IEYuYXR0YWNrX3R5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEuYXR0YWNrX2FuaW1fdGltZSA9IEYuYXR0YWNrX2FuaW1fdGltZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5mbHlfd2VhcG9uX25hbWUgPSBGLmZseV93ZWFwb25fbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5mbHlfd2VhcG9uX3RpbWUgPSBGLmZseV93ZWFwb25fdGltZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFwiXCIgIT0gRi5mbHlfd2VhcG9uX3Bvc2l0aW9uX2FycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0SGVyb0l0ZW1EYXRhLmZseV93ZWFwb25fcG9zaXRpb25fYXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcCA9IEYuZmx5X3dlYXBvbl9wb3NpdGlvbl9hcnJheS5zcGxpdChcInxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHUgPSAwOyB1IDwgcC5sZW5ndGg7IHUrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgViA9IHBbdV0uc3BsaXQoXCIsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDIgPT0gVi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5mbHlfd2VhcG9uX3Bvc2l0aW9uX2FycmF5W3VdID0gY2MudjMocGFyc2VJbnQoVlswXS50cmltKCkpLCBwYXJzZUludChWWzFdLnRyaW0oKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjYy5lcnJvcihcIumFjee9rueahOaVsOaNruagvOW8j+aciemUmeivr1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihcIsSQ4buLbmggZOG6oW5nIGThu68gbGnhu4d1IMSRxrDhu6NjIGPhuqV1IGjDrG5oIGtow7RuZyDEkcO6bmcuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5hdHRhY2tfdmFsdWUgPSBNYXRoLmZsb29yKEYuYXR0YWNrICogKGQgPyBkLmF0dGFjayArIDEgOiAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEuYXR0YWNrX2ludGVydmFsID0gRi5hdHRhY2tfaW50ZXJ2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEuYXR0YWNrX3JhbmdlID0gRi5yYW5nZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5zZWFyY2hfcmFuZ2UgPSBGLnNlYXJjaF9yYW5nZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5tb3ZlX3NwZWVkID0gRi5zcGVlZCArIChkID8gZC5zcGVlZCA6IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0SGVyb0l0ZW1EYXRhLmRlZmVuc2VfdmFsdWUgPSBGLmRlZmVuc2UgKyAoZCA/IGQuZGVmZW5zZSA6IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0SGVyb0l0ZW1EYXRhLm9jY3VwYXRpb24gPSBGLm9jY3VwYXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEudHlwZSA9IEhlcm9UeXBlLkRFRkVOU0U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEubGFzdF9hdHRhY2tfdGltZSA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgxMSA9PSBGLm9jY3VwYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEuYXJyYXlfaW5kZXggPSB0aGlzLnBhc3NpdmVfaGVyb19kYXRhX2FycmF5Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXNzaXZlX2hlcm9fZGF0YV9hcnJheS5wdXNoKGZpZ2h0SGVyb0l0ZW1EYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0SGVyb0l0ZW1EYXRhLmFycmF5X2luZGV4ID0gdGhpcy5kZWZlbnNlX2hlcm9fZGF0YV9hcnJheS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGwgPSBzLmFkZF9kZWZlbnNlX2hlcm9faW5kZXgodGhpcy5kZWZlbnNlX2hlcm9fZGF0YV9hcnJheS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5vZmZzZXQgPSBsLm9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZlbnNlX2hlcm9fZGF0YV9hcnJheS5wdXNoKGZpZ2h0SGVyb0l0ZW1EYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBtID0gWzE2MDAzLCAxNzAwMiwgMTYwMDIsIDE3MDAyLCAxNjAwMSwgMTcwMDIsIDE2MDAxXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCBtLmxlbmd0aDsgcisrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBnID0gbVtyXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGhSYW5kb20gPSBVdGlscy5tYXRoX3JhbmRvbSghMCwgMCwgbi5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKC0gMSA8IG1hdGhSYW5kb20pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcGxpY2UgPSBuLnNwbGljZShtYXRoUmFuZG9tLCAxKVswXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtRGF0YSA9IHRoaXMubWFwX2l0ZW1fZGF0YV9hcnJheVtzcGxpY2VdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGl0ZW1EYXRhKSAmJiAwID09IGl0ZW1EYXRhLml0ZW1fdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtRGF0YS5pdGVtX3R5cGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtRGF0YS5pdGVtX2lkID0gZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlnaHRQcm9wSXRlbURhdGEgPSBuZXcgRmlnaHRQcm9wSXRlbURhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRQcm9wSXRlbURhdGEuZ3JpZF9pbmRleCA9IGl0ZW1EYXRhLmdyaWRfaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0UHJvcEl0ZW1EYXRhLmdyaWRfcG9zaXRpb24gPSBpdGVtRGF0YS5ncmlkX3Bvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdodFByb3BJdGVtRGF0YS5pZCA9IGc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0UHJvcEl0ZW1EYXRhLm51bSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1EYXRhLnByb3BfaW5kZXggPSB0aGlzLnByb3BfZGF0YV9hcnJheS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcF9kYXRhX2FycmF5LnB1c2goZmlnaHRQcm9wSXRlbURhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tbW9uID0gdGhpcy5zcGVjaWFsX3Byb3BfdG9fY29tbW9uX3Byb3AoZmlnaHRQcm9wSXRlbURhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldF9yZXdhcmRfZGF0YShjb21tb24uaWQpLm1heF9udW0gKz0gY29tbW9uLm51bTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYV9zdGFyID0gbmV3IEFTdGFyO1xyXG4gICAgICAgICAgICBsZXQgeSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgdGhpcy5tYXBfaXRlbV9kYXRhX2FycmF5Lmxlbmd0aDsgcisrKSB7XHJcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy5tYXBfaXRlbV9kYXRhX2FycmF5W3JdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCh5KSAmJiAtMSA9PSB5LmVkZ2VfZmxhZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHkuZWRnZV9mbGFnID0gdGhpcy5jYWxjdWxhdGVfZWRnZV9mbGFnKHkuZ3JpZF9wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHYgPSB0aGlzLmdyaWQgPSBuZXcgR3JpZCh0aGlzLm1hcF9zaXplLngsIHRoaXMubWFwX3NpemUueSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IHRoaXMubWFwX2l0ZW1fZGF0YV9hcnJheS5sZW5ndGg7IHIrKykge1xyXG4gICAgICAgICAgICAgICAgeSA9IHRoaXMubWFwX2l0ZW1fZGF0YV9hcnJheVtyXTtcclxuICAgICAgICAgICAgICAgIGlmICgoeSkgJiYgLTEgPT0geS5idWlsZGluZ19pbmRleCAmJiAtMSA9PSB5LndhbGxfaW5kZXggJiYgeS5pc19vYnN0cnVjdCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdi5zZXRXYWxrYWJsZSh5LmdyaWRfcG9zaXRpb24ueCwgeS5ncmlkX3Bvc2l0aW9uLnksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgRCA9IHQuZ3JpZF9wb3NpdGlvbi54IC0gMztcclxuICAgICAgICAgICAgICAgIGNvbnN0IEkgPSB0LmdyaWRfcG9zaXRpb24ueCArIDM7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBFID0gdC5ncmlkX3Bvc2l0aW9uLnkgLSAzO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgQyA9IHQuZ3JpZF9wb3NpdGlvbi55ICsgMztcclxuICAgICAgICAgICAgICAgIGxldCBUID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgciA9IEQ7IHIgPD0gSTsgcisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgYiA9IEU7IGIgPD0gQzsgYisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFQgPSB0aGlzLmdldF9maWdodF9tYXBfaXRlbV9kYXRhKHIsIGIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKFQpICYmIDAgPCBULmVudGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoVC5lbnRlciA9IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB3ID0gdGhpcy5ncmlkX3Bvc2l0aW9uX3RvX2Zsb29yX3Bvc2l0aW9uKGNjLnYyKDAsIHRoaXMubWFwX3NpemUueSkpO1xyXG4gICAgICAgICAgICBjb25zdCBOID0gdGhpcy5ncmlkX3Bvc2l0aW9uX3RvX2Zsb29yX3Bvc2l0aW9uKGNjLnYyKHRoaXMubWFwX3NpemUueCwgMCkpO1xyXG4gICAgICAgICAgICBjb25zdCBBID0gdGhpcy5ncmlkX3Bvc2l0aW9uX3RvX2Zsb29yX3Bvc2l0aW9uKGNjLnYyKDAsIDApKTtcclxuICAgICAgICAgICAgY29uc3QgTyA9IHRoaXMuZ3JpZF9wb3NpdGlvbl90b19mbG9vcl9wb3NpdGlvbihjYy52Mih0aGlzLm1hcF9zaXplLngsIHRoaXMubWFwX3NpemUueSkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5taW5fb2Zmc2V0LnggPSAtTi54IC0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUud2lkdGggLyAyO1xyXG4gICAgICAgICAgICB0aGlzLm1heF9vZmZzZXQueCA9IC13LnggKyBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS53aWR0aCAvIDI7XHJcbiAgICAgICAgICAgIHRoaXMubWluX29mZnNldC55ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5tYXhfb2Zmc2V0LnkgPSBBLnkgLSBPLnk7XHJcbiAgICAgICAgICAgIHRoaXMubWFwX3N0YXJ0X3Bvc2l0aW9uID0gY2MudjMoLTM5NiwgMTExMCk7XHJcbiAgICAgICAgICAgIHRoaXMuYm9hdF9zdGFydF9wb3NpdGlvbiA9IGNjLnYzKDMwMCwgLTUwMCk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IFJvd0RhdGEgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhX2FycmF5KFwiUGxheU1hcENvbmZpZ0RhdGFcIiwgdGhpcy5tYXBfaWQudG9TdHJpbmcoKSkgYXMgUGxheU1hcFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCBSb3dEYXRhLmxlbmd0aDsgcisrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBTID0gUm93RGF0YVtyXTtcclxuICAgICAgICAgICAgICAgIGlmIChTKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT0gcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcF9zaXplLnggPSBTLmNvbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBfc2l6ZS55ID0gUy5yb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWdodE1hcEl0ZW1EYXRhID0gbmV3IEZpZ2h0TWFwSXRlbURhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBmaWdodE1hcEl0ZW1EYXRhLmdyaWRfaW5kZXggPSBTLmNlbGxfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlnaHRNYXBJdGVtRGF0YS5ncmlkX3Bvc2l0aW9uID0gY2MudjIoZmlnaHRNYXBJdGVtRGF0YS5ncmlkX2luZGV4ICUgdGhpcy5tYXBfc2l6ZS54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKGZpZ2h0TWFwSXRlbURhdGEuZ3JpZF9pbmRleCAvIHRoaXMubWFwX3NpemUueCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZ2h0TWFwSXRlbURhdGEucG9zaXRpb24gPSB0aGlzLmdyaWRfcG9zaXRpb25fdG9fZmxvb3JfcG9zaXRpb24oZmlnaHRNYXBJdGVtRGF0YS5ncmlkX3Bvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBmaWdodE1hcEl0ZW1EYXRhLmxhbmRfaWQgPSBTLmxhbmRfaW1nX2lkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoMCA8IFMucGxhbnRfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlnaHREZWNvcmF0aW9uSXRlbURhdGEgPSBuZXcgRmlnaHREZWNvcmF0aW9uSXRlbURhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHREZWNvcmF0aW9uSXRlbURhdGEuZGVjb3JhdGlvbl9pZCA9IFMucGxhbnRfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0RGVjb3JhdGlvbkl0ZW1EYXRhLnBsYW50X3hfb2Zmc2V0ID0gUy5wbGFudF94X29mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHREZWNvcmF0aW9uSXRlbURhdGEucGxhbnRfeV9vZmZzZXQgPSBTLnBsYW50X3lfb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdodERlY29yYXRpb25JdGVtRGF0YS5ncmlkX2luZGV4ID0gZmlnaHRNYXBJdGVtRGF0YS5ncmlkX2luZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdodERlY29yYXRpb25JdGVtRGF0YS5ncmlkX3Bvc2l0aW9uID0gZmlnaHRNYXBJdGVtRGF0YS5ncmlkX3Bvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdodERlY29yYXRpb25JdGVtRGF0YS5hcnJheV9pbmRleCA9IHRoaXMuZGVjb3JhdGlvbl9kYXRhX2FycmF5Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRNYXBJdGVtRGF0YS5kZWNvcmF0aW9uX2luZGV4ID0gdGhpcy5kZWNvcmF0aW9uX2RhdGFfYXJyYXkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlY29yYXRpb25fZGF0YV9hcnJheS5wdXNoKGZpZ2h0RGVjb3JhdGlvbkl0ZW1EYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZpZ2h0TWFwSXRlbURhdGEuY2VsbF9pZCA9IFMuY2VsbF9pZDtcclxuICAgICAgICAgICAgICAgICAgICBmaWdodE1hcEl0ZW1EYXRhLnBsYW50X2lkID0gUy5wbGFudF9pZDtcclxuICAgICAgICAgICAgICAgICAgICBmaWdodE1hcEl0ZW1EYXRhLmxhbmRfaW1nX2lkID0gUy5sYW5kX2ltZ19pZDtcclxuICAgICAgICAgICAgICAgICAgICBmaWdodE1hcEl0ZW1EYXRhLmxhbmRfeV9vZmZzZXQgPSBTLmxhbmRfeV9vZmZzZXQgKyA5O1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZ2h0TWFwSXRlbURhdGEucGxhbnRfeF9vZmZzZXQgPSBTLnBsYW50X3hfb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZ2h0TWFwSXRlbURhdGEucGxhbnRfeV9vZmZzZXQgPSBTLnBsYW50X3lfb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZ2h0TWFwSXRlbURhdGEud2F0ZXJfaW1nX2lkID0gUy53YXRlcl9pbWdfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBfaXRlbV9kYXRhX2FycmF5W2ZpZ2h0TWFwSXRlbURhdGEuZ3JpZF9pbmRleF0gPSBmaWdodE1hcEl0ZW1EYXRhO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtYXAgPSB0aGlzLm1hcF9pZCArIFwiX1wiICsgdGhpcy5tYXBfZGF0YV9pZDtcclxuICAgICAgICAgICAgbGV0IGs6IFBsYXlDYXZlc1tdIHwgUGxheUNhdmVzW10gPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoMCA9PSB0aGlzLnBsYXlfdHlwZSB8fCAxID09IHRoaXMucGxheV90eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBrID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YV9hcnJheShcIlBsYXlEYXRhQ29uZmlnRGF0YVwiLCBtYXApIGFzIFBsYXlEYXRhW107XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKDIgPT0gdGhpcy5wbGF5X3R5cGUpIHtcclxuICAgICAgICAgICAgICAgIGsgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhX2FycmF5KFwiUGxheUNhdmVzQ29uZmlnRGF0YVwiLCBtYXApIGFzIFBsYXlDYXZlc1tdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBMO1xyXG4gICAgICAgICAgICBsZXQgcyA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgbGV0IEggPSAocyA9IHVuZGVmaW5lZCwgMCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgay5sZW5ndGg7IHIrKykge1xyXG4gICAgICAgICAgICAgICAgTCA9IGtbcl07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzID0gdGhpcy5tYXBfaXRlbV9kYXRhX2FycmF5W0wuY2VsbF9pZF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBTID0gUm93RGF0YVtyXTtcclxuICAgICAgICAgICAgICAgIGlmIChzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcy5lbnRlciA9IEwuZW50ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgMCA8IHMuZW50ZXIgJiYgSCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIHMuaXRlbV90eXBlID0gTC5pdGVtX3R5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcy5pdGVtX2lkID0gTC5pdGVtX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgIHMuaXNfb2JzdHJ1Y3QgPSBMLmlzX29ic3RydWN0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgxID09IEwuaXRlbV90eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZ2h0UHJvcEl0ZW1EYXRhID0gbmV3IEZpZ2h0UHJvcEl0ZW1EYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRQcm9wSXRlbURhdGEuZ3JpZF9pbmRleCA9IHMuZ3JpZF9pbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRQcm9wSXRlbURhdGEuZ3JpZF9wb3NpdGlvbiA9IHMuZ3JpZF9wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRQcm9wSXRlbURhdGEuaWQgPSBMLml0ZW1faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0UHJvcEl0ZW1EYXRhLm51bSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHMucHJvcF9pbmRleCA9IHRoaXMucHJvcF9kYXRhX2FycmF5Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wX2RhdGFfYXJyYXkucHVzaChmaWdodFByb3BJdGVtRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjID0gdGhpcy5zcGVjaWFsX3Byb3BfdG9fY29tbW9uX3Byb3AoZmlnaHRQcm9wSXRlbURhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldF9yZXdhcmRfZGF0YShjLmlkKS5tYXhfbnVtICs9IGMubnVtO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKDIgPT0gTC5pdGVtX3R5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlnaHRCdWlsZGluZ0l0ZW1EYXRhID0gbmV3IEZpZ2h0QnVpbGRpbmdJdGVtRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdodEJ1aWxkaW5nSXRlbURhdGEuZ3JpZF9pbmRleCA9IHMuZ3JpZF9pbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRCdWlsZGluZ0l0ZW1EYXRhLmdyaWRfcG9zaXRpb24gPSBzLmdyaWRfcG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0QnVpbGRpbmdJdGVtRGF0YS5pZCA9IEwuaXRlbV9pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRCdWlsZGluZ0l0ZW1EYXRhLnJld2FyZF9hcnJheSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByb3dEYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkJ1aWxkQ29uZmlnRGF0YVwiLCBmaWdodEJ1aWxkaW5nSXRlbURhdGEuaWQudG9TdHJpbmcoKSkgYXMgQnVpbGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3dEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEJ1aWxkaW5nSXRlbURhdGEuc3Rhcl9jb3VudCA9IHJvd0RhdGEuc3RhcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0QnVpbGRpbmdJdGVtRGF0YS5ocCA9IGZpZ2h0QnVpbGRpbmdJdGVtRGF0YS5tYXhfaHAgPSByb3dEYXRhLmhwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRCdWlsZGluZ0l0ZW1EYXRhLmRlZmVuc2UgPSByb3dEYXRhLmRlZmVuc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEJ1aWxkaW5nSXRlbURhdGEuYXR0YWNrX3ZhbHVlID0gcm93RGF0YS5hdHRhY2s7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEJ1aWxkaW5nSXRlbURhdGEuY2FsbF9yYW5nZSA9IHJvd0RhdGEuY2FsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0QnVpbGRpbmdJdGVtRGF0YS5hdHRhY2tfaW50ZXJ2YWwgPSByb3dEYXRhLmF0dGFja19pbnRlcnZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0QnVpbGRpbmdJdGVtRGF0YS5hdHRhY2tfcmFuZ2UgPSByb3dEYXRhLmF0dGFja19yYW5nZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0QnVpbGRpbmdJdGVtRGF0YS5mbHlfd2VhcG9uX25hbWUgPSByb3dEYXRhLmZseV93ZWFwb25fbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0QnVpbGRpbmdJdGVtRGF0YS5sdiA9IHJvd0RhdGEuYnVpbGRMdjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0X3Jld2FyZF9kYXRhKFJld2FyZElkRW51bS5TVEFSKS5tYXhfbnVtICs9IHJvd0RhdGEuc3RhcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA8IHJvd0RhdGEubWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlUHJvcEl0ZW1EYXRhID0gbmV3IEJhc2VQcm9wSXRlbURhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlUHJvcEl0ZW1EYXRhLmlkID0gcm93RGF0YS5tYXRlcmlhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlUHJvcEl0ZW1EYXRhLm51bSA9IHJvd0RhdGEucXVhbnRpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRCdWlsZGluZ0l0ZW1EYXRhLnJld2FyZF9hcnJheVtmaWdodEJ1aWxkaW5nSXRlbURhdGEucmV3YXJkX2FycmF5Lmxlbmd0aF0gPSBiYXNlUHJvcEl0ZW1EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1vbiA9IHRoaXMuc3BlY2lhbF9wcm9wX3RvX2NvbW1vbl9wcm9wKGJhc2VQcm9wSXRlbURhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0X3Jld2FyZF9kYXRhKGNvbW1vbi5pZCkubWF4X251bSArPSBjb21tb24ubnVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgwIDwgcm93RGF0YS5jb2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZVByb3BJdGVtRGF0YSA9IG5ldyBCYXNlUHJvcEl0ZW1EYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZVByb3BJdGVtRGF0YS5pZCA9IFJld2FyZElkRW51bS5HT0xEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VQcm9wSXRlbURhdGEubnVtID0gcm93RGF0YS5jb2luO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0QnVpbGRpbmdJdGVtRGF0YS5yZXdhcmRfYXJyYXlbZmlnaHRCdWlsZGluZ0l0ZW1EYXRhLnJld2FyZF9hcnJheS5sZW5ndGhdID0gYmFzZVByb3BJdGVtRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldF9yZXdhcmRfZGF0YShiYXNlUHJvcEl0ZW1EYXRhLmlkKS5tYXhfbnVtICs9IGJhc2VQcm9wSXRlbURhdGEubnVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdodEJ1aWxkaW5nSXRlbURhdGEuYXJyYXlfaW5kZXggPSB0aGlzLmJ1aWxkaW5nX2RhdGFfYXJyYXkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzLmJ1aWxkaW5nX2luZGV4ID0gdGhpcy5idWlsZGluZ19kYXRhX2FycmF5Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idWlsZGluZ19kYXRhX2FycmF5LnB1c2goZmlnaHRCdWlsZGluZ0l0ZW1EYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgzID09IEwuaXRlbV90eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IF8gPSBMLml0ZW1faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IEYgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiSGVyb0NvbmZpZ0RhdGFcIiwgXy50b1N0cmluZygpKSBhcyBIZXJvQ29uZmlnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoRikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDEwID09IEYub2NjdXBhdGlvbiB8fCAxMiA9PSBGLm9jY3VwYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWdodFdhbGxJdGVtRGF0YSA9IG5ldyBGaWdodFdhbGxJdGVtRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0V2FsbEl0ZW1EYXRhLmdyaWRfaW5kZXggPSBzLmdyaWRfaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRXYWxsSXRlbURhdGEuZ3JpZF9wb3NpdGlvbiA9IHMuZ3JpZF9wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodFdhbGxJdGVtRGF0YS5pZCA9IF87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRXYWxsSXRlbURhdGEubHYgPSBGLmx2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0V2FsbEl0ZW1EYXRhLnNraWxsX2lkID0gRi5za2lsbF9pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodFdhbGxJdGVtRGF0YS5wYXNzaXZlX3NraWxsX2FycmF5ID0gRi5wYXNzaXZlX3NraWxsX2FycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0V2FsbEl0ZW1EYXRhLnNraWxsX2x2ID0gTC5za2lsbF9sdiB8fCAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0V2FsbEl0ZW1EYXRhLnN0YXJfbHYgPSBMLnN0YXJfbHYgfHwgMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZCA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0U3RhckNmZ0J5SUQoRi5hcm1zLCBmaWdodFdhbGxJdGVtRGF0YS5zdGFyX2x2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodFdhbGxJdGVtRGF0YS5vY2N1cGF0aW9uID0gRi5vY2N1cGF0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0V2FsbEl0ZW1EYXRhLmhwID0gZmlnaHRXYWxsSXRlbURhdGEubWF4X2hwID0gTWF0aC5mbG9vcihGLmhwICogKGQgPyBkLmhwICsgMSA6IDEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodFdhbGxJdGVtRGF0YS5hdHRhY2tfdHlwZSA9IEYuYXR0YWNrX3R5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRXYWxsSXRlbURhdGEuYXR0YWNrX2FuaW1fdGltZSA9IEYuYXR0YWNrX2FuaW1fdGltZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodFdhbGxJdGVtRGF0YS5mbHlfd2VhcG9uX25hbWUgPSBGLmZseV93ZWFwb25fbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodFdhbGxJdGVtRGF0YS5mbHlfd2VhcG9uX3RpbWUgPSBGLmZseV93ZWFwb25fdGltZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFwiXCIgIT0gRi5mbHlfd2VhcG9uX3Bvc2l0aW9uX2FycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0V2FsbEl0ZW1EYXRhLmZseV93ZWFwb25fcG9zaXRpb25fYXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcCA9IEYuZmx5X3dlYXBvbl9wb3NpdGlvbl9hcnJheS5zcGxpdChcInxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIFcgPSAwOyBXIDwgcC5sZW5ndGg7IFcrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgViA9IHBbV10uc3BsaXQoXCIsXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMiA9PSBWLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0V2FsbEl0ZW1EYXRhLmZseV93ZWFwb25fcG9zaXRpb25fYXJyYXlbV10gPSBjYy52MyhwYXJzZUludChWWzBdLnRyaW0oKSksIHBhcnNlSW50KFZbMV0udHJpbSgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNjLmVycm9yKFwi6YWN572u55qE5pWw5o2u5qC85byP5pyJ6ZSZ6K+vXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKFwixJDhu4tuaCBk4bqhbmcgZOG7ryBsaeG7h3UgxJHGsOG7o2MgY+G6pXUgaMOsbmgga2jDtG5nIMSRw7puZy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0V2FsbEl0ZW1EYXRhLmF0dGFja192YWx1ZSA9IE1hdGguZmxvb3IoRi5hdHRhY2sgKiAoZCA/IGQuYXR0YWNrICsgMSA6IDEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodFdhbGxJdGVtRGF0YS5hdHRhY2tfaW50ZXJ2YWwgPSBGLmF0dGFja19pbnRlcnZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodFdhbGxJdGVtRGF0YS5hdHRhY2tfcmFuZ2UgPSBGLnJhbmdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0V2FsbEl0ZW1EYXRhLnNlYXJjaF9yYW5nZSA9IEYuc2VhcmNoX3JhbmdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0V2FsbEl0ZW1EYXRhLmRlZmVuc2VfdmFsdWUgPSBGLmRlZmVuc2UgKyAoZCA/IGQuZGVmZW5zZSA6IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0V2FsbEl0ZW1EYXRhLmxhc3RfYXR0YWNrX3RpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0V2FsbEl0ZW1EYXRhLmNhbGxfcmFuZ2UgPSBnbS5jb25zdC5XQUxMX0NBTExfUkFOR0U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRXYWxsSXRlbURhdGEuYXJyYXlfaW5kZXggPSB0aGlzLndhbGxfZGF0YV9hcnJheS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcy53YWxsX2luZGV4ID0gZmlnaHRXYWxsSXRlbURhdGEuYXJyYXlfaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsX2RhdGFfYXJyYXkucHVzaChmaWdodFdhbGxJdGVtRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWdodEhlcm9JdGVtRGF0YSA9IG5ldyBGaWdodEhlcm9JdGVtRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0SGVyb0l0ZW1EYXRhLmdyaWRfaW5kZXggPSBzLmdyaWRfaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEuZ3JpZF9wb3NpdGlvbiA9IHMuZ3JpZF9wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5pZCA9IF87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEubHYgPSBGLmx2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0SGVyb0l0ZW1EYXRhLnNraWxsX2lkID0gRi5za2lsbF9pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5za2lsbF9sdiA9IEwuc2tpbGxfbHYgfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5zdGFyX2x2ID0gTC5zdGFyX2x2IHx8IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGQgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldFN0YXJDZmdCeUlEKEYuYXJtcywgZmlnaHRIZXJvSXRlbURhdGEuc3Rhcl9sdik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEucGFzc2l2ZV9za2lsbF9hcnJheSA9IEYucGFzc2l2ZV9za2lsbF9hcnJheTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5oZXJvX3R5cGUgPSBGLmhlcm9fdHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5ocCA9IGZpZ2h0SGVyb0l0ZW1EYXRhLm1heF9ocCA9IE1hdGguZmxvb3IoRi5ocCAqIChkID8gZC5ocCArIDEgOiAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEuYXR0YWNrX3R5cGUgPSBGLmF0dGFja190eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0SGVyb0l0ZW1EYXRhLmF0dGFja19hbmltX3RpbWUgPSBGLmF0dGFja19hbmltX3RpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEuZmx5X3dlYXBvbl9uYW1lID0gRi5mbHlfd2VhcG9uX25hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEuZmx5X3dlYXBvbl90aW1lID0gRi5mbHlfd2VhcG9uX3RpbWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcIlwiICE9IEYuZmx5X3dlYXBvbl9wb3NpdGlvbl9hcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5mbHlfd2VhcG9uX3Bvc2l0aW9uX2FycmF5ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHAgPSBGLmZseV93ZWFwb25fcG9zaXRpb25fYXJyYXkuc3BsaXQoXCJ8XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgVjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgSyA9IDA7IEsgPCBwLmxlbmd0aDsgSysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMiA9PSAoViA9IHBbS10uc3BsaXQoXCIsXCIpKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5mbHlfd2VhcG9uX3Bvc2l0aW9uX2FycmF5W0tdID0gY2MudjMocGFyc2VJbnQoVlswXS50cmltKCkpLCBwYXJzZUludChWWzFdLnRyaW0oKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjYy5lcnJvcihcIumFjee9rueahOaVsOaNruagvOW8j+aciemUmeivr1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihcIsSQ4buLbmggZOG6oW5nIGThu68gbGnhu4d1IMSRxrDhu6NjIGPhuqV1IGjDrG5oIGtow7RuZyDEkcO6bmcuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5hdHRhY2tfdmFsdWUgPSBNYXRoLmZsb29yKEYuYXR0YWNrICogKGQgPyBkLmF0dGFjayArIDEgOiAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEuYXR0YWNrX2ludGVydmFsID0gRi5hdHRhY2tfaW50ZXJ2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEuYXR0YWNrX3JhbmdlID0gRi5yYW5nZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5zZWFyY2hfcmFuZ2UgPSBGLnNlYXJjaF9yYW5nZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5tb3ZlX3NwZWVkID0gRi5zcGVlZCArIChkID8gZC5zcGVlZCA6IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0SGVyb0l0ZW1EYXRhLmRlZmVuc2VfdmFsdWUgPSBGLmRlZmVuc2UgKyAoZCA/IGQuZGVmZW5zZSA6IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0SGVyb0l0ZW1EYXRhLm9jY3VwYXRpb24gPSBGLm9jY3VwYXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEudHlwZSA9IEhlcm9UeXBlLkRFRkVOU0U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEubGFzdF9hdHRhY2tfdGltZSA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgxMSA9PSBGLm9jY3VwYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEuYXJyYXlfaW5kZXggPSB0aGlzLnBhc3NpdmVfaGVyb19kYXRhX2FycmF5Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXNzaXZlX2hlcm9fZGF0YV9hcnJheS5wdXNoKGZpZ2h0SGVyb0l0ZW1EYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5hcnJheV9pbmRleCA9IHRoaXMuZGVmZW5zZV9oZXJvX2RhdGFfYXJyYXkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsID0gcy5hZGRfZGVmZW5zZV9oZXJvX2luZGV4KHRoaXMuZGVmZW5zZV9oZXJvX2RhdGFfYXJyYXkubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEub2Zmc2V0ID0gbC5vZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmZW5zZV9oZXJvX2RhdGFfYXJyYXkucHVzaChmaWdodEhlcm9JdGVtRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBEID0gY2MuanMuZm9ybWF0U3RyKFwibWFwX2lkOiVkLG1hcF9kYXRhX2lkOiVkIELhuqNuZyBj4bqldSBow6xuaCBz4buRIMSRaeG7g20gaOG6oSBjw6FuaCAlZFwiLCB0aGlzLm1hcF9pZCwgdGhpcy5tYXBfZGF0YV9pZCwgSCk7XHJcbiAgICAgICAgICAgIEggPD0gMCA/IGNvbnNvbGUuZXJyb3IoRCkgOiBjb25zb2xlLmxvZyhEKTtcclxuICAgICAgICAgICAgdGhpcy5hX3N0YXIgPSBuZXcgQVN0YXI7XHJcbiAgICAgICAgICAgIGxldCB5ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IHRoaXMubWFwX2l0ZW1fZGF0YV9hcnJheS5sZW5ndGg7IHIrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeSA9IHRoaXMubWFwX2l0ZW1fZGF0YV9hcnJheVtyXTtcclxuICAgICAgICAgICAgICAgIGlmICh5ICYmIC0xID09IHkuZWRnZV9mbGFnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKHkuZWRnZV9mbGFnID0gdGhpcy5jYWxjdWxhdGVfZWRnZV9mbGFnKHkuZ3JpZF9wb3NpdGlvbikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB2ID0gdGhpcy5ncmlkID0gbmV3IEdyaWQodGhpcy5tYXBfc2l6ZS54LCB0aGlzLm1hcF9zaXplLnkpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IHRoaXMubWFwX2l0ZW1fZGF0YV9hcnJheS5sZW5ndGg7IHIrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeSA9IHRoaXMubWFwX2l0ZW1fZGF0YV9hcnJheVtyXTtcclxuICAgICAgICAgICAgICAgIGlmICh5ICYmIC0xID09IHkuYnVpbGRpbmdfaW5kZXggJiYgLTEgPT0geS53YWxsX2luZGV4ICYmIHkuaXNfb2JzdHJ1Y3QgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHYuc2V0V2Fsa2FibGUoeS5ncmlkX3Bvc2l0aW9uLngsIHkuZ3JpZF9wb3NpdGlvbi55LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgdyA9IHRoaXMuZ3JpZF9wb3NpdGlvbl90b19mbG9vcl9wb3NpdGlvbihjYy52MigwLCB0aGlzLm1hcF9zaXplLnkpKTtcclxuICAgICAgICAgICAgY29uc3QgTiA9IHRoaXMuZ3JpZF9wb3NpdGlvbl90b19mbG9vcl9wb3NpdGlvbihjYy52Mih0aGlzLm1hcF9zaXplLngsIDApKTtcclxuICAgICAgICAgICAgY29uc3QgQSA9IHRoaXMuZ3JpZF9wb3NpdGlvbl90b19mbG9vcl9wb3NpdGlvbihjYy52MigwLCAwKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IE8gPSB0aGlzLmdyaWRfcG9zaXRpb25fdG9fZmxvb3JfcG9zaXRpb24oY2MudjIodGhpcy5tYXBfc2l6ZS54LCB0aGlzLm1hcF9zaXplLnkpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWluX29mZnNldC54ID0gLU4ueCAtIGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLndpZHRoIC8gMjtcclxuICAgICAgICAgICAgdGhpcy5tYXhfb2Zmc2V0LnggPSAtdy54ICsgY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUud2lkdGggLyAyO1xyXG4gICAgICAgICAgICB0aGlzLm1pbl9vZmZzZXQueSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubWF4X29mZnNldC55ID0gQS55IC0gTy55O1xyXG4gICAgICAgICAgICB0aGlzLm1hcF9zdGFydF9wb3NpdGlvbiA9IGNjLnYzKC0xNjAsIDE2Nik7XHJcbiAgICAgICAgICAgIHRoaXMuYm9hdF9zdGFydF9wb3NpdGlvbiA9IGNjLnYzKDE2MCwgMjEwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcF9pdGVtX2RhdGFfYXJyYXk7XHJcbiAgICB9IC8vIGVuZDogYnVpbGRfcGxheV9tYXBfZGF0YVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXRXYWxrYWJsZShwb3NpdGlvbjogY2MuVmVjMik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdyaWQuZ2V0V2Fsa2FibGUocG9zaXRpb24ueCwgcG9zaXRpb24ueSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHJpdmF0ZSBnZXRfYWxpdmVfZGVmZW5zZV9oZXJvX2hwKGhlcm9faWQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuZmlnaHRfcmVzdWx0X2RhdGEuYWxpdmVfZGVmZW5zZV9oZXJvX2RhdGFfYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlZmVuc2VIZXJvID0gdGhpcy5maWdodF9yZXN1bHRfZGF0YS5hbGl2ZV9kZWZlbnNlX2hlcm9fZGF0YV9hcnJheVtpbmRleF07XHJcbiAgICAgICAgICAgIGlmIChkZWZlbnNlSGVyby5pZCA9PSBoZXJvX2lkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmZW5zZUhlcm8uaHA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldF9hbGxfcmVzdWx0X2RhdGEoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0RGF0YTogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICBsZXQgcHJvcERhdGFBcnJheSA9IHRoaXMuZmlnaHRfcmVzdWx0X2RhdGEucHJvcF9kYXRhX2FycmF5O1xyXG4gICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlKSB7XHJcbiAgICAgICAgICAgIHByb3BEYXRhQXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgY29uc3QgZ3VpZGVSZXdhcmRzID0gW1xyXG4gICAgICAgICAgICAgICAgWzEyMDAxLCAxXSxcclxuICAgICAgICAgICAgICAgIFsxMTAwNCwgMTRdLFxyXG4gICAgICAgICAgICAgICAgWzExMDA1LCAyXSxcclxuICAgICAgICAgICAgICAgIFsxMzAwMSwgMV1cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBndWlkZVJld2FyZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJld2FyZEl0ZW0gPSBuZXcgRmlnaHRSZXN1bHRQcm9wSXRlbURhdGEoKTtcclxuICAgICAgICAgICAgICAgIHJld2FyZEl0ZW0udHlwZSA9IDE7XHJcbiAgICAgICAgICAgICAgICByZXdhcmRJdGVtLmlkID0gZ3VpZGVSZXdhcmRzW2ldWzBdO1xyXG4gICAgICAgICAgICAgICAgcmV3YXJkSXRlbS5udW0gPSBndWlkZVJld2FyZHNbaV1bMV07XHJcbiAgICAgICAgICAgICAgICByZXdhcmRJdGVtLmNvbG9yID0gMTtcclxuICAgICAgICAgICAgICAgIHByb3BEYXRhQXJyYXkucHVzaChyZXdhcmRJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIGxldCBkaWFtb25kQ291bnQgPSAwO1xyXG4gICAgICAgIGNvbnN0IGdhcnJpc29uRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldEJ1aWxkRGF0YUJ5VHlwZShCdWlsZFR5cGVFbnVtLkdBUlJJU0lPTl9UWVBFKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BEYXRhQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvcCA9IHByb3BEYXRhQXJyYXlbaV07XHJcbiAgICAgICAgICAgIGlmIChwcm9wLmlkICE9PSBSZXdhcmRJZEVudW0uRElBTU9ORCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb3AuaWQgPT09IFJld2FyZElkRW51bS5XT09EKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcC5pZCA9IDE2MDAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wLmlkID09PSBSZXdhcmRJZEVudW0uSVJPTikge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3AuaWQgPSAxNzAwMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICBpZiAoIWdhcnJpc29uRGF0YSB8fCBnYXJyaXNvbkRhdGEuYnVpbGRMdmwgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3AuaWQgPCAzMDAwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtQ2ZnID0gZ20uZGF0YS5jb25maWdfZGF0YS5nZXRJdGVtQ2ZnQnlJRChwcm9wLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1DZmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtQ2ZnLnR5cGUgPT09IFByb3BUeXBlRW51bS5XT09EX1RZUEUgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtQ2ZnLnR5cGUgPT09IFByb3BUeXBlRW51bS5JUk9OX1RZUEUgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtQ2ZnLnR5cGUgPT09IFByb3BUeXBlRW51bS5TSEVMTF9NT05FWV9UWVBFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVuY3lJZCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1DZmcudHlwZSA9PT0gUHJvcFR5cGVFbnVtLldPT0RfVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeUlkID0gMTYwMDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtQ2ZnLnR5cGUgPT09IFByb3BUeXBlRW51bS5JUk9OX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3lJZCA9IDE3MDA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbUNmZy50eXBlID09PSBQcm9wVHlwZUVudW0uU0hFTExfTU9ORVlfVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeUlkID0gMjUwMDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNwbGl0SXRlbU51bShwcm9wLm51bSAqIHRoaXMubWFwX2VuZF9tYW55X3RpbWVzLCBjdXJyZW5jeUlkLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwcm9wLm51bSAqIHRoaXMubWFwX2VuZF9tYW55X3RpbWVzOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0RGF0YS5wdXNoKHByb3AuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcHJvcC5udW0gKiB0aGlzLm1hcF9lbmRfbWFueV90aW1lczsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHREYXRhLnB1c2gocHJvcC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwbGl0SXRlbSA9IGdtLmRhdGEuaGlnaF90b19sb3dfbGV2ZWxfcHJvcChwcm9wLmlkLCBwcm9wLm51bSAqIHRoaXMubWFwX2VuZF9tYW55X3RpbWVzKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoaWdoUHJvcCA9IGdtLmRhdGEubG93X2xldmVsX3RvX2hpZ2hfcHJvcChzcGxpdEl0ZW0uaXRlbV9pZCwgc3BsaXRJdGVtLml0ZW1fbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGhpZ2hQcm9wLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhpZ2hJdGVtID0gaGlnaFByb3Bbal07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgaGlnaEl0ZW0uaXRlbV9udW07IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0RGF0YS5wdXNoKGhpZ2hJdGVtLml0ZW1faWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGlhbW9uZENvdW50ID0gcHJvcC5udW0gKiB0aGlzLm1hcF9lbmRfbWFueV90aW1lcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gLy8gZW5kOiBmb3JcclxuXHJcbiAgICAgICAgLy8gWOG7rSBsw70ga+G6v3QgdGjDumMgYmF0dGxlXHJcbiAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNGaXJzdEJhdHRsZSA9IGZhbHNlO1xyXG4gICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZFdhcmVIb3VzZUxpc3QocmVzdWx0RGF0YSk7XHJcbiAgICAgICAgY29uc3QgaGVyb0JhdHRsZURhdGE6IHsgdW5pcXVlX2lkOiBudW1iZXIsIGlkOiBudW1iZXIsIGhwOiBudW1iZXIgfVtdID0gW107XHJcbiAgICAgICAgY29uc3QgZGVmZW5zZUhlcm9EYXRhOiB7IHVuaXF1ZV9pZDogbnVtYmVyLCBpZDogbnVtYmVyLCBocDogbnVtYmVyIH1bXSA9IFtdO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5nb2FsX3VpZCAhPT0gXCJcIiAmJiB0aGlzLnBsYXlfdHlwZSA9PT0gMCAmJiB0aGlzLmRlZmVuc2l2ZV9kYXRhKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5oZXJvX2RhdGFfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhlcm8gPSB0aGlzLmhlcm9fZGF0YV9hcnJheVtpXTtcclxuICAgICAgICAgICAgICAgIGhlcm9CYXR0bGVEYXRhLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHVuaXF1ZV9pZDogMCxcclxuICAgICAgICAgICAgICAgICAgICBpZDogaGVyby5pZCxcclxuICAgICAgICAgICAgICAgICAgICBocDogaGVyby5ocFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRlZmVuc2l2ZV9kYXRhLmhlcm9fZGF0YV9hcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVmZW5zZUhlcm8gPSB0aGlzLmRlZmVuc2l2ZV9kYXRhLmhlcm9fZGF0YV9hcnJheVtpXTtcclxuICAgICAgICAgICAgICAgIGRlZmVuc2VIZXJvRGF0YS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICB1bmlxdWVfaWQ6IGRlZmVuc2VIZXJvLnVuaXF1ZV9pZCxcclxuICAgICAgICAgICAgICAgICAgICBpZDogZGVmZW5zZUhlcm8uaGVyb19pZCxcclxuICAgICAgICAgICAgICAgICAgICBocDogdGhpcy5nZXRfYWxpdmVfZGVmZW5zZV9oZXJvX2hwKGRlZmVuc2VIZXJvLmhlcm9faWQpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5oZXJvX2RhdGFfYXJyYXkgPSBbXTtcclxuICAgICAgICBjb25zdCBsYWRkZXJMZXZlbCA9IGdtLmRhdGEubGFkZGVyX3RlbXBfZGF0YS5jb252ZXJ0X3JhbmtfdG9fbHYoZ20uZGF0YS5sYWRkZXJfdGVtcF9kYXRhLnJhbmspO1xyXG4gICAgICAgIGNvbnN0IGxhZGRlckNvbmZpZyA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJMYWRkZXJMdkNvbmZpZ0RhdGFcIiwgbGFkZGVyTGV2ZWwudG9TdHJpbmcoKSkgYXMgTGFkZGVyTFZDb25maWc7XHJcbiAgICAgICAgLy9cclxuICAgICAgICBpZiAodGhpcy5maWdodF9yZXN1bHRfZGF0YS5yZXN1bHQgPT09IDEpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ29hbF91aWQgJiYgdGhpcy5wbGF5X3R5cGUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJld2FyZEl0ZW1zOiB7IGlkOiBudW1iZXIsIG51bTogbnVtYmVyIH1bXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9uU3RhclJld2FyZHM6IHsgaWQ6IG51bWJlciwgbnVtOiBudW1iZXIgfVtdID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BEYXRhQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICByZXdhcmRJdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHByb3BEYXRhQXJyYXlbaV0uaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bTogcHJvcERhdGFBcnJheVtpXS5udW1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcGVjaWFsUmV3YXJkSWRzID0gW1Jld2FyZElkRW51bS5TVEFSLCBSZXdhcmRJZEVudW0uR09MRCwgUmV3YXJkSWRFbnVtLkRJQU1PTkRdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wRGF0YUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwZWNpYWxSZXdhcmRJZHMuaW5kZXhPZihwcm9wRGF0YUFycmF5W2ldLmlkKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9uU3RhclJld2FyZHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcHJvcERhdGFBcnJheVtpXS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bTogcHJvcERhdGFBcnJheVtpXS5udW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS51cGRhdGVfcGxheWVyX2ZpZ2h0X2RhdGEoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWdodF9yZXN1bHRfZGF0YS5zdGFyX251bSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmVuc2l2ZV9kYXRhLnVpZCxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmVuc2l2ZV9kYXRhLm5pY2tuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmZW5zaXZlX2RhdGEuc3RhcixcclxuICAgICAgICAgICAgICAgICAgICAtdGhpcy5maWdodF9yZXN1bHRfZGF0YS5zdGFyX251bSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0X3Jlc3VsdF9kYXRhLnJlc3VsdCxcclxuICAgICAgICAgICAgICAgICAgICByZXdhcmRJdGVtcyxcclxuICAgICAgICAgICAgICAgICAgICBub25TdGFyUmV3YXJkcyxcclxuICAgICAgICAgICAgICAgICAgICBoZXJvQmF0dGxlRGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZlbnNlSGVyb0RhdGFcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLnVwZGF0ZV9wbGF5ZXJfc2NvcmVfZGF0YV9yZXF1ZXN0KGdtLmRhdGEubGFkZGVyX3RlbXBfZGF0YS50b3RhbF9zdGFyICsgdGhpcy5maWdodF9yZXN1bHRfZGF0YS5zdGFyX251bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ20uZGF0YS5sYWRkZXJfdGVtcF9kYXRhLmNoYW5nZV9zdGFyX251bSh0aGlzLmZpZ2h0X3Jlc3VsdF9kYXRhLnN0YXJfbnVtKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBnYXJyaXNvbkRhdGEgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRCdWlsZERhdGFCeVR5cGUoQnVpbGRUeXBlRW51bS5HQVJSSVNJT05fVFlQRSk7XHJcbiAgICAgICAgICAgIGlmIChnYXJyaXNvbkRhdGEgJiYgZ2Fycmlzb25EYXRhLmJ1aWxkTHZsID49IDEpIHtcclxuICAgICAgICAgICAgICAgIGdtLmRhdGEubGFkZGVyX3RlbXBfZGF0YS5jaGFuZ2Vfc3Rhcl9udW0oLWxhZGRlckNvbmZpZy5mYWlsZWRfc3Rhcik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nb2FsX3VpZCAhPT0gXCJcIiAmJiB0aGlzLnBsYXlfdHlwZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJld2FyZEl0ZW1zOiB7IGlkOiBudW1iZXIsIG51bTogbnVtYmVyIH1bXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vblN0YXJSZXdhcmRzOiB7IGlkOiBudW1iZXIsIG51bTogbnVtYmVyIH1bXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcERhdGFBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXdhcmRJdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBwcm9wRGF0YUFycmF5W2ldLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtOiBwcm9wRGF0YUFycmF5W2ldLm51bVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS51cGRhdGVfcGxheWVyX2ZpZ2h0X2RhdGEoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC1sYWRkZXJDb25maWcuZmFpbGVkX3N0YXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmZW5zaXZlX2RhdGEudWlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmVuc2l2ZV9kYXRhLm5pY2tuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmVuc2l2ZV9kYXRhLnN0YXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhZGRlckNvbmZpZy5zdWNjZXNzX3N0YXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRfcmVzdWx0X2RhdGEucmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXdhcmRJdGVtcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9uU3RhclJld2FyZHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9CYXR0bGVEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlbnNlSGVyb0RhdGFcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLnVwZGF0ZV9wbGF5ZXJfc2NvcmVfZGF0YV9yZXF1ZXN0KGdtLmRhdGEubGFkZGVyX3RlbXBfZGF0YS50b3RhbF9zdGFyIC0gbGFkZGVyQ29uZmlnLmZhaWxlZF9zdGFyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGlhbW9uZENvdW50ID4gMCkge1xyXG4gICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zZXRBZGRHYW1lRGlhbW9uZChTZXRJdGVtTnVtRW51bS5BRERfSVRFTV9UWVBFLCBkaWFtb25kQ291bnQpO1xyXG4gICAgICAgICAgICBpZiAoZ20udWkubWFwTWFpblVJICYmIGdtLnVpLm1hcE1haW5VSS5zaGlwKSB7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zaG93X2NvaW5fZmx5KFJld2FyZElkRW51bS5ESUFNT05ELCBnbS51aS5tYXBNYWluVUkuc2hpcC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc2V0QWRkR2FtZUNvaW4oXHJcbiAgICAgICAgICAgIFNldEl0ZW1OdW1FbnVtLkFERF9JVEVNX1RZUEUsXHJcbiAgICAgICAgICAgIHRoaXMuZmlnaHRfcmVzdWx0X2RhdGEuZ29sZF9udW0gKiB0aGlzLm1hcF9lbmRfbWFueV90aW1lc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgZ20udWkubWFwTWFpblVJLnNob3dCYXR0bGVFbmRDb2luKHRoaXMuZmlnaHRfcmVzdWx0X2RhdGEuZ29sZF9udW0gKiB0aGlzLm1hcF9lbmRfbWFueV90aW1lcyk7XHJcbiAgICB9IC8vIGVuZDogZ2V0X2FsbF9yZXN1bHRfZGF0YVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBidWlsZF9maWdodF9yZXN1bHRfZGF0YShpc0RlYnVnID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBmaWdodFJlc3VsdCA9IG5ldyBGaWdodFJlc3VsdERhdGE7XHJcblxyXG4gICAgICAgIGZpZ2h0UmVzdWx0LnJlc3VsdCA9IHRoaXMuZmlnaHRfc3RhdGUgPT0gRmlnaHRTdGF0ZS5TVUNDRVNTID8gMSA6IDI7XHJcbiAgICAgICAgZmlnaHRSZXN1bHQuYXR0YWNrZXJfbmFtZSA9IFwiPz8/XCI7XHJcbiAgICAgICAgZmlnaHRSZXN1bHQuZGVmZW5kZXJfbmFtZSA9IHRoaXMubmFtZTtcclxuICAgICAgICBmaWdodFJlc3VsdC5idWNrZXRfbnVtID0gMDtcclxuICAgICAgICBmaWdodFJlc3VsdC5wcm9wX2RhdGFfYXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKCFpc0RlYnVnKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgdGhpcy5yZXdhcmRfZGF0YV9hcnJheS5sZW5ndGg7IHIrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmV3YXJkRGF0YSA9IHRoaXMucmV3YXJkX2RhdGFfYXJyYXlbcl07XHJcbiAgICAgICAgICAgICAgICBpZiAocmV3YXJkRGF0YS5pZCA9PSBSZXdhcmRJZEVudW0uU1RBUikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZ2h0UmVzdWx0LnN0YXJfbnVtID0gcmV3YXJkRGF0YS5udW07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJld2FyZERhdGEuaWQgPT0gUmV3YXJkSWRFbnVtLkdPTEQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWdodFJlc3VsdC5nb2xkX251bSA9IHJld2FyZERhdGEubnVtO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgwIDwgcmV3YXJkRGF0YS5udW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWdodFJlc3VsdFByb3BJdGVtRGF0YSA9IG5ldyBGaWdodFJlc3VsdFByb3BJdGVtRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBmaWdodFJlc3VsdFByb3BJdGVtRGF0YS50eXBlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBmaWdodFJlc3VsdFByb3BJdGVtRGF0YS5pZCA9IHJld2FyZERhdGEuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlnaHRSZXN1bHRQcm9wSXRlbURhdGEubnVtID0gMCA8IHJld2FyZERhdGEubWF4X251bSA/IE1hdGgubWluKHJld2FyZERhdGEubnVtLCByZXdhcmREYXRhLm1heF9udW0pIDogcmV3YXJkRGF0YS5udW07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93RGF0YSA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJJdGVtQ29uZmlnRGF0YVwiLCBmaWdodFJlc3VsdFByb3BJdGVtRGF0YS5pZC50b1N0cmluZygpKSBhcyBJdGVtQ29uZmlnO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZ2h0UmVzdWx0UHJvcEl0ZW1EYXRhLmNvbG9yID0gcm93RGF0YSA/IHJvd0RhdGEuY29sb3IgOiAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZ2h0UmVzdWx0LnByb3BfZGF0YV9hcnJheS5wdXNoKGZpZ2h0UmVzdWx0UHJvcEl0ZW1EYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmlnaHRSZXN1bHQuZGVhdGhfaGVyb19kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgZmlnaHRSZXN1bHQuYWxpdmVfaGVyb19kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCB0aGlzLmhlcm9fZGF0YV9hcnJheS5sZW5ndGg7IHIrKykge1xyXG4gICAgICAgICAgICBjb25zdCBlID0gdGhpcy5oZXJvX2RhdGFfYXJyYXlbcl07XHJcbiAgICAgICAgICAgIGlmIChlLmhwIDw9IDAgJiYgIWlzRGVidWcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpZ2h0UmVzdWx0UHJvcEl0ZW1EYXRhID0gbmV3IEZpZ2h0UmVzdWx0UHJvcEl0ZW1EYXRhO1xyXG4gICAgICAgICAgICAgICAgZmlnaHRSZXN1bHRQcm9wSXRlbURhdGEudHlwZSA9IDI7XHJcbiAgICAgICAgICAgICAgICBmaWdodFJlc3VsdFByb3BJdGVtRGF0YS5jb2xvciA9IDE7XHJcbiAgICAgICAgICAgICAgICBmaWdodFJlc3VsdFByb3BJdGVtRGF0YS5pZCA9IGUuaWQ7XHJcbiAgICAgICAgICAgICAgICBmaWdodFJlc3VsdFByb3BJdGVtRGF0YS5udW0gPSAxO1xyXG4gICAgICAgICAgICAgICAgZmlnaHRSZXN1bHQuZGVhdGhfaGVyb19kYXRhX2FycmF5LnB1c2goZmlnaHRSZXN1bHRQcm9wSXRlbURhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZmlnaHRSZXN1bHQuYWxpdmVfaGVyb19kYXRhX2FycmF5LnB1c2goZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZpZ2h0UmVzdWx0LmFsaXZlX2RlZmVuc2VfaGVyb19kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCB0aGlzLmRlZmVuc2VfaGVyb19kYXRhX2FycmF5Lmxlbmd0aDsgcisrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGEgPSB0aGlzLmRlZmVuc2VfaGVyb19kYXRhX2FycmF5W3JdO1xyXG4gICAgICAgICAgICBpZiAoYSAmJiAwIDwgYS5ocCkge1xyXG4gICAgICAgICAgICAgICAgZmlnaHRSZXN1bHQuYWxpdmVfZGVmZW5zZV9oZXJvX2RhdGFfYXJyYXkucHVzaChhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZpZ2h0X3Jlc3VsdF9kYXRhID0gZmlnaHRSZXN1bHQ7XHJcbiAgICB9IC8vIGVuZDogYnVpbGRfZmlnaHRfcmVzdWx0X2RhdGFcclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0X2JhdHRsZV9oZXJvX2lzX3NwYWNlKCk6IGJvb2xlYW4gfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGNvbnN0IGJvYXQgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5idWlsZERhdGFbQnVpbGRUeXBlRW51bS5TRUFHT0lOR0JPQVRfVFlQRV07XHJcbiAgICAgICAgY29uc3QgYm9hdENvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0QnVpbGRDZmdCeUlEKGJvYXQuYnVpbGRJRCk7XHJcbiAgICAgICAgaWYgKGJvYXRDb25maWcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYmF0dGxlX2hlcm9fYXJyYXkubGVuZ3RoIDwgYm9hdENvbmZpZy5jYXBhY2l0eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXRfZGVmZW5zZV9oZXJvX2lzX3NwYWNlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IGRlZmVuc2VCdWlsZGluZyA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmJ1aWxkRGF0YVtCdWlsZFR5cGVFbnVtLkdBUlJJU0lPTl9UWVBFXTtcclxuICAgICAgICBpZiAoZGVmZW5zZUJ1aWxkaW5nICYmIGRlZmVuc2VCdWlsZGluZy5idWlsZEx2bCA+PSAxKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0QnVpbGRDZmdCeUlEKGRlZmVuc2VCdWlsZGluZy5idWlsZElEKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZyA/IE9iamVjdC5rZXlzKGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldERlZmFuc2VIZXJvRGF0YSgpKS5sZW5ndGggPCBjb25maWcuY2FwYWNpdHkgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXRGaWdodFN1cGVySGVyb051bSgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaGVybyBvZiB0aGlzLmJhdHRsZV9oZXJvX2FycmF5KSB7XHJcbiAgICAgICAgICAgIGlmIChnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEhlcm9DZmdCeUlEKGhlcm8uaXRlbUlEKS5oZXJvX3R5cGUgPT09IEhlcm9UeXBlRW51bS5TVVBFUl9IRVJPX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBidWlsZF9oZXJvX2FycmF5KGlzRGVidWcgPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5pc19kZWJ1Zykge1xyXG4gICAgICAgICAgICB0aGlzLmJhdHRsZV9oZXJvX2FycmF5ID0gW107XHJcbiAgICAgICAgICAgIGNvbnN0IGhlcm9JZHMgPSBbMzEwMDEsIDMxMDAyLCAzMTAwMywgMzIwMDEsIDMyMDAyLCAzMjAwMywgMzMwMDEsIDMzMDAyLCAzMzAwMywgMzQwMDEsIDM0MDAyLCAzNDAwM107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBoZXJvSWRzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVyb0l0ZW0gPSBuZXcgcm9sZUdvQmF0dGxlSXRlbVZPO1xyXG4gICAgICAgICAgICAgICAgaGVyb0l0ZW0uaXRlbUlEID0gaGVyb0lkc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhdHRsZV9oZXJvX2FycmF5W3RoaXMuYmF0dGxlX2hlcm9fYXJyYXkubGVuZ3RoXSA9IGhlcm9JdGVtO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuYmF0dGxlX2hlcm9fYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpO1xyXG4gICAgICAgICAgICBjb25zdCBiYXR0bGVIZXJybyA9IHRoaXMuYmF0dGxlX2hlcm9fYXJyYXlbaW5kZXhdO1xyXG4gICAgICAgICAgICBjb25zdCBmaWdodEhlcm9JdGVtRGF0YSA9IG5ldyBGaWdodEhlcm9JdGVtRGF0YTtcclxuICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEuaWQgPSBiYXR0bGVIZXJyby5pdGVtSUQ7XHJcbiAgICAgICAgICAgIGZpZ2h0SGVyb0l0ZW1EYXRhLmNlbGxJRCA9IGJhdHRsZUhlcnJvLmNlbGxJRDtcclxuICAgICAgICAgICAgY29uc3Qgcm93RGF0YSA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJIZXJvQ29uZmlnRGF0YVwiLCBmaWdodEhlcm9JdGVtRGF0YS5pZC50b1N0cmluZygpKSBhcyBIZXJvQ29uZmlnO1xyXG4gICAgICAgICAgICBpZiAocm93RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEubHYgPSByb3dEYXRhLmx2O1xyXG4gICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEuc2tpbGxfaWQgPSByb3dEYXRhLnNraWxsX2lkO1xyXG4gICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEucGFzc2l2ZV9za2lsbF9hcnJheSA9IHJvd0RhdGEucGFzc2l2ZV9za2lsbF9hcnJheTtcclxuICAgICAgICAgICAgICAgIGZpZ2h0SGVyb0l0ZW1EYXRhLmhlcm9fdHlwZSA9IHJvd0RhdGEuaGVyb190eXBlO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGhlcm9TdGFyID0gZ20uZGF0YS5oZXJvX3N0YXJfZGF0YS5nZXRIZXJvU3RhckRhdGEocm93RGF0YS5hcm1zKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5zdGFyX2x2ID0gaGVyb1N0YXIgPyBoZXJvU3Rhci5zdGFyIDogMDtcclxuICAgICAgICAgICAgICAgIGlmICgxID09IHJvd0RhdGEuaGVyb190eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEuc2tpbGxfbHYgPSByb3dEYXRhLmx2O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5pc19kZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5ocCA9IGZpZ2h0SGVyb0l0ZW1EYXRhLm1heF9ocCA9IE1hdGguZmxvb3Iocm93RGF0YS5ocCAqIChoZXJvU3RhciA/IGhlcm9TdGFyLmhwICsgMSA6IDEpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5tYXhfaHAgPSBNYXRoLmZsb29yKHJvd0RhdGEuaHAgKiAoaGVyb1N0YXIgPyBoZXJvU3Rhci5ocCArIDEgOiAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0SGVyb0l0ZW1EYXRhLmhwID0gaXNEZWJ1ZyA/IGZpZ2h0SGVyb0l0ZW1EYXRhLm1heF9ocCA6IGJhdHRsZUhlcnJvLmhwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmlzX2RlYnVnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0SGVyb0l0ZW1EYXRhLnNraWxsX2x2ID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5za2lsbF9sdiA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldFJvbGVTa2lsbERhdGEoZmlnaHRIZXJvSXRlbURhdGEuc2tpbGxfaWQpLmx2bDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEuaHAgPSBmaWdodEhlcm9JdGVtRGF0YS5tYXhfaHAgPSBNYXRoLmZsb29yKHJvd0RhdGEuaHAgKiAoaGVyb1N0YXIgPyBoZXJvU3Rhci5ocCArIDEgOiAxKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5hdHRhY2tfdHlwZSA9IHJvd0RhdGEuYXR0YWNrX3R5cGU7XHJcbiAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5hdHRhY2tfYW5pbV90aW1lID0gcm93RGF0YS5hdHRhY2tfYW5pbV90aW1lO1xyXG4gICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEuZmx5X3dlYXBvbl9uYW1lID0gcm93RGF0YS5mbHlfd2VhcG9uX25hbWU7XHJcbiAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5mbHlfd2VhcG9uX3RpbWUgPSByb3dEYXRhLmZseV93ZWFwb25fdGltZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoXCJcIiAhPSByb3dEYXRhLmZseV93ZWFwb25fcG9zaXRpb25fYXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5mbHlfd2VhcG9uX3Bvc2l0aW9uX2FycmF5ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2VhcG9uUG9zaXRpb24gPSByb3dEYXRhLmZseV93ZWFwb25fcG9zaXRpb25fYXJyYXkuc3BsaXQoXCJ8XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgyID09IHdlYXBvblBvc2l0aW9uLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IHdlYXBvblBvc2l0aW9uLmxlbmd0aDsgYysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHdlYXBvblBvc2l0aW9uW2NdLnNwbGl0KFwiLFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgyID09IHBvc2l0aW9uLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0SGVyb0l0ZW1EYXRhLmZseV93ZWFwb25fcG9zaXRpb25fYXJyYXlbY10gPSBjYy52MyhwYXJzZUludChwb3NpdGlvblswXS50cmltKCkpLCBwYXJzZUludChwb3NpdGlvblsxXS50cmltKCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2MuZXJyb3IoXCLphY3nva7nmoTmlbDmja7moLzlvI/mnInplJnor69cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoXCLEkOG7i25oIGThuqFuZyBk4buvIGxp4buHdSDEkcaw4bujYyBj4bqldSBow6xuaCBraMO0bmcgxJHDum5nLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNjLmVycm9yKFwi6YWN572u55qE5pWw5o2u5qC85byP5pyJ6ZSZ6K+vXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihcIsSQ4buLbmggZOG6oW5nIGThu68gbGnhu4d1IMSRxrDhu6NjIGPhuqV1IGjDrG5oIGtow7RuZyDEkcO6bmcuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZpZ2h0SGVyb0l0ZW1EYXRhLmZseV93ZWFwb25fbmFtZSA9IHJvd0RhdGEuZmx5X3dlYXBvbl9uYW1lO1xyXG4gICAgICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEuYXR0YWNrX3ZhbHVlID0gTWF0aC5mbG9vcihyb3dEYXRhLmF0dGFjayAqIChoZXJvU3RhciA/IGhlcm9TdGFyLmF0dGFjayArIDEgOiAxKSk7XHJcbiAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5hdHRhY2tfaW50ZXJ2YWwgPSByb3dEYXRhLmF0dGFja19pbnRlcnZhbDtcclxuICAgICAgICAgICAgICAgIGZpZ2h0SGVyb0l0ZW1EYXRhLmF0dGFja19yYW5nZSA9IHJvd0RhdGEucmFuZ2U7XHJcbiAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5zZWFyY2hfcmFuZ2UgPSByb3dEYXRhLnNlYXJjaF9yYW5nZTtcclxuICAgICAgICAgICAgICAgIGZpZ2h0SGVyb0l0ZW1EYXRhLm1vdmVfc3BlZWQgPSByb3dEYXRhLnNwZWVkICsgKGhlcm9TdGFyID8gaGVyb1N0YXIuc3BlZWQgOiAwKTtcclxuICAgICAgICAgICAgICAgIGZpZ2h0SGVyb0l0ZW1EYXRhLmRlZmVuc2VfdmFsdWUgPSByb3dEYXRhLmRlZmVuc2UgKyAoaGVyb1N0YXIgPyBoZXJvU3Rhci5kZWZlbnNlIDogMCk7XHJcbiAgICAgICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5vY2N1cGF0aW9uID0gcm93RGF0YS5vY2N1cGF0aW9uO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS50eXBlID0gSGVyb1R5cGUuQVRUQUNLO1xyXG4gICAgICAgICAgICBmaWdodEhlcm9JdGVtRGF0YS5sYXN0X2F0dGFja190aW1lID0gMDtcclxuICAgICAgICAgICAgZmlnaHRIZXJvSXRlbURhdGEuYXJyYXlfaW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGFfYXJyYXkucHVzaChmaWdodEhlcm9JdGVtRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSAvLyBlbmQ6IGJ1aWxkX2hlcm9fYXJyYXlcclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgYnVpbGRfcmV3YXJkX2FycmF5KCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmlzX2RlYnVnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgYnVpbGRfZmlnaHRfbWF0Y2hfZGF0YV9hcnJheSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZpZ2h0X21hdGNoX2RhdGFfYXJyYXkgPSBbXTtcclxuICAgICAgICBjb25zdCBjb25maWdEYXRhID0gZ20uY29uZmlnLmdldF9jb25maWdfZGF0YShcIkZpZ2h0TWF0Y2hDb25maWdEYXRhXCIpO1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGNvbmZpZ0RhdGEuZGF0YSkge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gY29uZmlnRGF0YS5kYXRhW2tleV0gYXMgTWF0Y2hDb25maWc7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoRGF0YSA9IG5ldyBGaWdodE1hdGNoRGF0YSgpO1xyXG4gICAgICAgICAgICBtYXRjaERhdGEuaWQgPSBkYXRhLmlkO1xyXG4gICAgICAgICAgICBjb25zdCByYW5kb21NYXBBcnJheSA9IGRhdGEucmFuZG9tX21hcF9hcnJheS5zcGxpdChcInxcIik7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgcmFuZG9tTWFwQXJyYXkubGVuZ3RoOyBuKyspIHtcclxuICAgICAgICAgICAgICAgIG1hdGNoRGF0YS5yYW5kb21fbWFwX2FycmF5W25dID0gcGFyc2VJbnQocmFuZG9tTWFwQXJyYXlbbl0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGZhaWxUd29SYW5kb21NYXBBcnJheSA9IGRhdGEuZmFpbF90d29fcmFuZG9tX21hcF9hcnJheS5zcGxpdChcInxcIik7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgZmFpbFR3b1JhbmRvbU1hcEFycmF5Lmxlbmd0aDsgbisrKSB7XHJcbiAgICAgICAgICAgICAgICBtYXRjaERhdGEuZmFpbF90d29fcmFuZG9tX21hcF9hcnJheVtuXSA9IHBhcnNlSW50KGZhaWxUd29SYW5kb21NYXBBcnJheVtuXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWF0Y2hEYXRhLmJhdHRsZV9tYXBfaWQgPSBkYXRhLmJhdHRsZV9tYXBfaWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGJhdHRsZURhdGFBcnJheSA9IGRhdGEuYmF0dGxlX2RhdGFfYXJyYXkuc3BsaXQoXCJ8XCIpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IGJhdHRsZURhdGFBcnJheS5sZW5ndGg7IG4rKykge1xyXG4gICAgICAgICAgICAgICAgbWF0Y2hEYXRhLmJhdHRsZV9kYXRhX2FycmF5W25dID0gcGFyc2VJbnQoYmF0dGxlRGF0YUFycmF5W25dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtYXRjaERhdGEucHN5Y2hlZGVsaWNfbWFwX2lkID0gZGF0YS5wc3ljaGVkZWxpY19tYXBfaWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHBzeWNoZWRlbGljRGF0YUFycmF5ID0gZGF0YS5wc3ljaGVkZWxpY19kYXRhX2FycmF5LnNwbGl0KFwifFwiKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBwc3ljaGVkZWxpY0RhdGFBcnJheS5sZW5ndGg7IG4rKykge1xyXG4gICAgICAgICAgICAgICAgbWF0Y2hEYXRhLnBzeWNoZWRlbGljX2RhdGFfYXJyYXlbbl0gPSBwYXJzZUludChwc3ljaGVkZWxpY0RhdGFBcnJheVtuXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWF0Y2hEYXRhLnJhbmRvbV9uYW1lX2lkID0gZGF0YS5yYW5kb21fbmFtZV9pZDtcclxuICAgICAgICAgICAgdGhpcy5maWdodF9tYXRjaF9kYXRhX2FycmF5W21hdGNoRGF0YS5pZCAtIDFdID0gbWF0Y2hEYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH0gLy8gZW5kOiBidWlsZF9maWdodF9tYXRjaF9kYXRhX2FycmF5XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIG1hdGNoX2ZpZ2h0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ29hbF91aWQgPSBcIlwiO1xyXG4gICAgICAgIGlmICh0aGlzLmdvYWxfdWlkICE9IGdtLmRhdGEubWFpbF90ZW1wX2RhdGEudGFyZ2V0X3VpZCkge1xyXG4gICAgICAgICAgICBnbS5kYXRhLm1hdGNoX3BsYXllcihnbS5kYXRhLm1haWxfdGVtcF9kYXRhLnRhcmdldF91aWQpO1xyXG4gICAgICAgICAgICAoZ20uZGF0YS5tYWlsX3RlbXBfZGF0YS50YXJnZXRfdWlkID0gXCJcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdCA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldEJ1aWxkRGF0YUJ5VHlwZShCdWlsZFR5cGVFbnVtLkdBUlJJU0lPTl9UWVBFKTtcclxuXHJcbiAgICAgICAgaWYgKHQgJiYgMSA8PSB0LmJ1aWxkTHZsICYmIGdtLmRhdGEubGFkZGVyX2RhdGEuZmlnaHRfY291bnQgPiBDaGFubmVsTWFuYWdlci5MRVZFTF9DT05GSUcubGV2ZWxfYXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGdtLmRhdGEubWF0Y2hfcGxheWVyKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5tYXRjaF9tYXBfYnlfbGFkZGVyX2x2KCk7XHJcbiAgICAgICAgICAgIGdtLnVpLnNob3dfZmlnaHQoKTtcclxuICAgICAgICAgICAgZ20uY2hhbm5lbC5yZXBvcnRfZXZlbnQoXCJmaWdodFwiLCB7XHJcbiAgICAgICAgICAgICAgICBldmVudF9kZXNjOiBcIueqgeiirVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLlvIDlp4tcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDgyMSk7XHJcbiAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwODIyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIG1hdGNoX21hcF9ieV9sYWRkZXJfbHYoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgbGFkZGVyRGF0YSA9IGdtLmRhdGEubGFkZGVyX2RhdGE7XHJcbiAgICAgICAgaWYgKDAgPT0gdGhpcy5maWdodF9tYXRjaF9kYXRhX2FycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkX2ZpZ2h0X21hdGNoX2RhdGFfYXJyYXkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlICYmICF0aGlzLmlzX2RlYnVnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheV90eXBlID0gMDtcclxuICAgICAgICAgICAgdGhpcy5tYXBfaWQgPSAyO1xyXG4gICAgICAgICAgICB0aGlzLm1hcF9kYXRhX2lkID0gMTtcclxuICAgICAgICAgICAgdGhpcy5ib2F0X2lkID0gNjAwMDE7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoRGF0YSA9IHRoaXMuZmlnaHRfbWF0Y2hfZGF0YV9hcnJheVswXTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMuZ2V0X3JhbmRvbV9uYW1lKG1hdGNoRGF0YS5yYW5kb21fbmFtZV9pZCk7XHJcbiAgICAgICAgICAgIGxhZGRlckRhdGEuZmlnaHRfY291bnQrKztcclxuICAgICAgICAgICAgbGFkZGVyRGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxhZGRlckRhdGEuYWNoaWV2ZW1lbnRfaWQgPCAxKSB7XHJcbiAgICAgICAgICAgIGxhZGRlckRhdGEuYWNoaWV2ZW1lbnRfaWQgPSAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGFkZGVyRGF0YS5hY2hpZXZlbWVudF9pZCA+IHRoaXMuZmlnaHRfbWF0Y2hfZGF0YV9hcnJheS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGFkZGVyRGF0YS5hY2hpZXZlbWVudF9pZCA9IHRoaXMuZmlnaHRfbWF0Y2hfZGF0YV9hcnJheS5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobGFkZGVyRGF0YS5maWdodF9jb3VudCA8IENoYW5uZWxNYW5hZ2VyLkxFVkVMX0NPTkZJRy5sZXZlbF9hcnJheS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5X3R5cGUgPSAwO1xyXG4gICAgICAgICAgICBjb25zdCBsZXZlbENvbmZpZyA9IENoYW5uZWxNYW5hZ2VyLkxFVkVMX0NPTkZJRy5sZXZlbF9hcnJheVtsYWRkZXJEYXRhLmZpZ2h0X2NvdW50XS5zcGxpdChcIi1cIik7XHJcbiAgICAgICAgICAgIHRoaXMubWFwX2lkID0gMiA9PSBsZXZlbENvbmZpZy5sZW5ndGggPyBwYXJzZUludChsZXZlbENvbmZpZ1swXS50cmltKCkpIDogMjtcclxuICAgICAgICAgICAgdGhpcy5tYXBfZGF0YV9pZCA9IDIgPT0gbGV2ZWxDb25maWcubGVuZ3RoID8gcGFyc2VJbnQobGV2ZWxDb25maWdbMV0udHJpbSgpKSA6IGxhZGRlckRhdGEuZmlnaHRfY291bnQgKyAxO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbWF0Y2hEYXRhID0gdGhpcy5maWdodF9tYXRjaF9kYXRhX2FycmF5WzBdO1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmdldF9yYW5kb21fbmFtZShtYXRjaERhdGEucmFuZG9tX25hbWVfaWQpO1xyXG4gICAgICAgICAgICBjb25zdCBtYXBjZWxsRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldEJ1aWxkRGF0YUJ5VHlwZShCdWlsZFR5cGVFbnVtLlNFQUdPSU5HQk9BVF9UWVBFKTtcclxuICAgICAgICAgICAgdGhpcy5ib2F0X2lkID0gbWFwY2VsbERhdGEgPyBtYXBjZWxsRGF0YS5idWlsZElEIDogNjAwMDE7XHJcbiAgICAgICAgICAgIGxhZGRlckRhdGEuZmlnaHRfY291bnQrKztcclxuICAgICAgICAgICAgbGFkZGVyRGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbWF0Y2hEYXRhID0gdGhpcy5maWdodF9tYXRjaF9kYXRhX2FycmF5W2xhZGRlckRhdGEuYWNoaWV2ZW1lbnRfaWQgLSAxXVxyXG4gICAgICAgIGlmIChtYXRjaERhdGEpIHtcclxuICAgICAgICAgICAgY29uc3QgcmFuZG9tSW5kZXggPSBsYWRkZXJEYXRhLmZhaWxfY291bnQgPCAyID8gdGhpcy5nZXRfcmFuZG9tX2luZGV4KG1hdGNoRGF0YS5yYW5kb21fbWFwX2FycmF5KSA6IHRoaXMuZ2V0X3JhbmRvbV9pbmRleChtYXRjaERhdGEuZmFpbF90d29fcmFuZG9tX21hcF9hcnJheSk7XHJcbiAgICAgICAgICAgIGlmICgwID09IHJhbmRvbUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlfdHlwZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcF9pZCA9IG1hdGNoRGF0YS5iYXR0bGVfbWFwX2lkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBfZGF0YV9pZCA9IG1hdGNoRGF0YS5iYXR0bGVfZGF0YV9hcnJheVtVdGlscy5tYXRoX3JhbmRvbSh0cnVlLCAwLCBtYXRjaERhdGEuYmF0dGxlX2RhdGFfYXJyYXkubGVuZ3RoKV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmdldF9yYW5kb21fbmFtZShtYXRjaERhdGEucmFuZG9tX25hbWVfaWQpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWFwY2VsbERhdGEgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRCdWlsZERhdGFCeVR5cGUoQnVpbGRUeXBlRW51bS5TRUFHT0lOR0JPQVRfVFlQRSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXRfaWQgPSBtYXBjZWxsRGF0YSA/IG1hcGNlbGxEYXRhLmJ1aWxkSUQgOiA2MDAwMTtcclxuICAgICAgICAgICAgICAgIGxhZGRlckRhdGEuZmlnaHRfY291bnQrKztcclxuICAgICAgICAgICAgICAgIGxhZGRlckRhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgxID09IHJhbmRvbUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlfdHlwZSA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcF9pZCA9IG1hdGNoRGF0YS5wc3ljaGVkZWxpY19tYXBfaWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcF9kYXRhX2lkID0gbWF0Y2hEYXRhLnBzeWNoZWRlbGljX2RhdGFfYXJyYXlbVXRpbHMubWF0aF9yYW5kb20odHJ1ZSwgMCwgbWF0Y2hEYXRhLnBzeWNoZWRlbGljX2RhdGFfYXJyYXkubGVuZ3RoKV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWUgPSBcIui/t+W5u+Wym1wiO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWFwY2VsbERhdGEgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRCdWlsZERhdGFCeVR5cGUoQnVpbGRUeXBlRW51bS5TRUFHT0lOR0JPQVRfVFlQRSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXRfaWQgPSBtYXBjZWxsRGF0YSA/IG1hcGNlbGxEYXRhLmJ1aWxkSUQgOiA2MDAwMTtcclxuICAgICAgICAgICAgICAgIGxhZGRlckRhdGEuZmlnaHRfY291bnQrKztcclxuICAgICAgICAgICAgICAgIGxhZGRlckRhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSAvLyBlbmQ6IG1hdGNoX21hcF9ieV9sYWRkZXJfbHZcclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgbWF0Y2hfY2F2ZXNfbWFwKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IGZpZ2h0RGF0YSA9IGdtLmRhdGEuZmlnaHRfZGF0YTtcclxuICAgICAgICBjb25zdCBjYXZlc0xldmVsQ29uZmlnID0gZ20uY29uZmlnLmdldF9jb25maWdfZGF0YShcIkNhdmVzTGV2ZWxDb25maWdEYXRhXCIpO1xyXG4gICAgICAgIGNvbnN0IHRvdGFsTGF5ZXJzID0gT2JqZWN0LmtleXMoY2F2ZXNMZXZlbENvbmZpZy5kYXRhKS5sZW5ndGg7XHJcbiAgICAgICAgaWYgKGZpZ2h0RGF0YS5jYXZlc19sYXllciA8PSB0b3RhbExheWVycykge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlfdHlwZSA9IDI7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvd0RhdGEgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiQ2F2ZXNMZXZlbENvbmZpZ0RhdGFcIiwgZmlnaHREYXRhLmNhdmVzX2xheWVyLnRvU3RyaW5nKCkpIGFzIENhdmVzTGV2ZWw7XHJcbiAgICAgICAgICAgIGlmIChyb3dEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcF9pZCA9IHJvd0RhdGEubWFwX2lkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBfZGF0YV9pZCA9IHJvd0RhdGEuZGF0YV9pZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDmtJ7nqp/nrKwlZOWxgiAtPiBDYXZlIGxldmVsICVkXHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IGNjLmpzLmZvcm1hdFN0cihcIkNhdmUgbGV2ZWwgJWRcIiwgZmlnaHREYXRhLmNhdmVzX2xheWVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgbWF0Y2hfaGFwcHlfbWFwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGxheV90eXBlID0gMTtcclxuICAgICAgICB0aGlzLm1hcF9pZCA9IFV0aWxzLm1hdGhfcmFuZG9tKHRydWUsIDIwLCAyNCk7XHJcbiAgICAgICAgdGhpcy5tYXBfZGF0YV9pZCA9IFV0aWxzLm1hdGhfcmFuZG9tKHRydWUsIDEsIDkpO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFwixJDhuqNvIOG6om8gR2nDoWNcIjsgLy8g5qKm5bm75bKbIC0+IE5ldmVybGFuZFxyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgZ2V0X3JhbmRvbV9pbmRleChhcnJheTogbnVtYmVyW10pOiBudW1iZXIge1xyXG4gICAgICAgIGxldCB0b3RhbCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0b3RhbCArPSBhcnJheVtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmFuZG9tVmFsdWUgPSBNYXRoLnJhbmRvbSgpICogdG90YWw7XHJcbiAgICAgICAgbGV0IGN1bXVsYXRpdmUgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY3VtdWxhdGl2ZSArPSBhcnJheVtpXTtcclxuICAgICAgICAgICAgaWYgKGN1bXVsYXRpdmUgPiByYW5kb21WYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgZ2V0X3JhbmRvbV9uYW1lKHQ6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgLy8g5peg5ZCN5bKbIC0+IFVua25vd24gSXNsYW5kXHJcbiAgICAgICAgY29uc3QgbmFtZVBvb2wgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhX2FycmF5KFwiTmFtZVBvb2xDb25maWdEYXRhXCIsIHQudG9TdHJpbmcoKSkgYXMgTmFtZVBvb2xbXTtcclxuICAgICAgICByZXR1cm4gbmFtZVBvb2wgJiYgbmFtZVBvb2wubGVuZ3RoID4gMCA/IG5hbWVQb29sW1V0aWxzLm1hdGhfcmFuZG9tKHRydWUsIDAsIG5hbWVQb29sLmxlbmd0aCldLm5hbWUgOiBcIlVua25vd24gSXNsYW5kXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldF9yZXdhcmRfZGF0YSh0OiBudW1iZXIpOiBGaWdodFJld2FyZEl0ZW1EYXRhIHtcclxuICAgICAgICBmb3IgKGxldCByZXdhcmQgb2YgdGhpcy5yZXdhcmRfZGF0YV9hcnJheSkge1xyXG4gICAgICAgICAgICBpZiAocmV3YXJkICYmIHJld2FyZC5pZCA9PT0gdCkgcmV0dXJuIHJld2FyZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbmV3UmV3YXJkID0gbmV3IEZpZ2h0UmV3YXJkSXRlbURhdGEoKTtcclxuICAgICAgICBuZXdSZXdhcmQuaWQgPSB0O1xyXG4gICAgICAgIG5ld1Jld2FyZC5udW0gPSAwO1xyXG4gICAgICAgIGxldCBpbnNlcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yZXdhcmRfZGF0YV9hcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCByZXdhcmQgPSB0aGlzLnJld2FyZF9kYXRhX2FycmF5W2ldO1xyXG4gICAgICAgICAgICBpZiAoIWluc2VydGVkICYmIG5ld1Jld2FyZC5pZCA8IHJld2FyZC5pZCkge1xyXG4gICAgICAgICAgICAgICAgbmV3UmV3YXJkLmluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkX2RhdGFfYXJyYXkuc3BsaWNlKGksIDAsIG5ld1Jld2FyZCk7XHJcbiAgICAgICAgICAgICAgICBpbnNlcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXdhcmQuaW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaW5zZXJ0ZWQpIHtcclxuICAgICAgICAgICAgbmV3UmV3YXJkLmluZGV4ID0gdGhpcy5yZXdhcmRfZGF0YV9hcnJheS5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMucmV3YXJkX2RhdGFfYXJyYXkucHVzaChuZXdSZXdhcmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3UmV3YXJkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBncmlkX3Bvc2l0aW9uX3RvX3Bvc2l0aW9uKFZlYzI6IGNjLlZlYzIpOiBjYy5WZWMzIHtcclxuICAgICAgICBjb25zdCBpdGVtRGF0YSA9IHRoaXMuZ2V0X2ZpZ2h0X21hcF9pdGVtX2RhdGEoVmVjMi54LCBWZWMyLnkpO1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5vZmZzZXRfY29sLm11bChWZWMyLngpLmFkZCh0aGlzLm9mZnNldF9yb3cubXVsKFZlYzIueSkpO1xyXG4gICAgICAgIHJldHVybiBpdGVtRGF0YSA/IGNjLnYzKHBvc2l0aW9uLngsIHBvc2l0aW9uLnkgKyBpdGVtRGF0YS5sYW5kX3lfb2Zmc2V0KSA6IGNjLnYzKHBvc2l0aW9uLngsIHBvc2l0aW9uLnkpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdyaWRfcG9zaXRpb25fdG9fZmxvb3JfcG9zaXRpb24odDogY2MuVmVjMik6IGNjLlZlYzMge1xyXG4gICAgICAgIHJldHVybiBjYy52Myh0aGlzLm9mZnNldF9jb2wubXVsKHQueCkuYWRkKHRoaXMub2Zmc2V0X3Jvdy5tdWwodC55KSkpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldF9maWdodF9tYXBfaXRlbSh4OiBudW1iZXIsIHk6IG51bWJlcik6IEZpZ2h0TWFwSXRlbSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwX2l0ZW1fYXJyYXlbeSAqIHRoaXMubWFwX3NpemUueCArIHhdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXRfZmlnaHRfbWFwX2l0ZW1fZGF0YSh4OiBudW1iZXIsIHk6IG51bWJlcik6IEZpZ2h0TWFwSXRlbURhdGEge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcF9pdGVtX2RhdGFfYXJyYXlbeSAqIHRoaXMubWFwX3NpemUueCArIHhdXHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGhhc193YWxsX2l0ZW1fZGF0YSh0OiBjYy5WZWMyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMud2FsbF9kYXRhX2FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBjb25zdCB3YWxsRGF0YSA9IHRoaXMud2FsbF9kYXRhX2FycmF5W2luZGV4XVxyXG4gICAgICAgICAgICBpZiAod2FsbERhdGEgJiYgd2FsbERhdGEuZ3JpZF9wb3NpdGlvbi5lcXVhbHModCkpIHJldHVybiB0cnVlOztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGggKGNoxrBhIHjDoWMgxJHhu4tuaCDEkcaw4bujYyBJKVxyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVfZWRnZV9mbGFnKHQ6IGNjLlZlYzIpOiBudW1iZXIge1xyXG4gICAgICAgIHZhciBlLCBhLCBpID0gMDtcclxuICAgICAgICBmb3IgKGEgaW4gdGhpcy5lZGdlX21hcCkge1xyXG4gICAgICAgICAgICAhKChlID0gdC5hZGQodGhpcy5lZGdlX21hcFthXSkpLnggPCAwIHx8IGUueCA+PSB0aGlzLm1hcF9zaXplLnggfHwgZS55IDwgMCB8fCBlLnkgPj0gdGhpcy5tYXBfc2l6ZS55KSAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBfaXRlbV9kYXRhX2FycmF5W2UueCArIGUueSAqIHRoaXMubWFwX3NpemUueF0gfHwgKGkgfD0gRWRnZUVudW1bYSBhcyBrZXlvZiB0eXBlb2YgRWRnZUVudW1dKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIHBpY2tfdXBfcHJvcChpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCEoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMucHJvcF9kYXRhX2FycmF5Lmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvcERhdGEgPSB0aGlzLnByb3BfZGF0YV9hcnJheVtpbmRleF07XHJcbiAgICAgICAgICAgIGlmIChwcm9wRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29tbW9uUHJvcCA9IHRoaXMuc3BlY2lhbF9wcm9wX3RvX2NvbW1vbl9wcm9wKHByb3BEYXRhKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmdldF9yZXdhcmRfZGF0YShjb21tb25Qcm9wLmlkKVxyXG4gICAgICAgICAgICAgICAgZGF0YS5udW0gKz0gY29tbW9uUHJvcC5udW07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BfZGF0YV9hcnJheVtpbmRleF0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLmVtaXQoXCJwaWNrX3VwX3Byb3BcIiwgZGF0YS5pbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXRfYnVpbGRpbmdfZGVzdHJveV9yZXdhcmQodDogbnVtYmVyLCBlOiBGaWdodEJ1aWxkaW5nSXRlbURhdGEpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzdGFyUmV3YXJkID0gdGhpcy5nZXRfcmV3YXJkX2RhdGEoUmV3YXJkSWRFbnVtLlNUQVIpO1xyXG4gICAgICAgIHN0YXJSZXdhcmQubnVtICs9IGUuc3Rhcl9jb3VudDtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIuZW1pdChcInBpY2tfdXBfcHJvcFwiLCBzdGFyUmV3YXJkLmluZGV4KTtcclxuICAgICAgICAvLyBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIuZW1pdChcInBpY2tfdXBfcHJvcFwiLCBzdGFyUmV3YXJkLmluZGV4KTsgZ+G7kWM6IGzhurdwIGzhuqFpIDIgbOG6p25cclxuICAgICAgICBjb25zdCBidWlsZGluZ0l0ZW0gPSB0aGlzLmJ1aWxkaW5nX2l0ZW1fYXJyYXlbdF07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlLnJld2FyZF9hcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCByZXdhcmQgPSBlLnJld2FyZF9hcnJheVtpXTtcclxuICAgICAgICAgICAgY29uc3QgY29tbW9uUHJvcCA9IHRoaXMuc3BlY2lhbF9wcm9wX3RvX2NvbW1vbl9wcm9wKHJld2FyZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJld2FyZERhdGEgPSB0aGlzLmdldF9yZXdhcmRfZGF0YShjb21tb25Qcm9wLmlkKTtcclxuICAgICAgICAgICAgcmV3YXJkRGF0YS5udW0gKz0gY29tbW9uUHJvcC5udW07XHJcbiAgICAgICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5lbWl0KFwicGlja191cF9wcm9wXCIsIHJld2FyZERhdGEuaW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAoYnVpbGRpbmdJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5maWdodC5mbHlfdG9fYm9hdChidWlsZGluZ0l0ZW0ucmV3YXJkX3Nwcl9hcnJheVtpXS5ub2RlLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0X21haW5fY2l0eSgpOiBGaWdodEJ1aWxkaW5nSXRlbURhdGEge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmJ1aWxkaW5nX2RhdGFfYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ1aWxkaW5nRGF0YSA9IHRoaXMuYnVpbGRpbmdfZGF0YV9hcnJheVtpbmRleF1cclxuICAgICAgICAgICAgaWYgKGJ1aWxkaW5nRGF0YSAmJiA1MWUzIDw9IGJ1aWxkaW5nRGF0YS5pZCAmJiBidWlsZGluZ0RhdGEuaWQgPCA1MmUzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYnVpbGRpbmdEYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBpc19tYWluX2NpdHkodDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIDUxZTMgPD0gdCAmJiB0IDwgNTJlMyB8fCA2MTAwMSA8PSB0ICYmIHQgPCA2MmUzIHx8IDYzMDAxIDw9IHQgJiYgdCA8IDY0ZTM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGlzX2xpZ2h0aG91c2UodDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIDU5ZTMgPD0gdCAmJiB0IDwgNmU0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgc3BlY2lhbF9wcm9wX3RvX2NvbW1vbl9wcm9wKGZpZ2h0UHJvcEl0ZW06IEJhc2VQcm9wSXRlbURhdGEpOiBCYXNlUHJvcEl0ZW1EYXRhIHsgLy8gRmlnaHRQcm9wSXRlbURhdGFcclxuICAgICAgICBjb25zdCBjb21tb25Qcm9wID0gbmV3IEJhc2VQcm9wSXRlbURhdGE7XHJcbiAgICAgICAgaWYgKDE2MDAxIDw9IGZpZ2h0UHJvcEl0ZW0uaWQgJiYgZmlnaHRQcm9wSXRlbS5pZCA8PSAxNjA5OSkge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtRGF0YSA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJJdGVtQ29uZmlnRGF0YVwiLCBmaWdodFByb3BJdGVtLmlkICsgXCJcIikgYXMgSXRlbUNvbmZpZztcclxuICAgICAgICAgICAgY29tbW9uUHJvcC5pZCA9IFJld2FyZElkRW51bS5XT09EO1xyXG4gICAgICAgICAgICBjb21tb25Qcm9wLm51bSA9IGl0ZW1EYXRhLm51bWJlciAqIGZpZ2h0UHJvcEl0ZW0ubnVtO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoMTcwMDEgPD0gZmlnaHRQcm9wSXRlbS5pZCAmJiBmaWdodFByb3BJdGVtLmlkIDw9IDE3MDk5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1EYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkl0ZW1Db25maWdEYXRhXCIsIGZpZ2h0UHJvcEl0ZW0uaWQgKyBcIlwiKSBhcyBJdGVtQ29uZmlnO1xyXG4gICAgICAgICAgICBjb21tb25Qcm9wLmlkID0gUmV3YXJkSWRFbnVtLklST047XHJcbiAgICAgICAgICAgIGNvbW1vblByb3AubnVtID0gaXRlbURhdGEubnVtYmVyICogZmlnaHRQcm9wSXRlbS5udW07XHJcbiAgICAgICAgfSBlbHNlIGlmICgyNDAwMSA8PSBmaWdodFByb3BJdGVtLmlkICYmIGZpZ2h0UHJvcEl0ZW0uaWQgPD0gMjQwOTkpIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbURhdGEgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiSXRlbUNvbmZpZ0RhdGFcIiwgZmlnaHRQcm9wSXRlbS5pZCArIFwiXCIpIGFzIEl0ZW1Db25maWc7XHJcbiAgICAgICAgICAgIGNvbW1vblByb3AuaWQgPSBSZXdhcmRJZEVudW0uRElBTU9ORDtcclxuICAgICAgICAgICAgY29tbW9uUHJvcC5udW0gPSBpdGVtRGF0YS5udW1iZXIgKiBmaWdodFByb3BJdGVtLm51bTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBjb252ZXJ0ZWRQcm9wID0gZ20uZGF0YS5oaWdoX3RvX2xvd19sZXZlbF9wcm9wKGZpZ2h0UHJvcEl0ZW0uaWQsIGZpZ2h0UHJvcEl0ZW0ubnVtKTtcclxuICAgICAgICAgICAgY29tbW9uUHJvcC5pZCA9IGNvbnZlcnRlZFByb3AuaXRlbV9pZDtcclxuICAgICAgICAgICAgY29tbW9uUHJvcC5udW0gPSBjb252ZXJ0ZWRQcm9wLml0ZW1fbnVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29tbW9uUHJvcDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0X2R5bmFtaWNfbm9kZV9sYXllcihpbmRleDogbnVtYmVyLCBsYXllcjogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gaW5kZXggKiBGaWdodER5bmFtaWNOb2RlTGF5ZXIuTUFYICsgbGF5ZXJcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgRmlnaHRIZXJvSXRlbURhdGEge1xyXG4gICAgcHVibGljIGdyaWRfaW5kZXg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBncmlkX3Bvc2l0aW9uOiBjYy5WZWMyO1xyXG4gICAgcHVibGljIGFycmF5X2luZGV4OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaWQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBjZWxsSUQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBsdjogbnVtYmVyO1xyXG4gICAgcHVibGljIHNraWxsX2lkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc2tpbGxfbHY6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzdGFyX2x2OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaW5fYmF0dGxlX3N0YXRlOiBIZXJvSW5CYXR0bGVTdGF0ZTtcclxuICAgIHB1YmxpYyBkZWZlbnNlX3ZhbHVlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaHA6IG51bWJlcjtcclxuICAgIHB1YmxpYyBtYXhfaHA6IG51bWJlcjtcclxuICAgIHB1YmxpYyBhdHRhY2tfdHlwZTogQXR0YWNrVHlwZTtcclxuICAgIHB1YmxpYyBhdHRhY2tfYW5pbV90aW1lOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZmx5X3dlYXBvbl9uYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZmx5X3dlYXBvbl90aW1lOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZmx5X3dlYXBvbl9wb3NpdGlvbl9hcnJheTogY2MuVmVjM1tdO1xyXG4gICAgcHVibGljIGF0dGFja192YWx1ZTogbnVtYmVyO1xyXG4gICAgcHVibGljIGxhc3RfYXR0YWNrX3RpbWU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBhdHRhY2tfY291bnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBhdHRhY2tfaW50ZXJ2YWw6IG51bWJlcjtcclxuICAgIHB1YmxpYyBhdHRhY2tfcmFuZ2U6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzZWFyY2hfcmFuZ2U6IG51bWJlcjtcclxuICAgIHB1YmxpYyBtb3ZlX3NwZWVkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgbW92ZV9zdGFydDogTm9kZSB8IG51bGw7IC8vIGNoxrBhIHjDoWMgxJHhu4tuaFxyXG4gICAgcHVibGljIG1vdmVfZW5kOiBOb2RlIHwgbnVsbDsgLy8gY2jGsGEgeMOhYyDEkeG7i25oXHJcbiAgICBwdWJsaWMgbW92ZV9wYXRoOiBOb2RlW107IC8vIGNoxrBhIHjDoWMgxJHhu4tuaFxyXG4gICAgcHVibGljIG9mZnNldDogY2MuVmVjMztcclxuICAgIHB1YmxpYyB0eXBlOiBIZXJvVHlwZTtcclxuICAgIHB1YmxpYyBzdGF0ZTogSGVyb1N0YXRlO1xyXG4gICAgcHVibGljIGZpZ2h0X3N0YXRlOiBIZXJvRmlnaHRTdGF0ZTtcclxuICAgIHB1YmxpYyByYWRpYW46IG51bWJlcjtcclxuICAgIHB1YmxpYyBvY2N1cGF0aW9uOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgYnVmZl9kYXRhX2FycmF5OiBCdWZmSXRlbURhdGFbXTsgLy8gPz8/Pz8gY2jGsGEgeMOhYyDEkeG7i25oXHJcbiAgICBwdWJsaWMgbW92ZV9zcGVlZF9zY2FsZTogbnVtYmVyO1xyXG4gICAgcHVibGljIHJlZHVjZV9kYW1hZ2VfcmF0aW86IG51bWJlcjtcclxuICAgIHB1YmxpYyBhdHRhY2tfc3BlZWRfcmF0aW86IG51bWJlcjtcclxuICAgIHB1YmxpYyBhdHRhY2tfYm9udXNfcmF0aW86IG51bWJlcjtcclxuICAgIHB1YmxpYyBkZWZlbnNlX2JvbnVzX3JhdGlvOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmVzdG9yZV9ocF9yYXRpbzogbnVtYmVyO1xyXG4gICAgcHVibGljIHBhc3NpdmVfYXR0YWNrX2JvbnVzX3JhdGlvOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcGFzc2l2ZV9kZWZlbnNlX2JvbnVzX3JhdGlvOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcGFzc2l2ZV9za2lsbF9hcnJheTogbnVtYmVyW107IC8vID8/Pz8/XHJcbiAgICBwdWJsaWMgaGVyb190eXBlOiBIZXJvVHlwZUVudW07XHJcbiAgICBwdWJsaWMgZmluZF9wYXRoX3RhcmdldDogRmlnaHRQcm9wSXRlbURhdGEgfCBGaWdodEJ1aWxkaW5nSXRlbURhdGEgfCBGaWdodEhlcm9JdGVtRGF0YSB8IEZpZ2h0V2FsbEl0ZW1EYXRhO1xyXG4gICAgLy8gY2FsbF9yYW5nZTogbnVtYmVyO1xyXG5cclxuICAgIC8vIEBcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZ3JpZF9pbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5ncmlkX3Bvc2l0aW9uID0gY2MuVmVjMi5aRVJPO1xyXG4gICAgICAgIHRoaXMuYXJyYXlfaW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLmlkID0gMDtcclxuICAgICAgICB0aGlzLmNlbGxJRCA9IDA7XHJcbiAgICAgICAgdGhpcy5sdiA9IDA7XHJcbiAgICAgICAgdGhpcy5za2lsbF9pZCA9IDA7XHJcbiAgICAgICAgdGhpcy5za2lsbF9sdiA9IDA7XHJcbiAgICAgICAgdGhpcy5zdGFyX2x2ID0gMDtcclxuICAgICAgICB0aGlzLmluX2JhdHRsZV9zdGF0ZSA9IEhlcm9JbkJhdHRsZVN0YXRlLk5PVF9JTl9CQVRUTEU7XHJcbiAgICAgICAgdGhpcy5kZWZlbnNlX3ZhbHVlID0gMDtcclxuICAgICAgICB0aGlzLmhwID0gMDtcclxuICAgICAgICB0aGlzLm1heF9ocCA9IDA7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tfdHlwZSA9IEF0dGFja1R5cGUuTk9ORTtcclxuICAgICAgICB0aGlzLmF0dGFja19hbmltX3RpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuZmx5X3dlYXBvbl9uYW1lID0gXCJcIjtcclxuICAgICAgICB0aGlzLmZseV93ZWFwb25fdGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5mbHlfd2VhcG9uX3Bvc2l0aW9uX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5hdHRhY2tfdmFsdWUgPSAwO1xyXG4gICAgICAgIHRoaXMubGFzdF9hdHRhY2tfdGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tfY291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuYXR0YWNrX2ludGVydmFsID0gMDtcclxuICAgICAgICB0aGlzLmF0dGFja19yYW5nZSA9IDA7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hfcmFuZ2UgPSAwO1xyXG4gICAgICAgIHRoaXMubW92ZV9zcGVlZCA9IDA7XHJcbiAgICAgICAgdGhpcy5tb3ZlX3N0YXJ0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm1vdmVfZW5kID0gbnVsbDtcclxuICAgICAgICB0aGlzLm1vdmVfcGF0aCA9IFtdO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gY2MuVmVjMy5aRVJPO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IEhlcm9UeXBlLkZSRUVET007XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IEhlcm9TdGF0ZS5BTElWRTtcclxuICAgICAgICB0aGlzLmZpZ2h0X3N0YXRlID0gSGVyb0ZpZ2h0U3RhdGUuV0FJVElORztcclxuICAgICAgICB0aGlzLnJhZGlhbiA9IDA7XHJcbiAgICAgICAgdGhpcy5vY2N1cGF0aW9uID0gMDtcclxuICAgICAgICB0aGlzLmJ1ZmZfZGF0YV9hcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMubW92ZV9zcGVlZF9zY2FsZSA9IDE7XHJcbiAgICAgICAgdGhpcy5yZWR1Y2VfZGFtYWdlX3JhdGlvID0gMDtcclxuICAgICAgICB0aGlzLmF0dGFja19zcGVlZF9yYXRpbyA9IDA7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tfYm9udXNfcmF0aW8gPSAwO1xyXG4gICAgICAgIHRoaXMuZGVmZW5zZV9ib251c19yYXRpbyA9IDA7XHJcbiAgICAgICAgdGhpcy5yZXN0b3JlX2hwX3JhdGlvID0gMDtcclxuICAgICAgICB0aGlzLnBhc3NpdmVfYXR0YWNrX2JvbnVzX3JhdGlvID0gMDtcclxuICAgICAgICB0aGlzLnBhc3NpdmVfZGVmZW5zZV9ib251c19yYXRpbyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldCByZWFsX2F0dGFja192YWx1ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuYXR0YWNrX3ZhbHVlICogKDEgKyBNYXRoLm1heCh0aGlzLmF0dGFja19ib251c19yYXRpbyArIHRoaXMucGFzc2l2ZV9hdHRhY2tfYm9udXNfcmF0aW8sIDApKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldCByZWFsX2RlZmVuc2VfdmFsdWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLmRlZmVuc2VfdmFsdWUgKiAoMSArIE1hdGgubWF4KHRoaXMuZGVmZW5zZV9ib251c19yYXRpbyArIHRoaXMucGFzc2l2ZV9kZWZlbnNlX2JvbnVzX3JhdGlvLCAwKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXQgcmVhbF9hdHRhY2tfaW50ZXJ2YWwoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRhY2tfaW50ZXJ2YWwgLyAoMSArIE1hdGgubWF4KHRoaXMuYXR0YWNrX3NwZWVkX3JhdGlvLCAwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldCByZWFsX21vdmVfc3BlZWQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLm1vdmVfc3BlZWQgKiB0aGlzLm1vdmVfc3BlZWRfc2NhbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXQgcmVhbF9yZXN0b3JlX2hwKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5tYXhfaHAgKiB0aGlzLnJlc3RvcmVfaHBfcmF0aW8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBjaGFuZ2VfaHAoYW1vdW50OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoYW1vdW50IDwgMCkge1xyXG4gICAgICAgICAgICBhbW91bnQgKj0gTWF0aC5tYXgoMSAtIHRoaXMucmVkdWNlX2RhbWFnZV9yYXRpbywgMCk7XHJcbiAgICAgICAgICAgIGFtb3VudCA9IE1hdGgubWluKDAsIGFtb3VudCArIHRoaXMucmVhbF9kZWZlbnNlX3ZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5ocCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMubWF4X2hwLCB0aGlzLmhwICsgYW1vdW50KSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ocCA9IE1hdGgubWluKHRoaXMubWF4X2hwLCB0aGlzLmhwICsgYW1vdW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VQcm9wSXRlbURhdGEge1xyXG4gICAgcHVibGljIGlkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgbnVtOiBudW1iZXI7XHJcbiAgICAvL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IDA7XHJcbiAgICAgICAgdGhpcy5udW0gPSAwO1xyXG4gICAgfVxyXG59IC8vIGVuZDogQmFzZVByb3BJdGVtRGF0YSBjbGFzc1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBGaWdodFByb3BJdGVtRGF0YSBleHRlbmRzIEJhc2VQcm9wSXRlbURhdGEge1xyXG4gICAgcHVibGljIGdyaWRfaW5kZXg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBncmlkX3Bvc2l0aW9uOiBjYy5WZWMyO1xyXG4gICAgcHVibGljIGhwOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgYXJyYXlfaW5kZXg6IG51bWJlcjtcclxuICAgIC8vXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuZ3JpZF9pbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5ncmlkX3Bvc2l0aW9uID0gY2MuVmVjMi5aRVJPO1xyXG4gICAgfVxyXG59IC8vIGVuZDogRmlnaHRQcm9wSXRlbURhdGEgY2xhc3NcclxuXHJcbi8vIEBcclxuZXhwb3J0IGNsYXNzIEZpZ2h0RGVjb3JhdGlvbkl0ZW1EYXRhIHtcclxuICAgIHB1YmxpYyBncmlkX2luZGV4OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZ3JpZF9wb3NpdGlvbjogY2MuVmVjMjtcclxuICAgIHB1YmxpYyBhcnJheV9pbmRleDogbnVtYmVyO1xyXG4gICAgcHVibGljIGRlY29yYXRpb25faWQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBwbGFudF94X29mZnNldDogbnVtYmVyO1xyXG4gICAgcHVibGljIHBsYW50X3lfb2Zmc2V0OiBudW1iZXI7XHJcbiAgICAvL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5ncmlkX2luZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmdyaWRfcG9zaXRpb24gPSBjYy5WZWMyLlpFUk87XHJcbiAgICAgICAgdGhpcy5hcnJheV9pbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5kZWNvcmF0aW9uX2lkID0gMDtcclxuICAgICAgICB0aGlzLnBsYW50X3hfb2Zmc2V0ID0gMDtcclxuICAgICAgICB0aGlzLnBsYW50X3lfb2Zmc2V0ID0gMDtcclxuICAgIH1cclxufSAvLyBlbmQ6IEZpZ2h0RGVjb3JhdGlvbkl0ZW1EYXRhIGNsYXNzXHJcblxyXG4vLyBAXHJcbmV4cG9ydCBjbGFzcyBGaWdodFJlc3VsdFByb3BJdGVtRGF0YSBleHRlbmRzIEJhc2VQcm9wSXRlbURhdGEge1xyXG4gICAgcHVibGljIHR5cGU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBjb2xvcjogbnVtYmVyO1xyXG4gICAgLy9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gMDtcclxuICAgICAgICB0aGlzLmNvbG9yID0gMDtcclxuICAgIH1cclxufSAvLyBlbmQ6IEZpZ2h0UmVzdWx0UHJvcEl0ZW1EYXRhIGNsYXNzXHJcblxyXG4vLyBAXHJcbmV4cG9ydCBjbGFzcyBGaWdodFJld2FyZEl0ZW1EYXRhIGV4dGVuZHMgQmFzZVByb3BJdGVtRGF0YSB7XHJcbiAgICBwdWJsaWMgaW5kZXg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBtYXhfbnVtOiBudW1iZXI7XHJcbiAgICAvL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmluZGV4ID0gLTE7XHJcbiAgICAgICAgdGhpcy5tYXhfbnVtID0gMDtcclxuICAgIH1cclxufSAvLyBlbmQ6IEZpZ2h0UmV3YXJkSXRlbURhdGEgY2xhc3NcclxuXHJcbi8vIEBcclxuZXhwb3J0IGNsYXNzIEZpZ2h0TWFwQ29uZmlnRGF0YSB7XHJcbiAgICBwdWJsaWMgbWFwX2tleTogc3RyaW5nO1xyXG4gICAgcHVibGljIG1hcF9pZDogbnVtYmVyO1xyXG4gICAgcHVibGljIGNlbGxfaWQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyByb3c6IG51bWJlcjtcclxuICAgIHB1YmxpYyBjb2w6IG51bWJlcjtcclxuICAgIHB1YmxpYyBlbnRlcjogbnVtYmVyO1xyXG4gICAgcHVibGljIGl0ZW1fdHlwZTogbnVtYmVyO1xyXG4gICAgcHVibGljIGl0ZW1faWQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBpc19vYnN0cnVjdDogbnVtYmVyO1xyXG4gICAgcHVibGljIHBsYW50X2lkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgbGFuZF9pbWdfaWQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBsYW5kX3lfb2Zmc2V0OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcGxhbnRfeF9vZmZzZXQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBwbGFudF95X29mZnNldDogbnVtYmVyO1xyXG4gICAgcHVibGljIHdhdGVyX2ltZ19pZDogbnVtYmVyO1xyXG4gICAgcHVibGljIHNlYV9hcmVhOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc2tpbGxfbHY6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzdGFyX2x2OiBudW1iZXI7XHJcbiAgICAvL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5tYXBfa2V5ID0gXCJcIjtcclxuICAgICAgICB0aGlzLm1hcF9pZCA9IDA7XHJcbiAgICAgICAgdGhpcy5jZWxsX2lkID0gMDtcclxuICAgICAgICB0aGlzLnJvdyA9IDA7XHJcbiAgICAgICAgdGhpcy5jb2wgPSAwO1xyXG4gICAgICAgIHRoaXMuZW50ZXIgPSAwO1xyXG4gICAgICAgIHRoaXMuaXRlbV90eXBlID0gMDtcclxuICAgICAgICB0aGlzLml0ZW1faWQgPSAwO1xyXG4gICAgICAgIHRoaXMuaXNfb2JzdHJ1Y3QgPSAwO1xyXG4gICAgICAgIHRoaXMucGxhbnRfaWQgPSAwO1xyXG4gICAgICAgIHRoaXMubGFuZF9pbWdfaWQgPSAwO1xyXG4gICAgICAgIHRoaXMubGFuZF95X29mZnNldCA9IDA7XHJcbiAgICAgICAgdGhpcy5wbGFudF94X29mZnNldCA9IDA7XHJcbiAgICAgICAgdGhpcy5wbGFudF95X29mZnNldCA9IDA7XHJcbiAgICAgICAgdGhpcy53YXRlcl9pbWdfaWQgPSAwO1xyXG4gICAgICAgIHRoaXMuc2VhX2FyZWEgPSAwO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfbHYgPSAwO1xyXG4gICAgICAgIHRoaXMuc3Rhcl9sdiA9IDA7XHJcbiAgICB9XHJcbn0gLy8gZW5kOiBGaWdodE1hcENvbmZpZ0RhdGEgY2xhc3NcclxuXHJcbi8vIEBcclxuaW50ZXJmYWNlIElIZXJvSW5kZXgge1xyXG4gICAgaGVyb19pbmRleDogbnVtYmVyO1xyXG4gICAgb2Zmc2V0OiBjYy5WZWMzO1xyXG59XHJcblxyXG4vLyBAXHJcbmludGVyZmFjZSBJRGVmZW5zZUhlcm9JbmRleCB7XHJcbiAgICBkZWZlbnNlX2hlcm9faW5kZXg6IG51bWJlcjtcclxuICAgIG9mZnNldDogY2MuVmVjMztcclxufVxyXG5cclxuLy8gQFxyXG5leHBvcnQgY2xhc3MgRmlnaHRNYXBJdGVtRGF0YSBleHRlbmRzIEZpZ2h0TWFwQ29uZmlnRGF0YSB7XHJcbiAgICBwdWJsaWMgZ3JpZF9pbmRleDogbnVtYmVyO1xyXG4gICAgcHVibGljIGdyaWRfcG9zaXRpb246IGNjLlZlYzI7XHJcbiAgICBwdWJsaWMgZWRnZV9mbGFnOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgbGFuZF9pZDogbnVtYmVyO1xyXG4gICAgcHVibGljIGRlY29yYXRpb25faW5kZXg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBoZXJvX2luZGV4X2FycmF5OiBJSGVyb0luZGV4W107XHJcbiAgICBwdWJsaWMgZGVmZW5zZV9oZXJvX2luZGV4X2FycmF5OiBJRGVmZW5zZUhlcm9JbmRleFtdO1xyXG4gICAgcHVibGljIG9mZnNldF9hcnJheTogY2MuVmVjM1tdO1xyXG4gICAgcHVibGljIHByb3BfaW5kZXg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBidWlsZGluZ19pbmRleDogbnVtYmVyO1xyXG4gICAgcHVibGljIHdhbGxfaW5kZXg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBwb3NpdGlvbjogY2MuVmVjMztcclxuICAgIC8vIEBcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5ncmlkX2luZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmdyaWRfcG9zaXRpb24gPSBjYy5WZWMyLlpFUk87XHJcbiAgICAgICAgdGhpcy5lZGdlX2ZsYWcgPSAtMTtcclxuICAgICAgICB0aGlzLmxhbmRfaWQgPSAwO1xyXG4gICAgICAgIHRoaXMuZGVjb3JhdGlvbl9pbmRleCA9IC0xO1xyXG4gICAgICAgIHRoaXMuaGVyb19pbmRleF9hcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGVmZW5zZV9oZXJvX2luZGV4X2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5vZmZzZXRfYXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLnByb3BfaW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLmJ1aWxkaW5nX2luZGV4ID0gLTE7XHJcbiAgICAgICAgdGhpcy53YWxsX2luZGV4ID0gLTE7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IGNjLlZlYzMuWkVSTztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkX2hlcm9faW5kZXgoaGVyb0luZGV4OiBudW1iZXIpOiBJSGVyb0luZGV4IHtcclxuICAgICAgICBpZiAoMCA9PSB0aGlzLm9mZnNldF9hcnJheS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5vZmZzZXRfYXJyYXkgPSBbXS5jb25jYXQoRmlnaHRDb25zdGFudHMuSEVST19PRkZTRVRfQVJSQVkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuaGVyb19pbmRleF9hcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGVyb19pbmRleF9hcnJheVtpbmRleF0uaGVyb19pbmRleCA9PSB0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZXJvX2luZGV4X2FycmF5W2luZGV4XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbmV3SGVyb0luZGV4ID0ge1xyXG4gICAgICAgICAgICBoZXJvX2luZGV4OiBoZXJvSW5kZXgsXHJcbiAgICAgICAgICAgIG9mZnNldDogdGhpcy5vZmZzZXRfYXJyYXkuc2hpZnQoKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5oZXJvX2luZGV4X2FycmF5LnB1c2gobmV3SGVyb0luZGV4KTtcclxuICAgICAgICByZXR1cm4gbmV3SGVyb0luZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyByZW1vdmVfaGVyb19pbmRleChoZXJvSW5kZXg6IG51bWJlcik6IElIZXJvSW5kZXhbXSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuaGVyb19pbmRleF9hcnJheS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oZXJvX2luZGV4X2FycmF5W2ldLmhlcm9faW5kZXggPT09IGhlcm9JbmRleCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVyb19pbmRleF9hcnJheS5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGFkZF9kZWZlbnNlX2hlcm9faW5kZXgoZGVmZW5zZUhlcm9JbmRleDogbnVtYmVyKTogSURlZmVuc2VIZXJvSW5kZXgge1xyXG4gICAgICAgIGlmICgwID09IHRoaXMub2Zmc2V0X2FycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLm9mZnNldF9hcnJheSA9IFtdLmNvbmNhdChGaWdodENvbnN0YW50cy5IRVJPX09GRlNFVF9BUlJBWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5kZWZlbnNlX2hlcm9faW5kZXhfYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlZmVuc2VfaGVyb19pbmRleF9hcnJheVtpbmRleF0uZGVmZW5zZV9oZXJvX2luZGV4ID09IHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRlZmVuc2VfaGVyb19pbmRleF9hcnJheVtpbmRleF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbmV3RGVmZW5zZUhlcm9JbmRleCA9IHtcclxuICAgICAgICAgICAgZGVmZW5zZV9oZXJvX2luZGV4OiBkZWZlbnNlSGVyb0luZGV4LFxyXG4gICAgICAgICAgICBvZmZzZXQ6IHRoaXMub2Zmc2V0X2FycmF5LnNoaWZ0KClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmRlZmVuc2VfaGVyb19pbmRleF9hcnJheS5wdXNoKG5ld0RlZmVuc2VIZXJvSW5kZXgpO1xyXG4gICAgICAgIHJldHVybiBuZXdEZWZlbnNlSGVyb0luZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyByZW1vdmVfZGVmZW5zZV9oZXJvX2luZGV4KGRlZmVuc2VIZXJvSW5kZXg6IG51bWJlcik6IElEZWZlbnNlSGVyb0luZGV4W10ge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmRlZmVuc2VfaGVyb19pbmRleF9hcnJheS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWZlbnNlX2hlcm9faW5kZXhfYXJyYXlbaV0uZGVmZW5zZV9oZXJvX2luZGV4ID09IGRlZmVuc2VIZXJvSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRlZmVuc2VfaGVyb19pbmRleF9hcnJheS5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEVkZ2VFbnVtIHtcclxuICAgIFRPUCA9IDEsXHJcbiAgICBSSUdIVCA9IDIsXHJcbiAgICBCT1RUT00gPSA0LFxyXG4gICAgTEVGVCA9IDhcclxufVxyXG5cclxuLy8gQFxyXG5leHBvcnQgY2xhc3MgRmlnaHRCdWlsZGluZ0l0ZW1EYXRhIHtcclxuICAgIHB1YmxpYyBncmlkX2luZGV4OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZ3JpZF9wb3NpdGlvbjogY2MuVmVjMjtcclxuICAgIHB1YmxpYyBhcnJheV9pbmRleDogbnVtYmVyO1xyXG4gICAgcHVibGljIGlkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgbHY6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzdGFyX2NvdW50OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmV3YXJkX2FycmF5OiBCYXNlUHJvcEl0ZW1EYXRhW107XHJcbiAgICBwdWJsaWMgaHA6IG51bWJlcjtcclxuICAgIHB1YmxpYyBtYXhfaHA6IG51bWJlcjtcclxuICAgIHB1YmxpYyBkZWZlbnNlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgYXR0YWNrX3ZhbHVlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgY2FsbF9yYW5nZTogbnVtYmVyO1xyXG4gICAgcHVibGljIGxhc3RfYXR0YWNrX3RpbWU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBhdHRhY2tfaW50ZXJ2YWw6IG51bWJlcjtcclxuICAgIHB1YmxpYyBhdHRhY2tfcmFuZ2U6IG51bWJlcjtcclxuICAgIHB1YmxpYyBhdHRhY2tfdHlwZTogQXR0YWNrVHlwZTtcclxuICAgIHB1YmxpYyBmbHlfd2VhcG9uX25hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBsb2NrX2F0dGFja190YXJnZXQ6IEZpZ2h0SGVyb0l0ZW1EYXRhO1xyXG5cclxuICAgIC8vIEBcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZ3JpZF9pbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5ncmlkX3Bvc2l0aW9uID0gY2MuVmVjMi5aRVJPO1xyXG4gICAgICAgIHRoaXMuYXJyYXlfaW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLmlkID0gMDtcclxuICAgICAgICB0aGlzLmx2ID0gMDtcclxuICAgICAgICB0aGlzLnN0YXJfY291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMucmV3YXJkX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5ocCA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXhfaHAgPSAwO1xyXG4gICAgICAgIHRoaXMuZGVmZW5zZSA9IDA7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tfdmFsdWUgPSAwO1xyXG4gICAgICAgIHRoaXMuY2FsbF9yYW5nZSA9IDA7XHJcbiAgICAgICAgdGhpcy5sYXN0X2F0dGFja190aW1lID0gMDtcclxuICAgICAgICB0aGlzLmF0dGFja19pbnRlcnZhbCA9IDA7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tfcmFuZ2UgPSAwO1xyXG4gICAgICAgIHRoaXMuYXR0YWNrX3R5cGUgPSBBdHRhY2tUeXBlLlJFTU9URTtcclxuICAgICAgICB0aGlzLmZseV93ZWFwb25fbmFtZSA9IFwiXCI7XHJcbiAgICB9XHJcbn0gLy8gZW5kOiBGaWdodEJ1aWxkaW5nSXRlbURhdGEgY2xhc3NcclxuXHJcbi8vIEBcclxuZXhwb3J0IGNsYXNzIEZpZ2h0V2FsbEl0ZW1EYXRhIHtcclxuICAgIHB1YmxpYyBncmlkX2luZGV4OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZ3JpZF9wb3NpdGlvbjogY2MuVmVjMjtcclxuICAgIHB1YmxpYyBhcnJheV9pbmRleDogbnVtYmVyO1xyXG4gICAgcHVibGljIGlkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgbHY6IG51bWJlcjtcclxuICAgIHB1YmxpYyBza2lsbF9pZDogbnVtYmVyO1xyXG4gICAgcHVibGljIHNraWxsX2x2OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc3Rhcl9sdjogbnVtYmVyO1xyXG4gICAgcHVibGljIGRlZmVuc2VfdmFsdWU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBocDogbnVtYmVyO1xyXG4gICAgcHVibGljIG1heF9ocDogbnVtYmVyO1xyXG4gICAgcHVibGljIGF0dGFja190eXBlOiBBdHRhY2tUeXBlO1xyXG4gICAgcHVibGljIGF0dGFja19hbmltX3RpbWU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBmbHlfd2VhcG9uX25hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBmbHlfd2VhcG9uX3RpbWU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBmbHlfd2VhcG9uX3Bvc2l0aW9uX2FycmF5OiBjYy5WZWMzW107XHJcbiAgICBwdWJsaWMgYXR0YWNrX3ZhbHVlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgbGFzdF9hdHRhY2tfdGltZTogbnVtYmVyO1xyXG4gICAgcHVibGljIGF0dGFja19pbnRlcnZhbDogbnVtYmVyO1xyXG4gICAgcHVibGljIGF0dGFja19yYW5nZTogbnVtYmVyO1xyXG4gICAgcHVibGljIHNlYXJjaF9yYW5nZTogbnVtYmVyO1xyXG4gICAgcHVibGljIHN0YXRlOiBIZXJvU3RhdGU7XHJcbiAgICBwdWJsaWMgZmlnaHRfc3RhdGU6IEhlcm9GaWdodFN0YXRlO1xyXG4gICAgcHVibGljIGNhbGxfcmFuZ2U6IG51bWJlcjtcclxuICAgIHB1YmxpYyByYWRpYW46IG51bWJlcjtcclxuICAgIHB1YmxpYyBkYW1hZ2VfcmF0aW86IG51bWJlcjtcclxuICAgIHB1YmxpYyBkZWZlbnNlX3JhdGlvOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcGFzc2l2ZV9za2lsbF9hcnJheTogbnVtYmVyW107XHJcbiAgICBwdWJsaWMgb2NjdXBhdGlvbjogbnVtYmVyO1xyXG4gICAgcHVibGljIGxvY2tfYXR0YWNrX3RhcmdldDogRmlnaHRIZXJvSXRlbURhdGE7XHJcblxyXG4gICAgLy8gQFxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5ncmlkX2luZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmdyaWRfcG9zaXRpb24gPSBjYy5WZWMyLlpFUk87XHJcbiAgICAgICAgdGhpcy5hcnJheV9pbmRleCA9IC0xO1xyXG4gICAgICAgIHRoaXMuaWQgPSAwO1xyXG4gICAgICAgIHRoaXMubHYgPSAwO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfaWQgPSAwO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfbHYgPSAwO1xyXG4gICAgICAgIHRoaXMuc3Rhcl9sdiA9IDA7XHJcbiAgICAgICAgdGhpcy5kZWZlbnNlX3ZhbHVlID0gMDtcclxuICAgICAgICB0aGlzLmhwID0gMDtcclxuICAgICAgICB0aGlzLm1heF9ocCA9IDA7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tfdHlwZSA9IEF0dGFja1R5cGUuTk9ORTtcclxuICAgICAgICB0aGlzLmF0dGFja19hbmltX3RpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuZmx5X3dlYXBvbl9uYW1lID0gXCJcIjtcclxuICAgICAgICB0aGlzLmZseV93ZWFwb25fdGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5mbHlfd2VhcG9uX3Bvc2l0aW9uX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5hdHRhY2tfdmFsdWUgPSAwO1xyXG4gICAgICAgIHRoaXMubGFzdF9hdHRhY2tfdGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tfaW50ZXJ2YWwgPSAwO1xyXG4gICAgICAgIHRoaXMuYXR0YWNrX3JhbmdlID0gMDtcclxuICAgICAgICB0aGlzLnNlYXJjaF9yYW5nZSA9IDA7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IEhlcm9TdGF0ZS5BTElWRTtcclxuICAgICAgICB0aGlzLmZpZ2h0X3N0YXRlID0gSGVyb0ZpZ2h0U3RhdGUuQVRUQUNLSU5HO1xyXG4gICAgICAgIHRoaXMuY2FsbF9yYW5nZSA9IDA7XHJcbiAgICAgICAgdGhpcy5yYWRpYW4gPSAwO1xyXG4gICAgICAgIHRoaXMuZGFtYWdlX3JhdGlvID0gMTtcclxuICAgICAgICB0aGlzLmRlZmVuc2VfcmF0aW8gPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXQgcmVhbF9hdHRhY2tfdmFsdWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLmF0dGFja192YWx1ZSAqIHRoaXMuZGFtYWdlX3JhdGlvKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0IHJlYWxfZGVmZW5zZV92YWx1ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuZGVmZW5zZV92YWx1ZSAqIHRoaXMuZGVmZW5zZV9yYXRpbyk7XHJcbiAgICB9XHJcbn0gLy8gZW5kOiBGaWdodFdhbGxJdGVtRGF0YSBjbGFzc1xyXG5cclxuLy8gQFxyXG5leHBvcnQgY2xhc3MgRmlnaHRUYXJnZXRTb3J0RGF0YSB7XHJcbiAgICBwdWJsaWMgZGlzdGFuY2U6IG51bWJlcjtcclxuICAgIHB1YmxpYyBmaW5kX3BhdGhfZGlzdGFuY2U6IG51bWJlcjtcclxuICAgIHB1YmxpYyBwaXhlbF9kaXN0YW5jZTogbnVtYmVyO1xyXG4gICAgcHVibGljIHByaW9yaXR5OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgdHlwZTogbnVtYmVyO1xyXG4gICAgcHVibGljIGluZGV4OiBudW1iZXI7XHJcbiAgICAvL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5kaXN0YW5jZSA9IDA7XHJcbiAgICAgICAgdGhpcy5maW5kX3BhdGhfZGlzdGFuY2UgPSAwO1xyXG4gICAgICAgIHRoaXMucGl4ZWxfZGlzdGFuY2UgPSAwO1xyXG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSAwO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IDA7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IC0xO1xyXG4gICAgfVxyXG59IC8vIGVuZDogRmlnaHRUYXJnZXRTb3J0RGF0YSBjbGFzc1xyXG5cclxuLy8gQFxyXG5leHBvcnQgY2xhc3MgRmlnaHRSZXN1bHREYXRhIHtcclxuICAgIHB1YmxpYyByZXN1bHQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBhdHRhY2tlcl9uYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZGVmZW5kZXJfbmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHN0YXJfbnVtOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZ29sZF9udW06IG51bWJlcjtcclxuICAgIHB1YmxpYyBidWNrZXRfbnVtOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcHJvcF9kYXRhX2FycmF5OiBGaWdodFJlc3VsdFByb3BJdGVtRGF0YVtdO1xyXG4gICAgcHVibGljIGRlYXRoX2hlcm9fZGF0YV9hcnJheTogRmlnaHRSZXN1bHRQcm9wSXRlbURhdGFbXTtcclxuICAgIHB1YmxpYyBhbGl2ZV9oZXJvX2RhdGFfYXJyYXk6IEZpZ2h0SGVyb0l0ZW1EYXRhW107XHJcbiAgICBwdWJsaWMgYWxpdmVfZGVmZW5zZV9oZXJvX2RhdGFfYXJyYXk6IEZpZ2h0SGVyb0l0ZW1EYXRhW107XHJcbiAgICAvL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5yZXN1bHQgPSAwO1xyXG4gICAgICAgIHRoaXMuYXR0YWNrZXJfbmFtZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5kZWZlbmRlcl9uYW1lID0gXCJcIjtcclxuICAgICAgICB0aGlzLnN0YXJfbnVtID0gMDtcclxuICAgICAgICB0aGlzLmdvbGRfbnVtID0gMDtcclxuICAgICAgICB0aGlzLmJ1Y2tldF9udW0gPSAwO1xyXG4gICAgICAgIHRoaXMucHJvcF9kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5kZWF0aF9oZXJvX2RhdGFfYXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLmFsaXZlX2hlcm9fZGF0YV9hcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMuYWxpdmVfZGVmZW5zZV9oZXJvX2RhdGFfYXJyYXkgPSBbXTtcclxuICAgIH1cclxufSAvLyBlbmQ6IEZpZ2h0UmVzdWx0RGF0YSBjbGFzc1xyXG5cclxuLy8gQFxyXG5leHBvcnQgY2xhc3MgRmlnaHRNYXRjaERhdGEge1xyXG4gICAgcHVibGljIGlkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmFuZG9tX21hcF9hcnJheTogbnVtYmVyW107XHJcbiAgICBwdWJsaWMgZmFpbF90d29fcmFuZG9tX21hcF9hcnJheTogbnVtYmVyW107XHJcbiAgICBwdWJsaWMgYmF0dGxlX21hcF9pZDogbnVtYmVyO1xyXG4gICAgcHVibGljIGJhdHRsZV9kYXRhX2FycmF5OiBudW1iZXJbXTtcclxuICAgIHB1YmxpYyBwc3ljaGVkZWxpY19tYXBfaWQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBwc3ljaGVkZWxpY19kYXRhX2FycmF5OiBudW1iZXJbXTtcclxuICAgIHB1YmxpYyByYW5kb21fbmFtZV9pZDogbnVtYmVyO1xyXG4gICAgLy9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaWQgPSAwO1xyXG4gICAgICAgIHRoaXMucmFuZG9tX21hcF9hcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZmFpbF90d29fcmFuZG9tX21hcF9hcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMuYmF0dGxlX21hcF9pZCA9IDA7XHJcbiAgICAgICAgdGhpcy5iYXR0bGVfZGF0YV9hcnJheSA9IFtdO1xyXG4gICAgICAgIHRoaXMucHN5Y2hlZGVsaWNfbWFwX2lkID0gMDtcclxuICAgICAgICB0aGlzLnBzeWNoZWRlbGljX2RhdGFfYXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLnJhbmRvbV9uYW1lX2lkID0gMDtcclxuICAgIH1cclxufSAvLyBlbmQ6IEZpZ2h0TWF0Y2hEYXRhIGNsYXNzXHJcblxyXG4vLyBAXHJcbmV4cG9ydCBjbGFzcyBCdWZmSXRlbURhdGEge1xyXG4gICAgcHVibGljIGlkOiBTa2lsbEVmZmVjdElkO1xyXG4gICAgcHVibGljIHZhbGlkX3RpbWU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzdGFydF90aW1lOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaXNfc3RhcnQ6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgaXNfZW5kOiBib29sZWFuO1xyXG4gICAgcHVibGljIHRyaWdnZXJfY291bnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBtYXhfdHJpZ2dlcl9jb3VudDogbnVtYmVyO1xyXG4gICAgcHVibGljIGRhbWFnZV92YWx1ZTogbnVtYmVyO1xyXG4gICAgcHVibGljIG1vdmVfc3BlZWRfc2NhbGU6IG51bWJlcjtcclxuICAgIHB1YmxpYyByZWR1Y2VfZGFtYWdlX3JhdGlvOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgYXR0YWNrX3NwZWVkX3JhdGlvOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgYXR0YWNrX2JvbnVzX3JhdGlvOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZGVmZW5zZV9ib251c19yYXRpbzogbnVtYmVyO1xyXG4gICAgcHVibGljIHJlc3RvcmVfaHBfcmF0aW86IG51bWJlcjtcclxuICAgIHB1YmxpYyB2YWx1ZTogbnVtYmVyO1xyXG4gICAgLy9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBTa2lsbEVmZmVjdElkLk5PTkU7XHJcbiAgICAgICAgdGhpcy52YWxpZF90aW1lID0gMDtcclxuICAgICAgICB0aGlzLnN0YXJ0X3RpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuaXNfc3RhcnQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzX2VuZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudHJpZ2dlcl9jb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXhfdHJpZ2dlcl9jb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2VfdmFsdWUgPSAwO1xyXG4gICAgICAgIHRoaXMubW92ZV9zcGVlZF9zY2FsZSA9IDE7XHJcbiAgICAgICAgdGhpcy5yZWR1Y2VfZGFtYWdlX3JhdGlvID0gMDtcclxuICAgICAgICB0aGlzLmF0dGFja19zcGVlZF9yYXRpbyA9IDA7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tfYm9udXNfcmF0aW8gPSAwO1xyXG4gICAgICAgIHRoaXMuZGVmZW5zZV9ib251c19yYXRpbyA9IDA7XHJcbiAgICAgICAgdGhpcy5yZXN0b3JlX2hwX3JhdGlvID0gMDtcclxuICAgICAgICB0aGlzLnZhbHVlID0gMDtcclxuICAgIH1cclxufSAvLyBlbmQ6IEJ1ZmZJdGVtRGF0YSBjbGFzc1xyXG4iXX0=