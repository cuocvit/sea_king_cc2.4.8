"use strict";
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