import { BundleName } from '../../start-scene/scripts/Constants';
import { SkillEffectId } from '../../start-scene/scripts/ConfigData';
import { HeroType, FightConstants } from '../../start-scene/scripts/FightConstants';
import { gm } from '../../start-scene/scripts/GameManager';
import { GraphicsUtils } from '../../start-scene/scripts/GraphicsUtils';
import { NodePoolItem } from '../../start-scene/scripts/NodePoolItem';
import { SkillItem } from './SkillItem';
import { BuffItemData, FightHeroItemData } from '../../start-scene/scripts/FightTempData'
import { HeroConfig } from '../../common/configs/hero';
import { SkillConfig } from '../../common/configs/skill';

const { ccclass, property } = cc._decorator;

@ccclass
export class FightHeroItem extends NodePoolItem {
    @property(cc.Node)
    private model_node: cc.Node | null;

    @property(cc.Node)
    private bottom_node: cc.Node | null;

    @property(cc.Node)
    private middle_node: cc.Node | null;

    @property(cc.Node)
    private top_node: cc.Node | null;

    @property(cc.ProgressBar)
    private hp_prg: cc.ProgressBar | null;

    @property(cc.Node)
    private bar_node: cc.Node | null;

    private _data: FightHeroItemData;
    private _spine: sp.Skeleton | null;
    private _spine_track: sp.spine.TrackEntry | null;
    private _skin_name: string;
    private _anim_name: string;
    private _loading_buff_data: BuffItemData;

    private constructor() {
        super();
        this.model_node = null;
        this.bottom_node = null;
        this.middle_node = null;
        this.top_node = null;
        this.hp_prg = null;
        this.bar_node = null
    }

    public get data(): FightHeroItemData {
        return this._data;
    }

    public set data(value: FightHeroItemData) {
        this._data = value;
        this.update_view();
    }

    public update_view(): void {
        if (gm.data.fight_temp_data.is_debug) {
            GraphicsUtils.draw_circle(this.node, cc.Color.BLUE, cc.Vec3.ZERO, this._data.search_range);
            GraphicsUtils.draw_fill_circle(this.node, cc.color(cc.Color.RED.r, cc.Color.RED.g, cc.Color.RED.b, 20), cc.Vec3.ZERO, this._data.attack_range);
        }

        if (this.model_node.childrenCount == 0) {
            const data = gm.config.get_row_data("HeroConfigData", this._data.id + "") as HeroConfig;
            gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + data.icon, NodePoolItem, (t) => {
                if (this.model_node.childrenCount == 0) {
                    this.model_node.addChild(t.node);
                    this._spine = t.getComponent(sp.Skeleton);
                    if (this._spine) {
                        this._skin_name = "front";
                        this._anim_name = "stay";
                        this._spine.setSkin(this._skin_name);
                        this._spine_track = this._spine.setAnimation(0, this._anim_name, true);
                        this._spine.timeScale = cc.director.getScheduler().getTimeScale();
                    }
                } else {
                    gm.pool.put(t.node);
                }

            })
        }

        if (this._data.type == HeroType.ATTACK) {
            this.bar_node.color = FightConstants.HP_GREEN_COLOR_LIGHT;
        } else {
            this.bar_node.color = FightConstants.HP_RED_COLOR_LIGHT;
        }

