import { NodePoolItem } from '../../start-scene/scripts/NodePoolItem';
import { BundleName } from '../../start-scene/scripts/Constants';
import { gm } from '../../start-scene/scripts/GameManager';
import { SkillItem } from './SkillItem';
import { FightDynamicNodeLayer } from '../../start-scene/scripts/FightConstants';
import { GraphicsUtils } from '../../start-scene/scripts/GraphicsUtils';
import { HeroConfig } from '../../common/configs/hero';
import { FightWallItemData } from '../../start-scene/scripts/FightTempData';
import { SkillConfig } from '../../common/configs/skill';

const { ccclass, property } = cc._decorator;

@ccclass
class FightWallItem extends NodePoolItem {
    @property(cc.Node)
    private model_node: cc.Node = null;

    @property(cc.ProgressBar)
    private hp_prg: cc.ProgressBar = null;

    @property(cc.Node)
    private top_node: cc.Node = null;

    private _data: FightWallItemData = null;
    private _spine: sp.Skeleton = null;
    private _anim_name: string = "";
    private _anim_index: number = 0;
    private _next_anim_name: string = "";
    private _spine_track: sp.spine.TrackEntry = null;

    public get data(): FightWallItemData {
        return this._data;
    }

    public set data(value: FightWallItemData) {
        this._data = value;
        this.update_view();
    }

