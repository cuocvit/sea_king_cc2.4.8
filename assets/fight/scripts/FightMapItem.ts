import { NodePoolItem } from '../../start-scene/scripts/NodePoolItem';
import { EdgeEnum, FightMapItemData } from '../../start-scene/scripts/FightTempData';
import { gm } from '../../start-scene/scripts/GameManager';
import { FightDecorationItem } from './FightDecorationItem';
import { FightBuildingItem } from './FightBuildingItem';
import { FightNumItem, FightNumItemData } from './FightNumItem';
import { FightPropItem } from './FightPropItem';
import { FightWallItem } from './FightWallItem';
import { BundleName } from '../../start-scene/scripts/Constants';
import { FightDynamicNodeLayer } from '../../start-scene/scripts/FightConstants';
import { Utils } from '../../start-scene/scripts/Utils';
import { FightHeroItem } from './FightHeroItem';

const { ccclass, property } = cc._decorator;

@ccclass
export class FightMapItem extends NodePoolItem {
    @property(cc.Node)
    public land_node: cc.Node = null;

    @property(cc.Sprite)
    public land_spr: cc.Sprite = null;

    @property(cc.Node)
    private yellow_node: cc.Node = null;

    private _data: FightMapItemData;
    public model: number;

    get data(): FightMapItemData {
        return this._data;
    }

    set data(value: FightMapItemData) {
        this._data = value;
        this.land_spr.node.color = cc.Color.WHITE;
        this.update_view();
    }

