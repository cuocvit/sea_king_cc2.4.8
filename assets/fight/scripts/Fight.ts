import { ListView } from '../../start-scene/scripts/ListView';
import { GameModule } from '../../start-scene/scripts/GameModule';
import { FightConstants, HeroType, HeroInBattleState, HeroFightState, FightDynamicNodeLayer } from '../../start-scene/scripts/FightConstants';
import { FightState } from '../../start-scene/scripts/FightData';
import { ConstantsData } from '../../start-scene/scripts/ConstantsData';
import { BundleName } from '../../start-scene/scripts/Constants';
import { gm } from '../../start-scene/scripts/GameManager';
import { SkillType, SkillPos, AttackType, SkillEffectId } from '../../start-scene/scripts/ConfigData';
import { FightData } from '../../start-scene/scripts/FightData';
import { FightTempData, FightTargetSortData, EdgeEnum, FightBuildingItemData, FightHeroItemData, FightWallItemData, FightPropItemData, BuffItemData } from '../../start-scene/scripts/FightTempData';
import { RecordData } from '../../start-scene/scripts/RecordData';
import { NodePoolItem } from '../../start-scene/scripts/NodePoolItem';
import { Utils } from '../../start-scene/scripts/Utils';
import { ReportData } from '../../start-scene/scripts/NetUtils';
import { FightHeroItem } from './FightHeroItem';
import { FightMapItem } from './FightMapItem';
import { SkillConfig } from '../../common/configs/skill';
import { HeroConfig } from '../../common/configs/hero';
import { FightBuildingItem } from './FightBuildingItem';
import { FightWallItem } from './FightWallItem';

const { ccclass, property } = cc._decorator;

@ccclass
export class Fight extends GameModule {
    @property(cc.Node)
    private mask_node: cc.Node = null;

    @property(cc.Node)
    private scene_node: cc.Node = null;

    @property(cc.Node)
    public map_node: cc.Node = null;

    @property(cc.Node)
    public effect_node: cc.Node = null;

    @property(cc.Node)
    private window_node: cc.Node = null;

    @property(cc.Node)
    public text_node: cc.Node = null;

    @property(cc.Node)
    private boat_node: cc.Node = null;

    @property(cc.Node)
    private boat_box_node: cc.Node = null;

    @property(cc.Sprite)
    private boat_spr: cc.Sprite = null;

    @property(cc.Animation)
    private boat_anim: cc.Animation = null;

    @property(cc.Node)
    private ui_node: cc.Node = null;

    @property(cc.Label)
    private name_lbl: cc.Label = null;

    @property(cc.Label)
    private left_sec_lbl: cc.Label = null;

    @property(cc.Button)
    private speed_1_btn: cc.Button = null;

    @property(cc.Button)
    private speed_2_btn: cc.Button = null;

    @property(cc.Button)
    private return_btn: cc.Button = null;

    @property(ListView)
    private hero_list: ListView = null;

    @property(ListView)
    private reward_list: ListView = null;

    @property(cc.Node)
    private figerAni: cc.Node = null;

    @property(cc.ParticleSystem)
    private wave_ps: cc.ParticleSystem = null;

    @property(cc.Node)
    private fight_guider_node: cc.Node = null;

    //
    protected onEnable(): void {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move_handler, this);
        this.node._touchListener.setSwallowTouches(false);
        gm.data.event_emitter.on("pick_up_prop", this.on_pick_up_prop_handler, this);
        gm.data.fight_temp_data.build_hero_array();
        gm.data.fight_temp_data.build_reward_array();
        this.init_map();
        this.update_view();
        this.fight_start();
        this.fight_guider_node.active = false;

