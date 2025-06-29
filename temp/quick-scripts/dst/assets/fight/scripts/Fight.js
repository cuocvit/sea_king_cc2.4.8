
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/fight/scripts/Fight.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '26b81fFLslPE7zY2GYkP/qW', 'Fight');
// fight/scripts/Fight.ts

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
exports.Fight = void 0;
var ListView_1 = require("../../start-scene/scripts/ListView");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var FightConstants_1 = require("../../start-scene/scripts/FightConstants");
var FightData_1 = require("../../start-scene/scripts/FightData");
var ConstantsData_1 = require("../../start-scene/scripts/ConstantsData");
var Constants_1 = require("../../start-scene/scripts/Constants");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var ConfigData_1 = require("../../start-scene/scripts/ConfigData");
var FightTempData_1 = require("../../start-scene/scripts/FightTempData");
var RecordData_1 = require("../../start-scene/scripts/RecordData");
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var Utils_1 = require("../../start-scene/scripts/Utils");
var NetUtils_1 = require("../../start-scene/scripts/NetUtils");
var FightHeroItem_1 = require("./FightHeroItem");
var FightMapItem_1 = require("./FightMapItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Fight = /** @class */ (function (_super) {
    __extends(Fight, _super);
    function Fight() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mask_node = null;
        _this.scene_node = null;
        _this.map_node = null;
        _this.effect_node = null;
        _this.window_node = null;
        _this.text_node = null;
        _this.boat_node = null;
        _this.boat_box_node = null;
        _this.boat_spr = null;
        _this.boat_anim = null;
        _this.ui_node = null;
        _this.name_lbl = null;
        _this.left_sec_lbl = null;
        _this.speed_1_btn = null;
        _this.speed_2_btn = null;
        _this.return_btn = null;
        _this.hero_list = null;
        _this.reward_list = null;
        _this.figerAni = null;
        _this.wave_ps = null;
        _this.fight_guider_node = null;
        return _this;
    }
    //
    Fight.prototype.onEnable = function () {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move_handler, this);
        this.node._touchListener.setSwallowTouches(false);
        GameManager_1.gm.data.event_emitter.on("pick_up_prop", this.on_pick_up_prop_handler, this);
        GameManager_1.gm.data.fight_temp_data.build_hero_array();
        GameManager_1.gm.data.fight_temp_data.build_reward_array();
        this.init_map();
        this.update_view();
        this.fight_start();
        this.fight_guider_node.active = false;
        if (13 == GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID && !GameManager_1.gm.data.mapCell_data.roleGuideVO.isEnd) {
            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GUIDE_SHOW_TIPS_OP.key, 5);
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.GUIDE_SHOW_TIPS_OP);
        }
    };
    //
    Fight.prototype.onDisable = function () {
        this.scene_node.off(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move_handler, this);
        GameManager_1.gm.data.event_emitter.off("pick_up_prop", this.on_pick_up_prop_handler);
    };
    Fight.prototype.on_touch_move_handler = function (event) {
        var touches = event.getTouches();
        if (GameManager_1.gm.data.mapCell_data.isGuide)
            return;
        if (touches.length == 2) {
            var touch1 = touches[0];
            var touch2 = touches[1];
            var delta1 = touch1.getDelta();
            var delta2 = touch2.getDelta();
            var location1 = touch1.getLocation();
            var location2 = touch2.getLocation();
            var midPoint = cc.v3(location1.add(location2).multiplyScalar(0.5));
            midPoint = this.scene_node.convertToNodeSpaceAR(midPoint);
            var deltaLocation = location1.sub(location2);
            var combinedDelta = delta1.sub(delta2);
            var scale = 1;
            scale = Math.abs(deltaLocation.x) > Math.abs(deltaLocation.y)
                ? (deltaLocation.x + combinedDelta.x) / deltaLocation.x * this.scene_node.scale
                : (deltaLocation.y + combinedDelta.y) / deltaLocation.y * this.scene_node.scale;
            if (scale < 1) {
                scale = 1;
            }
            else if (scale < 2) {
                scale = 2;
            }
            var scaleChange = scale - this.scene_node.scale;
            this.scene_node.scale += scaleChange;
            var scaledMidPoint = midPoint.multiplyScalar(scaleChange);
            this.scene_node.position = this.scene_node.position.sub(scaledMidPoint);
        }
        else if (touches.length == 1) {
            var delta = event.getDelta();
            this.scene_node.x += delta.x;
            this.scene_node.y += delta.y;
            if (this.scene_node.x < GameManager_1.gm.data.fight_temp_data.min_offset.x) {
                this.scene_node.x = GameManager_1.gm.data.fight_temp_data.min_offset.x;
            }
            else if (this.scene_node.x > GameManager_1.gm.data.fight_temp_data.max_offset.x) {
                this.scene_node.x = GameManager_1.gm.data.fight_temp_data.max_offset.x;
            }
            if (this.scene_node.y < GameManager_1.gm.data.fight_temp_data.min_offset.y) {
                this.scene_node.y = GameManager_1.gm.data.fight_temp_data.min_offset.y;
            }
            else if (this.scene_node.y > GameManager_1.gm.data.fight_temp_data.max_offset.y) {
                this.scene_node.y = GameManager_1.gm.data.fight_temp_data.max_offset.y;
            }
        }
    };
    Fight.prototype.on_pick_up_prop_handler = function (index) {
        var item = this.reward_list.getItem(index);
        if (item) {
            item.update_view();
        }
    };
    Fight.prototype.init_map = function () {
        var _this = this;
        if (GameManager_1.gm.data.fight_temp_data.play_type < 0) {
            cc.error("play_type Giá trị sai:" + GameManager_1.gm.data.fight_temp_data.play_type);
            GameManager_1.gm.data.fight_temp_data.play_type = 0;
        }
        this.mask_node.color = FightConstants_1.FightConstants.SEA_AREA_COLOR_ARRAY[GameManager_1.gm.data.fight_temp_data.play_type];
        var mapData = GameManager_1.gm.data.fight_temp_data.build_play_map_data();
        this.scene_node.position = GameManager_1.gm.data.fight_temp_data.map_start_position;
        GameManager_1.gm.pool.init(Constants_1.BundleName.FIGHT, "prefabs/fight_map_item", FightMapItem_1.FightMapItem, 1, function () {
            var _loop_1 = function (index) {
                (function () {
                    var cellData = mapData[index];
                    if (cellData) {
                        GameManager_1.gm.pool.async_get(Constants_1.BundleName.FIGHT, "prefabs/fight_map_item", FightMapItem_1.FightMapItem, function (mapItem) {
                            mapItem.node.position = cellData.position;
                            mapItem.data = cellData;
                            _this.map_node.addChild(mapItem.node, 0);
                            GameManager_1.gm.data.fight_temp_data.is_debug;
                            mapItem.node.name = cc.js.formatStr("fight_map_item_%d", cellData.grid_index);
                            GameManager_1.gm.data.fight_temp_data.map_item_array[cellData.cell_id] = mapItem;
                        });
                    }
                })();
            };
            for (var index = 0; index < mapData.length; index++) {
                _loop_1(index);
            }
            _this.show_guider_finger_anim();
        });
        if (GameManager_1.gm.data.fight_temp_data.play_type < 2) {
            this.wave_ps.node.active = true;
            this.wave_ps.startColor = FightConstants_1.FightConstants.WAVE_START_COLOR_ARRAY[GameManager_1.gm.data.fight_temp_data.play_type];
            this.wave_ps.endColor = FightConstants_1.FightConstants.WAVE_END_COLOR_ARRAY[GameManager_1.gm.data.fight_temp_data.play_type];
        }
        else {
            this.wave_ps.node.active = false;
        }
    };
    Fight.prototype.on_click_hide_guider = function () {
        this.fight_guider_node.active = false;
    };
    Fight.prototype.show_guider_finger_anim = function () {
        if (13 != GameManager_1.gm.data.mapCell_data.roleGuideVO.guideID || GameManager_1.gm.data.mapCell_data.roleGuideVO.isEnd) {
            this.figerAni.active = false;
        }
        else {
            this.figerAni.active = GameManager_1.gm.data.fight_temp_data.goto_battle_count < 2;
            if (this.figerAni.active) {
                var targetIndex = 1 == GameManager_1.gm.data.fight_temp_data.goto_battle_count ? 39 : 38;
                var targetPosition = this.map_node.convertToWorldSpaceAR(cc.v2(this.map_node.getChildByName("fight_map_item_" + targetIndex).position));
                this.figerAni.position = this.scene_node.convertToNodeSpaceAR(cc.v3(targetPosition));
            }
            if (GameManager_1.gm.data.mapCell_data.isGuide) {
                if (1 == GameManager_1.gm.data.fight_temp_data.goto_battle_count) {
                    GameManager_1.gm.channel.report_event("ohayoo_game_guide", {
                        guideid: 14,
                        guidedesc: cc.js.formatStr("14.点击上岛1个英雄")
                    });
                }
                else if (2 == GameManager_1.gm.data.fight_temp_data.goto_battle_count) {
                    GameManager_1.gm.channel.report_event("ohayoo_game_guide", {
                        guideid: 15,
                        guidedesc: cc.js.formatStr("15.点击上岛1个英雄")
                    });
                }
            }
        }
    };
    Fight.prototype.update = function (deltaTime) {
        var fightTempData = GameManager_1.gm.data.fight_temp_data;
        if (fightTempData.fight_state == FightData_1.FightState.RUN) {
            fightTempData.delta_time = deltaTime * cc.director.getScheduler().getTimeScale();
            fightTempData.total_time += fightTempData.delta_time;
            this.update_hero_action();
            this.update_defense_hero_action();
            this.update_building_action();
            this.update_wall_action();
            this.update_buff_action();
            this.update_view();
            if (fightTempData.total_time > ConstantsData_1.ConstantsData.instance.MAX_FIGHT_TIME) {
                this.fight_revive(true);
            }
        }
    };
    Fight.prototype.apply_passive_skill_effect = function () {
        var _this = this;
        var fightTempData = GameManager_1.gm.data.fight_temp_data;
        this.scheduleOnce(function () {
            for (var i = 0; i < fightTempData.wall_data_array.length; i++) {
                var wallItem = fightTempData.wall_item_array[i];
                var wallData = fightTempData.wall_data_array[i];
                if (wallData.skill_id > 0 && (!fightTempData.is_debug || wallData.skill_lv > 0)) {
                    var skillData = GameManager_1.gm.config.get_row_data("SkillConfigData", wallData.skill_id.toString(), wallData.skill_lv.toString());
                    if (skillData.skill_type == ConfigData_1.SkillType.PASSIVE) {
                        wallItem.apply_passive_skill(skillData);
                    }
                }
            }
            for (i = 0; i < fightTempData.defense_hero_data_array.length; i++) {
                _this.common_hero_apply_passive_skill(fightTempData.defense_hero_data_array[i]);
            }
            for (i = 0; i < fightTempData.hero_data_array.length; i++) {
                _this.common_hero_apply_passive_skill(fightTempData.hero_data_array[i]);
            }
            for (i = 0; i < fightTempData.passive_hero_data_array.length; i++) {
                _this.passive_hero_apply_passive_skill(fightTempData.passive_hero_data_array[i]);
            }
        }, 3);
    };
    Fight.prototype.passive_hero_apply_passive_skill = function (heroData) {
        var _this = this;
        var heroConfig = GameManager_1.gm.config.get_row_data("HeroConfigData", heroData.id + "");
        var skillConfig = GameManager_1.gm.config.get_row_data("SkillConfigData", heroData.skill_id + "", heroConfig.lv + "");
        if (skillConfig.skill_pos == ConfigData_1.SkillPos.MAIN_CITY) {
            var MainCity_1 = GameManager_1.gm.data.fight_temp_data.get_main_city();
            GameManager_1.gm.data.fight_temp_data.building_item_array[MainCity_1.array_index];
            MainCity_1.max_hp += skillConfig.hp_add;
            MainCity_1.hp += skillConfig.hp_add;
            if ("" != skillConfig.skill_name) {
                GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + skillConfig.skill_name, NodePoolItem_1.NodePoolItem, function (nodeItem) {
                    _this.effect_node.addChild(nodeItem.node);
                    nodeItem.node.scale = 0.5;
                    nodeItem.node.position = GameManager_1.gm.data.fight_temp_data.grid_position_to_position(MainCity_1.grid_position);
                    var anim = nodeItem.getComponent(cc.Animation);
                    if (anim) {
                        anim.play();
                    }
                });
            }
        }
    };
    Fight.prototype.common_hero_apply_passive_skill = function (hero) {
        var fightTempData = GameManager_1.gm.data.fight_temp_data;
        if (hero && hero.hero_type == 1) {
            var heroConfig = GameManager_1.gm.config.get_row_data("HeroConfigData", hero.id.toString());
            var _loop_2 = function (i) {
                var passiveSkillId = hero.passive_skill_array[i];
                var skillConfig = GameManager_1.gm.config.get_row_data("SkillConfigData", passiveSkillId.toString(), heroConfig.lv.toString());
                if (skillConfig && skillConfig.skill_type == ConfigData_1.SkillType.PASSIVE) {
                    if (skillConfig.skill_pos == ConfigData_1.SkillPos.ALL_SELF_BODY) {
                        var affectedHeroes = [];
                        if (hero.type == FightConstants_1.HeroType.ATTACK) {
                            affectedHeroes = fightTempData.hero_data_array;
                        }
                        else {
                            affectedHeroes = fightTempData.defense_hero_data_array;
                        }
                        affectedHeroes.forEach(function (affectedHero) {
                            if (affectedHero) {
                                affectedHero.passive_attack_bonus_ratio += skillConfig.damage_ratio;
                                affectedHero.passive_defense_bonus_ratio += skillConfig.defense_ratio;
                            }
                        });
                    }
                    else {
                        // console.error("未实现的被动释放位置");
                        console.log("Vị trí thả thụ động chưa được thực hiện.");
                    }
                }
            };
            for (var i = 0; i < hero.passive_skill_array.length; i++) {
                _loop_2(i);
            }
        }
    };
    Fight.prototype.handleHeroAction = function (num) {
        var _this = this;
        var g = GameManager_1.gm.data.fight_temp_data;
        var heroItem = GameManager_1.gm.data.fight_temp_data.hero_item_array[num];
        if (null == heroItem) {
            return "continue";
        }
        var heroData = GameManager_1.gm.data.fight_temp_data.hero_data_array[num];
        if (heroData.in_battle_state == FightConstants_1.HeroInBattleState.HAS_IN_BATTLE) {
            if (heroData.fight_state == FightConstants_1.HeroFightState.WAITING) {
                this.find_next_path(heroData);
            }
            else if (heroData.fight_state == FightConstants_1.HeroFightState.MOVING) {
                if (heroData.move_path.length <= 0) {
                    this.hero_move_one_grid_action(heroData);
                }
                else {
                    var moveTarget = heroData.move_path[0];
                    var targetPosition = g.grid_position_to_position(cc.v2(moveTarget.x, moveTarget.y)).add(heroData.offset);
                    var sub = targetPosition.sub(heroItem.node.position);
                    var distance = sub.mag();
                    var moveSpeed = g.delta_time * heroData.real_move_speed;
                    var angle = Math.atan2(sub.y, sub.x);
                    if (0 < distance && moveSpeed < distance) {
                        heroItem.node.position = heroItem.node.position.add(cc.v3(Math.cos(angle), Math.sin(angle)).mul(moveSpeed));
                    }
                    else {
                        heroItem.node.position = targetPosition;
                        heroData.move_path.shift();
                        var _fightMapItem = g.get_fight_map_item(heroData.grid_position.x, heroData.grid_position.y);
                        if (_fightMapItem && _fightMapItem.data) {
                            _fightMapItem.data.remove_hero_index(heroData.array_index);
                        }
                        heroData.grid_index = moveTarget.x + moveTarget.y * g.map_size.x;
                        heroData.grid_position.x = moveTarget.x;
                        heroData.grid_position.y = moveTarget.y;
                        heroItem.node.zIndex = GameManager_1.gm.data.fight_temp_data.get_dynamic_node_layer(heroData.grid_index, FightConstants_1.FightDynamicNodeLayer.MOVE);
                        this.hero_move_one_grid_action(heroData);
                    }
                    heroItem.play_spine_anim(heroData.move_path.length <= 0 ? "stay" : "move", angle);
                }
            }
            else if (heroData.fight_state == FightConstants_1.HeroFightState.ATTACKING) {
                var pathTarget_1 = heroData.find_path_target;
                var targetNode_1;
                if (pathTarget_1) {
                    if (pathTarget_1 instanceof FightTempData_1.FightBuildingItemData) {
                        var buidingItem = g.building_item_array[pathTarget_1.array_index];
                        if (buidingItem) {
                            targetNode_1 = buidingItem.node;
                        }
                    }
                    else if (pathTarget_1 instanceof FightTempData_1.FightHeroItemData) {
                        var defenseHero = g.defense_hero_array[pathTarget_1.array_index];
                        if (defenseHero) {
                            targetNode_1 = defenseHero.node;
                        }
                    }
                    else if (pathTarget_1 instanceof FightTempData_1.FightWallItemData) {
                        var wallItem = g.wall_item_array[pathTarget_1.array_index];
                        if (wallItem) {
                            targetNode_1 = wallItem.node;
                        }
                    }
                    else {
                        // cc.error("未知分支情况");
                        cc.error("trường hợp nhánh không xác định");
                    }
                    if (targetNode_1) {
                        var currentPosition = g.get_fight_map_item(heroData.grid_position.x, heroData.grid_position.y);
                        var targetPosition = g.get_fight_map_item(heroData.find_path_target.grid_position.x, heroData.find_path_target.grid_position.y);
                        if (currentPosition && targetPosition && targetPosition.node.position.sub(currentPosition.node.position).mag() > heroData.attack_range) {
                            heroData.find_path_target = null;
                            heroData.move_path = [];
                            heroData.fight_state = FightConstants_1.HeroFightState.WAITING;
                            return { value: undefined };
                        }
                        if (0 < heroData.attack_value && 0 < pathTarget_1.hp) {
                            if (0 == heroData.last_attack_time || g.total_time - heroData.last_attack_time > heroData.real_attack_interval) {
                                heroData.last_attack_time = g.total_time;
                                heroData.attack_count++;
                                var targetWorldPosition = g.grid_position_to_position(cc.v2(pathTarget_1.grid_position.x, pathTarget_1.grid_position.y));
                                var heroWorldPosition = g.grid_position_to_position(heroData.grid_position);
                                var directionVector = targetWorldPosition.sub(heroWorldPosition);
                                var attackAngle_1 = Math.atan2(directionVector.y, directionVector.x);
                                if (heroData.attack_count % (FightConstants_1.FightConstants.SKILL_INTERVAL_NORMAL_ATTACK_COUNT + 1) == 0 && (GameManager_1.gm.data.fight_temp_data.is_debug || 0 < heroData.skill_lv)) {
                                    var skillData_1 = GameManager_1.gm.config.get_row_data("SkillConfigData", heroData.skill_id + "", heroData.skill_lv + "");
                                    heroItem.play_skill_audio();
                                    heroItem.play_spine_anim("skill", attackAngle_1, false, skillData_1.fire_time, function () {
                                        if ("" != skillData_1.skill_name) {
                                            if (skillData_1.skill_pos == ConfigData_1.SkillPos.ENEMY_BODY || skillData_1.skill_pos == ConfigData_1.SkillPos.ALL_ENEMY_BODY) {
                                                if (skillData_1.skill_type == ConfigData_1.SkillType.FLY) {
                                                    heroItem.play_skill_fly_anim(skillData_1, targetNode_1, attackAngle_1, function () {
                                                        _this.hero_skill_hit(heroData, pathTarget_1, skillData_1, function () {
                                                            var defenseHero = g.defense_hero_array[pathTarget_1.array_index];
                                                            if (pathTarget_1 instanceof FightTempData_1.FightHeroItemData && defenseHero && defenseHero.data) {
                                                                _this.common_hero_skill_hit_buff(skillData_1, heroItem, defenseHero, defenseHero.data.grid_position);
                                                            }
                                                        });
                                                    });
                                                }
                                                else {
                                                    _this.hero_skill_hit(heroData, pathTarget_1, skillData_1, function () {
                                                        var defenseHero = g.defense_hero_array[pathTarget_1.array_index];
                                                        if (pathTarget_1 instanceof FightTempData_1.FightHeroItemData && defenseHero && defenseHero.data) {
                                                            _this.common_hero_skill_hit_buff(skillData_1, heroItem, defenseHero, defenseHero.data.grid_position);
                                                        }
                                                    });
                                                }
                                            }
                                            else {
                                                if (skillData_1.skill_pos == ConfigData_1.SkillPos.SELF_BODY || skillData_1.skill_pos == ConfigData_1.SkillPos.ALL_SELF_BODY) {
                                                    heroItem.play_skill_anim(skillData_1, targetNode_1, attackAngle_1, function () {
                                                        _this.common_hero_skill_hit_buff(skillData_1, heroItem, null, null);
                                                    });
                                                }
                                                else {
                                                    if (!(skillData_1.skill_pos != ConfigData_1.SkillPos.ONE_CIRCLE_GRID && skillData_1.skill_pos != ConfigData_1.SkillPos.TWO_CIRCLE_GRID)) {
                                                        if (skillData_1.skill_type == ConfigData_1.SkillType.FLY) {
                                                            heroItem.play_skill_fly_anim(skillData_1, targetNode_1, attackAngle_1, function () {
                                                                _this.hero_skill_hit(heroData, pathTarget_1, skillData_1, function () {
                                                                    var defenseHero = g.defense_hero_array[pathTarget_1.array_index];
                                                                    if (pathTarget_1 instanceof FightTempData_1.FightHeroItemData) {
                                                                        if (defenseHero && defenseHero.data) {
                                                                            _this.common_hero_skill_hit_buff(skillData_1, heroItem, defenseHero, defenseHero.data.grid_position);
                                                                        }
                                                                    }
                                                                    else {
                                                                        _this.common_hero_skill_hit_buff(skillData_1, heroItem, null, pathTarget_1.grid_position);
                                                                    }
                                                                });
                                                            });
                                                        }
                                                        else {
                                                            // console.error("TODO:暂时没有该分支的情况");
                                                            console.log("Hiện không có nhánh nào.");
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        else if ("" != skillData_1.hit_name) {
                                            if (skillData_1.skill_pos == ConfigData_1.SkillPos.ENEMY_BODY || skillData_1.skill_pos == ConfigData_1.SkillPos.ALL_ENEMY_BODY) {
                                                _this.hero_skill_hit(heroData, pathTarget_1, skillData_1, function () {
                                                    var defenseHero = g.defense_hero_array[pathTarget_1.array_index];
                                                    if (pathTarget_1 instanceof FightTempData_1.FightHeroItemData && defenseHero && defenseHero.data) {
                                                        _this.common_hero_skill_hit_buff(skillData_1, heroItem, defenseHero, defenseHero.data.grid_position);
                                                    }
                                                });
                                            }
                                            else if (skillData_1.skill_pos == ConfigData_1.SkillPos.SELF_BODY || skillData_1.skill_pos == ConfigData_1.SkillPos.ALL_SELF_BODY) {
                                                _this.hero_skill_hit(heroData, heroData, skillData_1, function () {
                                                    if (heroItem.data) {
                                                        _this.common_hero_skill_hit_buff(skillData_1, heroItem, heroItem, heroItem.data.grid_position);
                                                    }
                                                });
                                                if (skillData_1.skill_pos == ConfigData_1.SkillPos.ALL_SELF_BODY) {
                                                    for (var index = 0; index < g.hero_item_array.length; index++) {
                                                        (function (heroIndex) {
                                                            var heroItem = g.hero_item_array[heroIndex];
                                                            var heroData = g.hero_data_array[heroIndex];
                                                            if (heroData && heroData != heroData) {
                                                                _this.hero_skill_hit(heroData, heroData, skillData_1, function () {
                                                                    if (heroItem.data) {
                                                                        _this.common_hero_skill_hit_buff(skillData_1, heroItem, heroItem, heroItem.data.grid_position);
                                                                    }
                                                                });
                                                            }
                                                        })(index);
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            var defenseHero = g.defense_hero_array[pathTarget_1.array_index];
                                            if (pathTarget_1 instanceof FightTempData_1.FightHeroItemData) {
                                                defenseHero && defenseHero.data && _this.common_hero_skill_hit_buff(skillData_1, heroItem, defenseHero, defenseHero.data.grid_position);
                                            }
                                            else {
                                                _this.common_hero_skill_hit_buff(skillData_1, heroItem, null, null);
                                            }
                                        }
                                    }, skillData_1.prepare_skill_anim_time, function () {
                                        heroItem.play_spine_anim("stay", attackAngle_1);
                                    });
                                    if (skillData_1.prepare_skill_anim_time >= heroData.real_attack_interval) {
                                        // cc.error("英雄的攻击动画时间不能大于攻击间隔");
                                        cc.error("Thời gian hoạt ảnh tấn công của anh hùng không thể dài hơn khoảng thời gian tấn công.");
                                    }
                                }
                                else {
                                    if (!targetNode_1) {
                                        heroData.find_path_target = null;
                                        heroData.move_path = [];
                                        heroData.fight_state = FightConstants_1.HeroFightState.WAITING;
                                        return "continue";
                                    }
                                    heroItem.play_attack_audio();
                                    heroItem.play_spine_anim("attack", attackAngle_1, false, heroData.fly_weapon_time, function () {
                                        if (heroData.attack_type == ConfigData_1.AttackType.REMOTE) {
                                            heroItem.play_weapon_fly_anim(targetNode_1, attackAngle_1, function () {
                                                _this.hero_attack_hit(heroData, attackAngle_1, pathTarget_1);
                                            });
                                        }
                                        else {
                                            _this.hero_attack_hit(heroData, attackAngle_1, pathTarget_1);
                                        }
                                    }, heroData.attack_anim_time, function () {
                                        heroItem.play_spine_anim("stay", attackAngle_1);
                                    });
                                    if (heroData.attack_anim_time >= heroData.real_attack_interval) {
                                        // cc.error("英雄的攻击动画时间不能大于攻击间隔");
                                        cc.error("Thời gian hoạt ảnh tấn công của anh hùng không thể dài hơn khoảng thời gian tấn công.");
                                    }
                                }
                            }
                            return "continue";
                        }
                    }
                }
                else {
                    cc.error("hero_data.find_path_target need != null");
                }
                heroData.find_path_target = null;
                heroData.move_path = [];
                heroData.fight_state = FightConstants_1.HeroFightState.WAITING;
            }
        }
    };
    Fight.prototype.update_hero_action = function () {
        for (var index = 0; index < GameManager_1.gm.data.fight_temp_data.hero_item_array.length; index++) {
            var heroAction = this.handleHeroAction(index);
            if (typeof heroAction === "object" && heroAction !== null && "value" in heroAction) {
                return heroAction.value;
            }
        }
    };
    Fight.prototype.hero_move_one_grid_action = function (hero) {
        var fightTempData = GameManager_1.gm.data.fight_temp_data;
        var currentMapItem = fightTempData.get_fight_map_item(hero.grid_position.x, hero.grid_position.y);
        if (currentMapItem && currentMapItem.data) {
            currentMapItem.pick_up_prop();
            var fightMapItem = currentMapItem.data.add_hero_index(hero.array_index);
            hero.offset = fightMapItem.offset;
        }
        if (hero.find_path_target instanceof FightTempData_1.FightPropItemData) {
            if (hero.move_path.length == 0)
                hero.fight_state = FightConstants_1.HeroFightState.WAITING;
        }
        else {
            var targetMapItem = fightTempData.get_fight_map_item(hero.find_path_target.grid_position.x, hero.find_path_target.grid_position.y);
            if (targetMapItem && targetMapItem.node.position.sub(currentMapItem.node.position).mag() <= hero.attack_range) {
                hero.fight_state = FightConstants_1.HeroFightState.ATTACKING;
                hero.move_path = [];
            }
        }
    };
    Fight.prototype.hero_attack_hit = function (attacker, angle, target) {
        var fightTempData = GameManager_1.gm.data.fight_temp_data;
        var targetObject;
        if (target instanceof FightTempData_1.FightHeroItemData) {
            if (target.type == FightConstants_1.HeroType.ATTACK) {
                targetObject = fightTempData.hero_item_array[target.array_index];
            }
            else if (target.type == FightConstants_1.HeroType.DEFENSE) {
                targetObject = fightTempData.defense_hero_array[target.array_index];
            }
        }
        else if (target instanceof FightTempData_1.FightBuildingItemData) {
            targetObject = fightTempData.building_item_array[target.array_index];
            if (!target.lock_attack_target)
                target.lock_attack_target = attacker;
        }
        else if (target instanceof FightTempData_1.FightWallItemData) {
            targetObject = fightTempData.wall_item_array[target.array_index];
            if (!target.lock_attack_target)
                target.lock_attack_target = attacker;
        }
        if (targetObject) {
            targetObject.change_hp(-attacker.real_attack_value);
            var hitAnimation = "hit";
            var heroConfig = GameManager_1.gm.config.get_row_data("HeroConfigData", "" + attacker.id);
            if (heroConfig && heroConfig.hit_name) {
                hitAnimation = heroConfig.hit_name;
            }
            targetObject.play_hit_anim(targetObject.node, hitAnimation);
            if (target.hp <= 0) {
                if (target instanceof FightTempData_1.FightBuildingItemData) {
                    if (fightTempData.is_main_city(target.id)) {
                        for (var i = 0; i < fightTempData.building_data_array.length; i++) {
                            if (fightTempData.building_data_array[i] != target) {
                                var buildingItem = fightTempData.building_item_array[i];
                                if (buildingItem)
                                    buildingItem.put_to_pool();
                            }
                        }
                        this.fight_success();
                    }
                    fightTempData.grid.setWalkable(target.grid_position.x, target.grid_position.y, true);
                }
                else if (target instanceof FightTempData_1.FightWallItemData) {
                    fightTempData.grid.setWalkable(target.grid_position.x, target.grid_position.y, true);
                }
                targetObject.put_to_pool();
                attacker.find_path_target = null;
                attacker.move_path = [];
                attacker.fight_state = FightConstants_1.HeroFightState.WAITING;
            }
        }
    };
    Fight.prototype.hero_skill_hit = function (attacker, target, skill, callback) {
        var fightData = GameManager_1.gm.data.fight_temp_data;
        var targetHero;
        if (target instanceof FightTempData_1.FightHeroItemData) {
            if (target.type == FightConstants_1.HeroType.ATTACK) {
                targetHero = fightData.hero_item_array[target.array_index];
            }
            else if (target.type == FightConstants_1.HeroType.DEFENSE) {
                targetHero = fightData.defense_hero_array[target.array_index];
            }
        }
        else if (target instanceof FightTempData_1.FightBuildingItemData) {
            targetHero = fightData.building_item_array[target.array_index];
            if (!target.lock_attack_target) {
                target.lock_attack_target = attacker;
            }
        }
        else if (target instanceof FightTempData_1.FightWallItemData) {
            targetHero = fightData.wall_item_array[target.array_index];
            if (!target.lock_attack_target) {
                target.lock_attack_target = attacker;
            }
        }
        if (targetHero && targetHero.data) {
            targetHero.change_hp(-attacker.real_attack_value * skill.damage_ratio);
            if (skill.hit_name != "") {
                if (skill.skill_pos == ConfigData_1.SkillPos.ONE_CIRCLE_GRID || skill.skill_pos == ConfigData_1.SkillPos.TWO_CIRCLE_GRID) {
                    var gridPosition = targetHero.data.grid_position;
                    var range = 0;
                    if (skill.skill_pos == ConfigData_1.SkillPos.ONE_CIRCLE_GRID) {
                        range = 1;
                    }
                    else if (skill.skill_pos == ConfigData_1.SkillPos.TWO_CIRCLE_GRID) {
                        range = 2;
                    }
                    for (var x = gridPosition.x - range; x <= gridPosition.x + range; x++) {
                        for (var y = gridPosition.y - range; y <= gridPosition.y + range; y++) {
                            var mapItem = fightData.get_fight_map_item(x, y);
                            if (mapItem && mapItem.data) {
                                targetHero.play_skill_hit_anim(mapItem.land_node, skill.hit_name, GameManager_1.gm.ui.fight.map_node, fightData.get_dynamic_node_layer(mapItem.data.grid_index, FightConstants_1.FightDynamicNodeLayer.FIRE_EFFECT));
                            }
                        }
                    }
                }
                else {
                    targetHero.play_skill_hit_anim(targetHero.node, skill.hit_name);
                }
            }
            this.scheduleOnce(function () {
                callback();
            }, 0.3);
            if (target.hp <= 0) {
                if (target instanceof FightTempData_1.FightBuildingItemData) {
                    if (fightData.is_main_city(target.id)) {
                        for (var i = 0; i < fightData.building_data_array.length; i++) {
                            if (fightData.building_data_array[i] != target) {
                                var building = fightData.building_item_array[i];
                                if (building)
                                    building.put_to_pool();
                            }
                        }
                        this.fight_success();
                    }
                    fightData.grid.setWalkable(target.grid_position.x, target.grid_position.y, true);
                }
                else if (target instanceof FightTempData_1.FightWallItemData) {
                    fightData.grid.setWalkable(target.grid_position.x, target.grid_position.y, true);
                }
                targetHero.put_to_pool();
                attacker.find_path_target = null;
                attacker.move_path = [];
                attacker.fight_state = FightConstants_1.HeroFightState.WAITING;
            }
        }
    };
    Fight.prototype.defense_hero_skill_hit = function (attacker, defender, skill, callback) {
        var targetHero;
        var fightData = GameManager_1.gm.data.fight_temp_data;
        if (defender instanceof FightTempData_1.FightHeroItemData) {
            targetHero = fightData.hero_item_array[defender.array_index];
        }
        if (targetHero && targetHero.data) {
            targetHero.change_hp(-attacker.real_attack_value * skill.damage_ratio);
            if (skill.hit_name != "") {
                if (skill.skill_pos == ConfigData_1.SkillPos.ONE_CIRCLE_GRID || skill.skill_pos == ConfigData_1.SkillPos.TWO_CIRCLE_GRID) {
                    var gridPosition = targetHero.data.grid_position;
                    var range = 0;
                    if (skill.skill_pos == ConfigData_1.SkillPos.ONE_CIRCLE_GRID) {
                        range = 1;
                    }
                    else if (skill.skill_pos == ConfigData_1.SkillPos.TWO_CIRCLE_GRID) {
                        range = 2;
                    }
                    for (var x = gridPosition.x - range; x <= gridPosition.x + range; x++) {
                        for (var y = gridPosition.y - range; y <= gridPosition.y + range; y++) {
                            var mapItem = fightData.get_fight_map_item(x, y);
                            if (mapItem && mapItem.data) {
                                targetHero.play_skill_hit_anim(mapItem.land_node, skill.hit_name, GameManager_1.gm.ui.fight.map_node, fightData.get_dynamic_node_layer(mapItem.data.grid_index, FightConstants_1.FightDynamicNodeLayer.FIRE_EFFECT));
                            }
                        }
                    }
                }
                else {
                    targetHero.play_skill_hit_anim(targetHero.node, skill.hit_name);
                }
            }
            if (defender.find_path_target instanceof FightTempData_1.FightBuildingItemData) {
                var building = defender.find_path_target;
                if (building.hp / building.max_hp >= 0.45) {
                    if (this.find_next_path_distance(defender.grid_position, attacker.grid_position) != Number.MAX_SAFE_INTEGER) {
                        this.find_next_path(defender, attacker);
                    }
                }
            }
            this.scheduleOnce(function () {
                callback();
            }, 0.3);
            if (defender.hp <= 0) {
                targetHero.put_to_pool();
                fightData.death_hero_count++;
                attacker.move_path = [];
                attacker.find_path_target = null;
                attacker.fight_state = FightConstants_1.HeroFightState.WAITING;
                if (fightData.death_hero_count >= fightData.hero_data_array.length) {
                    this.fight_revive(false);
                }
            }
        }
    };
    Fight.prototype.common_hero_skill_hit_buff = function (skill, caster, target, position) {
        var fightData = GameManager_1.gm.data.fight_temp_data;
        var affectedUnits = [];
        if (skill.skill_pos == ConfigData_1.SkillPos.ENEMY_BODY && target) {
            affectedUnits.push(target);
        }
        else if (skill.skill_pos == ConfigData_1.SkillPos.ALL_ENEMY_BODY) {
            for (var i = 0; i < fightData.defense_hero_array.length; i++) {
                var enemyHero = fightData.defense_hero_array[i];
                if (enemyHero)
                    affectedUnits.push(enemyHero);
            }
        }
        else if (skill.skill_pos == ConfigData_1.SkillPos.SELF_BODY) {
            affectedUnits.push(caster);
        }
        else if (skill.skill_pos == ConfigData_1.SkillPos.ALL_SELF_BODY) {
            for (var i = 0; i < fightData.hero_item_array.length; i++) {
                var allyHero = fightData.hero_item_array[i];
                if (allyHero && allyHero.data && allyHero.data.hp > 0 && allyHero.data.in_battle_state == FightConstants_1.HeroInBattleState.HAS_IN_BATTLE) {
                    affectedUnits.push(allyHero);
                }
            }
        }
        else if ((skill.skill_pos == ConfigData_1.SkillPos.ONE_CIRCLE_GRID || skill.skill_pos == ConfigData_1.SkillPos.TWO_CIRCLE_GRID) && position) {
            if (!caster.data)
                return;
            var potentialTargets = caster.data.type == FightConstants_1.HeroType.ATTACK ? fightData.defense_hero_array : fightData.hero_item_array;
            var range = skill.skill_pos == ConfigData_1.SkillPos.ONE_CIRCLE_GRID ? 1 : 2;
            for (var i = 0; i < potentialTargets.length; i++) {
                var nearbyHero = potentialTargets[i];
                if (nearbyHero && nearbyHero.data) {
                    var _a = nearbyHero.data.grid_position, x = _a.x, y = _a.y;
                    if (x >= position.x - range && x <= position.x + range && y >= position.y - range && y <= position.y + range) {
                        affectedUnits.push(nearbyHero);
                    }
                }
            }
        }
        for (var i = 0; i < skill.effect_array.length; i++) {
            var effect = skill.effect_array[i];
            if (Math.random() < effect.trigger_ratio) {
                var buff = new FightTempData_1.BuffItemData();
                buff.id = effect.skill_effect_id;
                switch (buff.id) {
                    case ConfigData_1.SkillEffectId.REDUCE_DAMAGE:
                        buff.reduce_damage_ratio = effect.value;
                        buff.max_trigger_count = 1;
                        buff.is_start = true;
                        buff.is_end = false;
                        break;
                    case ConfigData_1.SkillEffectId.ATTACK_SPEED_UP:
                        buff.attack_speed_ratio = effect.value;
                        buff.max_trigger_count = 1;
                        buff.is_start = true;
                        buff.is_end = false;
                        break;
                    case ConfigData_1.SkillEffectId.ATTACK_BONUS:
                        buff.attack_bonus_ratio = effect.value;
                        buff.max_trigger_count = 1;
                        buff.is_start = true;
                        buff.is_end = false;
                        break;
                    case ConfigData_1.SkillEffectId.DIZZINESS:
                        buff.damage_value = 0;
                        buff.move_speed_scale = effect.value;
                        buff.max_trigger_count = 1;
                        buff.is_start = true;
                        buff.is_end = false;
                        break;
                    case ConfigData_1.SkillEffectId.DEFENSE_BONUS:
                        buff.defense_bonus_ratio = effect.value;
                        buff.max_trigger_count = 1;
                        buff.is_start = true;
                        buff.is_end = false;
                        break;
                    case ConfigData_1.SkillEffectId.RESTORE_HP:
                        buff.restore_hp_ratio = effect.value;
                        buff.max_trigger_count = Math.ceil(effect.duration);
                        buff.is_start = true;
                        buff.is_end = false;
                        break;
                    case ConfigData_1.SkillEffectId.FIRE:
                        buff.max_trigger_count = Math.ceil(effect.duration);
                        if (caster.data) {
                            buff.damage_value = Math.ceil((effect.value * caster.data.real_attack_value) / buff.max_trigger_count);
                        }
                        buff.is_start = false;
                        buff.is_end = true;
                        break;
                    case ConfigData_1.SkillEffectId.REDUCE_SPEED:
                        buff.damage_value = 0;
                        buff.move_speed_scale = Math.max(0, 1 - effect.value);
                        buff.max_trigger_count = 1;
                        buff.is_start = true;
                        buff.is_end = false;
                        break;
                    default:
                        cc.error("Unknown buff ID");
                }
                buff.start_time = fightData.total_time;
                buff.valid_time = effect.duration;
                buff.trigger_count = 0;
                buff.value = effect.value;
                for (var k = 0; k < affectedUnits.length; k++) {
                    affectedUnits[k].add_buff_data(buff);
                }
            }
        }
    };
    Fight.prototype.processHeroAction = function (heroIndex) {
        var _this = this;
        var fightData = GameManager_1.gm.data.fight_temp_data;
        var defenseHero = fightData.defense_hero_array[heroIndex];
        if (null == defenseHero) {
            return "continue";
        }
        var defenseData = fightData.defense_hero_data_array[heroIndex];
        if (defenseData.fight_state == FightConstants_1.HeroFightState.WAITING) {
            this.find_next_path(defenseData);
        }
        else if (defenseData.fight_state == FightConstants_1.HeroFightState.MOVING) {
            if (defenseData.move_path.length <= 0) {
                this.defense_hero_move_one_grid_action(defenseData);
            }
            else {
                var nextPosition = defenseData.move_path[0];
                var targetPosition = fightData.grid_position_to_position(cc.v2(nextPosition.x, nextPosition.y)).add(defenseData.offset);
                var movementVector = targetPosition.sub(defenseHero.node.position);
                var distanceToTarget = movementVector.mag();
                var moveDistance = fightData.delta_time * defenseData.real_move_speed;
                var angle = Math.atan2(movementVector.y, movementVector.x);
                if (0 < distanceToTarget && moveDistance < distanceToTarget) {
                    defenseHero.node.position = defenseHero.node.position.add(cc.v3(Math.cos(angle), Math.sin(angle)).mul(moveDistance));
                }
                else {
                    defenseHero.node.position = targetPosition;
                    defenseData.move_path.shift();
                    var gridItem = fightData.get_fight_map_item(defenseData.grid_position.x, defenseData.grid_position.y);
                    if (gridItem && gridItem.data) {
                        gridItem.data.remove_defense_hero_index(defenseData.array_index);
                    }
                    defenseData.grid_index = nextPosition.x + nextPosition.y * fightData.map_size.x;
                    defenseData.grid_position.x = nextPosition.x;
                    defenseData.grid_position.y = nextPosition.y;
                    defenseHero.node.zIndex = GameManager_1.gm.data.fight_temp_data.get_dynamic_node_layer(defenseData.grid_index, FightConstants_1.FightDynamicNodeLayer.MOVE);
                    this.defense_hero_move_one_grid_action(defenseData);
                }
                defenseHero.play_spine_anim(defenseData.move_path.length <= 0 ? "stay" : "move", angle);
            }
        }
        else if (defenseData.fight_state == FightConstants_1.HeroFightState.ATTACKING) {
            var target_1 = defenseData.find_path_target;
            if (target_1) {
                var targetHero_1 = fightData.hero_item_array[target_1.array_index];
                if (targetHero_1 && targetHero_1.node) {
                    var attackerPosition = fightData.get_fight_map_item(defenseData.grid_position.x, defenseData.grid_position.y);
                    var targetPosition = fightData.get_fight_map_item(target_1.grid_position.x, target_1.grid_position.y);
                    if (attackerPosition && targetPosition && targetPosition.node.position.sub(attackerPosition.node.position).mag() > defenseData.attack_range) {
                        defenseData.find_path_target = null;
                        defenseData.move_path = [];
                        defenseData.fight_state = FightConstants_1.HeroFightState.WAITING;
                        return {
                            value: undefined
                        };
                    }
                    if (0 < defenseData.attack_value && 0 < target_1.hp) {
                        if (0 == defenseData.last_attack_time || fightData.total_time - defenseData.last_attack_time > defenseData.real_attack_interval) {
                            defenseData.last_attack_time = fightData.total_time;
                            defenseData.attack_count++;
                            var targetGridPosition = target_1.grid_position;
                            var targetWorldPosition = fightData.grid_position_to_position(cc.v2(targetGridPosition.x, targetGridPosition.y));
                            var directionVector = targetWorldPosition.sub(defenseHero.node.position);
                            var attackAngle_2 = Math.atan2(directionVector.y, directionVector.x);
                            if (targetHero_1) {
                                var heroNode_1 = targetHero_1.node;
                                if (defenseData.attack_count % (FightConstants_1.FightConstants.SKILL_INTERVAL_NORMAL_ATTACK_COUNT + 1) == 0 && (GameManager_1.gm.data.fight_temp_data.is_debug || 0 < defenseData.skill_lv && 0 < defenseData.skill_id)) {
                                    var skillConfig_1 = GameManager_1.gm.config.get_row_data("SkillConfigData", defenseData.skill_id + "", defenseData.skill_lv + "");
                                    if (!skillConfig_1) {
                                        return {
                                            value: undefined
                                        };
                                    }
                                    defenseHero.play_skill_audio();
                                    defenseHero.play_spine_anim("skill", attackAngle_2, false, skillConfig_1.fire_time, function () {
                                        if ("" != skillConfig_1.skill_name) {
                                            if (skillConfig_1.skill_pos == ConfigData_1.SkillPos.ENEMY_BODY || skillConfig_1.skill_pos == ConfigData_1.SkillPos.ALL_ENEMY_BODY) {
                                                if (skillConfig_1.skill_type == ConfigData_1.SkillType.FLY) {
                                                    defenseHero.play_skill_fly_anim(skillConfig_1, heroNode_1, attackAngle_2, function () {
                                                        _this.defense_hero_skill_hit(defenseData, target_1, skillConfig_1, function () {
                                                            var heroItem = fightData.hero_item_array[target_1.array_index];
                                                            if (target_1 instanceof FightTempData_1.FightHeroItemData && heroItem && heroItem.data) {
                                                                _this.common_hero_skill_hit_buff(skillConfig_1, defenseHero, heroItem, heroItem.data.grid_position);
                                                            }
                                                        });
                                                    });
                                                }
                                                else {
                                                    _this.defense_hero_skill_hit(defenseData, target_1, skillConfig_1, function () {
                                                        var heroItem = fightData.hero_item_array[target_1.array_index];
                                                        if (target_1 instanceof FightTempData_1.FightHeroItemData && heroItem && heroItem.data) {
                                                            _this.common_hero_skill_hit_buff(skillConfig_1, defenseHero, heroItem, heroItem.data.grid_position);
                                                        }
                                                    });
                                                }
                                            }
                                            else {
                                                if (!(skillConfig_1.skill_pos != ConfigData_1.SkillPos.SELF_BODY && skillConfig_1.skill_pos != ConfigData_1.SkillPos.ALL_SELF_BODY)) { ///can than
                                                    defenseHero.play_skill_anim(skillConfig_1, heroNode_1, attackAngle_2, function () {
                                                        var heroItem = fightData.hero_item_array[target_1.array_index];
                                                        if (target_1 instanceof FightTempData_1.FightHeroItemData && heroItem && heroItem.data) {
                                                            _this.common_hero_skill_hit_buff(skillConfig_1, defenseHero, heroItem, heroItem.data.grid_position);
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                        else if ("" != skillConfig_1.hit_name) {
                                            if (skillConfig_1.skill_pos == ConfigData_1.SkillPos.ENEMY_BODY || skillConfig_1.skill_pos == ConfigData_1.SkillPos.ALL_ENEMY_BODY) {
                                                _this.defense_hero_skill_hit(defenseData, target_1, skillConfig_1, function () {
                                                    var heroItem = fightData.hero_item_array[target_1.array_index];
                                                    if (target_1 instanceof FightTempData_1.FightHeroItemData && heroItem && heroItem.data) {
                                                        _this.common_hero_skill_hit_buff(skillConfig_1, defenseHero, heroItem, heroItem.data.grid_position);
                                                    }
                                                });
                                            }
                                            else if (skillConfig_1.skill_pos == ConfigData_1.SkillPos.SELF_BODY || skillConfig_1.skill_pos == ConfigData_1.SkillPos.ALL_SELF_BODY) {
                                                _this.defense_hero_skill_hit(defenseData, defenseData, skillConfig_1, function () {
                                                    defenseHero.data && _this.common_hero_skill_hit_buff(skillConfig_1, defenseHero, defenseHero, defenseHero.data.grid_position);
                                                });
                                                if (skillConfig_1.skill_pos == ConfigData_1.SkillPos.ALL_SELF_BODY) {
                                                    for (var index = 0; index < fightData.defense_hero_array.length; index++) {
                                                        (function (index) {
                                                            var defenseHero = fightData.defense_hero_array[index];
                                                            var defenseHeroData = fightData.defense_hero_data_array[index];
                                                            if (defenseHeroData && defenseHeroData != defenseData) {
                                                                _this.hero_skill_hit(defenseHeroData, defenseHeroData, skillConfig_1, function () {
                                                                    if (defenseHero.data) {
                                                                        _this.common_hero_skill_hit_buff(skillConfig_1, defenseHero, defenseHero, defenseHero.data.grid_position);
                                                                    }
                                                                });
                                                            }
                                                        })(index);
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            var heroItem = fightData.hero_item_array[target_1.array_index];
                                            if (target_1 instanceof FightTempData_1.FightHeroItemData) {
                                                heroItem && heroItem.data && _this.common_hero_skill_hit_buff(skillConfig_1, defenseHero, heroItem, heroItem.data.grid_position);
                                            }
                                            else {
                                                _this.common_hero_skill_hit_buff(skillConfig_1, defenseHero, null, null);
                                            }
                                        }
                                    }, skillConfig_1.prepare_skill_anim_time, function () {
                                        targetHero_1.play_spine_anim("stay", attackAngle_2);
                                    });
                                    if (skillConfig_1.prepare_skill_anim_time >= defenseData.real_attack_interval) {
                                        // cc.error("英雄的攻击动画时间不能大于攻击间隔");
                                        cc.error("Thời gian hoạt ảnh tấn công của anh hùng không thể dài hơn khoảng thời gian tấn công.");
                                    }
                                }
                                else {
                                    defenseHero.play_attack_audio();
                                    defenseHero.play_spine_anim("attack", attackAngle_2, false, defenseData.fly_weapon_time, function () {
                                        if (defenseData.attack_type == ConfigData_1.AttackType.REMOTE) {
                                            defenseHero.play_weapon_fly_anim(heroNode_1, attackAngle_2, function () {
                                                _this.defense_hero_attack_hit(defenseHero, defenseData, attackAngle_2, target_1);
                                            });
                                        }
                                        else {
                                            _this.defense_hero_attack_hit(defenseHero, defenseData, attackAngle_2, target_1);
                                        }
                                    }, defenseData.attack_anim_time, function () {
                                        defenseHero.play_spine_anim("stay", attackAngle_2);
                                    });
                                    if (defenseData.attack_anim_time >= defenseData.real_attack_interval) {
                                        // cc.error("防守英雄的攻击动画时间不能大于攻击间隔");
                                        cc.error("Thời gian hoạt ảnh tấn công của anh hùng phòng thủ không thể dài hơn khoảng thời gian tấn công.");
                                    }
                                }
                            }
                        }
                        return "continue";
                    }
                }
            }
            else {
                cc.error("defense_hero_data.find_path_target need != null");
            }
            defenseData.move_path = [];
            defenseData.find_path_target = null;
            defenseData.fight_state = FightConstants_1.HeroFightState.WAITING;
        }
    };
    Fight.prototype.update_defense_hero_action = function () {
        var defenseHeroArr = GameManager_1.gm.data.fight_temp_data.defense_hero_array;
        for (var index = 0; index < defenseHeroArr.length; index++) {
            var heroAct = this.processHeroAction(index);
            if (typeof heroAct === "object" && heroAct != undefined && "value" in heroAct) {
                return heroAct.value;
            }
        }
    };
    Fight.prototype.defense_hero_move_one_grid_action = function (heroData) {
        var fightTempData = GameManager_1.gm.data.fight_temp_data;
        var currentGridItem = fightTempData.get_fight_map_item(heroData.grid_position.x, heroData.grid_position.y);
        if (currentGridItem && currentGridItem.data) {
            var gridItemData = currentGridItem.data.add_defense_hero_index(heroData.array_index);
            heroData.offset = gridItemData.offset;
            var targetItem = heroData.find_path_target;
            if (targetItem instanceof FightTempData_1.FightHeroItemData) {
                var targetPosition = fightTempData.get_fight_map_item(targetItem.grid_position.x, targetItem.grid_position.y).node.position;
                var distanceToTarget = targetPosition.sub(currentGridItem.node.position).mag();
                if (distanceToTarget <= heroData.attack_range) {
                    heroData.fight_state = FightConstants_1.HeroFightState.ATTACKING;
                    heroData.move_path = [];
                }
            }
        }
    };
    Fight.prototype.defense_hero_attack_hit = function (attacker, attackData, attackAngle, targetData) {
        var fightTempData = GameManager_1.gm.data.fight_temp_data;
        var targetHero = fightTempData.hero_item_array[targetData.array_index];
        if (targetHero) {
            targetHero.change_hp(-attackData.real_attack_value);
            if (targetData.find_path_target instanceof FightTempData_1.FightBuildingItemData &&
                targetData.find_path_target.hp / targetData.find_path_target.max_hp >= 0.45 &&
                this.find_next_path_distance(targetData.grid_position, attackData.grid_position) != Number.MAX_SAFE_INTEGER) {
                this.find_next_path(targetData, attackData);
            }
            var hitAnimationName = "hit";
            var heroConfigData = GameManager_1.gm.config.get_row_data("HeroConfigData", attackData.id.toString());
            if (heroConfigData && heroConfigData.hit_name) {
                hitAnimationName = heroConfigData.hit_name;
            }
            targetHero.play_hit_anim(targetHero.node, hitAnimationName);
            if (targetData.hp <= 0) {
                attacker.play_spine_anim("stay", attackAngle);
                targetHero.put_to_pool();
                fightTempData.death_hero_count++;
                attackData.move_path = [];
                attackData.find_path_target = null;
                attackData.fight_state = FightConstants_1.HeroFightState.WAITING;
                if (fightTempData.death_hero_count >= fightTempData.hero_data_array.length) {
                    this.fight_revive(false);
                }
            }
        }
    };
    Fight.prototype.update_building_action = function () {
        var _this = this;
        var fightTempData = GameManager_1.gm.data.fight_temp_data;
        var _loop_3 = function (index) {
            var buildingItem = fightTempData.building_item_array[index];
            var buildingData = fightTempData.building_data_array[index];
            if (buildingItem && buildingData && buildingData.attack_value > 0) {
                var target_2 = buildingData.lock_attack_target;
                if (target_2) {
                    var targetHero = fightTempData.hero_item_array[target_2.array_index];
                    if (targetHero) {
                        var targetGridPosition = fightTempData.grid_position_to_position(cc.v2(target_2.grid_position.x, target_2.grid_position.y));
                        var buildingGridPosition = fightTempData.grid_position_to_position(cc.v2(buildingData.grid_position.x, buildingData.grid_position.y));
                        var directionVector = targetGridPosition.sub(buildingGridPosition);
                        var attackAngle = Math.atan2(directionVector.y, directionVector.x);
                        if (directionVector.mag() < buildingData.attack_range && target_2.hp > 0) {
                            if (buildingData.last_attack_time == 0 || fightTempData.total_time - buildingData.last_attack_time > buildingData.attack_interval) {
                                if (buildingData.attack_type == ConfigData_1.AttackType.REMOTE) {
                                    buildingItem.play_weapon_fly_anim(targetHero.node, attackAngle, function () {
                                        _this.building_attack_hit(buildingData, target_2);
                                    });
                                }
                                buildingData.last_attack_time = fightTempData.total_time;
                            }
                        }
                        else {
                            buildingData.lock_attack_target = this_1.find_building_attack_target(buildingData);
                        }
                    }
                    else {
                        buildingData.lock_attack_target = this_1.find_building_attack_target(buildingData);
                    }
                }
                else {
                    buildingData.lock_attack_target = this_1.find_building_attack_target(buildingData);
                }
            }
        };
        var this_1 = this;
        for (var index = 0; index < fightTempData.building_data_array.length; index++) {
            _loop_3(index);
        }
    };
    Fight.prototype.building_attack_hit = function (buildingData, targetHeroData) {
        var fightTempData = GameManager_1.gm.data.fight_temp_data;
        var targetHeroItem = fightTempData.hero_item_array[targetHeroData.array_index];
        if (!targetHeroItem)
            return;
        targetHeroItem.change_hp(-buildingData.attack_value);
        targetHeroItem.play_hit_anim(targetHeroItem.node);
        if (targetHeroData.hp <= 0) {
            targetHeroItem.put_to_pool();
            fightTempData.death_hero_count++;
            if (fightTempData.death_hero_count >= fightTempData.hero_data_array.length) {
                this.fight_revive(false);
            }
        }
    };
    Fight.prototype.update_wall_action = function () {
        var _this = this;
        var fightTempData = GameManager_1.gm.data.fight_temp_data;
        var _loop_4 = function (i) {
            var wallItem = fightTempData.wall_item_array[i];
            var wallData = fightTempData.wall_data_array[i];
            if (wallItem && wallData && wallData.attack_value > 0) {
                wallItem.data = wallData;
                var attackTarget_1 = wallData.lock_attack_target;
                if (attackTarget_1) {
                    var targetHeroItem_1 = fightTempData.hero_item_array[attackTarget_1.array_index];
                    if (targetHeroItem_1) {
                        var targetPos = fightTempData.grid_position_to_position(cc.v2(attackTarget_1.grid_position.x, attackTarget_1.grid_position.y));
                        var wallPos = wallItem.node.position;
                        var directionVector = targetPos.sub(wallPos);
                        var angle_1 = Math.atan2(directionVector.y, directionVector.x);
                        if (directionVector.mag() < wallData.attack_range && attackTarget_1.hp > 0) {
                            if (wallData.last_attack_time == 0 || (fightTempData.total_time - wallData.last_attack_time > wallData.attack_interval)) {
                                wallData.last_attack_time = fightTempData.total_time;
                                wallItem.play_attack_audio();
                                wallItem.play_spine_anim(angle_1, wallData.fly_weapon_time, function () {
                                    if (wallData.attack_type == ConfigData_1.AttackType.REMOTE) {
                                        wallItem.play_weapon_fly_anim(targetHeroItem_1.node, angle_1, function () {
                                            _this.wall_attack_hit(wallData, attackTarget_1);
                                        });
                                    }
                                    else {
                                        _this.wall_attack_hit(wallData, attackTarget_1);
                                    }
                                });
                            }
                        }
                        else {
                            wallData.lock_attack_target = this_2.find_building_attack_target(wallData);
                        }
                    }
                }
                else {
                    wallData.lock_attack_target = this_2.find_building_attack_target(wallData);
                }
            }
        };
        var this_2 = this;
        for (var i = 0; i < fightTempData.wall_data_array.length; i++) {
            _loop_4(i);
        }
    };
    Fight.prototype.wall_attack_hit = function (wallData, targetHeroData) {
        var fightTempData = GameManager_1.gm.data.fight_temp_data;
        var targetHero = fightTempData.hero_item_array[targetHeroData.array_index];
        if (targetHero) {
            var skillConfig = GameManager_1.gm.config.get_row_data("SkillConfigData", "" + wallData.skill_id, "" + wallData.skill_lv);
            this.common_hero_skill_hit_buff(skillConfig, null, targetHero, targetHero.data.grid_position);
            targetHero.change_hp(-wallData.real_attack_value);
            var hitAnimation = "hit";
            var heroConfig = GameManager_1.gm.config.get_row_data("HeroConfigData", "" + wallData.id);
            if (heroConfig && heroConfig.hit_name != "") {
                hitAnimation = heroConfig.hit_name;
            }
            targetHero.play_hit_anim(targetHero.node, hitAnimation);
            if (targetHeroData.hp <= 0) {
                targetHero.put_to_pool();
                fightTempData.death_hero_count++;
                if (fightTempData.death_hero_count >= fightTempData.hero_data_array.length) {
                    this.fight_revive(false);
                }
            }
        }
    };
    Fight.prototype.update_buff_action = function () {
        var fightTempData = GameManager_1.gm.data.fight_temp_data;
        for (var i = 0; i < fightTempData.hero_item_array.length; i++) {
            var hero = fightTempData.hero_item_array[i];
            if (hero) {
                hero.check_hero_buff(fightTempData.total_time);
            }
        }
        for (var i = 0; i < fightTempData.defense_hero_array.length; i++) {
            var defenseHero = fightTempData.defense_hero_array[i];
            if (defenseHero) {
                defenseHero.check_hero_buff(fightTempData.total_time);
            }
        }
    };
    Fight.prototype.update_view = function () {
        var fightTempData = GameManager_1.gm.data.fight_temp_data;
        var fightData = GameManager_1.gm.data.fight_data;
        var mapCellData = GameManager_1.gm.data.mapCell_data;
        this.name_lbl.string = fightTempData.name;
        this.hero_list.setData(fightTempData.hero_data_array);
        this.speed_1_btn.node.active = fightData.speed_scale == GameManager_1.gm.const.FIGHT_SPEED_X1 && !mapCellData.isGuide;
        this.speed_2_btn.node.active = fightData.speed_scale == GameManager_1.gm.const.FIGHT_SPEED_X2 && !mapCellData.isGuide;
        this.left_sec_lbl.string = Utils_1.Utils.time_format(fightTempData.left_fight_time, "mm:ss");
        var shouldShowReturnBtn = !mapCellData.isGuide && fightTempData.show_return_btn_timestamp > 0 && Date.now() > fightTempData.show_return_btn_timestamp;
        this.return_btn.node.active = shouldShowReturnBtn;
    };
    Fight.prototype.fight_start = function () {
        var _this = this;
        var fightData = GameManager_1.gm.data.fight_data;
        var fightTempData = GameManager_1.gm.data.fight_temp_data;
        fightData.fight_count++;
        fightData.async_write_data();
        var heroData = fightTempData.hero_data_array[0];
        heroData.in_battle_state = FightConstants_1.HeroInBattleState.WILL_IN_BATTLE;
        fightTempData.in_battle_hero_data = heroData;
        GameManager_1.gm.data.event_emitter.emit("fight_in_battle", heroData);
        this.reward_list.setData(fightTempData.reward_data_array);
        this.scheduleOnce(function () {
            cc.director.getScheduler().setTimeScale(fightData.speed_scale);
            GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_18_FIGHT_TIME);
            switch (fightTempData.play_type) {
                case 0:
                    GameManager_1.gm.audio.play_music(GameManager_1.gm.const.AUDIO_93_FIGHT_MUSIC);
                    break;
                case 1:
                    GameManager_1.gm.audio.play_music(GameManager_1.gm.const.AUDIO_96_ISLAND_MUSIC);
                    break;
                case 2:
                    GameManager_1.gm.audio.play_music(GameManager_1.gm.const.AUDIO_95_CAVES_MUSIC);
                    break;
            }
            if (fightTempData.play_type == 0 || fightTempData.play_type == 1) {
                _this.boat_node.active = true;
                _this.boat_node.position = fightTempData.boat_start_position;
                Utils_1.Utils.async_set_sprite_frame(_this.boat_spr, Constants_1.BundleName.MAP, "res/build/" + fightTempData.boat_id);
                _this.boat_anim.once(cc.Animation.EventType.FINISHED, function () {
                    _this.boat_anim.play("ship_normal");
                    fightTempData.fight_state = FightData_1.FightState.RUN;
                    _this.apply_passive_skill_effect();
                });
                _this.boat_anim.play("ship_in");
            }
            else {
                _this.boat_node.active = false;
                fightTempData.fight_state = FightData_1.FightState.RUN;
                _this.apply_passive_skill_effect();
            }
            if (GameManager_1.gm.data.record_data.record_state != 1) {
                GameManager_1.gm.channel.record_start();
                GameManager_1.gm.data.record_data.record_state = 1;
                GameManager_1.gm.data.record_data.record_type = 0;
                GameManager_1.gm.data.record_data.record_timestamp = Date.now();
                GameManager_1.gm.data.event_emitter.emit(RecordData_1.RecordData.RECORD_STATE_CHANGE);
            }
        }, 0);
    };
    Fight.prototype.fight_success = function () {
        var _this = this;
        var fightTempData = GameManager_1.gm.data.fight_temp_data;
        if (fightTempData.play_type <= 1) {
            GameManager_1.gm.data.ladder_data.fail_count = 0;
            GameManager_1.gm.data.ladder_data.async_write_data();
        }
        else if (fightTempData.play_type == 2) {
            GameManager_1.gm.channel.report_event("cave_layer", {
                event_desc: cc.js.formatStr("洞窟过关%d层人数", GameManager_1.gm.data.fight_data.caves_layer),
                desc: cc.js.formatStr("洞窟通关第%d层人数", GameManager_1.gm.data.fight_data.caves_layer),
                layer: GameManager_1.gm.data.fight_data.caves_layer
            });
            GameManager_1.gm.data.fight_data.caves_layer++;
            GameManager_1.gm.data.fight_data.async_write_data();
        }
        fightTempData.fight_state = FightData_1.FightState.SUCCESS;
        var timeScaleSuffix = cc.director.getScheduler().getTimeScale() == GameManager_1.gm.const.FIGHT_SPEED_X2 ? "_x2" : "";
        for (var i = fightTempData.hero_item_array.length - 1; i >= 0; i--) {
            var heroItem = fightTempData.hero_item_array[i];
            if (heroItem && heroItem.data && heroItem.data.id > 0) {
                var heroConfig = GameManager_1.gm.config.get_row_data("HeroConfigData", heroItem.data.id.toString());
                if (heroConfig === null || heroConfig === void 0 ? void 0 : heroConfig.success_audio) {
                    GameManager_1.gm.audio.play_effect(heroConfig.success_audio + timeScaleSuffix);
                }
            }
        }
        GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_21_FIGHT_SUCCESS);
        cc.director.getScheduler().setTimeScale(GameManager_1.gm.const.FIGHT_SPEED_X1);
        this.update_view();
        this.scheduleOnce(function () {
            fightTempData.hero_item_array.forEach(function (heroItem, index) {
                _this.scheduleOnce(function () {
                    _this.hero_jump_to_boat(heroItem);
                }, 0.05 * index);
            });
        }, 0.5);
        this.scheduleOnce(function () {
            fightTempData.build_fight_result_data();
            _this.fight_clear();
            if (GameManager_1.gm.data.fight_temp_data.play_type == 0) {
                GameManager_1.gm.channel.report_event("fight", {
                    event_desc: "突袭",
                    desc: "成功"
                });
                NetUtils_1.ReportData.instance.report_once_point(10823);
                NetUtils_1.ReportData.instance.report_point(10824);
            }
            else if (GameManager_1.gm.data.fight_temp_data.play_type == 2) {
                GameManager_1.gm.channel.report_event("attack_caves", {
                    event_desc: "攻打洞窟",
                    layer: GameManager_1.gm.data.fight_data.caves_layer,
                    desc: cc.js.formatStr("通关洞窟%d层", GameManager_1.gm.data.fight_data.caves_layer)
                });
                NetUtils_1.ReportData.instance.report_once_point(10900 + GameManager_1.gm.data.fight_data.caves_layer);
            }
            // Nếu đang hướng dẫn, gửi sự kiện báo cáo hướng dẫn
            if (GameManager_1.gm.data.mapCell_data.isGuide) {
                GameManager_1.gm.channel.report_event("ohayoo_game_guide", {
                    guideid: 16,
                    guidedesc: cc.js.formatStr("16.进入战斗结算界面")
                });
            }
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.FightResult);
        }, 2);
    };
    Fight.prototype.fight_revive = function (isRevive) {
        var _this = this;
        var fightTempData = GameManager_1.gm.data.fight_temp_data;
        if (!isRevive) {
            GameManager_1.gm.data.fight_temp_data.fight_state = FightData_1.FightState.REVIVE;
            GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.FightReviveHero.key, {
                callback: function (choice) {
                    if (choice == 0) {
                        for (var i = fightTempData.hero_item_array.length - 1; i >= 0; i--) {
                            var heroItem = fightTempData.hero_item_array.pop();
                            if (heroItem) {
                                heroItem.reset();
                                GameManager_1.gm.pool.put(heroItem.node);
                            }
                        }
                        for (var i = fightTempData.reward_data_array.length - 1; i >= 0; i--) {
                            var reward = fightTempData.reward_data_array[i];
                            if (reward.id > 22000 && reward.id < 23000) {
                                fightTempData.reward_data_array.splice(i, 1);
                            }
                        }
                        fightTempData.goto_battle_count = 0;
                        fightTempData.death_hero_count = 0;
                        fightTempData.total_time = 0;
                        fightTempData.hero_data_array = [];
                        fightTempData.build_hero_array(true);
                        var firstHero = fightTempData.hero_data_array[0];
                        firstHero.in_battle_state = FightConstants_1.HeroInBattleState.WILL_IN_BATTLE;
                        fightTempData.in_battle_hero_data = firstHero;
                        GameManager_1.gm.data.event_emitter.emit("fight_in_battle", firstHero);
                        for (var i = 0; i < fightTempData.map_item_data_array.length; i++) {
                            var mapItem = fightTempData.map_item_data_array[i];
                            if (mapItem) {
                                mapItem.hero_index_array = [];
                            }
                        }
                        for (var i = 0; i < fightTempData.map_item_array.length; i++) {
                            var mapItem = fightTempData.map_item_array[i];
                            if (mapItem && mapItem.data) {
                                mapItem.update_view();
                            }
                        }
                        // Xử lý các hero phòng thủ
                        for (var i = fightTempData.defense_hero_data_array.length - 1; i >= 0; i--) {
                            var defenseHero = fightTempData.defense_hero_data_array[i];
                            if (defenseHero) {
                                defenseHero.last_attack_time = 0;
                                defenseHero.find_path_target = null;
                                defenseHero.move_path = [];
                                defenseHero.fight_state = FightConstants_1.HeroFightState.WAITING;
                            }
                        }
                        GameManager_1.gm.data.fight_temp_data.fight_state = FightData_1.FightState.RUN;
                        _this.update_view();
                    }
                    else {
                        _this.fight_fail();
                    }
                }
            });
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.FightReviveHero);
        }
        else {
            this.fight_fail();
        }
    };
    Fight.prototype.fight_return = function () {
        NetUtils_1.ReportData.instance.report_once_point(10667);
        NetUtils_1.ReportData.instance.report_point(10668);
        GameManager_1.gm.data.fight_temp_data.build_fight_result_data(true);
        this.fight_clear();
        GameManager_1.gm.ui.show_start();
    };
    Fight.prototype.fight_fail = function () {
        var _this = this;
        var fightTempData = GameManager_1.gm.data.fight_temp_data;
        var ladderData = GameManager_1.gm.data.ladder_data;
        ladderData.fail_count++;
        ladderData.async_write_data();
        GameManager_1.gm.data.start_data.async_write_data();
        fightTempData.fight_state = FightData_1.FightState.FAIL;
        cc.director.getScheduler().setTimeScale(GameManager_1.gm.const.FIGHT_SPEED_X1);
        GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_20_FIGHT_FAIL);
        this.update_view();
        this.scheduleOnce(function () {
            fightTempData.build_fight_result_data();
            _this.fight_clear();
            if (GameManager_1.gm.data.fight_temp_data.play_type == 0) {
                GameManager_1.gm.channel.report_event("fight", {
                    event_desc: "突袭",
                    desc: "失败"
                });
                NetUtils_1.ReportData.instance.report_once_point(10825);
                NetUtils_1.ReportData.instance.report_point(10826);
            }
            if (GameManager_1.gm.data.mapCell_data.isGuide) {
                GameManager_1.gm.channel.report_event("ohayoo_game_guide", {
                    guideid: 16,
                    guidedesc: cc.js.formatStr("16.进入战斗结算界面")
                });
            }
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.FightResult);
        }, 2);
    };
    Fight.prototype.fight_reset = function () {
        this.fight_clear();
    };
    Fight.prototype.fight_clear = function () {
        var fightTempData = GameManager_1.gm.data.fight_temp_data;
        this.hero_list.reset();
        this.reward_list.reset();
        for (var i = fightTempData.building_destroy_array.length - 1; i >= 0; i--) {
            var node = fightTempData.building_destroy_array.pop();
            if (node) {
                GameManager_1.gm.pool.put(node.node);
            }
        }
        for (var i = fightTempData.hero_death_array.length - 1; i >= 0; i--) {
            var hero = fightTempData.hero_death_array.pop();
            if (hero) {
                var animation = hero.getComponent(cc.Animation);
                if (animation) {
                    animation.stop();
                    animation.clear();
                }
                GameManager_1.gm.pool.put(hero.node);
            }
        }
        for (var i = fightTempData.skill_item_array.length - 1; i >= 0; i--) {
            var node = fightTempData.skill_item_array.pop();
            if (node) {
                GameManager_1.gm.pool.put(node.node);
            }
        }
        for (var i = fightTempData.hero_item_array.length - 1; i >= 0; i--) {
            var hero = fightTempData.hero_item_array.pop();
            if (hero) {
                hero.reset();
                GameManager_1.gm.pool.put(hero.node);
            }
        }
        for (var i = fightTempData.defense_hero_array.length - 1; i >= 0; i--) {
            var defenseHero = fightTempData.defense_hero_array.pop();
            if (defenseHero) {
                defenseHero.reset();
                GameManager_1.gm.pool.put(defenseHero.node);
            }
        }
        for (var i = fightTempData.building_item_array.length - 1; i >= 0; i--) {
            var building = fightTempData.building_item_array.pop();
            if (building) {
                building.reset();
                GameManager_1.gm.pool.put(building.node);
            }
        }
        for (var i = fightTempData.wall_item_array.length - 1; i >= 0; i--) {
            var wall = fightTempData.wall_item_array.pop();
            if (wall) {
                wall.reset();
                GameManager_1.gm.pool.put(wall.node);
            }
        }
        for (var i = fightTempData.prop_item_array.length - 1; i >= 0; i--) {
            var prop = fightTempData.prop_item_array.pop();
            if (prop) {
                prop.reset();
                GameManager_1.gm.pool.put(prop.node);
            }
        }
        for (var i = fightTempData.decoration_item_array.length - 1; i >= 0; i--) {
            var decoration = fightTempData.decoration_item_array.pop();
            if (decoration) {
                decoration.reset();
                GameManager_1.gm.pool.put(decoration.node);
            }
        }
        for (var i = fightTempData.map_item_array.length - 1; i >= 0; i--) {
            var mapItem = fightTempData.map_item_array.pop();
            if (mapItem) {
                mapItem.reset();
                GameManager_1.gm.pool.put(mapItem.node);
            }
        }
        GameManager_1.gm.pool.put_children(this.effect_node);
        GameManager_1.gm.pool.put_children(this.text_node);
        fightTempData.in_battle_hero_data = null;
        fightTempData.goto_battle_count = 0;
        fightTempData.delta_time = 0;
        fightTempData.total_time = 0;
        fightTempData.show_return_btn_timestamp = 0;
        fightTempData.has_pop_revive = false;
        fightTempData.fight_state = FightData_1.FightState.NONE;
        fightTempData.record_fight_state = FightData_1.FightState.NONE;
        fightTempData.death_hero_count = 0;
        fightTempData.defense_hero_data_array = [];
        fightTempData.prop_data_array = [];
        fightTempData.map_item_data_array = [];
        fightTempData.decoration_data_array = [];
        fightTempData.building_data_array = [];
        fightTempData.reward_data_array = [];
        fightTempData.wall_data_array = [];
        fightTempData.skill_data_array = [];
        fightTempData.building_destroy_array = [];
        fightTempData.hero_death_array = [];
        this.boat_node.active = false;
        this.wave_ps.node.active = false;
    };
    Fight.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.speed_1_btn.node) {
            this.speed_2_btn.node.active = true;
            this.speed_1_btn.node.active = false;
            GameManager_1.gm.data.fight_data.speed_scale = GameManager_1.gm.const.FIGHT_SPEED_X2;
            GameManager_1.gm.data.fight_data.async_write_data();
            cc.director.getScheduler().setTimeScale(GameManager_1.gm.data.fight_data.speed_scale);
        }
        else if (event.target == this.speed_2_btn.node) {
            this.speed_2_btn.node.active = false;
            this.speed_1_btn.node.active = true;
            GameManager_1.gm.data.fight_data.speed_scale = GameManager_1.gm.const.FIGHT_SPEED_X1;
            GameManager_1.gm.data.fight_data.async_write_data();
            cc.director.getScheduler().setTimeScale(GameManager_1.gm.data.fight_data.speed_scale);
        }
        else if (event.target == this.return_btn.node) {
            GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.FightReturn);
        }
    };
    Fight.prototype.fly_to_boat = function (node, shouldInstantiate) {
        if (shouldInstantiate) {
            var originalParent = node.parent;
            node = cc.instantiate(node);
            node.parent = originalParent;
        }
        var startWorldPosition = node.convertToWorldSpaceAR(cc.v3(0, 60));
        var startLocalPosition = this.window_node.convertToNodeSpaceAR(startWorldPosition);
        node.removeFromParent();
        node.position = startLocalPosition;
        this.window_node.addChild(node);
        var targetWorldPosition = this.boat_box_node.convertToWorldSpaceAR(cc.Vec3.ZERO);
        var targetLocalPosition = this.window_node.convertToNodeSpaceAR(targetWorldPosition);
        var startPoint = cc.v2(startLocalPosition);
        var endPoint = cc.v2(targetLocalPosition);
        var controlPoint1 = startPoint.add(endPoint.sub(startPoint).multiply(cc.v2(0.14, 0.9)));
        var controlPoint2 = startPoint.add(endPoint.sub(startPoint).multiply(cc.v2(0.53, 1.54)));
        cc.tween(node).parallel(cc.tween().to(0.6, { scale: 0.8 }), cc.tween().bezierTo(0.6, controlPoint1, controlPoint2, endPoint)).call(function () {
            var nodePoolItem = node.getComponent(NodePoolItem_1.NodePoolItem);
            if (nodePoolItem) {
                GameManager_1.gm.pool.put(nodePoolItem.node);
            }
            else {
                node.removeFromParent();
                node.destroy();
            }
        }).start();
    };
    Fight.prototype.hero_jump_to_boat = function (hero) {
        if (hero) {
            var heroNode_2 = hero.node;
            var worldStartPosition = heroNode_2.convertToWorldSpaceAR(cc.v3(0, 60));
            var localStartPosition = this.window_node.convertToNodeSpaceAR(worldStartPosition);
            heroNode_2.removeFromParent();
            heroNode_2.position = localStartPosition;
            this.window_node.addChild(heroNode_2);
            var worldBoatPosition = this.boat_node.convertToWorldSpaceAR(cc.Vec3.ZERO);
            var localBoatPosition = this.window_node.convertToNodeSpaceAR(worldBoatPosition);
            var startPoint = cc.v2(localStartPosition);
            var endPoint = cc.v2(localBoatPosition);
            var controlPoint1 = startPoint.add(endPoint.sub(startPoint).multiply(cc.v2(0.14, 0.9)));
            var controlPoint2 = startPoint.add(endPoint.sub(startPoint).multiply(cc.v2(0.53, 1.54)));
            cc.tween(heroNode_2).parallel(cc.tween().to(0.6, { scale: 0.8 }), cc.tween().bezierTo(0.6, startPoint.add(controlPoint1), startPoint.add(controlPoint2), endPoint)).call(function () {
                var nodePoolItem = heroNode_2.getComponent(NodePoolItem_1.NodePoolItem);
                if (nodePoolItem) {
                    GameManager_1.gm.pool.put(nodePoolItem.node);
                }
                else {
                    heroNode_2.removeFromParent();
                    heroNode_2.destroy();
                }
            }).start();
        }
    };
    Fight.prototype.get_go_ashore_floor_position = function (startPosition) {
        var fightData = GameManager_1.gm.data.fight_temp_data;
        var targetPosition = startPosition;
        var directionKey = "";
        outerLoop: for (var i = 1; i < 3; i++) {
            for (var edgeDirection in fightData.edge_map) {
                directionKey = edgeDirection;
                targetPosition = startPosition.add(cc.v2(fightData.edge_map[edgeDirection]).multiplyScalar(i));
                if (targetPosition.x < 0 ||
                    targetPosition.x >= fightData.map_size.x ||
                    targetPosition.y < 0 ||
                    targetPosition.y >= fightData.map_size.y)
                    break outerLoop;
                if (!fightData.map_item_data_array[targetPosition.x + targetPosition.y * fightData.map_size.x]) {
                    break outerLoop;
                }
            }
        }
        return {
            dir_key: directionKey,
            floor_position: fightData.grid_position_to_floor_position(targetPosition)
        };
    };
    Fight.prototype.goto_battle = function (heroData) {
        var _this = this;
        var fightData = GameManager_1.gm.data.fight_temp_data;
        if (fightData.goto_battle_count < fightData.hero_data_array.length) {
            if (0 == fightData.show_return_btn_timestamp) {
                (fightData.show_return_btn_timestamp = Date.now() + GameManager_1.gm.const.FIGHT_RETURN_BUTTON_APPEAR_TIME);
            }
            var currentHero = fightData.in_battle_hero_data;
            if (currentHero && currentHero.in_battle_state == FightConstants_1.HeroInBattleState.WILL_IN_BATTLE) {
                currentHero.in_battle_state = FightConstants_1.HeroInBattleState.HAS_IN_BATTLE;
                GameManager_1.gm.data.event_emitter.emit("fight_in_battle", currentHero);
                fightData.goto_battle_count++;
                var battlePosition_1 = heroData.data;
                currentHero.grid_index = battlePosition_1.cell_id;
                currentHero.grid_position.x = battlePosition_1.grid_position.x;
                currentHero.grid_position.y = battlePosition_1.grid_position.y;
                var heroIndex = battlePosition_1.add_hero_index(currentHero.array_index);
                currentHero.offset = heroIndex.offset;
                var heroArrayIndex_1 = currentHero.array_index;
                if (fightData.play_type < 2) {
                    var goAshorePosition_1 = this.get_go_ashore_floor_position(currentHero.grid_position);
                    GameManager_1.gm.pool.async_get(Constants_1.BundleName.FIGHT, "prefabs/fight_hero_item", FightHeroItem_1.FightHeroItem, function (heroItemPrefab) {
                        GameManager_1.gm.pool.async_get(Constants_1.BundleName.FIGHT, "prefabs/battle_ship", NodePoolItem_1.NodePoolItem, function (battleShipPrefab) {
                            _this.map_node.addChild(battleShipPrefab.node, -1);
                            battleShipPrefab.node.position = goAshorePosition_1.floor_position;
                            battleShipPrefab.node.getChildByName("role").addChild(heroItemPrefab.node);
                            var heroData = fightData.hero_data_array[heroArrayIndex_1];
                            heroItemPrefab.data = heroData;
                            fightData.hero_item_array[heroArrayIndex_1] = heroItemPrefab;
                            var e, o, i, _, n, r, d, s;
                            var animationComponent = battleShipPrefab.getComponent(cc.Animation);
                            if (animationComponent) {
                                var shipAnimationName = "battle_c_ship";
                                var scaleX = 1;
                                var scaleY = 0;
                                var offset = cc.Vec3.ZERO;
                                if (goAshorePosition_1.dir_key == FightTempData_1.EdgeEnum[FightTempData_1.EdgeEnum.LEFT]) {
                                    shipAnimationName = "battle_c_ship";
                                    scaleY = scaleX = -1;
                                    offset = cc.v3(-30, 20);
                                }
                                else if (goAshorePosition_1.dir_key == FightTempData_1.EdgeEnum[FightTempData_1.EdgeEnum.RIGHT]) {
                                    shipAnimationName = "battle_c_ship";
                                    scaleY = scaleX = 1;
                                    offset = cc.v3(60, -20);
                                }
                                else if (goAshorePosition_1.dir_key == FightTempData_1.EdgeEnum[FightTempData_1.EdgeEnum.TOP]) {
                                    shipAnimationName = "battle_f_ship";
                                    scaleY = -(scaleX = 1);
                                    offset = cc.v3(-10, 30);
                                }
                                else if (goAshorePosition_1.dir_key == FightTempData_1.EdgeEnum[FightTempData_1.EdgeEnum.BOTTOM]) {
                                    shipAnimationName = "battle_b_ship";
                                    scaleY = scaleX = 1;
                                    offset = cc.v3(-20, -30);
                                }
                                animationComponent.once(cc.Animation.EventType.FINISHED, function () {
                                    GameManager_1.gm.pool.put(animationComponent.node);
                                });
                                var targetPosition_1 = fightData.grid_position_to_position(battlePosition_1.grid_position);
                                var travelDuration_1 = 1;
                                var currentPosition = _this.convert_to_map_point(heroItemPrefab.node, cc.Vec3.ZERO);
                                var distance = targetPosition_1.sub(currentPosition);
                                var angle = Math.atan2(distance.y, distance.x);
                                heroItemPrefab.play_spine_anim("move", angle);
                                cc.tween(heroItemPrefab.node).delay(0.2).call(function () {
                                    animationComponent.pause();
                                    var worldPosition = heroItemPrefab.node.convertToWorldSpaceAR(cc.Vec3.ZERO);
                                    var nodePosition = _this.map_node.convertToNodeSpaceAR(worldPosition);
                                    heroItemPrefab.node.removeFromParent(false);
                                    heroItemPrefab.node.position = nodePosition;
                                    var dynamicLayer = GameManager_1.gm.data.fight_temp_data.get_dynamic_node_layer(heroData.grid_index, FightConstants_1.FightDynamicNodeLayer.MOVE);
                                    travelDuration_1 = targetPosition_1.sub(nodePosition).mag() / 80;
                                    if (GameManager_1.gm.data.fight_temp_data.is_debug) {
                                        heroItemPrefab.node.name = cc.js.formatStr("fight_hero_item_gridIndex@%d_zIndex@%d", heroData.grid_index, dynamicLayer);
                                    }
                                    _this.map_node.addChild(heroItemPrefab.node, dynamicLayer);
                                    var distance = targetPosition_1.sub(nodePosition);
                                    var angle = Math.atan2(distance.y, distance.x);
                                    heroItemPrefab.play_spine_anim("move", angle);
                                    _this.next_in_battle_hero();
                                }).to(travelDuration_1, {
                                    position: targetPosition_1
                                }).call(function () {
                                    animationComponent.resume();
                                    if (-1 < battlePosition_1.prop_index) {
                                        heroData.fight_state = FightConstants_1.HeroFightState.MOVING;
                                        heroData.move_path = [];
                                        heroData.find_path_target = fightData.prop_data_array[battlePosition_1.prop_index];
                                    }
                                    else {
                                        heroData.fight_state = FightConstants_1.HeroFightState.WAITING;
                                        _this.find_next_path(heroData);
                                    }
                                    _this.common_hero_apply_passive_skill(heroData);
                                }).start();
                                animationComponent.play(shipAnimationName);
                                animationComponent.node.scaleX = scaleX;
                                animationComponent.node.zIndex = scaleY;
                                animationComponent.node.position = offset.add(animationComponent.node.position);
                            }
                        });
                    });
                }
                else {
                    GameManager_1.gm.pool.async_get(Constants_1.BundleName.FIGHT, "prefabs/fight_hero_item", FightHeroItem_1.FightHeroItem, function (heroItemPrefab) {
                        var heroData = fightData.hero_data_array[heroArrayIndex_1];
                        var dynamicLayer = GameManager_1.gm.data.fight_temp_data.get_dynamic_node_layer(heroData.grid_index, FightConstants_1.FightDynamicNodeLayer.MOVE);
                        _this.map_node.addChild(heroItemPrefab.node, dynamicLayer);
                        if (GameManager_1.gm.data.fight_temp_data.is_debug) {
                            (heroItemPrefab.node.name = cc.js.formatStr("fight_hero_item_gridIndex@%d_zIndex@%d", heroData.grid_index, dynamicLayer));
                        }
                        heroItemPrefab.node.position = fightData.grid_position_to_position(battlePosition_1.grid_position);
                        heroItemPrefab.data = heroData;
                        fightData.hero_item_array[heroArrayIndex_1] = heroItemPrefab;
                        _this.common_hero_apply_passive_skill(heroData);
                        _this.next_in_battle_hero();
                    });
                }
                this.show_guider_finger_anim();
            }
        }
    };
    Fight.prototype.next_in_battle_hero = function () {
        var fightData = GameManager_1.gm.data.fight_temp_data;
        var currentHero = fightData.in_battle_hero_data;
        if (fightData.goto_battle_count >= fightData.hero_data_array.length) {
            for (var index = 0; index < fightData.map_item_array.length; index++) {
                var mapItem = fightData.map_item_array[index];
                if (mapItem && mapItem.data) {
                    mapItem.update_view();
                }
            }
        }
        var nextHero = null;
        for (var heroIndex = 0; heroIndex < fightData.hero_data_array.length; heroIndex++) {
            currentHero = fightData.hero_data_array[heroIndex];
            if (currentHero.in_battle_state == FightConstants_1.HeroInBattleState.NOT_IN_BATTLE) {
                currentHero.in_battle_state = FightConstants_1.HeroInBattleState.WILL_IN_BATTLE;
                nextHero = currentHero;
                break;
            }
        }
        fightData.in_battle_hero_data = nextHero;
        if (nextHero) {
            GameManager_1.gm.data.event_emitter.emit("fight_in_battle", nextHero);
        }
    };
    Fight.prototype.find_next_path = function (hero, target) {
        var fightData = GameManager_1.gm.data.fight_temp_data;
        var targetData = null;
        if (target) {
            targetData = new FightTempData_1.FightTargetSortData();
            targetData.index = target.array_index;
            if (target instanceof FightTempData_1.FightHeroItemData) {
                targetData.type = 3;
            }
            else if (target instanceof FightTempData_1.FightBuildingItemData) {
                targetData.type = 2;
            }
            else if (target instanceof FightTempData_1.FightWallItemData) {
                targetData.type = 4;
            }
            else {
                // cc.error("未知分支情况");
                cc.error("Nhánh chưa xác định.");
            }
        }
        else if (hero instanceof FightTempData_1.FightHeroItemData) {
            if (hero.type == FightConstants_1.HeroType.ATTACK) {
                targetData = this.find_hero_attack_target(hero.grid_position, hero);
            }
            else if (hero.type == FightConstants_1.HeroType.DEFENSE) {
                targetData = this.find_defense_hero_attack_target(hero.grid_position, hero);
            }
        }
        if (targetData) {
            var isStaticTarget = true;
            var foundTarget = void cc.Vec2.ZERO;
            if (targetData.type == 1) {
                isStaticTarget = false;
                foundTarget = fightData.prop_data_array[targetData.index];
            }
            else if (targetData.type == 2) {
                foundTarget = fightData.building_data_array[targetData.index];
            }
            else if (targetData.type == 3) {
                foundTarget = hero.type == FightConstants_1.HeroType.ATTACK ? fightData.defense_hero_data_array[targetData.index] : fightData.hero_data_array[targetData.index];
            }
            else if (targetData.type == 4) {
                foundTarget = fightData.wall_data_array[targetData.index];
            }
            if (!foundTarget)
                return false;
            var targetGridPos = foundTarget.grid_position;
            var grid = fightData.grid;
            var pathfinder = fightData.a_star;
            if (!grid.getWalkable(hero.grid_position.x, hero.grid_position.y)) {
                grid.setWalkable(hero.grid_position.x, hero.grid_position.y, true);
            }
            grid.setStartNode(hero.grid_position.x, hero.grid_position.y);
            if (!grid.getWalkable(targetGridPos.x, targetGridPos.y)) {
                grid.setWalkable(targetGridPos.x, targetGridPos.y, true);
            }
            grid.setEndNode(targetGridPos.x, targetGridPos.y);
            if (pathfinder.findPath(grid)) {
                hero.move_start = pathfinder.path.shift();
                hero.move_end = isStaticTarget ? pathfinder.path.pop() : pathfinder.path[pathfinder.path.length - 1];
                hero.move_path = pathfinder.path;
                hero.find_path_target = foundTarget;
                hero.fight_state = FightConstants_1.HeroFightState.MOVING;
                if (fightData.is_debug) {
                    var debugColor = cc.color(Utils_1.Utils.math_random(true, 0, 256), Utils_1.Utils.math_random(true, 0, 256), Utils_1.Utils.math_random(true, 0, 256));
                    for (var i = 0; i < hero.move_path.length; i++) {
                        var pathNode = hero.move_path[i];
                        fightData.get_fight_map_item(pathNode.x, pathNode.y).land_spr.node.color = debugColor;
                    }
                }
            }
            else {
                console.warn("寻路失败");
                return false;
            }
            if (!grid.getWalkable(hero.grid_position.x, hero.grid_position.y)) {
                grid.setWalkable(hero.grid_position.x, hero.grid_position.y, false);
            }
            if (!grid.getWalkable(targetGridPos.x, targetGridPos.y)) {
                grid.setWalkable(targetGridPos.x, targetGridPos.y, false);
            }
            grid.clearStartAndEndNode();
            return true;
        }
        return false;
    };
    Fight.prototype.find_next_path_distance = function (startPos, endPos) {
        var minDistance = Number.MAX_SAFE_INTEGER;
        var grid = GameManager_1.gm.data.fight_temp_data.grid;
        var pathfinder = GameManager_1.gm.data.fight_temp_data.a_star;
        var startWalkable = grid.getWalkable(startPos.x, startPos.y);
        if (!startWalkable)
            grid.getWalkable(startPos.x, startPos.y);
        grid.setStartNode(startPos.x, startPos.y);
        var endWalkable = grid.getWalkable(endPos.x, endPos.y);
        if (!endWalkable)
            grid.setWalkable(endPos.x, endPos.y, true);
        grid.setEndNode(endPos.x, endPos.y);
        if (pathfinder.findPath(grid)) {
            minDistance = pathfinder.path.length - 1;
        }
        if (!startWalkable)
            grid.setWalkable(startPos.x, startPos.y, false);
        if (!endWalkable)
            grid.setWalkable(endPos.x, endPos.y, false);
        grid.clearStartAndEndNode();
        return minDistance;
    };
    Fight.prototype.find_hero_attack_target = function (heroPosition, heroData) {
        var fightData = GameManager_1.gm.data.fight_temp_data;
        var potentialTargets = [];
        for (var index = 0; index < fightData.building_data_array.length; index++) {
            var building = fightData.building_data_array[index];
            if (building && 0 < building.hp) {
                var target = new FightTempData_1.FightTargetSortData;
                target.pixel_distance = fightData.grid_position_to_position(heroPosition).sub(fightData.grid_position_to_position(building.grid_position)).mag();
                target.find_path_distance = this.find_next_path_distance(heroPosition, building.grid_position);
                target.priority = 1;
                target.type = 2;
                target.index = index;
                target.find_path_distance != Number.MAX_SAFE_INTEGER && potentialTargets.push(target);
            }
        }
        for (var index = 0; index < fightData.wall_data_array.length; index++) {
            var wallData = fightData.wall_data_array[index];
            if (wallData && 0 < wallData.hp) {
                var target = new FightTempData_1.FightTargetSortData;
                target.pixel_distance = fightData.grid_position_to_position(heroPosition).sub(fightData.grid_position_to_position(wallData.grid_position)).mag();
                target.find_path_distance = this.find_next_path_distance(heroPosition, wallData.grid_position);
                target.priority = 1;
                target.type = 4;
                target.index = index;
                target.find_path_distance != Number.MAX_SAFE_INTEGER && potentialTargets.push(target);
            }
        }
        for (var index = 0; index < fightData.defense_hero_data_array.length; index++) {
            var defenseHero = fightData.defense_hero_data_array[index];
            if (defenseHero && 0 < defenseHero.hp) {
                var target = new FightTempData_1.FightTargetSortData;
                target.pixel_distance = fightData.grid_position_to_position(heroPosition).sub(fightData.grid_position_to_position(defenseHero.grid_position)).mag();
                target.find_path_distance = this.find_next_path_distance(heroPosition, defenseHero.grid_position);
                target.priority = 0;
                target.type = 3;
                target.index = index;
                target.find_path_distance != Number.MAX_SAFE_INTEGER && potentialTargets.push(target);
            }
        }
        for (var index = 0; index < fightData.prop_data_array.length; index++) {
            var propData = fightData.prop_data_array[index];
            if (propData) {
                var targer = new FightTempData_1.FightTargetSortData;
                targer.pixel_distance = fightData.grid_position_to_position(heroPosition).sub(fightData.grid_position_to_position(propData.grid_position)).mag();
                targer.find_path_distance = this.find_next_path_distance(heroPosition, propData.grid_position);
                targer.priority = 2;
                targer.type = 1;
                targer.index = index;
                targer.find_path_distance != Number.MAX_SAFE_INTEGER && potentialTargets.push(targer);
            }
        }
        if (0 < potentialTargets.length) {
            var sortedTargets = [].concat(potentialTargets);
            Utils_1.Utils.sort_by_props(sortedTargets, {
                find_path_distance: "ascending",
                pixel_distance: "ascending",
                priority: "ascending"
            });
            var outOfRangeIndex = -1;
            var sortedTarget = void 0;
            for (var index = 0; index < sortedTargets.length; index++) {
                sortedTarget = sortedTargets[index];
                if (sortedTarget.pixel_distance > heroData.attack_range) {
                    outOfRangeIndex = index;
                    break;
                }
            }
            if (0 < outOfRangeIndex) {
                var inRangeTargets = sortedTargets.splice(0, outOfRangeIndex);
                Utils_1.Utils.sort_by_props(inRangeTargets, {
                    priority: "ascending",
                    find_path_distance: "ascending",
                    pixel_distance: "ascending"
                });
                return inRangeTargets[0];
            }
            return sortedTarget;
        }
        return null;
    };
    Fight.prototype.find_defense_hero_attack_target = function (defenseHeroPosition, defenseHeroData) {
        var fightData = GameManager_1.gm.data.fight_temp_data;
        var potentialTargets = [];
        for (var index = 0; index < fightData.hero_data_array.length; index++) {
            var heroData = fightData.hero_data_array[index];
            if (heroData && 0 < heroData.hp && heroData.in_battle_state == FightConstants_1.HeroInBattleState.HAS_IN_BATTLE) {
                var target = new FightTempData_1.FightTargetSortData;
                target.distance = Math.abs(defenseHeroPosition.x - heroData.grid_position.x) + Math.abs(defenseHeroPosition.y - heroData.grid_position.y);
                target.pixel_distance = fightData.grid_position_to_position(defenseHeroPosition).sub(fightData.grid_position_to_position(heroData.grid_position)).mag();
                target.find_path_distance = this.find_next_path_distance(defenseHeroPosition, heroData.grid_position);
                target.priority = 1;
                target.type = 3;
                target.index = index;
                target.find_path_distance != Number.MAX_SAFE_INTEGER && potentialTargets.push(target);
            }
        }
        if (0 < potentialTargets.length) {
            Utils_1.Utils.sort_by_props(potentialTargets, {
                find_path_distance: "ascending",
                pixel_distance: "ascending",
                priority: "ascending"
            });
            var potentialTarget = potentialTargets[0];
            if (potentialTarget.pixel_distance <= defenseHeroData.search_range) {
                return potentialTarget;
            }
        }
        return null;
    };
    Fight.prototype.find_building_attack_target = function (buildingData) {
        if (buildingData.attack_range <= 0) {
            return null;
        }
        var fightData = GameManager_1.gm.data.fight_temp_data;
        var buildingPosition = buildingData.grid_position;
        var potentialTargets = [];
        for (var index = 0; index < fightData.hero_data_array.length; index++) {
            var heroData = fightData.hero_data_array[index];
            if (heroData && 0 < heroData.hp && heroData.in_battle_state == FightConstants_1.HeroInBattleState.HAS_IN_BATTLE) {
                var target = new FightTempData_1.FightTargetSortData;
                target.distance = Math.abs(buildingPosition.x - heroData.grid_position.x) + Math.abs(buildingPosition.y - heroData.grid_position.y);
                target.pixel_distance = fightData.grid_position_to_position(buildingPosition).sub(fightData.grid_position_to_position(heroData.grid_position)).mag();
                target.find_path_distance = this.find_next_path_distance(buildingPosition, heroData.grid_position),
                    target.priority = 1;
                target.type = 3;
                target.index = index;
                target.find_path_distance != Number.MAX_SAFE_INTEGER && potentialTargets.push(target);
            }
        }
        if (0 < potentialTargets.length) {
            Utils_1.Utils.sort_by_props(potentialTargets, {
                find_path_distance: "ascending",
                pixel_distance: "ascending",
                priority: "ascending"
            });
            var potentialTarget = potentialTargets[0];
            if (potentialTarget.pixel_distance <= buildingData.attack_range) {
                return fightData.hero_data_array[potentialTarget.index];
            }
        }
        return null;
    };
    Fight.prototype.building_call_defense_hero = function (building) {
        var fightData = GameManager_1.gm.data.fight_temp_data;
        var potentialDefenseHeroes = [];
        for (var index = 0; index < fightData.defense_hero_data_array.length; index++) {
            var defenseHero = fightData.defense_hero_data_array[index];
            if (defenseHero && 0 < defenseHero.hp) {
                var target = new FightTempData_1.FightTargetSortData;
                target.distance = Math.abs(building.grid_position.x - defenseHero.grid_position.x) + Math.abs(building.grid_position.y - defenseHero.grid_position.y);
                target.pixel_distance = fightData.grid_position_to_position(building.grid_position).sub(fightData.grid_position_to_position(defenseHero.grid_position)).mag();
                target.priority = 1;
                target.type = 3;
                target.index = index;
                potentialDefenseHeroes.push(target);
            }
        }
        if (0 < potentialDefenseHeroes.length) {
            Utils_1.Utils.sort_by_props(potentialDefenseHeroes, {
                pixel_distance: "ascending",
                priority: "ascending"
            });
            for (var index = 0; index < potentialDefenseHeroes.length; index++) {
                var selectedHeroData = potentialDefenseHeroes[index];
                if (!(selectedHeroData.pixel_distance <= building.call_range)) {
                    return;
                }
                var defenseHero = fightData.defense_hero_data_array[selectedHeroData.index];
                if (defenseHero && building.lock_attack_target) {
                    this.find_next_path(defenseHero, building.lock_attack_target);
                }
            }
        }
    };
    Fight.prototype.convert_to_scene_point = function (node, localPoint) {
        localPoint = (localPoint === undefined) ? cc.Vec3.ZERO : localPoint;
        if (localPoint == null) {
            localPoint = cc.Vec3.ZERO;
        }
        var worldPoint = node.convertToWorldSpaceAR(localPoint);
        return this.scene_node.convertToNodeSpaceAR(worldPoint);
    };
    Fight.prototype.convert_to_map_point = function (node, localPoint) {
        localPoint = (localPoint === undefined) ? cc.Vec3.ZERO : localPoint;
        if (localPoint == null) {
            localPoint = cc.Vec3.ZERO;
        }
        var worldPoint = node.convertToWorldSpaceAR(localPoint);
        return this.map_node.convertToNodeSpaceAR(worldPoint);
    };
    Fight.prototype.convert_to_effect_point = function (node, localPoint) {
        localPoint = (localPoint === undefined) ? cc.Vec3.ZERO : localPoint;
        if (localPoint == null) {
            localPoint = cc.Vec3.ZERO;
        }
        var worldPoint = node.convertToWorldSpaceAR(localPoint);
        return this.effect_node.convertToNodeSpaceAR(worldPoint);
    };
    __decorate([
        property(cc.Node)
    ], Fight.prototype, "mask_node", void 0);
    __decorate([
        property(cc.Node)
    ], Fight.prototype, "scene_node", void 0);
    __decorate([
        property(cc.Node)
    ], Fight.prototype, "map_node", void 0);
    __decorate([
        property(cc.Node)
    ], Fight.prototype, "effect_node", void 0);
    __decorate([
        property(cc.Node)
    ], Fight.prototype, "window_node", void 0);
    __decorate([
        property(cc.Node)
    ], Fight.prototype, "text_node", void 0);
    __decorate([
        property(cc.Node)
    ], Fight.prototype, "boat_node", void 0);
    __decorate([
        property(cc.Node)
    ], Fight.prototype, "boat_box_node", void 0);
    __decorate([
        property(cc.Sprite)
    ], Fight.prototype, "boat_spr", void 0);
    __decorate([
        property(cc.Animation)
    ], Fight.prototype, "boat_anim", void 0);
    __decorate([
        property(cc.Node)
    ], Fight.prototype, "ui_node", void 0);
    __decorate([
        property(cc.Label)
    ], Fight.prototype, "name_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], Fight.prototype, "left_sec_lbl", void 0);
    __decorate([
        property(cc.Button)
    ], Fight.prototype, "speed_1_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Fight.prototype, "speed_2_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Fight.prototype, "return_btn", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], Fight.prototype, "hero_list", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], Fight.prototype, "reward_list", void 0);
    __decorate([
        property(cc.Node)
    ], Fight.prototype, "figerAni", void 0);
    __decorate([
        property(cc.ParticleSystem)
    ], Fight.prototype, "wave_ps", void 0);
    __decorate([
        property(cc.Node)
    ], Fight.prototype, "fight_guider_node", void 0);
    Fight = __decorate([
        ccclass
    ], Fight);
    return Fight;
}(GameModule_1.GameModule));
exports.Fight = Fight;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZmlnaHRcXHNjcmlwdHNcXEZpZ2h0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBOEQ7QUFDOUQsbUVBQWtFO0FBQ2xFLDJFQUE4STtBQUM5SSxpRUFBaUU7QUFDakUseUVBQXdFO0FBQ3hFLGlFQUFpRTtBQUNqRSxxRUFBMkQ7QUFDM0QsbUVBQXNHO0FBRXRHLHlFQUFxTTtBQUNyTSxtRUFBa0U7QUFDbEUsdUVBQXNFO0FBQ3RFLHlEQUF3RDtBQUN4RCwrREFBZ0U7QUFDaEUsaURBQWdEO0FBQ2hELCtDQUE4QztBQU14QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEyQix5QkFBVTtJQUFyQztRQUFBLHFFQWt2RUM7UUFodkVXLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHNUIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUczQixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUc3QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBR3pCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsbUJBQWEsR0FBWSxJQUFJLENBQUM7UUFHOUIsY0FBUSxHQUFjLElBQUksQ0FBQztRQUczQixlQUFTLEdBQWlCLElBQUksQ0FBQztRQUcvQixhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFHMUIsa0JBQVksR0FBYSxJQUFJLENBQUM7UUFHOUIsaUJBQVcsR0FBYyxJQUFJLENBQUM7UUFHOUIsaUJBQVcsR0FBYyxJQUFJLENBQUM7UUFHOUIsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFHN0IsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixpQkFBVyxHQUFhLElBQUksQ0FBQztR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QUUsQ0FBQyxLQUFLLENBQUM7MkNBQ2U7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsrQ0FDbUI7SUFHdEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs4Q0FDa0I7SUFHdEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs4Q0FDa0I7SUFHdEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs2Q0FDaUI7SUFHckM7UUFEQyxRQUFRLENBQUMsbUJBQVEsQ0FBQzs0Q0FDZ0I7SUFHbkM7UUFEQyxRQUFRLENBQUMsbUJBQVEsQ0FBQzs4Q0FDa0I7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsyQ0FDZTtJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDOzBDQUNjO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ3dCO0lBOURqQyxLQUFLO1FBRGpCLE9BQU87T0FDSyxLQUFLLENBa3ZFakI7SUFBRCxZQUFDO0NBbHZFRCxBQWt2RUMsQ0FsdkUwQix1QkFBVSxHQWt2RXBDO0FBbHZFWSxzQkFBSyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpc3RWaWV3IH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9MaXN0Vmlldyc7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNb2R1bGUnO1xyXG5pbXBvcnQgeyBGaWdodENvbnN0YW50cywgSGVyb1R5cGUsIEhlcm9JbkJhdHRsZVN0YXRlLCBIZXJvRmlnaHRTdGF0ZSwgRmlnaHREeW5hbWljTm9kZUxheWVyIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9GaWdodENvbnN0YW50cyc7XHJcbmltcG9ydCB7IEZpZ2h0U3RhdGUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0ZpZ2h0RGF0YSc7XHJcbmltcG9ydCB7IENvbnN0YW50c0RhdGEgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0NvbnN0YW50c0RhdGEnO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBTa2lsbFR5cGUsIFNraWxsUG9zLCBBdHRhY2tUeXBlLCBTa2lsbEVmZmVjdElkIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Db25maWdEYXRhJztcclxuaW1wb3J0IHsgRmlnaHREYXRhIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9GaWdodERhdGEnO1xyXG5pbXBvcnQgeyBGaWdodFRlbXBEYXRhLCBGaWdodFRhcmdldFNvcnREYXRhLCBFZGdlRW51bSwgRmlnaHRCdWlsZGluZ0l0ZW1EYXRhLCBGaWdodEhlcm9JdGVtRGF0YSwgRmlnaHRXYWxsSXRlbURhdGEsIEZpZ2h0UHJvcEl0ZW1EYXRhLCBCdWZmSXRlbURhdGEgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0ZpZ2h0VGVtcERhdGEnO1xyXG5pbXBvcnQgeyBSZWNvcmREYXRhIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9SZWNvcmREYXRhJztcclxuaW1wb3J0IHsgTm9kZVBvb2xJdGVtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Ob2RlUG9vbEl0ZW0nO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvVXRpbHMnO1xyXG5pbXBvcnQgeyBSZXBvcnREYXRhIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9OZXRVdGlscyc7XHJcbmltcG9ydCB7IEZpZ2h0SGVyb0l0ZW0gfSBmcm9tICcuL0ZpZ2h0SGVyb0l0ZW0nO1xyXG5pbXBvcnQgeyBGaWdodE1hcEl0ZW0gfSBmcm9tICcuL0ZpZ2h0TWFwSXRlbSc7XHJcbmltcG9ydCB7IFNraWxsQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3Mvc2tpbGwnO1xyXG5pbXBvcnQgeyBIZXJvQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvaGVybyc7XHJcbmltcG9ydCB7IEZpZ2h0QnVpbGRpbmdJdGVtIH0gZnJvbSAnLi9GaWdodEJ1aWxkaW5nSXRlbSc7XHJcbmltcG9ydCB7IEZpZ2h0V2FsbEl0ZW0gfSBmcm9tICcuL0ZpZ2h0V2FsbEl0ZW0nO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBGaWdodCBleHRlbmRzIEdhbWVNb2R1bGUge1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIG1hc2tfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHNjZW5lX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHVibGljIG1hcF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHB1YmxpYyBlZmZlY3Rfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHdpbmRvd19ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHB1YmxpYyB0ZXh0X25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBib2F0X25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBib2F0X2JveF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBib2F0X3NwcjogY2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQW5pbWF0aW9uKVxyXG4gICAgcHJpdmF0ZSBib2F0X2FuaW06IGNjLkFuaW1hdGlvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHVpX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgbmFtZV9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxlZnRfc2VjX2xibDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIHNwZWVkXzFfYnRuOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIHNwZWVkXzJfYnRuOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIHJldHVybl9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KExpc3RWaWV3KVxyXG4gICAgcHJpdmF0ZSBoZXJvX2xpc3Q6IExpc3RWaWV3ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoTGlzdFZpZXcpXHJcbiAgICBwcml2YXRlIHJld2FyZF9saXN0OiBMaXN0VmlldyA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGZpZ2VyQW5pOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUGFydGljbGVTeXN0ZW0pXHJcbiAgICBwcml2YXRlIHdhdmVfcHM6IGNjLlBhcnRpY2xlU3lzdGVtID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgZmlnaHRfZ3VpZGVyX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIC8vXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25fdG91Y2hfbW92ZV9oYW5kbGVyLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5vbihcInBpY2tfdXBfcHJvcFwiLCB0aGlzLm9uX3BpY2tfdXBfcHJvcF9oYW5kbGVyLCB0aGlzKTtcclxuICAgICAgICBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5idWlsZF9oZXJvX2FycmF5KCk7XHJcbiAgICAgICAgZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuYnVpbGRfcmV3YXJkX2FycmF5KCk7XHJcbiAgICAgICAgdGhpcy5pbml0X21hcCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgICAgICB0aGlzLmZpZ2h0X3N0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5maWdodF9ndWlkZXJfbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKDEzID09IGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVHdWlkZVZPLmd1aWRlSUQgJiYgIWdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVHdWlkZVZPLmlzRW5kKSB7XHJcbiAgICAgICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5HVUlERV9TSE9XX1RJUFNfT1Aua2V5LCA1KTtcclxuICAgICAgICAgICAgZ20udWkuc2hvd19wYW5lbChnbS5jb25zdC5HVUlERV9TSE9XX1RJUFNfT1ApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL1xyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNjZW5lX25vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25fdG91Y2hfbW92ZV9oYW5kbGVyLCB0aGlzKTtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub2ZmKFwicGlja191cF9wcm9wXCIsIHRoaXMub25fcGlja191cF9wcm9wX2hhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBvbl90b3VjaF9tb3ZlX2hhbmRsZXIoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0b3VjaGVzID0gZXZlbnQuZ2V0VG91Y2hlcygpO1xyXG4gICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHRvdWNoZXMubGVuZ3RoID09IDIpIHtcclxuICAgICAgICAgICAgY29uc3QgdG91Y2gxID0gdG91Y2hlc1swXTtcclxuICAgICAgICAgICAgY29uc3QgdG91Y2gyID0gdG91Y2hlc1sxXTtcclxuICAgICAgICAgICAgY29uc3QgZGVsdGExID0gdG91Y2gxLmdldERlbHRhKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhMiA9IHRvdWNoMi5nZXREZWx0YSgpO1xyXG4gICAgICAgICAgICBjb25zdCBsb2NhdGlvbjEgPSB0b3VjaDEuZ2V0TG9jYXRpb24oKTtcclxuICAgICAgICAgICAgY29uc3QgbG9jYXRpb24yID0gdG91Y2gyLmdldExvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGxldCBtaWRQb2ludCA9IGNjLnYzKGxvY2F0aW9uMS5hZGQobG9jYXRpb24yKS5tdWx0aXBseVNjYWxhcigwLjUpKTtcclxuICAgICAgICAgICAgbWlkUG9pbnQgPSB0aGlzLnNjZW5lX25vZGUuY29udmVydFRvTm9kZVNwYWNlQVIobWlkUG9pbnQpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZGVsdGFMb2NhdGlvbiA9IGxvY2F0aW9uMS5zdWIobG9jYXRpb24yKTtcclxuICAgICAgICAgICAgY29uc3QgY29tYmluZWREZWx0YSA9IGRlbHRhMS5zdWIoZGVsdGEyKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzY2FsZSA9IDE7XHJcbiAgICAgICAgICAgIHNjYWxlID0gTWF0aC5hYnMoZGVsdGFMb2NhdGlvbi54KSA+IE1hdGguYWJzKGRlbHRhTG9jYXRpb24ueSlcclxuICAgICAgICAgICAgICAgID8gKGRlbHRhTG9jYXRpb24ueCArIGNvbWJpbmVkRGVsdGEueCkgLyBkZWx0YUxvY2F0aW9uLnggKiB0aGlzLnNjZW5lX25vZGUuc2NhbGVcclxuICAgICAgICAgICAgICAgIDogKGRlbHRhTG9jYXRpb24ueSArIGNvbWJpbmVkRGVsdGEueSkgLyBkZWx0YUxvY2F0aW9uLnkgKiB0aGlzLnNjZW5lX25vZGUuc2NhbGU7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2NhbGUgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICBzY2FsZSA9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2NhbGUgPCAyKSB7XHJcbiAgICAgICAgICAgICAgICBzY2FsZSA9IDI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNjYWxlQ2hhbmdlID0gc2NhbGUgLSB0aGlzLnNjZW5lX25vZGUuc2NhbGU7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVfbm9kZS5zY2FsZSArPSBzY2FsZUNoYW5nZTtcclxuICAgICAgICAgICAgY29uc3Qgc2NhbGVkTWlkUG9pbnQgPSBtaWRQb2ludC5tdWx0aXBseVNjYWxhcihzY2FsZUNoYW5nZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVfbm9kZS5wb3NpdGlvbiA9IHRoaXMuc2NlbmVfbm9kZS5wb3NpdGlvbi5zdWIoc2NhbGVkTWlkUG9pbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodG91Y2hlcy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICBjb25zdCBkZWx0YSA9IGV2ZW50LmdldERlbHRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVfbm9kZS54ICs9IGRlbHRhLng7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmVfbm9kZS55ICs9IGRlbHRhLnk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zY2VuZV9ub2RlLnggPCBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5taW5fb2Zmc2V0LngpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmVfbm9kZS54ID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGEubWluX29mZnNldC54O1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2NlbmVfbm9kZS54ID4gZ20uZGF0YS5maWdodF90ZW1wX2RhdGEubWF4X29mZnNldC54KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lX25vZGUueCA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLm1heF9vZmZzZXQueDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2NlbmVfbm9kZS55IDwgZ20uZGF0YS5maWdodF90ZW1wX2RhdGEubWluX29mZnNldC55KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lX25vZGUueSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLm1pbl9vZmZzZXQueVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2NlbmVfbm9kZS55ID4gZ20uZGF0YS5maWdodF90ZW1wX2RhdGEubWF4X29mZnNldC55KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lX25vZGUueSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLm1heF9vZmZzZXQueVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIG9uX3BpY2tfdXBfcHJvcF9oYW5kbGVyKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5yZXdhcmRfbGlzdC5nZXRJdGVtKGluZGV4KTtcclxuICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICBpdGVtLnVwZGF0ZV92aWV3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBpbml0X21hcCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZ20uZGF0YS5maWdodF90ZW1wX2RhdGEucGxheV90eXBlIDwgMCkge1xyXG4gICAgICAgICAgICBjYy5lcnJvcihcInBsYXlfdHlwZSBHacOhIHRy4buLIHNhaTpcIiArIGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLnBsYXlfdHlwZSk7XHJcbiAgICAgICAgICAgIGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLnBsYXlfdHlwZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1hc2tfbm9kZS5jb2xvciA9IEZpZ2h0Q29uc3RhbnRzLlNFQV9BUkVBX0NPTE9SX0FSUkFZW2dtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLnBsYXlfdHlwZV07XHJcbiAgICAgICAgY29uc3QgbWFwRGF0YSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmJ1aWxkX3BsYXlfbWFwX2RhdGEoKTtcclxuICAgICAgICB0aGlzLnNjZW5lX25vZGUucG9zaXRpb24gPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5tYXBfc3RhcnRfcG9zaXRpb247XHJcbiAgICAgICAgZ20ucG9vbC5pbml0KEJ1bmRsZU5hbWUuRklHSFQsIFwicHJlZmFicy9maWdodF9tYXBfaXRlbVwiLCBGaWdodE1hcEl0ZW0sIDEsICgpID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG1hcERhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxEYXRhID0gbWFwRGF0YVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGxEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuRklHSFQsIFwicHJlZmFicy9maWdodF9tYXBfaXRlbVwiLCBGaWdodE1hcEl0ZW0sIChtYXBJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBJdGVtLm5vZGUucG9zaXRpb24gPSBjZWxsRGF0YS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcEl0ZW0uZGF0YSA9IGNlbGxEYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBfbm9kZS5hZGRDaGlsZChtYXBJdGVtLm5vZGUsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuaXNfZGVidWc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBJdGVtLm5vZGUubmFtZSA9IGNjLmpzLmZvcm1hdFN0cihcImZpZ2h0X21hcF9pdGVtXyVkXCIsIGNlbGxEYXRhLmdyaWRfaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5maWdodF90ZW1wX2RhdGEubWFwX2l0ZW1fYXJyYXlbY2VsbERhdGEuY2VsbF9pZF0gPSBtYXBJdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd19ndWlkZXJfZmluZ2VyX2FuaW0oKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoZ20uZGF0YS5maWdodF90ZW1wX2RhdGEucGxheV90eXBlIDwgMikge1xyXG4gICAgICAgICAgICB0aGlzLndhdmVfcHMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndhdmVfcHMuc3RhcnRDb2xvciA9IEZpZ2h0Q29uc3RhbnRzLldBVkVfU1RBUlRfQ09MT1JfQVJSQVlbZ20uZGF0YS5maWdodF90ZW1wX2RhdGEucGxheV90eXBlXTtcclxuICAgICAgICAgICAgdGhpcy53YXZlX3BzLmVuZENvbG9yID0gRmlnaHRDb25zdGFudHMuV0FWRV9FTkRfQ09MT1JfQVJSQVlbZ20uZGF0YS5maWdodF90ZW1wX2RhdGEucGxheV90eXBlXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLndhdmVfcHMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIG9uX2NsaWNrX2hpZGVfZ3VpZGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZmlnaHRfZ3VpZGVyX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93X2d1aWRlcl9maW5nZXJfYW5pbSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoMTMgIT0gZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUd1aWRlVk8uZ3VpZGVJRCB8fCBnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlR3VpZGVWTy5pc0VuZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpZ2VyQW5pLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlnZXJBbmkuYWN0aXZlID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuZ290b19iYXR0bGVfY291bnQgPCAyO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5maWdlckFuaS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldEluZGV4ID0gMSA9PSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5nb3RvX2JhdHRsZV9jb3VudCA/IDM5IDogMzg7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRQb3NpdGlvbiA9IHRoaXMubWFwX25vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKHRoaXMubWFwX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJmaWdodF9tYXBfaXRlbV9cIiArIHRhcmdldEluZGV4KS5wb3NpdGlvbikpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWdlckFuaS5wb3NpdGlvbiA9IHRoaXMuc2NlbmVfbm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihjYy52Myh0YXJnZXRQb3NpdGlvbikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNHdWlkZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKDEgPT0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuZ290b19iYXR0bGVfY291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5jaGFubmVsLnJlcG9ydF9ldmVudChcIm9oYXlvb19nYW1lX2d1aWRlXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3VpZGVpZDogMTQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGd1aWRlZGVzYzogY2MuanMuZm9ybWF0U3RyKFwiMTQu54K55Ye75LiK5bKbMeS4quiLsembhFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgyID09IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmdvdG9fYmF0dGxlX2NvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uY2hhbm5lbC5yZXBvcnRfZXZlbnQoXCJvaGF5b29fZ2FtZV9ndWlkZVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGd1aWRlaWQ6IDE1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBndWlkZWRlc2M6IGNjLmpzLmZvcm1hdFN0cihcIjE1LueCueWHu+S4iuWymzHkuKroi7Hpm4RcIilcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGFUaW1lOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBmaWdodFRlbXBEYXRhID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGE7XHJcbiAgICAgICAgaWYgKGZpZ2h0VGVtcERhdGEuZmlnaHRfc3RhdGUgPT0gRmlnaHRTdGF0ZS5SVU4pIHtcclxuICAgICAgICAgICAgZmlnaHRUZW1wRGF0YS5kZWx0YV90aW1lID0gZGVsdGFUaW1lICogY2MuZGlyZWN0b3IuZ2V0U2NoZWR1bGVyKCkuZ2V0VGltZVNjYWxlKCk7XHJcbiAgICAgICAgICAgIGZpZ2h0VGVtcERhdGEudG90YWxfdGltZSArPSBmaWdodFRlbXBEYXRhLmRlbHRhX3RpbWU7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlX2hlcm9fYWN0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlX2RlZmVuc2VfaGVyb19hY3Rpb24oKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVfYnVpbGRpbmdfYWN0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlX3dhbGxfYWN0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlX2J1ZmZfYWN0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgICAgICAgICAgaWYgKGZpZ2h0VGVtcERhdGEudG90YWxfdGltZSA+IENvbnN0YW50c0RhdGEuaW5zdGFuY2UuTUFYX0ZJR0hUX1RJTUUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRfcmV2aXZlKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBhcHBseV9wYXNzaXZlX3NraWxsX2VmZmVjdCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBmaWdodFRlbXBEYXRhID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGE7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpZ2h0VGVtcERhdGEud2FsbF9kYXRhX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB3YWxsSXRlbSA9IGZpZ2h0VGVtcERhdGEud2FsbF9pdGVtX2FycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgd2FsbERhdGEgPSBmaWdodFRlbXBEYXRhLndhbGxfZGF0YV9hcnJheVtpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAod2FsbERhdGEuc2tpbGxfaWQgPiAwICYmICghZmlnaHRUZW1wRGF0YS5pc19kZWJ1ZyB8fCB3YWxsRGF0YS5za2lsbF9sdiA+IDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2tpbGxEYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJTa2lsbENvbmZpZ0RhdGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2FsbERhdGEuc2tpbGxfaWQudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2FsbERhdGEuc2tpbGxfbHYudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgICkgYXMgU2tpbGxDb25maWc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNraWxsRGF0YS5za2lsbF90eXBlID09IFNraWxsVHlwZS5QQVNTSVZFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhbGxJdGVtLmFwcGx5X3Bhc3NpdmVfc2tpbGwoc2tpbGxEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBmaWdodFRlbXBEYXRhLmRlZmVuc2VfaGVyb19kYXRhX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1vbl9oZXJvX2FwcGx5X3Bhc3NpdmVfc2tpbGwoZmlnaHRUZW1wRGF0YS5kZWZlbnNlX2hlcm9fZGF0YV9hcnJheVtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBmaWdodFRlbXBEYXRhLmhlcm9fZGF0YV9hcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21tb25faGVyb19hcHBseV9wYXNzaXZlX3NraWxsKGZpZ2h0VGVtcERhdGEuaGVyb19kYXRhX2FycmF5W2ldKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGZpZ2h0VGVtcERhdGEucGFzc2l2ZV9oZXJvX2RhdGFfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFzc2l2ZV9oZXJvX2FwcGx5X3Bhc3NpdmVfc2tpbGwoZmlnaHRUZW1wRGF0YS5wYXNzaXZlX2hlcm9fZGF0YV9hcnJheVtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAzKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGFzc2l2ZV9oZXJvX2FwcGx5X3Bhc3NpdmVfc2tpbGwoaGVyb0RhdGE6IEZpZ2h0SGVyb0l0ZW1EYXRhKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJIZXJvQ29uZmlnRGF0YVwiLCBoZXJvRGF0YS5pZCArIFwiXCIpIGFzIEhlcm9Db25maWc7XHJcbiAgICAgICAgY29uc3Qgc2tpbGxDb25maWcgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiU2tpbGxDb25maWdEYXRhXCIsIGhlcm9EYXRhLnNraWxsX2lkICsgXCJcIiwgaGVyb0NvbmZpZy5sdiArIFwiXCIpIGFzIFNraWxsQ29uZmlnO1xyXG5cclxuICAgICAgICBpZiAoc2tpbGxDb25maWcuc2tpbGxfcG9zID09IFNraWxsUG9zLk1BSU5fQ0lUWSkge1xyXG4gICAgICAgICAgICBjb25zdCBNYWluQ2l0eSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmdldF9tYWluX2NpdHkoKTtcclxuICAgICAgICAgICAgZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuYnVpbGRpbmdfaXRlbV9hcnJheVtNYWluQ2l0eS5hcnJheV9pbmRleF07XHJcbiAgICAgICAgICAgIE1haW5DaXR5Lm1heF9ocCArPSBza2lsbENvbmZpZy5ocF9hZGQ7XHJcbiAgICAgICAgICAgIE1haW5DaXR5LmhwICs9IHNraWxsQ29uZmlnLmhwX2FkZDtcclxuXHJcbiAgICAgICAgICAgIGlmIChcIlwiICE9IHNraWxsQ29uZmlnLnNraWxsX25hbWUpIHtcclxuICAgICAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuQ09NTU9OLCBcInByZWZhYnMvbW9kZWwvXCIgKyBza2lsbENvbmZpZy5za2lsbF9uYW1lLCBOb2RlUG9vbEl0ZW0sIChub2RlSXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0X25vZGUuYWRkQ2hpbGQobm9kZUl0ZW0ubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZUl0ZW0ubm9kZS5zY2FsZSA9IDAuNTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlSXRlbS5ub2RlLnBvc2l0aW9uID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuZ3JpZF9wb3NpdGlvbl90b19wb3NpdGlvbihNYWluQ2l0eS5ncmlkX3Bvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmltID0gbm9kZUl0ZW0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuaW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbS5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb21tb25faGVyb19hcHBseV9wYXNzaXZlX3NraWxsKGhlcm86IEZpZ2h0SGVyb0l0ZW1EYXRhKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZmlnaHRUZW1wRGF0YSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhO1xyXG4gICAgICAgIGlmIChoZXJvICYmIGhlcm8uaGVyb190eXBlID09IDEpIHtcclxuICAgICAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJIZXJvQ29uZmlnRGF0YVwiLCBoZXJvLmlkLnRvU3RyaW5nKCkpIGFzIEhlcm9Db25maWc7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVyby5wYXNzaXZlX3NraWxsX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXNzaXZlU2tpbGxJZCA9IGhlcm8ucGFzc2l2ZV9za2lsbF9hcnJheVtpXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNraWxsQ29uZmlnID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIlNraWxsQ29uZmlnRGF0YVwiLCBwYXNzaXZlU2tpbGxJZC50b1N0cmluZygpLCBoZXJvQ29uZmlnLmx2LnRvU3RyaW5nKCkpIGFzIFNraWxsQ29uZmlnO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNraWxsQ29uZmlnICYmIHNraWxsQ29uZmlnLnNraWxsX3R5cGUgPT0gU2tpbGxUeXBlLlBBU1NJVkUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2tpbGxDb25maWcuc2tpbGxfcG9zID09IFNraWxsUG9zLkFMTF9TRUxGX0JPRFkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFmZmVjdGVkSGVyb2VzOiBGaWdodEhlcm9JdGVtRGF0YVtdID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoZXJvLnR5cGUgPT0gSGVyb1R5cGUuQVRUQUNLKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZmZlY3RlZEhlcm9lcyA9IGZpZ2h0VGVtcERhdGEuaGVyb19kYXRhX2FycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWZmZWN0ZWRIZXJvZXMgPSBmaWdodFRlbXBEYXRhLmRlZmVuc2VfaGVyb19kYXRhX2FycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZmZlY3RlZEhlcm9lcy5mb3JFYWNoKChhZmZlY3RlZEhlcm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhZmZlY3RlZEhlcm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZmZlY3RlZEhlcm8ucGFzc2l2ZV9hdHRhY2tfYm9udXNfcmF0aW8gKz0gc2tpbGxDb25maWcuZGFtYWdlX3JhdGlvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFmZmVjdGVkSGVyby5wYXNzaXZlX2RlZmVuc2VfYm9udXNfcmF0aW8gKz0gc2tpbGxDb25maWcuZGVmZW5zZV9yYXRpbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihcIuacquWunueOsOeahOiiq+WKqOmHiuaUvuS9jee9rlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJW4buLIHRyw60gdGjhuqMgdGjhu6UgxJHhu5luZyBjaMawYSDEkcaw4bujYyB0aOG7sWMgaGnhu4duLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVIZXJvQWN0aW9uKG51bTogbnVtYmVyKTogc3RyaW5nIHwgeyB2YWx1ZTogYW55IH0ge1xyXG4gICAgICAgIGNvbnN0IGcgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YTtcclxuICAgICAgICBjb25zdCBoZXJvSXRlbSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmhlcm9faXRlbV9hcnJheVtudW1dO1xyXG5cclxuICAgICAgICBpZiAobnVsbCA9PSBoZXJvSXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJjb250aW51ZVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaGVyb0RhdGEgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5oZXJvX2RhdGFfYXJyYXlbbnVtXTtcclxuXHJcbiAgICAgICAgaWYgKGhlcm9EYXRhLmluX2JhdHRsZV9zdGF0ZSA9PSBIZXJvSW5CYXR0bGVTdGF0ZS5IQVNfSU5fQkFUVExFKSB7XHJcbiAgICAgICAgICAgIGlmIChoZXJvRGF0YS5maWdodF9zdGF0ZSA9PSBIZXJvRmlnaHRTdGF0ZS5XQUlUSU5HKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRfbmV4dF9wYXRoKGhlcm9EYXRhKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaGVyb0RhdGEuZmlnaHRfc3RhdGUgPT0gSGVyb0ZpZ2h0U3RhdGUuTU9WSU5HKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGVyb0RhdGEubW92ZV9wYXRoLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX21vdmVfb25lX2dyaWRfYWN0aW9uKGhlcm9EYXRhKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW92ZVRhcmdldCA9IGhlcm9EYXRhLm1vdmVfcGF0aFswXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRQb3NpdGlvbiA9IGcuZ3JpZF9wb3NpdGlvbl90b19wb3NpdGlvbihjYy52Mihtb3ZlVGFyZ2V0LngsIG1vdmVUYXJnZXQueSkpLmFkZChoZXJvRGF0YS5vZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1YiA9IHRhcmdldFBvc2l0aW9uLnN1YihoZXJvSXRlbS5ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXN0YW5jZSA9IHN1Yi5tYWcoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtb3ZlU3BlZWQgPSBnLmRlbHRhX3RpbWUgKiBoZXJvRGF0YS5yZWFsX21vdmVfc3BlZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5nbGUgPSBNYXRoLmF0YW4yKHN1Yi55LCBzdWIueCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgwIDwgZGlzdGFuY2UgJiYgbW92ZVNwZWVkIDwgZGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0l0ZW0ubm9kZS5wb3NpdGlvbiA9IGhlcm9JdGVtLm5vZGUucG9zaXRpb24uYWRkKGNjLnYzKE1hdGguY29zKGFuZ2xlKSwgTWF0aC5zaW4oYW5nbGUpKS5tdWwobW92ZVNwZWVkKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9JdGVtLm5vZGUucG9zaXRpb24gPSB0YXJnZXRQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0RhdGEubW92ZV9wYXRoLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IF9maWdodE1hcEl0ZW0gPSBnLmdldF9maWdodF9tYXBfaXRlbShoZXJvRGF0YS5ncmlkX3Bvc2l0aW9uLngsIGhlcm9EYXRhLmdyaWRfcG9zaXRpb24ueSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2ZpZ2h0TWFwSXRlbSAmJiBfZmlnaHRNYXBJdGVtLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9maWdodE1hcEl0ZW0uZGF0YS5yZW1vdmVfaGVyb19pbmRleChoZXJvRGF0YS5hcnJheV9pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0RhdGEuZ3JpZF9pbmRleCA9IG1vdmVUYXJnZXQueCArIG1vdmVUYXJnZXQueSAqIGcubWFwX3NpemUueDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0RhdGEuZ3JpZF9wb3NpdGlvbi54ID0gbW92ZVRhcmdldC54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvRGF0YS5ncmlkX3Bvc2l0aW9uLnkgPSBtb3ZlVGFyZ2V0Lnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9JdGVtLm5vZGUuekluZGV4ID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuZ2V0X2R5bmFtaWNfbm9kZV9sYXllcihoZXJvRGF0YS5ncmlkX2luZGV4LCBGaWdodER5bmFtaWNOb2RlTGF5ZXIuTU9WRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19tb3ZlX29uZV9ncmlkX2FjdGlvbihoZXJvRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9JdGVtLnBsYXlfc3BpbmVfYW5pbShoZXJvRGF0YS5tb3ZlX3BhdGgubGVuZ3RoIDw9IDAgPyBcInN0YXlcIiA6IFwibW92ZVwiLCBhbmdsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhlcm9EYXRhLmZpZ2h0X3N0YXRlID09IEhlcm9GaWdodFN0YXRlLkFUVEFDS0lORykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGF0aFRhcmdldCA9IGhlcm9EYXRhLmZpbmRfcGF0aF90YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0Tm9kZTogY2MuTm9kZTtcclxuICAgICAgICAgICAgICAgIGlmIChwYXRoVGFyZ2V0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXRoVGFyZ2V0IGluc3RhbmNlb2YgRmlnaHRCdWlsZGluZ0l0ZW1EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1aWRpbmdJdGVtID0gZy5idWlsZGluZ19pdGVtX2FycmF5W3BhdGhUYXJnZXQuYXJyYXlfaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnVpZGluZ0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldE5vZGUgPSBidWlkaW5nSXRlbS5ub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXRoVGFyZ2V0IGluc3RhbmNlb2YgRmlnaHRIZXJvSXRlbURhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmZW5zZUhlcm8gPSBnLmRlZmVuc2VfaGVyb19hcnJheVtwYXRoVGFyZ2V0LmFycmF5X2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZmVuc2VIZXJvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXROb2RlID0gZGVmZW5zZUhlcm8ubm9kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGF0aFRhcmdldCBpbnN0YW5jZW9mIEZpZ2h0V2FsbEl0ZW1EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdhbGxJdGVtID0gZy53YWxsX2l0ZW1fYXJyYXlbcGF0aFRhcmdldC5hcnJheV9pbmRleF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdhbGxJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXROb2RlID0gd2FsbEl0ZW0ubm9kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNjLmVycm9yKFwi5pyq55+l5YiG5pSv5oOF5Ya1XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihcInRyxrDhu51uZyBo4bujcCBuaMOhbmgga2jDtG5nIHjDoWMgxJHhu4tuaFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSBnLmdldF9maWdodF9tYXBfaXRlbShoZXJvRGF0YS5ncmlkX3Bvc2l0aW9uLngsIGhlcm9EYXRhLmdyaWRfcG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldFBvc2l0aW9uID0gZy5nZXRfZmlnaHRfbWFwX2l0ZW0oaGVyb0RhdGEuZmluZF9wYXRoX3RhcmdldC5ncmlkX3Bvc2l0aW9uLngsIGhlcm9EYXRhLmZpbmRfcGF0aF90YXJnZXQuZ3JpZF9wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQb3NpdGlvbiAmJiB0YXJnZXRQb3NpdGlvbiAmJiB0YXJnZXRQb3NpdGlvbi5ub2RlLnBvc2l0aW9uLnN1YihjdXJyZW50UG9zaXRpb24ubm9kZS5wb3NpdGlvbikubWFnKCkgPiBoZXJvRGF0YS5hdHRhY2tfcmFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9EYXRhLmZpbmRfcGF0aF90YXJnZXQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0RhdGEubW92ZV9wYXRoID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXJvRGF0YS5maWdodF9zdGF0ZSA9IEhlcm9GaWdodFN0YXRlLldBSVRJTkc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgwIDwgaGVyb0RhdGEuYXR0YWNrX3ZhbHVlICYmIDAgPCBwYXRoVGFyZ2V0LmhwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSBoZXJvRGF0YS5sYXN0X2F0dGFja190aW1lIHx8IGcudG90YWxfdGltZSAtIGhlcm9EYXRhLmxhc3RfYXR0YWNrX3RpbWUgPiBoZXJvRGF0YS5yZWFsX2F0dGFja19pbnRlcnZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9EYXRhLmxhc3RfYXR0YWNrX3RpbWUgPSBnLnRvdGFsX3RpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0RhdGEuYXR0YWNrX2NvdW50Kys7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldFdvcmxkUG9zaXRpb24gPSBnLmdyaWRfcG9zaXRpb25fdG9fcG9zaXRpb24oY2MudjIocGF0aFRhcmdldC5ncmlkX3Bvc2l0aW9uLngsIHBhdGhUYXJnZXQuZ3JpZF9wb3NpdGlvbi55KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVyb1dvcmxkUG9zaXRpb24gPSBnLmdyaWRfcG9zaXRpb25fdG9fcG9zaXRpb24oaGVyb0RhdGEuZ3JpZF9wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlyZWN0aW9uVmVjdG9yID0gdGFyZ2V0V29ybGRQb3NpdGlvbi5zdWIoaGVyb1dvcmxkUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGF0dGFja0FuZ2xlID0gTWF0aC5hdGFuMihkaXJlY3Rpb25WZWN0b3IueSwgZGlyZWN0aW9uVmVjdG9yLngpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGVyb0RhdGEuYXR0YWNrX2NvdW50ICUgKEZpZ2h0Q29uc3RhbnRzLlNLSUxMX0lOVEVSVkFMX05PUk1BTF9BVFRBQ0tfQ09VTlQgKyAxKSA9PSAwICYmIChnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5pc19kZWJ1ZyB8fCAwIDwgaGVyb0RhdGEuc2tpbGxfbHYpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNraWxsRGF0YSA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJTa2lsbENvbmZpZ0RhdGFcIiwgaGVyb0RhdGEuc2tpbGxfaWQgKyBcIlwiLCBoZXJvRGF0YS5za2lsbF9sdiArIFwiXCIpIGFzIFNraWxsQ29uZmlnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXJvSXRlbS5wbGF5X3NraWxsX2F1ZGlvKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXJvSXRlbS5wbGF5X3NwaW5lX2FuaW0oXCJza2lsbFwiLCBhdHRhY2tBbmdsZSwgZmFsc2UsIHNraWxsRGF0YS5maXJlX3RpbWUsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcIlwiICE9IHNraWxsRGF0YS5za2lsbF9uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNraWxsRGF0YS5za2lsbF9wb3MgPT0gU2tpbGxQb3MuRU5FTVlfQk9EWSB8fCBza2lsbERhdGEuc2tpbGxfcG9zID09IFNraWxsUG9zLkFMTF9FTkVNWV9CT0RZKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChza2lsbERhdGEuc2tpbGxfdHlwZSA9PSBTa2lsbFR5cGUuRkxZKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXJvSXRlbS5wbGF5X3NraWxsX2ZseV9hbmltKHNraWxsRGF0YSwgdGFyZ2V0Tm9kZSwgYXR0YWNrQW5nbGUsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfaGl0KGhlcm9EYXRhLCBwYXRoVGFyZ2V0LCBza2lsbERhdGEsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmZW5zZUhlcm8gPSBnLmRlZmVuc2VfaGVyb19hcnJheVtwYXRoVGFyZ2V0LmFycmF5X2luZGV4XVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhdGhUYXJnZXQgaW5zdGFuY2VvZiBGaWdodEhlcm9JdGVtRGF0YSAmJiBkZWZlbnNlSGVybyAmJiBkZWZlbnNlSGVyby5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1vbl9oZXJvX3NraWxsX2hpdF9idWZmKHNraWxsRGF0YSwgaGVyb0l0ZW0sIGRlZmVuc2VIZXJvLCBkZWZlbnNlSGVyby5kYXRhLmdyaWRfcG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19za2lsbF9oaXQoaGVyb0RhdGEsIHBhdGhUYXJnZXQsIHNraWxsRGF0YSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZmVuc2VIZXJvID0gZy5kZWZlbnNlX2hlcm9fYXJyYXlbcGF0aFRhcmdldC5hcnJheV9pbmRleF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXRoVGFyZ2V0IGluc3RhbmNlb2YgRmlnaHRIZXJvSXRlbURhdGEgJiYgZGVmZW5zZUhlcm8gJiYgZGVmZW5zZUhlcm8uZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1vbl9oZXJvX3NraWxsX2hpdF9idWZmKHNraWxsRGF0YSwgaGVyb0l0ZW0sIGRlZmVuc2VIZXJvLCBkZWZlbnNlSGVyby5kYXRhLmdyaWRfcG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNraWxsRGF0YS5za2lsbF9wb3MgPT0gU2tpbGxQb3MuU0VMRl9CT0RZIHx8IHNraWxsRGF0YS5za2lsbF9wb3MgPT0gU2tpbGxQb3MuQUxMX1NFTEZfQk9EWSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0l0ZW0ucGxheV9za2lsbF9hbmltKHNraWxsRGF0YSwgdGFyZ2V0Tm9kZSwgYXR0YWNrQW5nbGUsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1vbl9oZXJvX3NraWxsX2hpdF9idWZmKHNraWxsRGF0YSwgaGVyb0l0ZW0sIG51bGwsIG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShza2lsbERhdGEuc2tpbGxfcG9zICE9IFNraWxsUG9zLk9ORV9DSVJDTEVfR1JJRCAmJiBza2lsbERhdGEuc2tpbGxfcG9zICE9IFNraWxsUG9zLlRXT19DSVJDTEVfR1JJRCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2tpbGxEYXRhLnNraWxsX3R5cGUgPT0gU2tpbGxUeXBlLkZMWSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXJvSXRlbS5wbGF5X3NraWxsX2ZseV9hbmltKHNraWxsRGF0YSwgdGFyZ2V0Tm9kZSwgYXR0YWNrQW5nbGUsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19za2lsbF9oaXQoaGVyb0RhdGEsIHBhdGhUYXJnZXQsIHNraWxsRGF0YSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZmVuc2VIZXJvID0gZy5kZWZlbnNlX2hlcm9fYXJyYXlbcGF0aFRhcmdldC5hcnJheV9pbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhdGhUYXJnZXQgaW5zdGFuY2VvZiBGaWdodEhlcm9JdGVtRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmZW5zZUhlcm8gJiYgZGVmZW5zZUhlcm8uZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21tb25faGVyb19za2lsbF9oaXRfYnVmZihza2lsbERhdGEsIGhlcm9JdGVtLCBkZWZlbnNlSGVybywgZGVmZW5zZUhlcm8uZGF0YS5ncmlkX3Bvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbW9uX2hlcm9fc2tpbGxfaGl0X2J1ZmYoc2tpbGxEYXRhLCBoZXJvSXRlbSwgbnVsbCwgcGF0aFRhcmdldC5ncmlkX3Bvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihcIlRPRE865pqC5pe25rKh5pyJ6K+l5YiG5pSv55qE5oOF5Ya1XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhp4buHbiBraMO0bmcgY8OzIG5ow6FuaCBuw6BvLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcIlwiICE9IHNraWxsRGF0YS5oaXRfbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChza2lsbERhdGEuc2tpbGxfcG9zID09IFNraWxsUG9zLkVORU1ZX0JPRFkgfHwgc2tpbGxEYXRhLnNraWxsX3BvcyA9PSBTa2lsbFBvcy5BTExfRU5FTVlfQk9EWSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfaGl0KGhlcm9EYXRhLCBwYXRoVGFyZ2V0LCBza2lsbERhdGEsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZmVuc2VIZXJvID0gZy5kZWZlbnNlX2hlcm9fYXJyYXlbcGF0aFRhcmdldC5hcnJheV9pbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGF0aFRhcmdldCBpbnN0YW5jZW9mIEZpZ2h0SGVyb0l0ZW1EYXRhICYmIGRlZmVuc2VIZXJvICYmIGRlZmVuc2VIZXJvLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1vbl9oZXJvX3NraWxsX2hpdF9idWZmKHNraWxsRGF0YSwgaGVyb0l0ZW0sIGRlZmVuc2VIZXJvLCBkZWZlbnNlSGVyby5kYXRhLmdyaWRfcG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChza2lsbERhdGEuc2tpbGxfcG9zID09IFNraWxsUG9zLlNFTEZfQk9EWSB8fCBza2lsbERhdGEuc2tpbGxfcG9zID09IFNraWxsUG9zLkFMTF9TRUxGX0JPRFkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX3NraWxsX2hpdChoZXJvRGF0YSwgaGVyb0RhdGEsIHNraWxsRGF0YSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlcm9JdGVtLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1vbl9oZXJvX3NraWxsX2hpdF9idWZmKHNraWxsRGF0YSwgaGVyb0l0ZW0sIGhlcm9JdGVtLCBoZXJvSXRlbS5kYXRhLmdyaWRfcG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChza2lsbERhdGEuc2tpbGxfcG9zID09IFNraWxsUG9zLkFMTF9TRUxGX0JPRFkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBnLmhlcm9faXRlbV9hcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKGhlcm9JbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZXJvSXRlbSA9IGcuaGVyb19pdGVtX2FycmF5W2hlcm9JbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlcm9EYXRhID0gZy5oZXJvX2RhdGFfYXJyYXlbaGVyb0luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlcm9EYXRhICYmIGhlcm9EYXRhICE9IGhlcm9EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfaGl0KGhlcm9EYXRhLCBoZXJvRGF0YSwgc2tpbGxEYXRhLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlcm9JdGVtLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21tb25faGVyb19za2lsbF9oaXRfYnVmZihza2lsbERhdGEsIGhlcm9JdGVtLCBoZXJvSXRlbSwgaGVyb0l0ZW0uZGF0YS5ncmlkX3Bvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWZlbnNlSGVybyA9IGcuZGVmZW5zZV9oZXJvX2FycmF5W3BhdGhUYXJnZXQuYXJyYXlfaW5kZXhdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhdGhUYXJnZXQgaW5zdGFuY2VvZiBGaWdodEhlcm9JdGVtRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlbnNlSGVybyAmJiBkZWZlbnNlSGVyby5kYXRhICYmIHRoaXMuY29tbW9uX2hlcm9fc2tpbGxfaGl0X2J1ZmYoc2tpbGxEYXRhLCBoZXJvSXRlbSwgZGVmZW5zZUhlcm8sIGRlZmVuc2VIZXJvLmRhdGEuZ3JpZF9wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21tb25faGVyb19za2lsbF9oaXRfYnVmZihza2lsbERhdGEsIGhlcm9JdGVtLCBudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHNraWxsRGF0YS5wcmVwYXJlX3NraWxsX2FuaW1fdGltZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0l0ZW0ucGxheV9zcGluZV9hbmltKFwic3RheVwiLCBhdHRhY2tBbmdsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNraWxsRGF0YS5wcmVwYXJlX3NraWxsX2FuaW1fdGltZSA+PSBoZXJvRGF0YS5yZWFsX2F0dGFja19pbnRlcnZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2MuZXJyb3IoXCLoi7Hpm4TnmoTmlLvlh7vliqjnlLvml7bpl7TkuI3og73lpKfkuo7mlLvlh7vpl7TpmpRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihcIlRo4budaSBnaWFuIGhv4bqhdCDhuqNuaCB04bqlbiBjw7RuZyBj4bunYSBhbmggaMO5bmcga2jDtG5nIHRo4buDIGTDoGkgaMahbiBraG/huqNuZyB0aOG7nWkgZ2lhbiB04bqlbiBjw7RuZy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRhcmdldE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9EYXRhLmZpbmRfcGF0aF90YXJnZXQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0RhdGEubW92ZV9wYXRoID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXJvRGF0YS5maWdodF9zdGF0ZSA9IEhlcm9GaWdodFN0YXRlLldBSVRJTkc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJjb250aW51ZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXJvSXRlbS5wbGF5X2F0dGFja19hdWRpbygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXJvSXRlbS5wbGF5X3NwaW5lX2FuaW0oXCJhdHRhY2tcIiwgYXR0YWNrQW5nbGUsIGZhbHNlLCBoZXJvRGF0YS5mbHlfd2VhcG9uX3RpbWUsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoZXJvRGF0YS5hdHRhY2tfdHlwZSA9PSBBdHRhY2tUeXBlLlJFTU9URSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9JdGVtLnBsYXlfd2VhcG9uX2ZseV9hbmltKHRhcmdldE5vZGUsIGF0dGFja0FuZ2xlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19hdHRhY2tfaGl0KGhlcm9EYXRhLCBhdHRhY2tBbmdsZSwgcGF0aFRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2F0dGFja19oaXQoaGVyb0RhdGEsIGF0dGFja0FuZ2xlLCBwYXRoVGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgaGVyb0RhdGEuYXR0YWNrX2FuaW1fdGltZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0l0ZW0ucGxheV9zcGluZV9hbmltKFwic3RheVwiLCBhdHRhY2tBbmdsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlcm9EYXRhLmF0dGFja19hbmltX3RpbWUgPj0gaGVyb0RhdGEucmVhbF9hdHRhY2tfaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNjLmVycm9yKFwi6Iux6ZuE55qE5pS75Ye75Yqo55S75pe26Ze05LiN6IO95aSn5LqO5pS75Ye76Ze06ZqUXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoXCJUaOG7nWkgZ2lhbiBob+G6oXQg4bqjbmggdOG6pW4gY8O0bmcgY+G7p2EgYW5oIGjDuW5nIGtow7RuZyB0aOG7gyBkw6BpIGjGoW4ga2hv4bqjbmcgdGjhu51pIGdpYW4gdOG6pW4gY8O0bmcuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiY29udGludWVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKFwiaGVyb19kYXRhLmZpbmRfcGF0aF90YXJnZXQgbmVlZCAhPSBudWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGhlcm9EYXRhLmZpbmRfcGF0aF90YXJnZXQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaGVyb0RhdGEubW92ZV9wYXRoID0gW107XHJcbiAgICAgICAgICAgICAgICBoZXJvRGF0YS5maWdodF9zdGF0ZSA9IEhlcm9GaWdodFN0YXRlLldBSVRJTkc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlX2hlcm9fYWN0aW9uKCk6IGFueSB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmhlcm9faXRlbV9hcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3QgaGVyb0FjdGlvbiA9IHRoaXMuaGFuZGxlSGVyb0FjdGlvbihpbmRleCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaGVyb0FjdGlvbiA9PT0gXCJvYmplY3RcIiAmJiBoZXJvQWN0aW9uICE9PSBudWxsICYmIFwidmFsdWVcIiBpbiBoZXJvQWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaGVyb0FjdGlvbi52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBoZXJvX21vdmVfb25lX2dyaWRfYWN0aW9uKGhlcm86IEZpZ2h0SGVyb0l0ZW1EYXRhKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZmlnaHRUZW1wRGF0YSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRNYXBJdGVtID0gZmlnaHRUZW1wRGF0YS5nZXRfZmlnaHRfbWFwX2l0ZW0oaGVyby5ncmlkX3Bvc2l0aW9uLngsIGhlcm8uZ3JpZF9wb3NpdGlvbi55KTtcclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnRNYXBJdGVtICYmIGN1cnJlbnRNYXBJdGVtLmRhdGEpIHtcclxuICAgICAgICAgICAgY3VycmVudE1hcEl0ZW0ucGlja191cF9wcm9wKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpZ2h0TWFwSXRlbSA9IGN1cnJlbnRNYXBJdGVtLmRhdGEuYWRkX2hlcm9faW5kZXgoaGVyby5hcnJheV9pbmRleCk7XHJcbiAgICAgICAgICAgIGhlcm8ub2Zmc2V0ID0gZmlnaHRNYXBJdGVtLm9mZnNldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChoZXJvLmZpbmRfcGF0aF90YXJnZXQgaW5zdGFuY2VvZiBGaWdodFByb3BJdGVtRGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoaGVyby5tb3ZlX3BhdGgubGVuZ3RoID09IDApIGhlcm8uZmlnaHRfc3RhdGUgPSBIZXJvRmlnaHRTdGF0ZS5XQUlUSU5HO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRNYXBJdGVtID0gZmlnaHRUZW1wRGF0YS5nZXRfZmlnaHRfbWFwX2l0ZW0oaGVyby5maW5kX3BhdGhfdGFyZ2V0LmdyaWRfcG9zaXRpb24ueCwgaGVyby5maW5kX3BhdGhfdGFyZ2V0LmdyaWRfcG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXRNYXBJdGVtICYmIHRhcmdldE1hcEl0ZW0ubm9kZS5wb3NpdGlvbi5zdWIoY3VycmVudE1hcEl0ZW0ubm9kZS5wb3NpdGlvbikubWFnKCkgPD0gaGVyby5hdHRhY2tfcmFuZ2UpIHtcclxuICAgICAgICAgICAgICAgIGhlcm8uZmlnaHRfc3RhdGUgPSBIZXJvRmlnaHRTdGF0ZS5BVFRBQ0tJTkc7XHJcbiAgICAgICAgICAgICAgICBoZXJvLm1vdmVfcGF0aCA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGVyb19hdHRhY2tfaGl0KGF0dGFja2VyOiBGaWdodEhlcm9JdGVtRGF0YSwgYW5nbGU6IG51bWJlciwgdGFyZ2V0OiBGaWdodEhlcm9JdGVtRGF0YSB8IEZpZ2h0QnVpbGRpbmdJdGVtRGF0YSB8IEZpZ2h0V2FsbEl0ZW1EYXRhIHwgRmlnaHRQcm9wSXRlbURhdGEpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBmaWdodFRlbXBEYXRhID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGE7XHJcbiAgICAgICAgbGV0IHRhcmdldE9iamVjdDogRmlnaHRIZXJvSXRlbSB8IEZpZ2h0QnVpbGRpbmdJdGVtIHwgRmlnaHRXYWxsSXRlbTtcclxuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRmlnaHRIZXJvSXRlbURhdGEpIHtcclxuICAgICAgICAgICAgaWYgKHRhcmdldC50eXBlID09IEhlcm9UeXBlLkFUVEFDSykge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0T2JqZWN0ID0gZmlnaHRUZW1wRGF0YS5oZXJvX2l0ZW1fYXJyYXlbdGFyZ2V0LmFycmF5X2luZGV4XTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQudHlwZSA9PSBIZXJvVHlwZS5ERUZFTlNFKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRPYmplY3QgPSBmaWdodFRlbXBEYXRhLmRlZmVuc2VfaGVyb19hcnJheVt0YXJnZXQuYXJyYXlfaW5kZXhdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBGaWdodEJ1aWxkaW5nSXRlbURhdGEpIHtcclxuICAgICAgICAgICAgdGFyZ2V0T2JqZWN0ID0gZmlnaHRUZW1wRGF0YS5idWlsZGluZ19pdGVtX2FycmF5W3RhcmdldC5hcnJheV9pbmRleF07XHJcbiAgICAgICAgICAgIGlmICghdGFyZ2V0LmxvY2tfYXR0YWNrX3RhcmdldCkgdGFyZ2V0LmxvY2tfYXR0YWNrX3RhcmdldCA9IGF0dGFja2VyO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRmlnaHRXYWxsSXRlbURhdGEpIHtcclxuICAgICAgICAgICAgdGFyZ2V0T2JqZWN0ID0gZmlnaHRUZW1wRGF0YS53YWxsX2l0ZW1fYXJyYXlbdGFyZ2V0LmFycmF5X2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKCF0YXJnZXQubG9ja19hdHRhY2tfdGFyZ2V0KSB0YXJnZXQubG9ja19hdHRhY2tfdGFyZ2V0ID0gYXR0YWNrZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0YXJnZXRPYmplY3QpIHtcclxuICAgICAgICAgICAgdGFyZ2V0T2JqZWN0LmNoYW5nZV9ocCgtYXR0YWNrZXIucmVhbF9hdHRhY2tfdmFsdWUpO1xyXG4gICAgICAgICAgICBsZXQgaGl0QW5pbWF0aW9uID0gXCJoaXRcIjtcclxuICAgICAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJIZXJvQ29uZmlnRGF0YVwiLCBgJHthdHRhY2tlci5pZH1gKSBhcyBIZXJvQ29uZmlnO1xyXG4gICAgICAgICAgICBpZiAoaGVyb0NvbmZpZyAmJiBoZXJvQ29uZmlnLmhpdF9uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBoaXRBbmltYXRpb24gPSBoZXJvQ29uZmlnLmhpdF9uYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRhcmdldE9iamVjdC5wbGF5X2hpdF9hbmltKHRhcmdldE9iamVjdC5ub2RlLCBoaXRBbmltYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRhcmdldC5ocCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRmlnaHRCdWlsZGluZ0l0ZW1EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZ2h0VGVtcERhdGEuaXNfbWFpbl9jaXR5KHRhcmdldC5pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWdodFRlbXBEYXRhLmJ1aWxkaW5nX2RhdGFfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWdodFRlbXBEYXRhLmJ1aWxkaW5nX2RhdGFfYXJyYXlbaV0gIT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYnVpbGRpbmdJdGVtID0gZmlnaHRUZW1wRGF0YS5idWlsZGluZ19pdGVtX2FycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidWlsZGluZ0l0ZW0pIGJ1aWxkaW5nSXRlbS5wdXRfdG9fcG9vbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRfc3VjY2VzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmaWdodFRlbXBEYXRhLmdyaWQuc2V0V2Fsa2FibGUodGFyZ2V0LmdyaWRfcG9zaXRpb24ueCwgdGFyZ2V0LmdyaWRfcG9zaXRpb24ueSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEZpZ2h0V2FsbEl0ZW1EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlnaHRUZW1wRGF0YS5ncmlkLnNldFdhbGthYmxlKHRhcmdldC5ncmlkX3Bvc2l0aW9uLngsIHRhcmdldC5ncmlkX3Bvc2l0aW9uLnksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0T2JqZWN0LnB1dF90b19wb29sKCk7XHJcbiAgICAgICAgICAgICAgICBhdHRhY2tlci5maW5kX3BhdGhfdGFyZ2V0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGF0dGFja2VyLm1vdmVfcGF0aCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgYXR0YWNrZXIuZmlnaHRfc3RhdGUgPSBIZXJvRmlnaHRTdGF0ZS5XQUlUSU5HO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGVyb19za2lsbF9oaXQoYXR0YWNrZXI6IEZpZ2h0SGVyb0l0ZW1EYXRhLCB0YXJnZXQ6IEZpZ2h0UHJvcEl0ZW1EYXRhIHwgRmlnaHRIZXJvSXRlbURhdGEgfCBGaWdodEJ1aWxkaW5nSXRlbURhdGEgfCBGaWdodFdhbGxJdGVtRGF0YSwgc2tpbGw6IFNraWxsQ29uZmlnLCBjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBmaWdodERhdGEgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YTtcclxuICAgICAgICBsZXQgdGFyZ2V0SGVybzogRmlnaHRIZXJvSXRlbSB8IEZpZ2h0QnVpbGRpbmdJdGVtIHwgRmlnaHRXYWxsSXRlbTtcclxuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRmlnaHRIZXJvSXRlbURhdGEpIHtcclxuICAgICAgICAgICAgaWYgKHRhcmdldC50eXBlID09IEhlcm9UeXBlLkFUVEFDSykge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0SGVybyA9IGZpZ2h0RGF0YS5oZXJvX2l0ZW1fYXJyYXlbdGFyZ2V0LmFycmF5X2luZGV4XSBhcyBGaWdodEhlcm9JdGVtO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC50eXBlID09IEhlcm9UeXBlLkRFRkVOU0UpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldEhlcm8gPSBmaWdodERhdGEuZGVmZW5zZV9oZXJvX2FycmF5W3RhcmdldC5hcnJheV9pbmRleF0gYXMgRmlnaHRIZXJvSXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRmlnaHRCdWlsZGluZ0l0ZW1EYXRhKSB7XHJcbiAgICAgICAgICAgIHRhcmdldEhlcm8gPSBmaWdodERhdGEuYnVpbGRpbmdfaXRlbV9hcnJheVt0YXJnZXQuYXJyYXlfaW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoIXRhcmdldC5sb2NrX2F0dGFja190YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5sb2NrX2F0dGFja190YXJnZXQgPSBhdHRhY2tlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRmlnaHRXYWxsSXRlbURhdGEpIHtcclxuICAgICAgICAgICAgdGFyZ2V0SGVybyA9IGZpZ2h0RGF0YS53YWxsX2l0ZW1fYXJyYXlbdGFyZ2V0LmFycmF5X2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKCF0YXJnZXQubG9ja19hdHRhY2tfdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQubG9ja19hdHRhY2tfdGFyZ2V0ID0gYXR0YWNrZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRhcmdldEhlcm8gJiYgdGFyZ2V0SGVyby5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRhcmdldEhlcm8uY2hhbmdlX2hwKC1hdHRhY2tlci5yZWFsX2F0dGFja192YWx1ZSAqIHNraWxsLmRhbWFnZV9yYXRpbyk7XHJcbiAgICAgICAgICAgIGlmIChza2lsbC5oaXRfbmFtZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2tpbGwuc2tpbGxfcG9zID09IFNraWxsUG9zLk9ORV9DSVJDTEVfR1JJRCB8fCBza2lsbC5za2lsbF9wb3MgPT0gU2tpbGxQb3MuVFdPX0NJUkNMRV9HUklEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWRQb3NpdGlvbiA9IHRhcmdldEhlcm8uZGF0YS5ncmlkX3Bvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByYW5nZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNraWxsLnNraWxsX3BvcyA9PSBTa2lsbFBvcy5PTkVfQ0lSQ0xFX0dSSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2tpbGwuc2tpbGxfcG9zID09IFNraWxsUG9zLlRXT19DSVJDTEVfR1JJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSBncmlkUG9zaXRpb24ueCAtIHJhbmdlOyB4IDw9IGdyaWRQb3NpdGlvbi54ICsgcmFuZ2U7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB5ID0gZ3JpZFBvc2l0aW9uLnkgLSByYW5nZTsgeSA8PSBncmlkUG9zaXRpb24ueSArIHJhbmdlOyB5KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtYXBJdGVtID0gZmlnaHREYXRhLmdldF9maWdodF9tYXBfaXRlbSh4LCB5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXBJdGVtICYmIG1hcEl0ZW0uZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEhlcm8ucGxheV9za2lsbF9oaXRfYW5pbShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwSXRlbS5sYW5kX25vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNraWxsLmhpdF9uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5maWdodC5tYXBfbm9kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHREYXRhLmdldF9keW5hbWljX25vZGVfbGF5ZXIobWFwSXRlbS5kYXRhLmdyaWRfaW5kZXgsIEZpZ2h0RHluYW1pY05vZGVMYXllci5GSVJFX0VGRkVDVClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRIZXJvLnBsYXlfc2tpbGxfaGl0X2FuaW0odGFyZ2V0SGVyby5ub2RlLCBza2lsbC5oaXRfbmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSwgMC4zKTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldC5ocCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRmlnaHRCdWlsZGluZ0l0ZW1EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZ2h0RGF0YS5pc19tYWluX2NpdHkodGFyZ2V0LmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpZ2h0RGF0YS5idWlsZGluZ19kYXRhX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlnaHREYXRhLmJ1aWxkaW5nX2RhdGFfYXJyYXlbaV0gIT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ1aWxkaW5nID0gZmlnaHREYXRhLmJ1aWxkaW5nX2l0ZW1fYXJyYXlbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ1aWxkaW5nKSBidWlsZGluZy5wdXRfdG9fcG9vbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlnaHRfc3VjY2VzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmaWdodERhdGEuZ3JpZC5zZXRXYWxrYWJsZSh0YXJnZXQuZ3JpZF9wb3NpdGlvbi54LCB0YXJnZXQuZ3JpZF9wb3NpdGlvbi55LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRmlnaHRXYWxsSXRlbURhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWdodERhdGEuZ3JpZC5zZXRXYWxrYWJsZSh0YXJnZXQuZ3JpZF9wb3NpdGlvbi54LCB0YXJnZXQuZ3JpZF9wb3NpdGlvbi55LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRIZXJvLnB1dF90b19wb29sKCk7XHJcbiAgICAgICAgICAgICAgICBhdHRhY2tlci5maW5kX3BhdGhfdGFyZ2V0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGF0dGFja2VyLm1vdmVfcGF0aCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgYXR0YWNrZXIuZmlnaHRfc3RhdGUgPSBIZXJvRmlnaHRTdGF0ZS5XQUlUSU5HO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGVmZW5zZV9oZXJvX3NraWxsX2hpdChhdHRhY2tlcjogRmlnaHRIZXJvSXRlbURhdGEsIGRlZmVuZGVyOiBGaWdodEhlcm9JdGVtRGF0YSwgc2tpbGw6IFNraWxsQ29uZmlnLCBjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBsZXQgdGFyZ2V0SGVybzogRmlnaHRIZXJvSXRlbTtcclxuICAgICAgICBjb25zdCBmaWdodERhdGEgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YTtcclxuICAgICAgICBpZiAoZGVmZW5kZXIgaW5zdGFuY2VvZiBGaWdodEhlcm9JdGVtRGF0YSkge1xyXG4gICAgICAgICAgICB0YXJnZXRIZXJvID0gZmlnaHREYXRhLmhlcm9faXRlbV9hcnJheVtkZWZlbmRlci5hcnJheV9pbmRleF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGFyZ2V0SGVybyAmJiB0YXJnZXRIZXJvLmRhdGEpIHtcclxuICAgICAgICAgICAgdGFyZ2V0SGVyby5jaGFuZ2VfaHAoLWF0dGFja2VyLnJlYWxfYXR0YWNrX3ZhbHVlICogc2tpbGwuZGFtYWdlX3JhdGlvKTtcclxuICAgICAgICAgICAgaWYgKHNraWxsLmhpdF9uYW1lICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChza2lsbC5za2lsbF9wb3MgPT0gU2tpbGxQb3MuT05FX0NJUkNMRV9HUklEIHx8IHNraWxsLnNraWxsX3BvcyA9PSBTa2lsbFBvcy5UV09fQ0lSQ0xFX0dSSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBncmlkUG9zaXRpb24gPSB0YXJnZXRIZXJvLmRhdGEuZ3JpZF9wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmFuZ2UgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChza2lsbC5za2lsbF9wb3MgPT0gU2tpbGxQb3MuT05FX0NJUkNMRV9HUklEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNraWxsLnNraWxsX3BvcyA9PSBTa2lsbFBvcy5UV09fQ0lSQ0xFX0dSSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB4ID0gZ3JpZFBvc2l0aW9uLnggLSByYW5nZTsgeCA8PSBncmlkUG9zaXRpb24ueCArIHJhbmdlOyB4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeSA9IGdyaWRQb3NpdGlvbi55IC0gcmFuZ2U7IHkgPD0gZ3JpZFBvc2l0aW9uLnkgKyByYW5nZTsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXBJdGVtID0gZmlnaHREYXRhLmdldF9maWdodF9tYXBfaXRlbSh4LCB5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXBJdGVtICYmIG1hcEl0ZW0uZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEhlcm8ucGxheV9za2lsbF9oaXRfYW5pbShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwSXRlbS5sYW5kX25vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNraWxsLmhpdF9uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5maWdodC5tYXBfbm9kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHREYXRhLmdldF9keW5hbWljX25vZGVfbGF5ZXIobWFwSXRlbS5kYXRhLmdyaWRfaW5kZXgsIEZpZ2h0RHluYW1pY05vZGVMYXllci5GSVJFX0VGRkVDVClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRIZXJvLnBsYXlfc2tpbGxfaGl0X2FuaW0odGFyZ2V0SGVyby5ub2RlLCBza2lsbC5oaXRfbmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRlZmVuZGVyLmZpbmRfcGF0aF90YXJnZXQgaW5zdGFuY2VvZiBGaWdodEJ1aWxkaW5nSXRlbURhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1aWxkaW5nID0gZGVmZW5kZXIuZmluZF9wYXRoX3RhcmdldDtcclxuICAgICAgICAgICAgICAgIGlmIChidWlsZGluZy5ocCAvIGJ1aWxkaW5nLm1heF9ocCA+PSAwLjQ1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZmluZF9uZXh0X3BhdGhfZGlzdGFuY2UoZGVmZW5kZXIuZ3JpZF9wb3NpdGlvbiwgYXR0YWNrZXIuZ3JpZF9wb3NpdGlvbikgIT0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kX25leHRfcGF0aChkZWZlbmRlciwgYXR0YWNrZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSwgMC4zKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkZWZlbmRlci5ocCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRIZXJvLnB1dF90b19wb29sKCk7XHJcbiAgICAgICAgICAgICAgICBmaWdodERhdGEuZGVhdGhfaGVyb19jb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgYXR0YWNrZXIubW92ZV9wYXRoID0gW107XHJcbiAgICAgICAgICAgICAgICBhdHRhY2tlci5maW5kX3BhdGhfdGFyZ2V0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGF0dGFja2VyLmZpZ2h0X3N0YXRlID0gSGVyb0ZpZ2h0U3RhdGUuV0FJVElORztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZmlnaHREYXRhLmRlYXRoX2hlcm9fY291bnQgPj0gZmlnaHREYXRhLmhlcm9fZGF0YV9hcnJheS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0X3Jldml2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb21tb25faGVyb19za2lsbF9oaXRfYnVmZihza2lsbDogU2tpbGxDb25maWcsIGNhc3RlcjogRmlnaHRIZXJvSXRlbSwgdGFyZ2V0OiBGaWdodEhlcm9JdGVtLCBwb3NpdGlvbjogY2MuVmVjMik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGZpZ2h0RGF0YSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhO1xyXG4gICAgICAgIGNvbnN0IGFmZmVjdGVkVW5pdHM6IEZpZ2h0SGVyb0l0ZW1bXSA9IFtdO1xyXG4gICAgICAgIGlmIChza2lsbC5za2lsbF9wb3MgPT0gU2tpbGxQb3MuRU5FTVlfQk9EWSAmJiB0YXJnZXQpIHtcclxuICAgICAgICAgICAgYWZmZWN0ZWRVbml0cy5wdXNoKHRhcmdldCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChza2lsbC5za2lsbF9wb3MgPT0gU2tpbGxQb3MuQUxMX0VORU1ZX0JPRFkpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWdodERhdGEuZGVmZW5zZV9oZXJvX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbmVteUhlcm8gPSBmaWdodERhdGEuZGVmZW5zZV9oZXJvX2FycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVuZW15SGVybykgYWZmZWN0ZWRVbml0cy5wdXNoKGVuZW15SGVybyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHNraWxsLnNraWxsX3BvcyA9PSBTa2lsbFBvcy5TRUxGX0JPRFkpIHtcclxuICAgICAgICAgICAgYWZmZWN0ZWRVbml0cy5wdXNoKGNhc3Rlcik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChza2lsbC5za2lsbF9wb3MgPT0gU2tpbGxQb3MuQUxMX1NFTEZfQk9EWSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpZ2h0RGF0YS5oZXJvX2l0ZW1fYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFsbHlIZXJvID0gZmlnaHREYXRhLmhlcm9faXRlbV9hcnJheVtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChhbGx5SGVybyAmJiBhbGx5SGVyby5kYXRhICYmIGFsbHlIZXJvLmRhdGEuaHAgPiAwICYmIGFsbHlIZXJvLmRhdGEuaW5fYmF0dGxlX3N0YXRlID09IEhlcm9JbkJhdHRsZVN0YXRlLkhBU19JTl9CQVRUTEUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZmZlY3RlZFVuaXRzLnB1c2goYWxseUhlcm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICgoc2tpbGwuc2tpbGxfcG9zID09IFNraWxsUG9zLk9ORV9DSVJDTEVfR1JJRCB8fCBza2lsbC5za2lsbF9wb3MgPT0gU2tpbGxQb3MuVFdPX0NJUkNMRV9HUklEKSAmJiBwb3NpdGlvbikge1xyXG4gICAgICAgICAgICBpZiAoIWNhc3Rlci5kYXRhKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnN0IHBvdGVudGlhbFRhcmdldHMgPSBjYXN0ZXIuZGF0YS50eXBlID09IEhlcm9UeXBlLkFUVEFDSyA/IGZpZ2h0RGF0YS5kZWZlbnNlX2hlcm9fYXJyYXkgOiBmaWdodERhdGEuaGVyb19pdGVtX2FycmF5O1xyXG4gICAgICAgICAgICBjb25zdCByYW5nZSA9IHNraWxsLnNraWxsX3BvcyA9PSBTa2lsbFBvcy5PTkVfQ0lSQ0xFX0dSSUQgPyAxIDogMjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3RlbnRpYWxUYXJnZXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZWFyYnlIZXJvID0gcG90ZW50aWFsVGFyZ2V0c1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChuZWFyYnlIZXJvICYmIG5lYXJieUhlcm8uZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gbmVhcmJ5SGVyby5kYXRhLmdyaWRfcG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHggPj0gcG9zaXRpb24ueCAtIHJhbmdlICYmIHggPD0gcG9zaXRpb24ueCArIHJhbmdlICYmIHkgPj0gcG9zaXRpb24ueSAtIHJhbmdlICYmIHkgPD0gcG9zaXRpb24ueSArIHJhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFmZmVjdGVkVW5pdHMucHVzaChuZWFyYnlIZXJvKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2tpbGwuZWZmZWN0X2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVmZmVjdCA9IHNraWxsLmVmZmVjdF9hcnJheVtpXTtcclxuICAgICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCBlZmZlY3QudHJpZ2dlcl9yYXRpbykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnVmZiA9IG5ldyBCdWZmSXRlbURhdGEoKTtcclxuICAgICAgICAgICAgICAgIGJ1ZmYuaWQgPSBlZmZlY3Quc2tpbGxfZWZmZWN0X2lkO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChidWZmLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTa2lsbEVmZmVjdElkLlJFRFVDRV9EQU1BR0U6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmYucmVkdWNlX2RhbWFnZV9yYXRpbyA9IGVmZmVjdC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZi5tYXhfdHJpZ2dlcl9jb3VudCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmYuaXNfc3RhcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmLmlzX2VuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFNraWxsRWZmZWN0SWQuQVRUQUNLX1NQRUVEX1VQOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmLmF0dGFja19zcGVlZF9yYXRpbyA9IGVmZmVjdC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZi5tYXhfdHJpZ2dlcl9jb3VudCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmYuaXNfc3RhcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmLmlzX2VuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFNraWxsRWZmZWN0SWQuQVRUQUNLX0JPTlVTOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmLmF0dGFja19ib251c19yYXRpbyA9IGVmZmVjdC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZi5tYXhfdHJpZ2dlcl9jb3VudCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmYuaXNfc3RhcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmLmlzX2VuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFNraWxsRWZmZWN0SWQuRElaWklORVNTOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmLmRhbWFnZV92YWx1ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmYubW92ZV9zcGVlZF9zY2FsZSA9IGVmZmVjdC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZi5tYXhfdHJpZ2dlcl9jb3VudCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmYuaXNfc3RhcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmLmlzX2VuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFNraWxsRWZmZWN0SWQuREVGRU5TRV9CT05VUzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZi5kZWZlbnNlX2JvbnVzX3JhdGlvID0gZWZmZWN0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmLm1heF90cmlnZ2VyX2NvdW50ID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZi5pc19zdGFydCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmYuaXNfZW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU2tpbGxFZmZlY3RJZC5SRVNUT1JFX0hQOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmLnJlc3RvcmVfaHBfcmF0aW8gPSBlZmZlY3QudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmYubWF4X3RyaWdnZXJfY291bnQgPSBNYXRoLmNlaWwoZWZmZWN0LmR1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZi5pc19zdGFydCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmYuaXNfZW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU2tpbGxFZmZlY3RJZC5GSVJFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmLm1heF90cmlnZ2VyX2NvdW50ID0gTWF0aC5jZWlsKGVmZmVjdC5kdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYXN0ZXIuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZi5kYW1hZ2VfdmFsdWUgPSBNYXRoLmNlaWwoKGVmZmVjdC52YWx1ZSAqIGNhc3Rlci5kYXRhLnJlYWxfYXR0YWNrX3ZhbHVlKSAvIGJ1ZmYubWF4X3RyaWdnZXJfY291bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmYuaXNfc3RhcnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZi5pc19lbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFNraWxsRWZmZWN0SWQuUkVEVUNFX1NQRUVEOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmLmRhbWFnZV92YWx1ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmYubW92ZV9zcGVlZF9zY2FsZSA9IE1hdGgubWF4KDAsIDEgLSBlZmZlY3QudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmLm1heF90cmlnZ2VyX2NvdW50ID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZi5pc19zdGFydCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmYuaXNfZW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKFwiVW5rbm93biBidWZmIElEXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnVmZi5zdGFydF90aW1lID0gZmlnaHREYXRhLnRvdGFsX3RpbWU7XHJcbiAgICAgICAgICAgICAgICBidWZmLnZhbGlkX3RpbWUgPSBlZmZlY3QuZHVyYXRpb247XHJcbiAgICAgICAgICAgICAgICBidWZmLnRyaWdnZXJfY291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgYnVmZi52YWx1ZSA9IGVmZmVjdC52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGFmZmVjdGVkVW5pdHMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBhZmZlY3RlZFVuaXRzW2tdLmFkZF9idWZmX2RhdGEoYnVmZik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcHJvY2Vzc0hlcm9BY3Rpb24oaGVyb0luZGV4OiBudW1iZXIpOiBzdHJpbmcgfCB7IHZhbHVlOiBhbnkgfSB7XHJcbiAgICAgICAgY29uc3QgZmlnaHREYXRhID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGE7XHJcbiAgICAgICAgY29uc3QgZGVmZW5zZUhlcm8gPSBmaWdodERhdGEuZGVmZW5zZV9oZXJvX2FycmF5W2hlcm9JbmRleF07XHJcblxyXG4gICAgICAgIGlmIChudWxsID09IGRlZmVuc2VIZXJvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcImNvbnRpbnVlXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkZWZlbnNlRGF0YSA9IGZpZ2h0RGF0YS5kZWZlbnNlX2hlcm9fZGF0YV9hcnJheVtoZXJvSW5kZXhdO1xyXG4gICAgICAgIGlmIChkZWZlbnNlRGF0YS5maWdodF9zdGF0ZSA9PSBIZXJvRmlnaHRTdGF0ZS5XQUlUSU5HKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZF9uZXh0X3BhdGgoZGVmZW5zZURhdGEpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGRlZmVuc2VEYXRhLmZpZ2h0X3N0YXRlID09IEhlcm9GaWdodFN0YXRlLk1PVklORykge1xyXG4gICAgICAgICAgICBpZiAoZGVmZW5zZURhdGEubW92ZV9wYXRoLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmVuc2VfaGVyb19tb3ZlX29uZV9ncmlkX2FjdGlvbihkZWZlbnNlRGF0YSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0UG9zaXRpb24gPSBkZWZlbnNlRGF0YS5tb3ZlX3BhdGhbMF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRQb3NpdGlvbiA9IGZpZ2h0RGF0YS5ncmlkX3Bvc2l0aW9uX3RvX3Bvc2l0aW9uKGNjLnYyKG5leHRQb3NpdGlvbi54LCBuZXh0UG9zaXRpb24ueSkpLmFkZChkZWZlbnNlRGF0YS5vZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbW92ZW1lbnRWZWN0b3IgPSB0YXJnZXRQb3NpdGlvbi5zdWIoZGVmZW5zZUhlcm8ubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaXN0YW5jZVRvVGFyZ2V0ID0gbW92ZW1lbnRWZWN0b3IubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtb3ZlRGlzdGFuY2UgPSBmaWdodERhdGEuZGVsdGFfdGltZSAqIGRlZmVuc2VEYXRhLnJlYWxfbW92ZV9zcGVlZDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gTWF0aC5hdGFuMihtb3ZlbWVudFZlY3Rvci55LCBtb3ZlbWVudFZlY3Rvci54KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoMCA8IGRpc3RhbmNlVG9UYXJnZXQgJiYgbW92ZURpc3RhbmNlIDwgZGlzdGFuY2VUb1RhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVuc2VIZXJvLm5vZGUucG9zaXRpb24gPSBkZWZlbnNlSGVyby5ub2RlLnBvc2l0aW9uLmFkZChjYy52MyhNYXRoLmNvcyhhbmdsZSksIE1hdGguc2luKGFuZ2xlKSkubXVsKG1vdmVEaXN0YW5jZSkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlbnNlSGVyby5ub2RlLnBvc2l0aW9uID0gdGFyZ2V0UG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZW5zZURhdGEubW92ZV9wYXRoLnNoaWZ0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyaWRJdGVtID0gZmlnaHREYXRhLmdldF9maWdodF9tYXBfaXRlbShkZWZlbnNlRGF0YS5ncmlkX3Bvc2l0aW9uLngsIGRlZmVuc2VEYXRhLmdyaWRfcG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWRJdGVtICYmIGdyaWRJdGVtLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZEl0ZW0uZGF0YS5yZW1vdmVfZGVmZW5zZV9oZXJvX2luZGV4KGRlZmVuc2VEYXRhLmFycmF5X2luZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVuc2VEYXRhLmdyaWRfaW5kZXggPSBuZXh0UG9zaXRpb24ueCArIG5leHRQb3NpdGlvbi55ICogZmlnaHREYXRhLm1hcF9zaXplLng7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZW5zZURhdGEuZ3JpZF9wb3NpdGlvbi54ID0gbmV4dFBvc2l0aW9uLng7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZW5zZURhdGEuZ3JpZF9wb3NpdGlvbi55ID0gbmV4dFBvc2l0aW9uLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZW5zZUhlcm8ubm9kZS56SW5kZXggPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5nZXRfZHluYW1pY19ub2RlX2xheWVyKGRlZmVuc2VEYXRhLmdyaWRfaW5kZXgsIEZpZ2h0RHluYW1pY05vZGVMYXllci5NT1ZFKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmVuc2VfaGVyb19tb3ZlX29uZV9ncmlkX2FjdGlvbihkZWZlbnNlRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWZlbnNlSGVyby5wbGF5X3NwaW5lX2FuaW0oZGVmZW5zZURhdGEubW92ZV9wYXRoLmxlbmd0aCA8PSAwID8gXCJzdGF5XCIgOiBcIm1vdmVcIiwgYW5nbGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGVmZW5zZURhdGEuZmlnaHRfc3RhdGUgPT0gSGVyb0ZpZ2h0U3RhdGUuQVRUQUNLSU5HKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGRlZmVuc2VEYXRhLmZpbmRfcGF0aF90YXJnZXQgYXMgRmlnaHRIZXJvSXRlbURhdGE7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldEhlcm8gPSBmaWdodERhdGEuaGVyb19pdGVtX2FycmF5W3RhcmdldC5hcnJheV9pbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0SGVybyAmJiB0YXJnZXRIZXJvLm5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhdHRhY2tlclBvc2l0aW9uID0gZmlnaHREYXRhLmdldF9maWdodF9tYXBfaXRlbShkZWZlbnNlRGF0YS5ncmlkX3Bvc2l0aW9uLngsIGRlZmVuc2VEYXRhLmdyaWRfcG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0UG9zaXRpb24gPSBmaWdodERhdGEuZ2V0X2ZpZ2h0X21hcF9pdGVtKHRhcmdldC5ncmlkX3Bvc2l0aW9uLngsIHRhcmdldC5ncmlkX3Bvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRhY2tlclBvc2l0aW9uICYmIHRhcmdldFBvc2l0aW9uICYmIHRhcmdldFBvc2l0aW9uLm5vZGUucG9zaXRpb24uc3ViKGF0dGFja2VyUG9zaXRpb24ubm9kZS5wb3NpdGlvbikubWFnKCkgPiBkZWZlbnNlRGF0YS5hdHRhY2tfcmFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZW5zZURhdGEuZmluZF9wYXRoX3RhcmdldCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVuc2VEYXRhLm1vdmVfcGF0aCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlbnNlRGF0YS5maWdodF9zdGF0ZSA9IEhlcm9GaWdodFN0YXRlLldBSVRJTkc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoMCA8IGRlZmVuc2VEYXRhLmF0dGFja192YWx1ZSAmJiAwIDwgdGFyZ2V0LmhwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgwID09IGRlZmVuc2VEYXRhLmxhc3RfYXR0YWNrX3RpbWUgfHwgZmlnaHREYXRhLnRvdGFsX3RpbWUgLSBkZWZlbnNlRGF0YS5sYXN0X2F0dGFja190aW1lID4gZGVmZW5zZURhdGEucmVhbF9hdHRhY2tfaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVuc2VEYXRhLmxhc3RfYXR0YWNrX3RpbWUgPSBmaWdodERhdGEudG90YWxfdGltZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVuc2VEYXRhLmF0dGFja19jb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0R3JpZFBvc2l0aW9uID0gdGFyZ2V0LmdyaWRfcG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRXb3JsZFBvc2l0aW9uID0gZmlnaHREYXRhLmdyaWRfcG9zaXRpb25fdG9fcG9zaXRpb24oY2MudjIodGFyZ2V0R3JpZFBvc2l0aW9uLngsIHRhcmdldEdyaWRQb3NpdGlvbi55KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXJlY3Rpb25WZWN0b3IgPSB0YXJnZXRXb3JsZFBvc2l0aW9uLnN1YihkZWZlbnNlSGVyby5ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGF0dGFja0FuZ2xlID0gTWF0aC5hdGFuMihkaXJlY3Rpb25WZWN0b3IueSwgZGlyZWN0aW9uVmVjdG9yLngpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRIZXJvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVyb05vZGUgPSB0YXJnZXRIZXJvLm5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZmVuc2VEYXRhLmF0dGFja19jb3VudCAlIChGaWdodENvbnN0YW50cy5TS0lMTF9JTlRFUlZBTF9OT1JNQUxfQVRUQUNLX0NPVU5UICsgMSkgPT0gMCAmJiAoZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuaXNfZGVidWcgfHwgMCA8IGRlZmVuc2VEYXRhLnNraWxsX2x2ICYmIDAgPCBkZWZlbnNlRGF0YS5za2lsbF9pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2tpbGxDb25maWcgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiU2tpbGxDb25maWdEYXRhXCIsIGRlZmVuc2VEYXRhLnNraWxsX2lkICsgXCJcIiwgZGVmZW5zZURhdGEuc2tpbGxfbHYgKyBcIlwiKSBhcyBTa2lsbENvbmZpZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFza2lsbENvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlbnNlSGVyby5wbGF5X3NraWxsX2F1ZGlvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVuc2VIZXJvLnBsYXlfc3BpbmVfYW5pbShcInNraWxsXCIsIGF0dGFja0FuZ2xlLCBmYWxzZSwgc2tpbGxDb25maWcuZmlyZV90aW1lLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJcIiAhPSBza2lsbENvbmZpZy5za2lsbF9uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNraWxsQ29uZmlnLnNraWxsX3BvcyA9PSBTa2lsbFBvcy5FTkVNWV9CT0RZIHx8IHNraWxsQ29uZmlnLnNraWxsX3BvcyA9PSBTa2lsbFBvcy5BTExfRU5FTVlfQk9EWSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2tpbGxDb25maWcuc2tpbGxfdHlwZSA9PSBTa2lsbFR5cGUuRkxZKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlbnNlSGVyby5wbGF5X3NraWxsX2ZseV9hbmltKHNraWxsQ29uZmlnLCBoZXJvTm9kZSwgYXR0YWNrQW5nbGUsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmVuc2VfaGVyb19za2lsbF9oaXQoZGVmZW5zZURhdGEsIHRhcmdldCwgc2tpbGxDb25maWcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVyb0l0ZW0gPSBmaWdodERhdGEuaGVyb19pdGVtX2FycmF5W3RhcmdldC5hcnJheV9pbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBGaWdodEhlcm9JdGVtRGF0YSAmJiBoZXJvSXRlbSAmJiBoZXJvSXRlbS5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1vbl9oZXJvX3NraWxsX2hpdF9idWZmKHNraWxsQ29uZmlnLCBkZWZlbnNlSGVybywgaGVyb0l0ZW0sIGhlcm9JdGVtLmRhdGEuZ3JpZF9wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZlbnNlX2hlcm9fc2tpbGxfaGl0KGRlZmVuc2VEYXRhLCB0YXJnZXQsIHNraWxsQ29uZmlnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVyb0l0ZW0gPSBmaWdodERhdGEuaGVyb19pdGVtX2FycmF5W3RhcmdldC5hcnJheV9pbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEZpZ2h0SGVyb0l0ZW1EYXRhICYmIGhlcm9JdGVtICYmIGhlcm9JdGVtLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21tb25faGVyb19za2lsbF9oaXRfYnVmZihza2lsbENvbmZpZywgZGVmZW5zZUhlcm8sIGhlcm9JdGVtLCBoZXJvSXRlbS5kYXRhLmdyaWRfcG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShza2lsbENvbmZpZy5za2lsbF9wb3MgIT0gU2tpbGxQb3MuU0VMRl9CT0RZICYmIHNraWxsQ29uZmlnLnNraWxsX3BvcyAhPSBTa2lsbFBvcy5BTExfU0VMRl9CT0RZKSkgeyAvLy9jYW4gdGhhblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZW5zZUhlcm8ucGxheV9za2lsbF9hbmltKHNraWxsQ29uZmlnLCBoZXJvTm9kZSwgYXR0YWNrQW5nbGUsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZXJvSXRlbSA9IGZpZ2h0RGF0YS5oZXJvX2l0ZW1fYXJyYXlbdGFyZ2V0LmFycmF5X2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRmlnaHRIZXJvSXRlbURhdGEgJiYgaGVyb0l0ZW0gJiYgaGVyb0l0ZW0uZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1vbl9oZXJvX3NraWxsX2hpdF9idWZmKHNraWxsQ29uZmlnLCBkZWZlbnNlSGVybywgaGVyb0l0ZW0sIGhlcm9JdGVtLmRhdGEuZ3JpZF9wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFwiXCIgIT0gc2tpbGxDb25maWcuaGl0X25hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2tpbGxDb25maWcuc2tpbGxfcG9zID09IFNraWxsUG9zLkVORU1ZX0JPRFkgfHwgc2tpbGxDb25maWcuc2tpbGxfcG9zID09IFNraWxsUG9zLkFMTF9FTkVNWV9CT0RZKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmZW5zZV9oZXJvX3NraWxsX2hpdChkZWZlbnNlRGF0YSwgdGFyZ2V0LCBza2lsbENvbmZpZywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVyb0l0ZW0gPSBmaWdodERhdGEuaGVyb19pdGVtX2FycmF5W3RhcmdldC5hcnJheV9pbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRmlnaHRIZXJvSXRlbURhdGEgJiYgaGVyb0l0ZW0gJiYgaGVyb0l0ZW0uZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbW9uX2hlcm9fc2tpbGxfaGl0X2J1ZmYoc2tpbGxDb25maWcsIGRlZmVuc2VIZXJvLCBoZXJvSXRlbSwgaGVyb0l0ZW0uZGF0YS5ncmlkX3Bvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChza2lsbENvbmZpZy5za2lsbF9wb3MgPT0gU2tpbGxQb3MuU0VMRl9CT0RZIHx8IHNraWxsQ29uZmlnLnNraWxsX3BvcyA9PSBTa2lsbFBvcy5BTExfU0VMRl9CT0RZKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmZW5zZV9oZXJvX3NraWxsX2hpdChkZWZlbnNlRGF0YSwgZGVmZW5zZURhdGEsIHNraWxsQ29uZmlnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlbnNlSGVyby5kYXRhICYmIHRoaXMuY29tbW9uX2hlcm9fc2tpbGxfaGl0X2J1ZmYoc2tpbGxDb25maWcsIGRlZmVuc2VIZXJvLCBkZWZlbnNlSGVybywgZGVmZW5zZUhlcm8uZGF0YS5ncmlkX3Bvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChza2lsbENvbmZpZy5za2lsbF9wb3MgPT0gU2tpbGxQb3MuQUxMX1NFTEZfQk9EWSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGZpZ2h0RGF0YS5kZWZlbnNlX2hlcm9fYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKChpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWZlbnNlSGVybyA9IGZpZ2h0RGF0YS5kZWZlbnNlX2hlcm9fYXJyYXlbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWZlbnNlSGVyb0RhdGEgPSBmaWdodERhdGEuZGVmZW5zZV9oZXJvX2RhdGFfYXJyYXlbaW5kZXhdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWZlbnNlSGVyb0RhdGEgJiYgZGVmZW5zZUhlcm9EYXRhICE9IGRlZmVuc2VEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fc2tpbGxfaGl0KGRlZmVuc2VIZXJvRGF0YSwgZGVmZW5zZUhlcm9EYXRhLCBza2lsbENvbmZpZywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWZlbnNlSGVyby5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbW9uX2hlcm9fc2tpbGxfaGl0X2J1ZmYoc2tpbGxDb25maWcsIGRlZmVuc2VIZXJvLCBkZWZlbnNlSGVybywgZGVmZW5zZUhlcm8uZGF0YS5ncmlkX3Bvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlcm9JdGVtID0gZmlnaHREYXRhLmhlcm9faXRlbV9hcnJheVt0YXJnZXQuYXJyYXlfaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBGaWdodEhlcm9JdGVtRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXJvSXRlbSAmJiBoZXJvSXRlbS5kYXRhICYmIHRoaXMuY29tbW9uX2hlcm9fc2tpbGxfaGl0X2J1ZmYoc2tpbGxDb25maWcsIGRlZmVuc2VIZXJvLCBoZXJvSXRlbSwgaGVyb0l0ZW0uZGF0YS5ncmlkX3Bvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1vbl9oZXJvX3NraWxsX2hpdF9idWZmKHNraWxsQ29uZmlnLCBkZWZlbnNlSGVybywgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBza2lsbENvbmZpZy5wcmVwYXJlX3NraWxsX2FuaW1fdGltZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SGVyby5wbGF5X3NwaW5lX2FuaW0oXCJzdGF5XCIsIGF0dGFja0FuZ2xlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2tpbGxDb25maWcucHJlcGFyZV9za2lsbF9hbmltX3RpbWUgPj0gZGVmZW5zZURhdGEucmVhbF9hdHRhY2tfaW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNjLmVycm9yKFwi6Iux6ZuE55qE5pS75Ye75Yqo55S75pe26Ze05LiN6IO95aSn5LqO5pS75Ye76Ze06ZqUXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoXCJUaOG7nWkgZ2lhbiBob+G6oXQg4bqjbmggdOG6pW4gY8O0bmcgY+G7p2EgYW5oIGjDuW5nIGtow7RuZyB0aOG7gyBkw6BpIGjGoW4ga2hv4bqjbmcgdGjhu51pIGdpYW4gdOG6pW4gY8O0bmcuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVuc2VIZXJvLnBsYXlfYXR0YWNrX2F1ZGlvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVuc2VIZXJvLnBsYXlfc3BpbmVfYW5pbShcImF0dGFja1wiLCBhdHRhY2tBbmdsZSwgZmFsc2UsIGRlZmVuc2VEYXRhLmZseV93ZWFwb25fdGltZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZmVuc2VEYXRhLmF0dGFja190eXBlID09IEF0dGFja1R5cGUuUkVNT1RFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZW5zZUhlcm8ucGxheV93ZWFwb25fZmx5X2FuaW0oaGVyb05vZGUsIGF0dGFja0FuZ2xlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmZW5zZV9oZXJvX2F0dGFja19oaXQoZGVmZW5zZUhlcm8sIGRlZmVuc2VEYXRhLCBhdHRhY2tBbmdsZSwgdGFyZ2V0IGFzIEZpZ2h0SGVyb0l0ZW1EYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmVuc2VfaGVyb19hdHRhY2tfaGl0KGRlZmVuc2VIZXJvLCBkZWZlbnNlRGF0YSwgYXR0YWNrQW5nbGUsIHRhcmdldCBhcyBGaWdodEhlcm9JdGVtRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGRlZmVuc2VEYXRhLmF0dGFja19hbmltX3RpbWUsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVuc2VIZXJvLnBsYXlfc3BpbmVfYW5pbShcInN0YXlcIiwgYXR0YWNrQW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWZlbnNlRGF0YS5hdHRhY2tfYW5pbV90aW1lID49IGRlZmVuc2VEYXRhLnJlYWxfYXR0YWNrX2ludGVydmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjYy5lcnJvcihcIumYsuWuiOiLsembhOeahOaUu+WHu+WKqOeUu+aXtumXtOS4jeiDveWkp+S6juaUu+WHu+mXtOmalFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKFwiVGjhu51pIGdpYW4gaG/huqF0IOG6o25oIHThuqVuIGPDtG5nIGPhu6dhIGFuaCBow7luZyBwaMOybmcgdGjhu6cga2jDtG5nIHRo4buDIGTDoGkgaMahbiBraG/huqNuZyB0aOG7nWkgZ2lhbiB04bqlbiBjw7RuZy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiY29udGludWVcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmVycm9yKFwiZGVmZW5zZV9oZXJvX2RhdGEuZmluZF9wYXRoX3RhcmdldCBuZWVkICE9IG51bGxcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmZW5zZURhdGEubW92ZV9wYXRoID0gW107XHJcbiAgICAgICAgICAgIGRlZmVuc2VEYXRhLmZpbmRfcGF0aF90YXJnZXQgPSBudWxsO1xyXG4gICAgICAgICAgICBkZWZlbnNlRGF0YS5maWdodF9zdGF0ZSA9IEhlcm9GaWdodFN0YXRlLldBSVRJTkc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlX2RlZmVuc2VfaGVyb19hY3Rpb24oKTogYW55IHtcclxuICAgICAgICBjb25zdCBkZWZlbnNlSGVyb0FyciA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmRlZmVuc2VfaGVyb19hcnJheTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZGVmZW5zZUhlcm9BcnIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlcm9BY3QgPSB0aGlzLnByb2Nlc3NIZXJvQWN0aW9uKGluZGV4KTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBoZXJvQWN0ID09PSBcIm9iamVjdFwiICYmIGhlcm9BY3QgIT0gdW5kZWZpbmVkICYmIFwidmFsdWVcIiBpbiBoZXJvQWN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaGVyb0FjdC52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlZmVuc2VfaGVyb19tb3ZlX29uZV9ncmlkX2FjdGlvbihoZXJvRGF0YTogRmlnaHRIZXJvSXRlbURhdGEpIHtcclxuICAgICAgICBjb25zdCBmaWdodFRlbXBEYXRhID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGE7XHJcbiAgICAgICAgY29uc3QgY3VycmVudEdyaWRJdGVtID0gZmlnaHRUZW1wRGF0YS5nZXRfZmlnaHRfbWFwX2l0ZW0oaGVyb0RhdGEuZ3JpZF9wb3NpdGlvbi54LCBoZXJvRGF0YS5ncmlkX3Bvc2l0aW9uLnkpO1xyXG4gICAgICAgIGlmIChjdXJyZW50R3JpZEl0ZW0gJiYgY3VycmVudEdyaWRJdGVtLmRhdGEpIHtcclxuICAgICAgICAgICAgY29uc3QgZ3JpZEl0ZW1EYXRhID0gY3VycmVudEdyaWRJdGVtLmRhdGEuYWRkX2RlZmVuc2VfaGVyb19pbmRleChoZXJvRGF0YS5hcnJheV9pbmRleCk7XHJcbiAgICAgICAgICAgIGhlcm9EYXRhLm9mZnNldCA9IGdyaWRJdGVtRGF0YS5vZmZzZXQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldEl0ZW0gPSBoZXJvRGF0YS5maW5kX3BhdGhfdGFyZ2V0O1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0SXRlbSBpbnN0YW5jZW9mIEZpZ2h0SGVyb0l0ZW1EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRQb3NpdGlvbiA9IGZpZ2h0VGVtcERhdGEuZ2V0X2ZpZ2h0X21hcF9pdGVtKHRhcmdldEl0ZW0uZ3JpZF9wb3NpdGlvbi54LCB0YXJnZXRJdGVtLmdyaWRfcG9zaXRpb24ueSkubm9kZS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlVG9UYXJnZXQgPSB0YXJnZXRQb3NpdGlvbi5zdWIoY3VycmVudEdyaWRJdGVtLm5vZGUucG9zaXRpb24pLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlVG9UYXJnZXQgPD0gaGVyb0RhdGEuYXR0YWNrX3JhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0RhdGEuZmlnaHRfc3RhdGUgPSBIZXJvRmlnaHRTdGF0ZS5BVFRBQ0tJTkc7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0RhdGEubW92ZV9wYXRoID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkZWZlbnNlX2hlcm9fYXR0YWNrX2hpdChhdHRhY2tlcjogRmlnaHRIZXJvSXRlbSwgYXR0YWNrRGF0YTogRmlnaHRIZXJvSXRlbURhdGEsIGF0dGFja0FuZ2xlOiBudW1iZXIsIHRhcmdldERhdGE6IEZpZ2h0SGVyb0l0ZW1EYXRhKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZmlnaHRUZW1wRGF0YSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldEhlcm8gPSBmaWdodFRlbXBEYXRhLmhlcm9faXRlbV9hcnJheVt0YXJnZXREYXRhLmFycmF5X2luZGV4XTtcclxuICAgICAgICBpZiAodGFyZ2V0SGVybykge1xyXG4gICAgICAgICAgICB0YXJnZXRIZXJvLmNoYW5nZV9ocCgtYXR0YWNrRGF0YS5yZWFsX2F0dGFja192YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGFyZ2V0RGF0YS5maW5kX3BhdGhfdGFyZ2V0IGluc3RhbmNlb2YgRmlnaHRCdWlsZGluZ0l0ZW1EYXRhICYmXHJcbiAgICAgICAgICAgICAgICB0YXJnZXREYXRhLmZpbmRfcGF0aF90YXJnZXQuaHAgLyB0YXJnZXREYXRhLmZpbmRfcGF0aF90YXJnZXQubWF4X2hwID49IDAuNDUgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZF9uZXh0X3BhdGhfZGlzdGFuY2UodGFyZ2V0RGF0YS5ncmlkX3Bvc2l0aW9uLCBhdHRhY2tEYXRhLmdyaWRfcG9zaXRpb24pICE9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kX25leHRfcGF0aCh0YXJnZXREYXRhLCBhdHRhY2tEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGhpdEFuaW1hdGlvbk5hbWUgPSBcImhpdFwiO1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvQ29uZmlnRGF0YSA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJIZXJvQ29uZmlnRGF0YVwiLCBhdHRhY2tEYXRhLmlkLnRvU3RyaW5nKCkpIGFzIEhlcm9Db25maWc7XHJcbiAgICAgICAgICAgIGlmIChoZXJvQ29uZmlnRGF0YSAmJiBoZXJvQ29uZmlnRGF0YS5oaXRfbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgaGl0QW5pbWF0aW9uTmFtZSA9IGhlcm9Db25maWdEYXRhLmhpdF9uYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRhcmdldEhlcm8ucGxheV9oaXRfYW5pbSh0YXJnZXRIZXJvLm5vZGUsIGhpdEFuaW1hdGlvbk5hbWUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRhcmdldERhdGEuaHAgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgYXR0YWNrZXIucGxheV9zcGluZV9hbmltKFwic3RheVwiLCBhdHRhY2tBbmdsZSk7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRIZXJvLnB1dF90b19wb29sKCk7XHJcbiAgICAgICAgICAgICAgICBmaWdodFRlbXBEYXRhLmRlYXRoX2hlcm9fY291bnQrKztcclxuICAgICAgICAgICAgICAgIGF0dGFja0RhdGEubW92ZV9wYXRoID0gW107XHJcbiAgICAgICAgICAgICAgICBhdHRhY2tEYXRhLmZpbmRfcGF0aF90YXJnZXQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgYXR0YWNrRGF0YS5maWdodF9zdGF0ZSA9IEhlcm9GaWdodFN0YXRlLldBSVRJTkc7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGZpZ2h0VGVtcERhdGEuZGVhdGhfaGVyb19jb3VudCA+PSBmaWdodFRlbXBEYXRhLmhlcm9fZGF0YV9hcnJheS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0X3Jldml2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVfYnVpbGRpbmdfYWN0aW9uKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGZpZ2h0VGVtcERhdGEgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZmlnaHRUZW1wRGF0YS5idWlsZGluZ19kYXRhX2FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBjb25zdCBidWlsZGluZ0l0ZW0gPSBmaWdodFRlbXBEYXRhLmJ1aWxkaW5nX2l0ZW1fYXJyYXlbaW5kZXhdO1xyXG4gICAgICAgICAgICBjb25zdCBidWlsZGluZ0RhdGEgPSBmaWdodFRlbXBEYXRhLmJ1aWxkaW5nX2RhdGFfYXJyYXlbaW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgaWYgKGJ1aWxkaW5nSXRlbSAmJiBidWlsZGluZ0RhdGEgJiYgYnVpbGRpbmdEYXRhLmF0dGFja192YWx1ZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQ6IEZpZ2h0SGVyb0l0ZW1EYXRhIHwgbnVsbCA9IGJ1aWxkaW5nRGF0YS5sb2NrX2F0dGFja190YXJnZXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldEhlcm8gPSBmaWdodFRlbXBEYXRhLmhlcm9faXRlbV9hcnJheVt0YXJnZXQuYXJyYXlfaW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0SGVybykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRHcmlkUG9zaXRpb24gPSBmaWdodFRlbXBEYXRhLmdyaWRfcG9zaXRpb25fdG9fcG9zaXRpb24oY2MudjIodGFyZ2V0LmdyaWRfcG9zaXRpb24ueCwgdGFyZ2V0LmdyaWRfcG9zaXRpb24ueSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBidWlsZGluZ0dyaWRQb3NpdGlvbiA9IGZpZ2h0VGVtcERhdGEuZ3JpZF9wb3NpdGlvbl90b19wb3NpdGlvbihjYy52MihidWlsZGluZ0RhdGEuZ3JpZF9wb3NpdGlvbi54LCBidWlsZGluZ0RhdGEuZ3JpZF9wb3NpdGlvbi55KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpcmVjdGlvblZlY3RvciA9IHRhcmdldEdyaWRQb3NpdGlvbi5zdWIoYnVpbGRpbmdHcmlkUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhdHRhY2tBbmdsZSA9IE1hdGguYXRhbjIoZGlyZWN0aW9uVmVjdG9yLnksIGRpcmVjdGlvblZlY3Rvci54KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb25WZWN0b3IubWFnKCkgPCBidWlsZGluZ0RhdGEuYXR0YWNrX3JhbmdlICYmIHRhcmdldC5ocCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidWlsZGluZ0RhdGEubGFzdF9hdHRhY2tfdGltZSA9PSAwIHx8IGZpZ2h0VGVtcERhdGEudG90YWxfdGltZSAtIGJ1aWxkaW5nRGF0YS5sYXN0X2F0dGFja190aW1lID4gYnVpbGRpbmdEYXRhLmF0dGFja19pbnRlcnZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidWlsZGluZ0RhdGEuYXR0YWNrX3R5cGUgPT0gQXR0YWNrVHlwZS5SRU1PVEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRpbmdJdGVtLnBsYXlfd2VhcG9uX2ZseV9hbmltKHRhcmdldEhlcm8ubm9kZSwgYXR0YWNrQW5nbGUsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRpbmdfYXR0YWNrX2hpdChidWlsZGluZ0RhdGEsIHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZGluZ0RhdGEubGFzdF9hdHRhY2tfdGltZSA9IGZpZ2h0VGVtcERhdGEudG90YWxfdGltZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkaW5nRGF0YS5sb2NrX2F0dGFja190YXJnZXQgPSB0aGlzLmZpbmRfYnVpbGRpbmdfYXR0YWNrX3RhcmdldChidWlsZGluZ0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRpbmdEYXRhLmxvY2tfYXR0YWNrX3RhcmdldCA9IHRoaXMuZmluZF9idWlsZGluZ19hdHRhY2tfdGFyZ2V0KGJ1aWxkaW5nRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZGluZ0RhdGEubG9ja19hdHRhY2tfdGFyZ2V0ID0gdGhpcy5maW5kX2J1aWxkaW5nX2F0dGFja190YXJnZXQoYnVpbGRpbmdEYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ1aWxkaW5nX2F0dGFja19oaXQoYnVpbGRpbmdEYXRhOiBGaWdodEJ1aWxkaW5nSXRlbURhdGEsIHRhcmdldEhlcm9EYXRhOiBGaWdodEhlcm9JdGVtRGF0YSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGZpZ2h0VGVtcERhdGE6IEZpZ2h0VGVtcERhdGEgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YTtcclxuICAgICAgICBjb25zdCB0YXJnZXRIZXJvSXRlbSA9IGZpZ2h0VGVtcERhdGEuaGVyb19pdGVtX2FycmF5W3RhcmdldEhlcm9EYXRhLmFycmF5X2luZGV4XTtcclxuICAgICAgICBpZiAoIXRhcmdldEhlcm9JdGVtKSByZXR1cm47XHJcbiAgICAgICAgdGFyZ2V0SGVyb0l0ZW0uY2hhbmdlX2hwKC1idWlsZGluZ0RhdGEuYXR0YWNrX3ZhbHVlKTtcclxuICAgICAgICB0YXJnZXRIZXJvSXRlbS5wbGF5X2hpdF9hbmltKHRhcmdldEhlcm9JdGVtLm5vZGUpO1xyXG5cclxuICAgICAgICBpZiAodGFyZ2V0SGVyb0RhdGEuaHAgPD0gMCkge1xyXG4gICAgICAgICAgICB0YXJnZXRIZXJvSXRlbS5wdXRfdG9fcG9vbCgpO1xyXG4gICAgICAgICAgICBmaWdodFRlbXBEYXRhLmRlYXRoX2hlcm9fY291bnQrKztcclxuXHJcbiAgICAgICAgICAgIGlmIChmaWdodFRlbXBEYXRhLmRlYXRoX2hlcm9fY291bnQgPj0gZmlnaHRUZW1wRGF0YS5oZXJvX2RhdGFfYXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0X3Jldml2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVfd2FsbF9hY3Rpb24oKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZmlnaHRUZW1wRGF0YTogRmlnaHRUZW1wRGF0YSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlnaHRUZW1wRGF0YS53YWxsX2RhdGFfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgd2FsbEl0ZW0gPSBmaWdodFRlbXBEYXRhLndhbGxfaXRlbV9hcnJheVtpXTtcclxuICAgICAgICAgICAgY29uc3Qgd2FsbERhdGE6IEZpZ2h0V2FsbEl0ZW1EYXRhID0gZmlnaHRUZW1wRGF0YS53YWxsX2RhdGFfYXJyYXlbaV1cclxuICAgICAgICAgICAgaWYgKHdhbGxJdGVtICYmIHdhbGxEYXRhICYmIHdhbGxEYXRhLmF0dGFja192YWx1ZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHdhbGxJdGVtLmRhdGEgPSB3YWxsRGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBhdHRhY2tUYXJnZXQgPSB3YWxsRGF0YS5sb2NrX2F0dGFja190YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXR0YWNrVGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0SGVyb0l0ZW0gPSBmaWdodFRlbXBEYXRhLmhlcm9faXRlbV9hcnJheVthdHRhY2tUYXJnZXQuYXJyYXlfaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRIZXJvSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRQb3MgPSBmaWdodFRlbXBEYXRhLmdyaWRfcG9zaXRpb25fdG9fcG9zaXRpb24oY2MudjIoYXR0YWNrVGFyZ2V0LmdyaWRfcG9zaXRpb24ueCwgYXR0YWNrVGFyZ2V0LmdyaWRfcG9zaXRpb24ueSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3YWxsUG9zID0gd2FsbEl0ZW0ubm9kZS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlyZWN0aW9uVmVjdG9yID0gdGFyZ2V0UG9zLnN1Yih3YWxsUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5nbGUgPSBNYXRoLmF0YW4yKGRpcmVjdGlvblZlY3Rvci55LCBkaXJlY3Rpb25WZWN0b3IueCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uVmVjdG9yLm1hZygpIDwgd2FsbERhdGEuYXR0YWNrX3JhbmdlICYmIGF0dGFja1RhcmdldC5ocCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3YWxsRGF0YS5sYXN0X2F0dGFja190aW1lID09IDAgfHwgKGZpZ2h0VGVtcERhdGEudG90YWxfdGltZSAtIHdhbGxEYXRhLmxhc3RfYXR0YWNrX3RpbWUgPiB3YWxsRGF0YS5hdHRhY2tfaW50ZXJ2YWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsbERhdGEubGFzdF9hdHRhY2tfdGltZSA9IGZpZ2h0VGVtcERhdGEudG90YWxfdGltZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxsSXRlbS5wbGF5X2F0dGFja19hdWRpbygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhbGxJdGVtLnBsYXlfc3BpbmVfYW5pbShhbmdsZSwgd2FsbERhdGEuZmx5X3dlYXBvbl90aW1lLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3YWxsRGF0YS5hdHRhY2tfdHlwZSA9PSBBdHRhY2tUeXBlLlJFTU9URSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsbEl0ZW0ucGxheV93ZWFwb25fZmx5X2FuaW0odGFyZ2V0SGVyb0l0ZW0ubm9kZSwgYW5nbGUsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxfYXR0YWNrX2hpdCh3YWxsRGF0YSwgYXR0YWNrVGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsX2F0dGFja19oaXQod2FsbERhdGEsIGF0dGFja1RhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhbGxEYXRhLmxvY2tfYXR0YWNrX3RhcmdldCA9IHRoaXMuZmluZF9idWlsZGluZ19hdHRhY2tfdGFyZ2V0KHdhbGxEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2FsbERhdGEubG9ja19hdHRhY2tfdGFyZ2V0ID0gdGhpcy5maW5kX2J1aWxkaW5nX2F0dGFja190YXJnZXQod2FsbERhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHdhbGxfYXR0YWNrX2hpdCh3YWxsRGF0YTogRmlnaHRXYWxsSXRlbURhdGEsIHRhcmdldEhlcm9EYXRhOiBGaWdodEhlcm9JdGVtRGF0YSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGZpZ2h0VGVtcERhdGE6IEZpZ2h0VGVtcERhdGEgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YTtcclxuICAgICAgICBjb25zdCB0YXJnZXRIZXJvID0gZmlnaHRUZW1wRGF0YS5oZXJvX2l0ZW1fYXJyYXlbdGFyZ2V0SGVyb0RhdGEuYXJyYXlfaW5kZXhdO1xyXG5cclxuICAgICAgICBpZiAodGFyZ2V0SGVybykge1xyXG4gICAgICAgICAgICBjb25zdCBza2lsbENvbmZpZyA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJTa2lsbENvbmZpZ0RhdGFcIiwgYCR7d2FsbERhdGEuc2tpbGxfaWR9YCwgYCR7d2FsbERhdGEuc2tpbGxfbHZ9YCkgYXMgU2tpbGxDb25maWc7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbW9uX2hlcm9fc2tpbGxfaGl0X2J1ZmYoc2tpbGxDb25maWcsIG51bGwsIHRhcmdldEhlcm8sIHRhcmdldEhlcm8uZGF0YS5ncmlkX3Bvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIHRhcmdldEhlcm8uY2hhbmdlX2hwKC13YWxsRGF0YS5yZWFsX2F0dGFja192YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgaGl0QW5pbWF0aW9uID0gXCJoaXRcIjtcclxuICAgICAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJIZXJvQ29uZmlnRGF0YVwiLCBgJHt3YWxsRGF0YS5pZH1gKSBhcyBIZXJvQ29uZmlnO1xyXG4gICAgICAgICAgICBpZiAoaGVyb0NvbmZpZyAmJiBoZXJvQ29uZmlnLmhpdF9uYW1lICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGhpdEFuaW1hdGlvbiA9IGhlcm9Db25maWcuaGl0X25hbWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRhcmdldEhlcm8ucGxheV9oaXRfYW5pbSh0YXJnZXRIZXJvLm5vZGUsIGhpdEFuaW1hdGlvbik7XHJcblxyXG4gICAgICAgICAgICBpZiAodGFyZ2V0SGVyb0RhdGEuaHAgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0SGVyby5wdXRfdG9fcG9vbCgpO1xyXG4gICAgICAgICAgICAgICAgZmlnaHRUZW1wRGF0YS5kZWF0aF9oZXJvX2NvdW50Kys7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGZpZ2h0VGVtcERhdGEuZGVhdGhfaGVyb19jb3VudCA+PSBmaWdodFRlbXBEYXRhLmhlcm9fZGF0YV9hcnJheS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0X3Jldml2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVfYnVmZl9hY3Rpb24oKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZmlnaHRUZW1wRGF0YTogRmlnaHRUZW1wRGF0YSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpZ2h0VGVtcERhdGEuaGVyb19pdGVtX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlcm8gPSBmaWdodFRlbXBEYXRhLmhlcm9faXRlbV9hcnJheVtpXTtcclxuICAgICAgICAgICAgaWYgKGhlcm8pIHtcclxuICAgICAgICAgICAgICAgIGhlcm8uY2hlY2tfaGVyb19idWZmKGZpZ2h0VGVtcERhdGEudG90YWxfdGltZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlnaHRUZW1wRGF0YS5kZWZlbnNlX2hlcm9fYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgZGVmZW5zZUhlcm8gPSBmaWdodFRlbXBEYXRhLmRlZmVuc2VfaGVyb19hcnJheVtpXTtcclxuICAgICAgICAgICAgaWYgKGRlZmVuc2VIZXJvKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlbnNlSGVyby5jaGVja19oZXJvX2J1ZmYoZmlnaHRUZW1wRGF0YS50b3RhbF90aW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZV92aWV3KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGZpZ2h0VGVtcERhdGE6IEZpZ2h0VGVtcERhdGEgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YTtcclxuICAgICAgICBjb25zdCBmaWdodERhdGE6IEZpZ2h0RGF0YSA9IGdtLmRhdGEuZmlnaHRfZGF0YTtcclxuICAgICAgICBjb25zdCBtYXBDZWxsRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhO1xyXG5cclxuICAgICAgICB0aGlzLm5hbWVfbGJsLnN0cmluZyA9IGZpZ2h0VGVtcERhdGEubmFtZTtcclxuXHJcbiAgICAgICAgdGhpcy5oZXJvX2xpc3Quc2V0RGF0YShmaWdodFRlbXBEYXRhLmhlcm9fZGF0YV9hcnJheSk7XHJcblxyXG4gICAgICAgIHRoaXMuc3BlZWRfMV9idG4ubm9kZS5hY3RpdmUgPSBmaWdodERhdGEuc3BlZWRfc2NhbGUgPT0gZ20uY29uc3QuRklHSFRfU1BFRURfWDEgJiYgIW1hcENlbGxEYXRhLmlzR3VpZGU7XHJcbiAgICAgICAgdGhpcy5zcGVlZF8yX2J0bi5ub2RlLmFjdGl2ZSA9IGZpZ2h0RGF0YS5zcGVlZF9zY2FsZSA9PSBnbS5jb25zdC5GSUdIVF9TUEVFRF9YMiAmJiAhbWFwQ2VsbERhdGEuaXNHdWlkZTtcclxuXHJcbiAgICAgICAgdGhpcy5sZWZ0X3NlY19sYmwuc3RyaW5nID0gVXRpbHMudGltZV9mb3JtYXQoZmlnaHRUZW1wRGF0YS5sZWZ0X2ZpZ2h0X3RpbWUsIFwibW06c3NcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IHNob3VsZFNob3dSZXR1cm5CdG4gPSAhbWFwQ2VsbERhdGEuaXNHdWlkZSAmJiBmaWdodFRlbXBEYXRhLnNob3dfcmV0dXJuX2J0bl90aW1lc3RhbXAgPiAwICYmIERhdGUubm93KCkgPiBmaWdodFRlbXBEYXRhLnNob3dfcmV0dXJuX2J0bl90aW1lc3RhbXA7XHJcbiAgICAgICAgdGhpcy5yZXR1cm5fYnRuLm5vZGUuYWN0aXZlID0gc2hvdWxkU2hvd1JldHVybkJ0bjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpZ2h0X3N0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGZpZ2h0RGF0YTogRmlnaHREYXRhID0gZ20uZGF0YS5maWdodF9kYXRhO1xyXG4gICAgICAgIGNvbnN0IGZpZ2h0VGVtcERhdGE6IEZpZ2h0VGVtcERhdGEgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YTtcclxuXHJcbiAgICAgICAgZmlnaHREYXRhLmZpZ2h0X2NvdW50Kys7XHJcbiAgICAgICAgZmlnaHREYXRhLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuXHJcbiAgICAgICAgY29uc3QgaGVyb0RhdGEgPSBmaWdodFRlbXBEYXRhLmhlcm9fZGF0YV9hcnJheVswXTtcclxuICAgICAgICBoZXJvRGF0YS5pbl9iYXR0bGVfc3RhdGUgPSBIZXJvSW5CYXR0bGVTdGF0ZS5XSUxMX0lOX0JBVFRMRTtcclxuICAgICAgICBmaWdodFRlbXBEYXRhLmluX2JhdHRsZV9oZXJvX2RhdGEgPSBoZXJvRGF0YTtcclxuXHJcbiAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLmVtaXQoXCJmaWdodF9pbl9iYXR0bGVcIiwgaGVyb0RhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLnJld2FyZF9saXN0LnNldERhdGEoZmlnaHRUZW1wRGF0YS5yZXdhcmRfZGF0YV9hcnJheSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NoZWR1bGVyKCkuc2V0VGltZVNjYWxlKGZpZ2h0RGF0YS5zcGVlZF9zY2FsZSk7XHJcbiAgICAgICAgICAgIGdtLmF1ZGlvLnBsYXlfZWZmZWN0KGdtLmNvbnN0LkFVRElPXzE4X0ZJR0hUX1RJTUUpO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChmaWdodFRlbXBEYXRhLnBsYXlfdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIGdtLmF1ZGlvLnBsYXlfbXVzaWMoZ20uY29uc3QuQVVESU9fOTNfRklHSFRfTVVTSUMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIGdtLmF1ZGlvLnBsYXlfbXVzaWMoZ20uY29uc3QuQVVESU9fOTZfSVNMQU5EX01VU0lDKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBnbS5hdWRpby5wbGF5X211c2ljKGdtLmNvbnN0LkFVRElPXzk1X0NBVkVTX01VU0lDKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGZpZ2h0VGVtcERhdGEucGxheV90eXBlID09IDAgfHwgZmlnaHRUZW1wRGF0YS5wbGF5X3R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib2F0X25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9hdF9ub2RlLnBvc2l0aW9uID0gZmlnaHRUZW1wRGF0YS5ib2F0X3N0YXJ0X3Bvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmJvYXRfc3ByLCBCdW5kbGVOYW1lLk1BUCwgXCJyZXMvYnVpbGQvXCIgKyBmaWdodFRlbXBEYXRhLmJvYXRfaWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib2F0X2FuaW0ub25jZShjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2F0X2FuaW0ucGxheShcInNoaXBfbm9ybWFsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZ2h0VGVtcERhdGEuZmlnaHRfc3RhdGUgPSBGaWdodFN0YXRlLlJVTjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5X3Bhc3NpdmVfc2tpbGxfZWZmZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9hdF9hbmltLnBsYXkoXCJzaGlwX2luXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib2F0X25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBmaWdodFRlbXBEYXRhLmZpZ2h0X3N0YXRlID0gRmlnaHRTdGF0ZS5SVU47XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5X3Bhc3NpdmVfc2tpbGxfZWZmZWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChnbS5kYXRhLnJlY29yZF9kYXRhLnJlY29yZF9zdGF0ZSAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICBnbS5jaGFubmVsLnJlY29yZF9zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5yZWNvcmRfZGF0YS5yZWNvcmRfc3RhdGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5yZWNvcmRfZGF0YS5yZWNvcmRfdHlwZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLnJlY29yZF9kYXRhLnJlY29yZF90aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLmVtaXQoUmVjb3JkRGF0YS5SRUNPUkRfU1RBVEVfQ0hBTkdFKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmlnaHRfc3VjY2VzcygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBmaWdodFRlbXBEYXRhOiBGaWdodFRlbXBEYXRhID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGE7XHJcbiAgICAgICAgaWYgKGZpZ2h0VGVtcERhdGEucGxheV90eXBlIDw9IDEpIHtcclxuICAgICAgICAgICAgZ20uZGF0YS5sYWRkZXJfZGF0YS5mYWlsX2NvdW50ID0gMDtcclxuICAgICAgICAgICAgZ20uZGF0YS5sYWRkZXJfZGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChmaWdodFRlbXBEYXRhLnBsYXlfdHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIGdtLmNoYW5uZWwucmVwb3J0X2V2ZW50KFwiY2F2ZV9sYXllclwiLCB7XHJcbiAgICAgICAgICAgICAgICBldmVudF9kZXNjOiBjYy5qcy5mb3JtYXRTdHIoXCLmtJ7nqp/ov4flhbMlZOWxguS6uuaVsFwiLCBnbS5kYXRhLmZpZ2h0X2RhdGEuY2F2ZXNfbGF5ZXIpLFxyXG4gICAgICAgICAgICAgICAgZGVzYzogY2MuanMuZm9ybWF0U3RyKFwi5rSe56qf6YCa5YWz56ysJWTlsYLkurrmlbBcIiwgZ20uZGF0YS5maWdodF9kYXRhLmNhdmVzX2xheWVyKSxcclxuICAgICAgICAgICAgICAgIGxheWVyOiBnbS5kYXRhLmZpZ2h0X2RhdGEuY2F2ZXNfbGF5ZXJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdtLmRhdGEuZmlnaHRfZGF0YS5jYXZlc19sYXllcisrO1xyXG4gICAgICAgICAgICBnbS5kYXRhLmZpZ2h0X2RhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmlnaHRUZW1wRGF0YS5maWdodF9zdGF0ZSA9IEZpZ2h0U3RhdGUuU1VDQ0VTUztcclxuICAgICAgICBjb25zdCB0aW1lU2NhbGVTdWZmaXggPSBjYy5kaXJlY3Rvci5nZXRTY2hlZHVsZXIoKS5nZXRUaW1lU2NhbGUoKSA9PSBnbS5jb25zdC5GSUdIVF9TUEVFRF9YMiA/IFwiX3gyXCIgOiBcIlwiO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBmaWdodFRlbXBEYXRhLmhlcm9faXRlbV9hcnJheS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvSXRlbSA9IGZpZ2h0VGVtcERhdGEuaGVyb19pdGVtX2FycmF5W2ldO1xyXG4gICAgICAgICAgICBpZiAoaGVyb0l0ZW0gJiYgaGVyb0l0ZW0uZGF0YSAmJiBoZXJvSXRlbS5kYXRhLmlkID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJIZXJvQ29uZmlnRGF0YVwiLCBoZXJvSXRlbS5kYXRhLmlkLnRvU3RyaW5nKCkpIGFzIEhlcm9Db25maWc7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGVyb0NvbmZpZz8uc3VjY2Vzc19hdWRpbykge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmF1ZGlvLnBsYXlfZWZmZWN0KGhlcm9Db25maWcuc3VjY2Vzc19hdWRpbyArIHRpbWVTY2FsZVN1ZmZpeCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdtLmF1ZGlvLnBsYXlfZWZmZWN0KGdtLmNvbnN0LkFVRElPXzIxX0ZJR0hUX1NVQ0NFU1MpO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpLnNldFRpbWVTY2FsZShnbS5jb25zdC5GSUdIVF9TUEVFRF9YMSk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBmaWdodFRlbXBEYXRhLmhlcm9faXRlbV9hcnJheS5mb3JFYWNoKChoZXJvSXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fanVtcF90b19ib2F0KGhlcm9JdGVtKTtcclxuICAgICAgICAgICAgICAgIH0sIDAuMDUgKiBpbmRleCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIDAuNSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgZmlnaHRUZW1wRGF0YS5idWlsZF9maWdodF9yZXN1bHRfZGF0YSgpO1xyXG4gICAgICAgICAgICB0aGlzLmZpZ2h0X2NsZWFyKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZ20uZGF0YS5maWdodF90ZW1wX2RhdGEucGxheV90eXBlID09IDApIHtcclxuICAgICAgICAgICAgICAgIGdtLmNoYW5uZWwucmVwb3J0X2V2ZW50KFwiZmlnaHRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50X2Rlc2M6IFwi56qB6KKtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzYzogXCLmiJDlip9cIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwODIzKTtcclxuICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwODI0KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5wbGF5X3R5cGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgZ20uY2hhbm5lbC5yZXBvcnRfZXZlbnQoXCJhdHRhY2tfY2F2ZXNcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50X2Rlc2M6IFwi5pS75omT5rSe56qfXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXI6IGdtLmRhdGEuZmlnaHRfZGF0YS5jYXZlc19sYXllcixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjOiBjYy5qcy5mb3JtYXRTdHIoXCLpgJrlhbPmtJ7nqp8lZOWxglwiLCBnbS5kYXRhLmZpZ2h0X2RhdGEuY2F2ZXNfbGF5ZXIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTA5MDAgKyBnbS5kYXRhLmZpZ2h0X2RhdGEuY2F2ZXNfbGF5ZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBO4bq/dSDEkWFuZyBoxrDhu5tuZyBk4bqrbiwgZ+G7rWkgc+G7sSBraeG7h24gYsOhbyBjw6FvIGjGsOG7m25nIGThuqtuXHJcbiAgICAgICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5pc0d1aWRlKSB7XHJcbiAgICAgICAgICAgICAgICBnbS5jaGFubmVsLnJlcG9ydF9ldmVudChcIm9oYXlvb19nYW1lX2d1aWRlXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBndWlkZWlkOiAxNixcclxuICAgICAgICAgICAgICAgICAgICBndWlkZWRlc2M6IGNjLmpzLmZvcm1hdFN0cihcIjE2Lui/m+WFpeaImOaWl+e7k+eul+eVjOmdolwiKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuRmlnaHRSZXN1bHQpO1xyXG4gICAgICAgIH0sIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmlnaHRfcmV2aXZlKGlzUmV2aXZlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZmlnaHRUZW1wRGF0YTogRmlnaHRUZW1wRGF0YSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhO1xyXG4gICAgICAgIGlmICghaXNSZXZpdmUpIHtcclxuICAgICAgICAgICAgZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuZmlnaHRfc3RhdGUgPSBGaWdodFN0YXRlLlJFVklWRTtcclxuICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkZpZ2h0UmV2aXZlSGVyby5rZXksIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiAoY2hvaWNlOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hvaWNlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGZpZ2h0VGVtcERhdGEuaGVyb19pdGVtX2FycmF5Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZXJvSXRlbSA9IGZpZ2h0VGVtcERhdGEuaGVyb19pdGVtX2FycmF5LnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlcm9JdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0l0ZW0ucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5wb29sLnB1dChoZXJvSXRlbS5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGZpZ2h0VGVtcERhdGEucmV3YXJkX2RhdGFfYXJyYXkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJld2FyZCA9IGZpZ2h0VGVtcERhdGEucmV3YXJkX2RhdGFfYXJyYXlbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV3YXJkLmlkID4gMjIwMDAgJiYgcmV3YXJkLmlkIDwgMjMwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodFRlbXBEYXRhLnJld2FyZF9kYXRhX2FycmF5LnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHRUZW1wRGF0YS5nb3RvX2JhdHRsZV9jb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0VGVtcERhdGEuZGVhdGhfaGVyb19jb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0VGVtcERhdGEudG90YWxfdGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0VGVtcERhdGEuaGVyb19kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0VGVtcERhdGEuYnVpbGRfaGVyb19hcnJheSh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0SGVybyA9IGZpZ2h0VGVtcERhdGEuaGVyb19kYXRhX2FycmF5WzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEhlcm8uaW5fYmF0dGxlX3N0YXRlID0gSGVyb0luQmF0dGxlU3RhdGUuV0lMTF9JTl9CQVRUTEU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0VGVtcERhdGEuaW5fYmF0dGxlX2hlcm9fZGF0YSA9IGZpcnN0SGVybztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLmVtaXQoXCJmaWdodF9pbl9iYXR0bGVcIiwgZmlyc3RIZXJvKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlnaHRUZW1wRGF0YS5tYXBfaXRlbV9kYXRhX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXBJdGVtID0gZmlnaHRUZW1wRGF0YS5tYXBfaXRlbV9kYXRhX2FycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hcEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBJdGVtLmhlcm9faW5kZXhfYXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWdodFRlbXBEYXRhLm1hcF9pdGVtX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXBJdGVtID0gZmlnaHRUZW1wRGF0YS5tYXBfaXRlbV9hcnJheVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXBJdGVtICYmIG1hcEl0ZW0uZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcEl0ZW0udXBkYXRlX3ZpZXcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gWOG7rSBsw70gY8OhYyBoZXJvIHBow7JuZyB0aOG7p1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gZmlnaHRUZW1wRGF0YS5kZWZlbnNlX2hlcm9fZGF0YV9hcnJheS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmZW5zZUhlcm8gPSBmaWdodFRlbXBEYXRhLmRlZmVuc2VfaGVyb19kYXRhX2FycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZmVuc2VIZXJvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZW5zZUhlcm8ubGFzdF9hdHRhY2tfdGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZW5zZUhlcm8uZmluZF9wYXRoX3RhcmdldCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZW5zZUhlcm8ubW92ZV9wYXRoID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZW5zZUhlcm8uZmlnaHRfc3RhdGUgPSBIZXJvRmlnaHRTdGF0ZS5XQUlUSU5HO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmZpZ2h0X3N0YXRlID0gRmlnaHRTdGF0ZS5SVU47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZ2h0X2ZhaWwoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBnbS51aS5zaG93X3BhbmVsKGdtLmNvbnN0LkZpZ2h0UmV2aXZlSGVybyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5maWdodF9mYWlsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaWdodF9yZXR1cm4oKTogdm9pZCB7XHJcbiAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDY2Nyk7XHJcbiAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoMTA2NjgpO1xyXG5cclxuICAgICAgICBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5idWlsZF9maWdodF9yZXN1bHRfZGF0YSh0cnVlKTtcclxuICAgICAgICB0aGlzLmZpZ2h0X2NsZWFyKCk7XHJcblxyXG4gICAgICAgIGdtLnVpLnNob3dfc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpZ2h0X2ZhaWwoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZmlnaHRUZW1wRGF0YSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhO1xyXG4gICAgICAgIGNvbnN0IGxhZGRlckRhdGEgPSBnbS5kYXRhLmxhZGRlcl9kYXRhO1xyXG5cclxuICAgICAgICBsYWRkZXJEYXRhLmZhaWxfY291bnQrKztcclxuICAgICAgICBsYWRkZXJEYXRhLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICBnbS5kYXRhLnN0YXJ0X2RhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG5cclxuICAgICAgICBmaWdodFRlbXBEYXRhLmZpZ2h0X3N0YXRlID0gRmlnaHRTdGF0ZS5GQUlMO1xyXG5cclxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2hlZHVsZXIoKS5zZXRUaW1lU2NhbGUoZ20uY29uc3QuRklHSFRfU1BFRURfWDEpO1xyXG5cclxuICAgICAgICBnbS5hdWRpby5wbGF5X2VmZmVjdChnbS5jb25zdC5BVURJT18yMF9GSUdIVF9GQUlMKTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG5cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGZpZ2h0VGVtcERhdGEuYnVpbGRfZmlnaHRfcmVzdWx0X2RhdGEoKTtcclxuICAgICAgICAgICAgdGhpcy5maWdodF9jbGVhcigpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLnBsYXlfdHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBnbS5jaGFubmVsLnJlcG9ydF9ldmVudChcImZpZ2h0XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudF9kZXNjOiBcIueqgeiirVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2M6IFwi5aSx6LSlXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTA4MjUpO1xyXG4gICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoMTA4MjYpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEuaXNHdWlkZSkge1xyXG4gICAgICAgICAgICAgICAgZ20uY2hhbm5lbC5yZXBvcnRfZXZlbnQoXCJvaGF5b29fZ2FtZV9ndWlkZVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3VpZGVpZDogMTYsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3VpZGVkZXNjOiBjYy5qcy5mb3JtYXRTdHIoXCIxNi7ov5vlhaXmiJjmlpfnu5PnrpfnlYzpnaJcIilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnbS51aS5zaG93X3BhbmVsKGdtLmNvbnN0LkZpZ2h0UmVzdWx0KTtcclxuICAgICAgICB9LCAyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpZ2h0X3Jlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZmlnaHRfY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpZ2h0X2NsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGZpZ2h0VGVtcERhdGEgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YTtcclxuXHJcbiAgICAgICAgdGhpcy5oZXJvX2xpc3QucmVzZXQoKTtcclxuICAgICAgICB0aGlzLnJld2FyZF9saXN0LnJlc2V0KCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSBmaWdodFRlbXBEYXRhLmJ1aWxkaW5nX2Rlc3Ryb3lfYXJyYXkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IGZpZ2h0VGVtcERhdGEuYnVpbGRpbmdfZGVzdHJveV9hcnJheS5wb3AoKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KG5vZGUubm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSBmaWdodFRlbXBEYXRhLmhlcm9fZGVhdGhfYXJyYXkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgY29uc3QgaGVybyA9IGZpZ2h0VGVtcERhdGEuaGVyb19kZWF0aF9hcnJheS5wb3AoKTtcclxuICAgICAgICAgICAgaWYgKGhlcm8pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IGhlcm8uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoYW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24uY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KGhlcm8ubm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSBmaWdodFRlbXBEYXRhLnNraWxsX2l0ZW1fYXJyYXkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IGZpZ2h0VGVtcERhdGEuc2tpbGxfaXRlbV9hcnJheS5wb3AoKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KG5vZGUubm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSBmaWdodFRlbXBEYXRhLmhlcm9faXRlbV9hcnJheS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvID0gZmlnaHRUZW1wRGF0YS5oZXJvX2l0ZW1fYXJyYXkucG9wKCk7XHJcbiAgICAgICAgICAgIGlmIChoZXJvKSB7XHJcbiAgICAgICAgICAgICAgICBoZXJvLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICBnbS5wb29sLnB1dChoZXJvLm5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gZmlnaHRUZW1wRGF0YS5kZWZlbnNlX2hlcm9fYXJyYXkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgY29uc3QgZGVmZW5zZUhlcm8gPSBmaWdodFRlbXBEYXRhLmRlZmVuc2VfaGVyb19hcnJheS5wb3AoKTtcclxuICAgICAgICAgICAgaWYgKGRlZmVuc2VIZXJvKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlbnNlSGVyby5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgZ20ucG9vbC5wdXQoZGVmZW5zZUhlcm8ubm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSBmaWdodFRlbXBEYXRhLmJ1aWxkaW5nX2l0ZW1fYXJyYXkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgY29uc3QgYnVpbGRpbmcgPSBmaWdodFRlbXBEYXRhLmJ1aWxkaW5nX2l0ZW1fYXJyYXkucG9wKCk7XHJcbiAgICAgICAgICAgIGlmIChidWlsZGluZykge1xyXG4gICAgICAgICAgICAgICAgYnVpbGRpbmcucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KGJ1aWxkaW5nLm5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gZmlnaHRUZW1wRGF0YS53YWxsX2l0ZW1fYXJyYXkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgY29uc3Qgd2FsbCA9IGZpZ2h0VGVtcERhdGEud2FsbF9pdGVtX2FycmF5LnBvcCgpO1xyXG4gICAgICAgICAgICBpZiAod2FsbCkge1xyXG4gICAgICAgICAgICAgICAgd2FsbC5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgZ20ucG9vbC5wdXQod2FsbC5ub2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGZpZ2h0VGVtcERhdGEucHJvcF9pdGVtX2FycmF5Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb3AgPSBmaWdodFRlbXBEYXRhLnByb3BfaXRlbV9hcnJheS5wb3AoKTtcclxuICAgICAgICAgICAgaWYgKHByb3ApIHtcclxuICAgICAgICAgICAgICAgIHByb3AucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KHByb3Aubm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSBmaWdodFRlbXBEYXRhLmRlY29yYXRpb25faXRlbV9hcnJheS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBjb25zdCBkZWNvcmF0aW9uID0gZmlnaHRUZW1wRGF0YS5kZWNvcmF0aW9uX2l0ZW1fYXJyYXkucG9wKCk7XHJcbiAgICAgICAgICAgIGlmIChkZWNvcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBkZWNvcmF0aW9uLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICBnbS5wb29sLnB1dChkZWNvcmF0aW9uLm5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gZmlnaHRUZW1wRGF0YS5tYXBfaXRlbV9hcnJheS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBjb25zdCBtYXBJdGVtID0gZmlnaHRUZW1wRGF0YS5tYXBfaXRlbV9hcnJheS5wb3AoKTtcclxuICAgICAgICAgICAgaWYgKG1hcEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIG1hcEl0ZW0ucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KG1hcEl0ZW0ubm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdtLnBvb2wucHV0X2NoaWxkcmVuKHRoaXMuZWZmZWN0X25vZGUpO1xyXG4gICAgICAgIGdtLnBvb2wucHV0X2NoaWxkcmVuKHRoaXMudGV4dF9ub2RlKTtcclxuXHJcbiAgICAgICAgZmlnaHRUZW1wRGF0YS5pbl9iYXR0bGVfaGVyb19kYXRhID0gbnVsbDtcclxuICAgICAgICBmaWdodFRlbXBEYXRhLmdvdG9fYmF0dGxlX2NvdW50ID0gMDtcclxuICAgICAgICBmaWdodFRlbXBEYXRhLmRlbHRhX3RpbWUgPSAwO1xyXG4gICAgICAgIGZpZ2h0VGVtcERhdGEudG90YWxfdGltZSA9IDA7XHJcbiAgICAgICAgZmlnaHRUZW1wRGF0YS5zaG93X3JldHVybl9idG5fdGltZXN0YW1wID0gMDtcclxuICAgICAgICBmaWdodFRlbXBEYXRhLmhhc19wb3BfcmV2aXZlID0gZmFsc2U7XHJcbiAgICAgICAgZmlnaHRUZW1wRGF0YS5maWdodF9zdGF0ZSA9IEZpZ2h0U3RhdGUuTk9ORTtcclxuICAgICAgICBmaWdodFRlbXBEYXRhLnJlY29yZF9maWdodF9zdGF0ZSA9IEZpZ2h0U3RhdGUuTk9ORTtcclxuICAgICAgICBmaWdodFRlbXBEYXRhLmRlYXRoX2hlcm9fY291bnQgPSAwO1xyXG4gICAgICAgIGZpZ2h0VGVtcERhdGEuZGVmZW5zZV9oZXJvX2RhdGFfYXJyYXkgPSBbXTtcclxuICAgICAgICBmaWdodFRlbXBEYXRhLnByb3BfZGF0YV9hcnJheSA9IFtdO1xyXG4gICAgICAgIGZpZ2h0VGVtcERhdGEubWFwX2l0ZW1fZGF0YV9hcnJheSA9IFtdO1xyXG4gICAgICAgIGZpZ2h0VGVtcERhdGEuZGVjb3JhdGlvbl9kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgZmlnaHRUZW1wRGF0YS5idWlsZGluZ19kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgZmlnaHRUZW1wRGF0YS5yZXdhcmRfZGF0YV9hcnJheSA9IFtdO1xyXG4gICAgICAgIGZpZ2h0VGVtcERhdGEud2FsbF9kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgZmlnaHRUZW1wRGF0YS5za2lsbF9kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgZmlnaHRUZW1wRGF0YS5idWlsZGluZ19kZXN0cm95X2FycmF5ID0gW107XHJcbiAgICAgICAgZmlnaHRUZW1wRGF0YS5oZXJvX2RlYXRoX2FycmF5ID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuYm9hdF9ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMud2F2ZV9wcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZWRpdG9yX29uX2J1dHRvbl9jbGlja19oYW5kbGVyKGV2ZW50OiBjYy5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5zcGVlZF8xX2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BlZWRfMl9idG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNwZWVkXzFfYnRuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGdtLmRhdGEuZmlnaHRfZGF0YS5zcGVlZF9zY2FsZSA9IGdtLmNvbnN0LkZJR0hUX1NQRUVEX1gyO1xyXG4gICAgICAgICAgICBnbS5kYXRhLmZpZ2h0X2RhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2hlZHVsZXIoKS5zZXRUaW1lU2NhbGUoZ20uZGF0YS5maWdodF9kYXRhLnNwZWVkX3NjYWxlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLnNwZWVkXzJfYnRuLm5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zcGVlZF8yX2J0bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNwZWVkXzFfYnRuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgZ20uZGF0YS5maWdodF9kYXRhLnNwZWVkX3NjYWxlID0gZ20uY29uc3QuRklHSFRfU1BFRURfWDE7XHJcbiAgICAgICAgICAgIGdtLmRhdGEuZmlnaHRfZGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpLnNldFRpbWVTY2FsZShnbS5kYXRhLmZpZ2h0X2RhdGEuc3BlZWRfc2NhbGUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMucmV0dXJuX2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LkZpZ2h0UmV0dXJuKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZseV90b19ib2F0KG5vZGU6IGNjLk5vZGUsIHNob3VsZEluc3RhbnRpYXRlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHNob3VsZEluc3RhbnRpYXRlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsUGFyZW50ID0gbm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgICAgIG5vZGUgPSBjYy5pbnN0YW50aWF0ZShub2RlKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBvcmlnaW5hbFBhcmVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHN0YXJ0V29ybGRQb3NpdGlvbiA9IG5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYzKDAsIDYwKSk7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRMb2NhbFBvc2l0aW9uID0gdGhpcy53aW5kb3dfbm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihzdGFydFdvcmxkUG9zaXRpb24pO1xyXG5cclxuICAgICAgICBub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICBub2RlLnBvc2l0aW9uID0gc3RhcnRMb2NhbFBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMud2luZG93X25vZGUuYWRkQ2hpbGQobm9kZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhcmdldFdvcmxkUG9zaXRpb24gPSB0aGlzLmJvYXRfYm94X25vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTyk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0TG9jYWxQb3NpdGlvbiA9IHRoaXMud2luZG93X25vZGUuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0V29ybGRQb3NpdGlvbik7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0YXJ0UG9pbnQgPSBjYy52MihzdGFydExvY2FsUG9zaXRpb24pO1xyXG4gICAgICAgIGNvbnN0IGVuZFBvaW50ID0gY2MudjIodGFyZ2V0TG9jYWxQb3NpdGlvbik7XHJcbiAgICAgICAgY29uc3QgY29udHJvbFBvaW50MSA9IHN0YXJ0UG9pbnQuYWRkKGVuZFBvaW50LnN1YihzdGFydFBvaW50KS5tdWx0aXBseShjYy52MigwLjE0LCAwLjkpKSk7XHJcbiAgICAgICAgY29uc3QgY29udHJvbFBvaW50MiA9IHN0YXJ0UG9pbnQuYWRkKGVuZFBvaW50LnN1YihzdGFydFBvaW50KS5tdWx0aXBseShjYy52MigwLjUzLCAxLjU0KSkpO1xyXG5cclxuICAgICAgICBjYy50d2Vlbihub2RlKS5wYXJhbGxlbChcclxuICAgICAgICAgICAgY2MudHdlZW4oKS50bygwLjYsIHsgc2NhbGU6IDAuOCB9KSxcclxuICAgICAgICAgICAgY2MudHdlZW4oKS5iZXppZXJUbygwLjYsIGNvbnRyb2xQb2ludDEsIGNvbnRyb2xQb2ludDIsIGVuZFBvaW50KVxyXG4gICAgICAgICkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGVQb29sSXRlbSA9IG5vZGUuZ2V0Q29tcG9uZW50KE5vZGVQb29sSXRlbSk7XHJcbiAgICAgICAgICAgIGlmIChub2RlUG9vbEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KG5vZGVQb29sSXRlbS5ub2RlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRnJvbVBhcmVudCgpXHJcbiAgICAgICAgICAgICAgICBub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoZXJvX2p1bXBfdG9fYm9hdChoZXJvOiBGaWdodEhlcm9JdGVtKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGhlcm8pIHtcclxuICAgICAgICAgICAgY29uc3QgaGVyb05vZGUgPSBoZXJvLm5vZGU7XHJcbiAgICAgICAgICAgIGNvbnN0IHdvcmxkU3RhcnRQb3NpdGlvbiA9IGhlcm9Ob2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MygwLCA2MCkpO1xyXG4gICAgICAgICAgICBjb25zdCBsb2NhbFN0YXJ0UG9zaXRpb24gPSB0aGlzLndpbmRvd19ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkU3RhcnRQb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICBoZXJvTm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgIGhlcm9Ob2RlLnBvc2l0aW9uID0gbG9jYWxTdGFydFBvc2l0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLndpbmRvd19ub2RlLmFkZENoaWxkKGhlcm9Ob2RlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHdvcmxkQm9hdFBvc2l0aW9uID0gdGhpcy5ib2F0X25vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsQm9hdFBvc2l0aW9uID0gdGhpcy53aW5kb3dfbm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZEJvYXRQb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdGFydFBvaW50ID0gY2MudjIobG9jYWxTdGFydFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgY29uc3QgZW5kUG9pbnQgPSBjYy52Mihsb2NhbEJvYXRQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xQb2ludDEgPSBzdGFydFBvaW50LmFkZChlbmRQb2ludC5zdWIoc3RhcnRQb2ludCkubXVsdGlwbHkoY2MudjIoMC4xNCwgMC45KSkpO1xyXG4gICAgICAgICAgICBjb25zdCBjb250cm9sUG9pbnQyID0gc3RhcnRQb2ludC5hZGQoZW5kUG9pbnQuc3ViKHN0YXJ0UG9pbnQpLm11bHRpcGx5KGNjLnYyKDAuNTMsIDEuNTQpKSk7XHJcblxyXG4gICAgICAgICAgICBjYy50d2VlbihoZXJvTm9kZSkucGFyYWxsZWwoXHJcbiAgICAgICAgICAgICAgICBjYy50d2VlbigpLnRvKDAuNiwgeyBzY2FsZTogMC44IH0pLFxyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4oKS5iZXppZXJUbygwLjYsIHN0YXJ0UG9pbnQuYWRkKGNvbnRyb2xQb2ludDEpLCBzdGFydFBvaW50LmFkZChjb250cm9sUG9pbnQyKSwgZW5kUG9pbnQpXHJcbiAgICAgICAgICAgICkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlUG9vbEl0ZW0gPSBoZXJvTm9kZS5nZXRDb21wb25lbnQoTm9kZVBvb2xJdGVtKTtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlUG9vbEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5wb29sLnB1dChub2RlUG9vbEl0ZW0ubm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9Ob2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvTm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0X2dvX2FzaG9yZV9mbG9vcl9wb3NpdGlvbihzdGFydFBvc2l0aW9uOiBjYy5WZWMyKTogeyBkaXJfa2V5OiBzdHJpbmcsIGZsb29yX3Bvc2l0aW9uOiBjYy5WZWMzIH0ge1xyXG4gICAgICAgIGNvbnN0IGZpZ2h0RGF0YSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhO1xyXG4gICAgICAgIGxldCB0YXJnZXRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb247XHJcbiAgICAgICAgbGV0IGRpcmVjdGlvbktleSA9IFwiXCI7XHJcblxyXG4gICAgICAgIG91dGVyTG9vcDpcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBlZGdlRGlyZWN0aW9uIGluIGZpZ2h0RGF0YS5lZGdlX21hcCkge1xyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uS2V5ID0gZWRnZURpcmVjdGlvbjtcclxuXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb24uYWRkKGNjLnYyKGZpZ2h0RGF0YS5lZGdlX21hcFtlZGdlRGlyZWN0aW9uXSkubXVsdGlwbHlTY2FsYXIoaSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRQb3NpdGlvbi54IDwgMCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFBvc2l0aW9uLnggPj0gZmlnaHREYXRhLm1hcF9zaXplLnggfHxcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRQb3NpdGlvbi55IDwgMCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFBvc2l0aW9uLnkgPj0gZmlnaHREYXRhLm1hcF9zaXplLnlcclxuICAgICAgICAgICAgICAgICkgYnJlYWsgb3V0ZXJMb29wO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghZmlnaHREYXRhLm1hcF9pdGVtX2RhdGFfYXJyYXlbdGFyZ2V0UG9zaXRpb24ueCArIHRhcmdldFBvc2l0aW9uLnkgKiBmaWdodERhdGEubWFwX3NpemUueF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhayBvdXRlckxvb3A7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGlyX2tleTogZGlyZWN0aW9uS2V5LFxyXG4gICAgICAgICAgICBmbG9vcl9wb3NpdGlvbjogZmlnaHREYXRhLmdyaWRfcG9zaXRpb25fdG9fZmxvb3JfcG9zaXRpb24odGFyZ2V0UG9zaXRpb24pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdvdG9fYmF0dGxlKGhlcm9EYXRhOiBGaWdodE1hcEl0ZW0pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBmaWdodERhdGEgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YTtcclxuICAgICAgICBpZiAoZmlnaHREYXRhLmdvdG9fYmF0dGxlX2NvdW50IDwgZmlnaHREYXRhLmhlcm9fZGF0YV9hcnJheS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKDAgPT0gZmlnaHREYXRhLnNob3dfcmV0dXJuX2J0bl90aW1lc3RhbXApIHtcclxuICAgICAgICAgICAgICAgIChmaWdodERhdGEuc2hvd19yZXR1cm5fYnRuX3RpbWVzdGFtcCA9IERhdGUubm93KCkgKyBnbS5jb25zdC5GSUdIVF9SRVRVUk5fQlVUVE9OX0FQUEVBUl9USU1FKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50SGVybyA9IGZpZ2h0RGF0YS5pbl9iYXR0bGVfaGVyb19kYXRhO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudEhlcm8gJiYgY3VycmVudEhlcm8uaW5fYmF0dGxlX3N0YXRlID09IEhlcm9JbkJhdHRsZVN0YXRlLldJTExfSU5fQkFUVExFKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SGVyby5pbl9iYXR0bGVfc3RhdGUgPSBIZXJvSW5CYXR0bGVTdGF0ZS5IQVNfSU5fQkFUVExFO1xyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLmVtaXQoXCJmaWdodF9pbl9iYXR0bGVcIiwgY3VycmVudEhlcm8pO1xyXG4gICAgICAgICAgICAgICAgZmlnaHREYXRhLmdvdG9fYmF0dGxlX2NvdW50Kys7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgYmF0dGxlUG9zaXRpb24gPSBoZXJvRGF0YS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudEhlcm8uZ3JpZF9pbmRleCA9IGJhdHRsZVBvc2l0aW9uLmNlbGxfaWQ7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SGVyby5ncmlkX3Bvc2l0aW9uLnggPSBiYXR0bGVQb3NpdGlvbi5ncmlkX3Bvc2l0aW9uLng7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SGVyby5ncmlkX3Bvc2l0aW9uLnkgPSBiYXR0bGVQb3NpdGlvbi5ncmlkX3Bvc2l0aW9uLnk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVyb0luZGV4ID0gYmF0dGxlUG9zaXRpb24uYWRkX2hlcm9faW5kZXgoY3VycmVudEhlcm8uYXJyYXlfaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudEhlcm8ub2Zmc2V0ID0gaGVyb0luZGV4Lm9mZnNldDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhlcm9BcnJheUluZGV4ID0gY3VycmVudEhlcm8uYXJyYXlfaW5kZXg7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmlnaHREYXRhLnBsYXlfdHlwZSA8IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBnb0FzaG9yZVBvc2l0aW9uID0gdGhpcy5nZXRfZ29fYXNob3JlX2Zsb29yX3Bvc2l0aW9uKGN1cnJlbnRIZXJvLmdyaWRfcG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuRklHSFQsIFwicHJlZmFicy9maWdodF9oZXJvX2l0ZW1cIiwgRmlnaHRIZXJvSXRlbSwgKGhlcm9JdGVtUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuRklHSFQsIFwicHJlZmFicy9iYXR0bGVfc2hpcFwiLCBOb2RlUG9vbEl0ZW0sIChiYXR0bGVTaGlwUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcF9ub2RlLmFkZENoaWxkKGJhdHRsZVNoaXBQcmVmYWIubm9kZSwgLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlU2hpcFByZWZhYi5ub2RlLnBvc2l0aW9uID0gZ29Bc2hvcmVQb3NpdGlvbi5mbG9vcl9wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZVNoaXBQcmVmYWIubm9kZS5nZXRDaGlsZEJ5TmFtZShcInJvbGVcIikuYWRkQ2hpbGQoaGVyb0l0ZW1QcmVmYWIubm9kZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVyb0RhdGEgPSBmaWdodERhdGEuaGVyb19kYXRhX2FycmF5W2hlcm9BcnJheUluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9JdGVtUHJlZmFiLmRhdGEgPSBoZXJvRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0RGF0YS5oZXJvX2l0ZW1fYXJyYXlbaGVyb0FycmF5SW5kZXhdID0gaGVyb0l0ZW1QcmVmYWI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGUsIG8sIGksIF8sIG4sIHIsIGQsIHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmltYXRpb25Db21wb25lbnQgPSBiYXR0bGVTaGlwUHJlZmFiLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb25Db21wb25lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2hpcEFuaW1hdGlvbk5hbWUgPSBcImJhdHRsZV9jX3NoaXBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGVYID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGVZID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0ID0gY2MuVmVjMy5aRVJPO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ29Bc2hvcmVQb3NpdGlvbi5kaXJfa2V5ID09IEVkZ2VFbnVtW0VkZ2VFbnVtLkxFRlRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBBbmltYXRpb25OYW1lID0gXCJiYXR0bGVfY19zaGlwXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlWSA9IHNjYWxlWCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBjYy52MygtMzAsIDIwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGdvQXNob3JlUG9zaXRpb24uZGlyX2tleSA9PSBFZGdlRW51bVtFZGdlRW51bS5SSUdIVF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpcEFuaW1hdGlvbk5hbWUgPSBcImJhdHRsZV9jX3NoaXBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGVZID0gc2NhbGVYID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gY2MudjMoNjAsIC0yMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChnb0FzaG9yZVBvc2l0aW9uLmRpcl9rZXkgPT0gRWRnZUVudW1bRWRnZUVudW0uVE9QXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlwQW5pbWF0aW9uTmFtZSA9IFwiYmF0dGxlX2Zfc2hpcFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZVkgPSAtKHNjYWxlWCA9IDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBjYy52MygtMTAsIDMwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZ29Bc2hvcmVQb3NpdGlvbi5kaXJfa2V5ID09IEVkZ2VFbnVtW0VkZ2VFbnVtLkJPVFRPTV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpcEFuaW1hdGlvbk5hbWUgPSBcImJhdHRsZV9iX3NoaXBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGVZID0gc2NhbGVYID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gY2MudjMoLTIwLCAtMzApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uQ29tcG9uZW50Lm9uY2UoY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5wb29sLnB1dChhbmltYXRpb25Db21wb25lbnQubm9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0UG9zaXRpb24gPSBmaWdodERhdGEuZ3JpZF9wb3NpdGlvbl90b19wb3NpdGlvbihiYXR0bGVQb3NpdGlvbi5ncmlkX3Bvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHJhdmVsRHVyYXRpb24gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQb3NpdGlvbiA9IHRoaXMuY29udmVydF90b19tYXBfcG9pbnQoaGVyb0l0ZW1QcmVmYWIubm9kZSwgY2MuVmVjMy5aRVJPKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXN0YW5jZSA9IHRhcmdldFBvc2l0aW9uLnN1YihjdXJyZW50UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gTWF0aC5hdGFuMihkaXN0YW5jZS55LCBkaXN0YW5jZS54KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0l0ZW1QcmVmYWIucGxheV9zcGluZV9hbmltKFwibW92ZVwiLCBhbmdsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oaGVyb0l0ZW1QcmVmYWIubm9kZSkuZGVsYXkoMC4yKS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uQ29tcG9uZW50LnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdvcmxkUG9zaXRpb24gPSBoZXJvSXRlbVByZWZhYi5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBub2RlUG9zaXRpb24gPSB0aGlzLm1hcF9ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkUG9zaXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0l0ZW1QcmVmYWIubm9kZS5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0l0ZW1QcmVmYWIubm9kZS5wb3NpdGlvbiA9IG5vZGVQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGR5bmFtaWNMYXllciA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmdldF9keW5hbWljX25vZGVfbGF5ZXIoaGVyb0RhdGEuZ3JpZF9pbmRleCwgRmlnaHREeW5hbWljTm9kZUxheWVyLk1PVkUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmF2ZWxEdXJhdGlvbiA9IHRhcmdldFBvc2l0aW9uLnN1Yihub2RlUG9zaXRpb24pLm1hZygpIC8gODA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuaXNfZGVidWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9JdGVtUHJlZmFiLm5vZGUubmFtZSA9IGNjLmpzLmZvcm1hdFN0cihcImZpZ2h0X2hlcm9faXRlbV9ncmlkSW5kZXhAJWRfekluZGV4QCVkXCIsIGhlcm9EYXRhLmdyaWRfaW5kZXgsIGR5bmFtaWNMYXllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwX25vZGUuYWRkQ2hpbGQoaGVyb0l0ZW1QcmVmYWIubm9kZSwgZHluYW1pY0xheWVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzdGFuY2UgPSB0YXJnZXRQb3NpdGlvbi5zdWIobm9kZVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5nbGUgPSBNYXRoLmF0YW4yKGRpc3RhbmNlLnksIGRpc3RhbmNlLngpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0l0ZW1QcmVmYWIucGxheV9zcGluZV9hbmltKFwibW92ZVwiLCBhbmdsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dF9pbl9iYXR0bGVfaGVybygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50byh0cmF2ZWxEdXJhdGlvbiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogdGFyZ2V0UG9zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uQ29tcG9uZW50LnJlc3VtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoLTEgPCBiYXR0bGVQb3NpdGlvbi5wcm9wX2luZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXJvRGF0YS5maWdodF9zdGF0ZSA9IEhlcm9GaWdodFN0YXRlLk1PVklORztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9EYXRhLm1vdmVfcGF0aCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0RhdGEuZmluZF9wYXRoX3RhcmdldCA9IGZpZ2h0RGF0YS5wcm9wX2RhdGFfYXJyYXlbYmF0dGxlUG9zaXRpb24ucHJvcF9pbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXJvRGF0YS5maWdodF9zdGF0ZSA9IEhlcm9GaWdodFN0YXRlLldBSVRJTkc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRfbmV4dF9wYXRoKGhlcm9EYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1vbl9oZXJvX2FwcGx5X3Bhc3NpdmVfc2tpbGwoaGVyb0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkNvbXBvbmVudC5wbGF5KHNoaXBBbmltYXRpb25OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25Db21wb25lbnQubm9kZS5zY2FsZVggPSBzY2FsZVg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uQ29tcG9uZW50Lm5vZGUuekluZGV4ID0gc2NhbGVZO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkNvbXBvbmVudC5ub2RlLnBvc2l0aW9uID0gb2Zmc2V0LmFkZChhbmltYXRpb25Db21wb25lbnQubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoQnVuZGxlTmFtZS5GSUdIVCwgXCJwcmVmYWJzL2ZpZ2h0X2hlcm9faXRlbVwiLCBGaWdodEhlcm9JdGVtLCAoaGVyb0l0ZW1QcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVyb0RhdGEgPSBmaWdodERhdGEuaGVyb19kYXRhX2FycmF5W2hlcm9BcnJheUluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZHluYW1pY0xheWVyID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuZ2V0X2R5bmFtaWNfbm9kZV9sYXllcihoZXJvRGF0YS5ncmlkX2luZGV4LCBGaWdodER5bmFtaWNOb2RlTGF5ZXIuTU9WRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwX25vZGUuYWRkQ2hpbGQoaGVyb0l0ZW1QcmVmYWIubm9kZSwgZHluYW1pY0xheWVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmlzX2RlYnVnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaGVyb0l0ZW1QcmVmYWIubm9kZS5uYW1lID0gY2MuanMuZm9ybWF0U3RyKFwiZmlnaHRfaGVyb19pdGVtX2dyaWRJbmRleEAlZF96SW5kZXhAJWRcIiwgaGVyb0RhdGEuZ3JpZF9pbmRleCwgZHluYW1pY0xheWVyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0l0ZW1QcmVmYWIubm9kZS5wb3NpdGlvbiA9IGZpZ2h0RGF0YS5ncmlkX3Bvc2l0aW9uX3RvX3Bvc2l0aW9uKGJhdHRsZVBvc2l0aW9uLmdyaWRfcG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvSXRlbVByZWZhYi5kYXRhID0gaGVyb0RhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ2h0RGF0YS5oZXJvX2l0ZW1fYXJyYXlbaGVyb0FycmF5SW5kZXhdID0gaGVyb0l0ZW1QcmVmYWI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbW9uX2hlcm9fYXBwbHlfcGFzc2l2ZV9za2lsbChoZXJvRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dF9pbl9iYXR0bGVfaGVybygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93X2d1aWRlcl9maW5nZXJfYW5pbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbmV4dF9pbl9iYXR0bGVfaGVybygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBmaWdodERhdGEgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YTtcclxuICAgICAgICBsZXQgY3VycmVudEhlcm8gPSBmaWdodERhdGEuaW5fYmF0dGxlX2hlcm9fZGF0YTtcclxuXHJcbiAgICAgICAgaWYgKGZpZ2h0RGF0YS5nb3RvX2JhdHRsZV9jb3VudCA+PSBmaWdodERhdGEuaGVyb19kYXRhX2FycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZmlnaHREYXRhLm1hcF9pdGVtX2FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWFwSXRlbSA9IGZpZ2h0RGF0YS5tYXBfaXRlbV9hcnJheVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAobWFwSXRlbSAmJiBtYXBJdGVtLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXBJdGVtLnVwZGF0ZV92aWV3KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXh0SGVybzogRmlnaHRIZXJvSXRlbURhdGEgPSBudWxsO1xyXG4gICAgICAgIGZvciAobGV0IGhlcm9JbmRleCA9IDA7IGhlcm9JbmRleCA8IGZpZ2h0RGF0YS5oZXJvX2RhdGFfYXJyYXkubGVuZ3RoOyBoZXJvSW5kZXgrKykge1xyXG4gICAgICAgICAgICBjdXJyZW50SGVybyA9IGZpZ2h0RGF0YS5oZXJvX2RhdGFfYXJyYXlbaGVyb0luZGV4XTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRIZXJvLmluX2JhdHRsZV9zdGF0ZSA9PSBIZXJvSW5CYXR0bGVTdGF0ZS5OT1RfSU5fQkFUVExFKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SGVyby5pbl9iYXR0bGVfc3RhdGUgPSBIZXJvSW5CYXR0bGVTdGF0ZS5XSUxMX0lOX0JBVFRMRTtcclxuICAgICAgICAgICAgICAgIG5leHRIZXJvID0gY3VycmVudEhlcm87XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmlnaHREYXRhLmluX2JhdHRsZV9oZXJvX2RhdGEgPSBuZXh0SGVybztcclxuICAgICAgICBpZiAobmV4dEhlcm8pIHtcclxuICAgICAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLmVtaXQoXCJmaWdodF9pbl9iYXR0bGVcIiwgbmV4dEhlcm8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpbmRfbmV4dF9wYXRoKGhlcm86IEZpZ2h0SGVyb0l0ZW1EYXRhLCB0YXJnZXQ/OiBGaWdodEhlcm9JdGVtRGF0YSB8IEZpZ2h0QnVpbGRpbmdJdGVtRGF0YSB8IEZpZ2h0V2FsbEl0ZW1EYXRhKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgZmlnaHREYXRhID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGE7XHJcbiAgICAgICAgbGV0IHRhcmdldERhdGE6IEZpZ2h0VGFyZ2V0U29ydERhdGEgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldERhdGEgPSBuZXcgRmlnaHRUYXJnZXRTb3J0RGF0YSgpO1xyXG4gICAgICAgICAgICB0YXJnZXREYXRhLmluZGV4ID0gdGFyZ2V0LmFycmF5X2luZGV4O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEZpZ2h0SGVyb0l0ZW1EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXREYXRhLnR5cGUgPSAzO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEZpZ2h0QnVpbGRpbmdJdGVtRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0RGF0YS50eXBlID0gMjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBGaWdodFdhbGxJdGVtRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0RGF0YS50eXBlID0gNDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGNjLmVycm9yKFwi5pyq55+l5YiG5pSv5oOF5Ya1XCIpO1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoXCJOaMOhbmggY2jGsGEgeMOhYyDEkeG7i25oLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoaGVybyBpbnN0YW5jZW9mIEZpZ2h0SGVyb0l0ZW1EYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChoZXJvLnR5cGUgPT0gSGVyb1R5cGUuQVRUQUNLKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXREYXRhID0gdGhpcy5maW5kX2hlcm9fYXR0YWNrX3RhcmdldChoZXJvLmdyaWRfcG9zaXRpb24sIGhlcm8pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhlcm8udHlwZSA9PSBIZXJvVHlwZS5ERUZFTlNFKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXREYXRhID0gdGhpcy5maW5kX2RlZmVuc2VfaGVyb19hdHRhY2tfdGFyZ2V0KGhlcm8uZ3JpZF9wb3NpdGlvbiwgaGVybyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXREYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBpc1N0YXRpY1RhcmdldCA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBmb3VuZFRhcmdldDogRmlnaHRQcm9wSXRlbURhdGEgfCBGaWdodEJ1aWxkaW5nSXRlbURhdGEgfCBGaWdodEhlcm9JdGVtRGF0YSB8IEZpZ2h0V2FsbEl0ZW1EYXRhID0gdm9pZCBjYy5WZWMyLlpFUk87XHJcblxyXG4gICAgICAgICAgICBpZiAodGFyZ2V0RGF0YS50eXBlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGlzU3RhdGljVGFyZ2V0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBmb3VuZFRhcmdldCA9IGZpZ2h0RGF0YS5wcm9wX2RhdGFfYXJyYXlbdGFyZ2V0RGF0YS5pbmRleF07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0RGF0YS50eXBlID09IDIpIHtcclxuICAgICAgICAgICAgICAgIGZvdW5kVGFyZ2V0ID0gZmlnaHREYXRhLmJ1aWxkaW5nX2RhdGFfYXJyYXlbdGFyZ2V0RGF0YS5pbmRleF07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0RGF0YS50eXBlID09IDMpIHtcclxuICAgICAgICAgICAgICAgIGZvdW5kVGFyZ2V0ID0gaGVyby50eXBlID09IEhlcm9UeXBlLkFUVEFDSyA/IGZpZ2h0RGF0YS5kZWZlbnNlX2hlcm9fZGF0YV9hcnJheVt0YXJnZXREYXRhLmluZGV4XSA6IGZpZ2h0RGF0YS5oZXJvX2RhdGFfYXJyYXlbdGFyZ2V0RGF0YS5pbmRleF07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0RGF0YS50eXBlID09IDQpIHtcclxuICAgICAgICAgICAgICAgIGZvdW5kVGFyZ2V0ID0gZmlnaHREYXRhLndhbGxfZGF0YV9hcnJheVt0YXJnZXREYXRhLmluZGV4XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFmb3VuZFRhcmdldCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0R3JpZFBvcyA9IGZvdW5kVGFyZ2V0LmdyaWRfcG9zaXRpb247XHJcbiAgICAgICAgICAgIGNvbnN0IGdyaWQgPSBmaWdodERhdGEuZ3JpZDtcclxuICAgICAgICAgICAgY29uc3QgcGF0aGZpbmRlciA9IGZpZ2h0RGF0YS5hX3N0YXI7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWdyaWQuZ2V0V2Fsa2FibGUoaGVyby5ncmlkX3Bvc2l0aW9uLngsIGhlcm8uZ3JpZF9wb3NpdGlvbi55KSkge1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5zZXRXYWxrYWJsZShoZXJvLmdyaWRfcG9zaXRpb24ueCwgaGVyby5ncmlkX3Bvc2l0aW9uLnksIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdyaWQuc2V0U3RhcnROb2RlKGhlcm8uZ3JpZF9wb3NpdGlvbi54LCBoZXJvLmdyaWRfcG9zaXRpb24ueSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWdyaWQuZ2V0V2Fsa2FibGUodGFyZ2V0R3JpZFBvcy54LCB0YXJnZXRHcmlkUG9zLnkpKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkLnNldFdhbGthYmxlKHRhcmdldEdyaWRQb3MueCwgdGFyZ2V0R3JpZFBvcy55LCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBncmlkLnNldEVuZE5vZGUodGFyZ2V0R3JpZFBvcy54LCB0YXJnZXRHcmlkUG9zLnkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBhdGhmaW5kZXIuZmluZFBhdGgoZ3JpZCkpIHtcclxuICAgICAgICAgICAgICAgIGhlcm8ubW92ZV9zdGFydCA9IHBhdGhmaW5kZXIucGF0aC5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgaGVyby5tb3ZlX2VuZCA9IGlzU3RhdGljVGFyZ2V0ID8gcGF0aGZpbmRlci5wYXRoLnBvcCgpIDogcGF0aGZpbmRlci5wYXRoW3BhdGhmaW5kZXIucGF0aC5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgIGhlcm8ubW92ZV9wYXRoID0gcGF0aGZpbmRlci5wYXRoO1xyXG4gICAgICAgICAgICAgICAgaGVyby5maW5kX3BhdGhfdGFyZ2V0ID0gZm91bmRUYXJnZXQ7XHJcbiAgICAgICAgICAgICAgICBoZXJvLmZpZ2h0X3N0YXRlID0gSGVyb0ZpZ2h0U3RhdGUuTU9WSU5HO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChmaWdodERhdGEuaXNfZGVidWcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWJ1Z0NvbG9yID0gY2MuY29sb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLm1hdGhfcmFuZG9tKHRydWUsIDAsIDI1NiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLm1hdGhfcmFuZG9tKHRydWUsIDAsIDI1NiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLm1hdGhfcmFuZG9tKHRydWUsIDAsIDI1NilcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVyby5tb3ZlX3BhdGgubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGF0aE5vZGUgPSBoZXJvLm1vdmVfcGF0aFtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlnaHREYXRhLmdldF9maWdodF9tYXBfaXRlbShwYXRoTm9kZS54LCBwYXRoTm9kZS55KS5sYW5kX3Nwci5ub2RlLmNvbG9yID0gZGVidWdDb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwi5a+76Lev5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWdyaWQuZ2V0V2Fsa2FibGUoaGVyby5ncmlkX3Bvc2l0aW9uLngsIGhlcm8uZ3JpZF9wb3NpdGlvbi55KSkge1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5zZXRXYWxrYWJsZShoZXJvLmdyaWRfcG9zaXRpb24ueCwgaGVyby5ncmlkX3Bvc2l0aW9uLnksIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFncmlkLmdldFdhbGthYmxlKHRhcmdldEdyaWRQb3MueCwgdGFyZ2V0R3JpZFBvcy55KSkge1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5zZXRXYWxrYWJsZSh0YXJnZXRHcmlkUG9zLngsIHRhcmdldEdyaWRQb3MueSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBncmlkLmNsZWFyU3RhcnRBbmRFbmROb2RlKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmluZF9uZXh0X3BhdGhfZGlzdGFuY2Uoc3RhcnRQb3M6IGNjLlZlYzIsIGVuZFBvczogY2MuVmVjMik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG1pbkRpc3RhbmNlID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XHJcbiAgICAgICAgY29uc3QgZ3JpZCA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmdyaWQ7XHJcbiAgICAgICAgY29uc3QgcGF0aGZpbmRlciA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmFfc3RhcjtcclxuXHJcbiAgICAgICAgY29uc3Qgc3RhcnRXYWxrYWJsZSA9IGdyaWQuZ2V0V2Fsa2FibGUoc3RhcnRQb3MueCwgc3RhcnRQb3MueSk7XHJcbiAgICAgICAgaWYgKCFzdGFydFdhbGthYmxlKSBncmlkLmdldFdhbGthYmxlKHN0YXJ0UG9zLngsIHN0YXJ0UG9zLnkpO1xyXG4gICAgICAgIGdyaWQuc2V0U3RhcnROb2RlKHN0YXJ0UG9zLngsIHN0YXJ0UG9zLnkpO1xyXG5cclxuICAgICAgICBjb25zdCBlbmRXYWxrYWJsZSA9IGdyaWQuZ2V0V2Fsa2FibGUoZW5kUG9zLngsIGVuZFBvcy55KTtcclxuICAgICAgICBpZiAoIWVuZFdhbGthYmxlKSBncmlkLnNldFdhbGthYmxlKGVuZFBvcy54LCBlbmRQb3MueSwgdHJ1ZSk7XHJcbiAgICAgICAgZ3JpZC5zZXRFbmROb2RlKGVuZFBvcy54LCBlbmRQb3MueSk7XHJcblxyXG4gICAgICAgIGlmIChwYXRoZmluZGVyLmZpbmRQYXRoKGdyaWQpKSB7XHJcbiAgICAgICAgICAgIG1pbkRpc3RhbmNlID0gcGF0aGZpbmRlci5wYXRoLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXN0YXJ0V2Fsa2FibGUpIGdyaWQuc2V0V2Fsa2FibGUoc3RhcnRQb3MueCwgc3RhcnRQb3MueSwgZmFsc2UpO1xyXG4gICAgICAgIGlmICghZW5kV2Fsa2FibGUpIGdyaWQuc2V0V2Fsa2FibGUoZW5kUG9zLngsIGVuZFBvcy55LCBmYWxzZSk7XHJcbiAgICAgICAgZ3JpZC5jbGVhclN0YXJ0QW5kRW5kTm9kZSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gbWluRGlzdGFuY2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgZmluZF9oZXJvX2F0dGFja190YXJnZXQoaGVyb1Bvc2l0aW9uOiBjYy5WZWMyLCBoZXJvRGF0YTogRmlnaHRIZXJvSXRlbURhdGEpOiBGaWdodFRhcmdldFNvcnREYXRhIHtcclxuICAgICAgICBjb25zdCBmaWdodERhdGEgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YTtcclxuICAgICAgICBjb25zdCBwb3RlbnRpYWxUYXJnZXRzOiBGaWdodFRhcmdldFNvcnREYXRhW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZmlnaHREYXRhLmJ1aWxkaW5nX2RhdGFfYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ1aWxkaW5nID0gZmlnaHREYXRhLmJ1aWxkaW5nX2RhdGFfYXJyYXlbaW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoYnVpbGRpbmcgJiYgMCA8IGJ1aWxkaW5nLmhwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBuZXcgRmlnaHRUYXJnZXRTb3J0RGF0YTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5waXhlbF9kaXN0YW5jZSA9IGZpZ2h0RGF0YS5ncmlkX3Bvc2l0aW9uX3RvX3Bvc2l0aW9uKGhlcm9Qb3NpdGlvbikuc3ViKGZpZ2h0RGF0YS5ncmlkX3Bvc2l0aW9uX3RvX3Bvc2l0aW9uKGJ1aWxkaW5nLmdyaWRfcG9zaXRpb24pKS5tYWcoKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5maW5kX3BhdGhfZGlzdGFuY2UgPSB0aGlzLmZpbmRfbmV4dF9wYXRoX2Rpc3RhbmNlKGhlcm9Qb3NpdGlvbiwgYnVpbGRpbmcuZ3JpZF9wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQucHJpb3JpdHkgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnR5cGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuZmluZF9wYXRoX2Rpc3RhbmNlICE9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSICYmIHBvdGVudGlhbFRhcmdldHMucHVzaCh0YXJnZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZmlnaHREYXRhLndhbGxfZGF0YV9hcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3Qgd2FsbERhdGEgPSBmaWdodERhdGEud2FsbF9kYXRhX2FycmF5W2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKHdhbGxEYXRhICYmIDAgPCB3YWxsRGF0YS5ocCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gbmV3IEZpZ2h0VGFyZ2V0U29ydERhdGE7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQucGl4ZWxfZGlzdGFuY2UgPSBmaWdodERhdGEuZ3JpZF9wb3NpdGlvbl90b19wb3NpdGlvbihoZXJvUG9zaXRpb24pLnN1YihmaWdodERhdGEuZ3JpZF9wb3NpdGlvbl90b19wb3NpdGlvbih3YWxsRGF0YS5ncmlkX3Bvc2l0aW9uKSkubWFnKCk7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuZmluZF9wYXRoX2Rpc3RhbmNlID0gdGhpcy5maW5kX25leHRfcGF0aF9kaXN0YW5jZShoZXJvUG9zaXRpb24sIHdhbGxEYXRhLmdyaWRfcG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnByaW9yaXR5ID0gMTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC50eXBlID0gNDtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LmZpbmRfcGF0aF9kaXN0YW5jZSAhPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiAmJiBwb3RlbnRpYWxUYXJnZXRzLnB1c2godGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGZpZ2h0RGF0YS5kZWZlbnNlX2hlcm9fZGF0YV9hcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3QgZGVmZW5zZUhlcm8gPSBmaWdodERhdGEuZGVmZW5zZV9oZXJvX2RhdGFfYXJyYXlbaW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoZGVmZW5zZUhlcm8gJiYgMCA8IGRlZmVuc2VIZXJvLmhwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBuZXcgRmlnaHRUYXJnZXRTb3J0RGF0YTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5waXhlbF9kaXN0YW5jZSA9IGZpZ2h0RGF0YS5ncmlkX3Bvc2l0aW9uX3RvX3Bvc2l0aW9uKGhlcm9Qb3NpdGlvbikuc3ViKGZpZ2h0RGF0YS5ncmlkX3Bvc2l0aW9uX3RvX3Bvc2l0aW9uKGRlZmVuc2VIZXJvLmdyaWRfcG9zaXRpb24pKS5tYWcoKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5maW5kX3BhdGhfZGlzdGFuY2UgPSB0aGlzLmZpbmRfbmV4dF9wYXRoX2Rpc3RhbmNlKGhlcm9Qb3NpdGlvbiwgZGVmZW5zZUhlcm8uZ3JpZF9wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQucHJpb3JpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnR5cGUgPSAzO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuZmluZF9wYXRoX2Rpc3RhbmNlICE9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSICYmIHBvdGVudGlhbFRhcmdldHMucHVzaCh0YXJnZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZmlnaHREYXRhLnByb3BfZGF0YV9hcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvcERhdGEgPSBmaWdodERhdGEucHJvcF9kYXRhX2FycmF5W2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKHByb3BEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXIgPSBuZXcgRmlnaHRUYXJnZXRTb3J0RGF0YTtcclxuICAgICAgICAgICAgICAgIHRhcmdlci5waXhlbF9kaXN0YW5jZSA9IGZpZ2h0RGF0YS5ncmlkX3Bvc2l0aW9uX3RvX3Bvc2l0aW9uKGhlcm9Qb3NpdGlvbikuc3ViKGZpZ2h0RGF0YS5ncmlkX3Bvc2l0aW9uX3RvX3Bvc2l0aW9uKHByb3BEYXRhLmdyaWRfcG9zaXRpb24pKS5tYWcoKTtcclxuICAgICAgICAgICAgICAgIHRhcmdlci5maW5kX3BhdGhfZGlzdGFuY2UgPSB0aGlzLmZpbmRfbmV4dF9wYXRoX2Rpc3RhbmNlKGhlcm9Qb3NpdGlvbiwgcHJvcERhdGEuZ3JpZF9wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXIucHJpb3JpdHkgPSAyO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2VyLnR5cGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2VyLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXIuZmluZF9wYXRoX2Rpc3RhbmNlICE9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSICYmIHBvdGVudGlhbFRhcmdldHMucHVzaCh0YXJnZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoMCA8IHBvdGVudGlhbFRhcmdldHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNvcnRlZFRhcmdldHM6IEZpZ2h0VGFyZ2V0U29ydERhdGFbXSA9IFtdLmNvbmNhdChwb3RlbnRpYWxUYXJnZXRzKTtcclxuICAgICAgICAgICAgVXRpbHMuc29ydF9ieV9wcm9wcyhzb3J0ZWRUYXJnZXRzLCB7XHJcbiAgICAgICAgICAgICAgICBmaW5kX3BhdGhfZGlzdGFuY2U6IFwiYXNjZW5kaW5nXCIsXHJcbiAgICAgICAgICAgICAgICBwaXhlbF9kaXN0YW5jZTogXCJhc2NlbmRpbmdcIixcclxuICAgICAgICAgICAgICAgIHByaW9yaXR5OiBcImFzY2VuZGluZ1wiXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IG91dE9mUmFuZ2VJbmRleCA9IC0xO1xyXG4gICAgICAgICAgICBsZXQgc29ydGVkVGFyZ2V0OiBGaWdodFRhcmdldFNvcnREYXRhO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc29ydGVkVGFyZ2V0cy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIHNvcnRlZFRhcmdldCA9IHNvcnRlZFRhcmdldHNbaW5kZXhdXHJcbiAgICAgICAgICAgICAgICBpZiAoc29ydGVkVGFyZ2V0LnBpeGVsX2Rpc3RhbmNlID4gaGVyb0RhdGEuYXR0YWNrX3JhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0T2ZSYW5nZUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgwIDwgb3V0T2ZSYW5nZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpblJhbmdlVGFyZ2V0cyA9IHNvcnRlZFRhcmdldHMuc3BsaWNlKDAsIG91dE9mUmFuZ2VJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBVdGlscy5zb3J0X2J5X3Byb3BzKGluUmFuZ2VUYXJnZXRzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHk6IFwiYXNjZW5kaW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmluZF9wYXRoX2Rpc3RhbmNlOiBcImFzY2VuZGluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBpeGVsX2Rpc3RhbmNlOiBcImFzY2VuZGluZ1wiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpblJhbmdlVGFyZ2V0c1swXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc29ydGVkVGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpbmRfZGVmZW5zZV9oZXJvX2F0dGFja190YXJnZXQoZGVmZW5zZUhlcm9Qb3NpdGlvbjogY2MuVmVjMiwgZGVmZW5zZUhlcm9EYXRhOiBGaWdodEhlcm9JdGVtRGF0YSk6IEZpZ2h0VGFyZ2V0U29ydERhdGEgfCBudWxsIHtcclxuICAgICAgICBjb25zdCBmaWdodERhdGEgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YTtcclxuICAgICAgICBjb25zdCBwb3RlbnRpYWxUYXJnZXRzOiBGaWdodFRhcmdldFNvcnREYXRhW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZmlnaHREYXRhLmhlcm9fZGF0YV9hcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3QgaGVyb0RhdGEgPSBmaWdodERhdGEuaGVyb19kYXRhX2FycmF5W2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKGhlcm9EYXRhICYmIDAgPCBoZXJvRGF0YS5ocCAmJiBoZXJvRGF0YS5pbl9iYXR0bGVfc3RhdGUgPT0gSGVyb0luQmF0dGxlU3RhdGUuSEFTX0lOX0JBVFRMRSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gbmV3IEZpZ2h0VGFyZ2V0U29ydERhdGE7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuZGlzdGFuY2UgPSBNYXRoLmFicyhkZWZlbnNlSGVyb1Bvc2l0aW9uLnggLSBoZXJvRGF0YS5ncmlkX3Bvc2l0aW9uLngpICsgTWF0aC5hYnMoZGVmZW5zZUhlcm9Qb3NpdGlvbi55IC0gaGVyb0RhdGEuZ3JpZF9wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5waXhlbF9kaXN0YW5jZSA9IGZpZ2h0RGF0YS5ncmlkX3Bvc2l0aW9uX3RvX3Bvc2l0aW9uKGRlZmVuc2VIZXJvUG9zaXRpb24pLnN1YihmaWdodERhdGEuZ3JpZF9wb3NpdGlvbl90b19wb3NpdGlvbihoZXJvRGF0YS5ncmlkX3Bvc2l0aW9uKSkubWFnKCk7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuZmluZF9wYXRoX2Rpc3RhbmNlID0gdGhpcy5maW5kX25leHRfcGF0aF9kaXN0YW5jZShkZWZlbnNlSGVyb1Bvc2l0aW9uLCBoZXJvRGF0YS5ncmlkX3Bvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5wcmlvcml0eSA9IDE7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQudHlwZSA9IDM7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuaW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5maW5kX3BhdGhfZGlzdGFuY2UgIT0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgJiYgcG90ZW50aWFsVGFyZ2V0cy5wdXNoKHRhcmdldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgwIDwgcG90ZW50aWFsVGFyZ2V0cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgVXRpbHMuc29ydF9ieV9wcm9wcyhwb3RlbnRpYWxUYXJnZXRzLCB7XHJcbiAgICAgICAgICAgICAgICBmaW5kX3BhdGhfZGlzdGFuY2U6IFwiYXNjZW5kaW5nXCIsXHJcbiAgICAgICAgICAgICAgICBwaXhlbF9kaXN0YW5jZTogXCJhc2NlbmRpbmdcIixcclxuICAgICAgICAgICAgICAgIHByaW9yaXR5OiBcImFzY2VuZGluZ1wiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBwb3RlbnRpYWxUYXJnZXQgPSBwb3RlbnRpYWxUYXJnZXRzWzBdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBvdGVudGlhbFRhcmdldC5waXhlbF9kaXN0YW5jZSA8PSBkZWZlbnNlSGVyb0RhdGEuc2VhcmNoX3JhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG90ZW50aWFsVGFyZ2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpbmRfYnVpbGRpbmdfYXR0YWNrX3RhcmdldChidWlsZGluZ0RhdGE6IEZpZ2h0QnVpbGRpbmdJdGVtRGF0YSB8IEZpZ2h0V2FsbEl0ZW1EYXRhKTogRmlnaHRIZXJvSXRlbURhdGEgfCBudWxsIHtcclxuICAgICAgICBpZiAoYnVpbGRpbmdEYXRhLmF0dGFja19yYW5nZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZmlnaHREYXRhID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGE7XHJcbiAgICAgICAgY29uc3QgYnVpbGRpbmdQb3NpdGlvbiA9IGJ1aWxkaW5nRGF0YS5ncmlkX3Bvc2l0aW9uO1xyXG4gICAgICAgIGNvbnN0IHBvdGVudGlhbFRhcmdldHMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZmlnaHREYXRhLmhlcm9fZGF0YV9hcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3QgaGVyb0RhdGEgPSBmaWdodERhdGEuaGVyb19kYXRhX2FycmF5W2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKGhlcm9EYXRhICYmIDAgPCBoZXJvRGF0YS5ocCAmJiBoZXJvRGF0YS5pbl9iYXR0bGVfc3RhdGUgPT0gSGVyb0luQmF0dGxlU3RhdGUuSEFTX0lOX0JBVFRMRSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gbmV3IEZpZ2h0VGFyZ2V0U29ydERhdGE7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuZGlzdGFuY2UgPSBNYXRoLmFicyhidWlsZGluZ1Bvc2l0aW9uLnggLSBoZXJvRGF0YS5ncmlkX3Bvc2l0aW9uLngpICsgTWF0aC5hYnMoYnVpbGRpbmdQb3NpdGlvbi55IC0gaGVyb0RhdGEuZ3JpZF9wb3NpdGlvbi55KTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5waXhlbF9kaXN0YW5jZSA9IGZpZ2h0RGF0YS5ncmlkX3Bvc2l0aW9uX3RvX3Bvc2l0aW9uKGJ1aWxkaW5nUG9zaXRpb24pLnN1YihmaWdodERhdGEuZ3JpZF9wb3NpdGlvbl90b19wb3NpdGlvbihoZXJvRGF0YS5ncmlkX3Bvc2l0aW9uKSkubWFnKCk7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuZmluZF9wYXRoX2Rpc3RhbmNlID0gdGhpcy5maW5kX25leHRfcGF0aF9kaXN0YW5jZShidWlsZGluZ1Bvc2l0aW9uLCBoZXJvRGF0YS5ncmlkX3Bvc2l0aW9uKSxcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQucHJpb3JpdHkgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnR5cGUgPSAzO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuZmluZF9wYXRoX2Rpc3RhbmNlICE9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSICYmIHBvdGVudGlhbFRhcmdldHMucHVzaCh0YXJnZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoMCA8IHBvdGVudGlhbFRhcmdldHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIFV0aWxzLnNvcnRfYnlfcHJvcHMocG90ZW50aWFsVGFyZ2V0cywge1xyXG4gICAgICAgICAgICAgICAgZmluZF9wYXRoX2Rpc3RhbmNlOiBcImFzY2VuZGluZ1wiLFxyXG4gICAgICAgICAgICAgICAgcGl4ZWxfZGlzdGFuY2U6IFwiYXNjZW5kaW5nXCIsXHJcbiAgICAgICAgICAgICAgICBwcmlvcml0eTogXCJhc2NlbmRpbmdcIlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHBvdGVudGlhbFRhcmdldCA9IHBvdGVudGlhbFRhcmdldHNbMF07XHJcbiAgICAgICAgICAgIGlmIChwb3RlbnRpYWxUYXJnZXQucGl4ZWxfZGlzdGFuY2UgPD0gYnVpbGRpbmdEYXRhLmF0dGFja19yYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpZ2h0RGF0YS5oZXJvX2RhdGFfYXJyYXlbcG90ZW50aWFsVGFyZ2V0LmluZGV4XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGJ1aWxkaW5nX2NhbGxfZGVmZW5zZV9oZXJvKGJ1aWxkaW5nOiBGaWdodEJ1aWxkaW5nSXRlbURhdGEgfCBGaWdodFdhbGxJdGVtRGF0YSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGZpZ2h0RGF0YSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhO1xyXG4gICAgICAgIGNvbnN0IHBvdGVudGlhbERlZmVuc2VIZXJvZXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZmlnaHREYXRhLmRlZmVuc2VfaGVyb19kYXRhX2FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBjb25zdCBkZWZlbnNlSGVybyA9IGZpZ2h0RGF0YS5kZWZlbnNlX2hlcm9fZGF0YV9hcnJheVtpbmRleF07XHJcbiAgICAgICAgICAgIGlmIChkZWZlbnNlSGVybyAmJiAwIDwgZGVmZW5zZUhlcm8uaHApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IG5ldyBGaWdodFRhcmdldFNvcnREYXRhO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LmRpc3RhbmNlID0gTWF0aC5hYnMoYnVpbGRpbmcuZ3JpZF9wb3NpdGlvbi54IC0gZGVmZW5zZUhlcm8uZ3JpZF9wb3NpdGlvbi54KSArIE1hdGguYWJzKGJ1aWxkaW5nLmdyaWRfcG9zaXRpb24ueSAtIGRlZmVuc2VIZXJvLmdyaWRfcG9zaXRpb24ueSk7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQucGl4ZWxfZGlzdGFuY2UgPSBmaWdodERhdGEuZ3JpZF9wb3NpdGlvbl90b19wb3NpdGlvbihidWlsZGluZy5ncmlkX3Bvc2l0aW9uKS5zdWIoZmlnaHREYXRhLmdyaWRfcG9zaXRpb25fdG9fcG9zaXRpb24oZGVmZW5zZUhlcm8uZ3JpZF9wb3NpdGlvbikpLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnByaW9yaXR5ID0gMTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC50eXBlID0gMztcclxuICAgICAgICAgICAgICAgIHRhcmdldC5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgcG90ZW50aWFsRGVmZW5zZUhlcm9lcy5wdXNoKHRhcmdldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgwIDwgcG90ZW50aWFsRGVmZW5zZUhlcm9lcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgVXRpbHMuc29ydF9ieV9wcm9wcyhwb3RlbnRpYWxEZWZlbnNlSGVyb2VzLCB7XHJcbiAgICAgICAgICAgICAgICBwaXhlbF9kaXN0YW5jZTogXCJhc2NlbmRpbmdcIixcclxuICAgICAgICAgICAgICAgIHByaW9yaXR5OiBcImFzY2VuZGluZ1wiXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHBvdGVudGlhbERlZmVuc2VIZXJvZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZEhlcm9EYXRhID0gcG90ZW50aWFsRGVmZW5zZUhlcm9lc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAoIShzZWxlY3RlZEhlcm9EYXRhLnBpeGVsX2Rpc3RhbmNlIDw9IGJ1aWxkaW5nLmNhbGxfcmFuZ2UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlZmVuc2VIZXJvID0gZmlnaHREYXRhLmRlZmVuc2VfaGVyb19kYXRhX2FycmF5W3NlbGVjdGVkSGVyb0RhdGEuaW5kZXhdXHJcbiAgICAgICAgICAgICAgICBpZiAoZGVmZW5zZUhlcm8gJiYgYnVpbGRpbmcubG9ja19hdHRhY2tfdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kX25leHRfcGF0aChkZWZlbnNlSGVybywgYnVpbGRpbmcubG9ja19hdHRhY2tfdGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29udmVydF90b19zY2VuZV9wb2ludChub2RlOiBjYy5Ob2RlLCBsb2NhbFBvaW50PzogY2MuVmVjMyk6IGNjLlZlYzMge1xyXG4gICAgICAgIGxvY2FsUG9pbnQgPSAobG9jYWxQb2ludCA9PT0gdW5kZWZpbmVkKSA/IGNjLlZlYzMuWkVSTyA6IGxvY2FsUG9pbnQ7XHJcbiAgICAgICAgaWYgKGxvY2FsUG9pbnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsb2NhbFBvaW50ID0gY2MuVmVjMy5aRVJPO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB3b3JsZFBvaW50ID0gbm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIobG9jYWxQb2ludCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmVfbm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvaW50KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbnZlcnRfdG9fbWFwX3BvaW50KG5vZGU6IGNjLk5vZGUsIGxvY2FsUG9pbnQ6IGNjLlZlYzMpOiBjYy5WZWMzIHtcclxuICAgICAgICBsb2NhbFBvaW50ID0gKGxvY2FsUG9pbnQgPT09IHVuZGVmaW5lZCkgPyBjYy5WZWMzLlpFUk8gOiBsb2NhbFBvaW50O1xyXG4gICAgICAgIGlmIChsb2NhbFBvaW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgbG9jYWxQb2ludCA9IGNjLlZlYzMuWkVSTztcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgd29ybGRQb2ludCA9IG5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGxvY2FsUG9pbnQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcF9ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkUG9pbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb252ZXJ0X3RvX2VmZmVjdF9wb2ludChub2RlOiBjYy5Ob2RlLCBsb2NhbFBvaW50OiBjYy5WZWMzKTogY2MuVmVjMyB7XHJcbiAgICAgICAgbG9jYWxQb2ludCA9IChsb2NhbFBvaW50ID09PSB1bmRlZmluZWQpID8gY2MuVmVjMy5aRVJPIDogbG9jYWxQb2ludDtcclxuICAgICAgICBpZiAobG9jYWxQb2ludCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxvY2FsUG9pbnQgPSBjYy5WZWMzLlpFUk87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHdvcmxkUG9pbnQgPSBub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihsb2NhbFBvaW50KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5lZmZlY3Rfbm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvaW50KTtcclxuICAgIH1cclxufSJdfQ==