    protected onEnable(): void {
        this.land_node.on(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
    }

    protected onDisable(): void {
        this.land_node.off(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
    }

    public update_view(): void {
        const tempData = gm.data.fight_temp_data;
        if (tempData.is_debug && !tempData.getWalkable(this._data.grid_position)) {
            this.land_spr.node.color = cc.Color.BLACK;
        }
        Utils.async_set_sprite_frame(this.land_spr, BundleName.TEST, "res/" + this._data.land_img_id);
        const waterName = "water_" + this._data.water_img_id;
        const waterNode = this.node.getChildByName(waterName);
        this.yellow_node.active = this._data.edge_flag > 0 && this._data.enter > 0 && this._data.is_obstruct <= 0 && this._data.building_index == -1 && tempData.goto_battle_count < tempData.hero_data_array.length;

        if (this._data.edge_flag & EdgeEnum.RIGHT || this._data.edge_flag & EdgeEnum.BOTTOM) {
            if (!waterNode) {
                gm.pool.async_get(BundleName.FIGHT, "prefabs/" + waterName, NodePoolItem, (nodePoolItem) => {
                    if (!this.node.getChildByName(waterName)) {
                        this.node.addChild(nodePoolItem.node);
                    } else {
                        gm.pool.put(nodePoolItem.node);
                    }
                });
            }
        } else if (waterNode) {
            gm.pool.put(waterNode);
        }

        this.land_node.y = this._data.land_y_offset;
        this.update_decoration();
        this.update_building();
        this.update_wall();
        this.update_hero();
        this.update_defense_hero();
        this.update_prop();
    }

    private update_decoration(): void {
        const tempData = gm.data.fight_temp_data;
        if (this._data.decoration_index >= 0) {
            const decorationData = tempData.decoration_data_array[this._data.decoration_index];
            if (decorationData) {
                const decorationItem = tempData.decoration_item_array[this._data.decoration_index];
                if (decorationItem) {
                    decorationItem.data = decorationData;
                } else {
                    gm.pool.async_get(BundleName.FIGHT, "prefabs/fight_decoration_item", FightDecorationItem, (item) => {
                        if (tempData.decoration_item_array[this._data.decoration_index]) {
                            gm.pool.put(item.node);
                        } else {
                            const layer = gm.data.fight_temp_data.get_dynamic_node_layer(decorationData.grid_index, FightDynamicNodeLayer.DECORATION);
                            gm.ui.fight.map_node.addChild(item.node, layer);
                            item.node.position = tempData.grid_position_to_position(decorationData.grid_position);
                            item.data = decorationData;
                            if (tempData.is_debug) {
                                item.node.name = cc.js.formatStr("fight_decoration_item_gridIndex@%d_zIndex@%d", decorationData.grid_index, layer);
                            }
                            tempData.decoration_item_array[this._data.decoration_index] = item;
                        }
                    });
                }
            }
        }
    }

    private update_building(): void {
        const tempData = gm.data.fight_temp_data;
        if (this._data.building_index > -1) {
            const buildingData = tempData.building_data_array[this._data.building_index];
            if (buildingData) {
                const buildingItem = tempData.building_item_array[this._data.building_index];
                if (buildingItem) {
                    buildingItem.data = buildingData;
                } else {
                    gm.pool.async_get(BundleName.FIGHT, "prefabs/fight_building_item", FightBuildingItem, (item) => {
                        if (tempData.building_item_array[this._data.building_index]) {
                            gm.pool.put(item.node);
                        } else {
                            const layer = gm.data.fight_temp_data.get_dynamic_node_layer(buildingData.grid_index, FightDynamicNodeLayer.BUILDING);
                            gm.ui.fight.map_node.addChild(item.node, layer);
                            item.node.position = tempData.grid_position_to_position(buildingData.grid_position);
                            item.data = buildingData;
                            if (tempData.is_debug) {
                                item.node.name = cc.js.formatStr("fight_building_item_gridIndex@%d_zIndex@%d", buildingData.grid_index, layer);
                            }
                            tempData.building_item_array[this._data.building_index] = item;
                        }
                    });
                }
            }
        }
    }

    private update_wall(): void {
        const tempData = gm.data.fight_temp_data;
        if (this._data.wall_index > -1) {
            const wallData = tempData.wall_data_array[this._data.wall_index];
            if (wallData && wallData.hp > 0) {
                const wallItem = tempData.wall_item_array[this._data.wall_index];
                if (!wallItem) {
                    gm.pool.async_get(BundleName.FIGHT, "prefabs/fight_wall_item", FightWallItem, (item) => {
                        if (tempData.wall_item_array[this._data.wall_index]) {
                            gm.pool.put(item.node);
                        } else {
                            const layer = gm.data.fight_temp_data.get_dynamic_node_layer(wallData.grid_index, FightDynamicNodeLayer.BUILDING);
                            gm.ui.fight.map_node.addChild(item.node, layer);
                            item.node.position = tempData.grid_position_to_position(wallData.grid_position);
                            item.data = wallData;
                            if (tempData.is_debug) {
                                item.node.name = cc.js.formatStr("fight_wall_item_gridIndex@%d_zIndex@%d", wallData.grid_index, layer);
                            }
                            tempData.wall_item_array[this._data.wall_index] = item;
                        }
                    });
                } else {
                    wallItem.data = wallData;
                }
            }
        }
    }

    private update_defense_hero(): void {
        const tempData = gm.data.fight_temp_data;
        if (this._data.defense_hero_index_array.length > 0) {
            for (let i = 0; i < this._data.defense_hero_index_array.length; i++) {
                const index = this._data.defense_hero_index_array[i];
                const heroData = tempData.defense_hero_data_array[index.defense_hero_index];
                if (heroData) {
                    heroData.grid_index = this._data.cell_id;
                    heroData.grid_position.x = this._data.grid_position.x;
                    heroData.grid_position.y = this._data.grid_position.y;
                    const heroItem = tempData.defense_hero_array[index.defense_hero_index];
                    if (!heroItem && heroData.hp > 0) {
                        gm.pool.async_get(BundleName.FIGHT, "prefabs/fight_hero_item", FightHeroItem, (item) => {
                            if (tempData.defense_hero_array[index.defense_hero_index]) {
                                gm.pool.put(item.node);
                            } else {
                                const layer = gm.data.fight_temp_data.get_dynamic_node_layer(heroData.grid_index, FightDynamicNodeLayer.MOVE);
                                gm.ui.fight.map_node.addChild(item.node, layer);
                                item.node.position = tempData.grid_position_to_position(heroData.grid_position);
                                if (tempData.is_debug) {
                                    item.node.name = cc.js.formatStr("fight_hero_item_gridIndex@%d_zIndex@%d", heroData.grid_index, layer);
                                }
                                item.data = heroData;
                                tempData.defense_hero_array[index.defense_hero_index] = item;
                            }
                        });
                    } else if (heroItem) {
                        heroItem.data = heroData;
                    }
                }
            }
        }
    }

    private update_hero(): void {
        const fightTempData = gm.data.fight_temp_data;

        if (this._data.hero_index_array.length > 0) {
            for (let heroIndex of this._data.hero_index_array) {
                const heroDataIndex = heroIndex.hero_index;
                const heroData = fightTempData.hero_data_array[heroDataIndex];

                heroData.grid_index = this._data.cell_id;
                heroData.grid_position.x = this._data.grid_position.x;
                heroData.grid_position.y = this._data.grid_position.y;

                let heroItem = fightTempData.hero_item_array[heroDataIndex];

                if (!heroItem && heroData.hp > 0) {
                    gm.pool.async_get(BundleName.FIGHT, "prefabs/fight_hero_item", FightHeroItem, (loadedItem) => {
                        heroItem = fightTempData.hero_item_array[heroDataIndex];

                        if (heroItem) {
                            gm.pool.put(loadedItem.node);
                        } else {
                            const dynamicNodeLayer = gm.data.fight_temp_data.get_dynamic_node_layer(heroData.grid_index, FightDynamicNodeLayer.MOVE);
                            gm.ui.fight.map_node.addChild(loadedItem.node, dynamicNodeLayer);

                            loadedItem.node.position = fightTempData.grid_position_to_position(heroData.grid_position);

                            if (fightTempData.is_debug) {
                                loadedItem.node.name = `fight_hero_item_gridIndex@${heroData.grid_index}_zIndex@${dynamicNodeLayer}`;
                            }

                            loadedItem.data = heroData;
                            fightTempData.hero_item_array[heroDataIndex] = loadedItem;
                        }
                    });
                } else if (heroItem) {
                    heroItem.data = heroData;
                }
            }
        }
    }

    private update_prop(): void {
        const tempData = gm.data.fight_temp_data;
        if (this._data.prop_index > -1) {
            const propData = tempData.prop_data_array[this._data.prop_index];
            if (propData) {
                const propItem = tempData.prop_item_array[this._data.prop_index];
                if (propItem) {
                    propItem.data = propData;
                } else {
                    gm.pool.async_get(BundleName.FIGHT, "prefabs/fight_prop_item", FightPropItem, (item) => {
                        if (tempData.prop_item_array[this._data.prop_index]) {
                            gm.pool.put(item.node);
                        } else {
                            const layer = gm.data.fight_temp_data.get_dynamic_node_layer(propData.grid_index, FightDynamicNodeLayer.PROP);
                            gm.ui.fight.map_node.addChild(item.node, layer);
                            item.node.position = tempData.grid_position_to_position(propData.grid_position);
                            item.data = propData;
                            if (tempData.is_debug) {
                                item.node.name = cc.js.formatStr("fight_prop_item_gridIndex@%d_zIndex@%d", propData.grid_index, layer);
                            }
                            tempData.prop_item_array[this._data.prop_index] = item;
                        }
                    });
                }
            }
        }
    }

    public pick_up_prop(): void {
        const tempData = gm.data.fight_temp_data;
        if (this._data.prop_index > -1) {
            const propItem = tempData.prop_item_array[this._data.prop_index];
            if (propItem) {
                tempData.pick_up_prop(this._data.prop_index);
                this._data.prop_index = -1;
                gm.ui.fight.fly_to_boat(propItem.node, false);
            }
        }
    }

    public unuse(): void {
        super.unuse();
        this.reset();
    }

    public reset(): void {
        this.land_spr.spriteFrame = null;
        for (let i = 0; i < this.node.childrenCount; i++) {
            const child = this.node.children[i].getComponent(NodePoolItem);
            if (child) {
                gm.pool.put(child.node);
            }
        }
    }

    private on_touch_end_handler(): void {
        const tempData = gm.data.fight_temp_data;
        console.log("click cell index:%d x:%d y:%d", this._data.cell_id, this._data.grid_position.x, this._data.grid_position.y);
        if (this._data.edge_flag > 0 && this._data.enter > 0 && this._data.is_obstruct <= 0 && this._data.building_index == -1 && tempData.goto_battle_count < tempData.hero_data_array.length) {
            gm.ui.fight.goto_battle(this);
        }
    }

    private show_num(itemData: FightNumItemData): void {
        const worldPosition = this.land_node.convertToWorldSpaceAR(cc.v3(0, 100));
        const localPosition = gm.ui.fight.text_node.convertToNodeSpaceAR(worldPosition);
        gm.pool.async_get(BundleName.FIGHT, "prefabs/fight_num_item", FightNumItem, (item) => {
            item.data = itemData;
            item.node.position = localPosition;
            gm.ui.fight.text_node.addChild(item.node);
        });
    }
}