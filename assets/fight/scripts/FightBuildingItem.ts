import { NodePoolItem } from '../../start-scene/scripts/NodePoolItem';
import { BundleName } from '../../start-scene/scripts/Constants';
import { Utils } from '../../start-scene/scripts/Utils';
import { gm } from '../../start-scene/scripts/GameManager';
import { SkillItem } from './SkillItem';
import { TaskConditionType } from '../../start-scene/scripts/TaskData';
import { FightDynamicNodeLayer } from '../../start-scene/scripts/FightConstants';
import { GraphicsUtils } from '../../start-scene/scripts/GraphicsUtils';
import { FightMapItem } from './FightMapItem';
import { FightBuildingItemData } from '../../start-scene/scripts/FightTempData';

const { ccclass, property } = cc._decorator;

@ccclass
export class FightBuildingItem extends NodePoolItem {
    @property(cc.Sprite)
    private building_spr: cc.Sprite = null;

    @property(cc.Label)
    private lv_lbl: cc.Label = null;

    @property(cc.ProgressBar)
    private hp_prg: cc.ProgressBar = null;

    @property(cc.Label)
    private star_count: cc.Label = null;

    @property(cc.Vec3)
    private one_star_pos: cc.Vec3 = null;

    @property([cc.Vec3])
    private two_star_pos_array: cc.Vec3[] = [];

    @property([cc.Vec3])
    private three_star_pos_array: cc.Vec3[] = [];

    @property([cc.Node])
    private star_node_array: cc.Node[] = [];

    @property([cc.Sprite])
    public reward_spr_array: cc.Sprite[] = [];

    private _data: FightBuildingItemData;
    private _hit_anim: cc.Animation;

    public get data(): FightBuildingItemData {
        return this._data;
    }

    public set data(value: FightBuildingItemData) {
        this._data = value;
        this.update_view();
    }

    public update_view(): void {
        if (gm.data.fight_temp_data.is_debug) {
            this.lv_lbl.node.active = true;
            this.lv_lbl.string = "" + this._data.lv;
            GraphicsUtils.draw_line(this.node, cc.Color.WHITE, cc.Vec3.ZERO, cc.v3(0, this._data.call_range), 1, this._data.call_range);
            GraphicsUtils.draw_circle(this.node, cc.Color.WHITE, cc.Vec3.ZERO, this._data.call_range);
        } else {
            this.lv_lbl.node.active = false;
        }

        let currentMapItem;
        let buildingConfig = gm.config.get_row_data("BuildConfigData", this._data.id + "") as FightMapItem;

        if (buildingConfig) {
            Utils.async_set_sprite_frame(this.building_spr, BundleName.MAP, "res/build/" + buildingConfig.model);
        }

        if (gm.data.fight_temp_data.is_lighthouse(this._data.id)) {
            this.building_spr.node.position = cc.v3(19, -40);
            currentMapItem = gm.data.fight_temp_data.get_fight_map_item(this._data.grid_position.x, this._data.grid_position.y);
            buildingConfig = gm.data.fight_temp_data.get_fight_map_item(this._data.grid_position.x, this._data.grid_position.y - 1);

            if (currentMapItem && buildingConfig) {
                buildingConfig.land_node.position = currentMapItem.land_node.position.add(cc.v3(-1, 3));
            }

        } else {
            this.building_spr.node.position = cc.v3(0, -37);
        }

        this.hp_prg.progress = 0 < this._data.max_hp ? this._data.hp / this._data.max_hp : 0;

        for (let index = 0; index < this.star_node_array.length; index++) {
            this.star_node_array[index].active = index < this._data.star_count;
        }

        if (this._data.star_count <= 0) {
            this.star_count.node.active = false;

        } else if (1 == this._data.star_count) {
            this.star_count.node.active = false;
            this.star_node_array[0].position = this.one_star_pos;

        } else if (2 == this._data.star_count) {
            this.star_count.node.active = false;
            for (let index = 0; index < this.two_star_pos_array.length; index++) {
                this.star_node_array[index].position = this.two_star_pos_array[index];
            }

        } else {
            this.star_count.node.active = true;
            this.star_count.string = "x" + this._data.star_count;
            for (let index = 0; index < this.three_star_pos_array.length; index++) {
                this.star_node_array[index].position = this.three_star_pos_array[index];
            }
        }

        for (let index = 0; index < this.reward_spr_array.length; index++) {
            if (index < this._data.reward_array.length) {
                this.reward_spr_array[index].node.parent.active = true;
                const reward = this._data.reward_array[index];
                Utils.async_set_sprite_frame(this.reward_spr_array[index], BundleName.COMMON, "res/handbook/" + reward.id);
            } else {
                this.reward_spr_array[index].node.parent.active = false;
            }
        }
    }

