"use strict";
cc._RF.push(module, '0967c26mrRAv7046XSxOe0o', 'FightMapItem');
// fight/scripts/FightMapItem.ts

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
exports.FightMapItem = void 0;
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var FightTempData_1 = require("../../start-scene/scripts/FightTempData");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var FightDecorationItem_1 = require("./FightDecorationItem");
var FightBuildingItem_1 = require("./FightBuildingItem");
var FightNumItem_1 = require("./FightNumItem");
var FightPropItem_1 = require("./FightPropItem");
var FightWallItem_1 = require("./FightWallItem");
var Constants_1 = require("../../start-scene/scripts/Constants");
var FightConstants_1 = require("../../start-scene/scripts/FightConstants");
var Utils_1 = require("../../start-scene/scripts/Utils");
var FightHeroItem_1 = require("./FightHeroItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FightMapItem = /** @class */ (function (_super) {
    __extends(FightMapItem, _super);
    function FightMapItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.land_node = null;
        _this.land_spr = null;
        _this.yellow_node = null;
        return _this;
    }
    Object.defineProperty(FightMapItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            this.land_spr.node.color = cc.Color.WHITE;
            this.update_view();
        },
        enumerable: false,
        configurable: true
    });
    FightMapItem.prototype.onEnable = function () {
        this.land_node.on(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
    };
    FightMapItem.prototype.onDisable = function () {
        this.land_node.off(cc.Node.EventType.TOUCH_END, this.on_touch_end_handler, this);
    };
    FightMapItem.prototype.update_view = function () {
        var _this = this;
        var tempData = GameManager_1.gm.data.fight_temp_data;
        if (tempData.is_debug && !tempData.getWalkable(this._data.grid_position)) {
            this.land_spr.node.color = cc.Color.BLACK;
        }
        Utils_1.Utils.async_set_sprite_frame(this.land_spr, Constants_1.BundleName.TEST, "res/" + this._data.land_img_id);
        var waterName = "water_" + this._data.water_img_id;
        var waterNode = this.node.getChildByName(waterName);
        this.yellow_node.active = this._data.edge_flag > 0 && this._data.enter > 0 && this._data.is_obstruct <= 0 && this._data.building_index == -1 && tempData.goto_battle_count < tempData.hero_data_array.length;
        if (this._data.edge_flag & FightTempData_1.EdgeEnum.RIGHT || this._data.edge_flag & FightTempData_1.EdgeEnum.BOTTOM) {
            if (!waterNode) {
                GameManager_1.gm.pool.async_get(Constants_1.BundleName.FIGHT, "prefabs/" + waterName, NodePoolItem_1.NodePoolItem, function (nodePoolItem) {
                    if (!_this.node.getChildByName(waterName)) {
                        _this.node.addChild(nodePoolItem.node);
                    }
                    else {
                        GameManager_1.gm.pool.put(nodePoolItem.node);
                    }
                });
            }
        }
        else if (waterNode) {
            GameManager_1.gm.pool.put(waterNode);
        }
        this.land_node.y = this._data.land_y_offset;
        this.update_decoration();
        this.update_building();
        this.update_wall();
        this.update_hero();
        this.update_defense_hero();
        this.update_prop();
    };
    FightMapItem.prototype.update_decoration = function () {
        var _this = this;
        var tempData = GameManager_1.gm.data.fight_temp_data;
        if (this._data.decoration_index >= 0) {
            var decorationData_1 = tempData.decoration_data_array[this._data.decoration_index];
            if (decorationData_1) {
                var decorationItem = tempData.decoration_item_array[this._data.decoration_index];
                if (decorationItem) {
                    decorationItem.data = decorationData_1;
                }
                else {
                    GameManager_1.gm.pool.async_get(Constants_1.BundleName.FIGHT, "prefabs/fight_decoration_item", FightDecorationItem_1.FightDecorationItem, function (item) {
                        if (tempData.decoration_item_array[_this._data.decoration_index]) {
                            GameManager_1.gm.pool.put(item.node);
                        }
                        else {
                            var layer = GameManager_1.gm.data.fight_temp_data.get_dynamic_node_layer(decorationData_1.grid_index, FightConstants_1.FightDynamicNodeLayer.DECORATION);
                            GameManager_1.gm.ui.fight.map_node.addChild(item.node, layer);
                            item.node.position = tempData.grid_position_to_position(decorationData_1.grid_position);
                            item.data = decorationData_1;
                            if (tempData.is_debug) {
                                item.node.name = cc.js.formatStr("fight_decoration_item_gridIndex@%d_zIndex@%d", decorationData_1.grid_index, layer);
                            }
                            tempData.decoration_item_array[_this._data.decoration_index] = item;
                        }
                    });
                }
            }
        }
    };
    FightMapItem.prototype.update_building = function () {
        var _this = this;
        var tempData = GameManager_1.gm.data.fight_temp_data;
        if (this._data.building_index > -1) {
            var buildingData_1 = tempData.building_data_array[this._data.building_index];
            if (buildingData_1) {
                var buildingItem = tempData.building_item_array[this._data.building_index];
                if (buildingItem) {
                    buildingItem.data = buildingData_1;
                }
                else {
                    GameManager_1.gm.pool.async_get(Constants_1.BundleName.FIGHT, "prefabs/fight_building_item", FightBuildingItem_1.FightBuildingItem, function (item) {
                        if (tempData.building_item_array[_this._data.building_index]) {
                            GameManager_1.gm.pool.put(item.node);
                        }
                        else {
                            var layer = GameManager_1.gm.data.fight_temp_data.get_dynamic_node_layer(buildingData_1.grid_index, FightConstants_1.FightDynamicNodeLayer.BUILDING);
                            GameManager_1.gm.ui.fight.map_node.addChild(item.node, layer);
                            item.node.position = tempData.grid_position_to_position(buildingData_1.grid_position);
                            item.data = buildingData_1;
                            if (tempData.is_debug) {
                                item.node.name = cc.js.formatStr("fight_building_item_gridIndex@%d_zIndex@%d", buildingData_1.grid_index, layer);
                            }
                            tempData.building_item_array[_this._data.building_index] = item;
                        }
                    });
                }
            }
        }
    };
    FightMapItem.prototype.update_wall = function () {
        var _this = this;
        var tempData = GameManager_1.gm.data.fight_temp_data;
        if (this._data.wall_index > -1) {
            var wallData_1 = tempData.wall_data_array[this._data.wall_index];
            if (wallData_1 && wallData_1.hp > 0) {
                var wallItem = tempData.wall_item_array[this._data.wall_index];
                if (!wallItem) {
                    GameManager_1.gm.pool.async_get(Constants_1.BundleName.FIGHT, "prefabs/fight_wall_item", FightWallItem_1.FightWallItem, function (item) {
                        if (tempData.wall_item_array[_this._data.wall_index]) {
                            GameManager_1.gm.pool.put(item.node);
                        }
                        else {
                            var layer = GameManager_1.gm.data.fight_temp_data.get_dynamic_node_layer(wallData_1.grid_index, FightConstants_1.FightDynamicNodeLayer.BUILDING);
                            GameManager_1.gm.ui.fight.map_node.addChild(item.node, layer);
                            item.node.position = tempData.grid_position_to_position(wallData_1.grid_position);
                            item.data = wallData_1;
                            if (tempData.is_debug) {
                                item.node.name = cc.js.formatStr("fight_wall_item_gridIndex@%d_zIndex@%d", wallData_1.grid_index, layer);
                            }
                            tempData.wall_item_array[_this._data.wall_index] = item;
                        }
                    });
                }
                else {
                    wallItem.data = wallData_1;
                }
            }
        }
    };
    FightMapItem.prototype.update_defense_hero = function () {
        var tempData = GameManager_1.gm.data.fight_temp_data;
        if (this._data.defense_hero_index_array.length > 0) {
            var _loop_1 = function (i) {
                var index = this_1._data.defense_hero_index_array[i];
                var heroData = tempData.defense_hero_data_array[index.defense_hero_index];
                if (heroData) {
                    heroData.grid_index = this_1._data.cell_id;
                    heroData.grid_position.x = this_1._data.grid_position.x;
                    heroData.grid_position.y = this_1._data.grid_position.y;
                    var heroItem = tempData.defense_hero_array[index.defense_hero_index];
                    if (!heroItem && heroData.hp > 0) {
                        GameManager_1.gm.pool.async_get(Constants_1.BundleName.FIGHT, "prefabs/fight_hero_item", FightHeroItem_1.FightHeroItem, function (item) {
                            if (tempData.defense_hero_array[index.defense_hero_index]) {
                                GameManager_1.gm.pool.put(item.node);
                            }
                            else {
                                var layer = GameManager_1.gm.data.fight_temp_data.get_dynamic_node_layer(heroData.grid_index, FightConstants_1.FightDynamicNodeLayer.MOVE);
                                GameManager_1.gm.ui.fight.map_node.addChild(item.node, layer);
                                item.node.position = tempData.grid_position_to_position(heroData.grid_position);
                                if (tempData.is_debug) {
                                    item.node.name = cc.js.formatStr("fight_hero_item_gridIndex@%d_zIndex@%d", heroData.grid_index, layer);
                                }
                                item.data = heroData;
                                tempData.defense_hero_array[index.defense_hero_index] = item;
                            }
                        });
                    }
                    else if (heroItem) {
                        heroItem.data = heroData;
                    }
                }
            };
            var this_1 = this;
            for (var i = 0; i < this._data.defense_hero_index_array.length; i++) {
                _loop_1(i);
            }
        }
    };
    FightMapItem.prototype.update_hero = function () {
        var fightTempData = GameManager_1.gm.data.fight_temp_data;
        if (this._data.hero_index_array.length > 0) {
            var _loop_2 = function (heroIndex) {
                var heroDataIndex = heroIndex.hero_index;
                var heroData = fightTempData.hero_data_array[heroDataIndex];
                heroData.grid_index = this_2._data.cell_id;
                heroData.grid_position.x = this_2._data.grid_position.x;
                heroData.grid_position.y = this_2._data.grid_position.y;
                var heroItem = fightTempData.hero_item_array[heroDataIndex];
                if (!heroItem && heroData.hp > 0) {
                    GameManager_1.gm.pool.async_get(Constants_1.BundleName.FIGHT, "prefabs/fight_hero_item", FightHeroItem_1.FightHeroItem, function (loadedItem) {
                        heroItem = fightTempData.hero_item_array[heroDataIndex];
                        if (heroItem) {
                            GameManager_1.gm.pool.put(loadedItem.node);
                        }
                        else {
                            var dynamicNodeLayer = GameManager_1.gm.data.fight_temp_data.get_dynamic_node_layer(heroData.grid_index, FightConstants_1.FightDynamicNodeLayer.MOVE);
                            GameManager_1.gm.ui.fight.map_node.addChild(loadedItem.node, dynamicNodeLayer);
                            loadedItem.node.position = fightTempData.grid_position_to_position(heroData.grid_position);
                            if (fightTempData.is_debug) {
                                loadedItem.node.name = "fight_hero_item_gridIndex@" + heroData.grid_index + "_zIndex@" + dynamicNodeLayer;
                            }
                            loadedItem.data = heroData;
                            fightTempData.hero_item_array[heroDataIndex] = loadedItem;
                        }
                    });
                }
                else if (heroItem) {
                    heroItem.data = heroData;
                }
            };
            var this_2 = this;
            for (var _i = 0, _a = this._data.hero_index_array; _i < _a.length; _i++) {
                var heroIndex = _a[_i];
                _loop_2(heroIndex);
            }
        }
    };
    FightMapItem.prototype.update_prop = function () {
        var _this = this;
        var tempData = GameManager_1.gm.data.fight_temp_data;
        if (this._data.prop_index > -1) {
            var propData_1 = tempData.prop_data_array[this._data.prop_index];
            if (propData_1) {
                var propItem = tempData.prop_item_array[this._data.prop_index];
                if (propItem) {
                    propItem.data = propData_1;
                }
                else {
                    GameManager_1.gm.pool.async_get(Constants_1.BundleName.FIGHT, "prefabs/fight_prop_item", FightPropItem_1.FightPropItem, function (item) {
                        if (tempData.prop_item_array[_this._data.prop_index]) {
                            GameManager_1.gm.pool.put(item.node);
                        }
                        else {
                            var layer = GameManager_1.gm.data.fight_temp_data.get_dynamic_node_layer(propData_1.grid_index, FightConstants_1.FightDynamicNodeLayer.PROP);
                            GameManager_1.gm.ui.fight.map_node.addChild(item.node, layer);
                            item.node.position = tempData.grid_position_to_position(propData_1.grid_position);
                            item.data = propData_1;
                            if (tempData.is_debug) {
                                item.node.name = cc.js.formatStr("fight_prop_item_gridIndex@%d_zIndex@%d", propData_1.grid_index, layer);
                            }
                            tempData.prop_item_array[_this._data.prop_index] = item;
                        }
                    });
                }
            }
        }
    };
    FightMapItem.prototype.pick_up_prop = function () {
        var tempData = GameManager_1.gm.data.fight_temp_data;
        if (this._data.prop_index > -1) {
            var propItem = tempData.prop_item_array[this._data.prop_index];
            if (propItem) {
                tempData.pick_up_prop(this._data.prop_index);
                this._data.prop_index = -1;
                GameManager_1.gm.ui.fight.fly_to_boat(propItem.node, false);
            }
        }
    };
    FightMapItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.reset();
    };
    FightMapItem.prototype.reset = function () {
        this.land_spr.spriteFrame = null;
        for (var i = 0; i < this.node.childrenCount; i++) {
            var child = this.node.children[i].getComponent(NodePoolItem_1.NodePoolItem);
            if (child) {
                GameManager_1.gm.pool.put(child.node);
            }
        }
    };
    FightMapItem.prototype.on_touch_end_handler = function () {
        var tempData = GameManager_1.gm.data.fight_temp_data;
        console.log("click cell index:%d x:%d y:%d", this._data.cell_id, this._data.grid_position.x, this._data.grid_position.y);
        if (this._data.edge_flag > 0 && this._data.enter > 0 && this._data.is_obstruct <= 0 && this._data.building_index == -1 && tempData.goto_battle_count < tempData.hero_data_array.length) {
            GameManager_1.gm.ui.fight.goto_battle(this);
        }
    };
    FightMapItem.prototype.show_num = function (itemData) {
        var worldPosition = this.land_node.convertToWorldSpaceAR(cc.v3(0, 100));
        var localPosition = GameManager_1.gm.ui.fight.text_node.convertToNodeSpaceAR(worldPosition);
        GameManager_1.gm.pool.async_get(Constants_1.BundleName.FIGHT, "prefabs/fight_num_item", FightNumItem_1.FightNumItem, function (item) {
            item.data = itemData;
            item.node.position = localPosition;
            GameManager_1.gm.ui.fight.text_node.addChild(item.node);
        });
    };
    __decorate([
        property(cc.Node)
    ], FightMapItem.prototype, "land_node", void 0);
    __decorate([
        property(cc.Sprite)
    ], FightMapItem.prototype, "land_spr", void 0);
    __decorate([
        property(cc.Node)
    ], FightMapItem.prototype, "yellow_node", void 0);
    FightMapItem = __decorate([
        ccclass
    ], FightMapItem);
    return FightMapItem;
}(NodePoolItem_1.NodePoolItem));
exports.FightMapItem = FightMapItem;

cc._RF.pop();