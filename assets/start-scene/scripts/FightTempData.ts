import { ReportData } from './NetUtils';
import { ChannelManager } from './ChannelManager';
import { RewardIdEnum, BuildTypeEnum, PropTypeEnum, SetItemNumEnum, HeroTypeEnum } from './Constants';
import { AStar, Grid, Node } from './AStar';
import { gm } from './GameManager';
import { SingletonBase } from './SingletonBase';
import { Utils } from './Utils';
import { AttackType, SkillEffectId } from './ConfigData';
import { ConstantsData } from './ConstantsData';
import { FightConstants, FightDynamicNodeLayer, HeroInBattleState, HeroType, HeroState, HeroFightState } from './FightConstants';
import { FightState } from './FightData';
import { roleGoBattleItemVO } from './MapCellCfgData';
import { PlayMap } from "../../common/configs/playmap";
import { PlayData } from "../../common/configs/playdata";
import { PlayCaves } from "../../common/configs/playcaves";
import { NamePool } from "../../common/configs/name_pool";
import { Build } from '../../common/configs/build';
import { HeroConfig } from '../../common/configs/hero';
import { LadderLVConfig } from '../../common/configs/ladder_lv';
import { ItemConfig } from '../../common/configs/item';
import { CavesLevel } from '../../common/configs/caveslevel';
import { MatchConfig } from '../../common/configs/match';
import { FightMapItem } from '../../fight/scripts/FightMapItem';
import { FightPropItem } from '../../fight/scripts/FightPropItem';
import { FightBuildingItem } from '../../fight/scripts/FightBuildingItem';
import { FightHeroItem } from '../../fight/scripts/FightHeroItem';
import { FightDecorationItem } from '../../fight/scripts/FightDecorationItem';
import { FightWallItem } from '../../fight/scripts/FightWallItem';
import { NodePoolItem } from './NodePoolItem';
import { SkillItem, SkillItemData } from '../../fight/scripts/SkillItem';

// @ !!!!
interface IDefensiveData {
    uid: string;
    nickname: string;
    star: number;
    boat_id: number;
    map_data_array: FightMapItemData[];
    hero_data_array: FightTempData[];
}


//
export class FightTempData extends SingletonBase {
    public is_debug: boolean | number | string;
    public fight_state: FightState;
    public record_fight_state: FightState;
    public delta_time: number;
    public total_time: number;
    public has_pop_revive: boolean;
    public reward_data_array: FightRewardItemData[];
    public goto_battle_count: number;
    public death_hero_count: number;
    public in_battle_hero_data: FightHeroItemData;
    public map_item_array: FightMapItem[];
    public map_item_data_array: FightMapItemData[];
    public prop_item_array: FightPropItem[];
    public prop_data_array: FightPropItemData[];
    public building_item_array: FightBuildingItem[];
    public building_data_array: FightBuildingItemData[];
    public defense_hero_array: FightHeroItem[];
    public defense_hero_data_array: FightHeroItemData[];
    public passive_hero_data_array: FightHeroItemData[];
    public hero_item_array: FightHeroItem[];
    public hero_data_array: FightHeroItemData[];
    public wall_item_array: FightWallItem[];
    public wall_data_array: FightWallItemData[];
    public decoration_item_array: FightDecorationItem[];
    public decoration_data_array: FightDecorationItemData[];
    public fight_result_data: FightResultData;
    public battle_hero_array: roleGoBattleItemVO[];
    public open_battle_panel_state: number;
    private fight_match_data_array: FightMatchData[];
    public building_destroy_array: NodePoolItem[];
    public hero_death_array: NodePoolItem[];
    public skill_item_array: SkillItem[];
    public skill_data_array: SkillItemData[];
    public play_type: number;
    public map_id: number;
    public map_data_id: number;
    public name: string;
    public boat_id: number;
    public goal_uid: string;
    public defensive_data: IDefensiveData;
    private offset_col: cc.Vec2;
    private offset_row: cc.Vec2;
    public min_offset: cc.Vec2;
    public max_offset: cc.Vec2;
    public map_start_position: cc.Vec3;
    public boat_start_position: cc.Vec3;
    public map_size: cc.Vec2;
    public edge_map: {
        LEFT: cc.Vec2;
        BOTTOM: cc.Vec2;
        RIGHT: cc.Vec2;
        TOP: cc.Vec2;
    };
    public map_end_many_times: number;
    public show_return_btn_timestamp: number;
    public a_star: AStar;
    public grid: Grid;
    public unique_id: number;;
    public hero_id: number;

    //
    constructor() {
        super();
        this.is_debug = false;
        this.fight_state = FightState.NONE;
        this.record_fight_state = FightState.NONE;
        this.delta_time = 0;
        this.total_time = 0;
        this.has_pop_revive = false;
        this.reward_data_array = [];
        this.goto_battle_count = 0;
        this.death_hero_count = 0;
        this.in_battle_hero_data = null;
        this.map_item_array = [];
        this.map_item_data_array = [];
        this.prop_item_array = [];
        this.prop_data_array = [];
        this.building_item_array = [];
        this.building_data_array = [];
        this.defense_hero_array = [];
        this.defense_hero_data_array = [];
        this.passive_hero_data_array = [];
        this.hero_item_array = [];
        this.hero_data_array = [];
        this.wall_item_array = [];
        this.wall_data_array = [];
        this.decoration_item_array = [];
        this.decoration_data_array = [];
        this.fight_result_data = null;
        this.battle_hero_array = [];
        this.open_battle_panel_state = 0;
        this.fight_match_data_array = [];
        this.building_destroy_array = [];
        this.hero_death_array = [];
        this.skill_item_array = [];
        this.skill_data_array = [];
        this.play_type = -1;
        this.map_id = 2;
        this.map_data_id = 1;
        this.name = "Unknown Island"; // 无名岛 -> Unknown Island
        this.boat_id = 60001;
        this.goal_uid = "";
        this.defensive_data = {
            uid: "",
            nickname: "",
            star: 0,
            boat_id: 0,
            map_data_array: [],
            hero_data_array: []
        };
        this.offset_col = cc.v2(75, -20);
        this.offset_row = cc.v2(-31, -51);
        this.min_offset = cc.Vec2.ZERO;
        this.max_offset = cc.Vec2.ZERO;
        this.map_start_position = cc.Vec3.ZERO;
        this.boat_start_position = cc.Vec3.ZERO;
        this.map_size = cc.Vec2.ZERO;
        this.edge_map = {
            LEFT: cc.v2(-1, 0),
            BOTTOM: cc.v2(0, 1),
            RIGHT: cc.v2(1, 0),
            TOP: cc.v2(0, -1)
        };
        this.map_end_many_times = 1;
        this.show_return_btn_timestamp = 0;
    } // end: constructor

    // @
    public get left_fight_time(): number {
        return Math.max(0, Math.floor(ConstantsData.instance.MAX_FIGHT_TIME - gm.data.fight_temp_data.total_time));
    }