        this.hp_prg.progress = 0 < this._data.max_hp ? this._data.hp / this._data.max_hp : 0;
    }

    public reset(): void {
        this._data = null;
        this._skin_name = "";
        this._anim_name = "";
        this.unscheduleAllCallbacks();

        if (this._spine) {
            this._spine.setToSetupPose();
            this._spine.setCompleteListener(null);
            this._spine.timeScale = 1;
            this._spine = null;
        }

        if (this._spine_track) {
            this._spine_track.trackTime = 0;
            this._spine_track = null;
        }
        gm.pool.put_children(this.model_node);
        gm.pool.put_children(this.bottom_node);
        gm.pool.put_children(this.middle_node);
        gm.pool.put_children(this.top_node);
    }

    public unuse(): void {
        super.unuse();
        this.reset();
    }

    public change_hp(value: number): void {
        if (this._data) {
            this._data.change_hp(value);
            this.update_view();
        }
    }

    public play_hit_anim(position: cc.Node, animName: string = "hit"): void {
        gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + (animName = void 0 === animName ? "hit" : animName), NodePoolItem, (t) => {
            gm.ui.fight.effect_node.addChild(t.node);
            t.node.position = gm.ui.fight.convert_to_scene_point(position);
            t.node.scale = 0.5;
            const Anim = t.getComponent(cc.Animation);

            if (Anim) {
                Anim.once(cc.Animation.EventType.FINISHED, () => {
                    gm.pool.put(Anim.node);
                });
                Anim.play();
            }
        })
    }

    public play_skill_hit_anim(position: cc.Node, animName: string, parent: cc.Node = gm.ui.fight.effect_node, zIndex: number = 0): void {

        gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + animName, NodePoolItem, (t) => {
            parent.addChild(t.node);
            t.node.zIndex = zIndex;
            t.node.position = gm.ui.fight.convert_to_scene_point(position);
            t.node.scale = 0.5;

            const Anim = t.getComponent(cc.Animation);
            if (Anim) {
                Anim.once(cc.Animation.EventType.FINISHED, () => {
                    gm.pool.put(Anim.node);
                });
                Anim.play();
            }
        })
    }

    public add_buff_data(buff: BuffItemData): void {
        const data = this._data;
        for (let index = 0; index < data.buff_data_array.length; index++) {
            const existingBuff = data.buff_data_array[index];
            if (existingBuff.id == buff.id && existingBuff.start_time != buff.start_time) {
                data.buff_data_array.splice(index, 1);
                break;
            }
        }
        data.buff_data_array.push(buff);
    }

    private remove_buff_data(buff: BuffItemData): void {
        const data = this._data;
        const buffData = data.buff_data_array.indexOf(buff);
        if (- 1 < buffData) {
            data.buff_data_array.splice(buffData, 1);
        }
    }

    public check_hero_buff(time: number): void {
        const data = this._data;
        if (null != data) {
            for (let index = data.buff_data_array.length - 1; 0 <= index; index--) {
                const buff = data.buff_data_array[index];
                const triggerTimes = Math.floor((time - buff.start_time) / buff.valid_time);
                if (buff.is_start && 0 == triggerTimes && 0 == buff.trigger_count || triggerTimes > buff.trigger_count) {
                    this.buff_change_attribute(buff);
                }
            }

            let removedCount = 0;
            for (let index = data.buff_data_array.length - 1; 0 <= index; index--) {
                const buff = data.buff_data_array[index];
                if (buff.trigger_count == buff.max_trigger_count && buff.is_end || buff.trigger_count > buff.max_trigger_count && !buff.is_end) {
                    data.buff_data_array.splice(index, 1);
                    removedCount++;
                }
            }

            if (0 < removedCount) {
                data.reduce_damage_ratio = this.get_buff_reduce_damage_ratio();
                data.attack_speed_ratio = this.get_buff_attack_speed_ratio();
                data.attack_bonus_ratio = this.get_buff_attack_bonus_ratio();
                data.move_speed_scale = this.get_buff_move_speed_scale();
                data.restore_hp_ratio = this.get_buff_restore_hp_ratio();
                data.defense_bonus_ratio = this.get_buff_defense_bonus_ratio();
            }

            this.update_buff_view();
        }
    }

    private buff_change_attribute(buff: BuffItemData): void {
        const data = this._data;
        if (!(null == data || data.hp <= 0)) {
            if (buff.trigger_count < buff.max_trigger_count) {
                switch (buff.id) {
                    case SkillEffectId.REDUCE_DAMAGE:
                        data.reduce_damage_ratio = this.get_buff_reduce_damage_ratio();
                        break;
                    case SkillEffectId.ATTACK_SPEED_UP:
                        data.attack_speed_ratio = this.get_buff_attack_speed_ratio();
                        break;
                    case SkillEffectId.ATTACK_BONUS:
                        data.attack_bonus_ratio = this.get_buff_attack_bonus_ratio();
                        break;
                    case SkillEffectId.DIZZINESS:
                        data.move_speed_scale = this.get_buff_move_speed_scale();
                        break;
                    case SkillEffectId.DEFENSE_BONUS:
                        data.defense_bonus_ratio = this.get_buff_defense_bonus_ratio();
                        break;
                    case SkillEffectId.RESTORE_HP:
                        data.change_hp(data.real_restore_hp), data.restore_hp_ratio = this.get_buff_restore_hp_ratio();
                        break;
                    case SkillEffectId.FIRE:
                        data.change_hp(-buff.damage_value);
                        break;
                    case SkillEffectId.REDUCE_SPEED:
                        data.move_speed_scale = this.get_buff_move_speed_scale();
                        break;
                    default:
                        console.error("未知的buff类型")
                }
            }
            buff.trigger_count++;
        }
    }

    private get_buff_move_speed_scale(): number {
        const data = this._data;
        let scale = 1;
        if (data) {
            for (let index = 0; index < data.buff_data_array.length; index++) {
                scale *= data.buff_data_array[index].move_speed_scale;
            }
        }
        return scale;
    }

    private get_buff_reduce_damage_ratio(): number {
        const data = this._data;
        let ratio = 0;
        if (data) {
            for (let index = 0; index < data.buff_data_array.length; index++) {
                ratio += data.buff_data_array[index].reduce_damage_ratio;
            }
        }
        return ratio;
    }

    private get_buff_attack_speed_ratio(): number {
        const data = this._data;
        let ratio = 0;
        if (data) {
            for (let index = 0; index < data.buff_data_array.length; index++) {
                ratio += data.buff_data_array[index].attack_speed_ratio;
            }
        }
        return ratio;
    }

    private get_buff_attack_bonus_ratio(): number {
        const data = this._data;
        let ratio = 0;
        if (data) {
            for (let index = 0; index < data.buff_data_array.length; index++) {
                ratio += data.buff_data_array[index].attack_bonus_ratio;
            }
        }
        return ratio;
    }

    private get_buff_defense_bonus_ratio(): number {
        const data = this._data;
        let ratio = 0;
        if (data) {
            for (let index = 0; index < data.buff_data_array.length; index++) {
                ratio += data.buff_data_array[index].defense_bonus_ratio;
            }
        }
        return ratio;
    }

    private get_buff_restore_hp_ratio(): number {
        const data = this._data;
        let ratio = 0;
        if (data) {
            for (let index = 0; index < data.buff_data_array.length; index++) {
                ratio += data.buff_data_array[index].restore_hp_ratio;
            }
        }
        return ratio;
    }

    private update_buff_view() {
        const data = this._data;
        if (null != data) {
            if (0 < data.buff_data_array.length) {
                const latestBuff = data.buff_data_array[data.buff_data_array.length - 1];
                if (!this._loading_buff_data || this._loading_buff_data.id != latestBuff.id) {
                    const allNodes = [].concat(this.top_node.children, this.middle_node.children, this.bottom_node.children);

                    for (let index = allNodes.length - 1; 0 <= index; index--) {
                        const node = allNodes[index];
                        node.name != "buff_" + latestBuff.id && gm.pool.put(node);
                    }

                    const buff = "buff_" + latestBuff.id;
                    if (0 == allNodes.length && buff) {
                        this._loading_buff_data = latestBuff;
                        gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + buff, NodePoolItem, (t) => {
                            const parentNode = this.get_buff_parent_node(latestBuff.id);
                            parentNode.childrenCount;
                            if (this._loading_buff_data && latestBuff.id == this._loading_buff_data.id) {
                                parentNode.addChild(t.node);
                                this._loading_buff_data = null;
                            } else {
                                gm.pool.put(t.node);
                            }
                        })
                    }
                }
            } else {
                gm.pool.put_children(this.bottom_node);
                gm.pool.put_children(this.middle_node);
                gm.pool.put_children(this.top_node);
            }
        }
    }

    private get_buff_parent_node(buffId: number): cc.Node {
        if (-1 < [4, 6].indexOf(buffId)) {
            return this.top_node;
        } else if (-1 < [1, 2, 3, 5, 7, 8].indexOf(buffId)) {
            return this.bottom_node;
        } else {
            this.middle_node;
        }
    }


    private apply_passive_skill_ui(skillData: { skill_name: string }): void { // ko thấy sử dụng ở đâu
        if ("" != skillData.skill_name) {
            gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + skillData.skill_name, NodePoolItem, (skillData) => {
                this.top_node.addChild(skillData.node);
                const Anim = skillData.getComponent(cc.Animation);
                if (Anim) {
                    Anim.play();
                }
            })
        }
    }

    public put_to_pool(): void {
        const data = this._data;
        if (data) {
            const fightData = gm.data.fight_temp_data;
            if (data.type == HeroType.ATTACK) {
                fightData.hero_item_array[data.array_index] = null;
                fightData.hero_data_array[data.array_index].find_path_target = null;
            } else if (data.type == HeroType.DEFENSE) {
                fightData.defense_hero_array[data.array_index] = null;
                fightData.defense_hero_data_array[data.array_index] = null;
            }

            gm.pool.put(this.node);
            const speedSuffix = cc.director.getScheduler().getTimeScale() == gm.const.FIGHT_SPEED_X2 ? "_x2" : "";
            const configData = gm.config.get_row_data("HeroConfigData", data.id + "") as HeroConfig;

            if (configData && configData.death_audio) {
                gm.audio.play_effect(configData.death_audio + speedSuffix);
            } else {
                gm.audio.play_effect(gm.const.AUDIO_23_HERO_DEATH + speedSuffix);
            }

            const scenePoint = gm.ui.fight.convert_to_scene_point(this.node);
            gm.pool.async_get(BundleName.FIGHT, "prefabs/hero_death", NodePoolItem, (e) => {
                gm.ui.fight.effect_node.addChild(e.node);
                gm.data.fight_temp_data.hero_death_array.push(e);
                e.node.position = scenePoint;

                const Anim = e.getComponent(cc.Animation);
                if (Anim) {
                    Anim.once(cc.Animation.EventType.FINISHED, () => {
                        const t = gm.data.fight_temp_data.hero_death_array.indexOf(e);
                        - 1 < t && gm.data.fight_temp_data.hero_death_array.splice(t, 1);
                        gm.pool.put(Anim.node);
                        this.death_drop_soul(data);
                    });
                    Anim.play()
                }
            })
        }
    }

    protected death_drop_soul(heroData: FightHeroItemData): void {
        const heroConfig = gm.config.get_row_data("HeroConfigData", heroData.id + "") as HeroConfig;
        if (heroData && heroData.type == HeroType.ATTACK && heroConfig && 0 < heroConfig.souls && 0 < heroConfig.quantity) {
            const rewardData = gm.data.fight_temp_data.get_reward_data(heroConfig.souls);
            rewardData.num += heroConfig.quantity;
            gm.data.event_emitter.emit("pick_up_prop", rewardData.index);
            gm.pool.async_get(BundleName.MAP, "prefabs/item/" + heroConfig.souls, NodePoolItem, (t) => {
                const mapItem = gm.data.fight_temp_data.get_fight_map_item(heroData.grid_position.x, heroData.grid_position.y);

                mapItem && mapItem.land_node.addChild(t.node);
                const Anim = t.getComponent(cc.Animation);
                Anim && Anim.play();
                gm.ui.fight.fly_to_boat(t.node, false);
            })
        }

    }

    public play_attack_audio(): void {
        const data = this._data;
        const configData = gm.config.get_row_data("HeroConfigData", data.id + "") as HeroConfig;
        if (configData && "" != configData.attack_audio) {
            const speed = cc.director.getScheduler().getTimeScale() == gm.const.FIGHT_SPEED_X2 ? "_x2" : "";
            gm.audio.play_effect(configData.attack_audio + speed);
        }
    }

    public play_skill_audio(): void {
        const data = this._data;
        const configData = gm.config.get_row_data("HeroConfigData", data.id + "") as HeroConfig;
        if (configData && "" != configData.skill_audio) {
            const speed = cc.director.getScheduler().getTimeScale() == gm.const.FIGHT_SPEED_X2 ? "_x2" : "";
            gm.audio.play_effect(configData.skill_audio + speed);
        }

    }

    public play_spine_anim(
        animationName: string,
        rotationAngle: number,
        loop: boolean = true,
        delayBeforeCallback1: number = 0,
        callback1: (() => void) | null = null,
        delayBeforeCallback2: number = 0,
        callback2: (() => void) | null = null
    ): void {
        if (this._spine) {
            const radianAngle = ((this._data.radian = rotationAngle) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
            let skinDirection = "";
            let scaleXDirection = 1;
            const degreeToRadian = Math.PI / 180

            if (18 * degreeToRadian <= radianAngle && radianAngle < 120 * degreeToRadian) {
                skinDirection = "back";
                scaleXDirection = -1;
            } else if (120 * degreeToRadian <= radianAngle && radianAngle < 195 * degreeToRadian) {
                skinDirection = "back";
                scaleXDirection = 1;
            } else if (195 * degreeToRadian <= radianAngle && radianAngle < 300 * degreeToRadian) {
                skinDirection = "front";
                scaleXDirection = 1;
            } else if (300 * degreeToRadian <= radianAngle && radianAngle < 360 * degreeToRadian || 0 <= radianAngle && radianAngle < 18 * degreeToRadian) {
                skinDirection = "front";
                scaleXDirection = -1;
            } else {
                console.log(rotationAngle);
            }

            if (skinDirection != this._skin_name) {
                this._skin_name = skinDirection;
                this._spine.setSkin(skinDirection);
            }

            if (animationName == this._anim_name && loop) {

            } else {
                this._anim_name = animationName;
                if (!loop && callback1) {
                    if (0 < delayBeforeCallback1 && callback1) {
                        this.scheduleOnce(() => {
                            callback1()
                        }, delayBeforeCallback1);
                    } else {
                        cc.error("play_spine_anim 参数错误");
                    }

                    if (0 < delayBeforeCallback2 && callback2) {
                        this.scheduleOnce(() => {
                            callback2()
                        }, delayBeforeCallback2);
                    }
                }
                this._spine_track && (this._spine_track.trackTime = 0);
                this._spine.setToSetupPose();
                this._spine_track = this._spine.setAnimation(0, animationName, loop);
            }

            if (scaleXDirection != this._spine.node.scaleX) {
                this._spine.node.scaleX = scaleXDirection;
            }

            if (this._spine) {
                this._spine.timeScale = cc.director.getScheduler().getTimeScale();
            }
        }
    }


    public play_weapon_fly_anim(attackTarget: cc.Node, rotationAngle: number, callback: () => void): void {
        let data = this._data;
        if (this._data.type === HeroType.ATTACK) {
            data = gm.data.fight_temp_data.hero_data_array[this._data.array_index];
        } else if (this._data.type === HeroType.DEFENSE) {
            data = gm.data.fight_temp_data.defense_hero_data_array[this._data.array_index];
        }

        gm.pool.async_get(BundleName.FIGHT, "prefabs/skill_item", SkillItem, (skill) => {
            gm.ui.fight.effect_node.addChild(skill.node);
            gm.data.fight_temp_data.skill_item_array.push(skill);

            const radianAngle = (rotationAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
            let startPosition = cc.v3();
            if (data.fly_weapon_position_array && 2 == data.fly_weapon_position_array.length) {
                if (radianAngle >= Math.PI / 4 && radianAngle < 3 * Math.PI / 4) {
                    startPosition = cc.v3(-data.fly_weapon_position_array[1].x, data.fly_weapon_position_array[1].y).mulSelf(this.model_node.scale)

                } else if (radianAngle >= 3 * Math.PI / 4 && radianAngle < 5 * Math.PI / 4) {
                    startPosition = cc.v3(data.fly_weapon_position_array[1]).mulSelf(this.model_node.scale);

                } else if (radianAngle >= 5 * Math.PI / 4 && radianAngle < 7 * Math.PI / 4) {
                    startPosition = cc.v3(data.fly_weapon_position_array[0]).mulSelf(this.model_node.scale)

                } else if (radianAngle >= 7 * Math.PI / 4 && radianAngle < 2 * Math.PI || 0 <= radianAngle && radianAngle < Math.PI / 4) {
                    startPosition = cc.v3(-data.fly_weapon_position_array[0].x, data.fly_weapon_position_array[0].y).mulSelf(this.model_node.scale);
                }

                skill.set_attack_target(this, startPosition, cc.v3(0, 80), 1, attackTarget, callback);

            } else {
                cc.error("这里不应该出现fly_weapon_position_array为空或者长度不是2");
            }
        });
    }

    public play_skill_fly_anim(target: SkillConfig, flyType: cc.Node, rotationAngle: number, callback: () => void): void {
        let data = this._data;
        if (this._data.type === HeroType.ATTACK) {
            data = gm.data.fight_temp_data.hero_data_array[this._data.array_index];
        } else if (this._data.type === HeroType.DEFENSE) {
            data = gm.data.fight_temp_data.defense_hero_data_array[this._data.array_index];
        }

        gm.pool.async_get(BundleName.FIGHT, "prefabs/skill_item", SkillItem, (skill) => {
            gm.ui.fight.effect_node.addChild(skill.node);
            gm.data.fight_temp_data.skill_item_array.push(skill);

            const radianAngle = (rotationAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
            let startPosition = cc.v3();

            if (data.fly_weapon_position_array && 2 == data.fly_weapon_position_array.length) {
                if (radianAngle >= Math.PI / 4 && radianAngle < 3 * Math.PI / 4) {
                    startPosition = cc.v3(-data.fly_weapon_position_array[1].x, data.fly_weapon_position_array[1].y).mulSelf(this.model_node.scale)

                } else if (radianAngle >= 3 * Math.PI / 4 && radianAngle < 5 * Math.PI / 4) {
                    startPosition = cc.v3(data.fly_weapon_position_array[1]).mulSelf(this.model_node.scale)

                } else if (radianAngle >= 5 * Math.PI / 4 && radianAngle < 7 * Math.PI / 4) {
                    startPosition = cc.v3(data.fly_weapon_position_array[0]).mulSelf(this.model_node.scale)

                } else if (radianAngle >= 7 * Math.PI / 4 && radianAngle < 2 * Math.PI || 0 <= radianAngle && radianAngle < Math.PI / 4) {
                    startPosition = cc.v3(-data.fly_weapon_position_array[0].x, data.fly_weapon_position_array[0].y).mulSelf(this.model_node.scale)
                }

                skill.set_fly_skill_target(target, this, startPosition, cc.v3(0, 80), target.fly_type, flyType, callback);

            } else {
                cc.error("这里不应该出现fly_weapon_position_array为空或者长度不是2")
            }
        })
    }

    public play_skill_anim(target: SkillConfig, effectPositionY: cc.Node, animationType: number, callback: () => void): void {
        this._data;
        if (this._data.type === HeroType.ATTACK) {
            gm.data.fight_temp_data.hero_data_array[this._data.array_index];
        } else if (this._data.type === HeroType.DEFENSE) {
            gm.data.fight_temp_data.defense_hero_data_array[this._data.array_index];
        }

        gm.pool.async_get(BundleName.FIGHT, "prefabs/skill_item", SkillItem, (skill) => {
            this.node.addChild(skill.node);
            gm.data.fight_temp_data.skill_item_array.push(skill);
            skill.set_skill_target(target, this, cc.v3(0, 80), effectPositionY, callback);
        })
    }
}


