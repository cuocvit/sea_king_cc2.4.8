"use strict";
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