    // @
    public build_play_map_data(): FightMapItemData[] {
        let t;
        this.map_item_data_array = [];
        this.building_data_array = [];
        this.prop_data_array = [];
        this.defense_hero_data_array = [];
        this.passive_hero_data_array = [];
        this.wall_data_array = [];
        if (0 == this.play_type && "" != this.goal_uid) {
            this.name = this.defensive_data.nickname + "\nUID:" + this.defensive_data.uid;
            this.boat_id = this.defensive_data.boat_id;
            this.map_size.x = gm.const.MAX_ROW;
            this.map_size.y = gm.const.MAX_COLUMN;

            const o = [181, 195, 204, 216, 215, 225, 243, 254, 253, 248, 232, 221, 207, 199, 186, 170, 153, 154, 171, 187, 200, 208, 209, 201, 188, 189, 174, 123, 122, 108, , 53, 39, 27, 18, 8, 26, 37, 49, 36, 35, 25, 28, 40, 41, 54, 96, 125, 190, 202, 213, 214, 203, 193, 194, 120, 107, 121, 137];

            const n = [];

            for (let index = 0; index < this.defensive_data.map_data_array.length; index++) {
                const mapData = this.defensive_data.map_data_array[index];
                if (mapData) {
                    const fightMapItemData = new FightMapItemData;
                    fightMapItemData.item_type = mapData.item_type;
                    fightMapItemData.item_id = mapData.item_id;
                    fightMapItemData.skill_lv = mapData.skill_lv;
                    fightMapItemData.star_lv = mapData.star_lv || 0;
                    fightMapItemData.grid_index = gm.data.config_data.getMapIndexByCellID(mapData.cell_id);
                    fightMapItemData.grid_position = cc.v2(fightMapItemData.grid_index % this.map_size.x, Math.floor(fightMapItemData.grid_index / this.map_size.x));
                    fightMapItemData.position = this.grid_position_to_floor_position(fightMapItemData.grid_position);

                    const mapcellCfg = gm.data.config_data.getMapCellCfgByID(mapData.cell_id);
                    fightMapItemData.land_id = mapcellCfg.landImgID;

                    if (0 < mapcellCfg.plantID) {
                        const fightDecorationItemData = new FightDecorationItemData;
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

            let s: FightMapItemData = undefined;
            for (let r = 0; r < this.map_item_data_array.length; r++) {
                if (s = this.map_item_data_array[r]) {
                    if (1 == s.item_type) {
                        const fightPropItemData = new FightPropItemData;
                        fightPropItemData.grid_index = s.grid_index;
                        fightPropItemData.grid_position = s.grid_position;
                        fightPropItemData.id = s.item_id;
                        fightPropItemData.num = 1;
                        s.prop_index = this.prop_data_array.length;
                        this.prop_data_array.push(fightPropItemData);

                        const common = this.special_prop_to_common_prop(fightPropItemData);
                        this.get_reward_data(common.id).max_num += common.num;

                    } else if (2 == s.item_type) {
                        const fightBuildingItemData = new FightBuildingItemData;
                        fightBuildingItemData.grid_index = s.grid_index;
                        fightBuildingItemData.grid_position = s.grid_position;
                        fightBuildingItemData.id = s.item_id;
                        fightBuildingItemData.reward_array = [];

                        const rowData = gm.config.get_row_data("BuildConfigData", fightBuildingItemData.id.toString()) as Build;
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
                            this.get_reward_data(RewardIdEnum.STAR).max_num += rowData.star;

                            if (0 < rowData.material) {
                                const basePropItemData = new BasePropItemData;
                                basePropItemData.id = rowData.material;
                                basePropItemData.num = rowData.quantity;
                                fightBuildingItemData.reward_array[fightBuildingItemData.reward_array.length] = basePropItemData;
                                const common = this.special_prop_to_common_prop(basePropItemData);
                                this.get_reward_data(common.id).max_num += common.num;

                            } else if (0 < rowData.coin) {
                                const basePropItemData = new BasePropItemData
                                basePropItemData.id = RewardIdEnum.GOLD;
                                basePropItemData.num = rowData.coin;
                                fightBuildingItemData.reward_array[fightBuildingItemData.reward_array.length] = basePropItemData;
                                this.get_reward_data(basePropItemData.id).max_num += basePropItemData.num;
                            }
                        }

                        fightBuildingItemData.array_index = this.building_data_array.length;
                        s.building_index = this.building_data_array.length;
                        this.building_data_array.push(fightBuildingItemData);
                        this.is_main_city(fightBuildingItemData.id) && (t = fightBuildingItemData);
                    } else if (3 == s.item_type) {
                        var l
                        const _ = s.item_id;
                        const F = gm.config.get_row_data("HeroConfigData", _.toString()) as HeroConfig;
                        if (F) {
                            if (10 == F.occupation || 12 == F.occupation) {
                                const fightWallItemData = new FightWallItemData;
                                fightWallItemData.grid_index = s.grid_index;
                                fightWallItemData.grid_position = s.grid_position;
                                fightWallItemData.id = _;
                                fightWallItemData.lv = F.lv;
                                fightWallItemData.skill_id = F.skill_id;
                                fightWallItemData.passive_skill_array = F.passive_skill_array;
                                fightWallItemData.skill_lv = s.skill_lv || 1;
                                fightWallItemData.star_lv = s.star_lv || 0;

                                var d = gm.data.config_data.getStarCfgByID(F.arms, fightWallItemData.star_lv);
                                fightWallItemData.occupation = F.occupation;
                                fightWallItemData.hp = fightWallItemData.max_hp = Math.floor(F.hp * (d ? d.hp + 1 : 1));
                                fightWallItemData.attack_type = F.attack_type;
                                fightWallItemData.attack_anim_time = F.attack_anim_time;
                                fightWallItemData.fly_weapon_name = F.fly_weapon_name;
                                fightWallItemData.fly_weapon_time = F.fly_weapon_time;

                                if ("" != F.fly_weapon_position_array) {
                                    fightWallItemData.fly_weapon_position_array = [];
                                    const p = F.fly_weapon_position_array.split("|");
                                    for (var h = 0; h < p.length; h++) {
                                        const V = p[h].split(",");
                                        if (2 == V.length) {
                                            fightWallItemData.fly_weapon_position_array[h] = cc.v3(parseInt(V[0].trim()), parseInt(V[1].trim()))
                                        } else {
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
                                fightWallItemData.call_range = gm.const.WALL_CALL_RANGE;
                                fightWallItemData.array_index = this.wall_data_array.length;
                                s.wall_index = fightWallItemData.array_index;
                                this.wall_data_array.push(fightWallItemData);

                            } else {
                                const fightHeroItemData = new FightHeroItemData;
                                fightHeroItemData.grid_index = s.grid_index;
                                fightHeroItemData.grid_position = s.grid_position;
                                fightHeroItemData.id = _;
                                fightHeroItemData.lv = F.lv;
                                fightHeroItemData.skill_id = F.skill_id;
                                fightHeroItemData.skill_lv = s.skill_lv || 0;
                                fightHeroItemData.star_lv = s.star_lv || 0;

                                const d = gm.data.config_data.getStarCfgByID(F.arms, fightHeroItemData.star_lv);
                                fightHeroItemData.passive_skill_array = F.passive_skill_array;
                                fightHeroItemData.hero_type = F.hero_type;
                                fightHeroItemData.hp = fightHeroItemData.max_hp = Math.floor(F.hp * (d ? d.hp + 1 : 1));
                                fightHeroItemData.attack_type = F.attack_type;
                                fightHeroItemData.attack_anim_time = F.attack_anim_time;
                                fightHeroItemData.fly_weapon_name = F.fly_weapon_name;
                                fightHeroItemData.fly_weapon_time = F.fly_weapon_time;

                                if ("" != F.fly_weapon_position_array) {
                                    fightHeroItemData.fly_weapon_position_array = [];
                                    const p = F.fly_weapon_position_array.split("|");
                                    for (var u = 0; u < p.length; u++) {
                                        const V = p[u].split(",");
                                        if (2 == V.length) {
                                            fightHeroItemData.fly_weapon_position_array[u] = cc.v3(parseInt(V[0].trim()), parseInt(V[1].trim()));
                                        } else {
                                            // cc.error("配置的数据格式有错误");
                                            cc.error("Định dạng dữ liệu được cấu hình không đúng.");
                                        }
                                    }
                                }

                                fightHeroItemData.attack_value = Math.floor(F.attack * (d ? d.attack + 1 : 1));
                                fightHeroItemData.attack_interval = F.attack_interval;
                                fightHeroItemData.attack_range = F.range;
                                fightHeroItemData.search_range = F.search_range;
                                fightHeroItemData.move_speed = F.speed + (d ? d.speed : 0);
                                fightHeroItemData.defense_value = F.defense + (d ? d.defense : 0);
                                fightHeroItemData.occupation = F.occupation;
                                fightHeroItemData.type = HeroType.DEFENSE;
                                fightHeroItemData.last_attack_time = 0;

                                if (11 == F.occupation) {
                                    fightHeroItemData.array_index = this.passive_hero_data_array.length;
                                    this.passive_hero_data_array.push(fightHeroItemData)
                                } else {
                                    fightHeroItemData.array_index = this.defense_hero_data_array.length;
                                    const l = s.add_defense_hero_index(this.defense_hero_data_array.length);
                                    fightHeroItemData.offset = l.offset;
                                    this.defense_hero_data_array.push(fightHeroItemData);
                                }
                            }
                        }
                    }
                }
            }

            var m = [16003, 17002, 16002, 17002, 16001, 17002, 16001];
            for (let r = 0; r < m.length; r++) {
                const g = m[r];
                const mathRandom = Utils.math_random(!0, 0, n.length);
                if (- 1 < mathRandom) {
                    const splice = n.splice(mathRandom, 1)[0];
                    const itemData = this.map_item_data_array[splice];

                    if ((itemData) && 0 == itemData.item_type) {
                        itemData.item_type = 1;
                        itemData.item_id = g;
                        const fightPropItemData = new FightPropItemData
                        fightPropItemData.grid_index = itemData.grid_index;
                        fightPropItemData.grid_position = itemData.grid_position;
                        fightPropItemData.id = g;
                        fightPropItemData.num = 1;
                        itemData.prop_index = this.prop_data_array.length;
                        this.prop_data_array.push(fightPropItemData);

                        const common = this.special_prop_to_common_prop(fightPropItemData);
                        this.get_reward_data(common.id).max_num += common.num;
                    }
                }
            }

            this.a_star = new AStar;
            let y = undefined;

            for (let r = 0; r < this.map_item_data_array.length; r++) {
                y = this.map_item_data_array[r];
                if ((y) && -1 == y.edge_flag) {
                    y.edge_flag = this.calculate_edge_flag(y.grid_position);
                }
            }

            const v = this.grid = new Grid(this.map_size.x, this.map_size.y);

            for (let r = 0; r < this.map_item_data_array.length; r++) {
                y = this.map_item_data_array[r];
                if ((y) && -1 == y.building_index && -1 == y.wall_index && y.is_obstruct <= 0) {
                    v.setWalkable(y.grid_position.x, y.grid_position.y, true);
                }
            }

            if (t) {
                const D = t.grid_position.x - 3;
                const I = t.grid_position.x + 3;
                const E = t.grid_position.y - 3;
                const C = t.grid_position.y + 3;
                let T = undefined;
                for (let r = D; r <= I; r++) {
                    for (let b = E; b <= C; b++) {
                        T = this.get_fight_map_item_data(r, b);
                        if ((T) && 0 < T.enter) {
                            (T.enter = 0);
                        }
                    }
                }
            }

            const w = this.grid_position_to_floor_position(cc.v2(0, this.map_size.y));
            const N = this.grid_position_to_floor_position(cc.v2(this.map_size.x, 0));
            const A = this.grid_position_to_floor_position(cc.v2(0, 0));
            const O = this.grid_position_to_floor_position(cc.v2(this.map_size.x, this.map_size.y));

            this.min_offset.x = -N.x - cc.Canvas.instance.node.width / 2;
            this.max_offset.x = -w.x + cc.Canvas.instance.node.width / 2;
            this.min_offset.y = 0;
            this.max_offset.y = A.y - O.y;
            this.map_start_position = cc.v3(-396, 1110);
            this.boat_start_position = cc.v3(300, -500);

        } else {
            const RowData = gm.config.get_row_data_array("PlayMapConfigData", this.map_id.toString()) as PlayMap[];

            for (let r = 0; r < RowData.length; r++) {
                const S = RowData[r];
                if (S) {
                    if (0 == r) {
                        this.map_size.x = S.col;
                        this.map_size.y = S.row;
                    }

                    const fightMapItemData = new FightMapItemData();
                    fightMapItemData.grid_index = S.cell_id;
                    fightMapItemData.grid_position = cc.v2(fightMapItemData.grid_index % this.map_size.x,
                        Math.floor(fightMapItemData.grid_index / this.map_size.x));
                    fightMapItemData.position = this.grid_position_to_floor_position(fightMapItemData.grid_position);
                    fightMapItemData.land_id = S.land_img_id;

                    if (0 < S.plant_id) {
                        const fightDecorationItemData = new FightDecorationItemData();
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

            const map = this.map_id + "_" + this.map_data_id;
            let k: PlayCaves[] | PlayCaves[] = undefined;

            if (0 == this.play_type || 1 == this.play_type) {
                k = gm.config.get_row_data_array("PlayDataConfigData", map) as PlayData[];

            } else if (2 == this.play_type) {
                k = gm.config.get_row_data_array("PlayCavesConfigData", map) as PlayCaves[];
            }
            let L;
            let s = undefined;
            let H = (s = undefined, 0);
            for (let r = 0; r < k.length; r++) {
                L = k[r];
                const s = this.map_item_data_array[L.cell_id];
                const S = RowData[r];
                if (s) {
                    s.enter = L.enter;
                    0 < s.enter && H++;
                    s.item_type = L.item_type;
                    s.item_id = L.item_id;
                    s.is_obstruct = L.is_obstruct;
                    if (1 == L.item_type) {
                        const fightPropItemData = new FightPropItemData()
                        fightPropItemData.grid_index = s.grid_index;
                        fightPropItemData.grid_position = s.grid_position;
                        fightPropItemData.id = L.item_id;
                        fightPropItemData.num = 1;
                        s.prop_index = this.prop_data_array.length;
                        this.prop_data_array.push(fightPropItemData);

                        const c = this.special_prop_to_common_prop(fightPropItemData);
                        this.get_reward_data(c.id).max_num += c.num;

                    } else if (2 == L.item_type) {
                        const fightBuildingItemData = new FightBuildingItemData();
                        fightBuildingItemData.grid_index = s.grid_index;
                        fightBuildingItemData.grid_position = s.grid_position;
                        fightBuildingItemData.id = L.item_id;
                        fightBuildingItemData.reward_array = [];
                        const rowData = gm.config.get_row_data("BuildConfigData", fightBuildingItemData.id.toString()) as Build;
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
                            this.get_reward_data(RewardIdEnum.STAR).max_num += rowData.star;

                            if (0 < rowData.material) {
                                const basePropItemData = new BasePropItemData();
                                basePropItemData.id = rowData.material;
                                basePropItemData.num = rowData.quantity;
                                fightBuildingItemData.reward_array[fightBuildingItemData.reward_array.length] = basePropItemData;
                                const common = this.special_prop_to_common_prop(basePropItemData);
                                this.get_reward_data(common.id).max_num += common.num;
                            }

                            if (0 < rowData.coin) {
                                const basePropItemData = new BasePropItemData();
                                basePropItemData.id = RewardIdEnum.GOLD;
                                basePropItemData.num = rowData.coin;
                                fightBuildingItemData.reward_array[fightBuildingItemData.reward_array.length] = basePropItemData;
                                this.get_reward_data(basePropItemData.id).max_num += basePropItemData.num;
                            }
                        }

                        fightBuildingItemData.array_index = this.building_data_array.length;
                        s.building_index = this.building_data_array.length;
                        this.building_data_array.push(fightBuildingItemData);

                    } else if (3 == L.item_type) {
                        const _ = L.item_id;
                        const F = gm.config.get_row_data("HeroConfigData", _.toString()) as HeroConfig;
                        if (F) {
                            if (10 == F.occupation || 12 == F.occupation) {
                                const fightWallItemData = new FightWallItemData();
                                fightWallItemData.grid_index = s.grid_index;
                                fightWallItemData.grid_position = s.grid_position;
                                fightWallItemData.id = _;
                                fightWallItemData.lv = F.lv;
                                fightWallItemData.skill_id = F.skill_id;
                                fightWallItemData.passive_skill_array = F.passive_skill_array;
                                fightWallItemData.skill_lv = L.skill_lv || 0;
                                fightWallItemData.star_lv = L.star_lv || 0;

                                const d = gm.data.config_data.getStarCfgByID(F.arms, fightWallItemData.star_lv);
                                fightWallItemData.occupation = F.occupation;
                                fightWallItemData.hp = fightWallItemData.max_hp = Math.floor(F.hp * (d ? d.hp + 1 : 1));
                                fightWallItemData.attack_type = F.attack_type;
                                fightWallItemData.attack_anim_time = F.attack_anim_time;
                                fightWallItemData.fly_weapon_name = F.fly_weapon_name;
                                fightWallItemData.fly_weapon_time = F.fly_weapon_time;

                                if ("" != F.fly_weapon_position_array) {
                                    fightWallItemData.fly_weapon_position_array = [];
                                    const p = F.fly_weapon_position_array.split("|");
                                    for (var W = 0; W < p.length; W++) {
                                        const V = p[W].split(",")
                                        if (2 == V.length) {
                                            fightWallItemData.fly_weapon_position_array[W] = cc.v3(parseInt(V[0].trim()), parseInt(V[1].trim()));
                                        } else {
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
                                fightWallItemData.call_range = gm.const.WALL_CALL_RANGE;
                                fightWallItemData.array_index = this.wall_data_array.length;
                                s.wall_index = fightWallItemData.array_index;
                                this.wall_data_array.push(fightWallItemData);

                            } else {
                                const fightHeroItemData = new FightHeroItemData();
                                fightHeroItemData.grid_index = s.grid_index;
                                fightHeroItemData.grid_position = s.grid_position;
                                fightHeroItemData.id = _;
                                fightHeroItemData.lv = F.lv;
                                fightHeroItemData.skill_id = F.skill_id;
                                fightHeroItemData.skill_lv = L.skill_lv || 0;
                                fightHeroItemData.star_lv = L.star_lv || 0;

                                const d = gm.data.config_data.getStarCfgByID(F.arms, fightHeroItemData.star_lv);
                                fightHeroItemData.passive_skill_array = F.passive_skill_array;
                                fightHeroItemData.hero_type = F.hero_type;
                                fightHeroItemData.hp = fightHeroItemData.max_hp = Math.floor(F.hp * (d ? d.hp + 1 : 1));
                                fightHeroItemData.attack_type = F.attack_type;
                                fightHeroItemData.attack_anim_time = F.attack_anim_time;
                                fightHeroItemData.fly_weapon_name = F.fly_weapon_name;
                                fightHeroItemData.fly_weapon_time = F.fly_weapon_time;

                                if ("" != F.fly_weapon_position_array) {
                                    fightHeroItemData.fly_weapon_position_array = [];
                                    const p = F.fly_weapon_position_array.split("|");
                                    let V;
                                    for (let K = 0; K < p.length; K++) {
                                        if (2 == (V = p[K].split(",")).length) {
                                            fightHeroItemData.fly_weapon_position_array[K] = cc.v3(parseInt(V[0].trim()), parseInt(V[1].trim()));
                                        } else {
                                            // cc.error("配置的数据格式有错误");
                                            cc.error("Định dạng dữ liệu được cấu hình không đúng.");
                                        }
                                    }
                                }

                                fightHeroItemData.attack_value = Math.floor(F.attack * (d ? d.attack + 1 : 1));
                                fightHeroItemData.attack_interval = F.attack_interval;
                                fightHeroItemData.attack_range = F.range;
                                fightHeroItemData.search_range = F.search_range;
                                fightHeroItemData.move_speed = F.speed + (d ? d.speed : 0);
                                fightHeroItemData.defense_value = F.defense + (d ? d.defense : 0);
                                fightHeroItemData.occupation = F.occupation;
                                fightHeroItemData.type = HeroType.DEFENSE;
                                fightHeroItemData.last_attack_time = 0;

                                if (11 == F.occupation) {
                                    fightHeroItemData.array_index = this.passive_hero_data_array.length;
                                    this.passive_hero_data_array.push(fightHeroItemData);
                                } else {
                                    fightHeroItemData.array_index = this.defense_hero_data_array.length;
                                    const l = s.add_defense_hero_index(this.defense_hero_data_array.length);
                                    fightHeroItemData.offset = l.offset;
                                    this.defense_hero_data_array.push(fightHeroItemData);
                                }
                            }
                        }
                    }
                }
            }

            const D = cc.js.formatStr("map_id:%d,map_data_id:%d Bảng cấu hình số điểm hạ cánh %d", this.map_id, this.map_data_id, H);
            H <= 0 ? console.error(D) : console.log(D);
            this.a_star = new AStar;
            let y = undefined;
            for (let r = 0; r < this.map_item_data_array.length; r++) {
                const y = this.map_item_data_array[r];
                if (y && -1 == y.edge_flag) {
                    (y.edge_flag = this.calculate_edge_flag(y.grid_position));
                }
            }

            const v = this.grid = new Grid(this.map_size.x, this.map_size.y);
            for (let r = 0; r < this.map_item_data_array.length; r++) {
                const y = this.map_item_data_array[r];
                if (y && -1 == y.building_index && -1 == y.wall_index && y.is_obstruct <= 0) {
                    v.setWalkable(y.grid_position.x, y.grid_position.y, true);
                }
            }

            const w = this.grid_position_to_floor_position(cc.v2(0, this.map_size.y));
            const N = this.grid_position_to_floor_position(cc.v2(this.map_size.x, 0));
            const A = this.grid_position_to_floor_position(cc.v2(0, 0));
            const O = this.grid_position_to_floor_position(cc.v2(this.map_size.x, this.map_size.y));

            this.min_offset.x = -N.x - cc.Canvas.instance.node.width / 2;
            this.max_offset.x = -w.x + cc.Canvas.instance.node.width / 2;
            this.min_offset.y = 0;
            this.max_offset.y = A.y - O.y;
            this.map_start_position = cc.v3(-160, 166);
            this.boat_start_position = cc.v3(160, 210);
        }

        return this.map_item_data_array;
    } // end: build_play_map_data

    // @
    public getWalkable(position: cc.Vec2): boolean {
        return this.grid.getWalkable(position.x, position.y);
    }

    // @
    private get_alive_defense_hero_hp(hero_id: number): number {
        for (let index = 0; index < this.fight_result_data.alive_defense_hero_data_array.length; index++) {
            const defenseHero = this.fight_result_data.alive_defense_hero_data_array[index];
            if (defenseHero.id == hero_id) {
                return defenseHero.hp;
            }
        }
        return 0;
    }

    // @
    public get_all_result_data(): void {
        const resultData: number[] = [];
        let propDataArray = this.fight_result_data.prop_data_array;
        if (gm.data.mapCell_data.isGuide) {
            propDataArray = [];
            const guideRewards = [
                [12001, 1],
                [11004, 14],
                [11005, 2],
                [13001, 1]
            ];
            for (let i = 0; i < guideRewards.length; i++) {
                const rewardItem = new FightResultPropItemData();
                rewardItem.type = 1;
                rewardItem.id = guideRewards[i][0];
                rewardItem.num = guideRewards[i][1];
                rewardItem.color = 1;
                propDataArray.push(rewardItem);
            }
        }
        //
        let diamondCount = 0;
        const garrisonData = gm.data.mapCell_data.getBuildDataByType(BuildTypeEnum.GARRISION_TYPE);
        for (let i = 0; i < propDataArray.length; i++) {
            const prop = propDataArray[i];
            if (prop.id !== RewardIdEnum.DIAMOND) {
                if (prop.id === RewardIdEnum.WOOD) {
                    prop.id = 16001;
                } else if (prop.id === RewardIdEnum.IRON) {
                    prop.id = 17001;
                }
                //
                if (!garrisonData || garrisonData.buildLvl < 1) {
                    if (prop.id < 30000) {
                        const itemCfg = gm.data.config_data.getItemCfgByID(prop.id);
                        if (itemCfg) {
                            if (
                                itemCfg.type === PropTypeEnum.WOOD_TYPE ||
                                itemCfg.type === PropTypeEnum.IRON_TYPE ||
                                itemCfg.type === PropTypeEnum.SHELL_MONEY_TYPE
                            ) {
                                let currencyId = 0;
                                if (itemCfg.type === PropTypeEnum.WOOD_TYPE) {
                                    currencyId = 16008;
                                } else if (itemCfg.type === PropTypeEnum.IRON_TYPE) {
                                    currencyId = 17008;
                                } else if (itemCfg.type === PropTypeEnum.SHELL_MONEY_TYPE) {
                                    currencyId = 25008;
                                }
                                gm.data.mapCell_data.splitItemNum(prop.num * this.map_end_many_times, currencyId, 1);
                            } else {
                                for (let j = 0; j < prop.num * this.map_end_many_times; j++) {
                                    resultData.push(prop.id);
                                }
                            }
                        }
                    } else {
                        for (let j = 0; j < prop.num * this.map_end_many_times; j++) {
                            resultData.push(prop.id);
                        }
                    }
                } else {
                    const splitItem = gm.data.high_to_low_level_prop(prop.id, prop.num * this.map_end_many_times);
                    const highProp = gm.data.low_level_to_high_prop(splitItem.item_id, splitItem.item_num);
                    for (let j = 0; j < highProp.length; j++) {
                        const highItem = highProp[j];
                        for (let k = 0; k < highItem.item_num; k++) {
                            resultData.push(highItem.item_id);
                        }
                    }
                }
            } else {
                diamondCount = prop.num * this.map_end_many_times;
            }
        } // end: for

        // Xử lý kết thúc battle
        gm.data.mapCell_data.isFirstBattle = false;
        gm.data.mapCell_data.addWareHouseList(resultData);
        const heroBattleData: { unique_id: number, id: number, hp: number }[] = [];
        const defenseHeroData: { unique_id: number, id: number, hp: number }[] = [];

        if (this.goal_uid !== "" && this.play_type === 0 && this.defensive_data) {
            for (let i = 0; i < this.hero_data_array.length; i++) {
                const hero = this.hero_data_array[i];
                heroBattleData.push({
                    unique_id: 0,
                    id: hero.id,
                    hp: hero.hp
                });
            }
            //
            for (let i = 0; i < this.defensive_data.hero_data_array.length; i++) {
                const defenseHero = this.defensive_data.hero_data_array[i];
                defenseHeroData.push({
                    unique_id: defenseHero.unique_id,
                    id: defenseHero.hero_id,
                    hp: this.get_alive_defense_hero_hp(defenseHero.hero_id)
                });
            }
        }

        this.hero_data_array = [];
        const ladderLevel = gm.data.ladder_temp_data.convert_rank_to_lv(gm.data.ladder_temp_data.rank);
        const ladderConfig = gm.config.get_row_data("LadderLvConfigData", ladderLevel.toString()) as LadderLVConfig;
        //
        if (this.fight_result_data.result === 1) {
            if (this.goal_uid && this.play_type === 0) {
                const rewardItems: { id: number, num: number }[] = [];
                const nonStarRewards: { id: number, num: number }[] = [];
                for (let i = 0; i < propDataArray.length; i++) {
                    rewardItems.push({
                        id: propDataArray[i].id,
                        num: propDataArray[i].num
                    });
                }
                //
                const specialRewardIds = [RewardIdEnum.STAR, RewardIdEnum.GOLD, RewardIdEnum.DIAMOND];
                for (let i = 0; i < propDataArray.length; i++) {
                    if (specialRewardIds.indexOf(propDataArray[i].id) === -1) {
                        nonStarRewards.push({
                            id: propDataArray[i].id,
                            num: propDataArray[i].num
                        });
                    }
                }
                gm.data.update_player_fight_data(
                    this.fight_result_data.star_num,
                    this.defensive_data.uid,
                    this.defensive_data.nickname,
                    this.defensive_data.star,
                    -this.fight_result_data.star_num,
                    this.fight_result_data.result,
                    rewardItems,
                    nonStarRewards,
                    heroBattleData,
                    defenseHeroData
                );
            } else {
                gm.data.update_player_score_data_request(gm.data.ladder_temp_data.total_star + this.fight_result_data.star_num);
            }
            gm.data.ladder_temp_data.change_star_num(this.fight_result_data.star_num);
        } else {
            const garrisonData = gm.data.mapCell_data.getBuildDataByType(BuildTypeEnum.GARRISION_TYPE);
            if (garrisonData && garrisonData.buildLvl >= 1) {
                gm.data.ladder_temp_data.change_star_num(-ladderConfig.failed_star);
                if (this.goal_uid !== "" && this.play_type === 0) {
                    const rewardItems: { id: number, num: number }[] = [];
                    const nonStarRewards: { id: number, num: number }[] = [];
                    for (let i = 0; i < propDataArray.length; i++) {
                        rewardItems.push({
                            id: propDataArray[i].id,
                            num: propDataArray[i].num
                        });
                    }
                    gm.data.update_player_fight_data(
                        -ladderConfig.failed_star,
                        this.defensive_data.uid,
                        this.defensive_data.nickname,
                        this.defensive_data.star,
                        ladderConfig.success_star,
                        this.fight_result_data.result,
                        rewardItems,
                        nonStarRewards,
                        heroBattleData,
                        defenseHeroData
                    );
                } else {
                    gm.data.update_player_score_data_request(gm.data.ladder_temp_data.total_star - ladderConfig.failed_star);
                }
            }
        }
        if (diamondCount > 0) {
            gm.data.mapCell_data.setAddGameDiamond(SetItemNumEnum.ADD_ITEM_TYPE, diamondCount);
            if (gm.ui.mapMainUI && gm.ui.mapMainUI.ship) {
                gm.ui.show_coin_fly(RewardIdEnum.DIAMOND, gm.ui.mapMainUI.ship.convertToWorldSpaceAR(cc.Vec3.ZERO));
            }
        }
        gm.data.mapCell_data.setAddGameCoin(
            SetItemNumEnum.ADD_ITEM_TYPE,
            this.fight_result_data.gold_num * this.map_end_many_times
        );
        gm.ui.mapMainUI.showBattleEndCoin(this.fight_result_data.gold_num * this.map_end_many_times);
    } // end: get_all_result_data

    // @
    public build_fight_result_data(isDebug = false): void {
        const fightResult = new FightResultData;

        fightResult.result = this.fight_state == FightState.SUCCESS ? 1 : 2;
        fightResult.attacker_name = "???";
        fightResult.defender_name = this.name;
        fightResult.bucket_num = 0;
        fightResult.prop_data_array = [];

        if (!isDebug) {
            for (let r = 0; r < this.reward_data_array.length; r++) {
                const rewardData = this.reward_data_array[r];
                if (rewardData.id == RewardIdEnum.STAR) {
                    fightResult.star_num = rewardData.num;
                } else if (rewardData.id == RewardIdEnum.GOLD) {
                    fightResult.gold_num = rewardData.num;
                } else if (0 < rewardData.num) {
                    const fightResultPropItemData = new FightResultPropItemData;
                    fightResultPropItemData.type = 1;
                    fightResultPropItemData.id = rewardData.id;
                    fightResultPropItemData.num = 0 < rewardData.max_num ? Math.min(rewardData.num, rewardData.max_num) : rewardData.num;
                    const rowData = gm.config.get_row_data("ItemConfigData", fightResultPropItemData.id.toString()) as ItemConfig;
                    fightResultPropItemData.color = rowData ? rowData.color : 1;
                    fightResult.prop_data_array.push(fightResultPropItemData);
                }
            }
        }

        fightResult.death_hero_data_array = [];
        fightResult.alive_hero_data_array = [];
        for (let r = 0; r < this.hero_data_array.length; r++) {
            const e = this.hero_data_array[r];
            if (e.hp <= 0 && !isDebug) {
                const fightResultPropItemData = new FightResultPropItemData;
                fightResultPropItemData.type = 2;
                fightResultPropItemData.color = 1;
                fightResultPropItemData.id = e.id;
                fightResultPropItemData.num = 1;
                fightResult.death_hero_data_array.push(fightResultPropItemData);
            } else {
                fightResult.alive_hero_data_array.push(e);
            }
        }

        fightResult.alive_defense_hero_data_array = [];
        for (let r = 0; r < this.defense_hero_data_array.length; r++) {
            const a = this.defense_hero_data_array[r];
            if (a && 0 < a.hp) {
                fightResult.alive_defense_hero_data_array.push(a);
            }
        }
        this.fight_result_data = fightResult;
    } // end: build_fight_result_data

    // @
    public get_battle_hero_is_space(): boolean | undefined {
        const boat = gm.data.mapCell_data.buildData[BuildTypeEnum.SEAGOINGBOAT_TYPE];
        const boatConfig = gm.data.config_data.getBuildCfgByID(boat.buildID);
        if (boatConfig) {
            return this.battle_hero_array.length < boatConfig.capacity;
        }
        return undefined;
    }
    // @
    public get_defense_hero_is_space(): boolean {
        const defenseBuilding = gm.data.mapCell_data.buildData[BuildTypeEnum.GARRISION_TYPE];
        if (defenseBuilding && defenseBuilding.buildLvl >= 1) {
            const config = gm.data.config_data.getBuildCfgByID(defenseBuilding.buildID);
            return config ? Object.keys(gm.data.mapCell_data.getDefanseHeroData()).length < config.capacity : undefined;
        }
        return false;
    }
    // @
    public getFightSuperHeroNum(): number {
        let count = 0;
        for (let hero of this.battle_hero_array) {
            if (gm.data.config_data.getHeroCfgByID(hero.itemID).hero_type === HeroTypeEnum.SUPER_HERO_TYPE) {
                count++;
            }
        }
        return count;
    }

    // @
    public build_hero_array(isDebug = false): void {
        if (gm.data.fight_temp_data.is_debug) {
            this.battle_hero_array = [];
            const heroIds = [31001, 31002, 31003, 32001, 32002, 32003, 33001, 33002, 33003, 34001, 34002, 34003];
            for (let index = 0; index < heroIds.length; index++) {
                const heroItem = new roleGoBattleItemVO;
                heroItem.itemID = heroIds[index];
                this.battle_hero_array[this.battle_hero_array.length] = heroItem;

            }
        }

        for (let index = 0; index < this.battle_hero_array.length; index++) {
            var i;
            const battleHerro = this.battle_hero_array[index];
            const fightHeroItemData = new FightHeroItemData;
            fightHeroItemData.id = battleHerro.itemID;
            fightHeroItemData.cellID = battleHerro.cellID;
            const rowData = gm.config.get_row_data("HeroConfigData", fightHeroItemData.id.toString()) as HeroConfig;
            if (rowData) {
                fightHeroItemData.lv = rowData.lv;
                fightHeroItemData.skill_id = rowData.skill_id;
                fightHeroItemData.passive_skill_array = rowData.passive_skill_array;
                fightHeroItemData.hero_type = rowData.hero_type;

                const heroStar = gm.data.hero_star_data.getHeroStarData(rowData.arms);

                fightHeroItemData.star_lv = heroStar ? heroStar.star : 0;
                if (1 == rowData.hero_type) {
                    fightHeroItemData.skill_lv = rowData.lv;
                    if (gm.data.fight_temp_data.is_debug) {
                        fightHeroItemData.hp = fightHeroItemData.max_hp = Math.floor(rowData.hp * (heroStar ? heroStar.hp + 1 : 1));
                    } else {
                        fightHeroItemData.max_hp = Math.floor(rowData.hp * (heroStar ? heroStar.hp + 1 : 1));
                        fightHeroItemData.hp = isDebug ? fightHeroItemData.max_hp : battleHerro.hp;
                    }
                } else {
                    if (gm.data.fight_temp_data.is_debug) {
                        fightHeroItemData.skill_lv = 1;
                    } else {
                        fightHeroItemData.skill_lv = gm.data.mapCell_data.getRoleSkillData(fightHeroItemData.skill_id).lvl;
                    }
                    fightHeroItemData.hp = fightHeroItemData.max_hp = Math.floor(rowData.hp * (heroStar ? heroStar.hp + 1 : 1));
                }
                fightHeroItemData.attack_type = rowData.attack_type;
                fightHeroItemData.attack_anim_time = rowData.attack_anim_time;
                fightHeroItemData.fly_weapon_name = rowData.fly_weapon_name;
                fightHeroItemData.fly_weapon_time = rowData.fly_weapon_time;

                if ("" != rowData.fly_weapon_position_array) {
                    fightHeroItemData.fly_weapon_position_array = [];
                    const weaponPosition = rowData.fly_weapon_position_array.split("|");
                    if (2 == weaponPosition.length) {
                        for (let c = 0; c < weaponPosition.length; c++) {
                            const position = weaponPosition[c].split(",");
                            if (2 == position.length) {
                                fightHeroItemData.fly_weapon_position_array[c] = cc.v3(parseInt(position[0].trim()), parseInt(position[1].trim()));
                            } else {
                                // cc.error("配置的数据格式有错误");
                                cc.error("Định dạng dữ liệu được cấu hình không đúng.");
                            }
                        }
                    } else {
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

            fightHeroItemData.type = HeroType.ATTACK;
            fightHeroItemData.last_attack_time = 0;
            fightHeroItemData.array_index = index;
            this.hero_data_array.push(fightHeroItemData);
        }
    } // end: build_hero_array

    // @
    public build_reward_array(): void {
        gm.data.fight_temp_data.is_debug;
    }

    // @
    private build_fight_match_data_array(): void {
        this.fight_match_data_array = [];
        const configData = gm.config.get_config_data("FightMatchConfigData");
        for (const key in configData.data) {
            const data = configData.data[key] as MatchConfig;
            const matchData = new FightMatchData();
            matchData.id = data.id;
            const randomMapArray = data.random_map_array.split("|");
            for (let n = 0; n < randomMapArray.length; n++) {
                matchData.random_map_array[n] = parseInt(randomMapArray[n]);
            }
            const failTwoRandomMapArray = data.fail_two_random_map_array.split("|");
            for (let n = 0; n < failTwoRandomMapArray.length; n++) {
                matchData.fail_two_random_map_array[n] = parseInt(failTwoRandomMapArray[n]);
            }
            matchData.battle_map_id = data.battle_map_id;
            const battleDataArray = data.battle_data_array.split("|");
            for (let n = 0; n < battleDataArray.length; n++) {
                matchData.battle_data_array[n] = parseInt(battleDataArray[n]);
            }
            matchData.psychedelic_map_id = data.psychedelic_map_id;
            const psychedelicDataArray = data.psychedelic_data_array.split("|");
            for (let n = 0; n < psychedelicDataArray.length; n++) {
                matchData.psychedelic_data_array[n] = parseInt(psychedelicDataArray[n]);
            }
            matchData.random_name_id = data.random_name_id;
            this.fight_match_data_array[matchData.id - 1] = matchData;
        }
    } // end: build_fight_match_data_array

    // @
    public match_fight(): void {
        this.goal_uid = "";
        if (this.goal_uid != gm.data.mail_temp_data.target_uid) {
            gm.data.match_player(gm.data.mail_temp_data.target_uid);
            (gm.data.mail_temp_data.target_uid = "");
            return;
        }
        const t = gm.data.mapCell_data.getBuildDataByType(BuildTypeEnum.GARRISION_TYPE);

        if (t && 1 <= t.buildLvl && gm.data.ladder_data.fight_count > ChannelManager.LEVEL_CONFIG.level_array.length) {
            gm.data.match_player();
        } else {
            this.match_map_by_ladder_lv();
            gm.ui.show_fight();
            gm.channel.report_event("fight", {
                event_desc: "突袭",
                desc: "开始"
            });
            ReportData.instance.report_once_point(10821);
            ReportData.instance.report_point(10822);
        }
    }

    // @
    public match_map_by_ladder_lv(): boolean {
        const ladderData = gm.data.ladder_data;
        if (0 == this.fight_match_data_array.length) {
            this.build_fight_match_data_array();
        }

        if (gm.data.mapCell_data.isGuide && !this.is_debug) {
            this.play_type = 0;
            this.map_id = 2;
            this.map_data_id = 1;
            this.boat_id = 60001;
            const matchData = this.fight_match_data_array[0];

            this.name = this.get_random_name(matchData.random_name_id);
            ladderData.fight_count++;
            ladderData.async_write_data();
            return true;
        }

        if (ladderData.achievement_id < 1) {
            ladderData.achievement_id = 1;
        } else if (ladderData.achievement_id > this.fight_match_data_array.length) {
            ladderData.achievement_id = this.fight_match_data_array.length;
        }

        if (ladderData.fight_count < ChannelManager.LEVEL_CONFIG.level_array.length) {
            this.play_type = 0;
            const levelConfig = ChannelManager.LEVEL_CONFIG.level_array[ladderData.fight_count].split("-");
            this.map_id = 2 == levelConfig.length ? parseInt(levelConfig[0].trim()) : 2;
            this.map_data_id = 2 == levelConfig.length ? parseInt(levelConfig[1].trim()) : ladderData.fight_count + 1;

            const matchData = this.fight_match_data_array[0];
            this.name = this.get_random_name(matchData.random_name_id);
            const mapcellData = gm.data.mapCell_data.getBuildDataByType(BuildTypeEnum.SEAGOINGBOAT_TYPE);
            this.boat_id = mapcellData ? mapcellData.buildID : 60001;
            ladderData.fight_count++;
            ladderData.async_write_data();
            return true;
        }

        const matchData = this.fight_match_data_array[ladderData.achievement_id - 1]
        if (matchData) {
            const randomIndex = ladderData.fail_count < 2 ? this.get_random_index(matchData.random_map_array) : this.get_random_index(matchData.fail_two_random_map_array);
            if (0 == randomIndex) {
                this.play_type = 0;
                this.map_id = matchData.battle_map_id;
                this.map_data_id = matchData.battle_data_array[Utils.math_random(true, 0, matchData.battle_data_array.length)];
                this.name = this.get_random_name(matchData.random_name_id);
                const mapcellData = gm.data.mapCell_data.getBuildDataByType(BuildTypeEnum.SEAGOINGBOAT_TYPE);
                this.boat_id = mapcellData ? mapcellData.buildID : 60001;
                ladderData.fight_count++;
                ladderData.async_write_data();
                return true;
            }

            if (1 == randomIndex) {
                this.play_type = 1;
                this.map_id = matchData.psychedelic_map_id;
                this.map_data_id = matchData.psychedelic_data_array[Utils.math_random(true, 0, matchData.psychedelic_data_array.length)];
                this.name = "迷幻岛";
                const mapcellData = gm.data.mapCell_data.getBuildDataByType(BuildTypeEnum.SEAGOINGBOAT_TYPE);
                this.boat_id = mapcellData ? mapcellData.buildID : 60001;
                ladderData.fight_count++;
                ladderData.async_write_data();
                return true;
            }
        }
        return false;
    } // end: match_map_by_ladder_lv

    // @
    public match_caves_map(): boolean {
        const fightData = gm.data.fight_data;
        const cavesLevelConfig = gm.config.get_config_data("CavesLevelConfigData");
        const totalLayers = Object.keys(cavesLevelConfig.data).length;
        if (fightData.caves_layer <= totalLayers) {
            this.play_type = 2;
            const rowData = gm.config.get_row_data("CavesLevelConfigData", fightData.caves_layer.toString()) as CavesLevel;
            if (rowData) {
                this.map_id = rowData.map_id;
                this.map_data_id = rowData.data_id;
            }
            // 洞窟第%d层 -> Cave level %d
            this.name = cc.js.formatStr("Cave level %d", fightData.caves_layer);
            return true;
        }
        return false;
    }

    // @
    public match_happy_map(): void {
        this.play_type = 1;
        this.map_id = Utils.math_random(true, 20, 24);
        this.map_data_id = Utils.math_random(true, 1, 9);
        this.name = "Đảo Ảo Giác"; // 梦幻岛 -> Neverland
    }

    // @
    private get_random_index(array: number[]): number {
        let total = 0;
        for (let i = 0; i < array.length; i++) {
            total += array[i];
        }
        const randomValue = Math.random() * total;
        let cumulative = 0;
        for (let i = 0; i < array.length; i++) {
            cumulative += array[i];
            if (cumulative > randomValue) {
                return i;
            }
        }
        return -1;
    }

    // @
    private get_random_name(t: number): string {
        // 无名岛 -> Unknown Island
        const namePool = gm.config.get_row_data_array("NamePoolConfigData", t.toString()) as NamePool[];
        return namePool && namePool.length > 0 ? namePool[Utils.math_random(true, 0, namePool.length)].name : "Unknown Island";
    }

    // @
    public get_reward_data(t: number): FightRewardItemData {
        for (let reward of this.reward_data_array) {
            if (reward && reward.id === t) return reward;
        }
        const newReward = new FightRewardItemData();
        newReward.id = t;
        newReward.num = 0;
        let inserted = false;
        for (let i = 0; i < this.reward_data_array.length; i++) {
            const reward = this.reward_data_array[i];
            if (!inserted && newReward.id < reward.id) {
                newReward.index = i;
                this.reward_data_array.splice(i, 0, newReward);
                inserted = true;
            } else {
                reward.index = i;
            }
        }
        if (!inserted) {
            newReward.index = this.reward_data_array.length;
            this.reward_data_array.push(newReward);
        }
        return newReward;
    }

    // @
    public grid_position_to_position(Vec2: cc.Vec2): cc.Vec3 {
        const itemData = this.get_fight_map_item_data(Vec2.x, Vec2.y);
        const position = this.offset_col.mul(Vec2.x).add(this.offset_row.mul(Vec2.y));
        return itemData ? cc.v3(position.x, position.y + itemData.land_y_offset) : cc.v3(position.x, position.y)
    }

    // @
    public grid_position_to_floor_position(t: cc.Vec2): cc.Vec3 {
        return cc.v3(this.offset_col.mul(t.x).add(this.offset_row.mul(t.y)))
    }

    // @
    public get_fight_map_item(x: number, y: number): FightMapItem {
        return this.map_item_array[y * this.map_size.x + x];
    }

    // @
    public get_fight_map_item_data(x: number, y: number): FightMapItemData {
        return this.map_item_data_array[y * this.map_size.x + x]
    }

    // @
    public has_wall_item_data(t: cc.Vec2): boolean {
        for (let index = 0; index < this.wall_data_array.length; index++) {
            const wallData = this.wall_data_array[index]
            if (wallData && wallData.grid_position.equals(t)) return true;;
        }
        return false;
    }

    // h (chưa xác định được I)
    private calculate_edge_flag(t: cc.Vec2): number {
        var e, a, i = 0;
        for (a in this.edge_map) {
            !((e = t.add(this.edge_map[a])).x < 0 || e.x >= this.map_size.x || e.y < 0 || e.y >= this.map_size.y) &&
                this.map_item_data_array[e.x + e.y * this.map_size.x] || (i |= EdgeEnum[a as keyof typeof EdgeEnum]);
        }
        return i;
    }

    // @
    public pick_up_prop(index: number): void {
        if (!(index < 0 || index >= this.prop_data_array.length)) {
            const propData = this.prop_data_array[index];
            if (propData) {
                const commonProp = this.special_prop_to_common_prop(propData);
                const data = this.get_reward_data(commonProp.id)
                data.num += commonProp.num;
                this.prop_data_array[index] = null;
                gm.data.event_emitter.emit("pick_up_prop", data.index);
            }
        }

    }

    // @
    public get_building_destroy_reward(t: number, e: FightBuildingItemData): void {
        const starReward = this.get_reward_data(RewardIdEnum.STAR);
        starReward.num += e.star_count;
        gm.data.event_emitter.emit("pick_up_prop", starReward.index);
        // gm.data.event_emitter.emit("pick_up_prop", starReward.index); gốc: lặp lại 2 lần
        const buildingItem = this.building_item_array[t];
        for (let i = 0; i < e.reward_array.length; i++) {
            const reward = e.reward_array[i];
            const commonProp = this.special_prop_to_common_prop(reward);
            const rewardData = this.get_reward_data(commonProp.id);
            rewardData.num += commonProp.num;
            gm.data.event_emitter.emit("pick_up_prop", rewardData.index);
            if (buildingItem) {
                gm.ui.fight.fly_to_boat(buildingItem.reward_spr_array[i].node, true);
            }
        }
    }

    // @
    public get_main_city(): FightBuildingItemData {
        for (let index = 0; index < this.building_data_array.length; index++) {
            const buildingData = this.building_data_array[index]
            if (buildingData && 51e3 <= buildingData.id && buildingData.id < 52e3) {
                return buildingData;
            }
        }
    }

    // @
    public is_main_city(t: number): boolean {
        return 51e3 <= t && t < 52e3 || 61001 <= t && t < 62e3 || 63001 <= t && t < 64e3;
    }

    // @
    public is_lighthouse(t: number): boolean {
        return 59e3 <= t && t < 6e4;
    }

    // @
    private special_prop_to_common_prop(fightPropItem: BasePropItemData): BasePropItemData { // FightPropItemData
        const commonProp = new BasePropItemData;
        if (16001 <= fightPropItem.id && fightPropItem.id <= 16099) {
            const itemData = gm.config.get_row_data("ItemConfigData", fightPropItem.id + "") as ItemConfig;
            commonProp.id = RewardIdEnum.WOOD;
            commonProp.num = itemData.number * fightPropItem.num;
        } else if (17001 <= fightPropItem.id && fightPropItem.id <= 17099) {
            const itemData = gm.config.get_row_data("ItemConfigData", fightPropItem.id + "") as ItemConfig;
            commonProp.id = RewardIdEnum.IRON;
            commonProp.num = itemData.number * fightPropItem.num;
        } else if (24001 <= fightPropItem.id && fightPropItem.id <= 24099) {
            const itemData = gm.config.get_row_data("ItemConfigData", fightPropItem.id + "") as ItemConfig;
            commonProp.id = RewardIdEnum.DIAMOND;
            commonProp.num = itemData.number * fightPropItem.num;
        } else {
            const convertedProp = gm.data.high_to_low_level_prop(fightPropItem.id, fightPropItem.num);
            commonProp.id = convertedProp.item_id;
            commonProp.num = convertedProp.item_num;
        }
        return commonProp;
    }

    // @
    public get_dynamic_node_layer(index: number, layer: number): number {
        return index * FightDynamicNodeLayer.MAX + layer
    }
}



export class FightHeroItemData {
    public grid_index: number;
    public grid_position: cc.Vec2;
    public array_index: number;
    public id: number;
    public cellID: number;
    public lv: number;
    public skill_id: number;
    public skill_lv: number;
    public star_lv: number;
    public in_battle_state: HeroInBattleState;
    public defense_value: number;
    public hp: number;
    public max_hp: number;
    public attack_type: AttackType;
    public attack_anim_time: number;
    public fly_weapon_name: string;
    public fly_weapon_time: number;
    public fly_weapon_position_array: cc.Vec3[];
    public attack_value: number;
    public last_attack_time: number;
    public attack_count: number;
    public attack_interval: number;
    public attack_range: number;
    public search_range: number;
    public move_speed: number;
    public move_start: Node | null; // chưa xác định
    public move_end: Node | null; // chưa xác định
    public move_path: Node[]; // chưa xác định
    public offset: cc.Vec3;
    public type: HeroType;
    public state: HeroState;
    public fight_state: HeroFightState;
    public radian: number;
    public occupation: number;
    public buff_data_array: BuffItemData[]; // ????? chưa xác định
    public move_speed_scale: number;
    public reduce_damage_ratio: number;
    public attack_speed_ratio: number;
    public attack_bonus_ratio: number;
    public defense_bonus_ratio: number;
    public restore_hp_ratio: number;
    public passive_attack_bonus_ratio: number;
    public passive_defense_bonus_ratio: number;
    public passive_skill_array: number[]; // ?????
    public hero_type: HeroTypeEnum;
    public find_path_target: FightPropItemData | FightBuildingItemData | FightHeroItemData | FightWallItemData;
    // call_range: number;

    // @
    constructor() {
        this.grid_index = 0;
        this.grid_position = cc.Vec2.ZERO;
        this.array_index = -1;
        this.id = 0;
        this.cellID = 0;
        this.lv = 0;
        this.skill_id = 0;
        this.skill_lv = 0;
        this.star_lv = 0;
        this.in_battle_state = HeroInBattleState.NOT_IN_BATTLE;
        this.defense_value = 0;
        this.hp = 0;
        this.max_hp = 0;
        this.attack_type = AttackType.NONE;
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
        this.type = HeroType.FREEDOM;
        this.state = HeroState.ALIVE;
        this.fight_state = HeroFightState.WAITING;
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

    // @
    public get real_attack_value(): number {
        return Math.floor(this.attack_value * (1 + Math.max(this.attack_bonus_ratio + this.passive_attack_bonus_ratio, 0)));
    }

    // @
    public get real_defense_value(): number {
        return Math.floor(this.defense_value * (1 + Math.max(this.defense_bonus_ratio + this.passive_defense_bonus_ratio, 0)));
    }

    // @
    public get real_attack_interval(): number {
        return this.attack_interval / (1 + Math.max(this.attack_speed_ratio, 0));
    }

    // @
    public get real_move_speed(): number {
        return Math.floor(this.move_speed * this.move_speed_scale);
    }

    // @
    public get real_restore_hp(): number {
        return Math.floor(this.max_hp * this.restore_hp_ratio);
    }

    // @
    public change_hp(amount: number): void {
        if (amount < 0) {
            amount *= Math.max(1 - this.reduce_damage_ratio, 0);
            amount = Math.min(0, amount + this.real_defense_value);
            this.hp = Math.max(0, Math.min(this.max_hp, this.hp + amount));
        } else {
            this.hp = Math.min(this.max_hp, this.hp + amount);
        }
    }
}



export class BasePropItemData {
    public id: number;
    public num: number;
    //
    constructor() {
        this.id = 0;
        this.num = 0;
    }
} // end: BasePropItemData class


export class FightPropItemData extends BasePropItemData {
    public grid_index: number;
    public grid_position: cc.Vec2;
    public hp: number;
    public array_index: number;
    //
    constructor() {
        super();
        this.grid_index = 0;
        this.grid_position = cc.Vec2.ZERO;
    }
} // end: FightPropItemData class

// @
export class FightDecorationItemData {
    public grid_index: number;
    public grid_position: cc.Vec2;
    public array_index: number;
    public decoration_id: number;
    public plant_x_offset: number;
    public plant_y_offset: number;
    //
    constructor() {
        this.grid_index = 0;
        this.grid_position = cc.Vec2.ZERO;
        this.array_index = 0;
        this.decoration_id = 0;
        this.plant_x_offset = 0;
        this.plant_y_offset = 0;
    }
} // end: FightDecorationItemData class

// @
export class FightResultPropItemData extends BasePropItemData {
    public type: number;
    public color: number;
    //
    constructor() {
        super();
        this.type = 0;
        this.color = 0;
    }
} // end: FightResultPropItemData class

// @
export class FightRewardItemData extends BasePropItemData {
    public index: number;
    public max_num: number;
    //
    constructor() {
        super();
        this.index = -1;
        this.max_num = 0;
    }
} // end: FightRewardItemData class

// @
export class FightMapConfigData {
    public map_key: string;
    public map_id: number;
    public cell_id: number;
    public row: number;
    public col: number;
    public enter: number;
    public item_type: number;
    public item_id: number;
    public is_obstruct: number;
    public plant_id: number;
    public land_img_id: number;
    public land_y_offset: number;
    public plant_x_offset: number;
    public plant_y_offset: number;
    public water_img_id: number;
    public sea_area: number;
    public skill_lv: number;
    public star_lv: number;
    //
    constructor() {
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
} // end: FightMapConfigData class

// @
interface IHeroIndex {
    hero_index: number;
    offset: cc.Vec3;
}

// @
interface IDefenseHeroIndex {
    defense_hero_index: number;
    offset: cc.Vec3;
}

// @
export class FightMapItemData extends FightMapConfigData {
    public grid_index: number;
    public grid_position: cc.Vec2;
    public edge_flag: number;
    public land_id: number;
    public decoration_index: number;
    public hero_index_array: IHeroIndex[];
    public defense_hero_index_array: IDefenseHeroIndex[];
    public offset_array: cc.Vec3[];
    public prop_index: number;
    public building_index: number;
    public wall_index: number;
    public position: cc.Vec3;
    // @
    constructor() {
        super();
        this.grid_index = 0;
        this.grid_position = cc.Vec2.ZERO;
        this.edge_flag = -1;
        this.land_id = 0;
        this.decoration_index = -1;
        this.hero_index_array = [];
        this.defense_hero_index_array = [];
        this.offset_array = [];
        this.prop_index = -1;
        this.building_index = -1;
        this.wall_index = -1;
        this.position = cc.Vec3.ZERO;
    }

    public add_hero_index(heroIndex: number): IHeroIndex {
        if (0 == this.offset_array.length) {
            this.offset_array = [].concat(FightConstants.HERO_OFFSET_ARRAY);
        }

        for (let index = 0; index < this.hero_index_array.length; index++) {
            if (this.hero_index_array[index].hero_index == t) {
                return this.hero_index_array[index];
            }
        }

        const newHeroIndex = {
            hero_index: heroIndex,
            offset: this.offset_array.shift()
        };
        this.hero_index_array.push(newHeroIndex);
        return newHeroIndex;
    }

    // @
    public remove_hero_index(heroIndex: number): IHeroIndex[] {
        for (let i = this.hero_index_array.length - 1; i >= 0; i--) {
            if (this.hero_index_array[i].hero_index === heroIndex) {
                return this.hero_index_array.splice(i, 1);
            }
        }
    }

    // @
    public add_defense_hero_index(defenseHeroIndex: number): IDefenseHeroIndex {
        if (0 == this.offset_array.length) {
            this.offset_array = [].concat(FightConstants.HERO_OFFSET_ARRAY);
        }

        for (let index = 0; index < this.defense_hero_index_array.length; index++) {
            if (this.defense_hero_index_array[index].defense_hero_index == t) {
                return this.defense_hero_index_array[index];
            }
        }
        const newDefenseHeroIndex = {
            defense_hero_index: defenseHeroIndex,
            offset: this.offset_array.shift()
        };

        this.defense_hero_index_array.push(newDefenseHeroIndex);
        return newDefenseHeroIndex;
    }

    // @
    public remove_defense_hero_index(defenseHeroIndex: number): IDefenseHeroIndex[] {
        for (let i = this.defense_hero_index_array.length - 1; i >= 0; i--) {
            if (this.defense_hero_index_array[i].defense_hero_index == defenseHeroIndex) {
                return this.defense_hero_index_array.splice(i, 1);
            }
        }
    }
}

export enum EdgeEnum {
    TOP = 1,
    RIGHT = 2,
    BOTTOM = 4,
    LEFT = 8
}

// @
export class FightBuildingItemData {
    public grid_index: number;
    public grid_position: cc.Vec2;
    public array_index: number;
    public id: number;
    public lv: number;
    public star_count: number;
    public reward_array: BasePropItemData[];
    public hp: number;
    public max_hp: number;
    public defense: number;
    public attack_value: number;
    public call_range: number;
    public last_attack_time: number;
    public attack_interval: number;
    public attack_range: number;
    public attack_type: AttackType;
    public fly_weapon_name: string;
    public lock_attack_target: FightHeroItemData;

    // @
    constructor() {
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
        this.attack_type = AttackType.REMOTE;
        this.fly_weapon_name = "";
    }
} // end: FightBuildingItemData class

// @
export class FightWallItemData {
    public grid_index: number;
    public grid_position: cc.Vec2;
    public array_index: number;
    public id: number;
    public lv: number;
    public skill_id: number;
    public skill_lv: number;
    public star_lv: number;
    public defense_value: number;
    public hp: number;
    public max_hp: number;
    public attack_type: AttackType;
    public attack_anim_time: number;
    public fly_weapon_name: string;
    public fly_weapon_time: number;
    public fly_weapon_position_array: cc.Vec3[];
    public attack_value: number;
    public last_attack_time: number;
    public attack_interval: number;
    public attack_range: number;
    public search_range: number;
    public state: HeroState;
    public fight_state: HeroFightState;
    public call_range: number;
    public radian: number;
    public damage_ratio: number;
    public defense_ratio: number;
    public passive_skill_array: number[];
    public occupation: number;
    public lock_attack_target: FightHeroItemData;

    // @
    constructor() {
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
        this.attack_type = AttackType.NONE;
        this.attack_anim_time = 0;
        this.fly_weapon_name = "";
        this.fly_weapon_time = 0;
        this.fly_weapon_position_array = [];
        this.attack_value = 0;
        this.last_attack_time = 0;
        this.attack_interval = 0;
        this.attack_range = 0;
        this.search_range = 0;
        this.state = HeroState.ALIVE;
        this.fight_state = HeroFightState.ATTACKING;
        this.call_range = 0;
        this.radian = 0;
        this.damage_ratio = 1;
        this.defense_ratio = 1;
    }

    // @
    public get real_attack_value(): number {
        return Math.floor(this.attack_value * this.damage_ratio);
    }

    // @
    public get real_defense_value(): number {
        return Math.floor(this.defense_value * this.defense_ratio);
    }
} // end: FightWallItemData class

// @
export class FightTargetSortData {
    public distance: number;
    public find_path_distance: number;
    public pixel_distance: number;
    public priority: number;
    public type: number;
    public index: number;
    //
    constructor() {
        this.distance = 0;
        this.find_path_distance = 0;
        this.pixel_distance = 0;
        this.priority = 0;
        this.type = 0;
        this.index = -1;
    }
} // end: FightTargetSortData class

// @
export class FightResultData {
    public result: number;
    public attacker_name: string;
    public defender_name: string;
    public star_num: number;
    public gold_num: number;
    public bucket_num: number;
    public prop_data_array: FightResultPropItemData[];
    public death_hero_data_array: FightResultPropItemData[];
    public alive_hero_data_array: FightHeroItemData[];
    public alive_defense_hero_data_array: FightHeroItemData[];
    //
    constructor() {
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
} // end: FightResultData class

// @
export class FightMatchData {
    public id: number;
    public random_map_array: number[];
    public fail_two_random_map_array: number[];
    public battle_map_id: number;
    public battle_data_array: number[];
    public psychedelic_map_id: number;
    public psychedelic_data_array: number[];
    public random_name_id: number;
    //
    constructor() {
        this.id = 0;
        this.random_map_array = [];
        this.fail_two_random_map_array = [];
        this.battle_map_id = 0;
        this.battle_data_array = [];
        this.psychedelic_map_id = 0;
        this.psychedelic_data_array = [];
        this.random_name_id = 0;
    }
} // end: FightMatchData class

// @
export class BuffItemData {
    public id: SkillEffectId;
    public valid_time: number;
    public start_time: number;
    public is_start: boolean;
    public is_end: boolean;
    public trigger_count: number;
    public max_trigger_count: number;
    public damage_value: number;
    public move_speed_scale: number;
    public reduce_damage_ratio: number;
    public attack_speed_ratio: number;
    public attack_bonus_ratio: number;
    public defense_bonus_ratio: number;
    public restore_hp_ratio: number;
    public value: number;
    //
    constructor() {
        this.id = SkillEffectId.NONE;
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
} // end: BuffItemData class