    public reset(): void { }

    public change_hp(value: number): void {
        if (this._data && value < 0) {
            value = Math.min(0, value + this._data.defense);
            this._data.hp = Math.max(0, Math.min(this._data.max_hp, this._data.hp + value));
            gm.ui.fight.building_call_defense_hero(this._data);
        }
        this.update_view();
    }

    public play_hit_anim(position: cc.Node, animationName: string = "hit"): void {
        gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + (animationName = void 0 === animationName ? "hit" : animationName), NodePoolItem, (t) => {
            gm.ui.fight.effect_node.addChild(t.node);
            t.node.scale = 0.5;
            const offset = gm.data.fight_temp_data.is_lighthouse(this._data.id) ? cc.v3(31, 51) : cc.Vec3.ZERO;
            t.node.position = gm.ui.fight.convert_to_scene_point(position, offset);
            const animation = t.getComponent(cc.Animation);
            if (animation) {
                animation.once(cc.Animation.EventType.FINISHED, () => {
                    gm.pool.put(animation.node)
                });
                animation.play();
            }
        });

        if (!this._hit_anim) {
            this._hit_anim = this.building_spr.getComponent(cc.Animation);
        }
        if (this._hit_anim) {
            this._hit_anim.play();
        }
    }

    public play_skill_hit_anim(position: cc.Node, animationName: string, effectNode: cc.Node = gm.ui.fight.effect_node, zIndex: number = 0): void {
        gm.pool.async_get(BundleName.COMMON, "prefabs/model/" + animationName, NodePoolItem, (t) => {
            let fightTempData = gm.data.fight_temp_data;
            effectNode.addChild(t.node);
            t.node.zIndex = zIndex;
            const lighthouse = fightTempData.is_lighthouse(this._data.id) ? cc.v3(31, 51) : cc.Vec3.ZERO;
            t.node.position = gm.ui.fight.convert_to_scene_point(position, lighthouse);
            t.node.scale = 0.5;
            const animation = t.getComponent(cc.Animation);
            if (animation) {
                animation.once(cc.Animation.EventType.FINISHED, () => {
                    gm.pool.put(animation.node)
                });
                animation.play();
            }
        });

        if (!this._hit_anim) {
            this._hit_anim = this.building_spr.getComponent(cc.Animation);
        }
        if (this._hit_anim) {
            this._hit_anim.play();
        }
    }

    public put_to_pool(): void {
        const data = this._data;
        if (data) {
            if (this._hit_anim) {
                this._hit_anim.setCurrentTime(0);
                this._hit_anim.stop();
            }

            const gridIndex = data.grid_index;
            data.grid_position;

            const fightTempData = gm.data.fight_temp_data;
            fightTempData.get_building_destroy_reward(data.array_index, data);
            fightTempData.building_item_array[data.array_index] = null;
            fightTempData.building_data_array[data.array_index] = null;

            const parent = this.node.parent;
            const position = this.node.position;
            gm.pool.put(this.node);
            gm.data.task_data.update_task_progress(TaskConditionType.DESTROY_BUILDING);
            gm.pool.async_get(BundleName.FIGHT, "prefabs/building_destroy", NodePoolItem, (t) => {
                fightTempData.building_destroy_array.push(t);
                const ischeck = data && fightTempData.is_lighthouse(data.id) ? cc.v3(31, 51) : cc.Vec3.ZERO;
                ischeck.addSelf(cc.v3(0, 4)).addSelf(position);
                t.node.position = gm.ui.fight.convert_to_map_point(parent, ischeck);
                const dynamic = gm.data.fight_temp_data.get_dynamic_node_layer(gridIndex, FightDynamicNodeLayer.DESTROY_EFFECT);
                gm.ui.fight.map_node.addChild(t.node, dynamic);

                if (gm.data.fight_temp_data.is_debug) {
                    t.node.name = cc.js.formatStr("building_destroy_gridIndex@%d_zIndex@%d", gridIndex, dynamic);
                }

                const anim = t.getComponent(cc.Animation);
                if (anim) {
                    anim.play();
                }
            })
        }
    }

    public play_weapon_fly_anim(target: cc.Node, skillName: number, callback: () => void): void {
        gm.pool.async_get(BundleName.FIGHT, "prefabs/skill_item", SkillItem, (t) => {
            gm.ui.fight.effect_node.addChild(t.node);
            gm.data.fight_temp_data.skill_item_array.push(t);
            const offset = cc.v3(0, 40);
            t.set_building_attack_target(this, offset, cc.v3(0, 10), 0, target, callback)
        })
    }
}