    public update_view(): void {
        if (gm.data.fight_temp_data.is_debug) {
            GraphicsUtils.draw_circle(this.node, cc.Color.BLUE, cc.Vec3.ZERO, this._data.search_range);
            GraphicsUtils.draw_circle(this.node, cc.Color.RED, cc.Vec3.ZERO, this._data.attack_range);
        }
        if (this.model_node.childrenCount == 0) {
            gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + this._data.id, NodePoolItem, (item) => {
                if (this.model_node.childrenCount == 0) {
                    this.model_node.addChild(item.node);
                    this._spine = item.getComponentInChildren(sp.Skeleton);
                    if (this._spine) {
                        this._anim_name = "fstay";
                        this._anim_index = 2;
                        this._spine_track = this._spine.setAnimation(0, this._anim_name, true);
                        this._spine.timeScale = cc.director.getScheduler().getTimeScale();
                    }
                    this.update_wall_part_view();
                } else {
                    gm.pool.put(item.node);
                }
            });
        } else {
            this.update_wall_part_view();
        }
        this.hp_prg.progress = this._data.max_hp > 0 ? this._data.hp / this._data.max_hp : 0;
    }

    public update_wall_part_view(): void {
        if (this._data && this.model_node.childrenCount > 0) {
            const edgeMap = gm.data.fight_temp_data.edge_map;
            const modelChild = this.model_node.children[0];
            for (const key in edgeMap) {
                const edgeData = edgeMap[key];
                const wallItem = modelChild.getChildByName(key.toLowerCase());
                if (wallItem) {
                    wallItem.active = gm.data.fight_temp_data.has_wall_item_data(edgeData.add(this._data.grid_position));
                }
            }
        }
    }

    public reset(): void {
        this._data = null;
        this._anim_name = "";
        this._anim_index = 0;
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
        gm.pool.put_children(this.top_node);
    }

    public unuse(): void {
        super.unuse();
        this.reset();
    }

    public change_hp(amount: number): void {
        if (this._data && amount < 0) {
            amount = Math.min(0, amount + this._data.real_defense_value);
            this._data.hp = Math.max(0, Math.min(this._data.max_hp, this._data.hp + amount));
            gm.ui.fight.building_call_defense_hero(this._data);
        }
        this.update_view();
    }

    public play_hit_anim(position: cc.Node, animationName: string = "hit"): void {
        gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + animationName, NodePoolItem, (item) => {
            gm.ui.fight.effect_node.addChild(item.node);
            item.node.scale = 0.5;
            item.node.position = gm.ui.fight.convert_to_scene_point(position);
            const animation = item.getComponent(cc.Animation);
            if (animation) {
                animation.once(cc.Animation.EventType.FINISHED, () => {
                    gm.pool.put(animation.node);
                });
                animation.play();
            }
        });
    }

    public play_skill_hit_anim(position: cc.Node, skillName: string, effectNode: cc.Node = gm.ui.fight.effect_node, zIndex: number = 0): void {
        gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + skillName, NodePoolItem, (item) => {
            effectNode.addChild(item.node);
            item.node.zIndex = zIndex;
            item.node.position = gm.ui.fight.convert_to_scene_point(position);
            item.node.scale = 0.5;
            const animation = item.getComponent(cc.Animation);
            if (animation) {
                animation.once(cc.Animation.EventType.FINISHED, () => {
                    gm.pool.put(animation.node);
                });
                animation.play();
            }
        });
    }

    public apply_passive_skill(skillData: SkillConfig): void {
        const data = this._data;
        data.damage_ratio = skillData.damage_ratio;
        data.defense_ratio = skillData.defense_ratio;
        if (skillData.skill_name !== "") {
            gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + skillData.skill_name, NodePoolItem, (item) => {
                this.top_node.addChild(item.node);
                const animation = item.getComponent(cc.Animation);
                if (animation) {
                    animation.play();
                }
            });
        }
    }

    public put_to_pool(): void {
        const data = this._data;
        if (data) {
            const gridIndex = data.grid_index;
            const tempData = gm.data.fight_temp_data;
            tempData.wall_item_array[data.array_index] = null;
            tempData.wall_data_array[data.array_index] = null;
            const parentNode = this.node.parent;
            const position = this.node.position;
            gm.pool.put(this.node);
            const timeScaleSuffix = cc.director.getScheduler().getTimeScale() == gm.const.FIGHT_SPEED_X2 ? "_x2" : "";
            const heroConfig = gm.config.get_row_data("HeroConfigData", data.id + "") as HeroConfig;
            if (heroConfig && heroConfig.death_audio) {
                gm.audio.play_effect(heroConfig.death_audio + timeScaleSuffix);
            } else {
                gm.audio.play_effect(gm.const.AUDIO_23_HERO_DEATH + timeScaleSuffix);
            }
            gm.pool.async_get(BundleName.FIGHT, "prefabs/building_destroy", NodePoolItem, (item) => {
                tempData.building_destroy_array.push(item);
                const effectPosition = data && tempData.is_lighthouse(data.id) ? cc.v3(31, 51, 0) : cc.Vec3.ZERO;
                effectPosition.addSelf(cc.v3(0, 4, 0)).addSelf(position);
                item.node.position = gm.ui.fight.convert_to_map_point(parentNode, effectPosition);
                const dynamicLayer = tempData.get_dynamic_node_layer(gridIndex, FightDynamicNodeLayer.DESTROY_EFFECT);
                gm.ui.fight.map_node.addChild(item.node, dynamicLayer);
                if (tempData.is_debug) {
                    item.node.name = cc.js.formatStr("building_destroy_gridIndex@%d_zIndex@%d", gridIndex, dynamicLayer);
                }
                const animation = item.getComponent(cc.Animation);
                if (animation) {
                    animation.play();
                }
            });
        }
    }

    public play_attack_audio(): void {
        const data = this._data;
        const heroConfig = gm.config.get_row_data("HeroConfigData", data.id + "") as HeroConfig;
        if (heroConfig && heroConfig.attack_audio) {
            const timeScaleSuffix = cc.director.getScheduler().getTimeScale() == gm.const.FIGHT_SPEED_X2 ? "_x2" : "";
            gm.audio.play_effect(heroConfig.attack_audio + timeScaleSuffix);
        }
    }

    private play_skill_audio(): void {
        const data = this._data;
        const heroConfig = gm.config.get_row_data("HeroConfigData", data.id + "") as HeroConfig;
        if (heroConfig && heroConfig.skill_audio) {
            const timeScaleSuffix = cc.director.getScheduler().getTimeScale() == gm.const.FIGHT_SPEED_X2 ? "_x2" : "";
            gm.audio.play_effect(heroConfig.skill_audio + timeScaleSuffix);
        }
    }

    public play_spine_anim(radian: number, delay: number = 0, callback: Function = null, duration: number = 0, endCallback: Function = null): void {
        let normalizedRadian = ((this._data.radian = radian) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        let attackAnim = "";
        let stayAnim = "";
        let animIndex = 0;

        if (normalizedRadian >= Math.PI / 4 && normalizedRadian < 3 * Math.PI / 4) {
            attackAnim = "battack";
            stayAnim = "bstay";
            animIndex = 0;
        } else if (normalizedRadian >= 3 * Math.PI / 4 && normalizedRadian < 5 * Math.PI / 4) {
            attackAnim = "lattack";
            stayAnim = "lstay";
            animIndex = 3;
        } else if (normalizedRadian >= 5 * Math.PI / 4 && normalizedRadian < 7 * Math.PI / 4) {
            attackAnim = "fattack";
            stayAnim = "fstay";
            animIndex = 2;
        } else {
            attackAnim = "rattack";
            stayAnim = "rstay";
            animIndex = 1;
        }

        this._anim_name = attackAnim;
        this._anim_index = animIndex;
        this._next_anim_name = stayAnim;

        if (callback) {
            if (delay > 0 && callback) {
                this.scheduleOnce(() => {
                    callback();
                }, delay);
            } else {
                cc.error("play_spine_anim 参数错误");
            }
        }

        if (duration > 0 && endCallback) {
            this.scheduleOnce(() => {
                endCallback();
            }, duration);
        }

        if (this._spine_track) {
            this._spine_track.trackTime = 0;
        }
        this._spine.setToSetupPose();
        this._spine_track = this._spine.setAnimation(0, attackAnim, false);
        this._spine.setCompleteListener(() => {
            this._spine.setCompleteListener(null);
            this._spine_track = this._spine.setAnimation(0, stayAnim, true);
        });
        this._spine.timeScale = cc.director.getScheduler().getTimeScale();
    }

    public play_weapon_fly_anim(target: cc.Node, duration: number, callback: () => void): void {
        gm.pool.async_get(BundleName.FIGHT, "prefabs/skill_item", SkillItem, (item) => {
            gm.ui.fight.effect_node.addChild(item.node);
            gm.data.fight_temp_data.skill_item_array.push(item);
            let effectPosition = cc.v3(0, 10);
            if (this._data.occupation == 12 && this._anim_index >= 0 && this._anim_index <= 3) {
                effectPosition = [cc.v3(8, 66), cc.v3(19, 67), cc.v3(-6, 77), cc.v3(-20, 69)][this._anim_index];
            }
            item.set_building_attack_target(this, effectPosition, cc.v3(0, 10, 0), 1, target, callback);
        });
    }
}

export { FightWallItem };