        if (13 == gm.data.mapCell_data.roleGuideVO.guideID && !gm.data.mapCell_data.roleGuideVO.isEnd) {
            gm.ui.set_module_args(gm.const.GUIDE_SHOW_TIPS_OP.key, 5);
            gm.ui.show_panel(gm.const.GUIDE_SHOW_TIPS_OP);
        }
    }

    //
    protected onDisable(): void {
        this.scene_node.off(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move_handler, this);
        gm.data.event_emitter.off("pick_up_prop", this.on_pick_up_prop_handler);
    }

    
    private on_touch_move_handler(event: cc.Event.EventTouch): void {
        const touches = event.getTouches();
        if (gm.data.mapCell_data.isGuide) return;
        if (touches.length == 2) {
            const touch1 = touches[0];
            const touch2 = touches[1];
            const delta1 = touch1.getDelta();
            const delta2 = touch2.getDelta();
            const location1 = touch1.getLocation();
            const location2 = touch2.getLocation();
            let midPoint = cc.v3(location1.add(location2).multiplyScalar(0.5));
            midPoint = this.scene_node.convertToNodeSpaceAR(midPoint);

            const deltaLocation = location1.sub(location2);
            const combinedDelta = delta1.sub(delta2);

            let scale = 1;
            scale = Math.abs(deltaLocation.x) > Math.abs(deltaLocation.y)
                ? (deltaLocation.x + combinedDelta.x) / deltaLocation.x * this.scene_node.scale
                : (deltaLocation.y + combinedDelta.y) / deltaLocation.y * this.scene_node.scale;

            if (scale < 1) {
                scale = 1;
            } else if (scale < 2) {
                scale = 2;
            }

            const scaleChange = scale - this.scene_node.scale;
            this.scene_node.scale += scaleChange;
            const scaledMidPoint = midPoint.multiplyScalar(scaleChange);
            this.scene_node.position = this.scene_node.position.sub(scaledMidPoint);
        } else if (touches.length == 1) {
            const delta = event.getDelta();
            this.scene_node.x += delta.x;
            this.scene_node.y += delta.y;

            if (this.scene_node.x < gm.data.fight_temp_data.min_offset.x) {
                this.scene_node.x = gm.data.fight_temp_data.min_offset.x;
            } else if (this.scene_node.x > gm.data.fight_temp_data.max_offset.x) {
                this.scene_node.x = gm.data.fight_temp_data.max_offset.x;
            }

            if (this.scene_node.y < gm.data.fight_temp_data.min_offset.y) {
                this.scene_node.y = gm.data.fight_temp_data.min_offset.y
            } else if (this.scene_node.y > gm.data.fight_temp_data.max_offset.y) {
                this.scene_node.y = gm.data.fight_temp_data.max_offset.y
            }
        }
    }
    
    private on_pick_up_prop_handler(index: number): void {
        const item = this.reward_list.getItem(index);
        if (item) {
            item.update_view();
        }
    }

    
    private init_map(): void {
        if (gm.data.fight_temp_data.play_type < 0) {
            cc.error("play_type Giá trị sai:" + gm.data.fight_temp_data.play_type);
            gm.data.fight_temp_data.play_type = 0;
        }

        this.mask_node.color = FightConstants.SEA_AREA_COLOR_ARRAY[gm.data.fight_temp_data.play_type];
        const mapData = gm.data.fight_temp_data.build_play_map_data();
        this.scene_node.position = gm.data.fight_temp_data.map_start_position;
        gm.pool.init(BundleName.FIGHT, "prefabs/fight_map_item", FightMapItem, 1, () => {
            for (let index = 0; index < mapData.length; index++) {
                (() => {
                    const cellData = mapData[index];
                    if (cellData) {
                        gm.pool.async_get(BundleName.FIGHT, "prefabs/fight_map_item", FightMapItem, (mapItem) => {
                            mapItem.node.position = cellData.position;
                            mapItem.data = cellData;
                            this.map_node.addChild(mapItem.node, 0);
                            gm.data.fight_temp_data.is_debug;
                            mapItem.node.name = cc.js.formatStr("fight_map_item_%d", cellData.grid_index);
                            gm.data.fight_temp_data.map_item_array[cellData.cell_id] = mapItem;
                        });
                    }
                })();
            }
            this.show_guider_finger_anim()
        });

        if (gm.data.fight_temp_data.play_type < 2) {
            this.wave_ps.node.active = true;
            this.wave_ps.startColor = FightConstants.WAVE_START_COLOR_ARRAY[gm.data.fight_temp_data.play_type];
            this.wave_ps.endColor = FightConstants.WAVE_END_COLOR_ARRAY[gm.data.fight_temp_data.play_type];
        } else {
            this.wave_ps.node.active = false;
        }

    }
    
    private on_click_hide_guider(): void {
        this.fight_guider_node.active = false;
    }

    private show_guider_finger_anim(): void {
        if (13 != gm.data.mapCell_data.roleGuideVO.guideID || gm.data.mapCell_data.roleGuideVO.isEnd) {
            this.figerAni.active = false;
        } else {
            this.figerAni.active = gm.data.fight_temp_data.goto_battle_count < 2;
            if (this.figerAni.active) {
                const targetIndex = 1 == gm.data.fight_temp_data.goto_battle_count ? 39 : 38;
                const targetPosition = this.map_node.convertToWorldSpaceAR(cc.v2(this.map_node.getChildByName("fight_map_item_" + targetIndex).position));
                this.figerAni.position = this.scene_node.convertToNodeSpaceAR(cc.v3(targetPosition));
            }

            if (gm.data.mapCell_data.isGuide) {
                if (1 == gm.data.fight_temp_data.goto_battle_count) {
                    gm.channel.report_event("ohayoo_game_guide", {
                        guideid: 14,
                        guidedesc: cc.js.formatStr("14.点击上岛1个英雄")
                    });
                } else if (2 == gm.data.fight_temp_data.goto_battle_count) {
                    gm.channel.report_event("ohayoo_game_guide", {
                        guideid: 15,
                        guidedesc: cc.js.formatStr("15.点击上岛1个英雄")
                    });
                }
            }
        }
    }

    
    public update(deltaTime: number): void {
        const fightTempData = gm.data.fight_temp_data;
        if (fightTempData.fight_state == FightState.RUN) {
            fightTempData.delta_time = deltaTime * cc.director.getScheduler().getTimeScale();
            fightTempData.total_time += fightTempData.delta_time;
            this.update_hero_action();
            this.update_defense_hero_action();
            this.update_building_action();
            this.update_wall_action();
            this.update_buff_action();
            this.update_view();
            if (fightTempData.total_time > ConstantsData.instance.MAX_FIGHT_TIME) {
                this.fight_revive(true);
            }
        }
    }

    
    private apply_passive_skill_effect(): void {
        const fightTempData = gm.data.fight_temp_data;
        this.scheduleOnce(() => {
            for (let i = 0; i < fightTempData.wall_data_array.length; i++) {
                const wallItem = fightTempData.wall_item_array[i];
                const wallData = fightTempData.wall_data_array[i];

                if (wallData.skill_id > 0 && (!fightTempData.is_debug || wallData.skill_lv > 0)) {
                    const skillData = gm.config.get_row_data(
                        "SkillConfigData",
                        wallData.skill_id.toString(),
                        wallData.skill_lv.toString()
                    ) as SkillConfig;
                    if (skillData.skill_type == SkillType.PASSIVE) {
                        wallItem.apply_passive_skill(skillData);
                    }
                }
            }

            for (i = 0; i < fightTempData.defense_hero_data_array.length; i++) {
                this.common_hero_apply_passive_skill(fightTempData.defense_hero_data_array[i]);
            }

            for (i = 0; i < fightTempData.hero_data_array.length; i++) {
                this.common_hero_apply_passive_skill(fightTempData.hero_data_array[i]);
            }

            for (i = 0; i < fightTempData.passive_hero_data_array.length; i++) {
                this.passive_hero_apply_passive_skill(fightTempData.passive_hero_data_array[i]);
            }
        }, 3)
    }

    private passive_hero_apply_passive_skill(heroData: FightHeroItemData): void {
        const heroConfig = gm.config.get_row_data("HeroConfigData", heroData.id + "") as HeroConfig;
        const skillConfig = gm.config.get_row_data("SkillConfigData", heroData.skill_id + "", heroConfig.lv + "") as SkillConfig;

        if (skillConfig.skill_pos == SkillPos.MAIN_CITY) {
            const MainCity = gm.data.fight_temp_data.get_main_city();
            gm.data.fight_temp_data.building_item_array[MainCity.array_index];
            MainCity.max_hp += skillConfig.hp_add;
            MainCity.hp += skillConfig.hp_add;

            if ("" != skillConfig.skill_name) {
                gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + skillConfig.skill_name, NodePoolItem, (nodeItem) => {
                    this.effect_node.addChild(nodeItem.node);
                    nodeItem.node.scale = 0.5;
                    nodeItem.node.position = gm.data.fight_temp_data.grid_position_to_position(MainCity.grid_position);
                    const anim = nodeItem.getComponent(cc.Animation);
                    if (anim) {
                        anim.play();
                    }
                });
            }
        }
    }

    private common_hero_apply_passive_skill(hero: FightHeroItemData): void {
        const fightTempData = gm.data.fight_temp_data;
        if (hero && hero.hero_type == 1) {
            const heroConfig = gm.config.get_row_data("HeroConfigData", hero.id.toString()) as HeroConfig;
            for (let i = 0; i < hero.passive_skill_array.length; i++) {
                const passiveSkillId = hero.passive_skill_array[i];
                const skillConfig = gm.config.get_row_data("SkillConfigData", passiveSkillId.toString(), heroConfig.lv.toString()) as SkillConfig;
                if (skillConfig && skillConfig.skill_type == SkillType.PASSIVE) {
                    if (skillConfig.skill_pos == SkillPos.ALL_SELF_BODY) {
                        let affectedHeroes: FightHeroItemData[] = [];
                        if (hero.type == HeroType.ATTACK) {
                            affectedHeroes = fightTempData.hero_data_array;
                        } else {
                            affectedHeroes = fightTempData.defense_hero_data_array;
                        }

                        affectedHeroes.forEach((affectedHero) => {
                            if (affectedHero) {
                                affectedHero.passive_attack_bonus_ratio += skillConfig.damage_ratio;
                                affectedHero.passive_defense_bonus_ratio += skillConfig.defense_ratio;
                            }
                        });
                    } else {
                        // console.error("未实现的被动释放位置");
                        console.log("Vị trí thả thụ động chưa được thực hiện.");
                    }
                }
            }
        }
    }

    private handleHeroAction(num: number): string | { value: any } {
        const g = gm.data.fight_temp_data;
        const heroItem = gm.data.fight_temp_data.hero_item_array[num];

        if (null == heroItem) {
            return "continue";
        }

        const heroData = gm.data.fight_temp_data.hero_data_array[num];

        if (heroData.in_battle_state == HeroInBattleState.HAS_IN_BATTLE) {
            if (heroData.fight_state == HeroFightState.WAITING) {
                this.find_next_path(heroData);

            } else if (heroData.fight_state == HeroFightState.MOVING) {
                if (heroData.move_path.length <= 0) {
                    this.hero_move_one_grid_action(heroData);
                } else {
                    const moveTarget = heroData.move_path[0];
                    const targetPosition = g.grid_position_to_position(cc.v2(moveTarget.x, moveTarget.y)).add(heroData.offset);
                    const sub = targetPosition.sub(heroItem.node.position);
                    const distance = sub.mag();
                    const moveSpeed = g.delta_time * heroData.real_move_speed;
                    const angle = Math.atan2(sub.y, sub.x);

                    if (0 < distance && moveSpeed < distance) {
                        heroItem.node.position = heroItem.node.position.add(cc.v3(Math.cos(angle), Math.sin(angle)).mul(moveSpeed));

                    } else {
                        heroItem.node.position = targetPosition;
                        heroData.move_path.shift();
                        const _fightMapItem = g.get_fight_map_item(heroData.grid_position.x, heroData.grid_position.y);

                        if (_fightMapItem && _fightMapItem.data) {
                            _fightMapItem.data.remove_hero_index(heroData.array_index);
                        }
                        heroData.grid_index = moveTarget.x + moveTarget.y * g.map_size.x;
                        heroData.grid_position.x = moveTarget.x;
                        heroData.grid_position.y = moveTarget.y;
                        heroItem.node.zIndex = gm.data.fight_temp_data.get_dynamic_node_layer(heroData.grid_index, FightDynamicNodeLayer.MOVE);
                        this.hero_move_one_grid_action(heroData);
                    }
                    heroItem.play_spine_anim(heroData.move_path.length <= 0 ? "stay" : "move", angle);
                }

            } else if (heroData.fight_state == HeroFightState.ATTACKING) {
                const pathTarget = heroData.find_path_target;
                let targetNode: cc.Node;
                if (pathTarget) {

                    if (pathTarget instanceof FightBuildingItemData) {
                        const buidingItem = g.building_item_array[pathTarget.array_index];
                        if (buidingItem) {
                            targetNode = buidingItem.node;
                        }
                    } else if (pathTarget instanceof FightHeroItemData) {
                        const defenseHero = g.defense_hero_array[pathTarget.array_index];
                        if (defenseHero) {
                            targetNode = defenseHero.node;
                        }
                    } else if (pathTarget instanceof FightWallItemData) {
                        const wallItem = g.wall_item_array[pathTarget.array_index]
                        if (wallItem) {
                            targetNode = wallItem.node;
                        }
                    } else {
                        // cc.error("未知分支情况");
                        cc.error("trường hợp nhánh không xác định");
                    }


                    if (targetNode) {
                        const currentPosition = g.get_fight_map_item(heroData.grid_position.x, heroData.grid_position.y);
                        const targetPosition = g.get_fight_map_item(heroData.find_path_target.grid_position.x, heroData.find_path_target.grid_position.y);
                        if (currentPosition && targetPosition && targetPosition.node.position.sub(currentPosition.node.position).mag() > heroData.attack_range) {
                            heroData.find_path_target = null;
                            heroData.move_path = [];
                            heroData.fight_state = HeroFightState.WAITING;
                            return { value: undefined };
                        }

                        if (0 < heroData.attack_value && 0 < pathTarget.hp) {
                            if (0 == heroData.last_attack_time || g.total_time - heroData.last_attack_time > heroData.real_attack_interval) {
                                heroData.last_attack_time = g.total_time;
                                heroData.attack_count++;

                                const targetWorldPosition = g.grid_position_to_position(cc.v2(pathTarget.grid_position.x, pathTarget.grid_position.y));
                                const heroWorldPosition = g.grid_position_to_position(heroData.grid_position);
                                const directionVector = targetWorldPosition.sub(heroWorldPosition);
                                const attackAngle = Math.atan2(directionVector.y, directionVector.x);

                                if (heroData.attack_count % (FightConstants.SKILL_INTERVAL_NORMAL_ATTACK_COUNT + 1) == 0 && (gm.data.fight_temp_data.is_debug || 0 < heroData.skill_lv)) {
                                    const skillData = gm.config.get_row_data("SkillConfigData", heroData.skill_id + "", heroData.skill_lv + "") as SkillConfig;
                                    heroItem.play_skill_audio();

                                    heroItem.play_spine_anim("skill", attackAngle, false, skillData.fire_time, () => {
                                        if ("" != skillData.skill_name) {
                                            if (skillData.skill_pos == SkillPos.ENEMY_BODY || skillData.skill_pos == SkillPos.ALL_ENEMY_BODY) {
                                                if (skillData.skill_type == SkillType.FLY) {
                                                    heroItem.play_skill_fly_anim(skillData, targetNode, attackAngle, () => {
                                                        this.hero_skill_hit(heroData, pathTarget, skillData, () => {
                                                            const defenseHero = g.defense_hero_array[pathTarget.array_index]

                                                            if (pathTarget instanceof FightHeroItemData && defenseHero && defenseHero.data) {
                                                                this.common_hero_skill_hit_buff(skillData, heroItem, defenseHero, defenseHero.data.grid_position);
                                                            }
                                                        });
                                                    });
                                                } else {
                                                    this.hero_skill_hit(heroData, pathTarget, skillData, () => {
                                                        const defenseHero = g.defense_hero_array[pathTarget.array_index];

                                                        if (pathTarget instanceof FightHeroItemData && defenseHero && defenseHero.data) {
                                                            this.common_hero_skill_hit_buff(skillData, heroItem, defenseHero, defenseHero.data.grid_position);
                                                        }
                                                    });
                                                }
                                            } else {
                                                if (skillData.skill_pos == SkillPos.SELF_BODY || skillData.skill_pos == SkillPos.ALL_SELF_BODY) {
                                                    heroItem.play_skill_anim(skillData, targetNode, attackAngle, () => {
                                                        this.common_hero_skill_hit_buff(skillData, heroItem, null, null)
                                                    });

                                                } else {
                                                    if (!(skillData.skill_pos != SkillPos.ONE_CIRCLE_GRID && skillData.skill_pos != SkillPos.TWO_CIRCLE_GRID)) {
                                                        if (skillData.skill_type == SkillType.FLY) {
                                                            heroItem.play_skill_fly_anim(skillData, targetNode, attackAngle, () => {
                                                                this.hero_skill_hit(heroData, pathTarget, skillData, () => {
                                                                    const defenseHero = g.defense_hero_array[pathTarget.array_index];
                                                                    if (pathTarget instanceof FightHeroItemData) {
                                                                        if (defenseHero && defenseHero.data) {
                                                                            this.common_hero_skill_hit_buff(skillData, heroItem, defenseHero, defenseHero.data.grid_position);
                                                                        }
                                                                    } else {
                                                                        this.common_hero_skill_hit_buff(skillData, heroItem, null, pathTarget.grid_position);
                                                                    }
                                                                });
                                                            });
                                                        } else {
                                                            // console.error("TODO:暂时没有该分支的情况");
                                                            console.log("Hiện không có nhánh nào.");
                                                        }
                                                    }
                                                }
                                            }

                                        } else if ("" != skillData.hit_name) {
                                            if (skillData.skill_pos == SkillPos.ENEMY_BODY || skillData.skill_pos == SkillPos.ALL_ENEMY_BODY) {
                                                this.hero_skill_hit(heroData, pathTarget, skillData, () => {
                                                    const defenseHero = g.defense_hero_array[pathTarget.array_index];
                                                    if (pathTarget instanceof FightHeroItemData && defenseHero && defenseHero.data) {
                                                        this.common_hero_skill_hit_buff(skillData, heroItem, defenseHero, defenseHero.data.grid_position);
                                                    }
                                                });

                                            } else if (skillData.skill_pos == SkillPos.SELF_BODY || skillData.skill_pos == SkillPos.ALL_SELF_BODY) {
                                                this.hero_skill_hit(heroData, heroData, skillData, () => {
                                                    if (heroItem.data) {
                                                        this.common_hero_skill_hit_buff(skillData, heroItem, heroItem, heroItem.data.grid_position);
                                                    }
                                                });

                                                if (skillData.skill_pos == SkillPos.ALL_SELF_BODY) {
                                                    for (let index = 0; index < g.hero_item_array.length; index++) {
                                                        ((heroIndex) => {
                                                            const heroItem = g.hero_item_array[heroIndex];
                                                            const heroData = g.hero_data_array[heroIndex];
                                                            if (heroData && heroData != heroData) {
                                                                this.hero_skill_hit(heroData, heroData, skillData, () => {
                                                                    if (heroItem.data) {
                                                                        this.common_hero_skill_hit_buff(skillData, heroItem, heroItem, heroItem.data.grid_position);
                                                                    }
                                                                })
                                                            }
                                                        })(index);
                                                    }
                                                }
                                            }
                                        } else {
                                            const defenseHero = g.defense_hero_array[pathTarget.array_index]
                                            if (pathTarget instanceof FightHeroItemData) {
                                                defenseHero && defenseHero.data && this.common_hero_skill_hit_buff(skillData, heroItem, defenseHero, defenseHero.data.grid_position);
                                            } else {
                                                this.common_hero_skill_hit_buff(skillData, heroItem, null, null);
                                            }
                                        }
                                    }, skillData.prepare_skill_anim_time, () => {
                                        heroItem.play_spine_anim("stay", attackAngle);
                                    });

                                    if (skillData.prepare_skill_anim_time >= heroData.real_attack_interval) {
                                        // cc.error("英雄的攻击动画时间不能大于攻击间隔");
                                        cc.error("Thời gian hoạt ảnh tấn công của anh hùng không thể dài hơn khoảng thời gian tấn công.");
                                    }
                                } else {
                                    if (!targetNode) {
                                        heroData.find_path_target = null;
                                        heroData.move_path = [];
                                        heroData.fight_state = HeroFightState.WAITING;
                                        return "continue";
                                    }

                                    heroItem.play_attack_audio();
                                    heroItem.play_spine_anim("attack", attackAngle, false, heroData.fly_weapon_time, () => {
                                        if (heroData.attack_type == AttackType.REMOTE) {
                                            heroItem.play_weapon_fly_anim(targetNode, attackAngle, () => {
                                                this.hero_attack_hit(heroData, attackAngle, pathTarget);
                                            })
                                        } else {
                                            this.hero_attack_hit(heroData, attackAngle, pathTarget);
                                        }
                                    }, heroData.attack_anim_time, () => {
                                        heroItem.play_spine_anim("stay", attackAngle);
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

                } else {
                    cc.error("hero_data.find_path_target need != null");
                }

                heroData.find_path_target = null;
                heroData.move_path = [];
                heroData.fight_state = HeroFightState.WAITING;
            }
        }

    }

    private update_hero_action(): any {
        for (let index = 0; index < gm.data.fight_temp_data.hero_item_array.length; index++) {
            const heroAction = this.handleHeroAction(index);
            if (typeof heroAction === "object" && heroAction !== null && "value" in heroAction) {
                return heroAction.value;
            }
        }
    }


    private hero_move_one_grid_action(hero: FightHeroItemData): void {
        const fightTempData = gm.data.fight_temp_data;
        const currentMapItem = fightTempData.get_fight_map_item(hero.grid_position.x, hero.grid_position.y);

        if (currentMapItem && currentMapItem.data) {
            currentMapItem.pick_up_prop();
            const fightMapItem = currentMapItem.data.add_hero_index(hero.array_index);
            hero.offset = fightMapItem.offset;
        }

        if (hero.find_path_target instanceof FightPropItemData) {
            if (hero.move_path.length == 0) hero.fight_state = HeroFightState.WAITING;
        } else {
            let targetMapItem = fightTempData.get_fight_map_item(hero.find_path_target.grid_position.x, hero.find_path_target.grid_position.y);
            if (targetMapItem && targetMapItem.node.position.sub(currentMapItem.node.position).mag() <= hero.attack_range) {
                hero.fight_state = HeroFightState.ATTACKING;
                hero.move_path = [];
            }
        }
    }

    private hero_attack_hit(attacker: FightHeroItemData, angle: number, target: FightHeroItemData | FightBuildingItemData | FightWallItemData | FightPropItemData): void {
        const fightTempData = gm.data.fight_temp_data;
        let targetObject: FightHeroItem | FightBuildingItem | FightWallItem;
        if (target instanceof FightHeroItemData) {
            if (target.type == HeroType.ATTACK) {
                targetObject = fightTempData.hero_item_array[target.array_index];
            } else if (target.type == HeroType.DEFENSE) {
                targetObject = fightTempData.defense_hero_array[target.array_index];
            }
        } else if (target instanceof FightBuildingItemData) {
            targetObject = fightTempData.building_item_array[target.array_index];
            if (!target.lock_attack_target) target.lock_attack_target = attacker;
        } else if (target instanceof FightWallItemData) {
            targetObject = fightTempData.wall_item_array[target.array_index];
            if (!target.lock_attack_target) target.lock_attack_target = attacker;
        }
        if (targetObject) {
            targetObject.change_hp(-attacker.real_attack_value);
            let hitAnimation = "hit";
            const heroConfig = gm.config.get_row_data("HeroConfigData", `${attacker.id}`) as HeroConfig;
            if (heroConfig && heroConfig.hit_name) {
                hitAnimation = heroConfig.hit_name;
            }
            targetObject.play_hit_anim(targetObject.node, hitAnimation);

            if (target.hp <= 0) {
                if (target instanceof FightBuildingItemData) {
                    if (fightTempData.is_main_city(target.id)) {
                        for (let i = 0; i < fightTempData.building_data_array.length; i++) {
                            if (fightTempData.building_data_array[i] != target) {
                                const buildingItem = fightTempData.building_item_array[i];
                                if (buildingItem) buildingItem.put_to_pool();
                            }
                        }
                        this.fight_success();
                    }
                    fightTempData.grid.setWalkable(target.grid_position.x, target.grid_position.y, true);
                } else if (target instanceof FightWallItemData) {
                    fightTempData.grid.setWalkable(target.grid_position.x, target.grid_position.y, true);
                }
                targetObject.put_to_pool();
                attacker.find_path_target = null;
                attacker.move_path = [];
                attacker.fight_state = HeroFightState.WAITING;
            }
        }
    }

    private hero_skill_hit(attacker: FightHeroItemData, target: FightPropItemData | FightHeroItemData | FightBuildingItemData | FightWallItemData, skill: SkillConfig, callback: Function): void {
        const fightData = gm.data.fight_temp_data;
        let targetHero: FightHeroItem | FightBuildingItem | FightWallItem;
        if (target instanceof FightHeroItemData) {
            if (target.type == HeroType.ATTACK) {
                targetHero = fightData.hero_item_array[target.array_index] as FightHeroItem;
            } else if (target.type == HeroType.DEFENSE) {
                targetHero = fightData.defense_hero_array[target.array_index] as FightHeroItem;
            }
        } else if (target instanceof FightBuildingItemData) {
            targetHero = fightData.building_item_array[target.array_index];
            if (!target.lock_attack_target) {
                target.lock_attack_target = attacker;
            }
        } else if (target instanceof FightWallItemData) {
            targetHero = fightData.wall_item_array[target.array_index];
            if (!target.lock_attack_target) {
                target.lock_attack_target = attacker;
            }
        }
        if (targetHero && targetHero.data) {
            targetHero.change_hp(-attacker.real_attack_value * skill.damage_ratio);
            if (skill.hit_name != "") {
                if (skill.skill_pos == SkillPos.ONE_CIRCLE_GRID || skill.skill_pos == SkillPos.TWO_CIRCLE_GRID) {
                    let gridPosition = targetHero.data.grid_position;
                    let range = 0;
                    if (skill.skill_pos == SkillPos.ONE_CIRCLE_GRID) {
                        range = 1;
                    } else if (skill.skill_pos == SkillPos.TWO_CIRCLE_GRID) {
                        range = 2;
                    }
                    for (let x = gridPosition.x - range; x <= gridPosition.x + range; x++) {
                        for (let y = gridPosition.y - range; y <= gridPosition.y + range; y++) {
                            let mapItem = fightData.get_fight_map_item(x, y);
                            if (mapItem && mapItem.data) {
                                targetHero.play_skill_hit_anim(
                                    mapItem.land_node,
                                    skill.hit_name,
                                    gm.ui.fight.map_node,
                                    fightData.get_dynamic_node_layer(mapItem.data.grid_index, FightDynamicNodeLayer.FIRE_EFFECT)
                                );
                            }
                        }
                    }
                } else {
                    targetHero.play_skill_hit_anim(targetHero.node, skill.hit_name);
                }
            }
            this.scheduleOnce(() => {
                callback();
            }, 0.3);
            if (target.hp <= 0) {
                if (target instanceof FightBuildingItemData) {
                    if (fightData.is_main_city(target.id)) {
                        for (let i = 0; i < fightData.building_data_array.length; i++) {
                            if (fightData.building_data_array[i] != target) {
                                let building = fightData.building_item_array[i];
                                if (building) building.put_to_pool();
                            }
                        }
                        this.fight_success();
                    }
                    fightData.grid.setWalkable(target.grid_position.x, target.grid_position.y, true);
                } else if (target instanceof FightWallItemData) {
                    fightData.grid.setWalkable(target.grid_position.x, target.grid_position.y, true);
                }

                targetHero.put_to_pool();
                attacker.find_path_target = null;
                attacker.move_path = [];
                attacker.fight_state = HeroFightState.WAITING;
            }
        }
    }

    private defense_hero_skill_hit(attacker: FightHeroItemData, defender: FightHeroItemData, skill: SkillConfig, callback: Function): void {
        let targetHero: FightHeroItem;
        const fightData = gm.data.fight_temp_data;
        if (defender instanceof FightHeroItemData) {
            targetHero = fightData.hero_item_array[defender.array_index];
        }

        if (targetHero && targetHero.data) {
            targetHero.change_hp(-attacker.real_attack_value * skill.damage_ratio);
            if (skill.hit_name != "") {
                if (skill.skill_pos == SkillPos.ONE_CIRCLE_GRID || skill.skill_pos == SkillPos.TWO_CIRCLE_GRID) {
                    const gridPosition = targetHero.data.grid_position;
                    let range = 0;
                    if (skill.skill_pos == SkillPos.ONE_CIRCLE_GRID) {
                        range = 1;
                    } else if (skill.skill_pos == SkillPos.TWO_CIRCLE_GRID) {
                        range = 2;
                    }
                    for (let x = gridPosition.x - range; x <= gridPosition.x + range; x++) {
                        for (let y = gridPosition.y - range; y <= gridPosition.y + range; y++) {
                            const mapItem = fightData.get_fight_map_item(x, y);
                            if (mapItem && mapItem.data) {
                                targetHero.play_skill_hit_anim(
                                    mapItem.land_node,
                                    skill.hit_name,
                                    gm.ui.fight.map_node,
                                    fightData.get_dynamic_node_layer(mapItem.data.grid_index, FightDynamicNodeLayer.FIRE_EFFECT)
                                );
                            }
                        }
                    }
                } else {
                    targetHero.play_skill_hit_anim(targetHero.node, skill.hit_name);
                }
            }
            if (defender.find_path_target instanceof FightBuildingItemData) {
                const building = defender.find_path_target;
                if (building.hp / building.max_hp >= 0.45) {
                    if (this.find_next_path_distance(defender.grid_position, attacker.grid_position) != Number.MAX_SAFE_INTEGER) {
                        this.find_next_path(defender, attacker);
                    }
                }
            }

            this.scheduleOnce(() => {
                callback();
            }, 0.3);

            if (defender.hp <= 0) {
                targetHero.put_to_pool();
                fightData.death_hero_count++;
                attacker.move_path = [];
                attacker.find_path_target = null;
                attacker.fight_state = HeroFightState.WAITING;

                if (fightData.death_hero_count >= fightData.hero_data_array.length) {
                    this.fight_revive(false);
                }
            }
        }
    }

    private common_hero_skill_hit_buff(skill: SkillConfig, caster: FightHeroItem, target: FightHeroItem, position: cc.Vec2): void {
        const fightData = gm.data.fight_temp_data;
        const affectedUnits: FightHeroItem[] = [];
        if (skill.skill_pos == SkillPos.ENEMY_BODY && target) {
            affectedUnits.push(target);
        } else if (skill.skill_pos == SkillPos.ALL_ENEMY_BODY) {
            for (let i = 0; i < fightData.defense_hero_array.length; i++) {
                const enemyHero = fightData.defense_hero_array[i];
                if (enemyHero) affectedUnits.push(enemyHero);
            }
        } else if (skill.skill_pos == SkillPos.SELF_BODY) {
            affectedUnits.push(caster);
        } else if (skill.skill_pos == SkillPos.ALL_SELF_BODY) {
            for (let i = 0; i < fightData.hero_item_array.length; i++) {
                const allyHero = fightData.hero_item_array[i];
                if (allyHero && allyHero.data && allyHero.data.hp > 0 && allyHero.data.in_battle_state == HeroInBattleState.HAS_IN_BATTLE) {
                    affectedUnits.push(allyHero);
                }
            }
        } else if ((skill.skill_pos == SkillPos.ONE_CIRCLE_GRID || skill.skill_pos == SkillPos.TWO_CIRCLE_GRID) && position) {
            if (!caster.data) return;
            const potentialTargets = caster.data.type == HeroType.ATTACK ? fightData.defense_hero_array : fightData.hero_item_array;
            const range = skill.skill_pos == SkillPos.ONE_CIRCLE_GRID ? 1 : 2;
            for (let i = 0; i < potentialTargets.length; i++) {
                const nearbyHero = potentialTargets[i];
                if (nearbyHero && nearbyHero.data) {
                    const { x, y } = nearbyHero.data.grid_position;
                    if (x >= position.x - range && x <= position.x + range && y >= position.y - range && y <= position.y + range) {
                        affectedUnits.push(nearbyHero);
                    }
                }
            }
        }

        for (let i = 0; i < skill.effect_array.length; i++) {
            const effect = skill.effect_array[i];
            if (Math.random() < effect.trigger_ratio) {
                const buff = new BuffItemData();
                buff.id = effect.skill_effect_id;
                switch (buff.id) {
                    case SkillEffectId.REDUCE_DAMAGE:
                        buff.reduce_damage_ratio = effect.value;
                        buff.max_trigger_count = 1;
                        buff.is_start = true;
                        buff.is_end = false;
                        break;
                    case SkillEffectId.ATTACK_SPEED_UP:
                        buff.attack_speed_ratio = effect.value;
                        buff.max_trigger_count = 1;
                        buff.is_start = true;
                        buff.is_end = false;
                        break;
                    case SkillEffectId.ATTACK_BONUS:
                        buff.attack_bonus_ratio = effect.value;
                        buff.max_trigger_count = 1;
                        buff.is_start = true;
                        buff.is_end = false;
                        break;
                    case SkillEffectId.DIZZINESS:
                        buff.damage_value = 0;
                        buff.move_speed_scale = effect.value;
                        buff.max_trigger_count = 1;
                        buff.is_start = true;
                        buff.is_end = false;
                        break;
                    case SkillEffectId.DEFENSE_BONUS:
                        buff.defense_bonus_ratio = effect.value;
                        buff.max_trigger_count = 1;
                        buff.is_start = true;
                        buff.is_end = false;
                        break;
                    case SkillEffectId.RESTORE_HP:
                        buff.restore_hp_ratio = effect.value;
                        buff.max_trigger_count = Math.ceil(effect.duration);
                        buff.is_start = true;
                        buff.is_end = false;
                        break;
                    case SkillEffectId.FIRE:
                        buff.max_trigger_count = Math.ceil(effect.duration);
                        if (caster.data) {
                            buff.damage_value = Math.ceil((effect.value * caster.data.real_attack_value) / buff.max_trigger_count);
                        }
                        buff.is_start = false;
                        buff.is_end = true;
                        break;
                    case SkillEffectId.REDUCE_SPEED:
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

                for (let k = 0; k < affectedUnits.length; k++) {
                    affectedUnits[k].add_buff_data(buff);
                }
            }

        }
    }

    private processHeroAction(heroIndex: number): string | { value: any } {
        const fightData = gm.data.fight_temp_data;
        const defenseHero = fightData.defense_hero_array[heroIndex];

        if (null == defenseHero) {
            return "continue";
        }

        const defenseData = fightData.defense_hero_data_array[heroIndex];
        if (defenseData.fight_state == HeroFightState.WAITING) {
            this.find_next_path(defenseData);

        } else if (defenseData.fight_state == HeroFightState.MOVING) {
            if (defenseData.move_path.length <= 0) {
                this.defense_hero_move_one_grid_action(defenseData);
            } else {
                const nextPosition = defenseData.move_path[0];
                const targetPosition = fightData.grid_position_to_position(cc.v2(nextPosition.x, nextPosition.y)).add(defenseData.offset);
                const movementVector = targetPosition.sub(defenseHero.node.position);
                const distanceToTarget = movementVector.mag();
                const moveDistance = fightData.delta_time * defenseData.real_move_speed;
                const angle = Math.atan2(movementVector.y, movementVector.x);

                if (0 < distanceToTarget && moveDistance < distanceToTarget) {
                    defenseHero.node.position = defenseHero.node.position.add(cc.v3(Math.cos(angle), Math.sin(angle)).mul(moveDistance));
                } else {
                    defenseHero.node.position = targetPosition;
                    defenseData.move_path.shift();

                    const gridItem = fightData.get_fight_map_item(defenseData.grid_position.x, defenseData.grid_position.y);
                    if (gridItem && gridItem.data) {
                        gridItem.data.remove_defense_hero_index(defenseData.array_index);
                    }

                    defenseData.grid_index = nextPosition.x + nextPosition.y * fightData.map_size.x;
                    defenseData.grid_position.x = nextPosition.x;
                    defenseData.grid_position.y = nextPosition.y;
                    defenseHero.node.zIndex = gm.data.fight_temp_data.get_dynamic_node_layer(defenseData.grid_index, FightDynamicNodeLayer.MOVE);
                    this.defense_hero_move_one_grid_action(defenseData);
                }
                defenseHero.play_spine_anim(defenseData.move_path.length <= 0 ? "stay" : "move", angle);
            }

        } else if (defenseData.fight_state == HeroFightState.ATTACKING) {
            const target = defenseData.find_path_target as FightHeroItemData;
            if (target) {
                const targetHero = fightData.hero_item_array[target.array_index];
                if (targetHero && targetHero.node) {
                    const attackerPosition = fightData.get_fight_map_item(defenseData.grid_position.x, defenseData.grid_position.y);
                    const targetPosition = fightData.get_fight_map_item(target.grid_position.x, target.grid_position.y);
                    if (attackerPosition && targetPosition && targetPosition.node.position.sub(attackerPosition.node.position).mag() > defenseData.attack_range) {
                        defenseData.find_path_target = null;
                        defenseData.move_path = [];
                        defenseData.fight_state = HeroFightState.WAITING;
                        return {
                            value: undefined
                        };
                    }

                    if (0 < defenseData.attack_value && 0 < target.hp) {
                        if (0 == defenseData.last_attack_time || fightData.total_time - defenseData.last_attack_time > defenseData.real_attack_interval) {
                            defenseData.last_attack_time = fightData.total_time;
                            defenseData.attack_count++;
                            const targetGridPosition = target.grid_position;
                            const targetWorldPosition = fightData.grid_position_to_position(cc.v2(targetGridPosition.x, targetGridPosition.y));
                            const directionVector = targetWorldPosition.sub(defenseHero.node.position);
                            const attackAngle = Math.atan2(directionVector.y, directionVector.x);

                            if (targetHero) {
                                const heroNode = targetHero.node;
                                if (defenseData.attack_count % (FightConstants.SKILL_INTERVAL_NORMAL_ATTACK_COUNT + 1) == 0 && (gm.data.fight_temp_data.is_debug || 0 < defenseData.skill_lv && 0 < defenseData.skill_id)) {
                                    const skillConfig = gm.config.get_row_data("SkillConfigData", defenseData.skill_id + "", defenseData.skill_lv + "") as SkillConfig;
                                    if (!skillConfig) {
                                        return {
                                            value: undefined
                                        };
                                    }

                                    defenseHero.play_skill_audio();
                                    defenseHero.play_spine_anim("skill", attackAngle, false, skillConfig.fire_time, () => {
                                        if ("" != skillConfig.skill_name) {
                                            if (skillConfig.skill_pos == SkillPos.ENEMY_BODY || skillConfig.skill_pos == SkillPos.ALL_ENEMY_BODY) {
                                                if (skillConfig.skill_type == SkillType.FLY) {
                                                    defenseHero.play_skill_fly_anim(skillConfig, heroNode, attackAngle, () => {
                                                        this.defense_hero_skill_hit(defenseData, target, skillConfig, () => {
                                                            const heroItem = fightData.hero_item_array[target.array_index];
                                                            if (target instanceof FightHeroItemData && heroItem && heroItem.data) {
                                                                this.common_hero_skill_hit_buff(skillConfig, defenseHero, heroItem, heroItem.data.grid_position);
                                                            }
                                                        });
                                                    });
                                                } else {
                                                    this.defense_hero_skill_hit(defenseData, target, skillConfig, () => {
                                                        const heroItem = fightData.hero_item_array[target.array_index];
                                                        if (target instanceof FightHeroItemData && heroItem && heroItem.data) {
                                                            this.common_hero_skill_hit_buff(skillConfig, defenseHero, heroItem, heroItem.data.grid_position);
                                                        }
                                                    })
                                                }
                                            } else {
                                                if (!(skillConfig.skill_pos != SkillPos.SELF_BODY && skillConfig.skill_pos != SkillPos.ALL_SELF_BODY)) { ///can than
                                                    defenseHero.play_skill_anim(skillConfig, heroNode, attackAngle, () => {
                                                        const heroItem = fightData.hero_item_array[target.array_index];
                                                        if (target instanceof FightHeroItemData && heroItem && heroItem.data) {
                                                            this.common_hero_skill_hit_buff(skillConfig, defenseHero, heroItem, heroItem.data.grid_position);
                                                        }
                                                    });
                                                }
                                            }
                                        } else if ("" != skillConfig.hit_name) {
                                            if (skillConfig.skill_pos == SkillPos.ENEMY_BODY || skillConfig.skill_pos == SkillPos.ALL_ENEMY_BODY) {
                                                this.defense_hero_skill_hit(defenseData, target, skillConfig, () => {
                                                    const heroItem = fightData.hero_item_array[target.array_index];
                                                    if (target instanceof FightHeroItemData && heroItem && heroItem.data) {
                                                        this.common_hero_skill_hit_buff(skillConfig, defenseHero, heroItem, heroItem.data.grid_position);
                                                    }
                                                });
                                            } else if (skillConfig.skill_pos == SkillPos.SELF_BODY || skillConfig.skill_pos == SkillPos.ALL_SELF_BODY) {
                                                this.defense_hero_skill_hit(defenseData, defenseData, skillConfig, () => {
                                                    defenseHero.data && this.common_hero_skill_hit_buff(skillConfig, defenseHero, defenseHero, defenseHero.data.grid_position)
                                                });

                                                if (skillConfig.skill_pos == SkillPos.ALL_SELF_BODY) {
                                                    for (let index = 0; index < fightData.defense_hero_array.length; index++) {
                                                        ((index) => {
                                                            const defenseHero = fightData.defense_hero_array[index];
                                                            const defenseHeroData = fightData.defense_hero_data_array[index]
                                                            if (defenseHeroData && defenseHeroData != defenseData) {
                                                                this.hero_skill_hit(defenseHeroData, defenseHeroData, skillConfig, () => {
                                                                    if (defenseHero.data) {
                                                                        this.common_hero_skill_hit_buff(skillConfig, defenseHero, defenseHero, defenseHero.data.grid_position);
                                                                    }
                                                                })
                                                            }
                                                        })(index)
                                                    }
                                                }
                                            }
                                        } else {
                                            const heroItem = fightData.hero_item_array[target.array_index];
                                            if (target instanceof FightHeroItemData) {
                                                heroItem && heroItem.data && this.common_hero_skill_hit_buff(skillConfig, defenseHero, heroItem, heroItem.data.grid_position);
                                            } else {
                                                this.common_hero_skill_hit_buff(skillConfig, defenseHero, null, null);
                                            }
                                        }
                                    }, skillConfig.prepare_skill_anim_time, () => {
                                        targetHero.play_spine_anim("stay", attackAngle);
                                    });

                                    if (skillConfig.prepare_skill_anim_time >= defenseData.real_attack_interval) {
                                        // cc.error("英雄的攻击动画时间不能大于攻击间隔");
                                        cc.error("Thời gian hoạt ảnh tấn công của anh hùng không thể dài hơn khoảng thời gian tấn công.");
                                    }

                                } else {
                                    defenseHero.play_attack_audio();
                                    defenseHero.play_spine_anim("attack", attackAngle, false, defenseData.fly_weapon_time, () => {
                                        if (defenseData.attack_type == AttackType.REMOTE) {
                                            defenseHero.play_weapon_fly_anim(heroNode, attackAngle, () => {
                                                this.defense_hero_attack_hit(defenseHero, defenseData, attackAngle, target as FightHeroItemData)
                                            });
                                        } else {
                                            this.defense_hero_attack_hit(defenseHero, defenseData, attackAngle, target as FightHeroItemData);
                                        }
                                    }, defenseData.attack_anim_time, () => {
                                        defenseHero.play_spine_anim("stay", attackAngle);
                                    });

                                    if (defenseData.attack_anim_time >= defenseData.real_attack_interval) {
                                        // cc.error("防守英雄的攻击动画时间不能大于攻击间隔");
                                        cc.error("Thời gian hoạt ảnh tấn công của anh hùng phòng thủ không thể dài hơn khoảng thời gian tấn công.");
                                    }
                                }
                            }
                        }
                        return "continue"
                    }
                }
            } else {
                cc.error("defense_hero_data.find_path_target need != null");
            }
            defenseData.move_path = [];
            defenseData.find_path_target = null;
            defenseData.fight_state = HeroFightState.WAITING;
        }
    }

    private update_defense_hero_action(): any {
        const defenseHeroArr = gm.data.fight_temp_data.defense_hero_array;
        for (let index = 0; index < defenseHeroArr.length; index++) {
            const heroAct = this.processHeroAction(index);
            if (typeof heroAct === "object" && heroAct != undefined && "value" in heroAct) {
                return heroAct.value;
            }
        }
    }

    private defense_hero_move_one_grid_action(heroData: FightHeroItemData) {
        const fightTempData = gm.data.fight_temp_data;
        const currentGridItem = fightTempData.get_fight_map_item(heroData.grid_position.x, heroData.grid_position.y);
        if (currentGridItem && currentGridItem.data) {
            const gridItemData = currentGridItem.data.add_defense_hero_index(heroData.array_index);
            heroData.offset = gridItemData.offset;
            const targetItem = heroData.find_path_target;
            if (targetItem instanceof FightHeroItemData) {
                const targetPosition = fightTempData.get_fight_map_item(targetItem.grid_position.x, targetItem.grid_position.y).node.position;
                const distanceToTarget = targetPosition.sub(currentGridItem.node.position).mag();
                if (distanceToTarget <= heroData.attack_range) {
                    heroData.fight_state = HeroFightState.ATTACKING;
                    heroData.move_path = [];
                }
            }
        }
    }

    private defense_hero_attack_hit(attacker: FightHeroItem, attackData: FightHeroItemData, attackAngle: number, targetData: FightHeroItemData): void {
        const fightTempData = gm.data.fight_temp_data;
        const targetHero = fightTempData.hero_item_array[targetData.array_index];
        if (targetHero) {
            targetHero.change_hp(-attackData.real_attack_value);

            if (targetData.find_path_target instanceof FightBuildingItemData &&
                targetData.find_path_target.hp / targetData.find_path_target.max_hp >= 0.45 &&
                this.find_next_path_distance(targetData.grid_position, attackData.grid_position) != Number.MAX_SAFE_INTEGER
            ) {
                this.find_next_path(targetData, attackData);
            }

            let hitAnimationName = "hit";
            const heroConfigData = gm.config.get_row_data("HeroConfigData", attackData.id.toString()) as HeroConfig;
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
                attackData.fight_state = HeroFightState.WAITING;

                if (fightTempData.death_hero_count >= fightTempData.hero_data_array.length) {
                    this.fight_revive(false);
                }
            }
        }
    }

    private update_building_action(): void {
        const fightTempData = gm.data.fight_temp_data;
        for (let index = 0; index < fightTempData.building_data_array.length; index++) {
            const buildingItem = fightTempData.building_item_array[index];
            const buildingData = fightTempData.building_data_array[index];

            if (buildingItem && buildingData && buildingData.attack_value > 0) {
                let target: FightHeroItemData | null = buildingData.lock_attack_target;

                if (target) {
                    const targetHero = fightTempData.hero_item_array[target.array_index];

                    if (targetHero) {
                        const targetGridPosition = fightTempData.grid_position_to_position(cc.v2(target.grid_position.x, target.grid_position.y));
                        const buildingGridPosition = fightTempData.grid_position_to_position(cc.v2(buildingData.grid_position.x, buildingData.grid_position.y));
                        const directionVector = targetGridPosition.sub(buildingGridPosition);
                        const attackAngle = Math.atan2(directionVector.y, directionVector.x);

                        if (directionVector.mag() < buildingData.attack_range && target.hp > 0) {
                            if (buildingData.last_attack_time == 0 || fightTempData.total_time - buildingData.last_attack_time > buildingData.attack_interval) {
                                if (buildingData.attack_type == AttackType.REMOTE) {
                                    buildingItem.play_weapon_fly_anim(targetHero.node, attackAngle, () => {
                                        this.building_attack_hit(buildingData, target);
                                    });
                                }
                                buildingData.last_attack_time = fightTempData.total_time;
                            }
                        } else {
                            buildingData.lock_attack_target = this.find_building_attack_target(buildingData);
                        }
                    } else {
                        buildingData.lock_attack_target = this.find_building_attack_target(buildingData);
                    }
                } else {
                    buildingData.lock_attack_target = this.find_building_attack_target(buildingData);
                }
            }
        }
    }

    private building_attack_hit(buildingData: FightBuildingItemData, targetHeroData: FightHeroItemData): void {
        const fightTempData: FightTempData = gm.data.fight_temp_data;
        const targetHeroItem = fightTempData.hero_item_array[targetHeroData.array_index];
        if (!targetHeroItem) return;
        targetHeroItem.change_hp(-buildingData.attack_value);
        targetHeroItem.play_hit_anim(targetHeroItem.node);

        if (targetHeroData.hp <= 0) {
            targetHeroItem.put_to_pool();
            fightTempData.death_hero_count++;

            if (fightTempData.death_hero_count >= fightTempData.hero_data_array.length) {
                this.fight_revive(false);
            }
        }
    }

    private update_wall_action(): void {
        const fightTempData: FightTempData = gm.data.fight_temp_data;
        for (let i = 0; i < fightTempData.wall_data_array.length; i++) {
            const wallItem = fightTempData.wall_item_array[i];
            const wallData: FightWallItemData = fightTempData.wall_data_array[i]
            if (wallItem && wallData && wallData.attack_value > 0) {
                wallItem.data = wallData;

                const attackTarget = wallData.lock_attack_target;
                if (attackTarget) {
                    const targetHeroItem = fightTempData.hero_item_array[attackTarget.array_index];
                    if (targetHeroItem) {
                        const targetPos = fightTempData.grid_position_to_position(cc.v2(attackTarget.grid_position.x, attackTarget.grid_position.y));
                        const wallPos = wallItem.node.position;
                        const directionVector = targetPos.sub(wallPos);
                        const angle = Math.atan2(directionVector.y, directionVector.x);

                        if (directionVector.mag() < wallData.attack_range && attackTarget.hp > 0) {
                            if (wallData.last_attack_time == 0 || (fightTempData.total_time - wallData.last_attack_time > wallData.attack_interval)) {
                                wallData.last_attack_time = fightTempData.total_time;
                                wallItem.play_attack_audio();
                                wallItem.play_spine_anim(angle, wallData.fly_weapon_time, () => {
                                    if (wallData.attack_type == AttackType.REMOTE) {
                                        wallItem.play_weapon_fly_anim(targetHeroItem.node, angle, () => {
                                            this.wall_attack_hit(wallData, attackTarget);
                                        });
                                    } else {
                                        this.wall_attack_hit(wallData, attackTarget);
                                    }
                                });
                            }
                        } else {
                            wallData.lock_attack_target = this.find_building_attack_target(wallData);
                        }
                    }
                } else {
                    wallData.lock_attack_target = this.find_building_attack_target(wallData);
                }
            }
        }

    }

    private wall_attack_hit(wallData: FightWallItemData, targetHeroData: FightHeroItemData): void {
        const fightTempData: FightTempData = gm.data.fight_temp_data;
        const targetHero = fightTempData.hero_item_array[targetHeroData.array_index];

        if (targetHero) {
            const skillConfig = gm.config.get_row_data("SkillConfigData", `${wallData.skill_id}`, `${wallData.skill_lv}`) as SkillConfig;
            this.common_hero_skill_hit_buff(skillConfig, null, targetHero, targetHero.data.grid_position);

            targetHero.change_hp(-wallData.real_attack_value);

            let hitAnimation = "hit";
            const heroConfig = gm.config.get_row_data("HeroConfigData", `${wallData.id}`) as HeroConfig;
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
    }

    private update_buff_action(): void {
        const fightTempData: FightTempData = gm.data.fight_temp_data;

        for (let i = 0; i < fightTempData.hero_item_array.length; i++) {
            const hero = fightTempData.hero_item_array[i];
            if (hero) {
                hero.check_hero_buff(fightTempData.total_time);
            }
        }

        for (let i = 0; i < fightTempData.defense_hero_array.length; i++) {
            const defenseHero = fightTempData.defense_hero_array[i];
            if (defenseHero) {
                defenseHero.check_hero_buff(fightTempData.total_time);
            }
        }
    }

    private update_view(): void {
        const fightTempData: FightTempData = gm.data.fight_temp_data;
        const fightData: FightData = gm.data.fight_data;
        const mapCellData = gm.data.mapCell_data;

        this.name_lbl.string = fightTempData.name;

        this.hero_list.setData(fightTempData.hero_data_array);

        this.speed_1_btn.node.active = fightData.speed_scale == gm.const.FIGHT_SPEED_X1 && !mapCellData.isGuide;
        this.speed_2_btn.node.active = fightData.speed_scale == gm.const.FIGHT_SPEED_X2 && !mapCellData.isGuide;

        this.left_sec_lbl.string = Utils.time_format(fightTempData.left_fight_time, "mm:ss");

        const shouldShowReturnBtn = !mapCellData.isGuide && fightTempData.show_return_btn_timestamp > 0 && Date.now() > fightTempData.show_return_btn_timestamp;
        this.return_btn.node.active = shouldShowReturnBtn;
    }

    private fight_start(): void {
        const fightData: FightData = gm.data.fight_data;
        const fightTempData: FightTempData = gm.data.fight_temp_data;

        fightData.fight_count++;
        fightData.async_write_data();

        const heroData = fightTempData.hero_data_array[0];
        heroData.in_battle_state = HeroInBattleState.WILL_IN_BATTLE;
        fightTempData.in_battle_hero_data = heroData;

        gm.data.event_emitter.emit("fight_in_battle", heroData);

        this.reward_list.setData(fightTempData.reward_data_array);

        this.scheduleOnce(() => {
            cc.director.getScheduler().setTimeScale(fightData.speed_scale);
            gm.audio.play_effect(gm.const.AUDIO_18_FIGHT_TIME);

            switch (fightTempData.play_type) {
                case 0:
                    gm.audio.play_music(gm.const.AUDIO_93_FIGHT_MUSIC);
                    break;
                case 1:
                    gm.audio.play_music(gm.const.AUDIO_96_ISLAND_MUSIC);
                    break;
                case 2:
                    gm.audio.play_music(gm.const.AUDIO_95_CAVES_MUSIC);
                    break;
            }

            if (fightTempData.play_type == 0 || fightTempData.play_type == 1) {
                this.boat_node.active = true;
                this.boat_node.position = fightTempData.boat_start_position;
                Utils.async_set_sprite_frame(this.boat_spr, BundleName.MAP, "res/build/" + fightTempData.boat_id);
                this.boat_anim.once(cc.Animation.EventType.FINISHED, () => {
                    this.boat_anim.play("ship_normal");
                    fightTempData.fight_state = FightState.RUN;
                    this.apply_passive_skill_effect();
                });
                this.boat_anim.play("ship_in");
            } else {
                this.boat_node.active = false;
                fightTempData.fight_state = FightState.RUN;
                this.apply_passive_skill_effect();
            }

            if (gm.data.record_data.record_state != 1) {
                gm.channel.record_start();
                gm.data.record_data.record_state = 1;
                gm.data.record_data.record_type = 0;
                gm.data.record_data.record_timestamp = Date.now();
                gm.data.event_emitter.emit(RecordData.RECORD_STATE_CHANGE);
            }
        }, 0);
    }

    private fight_success(): void {
        const fightTempData: FightTempData = gm.data.fight_temp_data;
        if (fightTempData.play_type <= 1) {
            gm.data.ladder_data.fail_count = 0;
            gm.data.ladder_data.async_write_data();
        } else if (fightTempData.play_type == 2) {
            gm.channel.report_event("cave_layer", {
                event_desc: cc.js.formatStr("洞窟过关%d层人数", gm.data.fight_data.caves_layer),
                desc: cc.js.formatStr("洞窟通关第%d层人数", gm.data.fight_data.caves_layer),
                layer: gm.data.fight_data.caves_layer
            });
            gm.data.fight_data.caves_layer++;
            gm.data.fight_data.async_write_data();
        }

        fightTempData.fight_state = FightState.SUCCESS;
        const timeScaleSuffix = cc.director.getScheduler().getTimeScale() == gm.const.FIGHT_SPEED_X2 ? "_x2" : "";
        for (let i = fightTempData.hero_item_array.length - 1; i >= 0; i--) {
            const heroItem = fightTempData.hero_item_array[i];
            if (heroItem && heroItem.data && heroItem.data.id > 0) {
                const heroConfig = gm.config.get_row_data("HeroConfigData", heroItem.data.id.toString()) as HeroConfig;
                if (heroConfig?.success_audio) {
                    gm.audio.play_effect(heroConfig.success_audio + timeScaleSuffix);
                }
            }
        }

        gm.audio.play_effect(gm.const.AUDIO_21_FIGHT_SUCCESS);
        cc.director.getScheduler().setTimeScale(gm.const.FIGHT_SPEED_X1);

        this.update_view();

        this.scheduleOnce(() => {
            fightTempData.hero_item_array.forEach((heroItem, index) => {
                this.scheduleOnce(() => {
                    this.hero_jump_to_boat(heroItem);
                }, 0.05 * index);
            });
        }, 0.5);

        this.scheduleOnce(() => {
            fightTempData.build_fight_result_data();
            this.fight_clear();

            if (gm.data.fight_temp_data.play_type == 0) {
                gm.channel.report_event("fight", {
                    event_desc: "突袭",
                    desc: "成功"
                });
                ReportData.instance.report_once_point(10823);
                ReportData.instance.report_point(10824);
            } else if (gm.data.fight_temp_data.play_type == 2) {
                gm.channel.report_event("attack_caves", {
                    event_desc: "攻打洞窟",
                    layer: gm.data.fight_data.caves_layer,
                    desc: cc.js.formatStr("通关洞窟%d层", gm.data.fight_data.caves_layer)
                });
                ReportData.instance.report_once_point(10900 + gm.data.fight_data.caves_layer);
            }

            // Nếu đang hướng dẫn, gửi sự kiện báo cáo hướng dẫn
            if (gm.data.mapCell_data.isGuide) {
                gm.channel.report_event("ohayoo_game_guide", {
                    guideid: 16,
                    guidedesc: cc.js.formatStr("16.进入战斗结算界面")
                });
            }

            gm.ui.show_panel(gm.const.FightResult);
        }, 2);
    }

    private fight_revive(isRevive: boolean): void {
        const fightTempData: FightTempData = gm.data.fight_temp_data;
        if (!isRevive) {
            gm.data.fight_temp_data.fight_state = FightState.REVIVE;
            gm.ui.set_module_args(gm.const.FightReviveHero.key, {
                callback: (choice: number) => {
                    if (choice == 0) {
                        for (let i = fightTempData.hero_item_array.length - 1; i >= 0; i--) {
                            const heroItem = fightTempData.hero_item_array.pop();
                            if (heroItem) {
                                heroItem.reset();
                                gm.pool.put(heroItem.node);
                            }
                        }

                        for (let i = fightTempData.reward_data_array.length - 1; i >= 0; i--) {
                            const reward = fightTempData.reward_data_array[i];
                            if (reward.id > 22000 && reward.id < 23000) {
                                fightTempData.reward_data_array.splice(i, 1);
                            }
                        }

                        fightTempData.goto_battle_count = 0;
                        fightTempData.death_hero_count = 0;
                        fightTempData.total_time = 0;
                        fightTempData.hero_data_array = [];
                        fightTempData.build_hero_array(true);

                        const firstHero = fightTempData.hero_data_array[0];
                        firstHero.in_battle_state = HeroInBattleState.WILL_IN_BATTLE;
                        fightTempData.in_battle_hero_data = firstHero;
                        gm.data.event_emitter.emit("fight_in_battle", firstHero);

                        for (let i = 0; i < fightTempData.map_item_data_array.length; i++) {
                            const mapItem = fightTempData.map_item_data_array[i];
                            if (mapItem) {
                                mapItem.hero_index_array = [];
                            }
                        }

                        for (let i = 0; i < fightTempData.map_item_array.length; i++) {
                            const mapItem = fightTempData.map_item_array[i];
                            if (mapItem && mapItem.data) {
                                mapItem.update_view();
                            }
                        }

                        // Xử lý các hero phòng thủ
                        for (let i = fightTempData.defense_hero_data_array.length - 1; i >= 0; i--) {
                            const defenseHero = fightTempData.defense_hero_data_array[i];
                            if (defenseHero) {
                                defenseHero.last_attack_time = 0;
                                defenseHero.find_path_target = null;
                                defenseHero.move_path = [];
                                defenseHero.fight_state = HeroFightState.WAITING;
                            }
                        }
                        gm.data.fight_temp_data.fight_state = FightState.RUN;
                        this.update_view();
                    } else {
                        this.fight_fail();
                    }
                }
            });
            gm.ui.show_panel(gm.const.FightReviveHero);
        } else {
            this.fight_fail();
        }
    }

    public fight_return(): void {
        ReportData.instance.report_once_point(10667);
        ReportData.instance.report_point(10668);

        gm.data.fight_temp_data.build_fight_result_data(true);
        this.fight_clear();

        gm.ui.show_start();
    }

    private fight_fail(): void {
        const fightTempData = gm.data.fight_temp_data;
        const ladderData = gm.data.ladder_data;

        ladderData.fail_count++;
        ladderData.async_write_data();
        gm.data.start_data.async_write_data();

        fightTempData.fight_state = FightState.FAIL;

        cc.director.getScheduler().setTimeScale(gm.const.FIGHT_SPEED_X1);

        gm.audio.play_effect(gm.const.AUDIO_20_FIGHT_FAIL);

        this.update_view();

        this.scheduleOnce(() => {
            fightTempData.build_fight_result_data();
            this.fight_clear();

            if (gm.data.fight_temp_data.play_type == 0) {
                gm.channel.report_event("fight", {
                    event_desc: "突袭",
                    desc: "失败"
                });

                ReportData.instance.report_once_point(10825);
                ReportData.instance.report_point(10826);
            }

            if (gm.data.mapCell_data.isGuide) {
                gm.channel.report_event("ohayoo_game_guide", {
                    guideid: 16,
                    guidedesc: cc.js.formatStr("16.进入战斗结算界面")
                });
            }

            gm.ui.show_panel(gm.const.FightResult);
        }, 2);
    }

    private fight_reset(): void {
        this.fight_clear();
    }

    private fight_clear(): void {
        const fightTempData = gm.data.fight_temp_data;

        this.hero_list.reset();
        this.reward_list.reset();

        for (let i = fightTempData.building_destroy_array.length - 1; i >= 0; i--) {
            const node = fightTempData.building_destroy_array.pop();
            if (node) {
                gm.pool.put(node.node);
            }
        }

        for (let i = fightTempData.hero_death_array.length - 1; i >= 0; i--) {
            const hero = fightTempData.hero_death_array.pop();
            if (hero) {
                const animation = hero.getComponent(cc.Animation);
                if (animation) {
                    animation.stop();
                    animation.clear();
                }
                gm.pool.put(hero.node);
            }
        }

        for (let i = fightTempData.skill_item_array.length - 1; i >= 0; i--) {
            const node = fightTempData.skill_item_array.pop();
            if (node) {
                gm.pool.put(node.node);
            }
        }

        for (let i = fightTempData.hero_item_array.length - 1; i >= 0; i--) {
            const hero = fightTempData.hero_item_array.pop();
            if (hero) {
                hero.reset();
                gm.pool.put(hero.node);
            }
        }

        for (let i = fightTempData.defense_hero_array.length - 1; i >= 0; i--) {
            const defenseHero = fightTempData.defense_hero_array.pop();
            if (defenseHero) {
                defenseHero.reset();
                gm.pool.put(defenseHero.node);
            }
        }

        for (let i = fightTempData.building_item_array.length - 1; i >= 0; i--) {
            const building = fightTempData.building_item_array.pop();
            if (building) {
                building.reset();
                gm.pool.put(building.node);
            }
        }

        for (let i = fightTempData.wall_item_array.length - 1; i >= 0; i--) {
            const wall = fightTempData.wall_item_array.pop();
            if (wall) {
                wall.reset();
                gm.pool.put(wall.node);
            }
        }

        for (let i = fightTempData.prop_item_array.length - 1; i >= 0; i--) {
            const prop = fightTempData.prop_item_array.pop();
            if (prop) {
                prop.reset();
                gm.pool.put(prop.node);
            }
        }

        for (let i = fightTempData.decoration_item_array.length - 1; i >= 0; i--) {
            const decoration = fightTempData.decoration_item_array.pop();
            if (decoration) {
                decoration.reset();
                gm.pool.put(decoration.node);
            }
        }

        for (let i = fightTempData.map_item_array.length - 1; i >= 0; i--) {
            const mapItem = fightTempData.map_item_array.pop();
            if (mapItem) {
                mapItem.reset();
                gm.pool.put(mapItem.node);
            }
        }

        gm.pool.put_children(this.effect_node);
        gm.pool.put_children(this.text_node);

        fightTempData.in_battle_hero_data = null;
        fightTempData.goto_battle_count = 0;
        fightTempData.delta_time = 0;
        fightTempData.total_time = 0;
        fightTempData.show_return_btn_timestamp = 0;
        fightTempData.has_pop_revive = false;
        fightTempData.fight_state = FightState.NONE;
        fightTempData.record_fight_state = FightState.NONE;
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
    }

    private editor_on_button_click_handler(event: cc.Event): void {
        if (event.target == this.speed_1_btn.node) {
            this.speed_2_btn.node.active = true;
            this.speed_1_btn.node.active = false;
            gm.data.fight_data.speed_scale = gm.const.FIGHT_SPEED_X2;
            gm.data.fight_data.async_write_data();
            cc.director.getScheduler().setTimeScale(gm.data.fight_data.speed_scale);
        } else if (event.target == this.speed_2_btn.node) {
            this.speed_2_btn.node.active = false;
            this.speed_1_btn.node.active = true;
            gm.data.fight_data.speed_scale = gm.const.FIGHT_SPEED_X1;
            gm.data.fight_data.async_write_data();
            cc.director.getScheduler().setTimeScale(gm.data.fight_data.speed_scale);
        } else if (event.target == this.return_btn.node) {
            gm.ui.async_show_module(gm.const.FightReturn);
        }
    }

    public fly_to_boat(node: cc.Node, shouldInstantiate: boolean): void {
        if (shouldInstantiate) {
            const originalParent = node.parent;
            node = cc.instantiate(node);
            node.parent = originalParent;
        }

        const startWorldPosition = node.convertToWorldSpaceAR(cc.v3(0, 60));
        const startLocalPosition = this.window_node.convertToNodeSpaceAR(startWorldPosition);

        node.removeFromParent();
        node.position = startLocalPosition;
        this.window_node.addChild(node);

        const targetWorldPosition = this.boat_box_node.convertToWorldSpaceAR(cc.Vec3.ZERO);
        const targetLocalPosition = this.window_node.convertToNodeSpaceAR(targetWorldPosition);

        const startPoint = cc.v2(startLocalPosition);
        const endPoint = cc.v2(targetLocalPosition);
        const controlPoint1 = startPoint.add(endPoint.sub(startPoint).multiply(cc.v2(0.14, 0.9)));
        const controlPoint2 = startPoint.add(endPoint.sub(startPoint).multiply(cc.v2(0.53, 1.54)));

        cc.tween(node).parallel(
            cc.tween().to(0.6, { scale: 0.8 }),
            cc.tween().bezierTo(0.6, controlPoint1, controlPoint2, endPoint)
        ).call(() => {
            const nodePoolItem = node.getComponent(NodePoolItem);
            if (nodePoolItem) {
                gm.pool.put(nodePoolItem.node);
            } else {
                node.removeFromParent()
                node.destroy();
            }
        }).start();
    }

    private hero_jump_to_boat(hero: FightHeroItem): void {
        if (hero) {
            const heroNode = hero.node;
            const worldStartPosition = heroNode.convertToWorldSpaceAR(cc.v3(0, 60));
            const localStartPosition = this.window_node.convertToNodeSpaceAR(worldStartPosition);

            heroNode.removeFromParent();
            heroNode.position = localStartPosition;
            this.window_node.addChild(heroNode);

            const worldBoatPosition = this.boat_node.convertToWorldSpaceAR(cc.Vec3.ZERO);
            const localBoatPosition = this.window_node.convertToNodeSpaceAR(worldBoatPosition);

            const startPoint = cc.v2(localStartPosition);
            const endPoint = cc.v2(localBoatPosition);
            const controlPoint1 = startPoint.add(endPoint.sub(startPoint).multiply(cc.v2(0.14, 0.9)));
            const controlPoint2 = startPoint.add(endPoint.sub(startPoint).multiply(cc.v2(0.53, 1.54)));

            cc.tween(heroNode).parallel(
                cc.tween().to(0.6, { scale: 0.8 }),
                cc.tween().bezierTo(0.6, startPoint.add(controlPoint1), startPoint.add(controlPoint2), endPoint)
            ).call(() => {
                const nodePoolItem = heroNode.getComponent(NodePoolItem);
                if (nodePoolItem) {
                    gm.pool.put(nodePoolItem.node);
                } else {
                    heroNode.removeFromParent();
                    heroNode.destroy();
                }
            }).start();
        }
    }

    private get_go_ashore_floor_position(startPosition: cc.Vec2): { dir_key: string, floor_position: cc.Vec3 } {
        const fightData = gm.data.fight_temp_data;
        let targetPosition = startPosition;
        let directionKey = "";

        outerLoop:
        for (let i = 1; i < 3; i++) {
            for (let edgeDirection in fightData.edge_map) {
                directionKey = edgeDirection;

                targetPosition = startPosition.add(cc.v2(fightData.edge_map[edgeDirection]).multiplyScalar(i));

                if (
                    targetPosition.x < 0 ||
                    targetPosition.x >= fightData.map_size.x ||
                    targetPosition.y < 0 ||
                    targetPosition.y >= fightData.map_size.y
                ) break outerLoop;

                if (!fightData.map_item_data_array[targetPosition.x + targetPosition.y * fightData.map_size.x]) {
                    break outerLoop;
                }
            }
        }
        return {
            dir_key: directionKey,
            floor_position: fightData.grid_position_to_floor_position(targetPosition)
        }
    }
    public goto_battle(heroData: FightMapItem): void {
        const fightData = gm.data.fight_temp_data;
        if (fightData.goto_battle_count < fightData.hero_data_array.length) {
            if (0 == fightData.show_return_btn_timestamp) {
                (fightData.show_return_btn_timestamp = Date.now() + gm.const.FIGHT_RETURN_BUTTON_APPEAR_TIME);
            }
            const currentHero = fightData.in_battle_hero_data;
            if (currentHero && currentHero.in_battle_state == HeroInBattleState.WILL_IN_BATTLE) {
                currentHero.in_battle_state = HeroInBattleState.HAS_IN_BATTLE;
                gm.data.event_emitter.emit("fight_in_battle", currentHero);
                fightData.goto_battle_count++;

                const battlePosition = heroData.data;
                currentHero.grid_index = battlePosition.cell_id;
                currentHero.grid_position.x = battlePosition.grid_position.x;
                currentHero.grid_position.y = battlePosition.grid_position.y;

                const heroIndex = battlePosition.add_hero_index(currentHero.array_index);
                currentHero.offset = heroIndex.offset;
                const heroArrayIndex = currentHero.array_index;
                if (fightData.play_type < 2) {
                    const goAshorePosition = this.get_go_ashore_floor_position(currentHero.grid_position);
                    gm.pool.async_get(BundleName.FIGHT, "prefabs/fight_hero_item", FightHeroItem, (heroItemPrefab) => {
                        gm.pool.async_get(BundleName.FIGHT, "prefabs/battle_ship", NodePoolItem, (battleShipPrefab) => {
                            this.map_node.addChild(battleShipPrefab.node, -1);
                            battleShipPrefab.node.position = goAshorePosition.floor_position;
                            battleShipPrefab.node.getChildByName("role").addChild(heroItemPrefab.node);

                            const heroData = fightData.hero_data_array[heroArrayIndex];
                            heroItemPrefab.data = heroData;
                            fightData.hero_item_array[heroArrayIndex] = heroItemPrefab;

                            var e, o, i, _, n, r, d, s;
                            const animationComponent = battleShipPrefab.getComponent(cc.Animation);

                            if (animationComponent) {
                                let shipAnimationName = "battle_c_ship";
                                let scaleX = 1;
                                let scaleY = 0;
                                let offset = cc.Vec3.ZERO;

                                if (goAshorePosition.dir_key == EdgeEnum[EdgeEnum.LEFT]) {
                                    shipAnimationName = "battle_c_ship";
                                    scaleY = scaleX = -1;
                                    offset = cc.v3(-30, 20);
                                } else if (goAshorePosition.dir_key == EdgeEnum[EdgeEnum.RIGHT]) {
                                    shipAnimationName = "battle_c_ship";
                                    scaleY = scaleX = 1;
                                    offset = cc.v3(60, -20);
                                } else if (goAshorePosition.dir_key == EdgeEnum[EdgeEnum.TOP]) {
                                    shipAnimationName = "battle_f_ship";
                                    scaleY = -(scaleX = 1);
                                    offset = cc.v3(-10, 30)
                                } else if (goAshorePosition.dir_key == EdgeEnum[EdgeEnum.BOTTOM]) {
                                    shipAnimationName = "battle_b_ship";
                                    scaleY = scaleX = 1;
                                    offset = cc.v3(-20, -30);
                                }

                                animationComponent.once(cc.Animation.EventType.FINISHED, () => {
                                    gm.pool.put(animationComponent.node)
                                });

                                const targetPosition = fightData.grid_position_to_position(battlePosition.grid_position);
                                let travelDuration = 1;
                                const currentPosition = this.convert_to_map_point(heroItemPrefab.node, cc.Vec3.ZERO);
                                const distance = targetPosition.sub(currentPosition);
                                const angle = Math.atan2(distance.y, distance.x);

                                heroItemPrefab.play_spine_anim("move", angle);
                                cc.tween(heroItemPrefab.node).delay(0.2).call(() => {
                                    animationComponent.pause();
                                    const worldPosition = heroItemPrefab.node.convertToWorldSpaceAR(cc.Vec3.ZERO);
                                    const nodePosition = this.map_node.convertToNodeSpaceAR(worldPosition);

                                    heroItemPrefab.node.removeFromParent(false);
                                    heroItemPrefab.node.position = nodePosition;

                                    const dynamicLayer = gm.data.fight_temp_data.get_dynamic_node_layer(heroData.grid_index, FightDynamicNodeLayer.MOVE);
                                    travelDuration = targetPosition.sub(nodePosition).mag() / 80;

                                    if (gm.data.fight_temp_data.is_debug) {
                                        heroItemPrefab.node.name = cc.js.formatStr("fight_hero_item_gridIndex@%d_zIndex@%d", heroData.grid_index, dynamicLayer);
                                    }

                                    this.map_node.addChild(heroItemPrefab.node, dynamicLayer);
                                    const distance = targetPosition.sub(nodePosition);
                                    const angle = Math.atan2(distance.y, distance.x);

                                    heroItemPrefab.play_spine_anim("move", angle);
                                    this.next_in_battle_hero();

                                }).to(travelDuration, {
                                    position: targetPosition
                                }).call(() => {
                                    animationComponent.resume();
                                    if (-1 < battlePosition.prop_index) {
                                        heroData.fight_state = HeroFightState.MOVING;
                                        heroData.move_path = [];
                                        heroData.find_path_target = fightData.prop_data_array[battlePosition.prop_index];
                                    } else {
                                        heroData.fight_state = HeroFightState.WAITING;
                                        this.find_next_path(heroData);
                                    }
                                    this.common_hero_apply_passive_skill(heroData);
                                }).start();

                                animationComponent.play(shipAnimationName);
                                animationComponent.node.scaleX = scaleX;
                                animationComponent.node.zIndex = scaleY;
                                animationComponent.node.position = offset.add(animationComponent.node.position);
                            }
                        })
                    })
                } else {
                    gm.pool.async_get(BundleName.FIGHT, "prefabs/fight_hero_item", FightHeroItem, (heroItemPrefab) => {
                        const heroData = fightData.hero_data_array[heroArrayIndex];
                        const dynamicLayer = gm.data.fight_temp_data.get_dynamic_node_layer(heroData.grid_index, FightDynamicNodeLayer.MOVE);
                        this.map_node.addChild(heroItemPrefab.node, dynamicLayer);
                        if (gm.data.fight_temp_data.is_debug) {
                            (heroItemPrefab.node.name = cc.js.formatStr("fight_hero_item_gridIndex@%d_zIndex@%d", heroData.grid_index, dynamicLayer));
                        }
                        heroItemPrefab.node.position = fightData.grid_position_to_position(battlePosition.grid_position);
                        heroItemPrefab.data = heroData;
                        fightData.hero_item_array[heroArrayIndex] = heroItemPrefab;
                        this.common_hero_apply_passive_skill(heroData);
                        this.next_in_battle_hero();
                    });
                }
                this.show_guider_finger_anim();
            }
        }
    }

    private next_in_battle_hero(): void {
        const fightData = gm.data.fight_temp_data;
        let currentHero = fightData.in_battle_hero_data;

        if (fightData.goto_battle_count >= fightData.hero_data_array.length) {
            for (let index = 0; index < fightData.map_item_array.length; index++) {
                const mapItem = fightData.map_item_array[index];
                if (mapItem && mapItem.data) {
                    mapItem.update_view();
                }
            }
        }

        let nextHero: FightHeroItemData = null;
        for (let heroIndex = 0; heroIndex < fightData.hero_data_array.length; heroIndex++) {
            currentHero = fightData.hero_data_array[heroIndex];
            if (currentHero.in_battle_state == HeroInBattleState.NOT_IN_BATTLE) {
                currentHero.in_battle_state = HeroInBattleState.WILL_IN_BATTLE;
                nextHero = currentHero;
                break;
            }
        }

        fightData.in_battle_hero_data = nextHero;
        if (nextHero) {
            gm.data.event_emitter.emit("fight_in_battle", nextHero);
        }
    }

    private find_next_path(hero: FightHeroItemData, target?: FightHeroItemData | FightBuildingItemData | FightWallItemData): boolean {
        const fightData = gm.data.fight_temp_data;
        let targetData: FightTargetSortData = null;

        if (target) {
            targetData = new FightTargetSortData();
            targetData.index = target.array_index;

            if (target instanceof FightHeroItemData) {
                targetData.type = 3;
            } else if (target instanceof FightBuildingItemData) {
                targetData.type = 2;
            } else if (target instanceof FightWallItemData) {
                targetData.type = 4;
            } else {
                // cc.error("未知分支情况");
                cc.error("Nhánh chưa xác định.");
            }
        } else if (hero instanceof FightHeroItemData) {
            if (hero.type == HeroType.ATTACK) {
                targetData = this.find_hero_attack_target(hero.grid_position, hero);
            } else if (hero.type == HeroType.DEFENSE) {
                targetData = this.find_defense_hero_attack_target(hero.grid_position, hero);
            }
        }

        if (targetData) {
            let isStaticTarget = true;
            let foundTarget: FightPropItemData | FightBuildingItemData | FightHeroItemData | FightWallItemData = void cc.Vec2.ZERO;

            if (targetData.type == 1) {
                isStaticTarget = false;
                foundTarget = fightData.prop_data_array[targetData.index];
            } else if (targetData.type == 2) {
                foundTarget = fightData.building_data_array[targetData.index];
            } else if (targetData.type == 3) {
                foundTarget = hero.type == HeroType.ATTACK ? fightData.defense_hero_data_array[targetData.index] : fightData.hero_data_array[targetData.index];
            } else if (targetData.type == 4) {
                foundTarget = fightData.wall_data_array[targetData.index];
            }

            if (!foundTarget) return false;

            const targetGridPos = foundTarget.grid_position;
            const grid = fightData.grid;
            const pathfinder = fightData.a_star;

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
                hero.fight_state = HeroFightState.MOVING;

                if (fightData.is_debug) {
                    const debugColor = cc.color(
                        Utils.math_random(true, 0, 256),
                        Utils.math_random(true, 0, 256),
                        Utils.math_random(true, 0, 256)
                    );
                    for (let i = 0; i < hero.move_path.length; i++) {
                        const pathNode = hero.move_path[i];
                        fightData.get_fight_map_item(pathNode.x, pathNode.y).land_spr.node.color = debugColor;
                    }
                }

            } else {
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
    }

    private find_next_path_distance(startPos: cc.Vec2, endPos: cc.Vec2): number {
        let minDistance = Number.MAX_SAFE_INTEGER;
        const grid = gm.data.fight_temp_data.grid;
        const pathfinder = gm.data.fight_temp_data.a_star;

        const startWalkable = grid.getWalkable(startPos.x, startPos.y);
        if (!startWalkable) grid.getWalkable(startPos.x, startPos.y);
        grid.setStartNode(startPos.x, startPos.y);

        const endWalkable = grid.getWalkable(endPos.x, endPos.y);
        if (!endWalkable) grid.setWalkable(endPos.x, endPos.y, true);
        grid.setEndNode(endPos.x, endPos.y);

        if (pathfinder.findPath(grid)) {
            minDistance = pathfinder.path.length - 1;
        }

        if (!startWalkable) grid.setWalkable(startPos.x, startPos.y, false);
        if (!endWalkable) grid.setWalkable(endPos.x, endPos.y, false);
        grid.clearStartAndEndNode();

        return minDistance;
    }


    private find_hero_attack_target(heroPosition: cc.Vec2, heroData: FightHeroItemData): FightTargetSortData {
        const fightData = gm.data.fight_temp_data;
        const potentialTargets: FightTargetSortData[] = [];
        for (let index = 0; index < fightData.building_data_array.length; index++) {
            const building = fightData.building_data_array[index];
            if (building && 0 < building.hp) {
                const target = new FightTargetSortData;
                target.pixel_distance = fightData.grid_position_to_position(heroPosition).sub(fightData.grid_position_to_position(building.grid_position)).mag();
                target.find_path_distance = this.find_next_path_distance(heroPosition, building.grid_position);
                target.priority = 1;
                target.type = 2;
                target.index = index;
                target.find_path_distance != Number.MAX_SAFE_INTEGER && potentialTargets.push(target);
            }
        }

        for (let index = 0; index < fightData.wall_data_array.length; index++) {
            const wallData = fightData.wall_data_array[index];
            if (wallData && 0 < wallData.hp) {
                const target = new FightTargetSortData;
                target.pixel_distance = fightData.grid_position_to_position(heroPosition).sub(fightData.grid_position_to_position(wallData.grid_position)).mag();
                target.find_path_distance = this.find_next_path_distance(heroPosition, wallData.grid_position);
                target.priority = 1;
                target.type = 4;
                target.index = index;
                target.find_path_distance != Number.MAX_SAFE_INTEGER && potentialTargets.push(target);
            }
        }

        for (let index = 0; index < fightData.defense_hero_data_array.length; index++) {
            const defenseHero = fightData.defense_hero_data_array[index];
            if (defenseHero && 0 < defenseHero.hp) {
                const target = new FightTargetSortData;
                target.pixel_distance = fightData.grid_position_to_position(heroPosition).sub(fightData.grid_position_to_position(defenseHero.grid_position)).mag();
                target.find_path_distance = this.find_next_path_distance(heroPosition, defenseHero.grid_position);
                target.priority = 0;
                target.type = 3;
                target.index = index;
                target.find_path_distance != Number.MAX_SAFE_INTEGER && potentialTargets.push(target);
            }
        }

        for (let index = 0; index < fightData.prop_data_array.length; index++) {
            const propData = fightData.prop_data_array[index];
            if (propData) {
                const targer = new FightTargetSortData;
                targer.pixel_distance = fightData.grid_position_to_position(heroPosition).sub(fightData.grid_position_to_position(propData.grid_position)).mag();
                targer.find_path_distance = this.find_next_path_distance(heroPosition, propData.grid_position);
                targer.priority = 2;
                targer.type = 1;
                targer.index = index;
                targer.find_path_distance != Number.MAX_SAFE_INTEGER && potentialTargets.push(targer);
            }
        }

        if (0 < potentialTargets.length) {
            const sortedTargets: FightTargetSortData[] = [].concat(potentialTargets);
            Utils.sort_by_props(sortedTargets, {
                find_path_distance: "ascending",
                pixel_distance: "ascending",
                priority: "ascending"
            });

            let outOfRangeIndex = -1;
            let sortedTarget: FightTargetSortData;
            for (let index = 0; index < sortedTargets.length; index++) {
                sortedTarget = sortedTargets[index]
                if (sortedTarget.pixel_distance > heroData.attack_range) {
                    outOfRangeIndex = index;
                    break;
                }
            }

            if (0 < outOfRangeIndex) {
                const inRangeTargets = sortedTargets.splice(0, outOfRangeIndex);
                Utils.sort_by_props(inRangeTargets, {
                    priority: "ascending",
                    find_path_distance: "ascending",
                    pixel_distance: "ascending"
                });
                return inRangeTargets[0];
            }
            return sortedTarget;
        }
        return null;
    }

    private find_defense_hero_attack_target(defenseHeroPosition: cc.Vec2, defenseHeroData: FightHeroItemData): FightTargetSortData | null {
        const fightData = gm.data.fight_temp_data;
        const potentialTargets: FightTargetSortData[] = [];
        for (let index = 0; index < fightData.hero_data_array.length; index++) {
            const heroData = fightData.hero_data_array[index];
            if (heroData && 0 < heroData.hp && heroData.in_battle_state == HeroInBattleState.HAS_IN_BATTLE) {
                const target = new FightTargetSortData;
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
            Utils.sort_by_props(potentialTargets, {
                find_path_distance: "ascending",
                pixel_distance: "ascending",
                priority: "ascending"
            });
            const potentialTarget = potentialTargets[0];

            if (potentialTarget.pixel_distance <= defenseHeroData.search_range) {
                return potentialTarget;
            }
        }

        return null;
    }

    private find_building_attack_target(buildingData: FightBuildingItemData | FightWallItemData): FightHeroItemData | null {
        if (buildingData.attack_range <= 0) {
            return null;
        }

        const fightData = gm.data.fight_temp_data;
        const buildingPosition = buildingData.grid_position;
        const potentialTargets = [];
        for (let index = 0; index < fightData.hero_data_array.length; index++) {
            const heroData = fightData.hero_data_array[index];
            if (heroData && 0 < heroData.hp && heroData.in_battle_state == HeroInBattleState.HAS_IN_BATTLE) {
                const target = new FightTargetSortData;
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
            Utils.sort_by_props(potentialTargets, {
                find_path_distance: "ascending",
                pixel_distance: "ascending",
                priority: "ascending"
            });

            const potentialTarget = potentialTargets[0];
            if (potentialTarget.pixel_distance <= buildingData.attack_range) {
                return fightData.hero_data_array[potentialTarget.index];
            }
        }

        return null;
    }

    public building_call_defense_hero(building: FightBuildingItemData | FightWallItemData): void {
        const fightData = gm.data.fight_temp_data;
        const potentialDefenseHeroes = [];
        for (let index = 0; index < fightData.defense_hero_data_array.length; index++) {
            const defenseHero = fightData.defense_hero_data_array[index];
            if (defenseHero && 0 < defenseHero.hp) {
                const target = new FightTargetSortData;
                target.distance = Math.abs(building.grid_position.x - defenseHero.grid_position.x) + Math.abs(building.grid_position.y - defenseHero.grid_position.y);
                target.pixel_distance = fightData.grid_position_to_position(building.grid_position).sub(fightData.grid_position_to_position(defenseHero.grid_position)).mag();
                target.priority = 1;
                target.type = 3;
                target.index = index;
                potentialDefenseHeroes.push(target);
            }
        }

        if (0 < potentialDefenseHeroes.length) {
            Utils.sort_by_props(potentialDefenseHeroes, {
                pixel_distance: "ascending",
                priority: "ascending"
            });

            for (let index = 0; index < potentialDefenseHeroes.length; index++) {
                const selectedHeroData = potentialDefenseHeroes[index];
                if (!(selectedHeroData.pixel_distance <= building.call_range)) {
                    return;
                }

                const defenseHero = fightData.defense_hero_data_array[selectedHeroData.index]
                if (defenseHero && building.lock_attack_target) {
                    this.find_next_path(defenseHero, building.lock_attack_target);
                }
            }
        }
    }

    public convert_to_scene_point(node: cc.Node, localPoint?: cc.Vec3): cc.Vec3 {
        localPoint = (localPoint === undefined) ? cc.Vec3.ZERO : localPoint;
        if (localPoint == null) {
            localPoint = cc.Vec3.ZERO;
        }
        const worldPoint = node.convertToWorldSpaceAR(localPoint);
        return this.scene_node.convertToNodeSpaceAR(worldPoint);

    }

    public convert_to_map_point(node: cc.Node, localPoint: cc.Vec3): cc.Vec3 {
        localPoint = (localPoint === undefined) ? cc.Vec3.ZERO : localPoint;
        if (localPoint == null) {
            localPoint = cc.Vec3.ZERO;
        }
        const worldPoint = node.convertToWorldSpaceAR(localPoint);
        return this.map_node.convertToNodeSpaceAR(worldPoint);
    }

    public convert_to_effect_point(node: cc.Node, localPoint: cc.Vec3): cc.Vec3 {
        localPoint = (localPoint === undefined) ? cc.Vec3.ZERO : localPoint;
        if (localPoint == null) {
            localPoint = cc.Vec3.ZERO;
        }
        const worldPoint = node.convertToWorldSpaceAR(localPoint);
        return this.effect_node.convertToNodeSpaceAR(worldPoint);
    }
}