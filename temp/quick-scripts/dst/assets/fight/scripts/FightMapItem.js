
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/fight/scripts/FightMapItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZmlnaHRcXHNjcmlwdHNcXEZpZ2h0TWFwSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUVBQXNFO0FBQ3RFLHlFQUFxRjtBQUNyRixxRUFBMkQ7QUFDM0QsNkRBQTREO0FBQzVELHlEQUF3RDtBQUN4RCwrQ0FBZ0U7QUFDaEUsaURBQWdEO0FBQ2hELGlEQUFnRDtBQUNoRCxpRUFBaUU7QUFDakUsMkVBQWlGO0FBQ2pGLHlEQUF3RDtBQUN4RCxpREFBZ0Q7QUFFMUMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBa0MsZ0NBQVk7SUFBOUM7UUFBQSxxRUF1U0M7UUFyU1UsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixjQUFRLEdBQWMsSUFBSSxDQUFDO1FBRzFCLGlCQUFXLEdBQVksSUFBSSxDQUFDOztJQStSeEMsQ0FBQztJQTFSRyxzQkFBSSw4QkFBSTthQUFSO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7YUFFRCxVQUFTLEtBQXVCO1lBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUMxQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQzs7O09BTkE7SUFRUywrQkFBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVTLGdDQUFTLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FB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QUFJLENBQUM7bURBQ2U7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztrREFDYztJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUNrQjtJQVIzQixZQUFZO1FBRHhCLE9BQU87T0FDSyxZQUFZLENBdVN4QjtJQUFELG1CQUFDO0NBdlNELEFBdVNDLENBdlNpQywyQkFBWSxHQXVTN0M7QUF2U1ksb0NBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOb2RlUG9vbEl0ZW0gfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL05vZGVQb29sSXRlbSc7XHJcbmltcG9ydCB7IEVkZ2VFbnVtLCBGaWdodE1hcEl0ZW1EYXRhIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9GaWdodFRlbXBEYXRhJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgRmlnaHREZWNvcmF0aW9uSXRlbSB9IGZyb20gJy4vRmlnaHREZWNvcmF0aW9uSXRlbSc7XHJcbmltcG9ydCB7IEZpZ2h0QnVpbGRpbmdJdGVtIH0gZnJvbSAnLi9GaWdodEJ1aWxkaW5nSXRlbSc7XHJcbmltcG9ydCB7IEZpZ2h0TnVtSXRlbSwgRmlnaHROdW1JdGVtRGF0YSB9IGZyb20gJy4vRmlnaHROdW1JdGVtJztcclxuaW1wb3J0IHsgRmlnaHRQcm9wSXRlbSB9IGZyb20gJy4vRmlnaHRQcm9wSXRlbSc7XHJcbmltcG9ydCB7IEZpZ2h0V2FsbEl0ZW0gfSBmcm9tICcuL0ZpZ2h0V2FsbEl0ZW0nO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBGaWdodER5bmFtaWNOb2RlTGF5ZXIgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0ZpZ2h0Q29uc3RhbnRzJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1V0aWxzJztcclxuaW1wb3J0IHsgRmlnaHRIZXJvSXRlbSB9IGZyb20gJy4vRmlnaHRIZXJvSXRlbSc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIEZpZ2h0TWFwSXRlbSBleHRlbmRzIE5vZGVQb29sSXRlbSB7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHB1YmxpYyBsYW5kX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwdWJsaWMgbGFuZF9zcHI6IGNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHllbGxvd19ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9kYXRhOiBGaWdodE1hcEl0ZW1EYXRhO1xyXG4gICAgcHVibGljIG1vZGVsOiBudW1iZXI7XHJcblxyXG4gICAgZ2V0IGRhdGEoKTogRmlnaHRNYXBJdGVtRGF0YSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGRhdGEodmFsdWU6IEZpZ2h0TWFwSXRlbURhdGEpIHtcclxuICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5sYW5kX3Nwci5ub2RlLmNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxhbmRfbm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25fdG91Y2hfZW5kX2hhbmRsZXIsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sYW5kX25vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbl90b3VjaF9lbmRfaGFuZGxlciwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZV92aWV3KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRlbXBEYXRhID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGE7XHJcbiAgICAgICAgaWYgKHRlbXBEYXRhLmlzX2RlYnVnICYmICF0ZW1wRGF0YS5nZXRXYWxrYWJsZSh0aGlzLl9kYXRhLmdyaWRfcG9zaXRpb24pKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFuZF9zcHIubm9kZS5jb2xvciA9IGNjLkNvbG9yLkJMQUNLO1xyXG4gICAgICAgIH1cclxuICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMubGFuZF9zcHIsIEJ1bmRsZU5hbWUuVEVTVCwgXCJyZXMvXCIgKyB0aGlzLl9kYXRhLmxhbmRfaW1nX2lkKTtcclxuICAgICAgICBjb25zdCB3YXRlck5hbWUgPSBcIndhdGVyX1wiICsgdGhpcy5fZGF0YS53YXRlcl9pbWdfaWQ7XHJcbiAgICAgICAgY29uc3Qgd2F0ZXJOb2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKHdhdGVyTmFtZSk7XHJcbiAgICAgICAgdGhpcy55ZWxsb3dfbm9kZS5hY3RpdmUgPSB0aGlzLl9kYXRhLmVkZ2VfZmxhZyA+IDAgJiYgdGhpcy5fZGF0YS5lbnRlciA+IDAgJiYgdGhpcy5fZGF0YS5pc19vYnN0cnVjdCA8PSAwICYmIHRoaXMuX2RhdGEuYnVpbGRpbmdfaW5kZXggPT0gLTEgJiYgdGVtcERhdGEuZ290b19iYXR0bGVfY291bnQgPCB0ZW1wRGF0YS5oZXJvX2RhdGFfYXJyYXkubGVuZ3RoO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fZGF0YS5lZGdlX2ZsYWcgJiBFZGdlRW51bS5SSUdIVCB8fCB0aGlzLl9kYXRhLmVkZ2VfZmxhZyAmIEVkZ2VFbnVtLkJPVFRPTSkge1xyXG4gICAgICAgICAgICBpZiAoIXdhdGVyTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoQnVuZGxlTmFtZS5GSUdIVCwgXCJwcmVmYWJzL1wiICsgd2F0ZXJOYW1lLCBOb2RlUG9vbEl0ZW0sIChub2RlUG9vbEl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSh3YXRlck5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlUG9vbEl0ZW0ubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5wdXQobm9kZVBvb2xJdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh3YXRlck5vZGUpIHtcclxuICAgICAgICAgICAgZ20ucG9vbC5wdXQod2F0ZXJOb2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGFuZF9ub2RlLnkgPSB0aGlzLl9kYXRhLmxhbmRfeV9vZmZzZXQ7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfZGVjb3JhdGlvbigpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2J1aWxkaW5nKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfd2FsbCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX2hlcm8oKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9kZWZlbnNlX2hlcm8oKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9wcm9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVfZGVjb3JhdGlvbigpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0ZW1wRGF0YSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhO1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhLmRlY29yYXRpb25faW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBkZWNvcmF0aW9uRGF0YSA9IHRlbXBEYXRhLmRlY29yYXRpb25fZGF0YV9hcnJheVt0aGlzLl9kYXRhLmRlY29yYXRpb25faW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoZGVjb3JhdGlvbkRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlY29yYXRpb25JdGVtID0gdGVtcERhdGEuZGVjb3JhdGlvbl9pdGVtX2FycmF5W3RoaXMuX2RhdGEuZGVjb3JhdGlvbl9pbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVjb3JhdGlvbkl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWNvcmF0aW9uSXRlbS5kYXRhID0gZGVjb3JhdGlvbkRhdGE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuRklHSFQsIFwicHJlZmFicy9maWdodF9kZWNvcmF0aW9uX2l0ZW1cIiwgRmlnaHREZWNvcmF0aW9uSXRlbSwgKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBEYXRhLmRlY29yYXRpb25faXRlbV9hcnJheVt0aGlzLl9kYXRhLmRlY29yYXRpb25faW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5wb29sLnB1dChpdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGF5ZXIgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5nZXRfZHluYW1pY19ub2RlX2xheWVyKGRlY29yYXRpb25EYXRhLmdyaWRfaW5kZXgsIEZpZ2h0RHluYW1pY05vZGVMYXllci5ERUNPUkFUSU9OKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmZpZ2h0Lm1hcF9ub2RlLmFkZENoaWxkKGl0ZW0ubm9kZSwgbGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5ub2RlLnBvc2l0aW9uID0gdGVtcERhdGEuZ3JpZF9wb3NpdGlvbl90b19wb3NpdGlvbihkZWNvcmF0aW9uRGF0YS5ncmlkX3Bvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZGF0YSA9IGRlY29yYXRpb25EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBEYXRhLmlzX2RlYnVnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5ub2RlLm5hbWUgPSBjYy5qcy5mb3JtYXRTdHIoXCJmaWdodF9kZWNvcmF0aW9uX2l0ZW1fZ3JpZEluZGV4QCVkX3pJbmRleEAlZFwiLCBkZWNvcmF0aW9uRGF0YS5ncmlkX2luZGV4LCBsYXllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRGF0YS5kZWNvcmF0aW9uX2l0ZW1fYXJyYXlbdGhpcy5fZGF0YS5kZWNvcmF0aW9uX2luZGV4XSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZV9idWlsZGluZygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0ZW1wRGF0YSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhO1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhLmJ1aWxkaW5nX2luZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgY29uc3QgYnVpbGRpbmdEYXRhID0gdGVtcERhdGEuYnVpbGRpbmdfZGF0YV9hcnJheVt0aGlzLl9kYXRhLmJ1aWxkaW5nX2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKGJ1aWxkaW5nRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnVpbGRpbmdJdGVtID0gdGVtcERhdGEuYnVpbGRpbmdfaXRlbV9hcnJheVt0aGlzLl9kYXRhLmJ1aWxkaW5nX2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChidWlsZGluZ0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZGluZ0l0ZW0uZGF0YSA9IGJ1aWxkaW5nRGF0YTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoQnVuZGxlTmFtZS5GSUdIVCwgXCJwcmVmYWJzL2ZpZ2h0X2J1aWxkaW5nX2l0ZW1cIiwgRmlnaHRCdWlsZGluZ0l0ZW0sIChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wRGF0YS5idWlsZGluZ19pdGVtX2FycmF5W3RoaXMuX2RhdGEuYnVpbGRpbmdfaW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5wb29sLnB1dChpdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGF5ZXIgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5nZXRfZHluYW1pY19ub2RlX2xheWVyKGJ1aWxkaW5nRGF0YS5ncmlkX2luZGV4LCBGaWdodER5bmFtaWNOb2RlTGF5ZXIuQlVJTERJTkcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuZmlnaHQubWFwX25vZGUuYWRkQ2hpbGQoaXRlbS5ub2RlLCBsYXllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm5vZGUucG9zaXRpb24gPSB0ZW1wRGF0YS5ncmlkX3Bvc2l0aW9uX3RvX3Bvc2l0aW9uKGJ1aWxkaW5nRGF0YS5ncmlkX3Bvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZGF0YSA9IGJ1aWxkaW5nRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wRGF0YS5pc19kZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubm9kZS5uYW1lID0gY2MuanMuZm9ybWF0U3RyKFwiZmlnaHRfYnVpbGRpbmdfaXRlbV9ncmlkSW5kZXhAJWRfekluZGV4QCVkXCIsIGJ1aWxkaW5nRGF0YS5ncmlkX2luZGV4LCBsYXllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRGF0YS5idWlsZGluZ19pdGVtX2FycmF5W3RoaXMuX2RhdGEuYnVpbGRpbmdfaW5kZXhdID0gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlX3dhbGwoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdGVtcERhdGEgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YTtcclxuICAgICAgICBpZiAodGhpcy5fZGF0YS53YWxsX2luZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgY29uc3Qgd2FsbERhdGEgPSB0ZW1wRGF0YS53YWxsX2RhdGFfYXJyYXlbdGhpcy5fZGF0YS53YWxsX2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKHdhbGxEYXRhICYmIHdhbGxEYXRhLmhwID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgd2FsbEl0ZW0gPSB0ZW1wRGF0YS53YWxsX2l0ZW1fYXJyYXlbdGhpcy5fZGF0YS53YWxsX2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmICghd2FsbEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5wb29sLmFzeW5jX2dldChCdW5kbGVOYW1lLkZJR0hULCBcInByZWZhYnMvZmlnaHRfd2FsbF9pdGVtXCIsIEZpZ2h0V2FsbEl0ZW0sIChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wRGF0YS53YWxsX2l0ZW1fYXJyYXlbdGhpcy5fZGF0YS53YWxsX2luZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5wdXQoaXRlbS5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxheWVyID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuZ2V0X2R5bmFtaWNfbm9kZV9sYXllcih3YWxsRGF0YS5ncmlkX2luZGV4LCBGaWdodER5bmFtaWNOb2RlTGF5ZXIuQlVJTERJTkcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuZmlnaHQubWFwX25vZGUuYWRkQ2hpbGQoaXRlbS5ub2RlLCBsYXllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm5vZGUucG9zaXRpb24gPSB0ZW1wRGF0YS5ncmlkX3Bvc2l0aW9uX3RvX3Bvc2l0aW9uKHdhbGxEYXRhLmdyaWRfcG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5kYXRhID0gd2FsbERhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVtcERhdGEuaXNfZGVidWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm5vZGUubmFtZSA9IGNjLmpzLmZvcm1hdFN0cihcImZpZ2h0X3dhbGxfaXRlbV9ncmlkSW5kZXhAJWRfekluZGV4QCVkXCIsIHdhbGxEYXRhLmdyaWRfaW5kZXgsIGxheWVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBEYXRhLndhbGxfaXRlbV9hcnJheVt0aGlzLl9kYXRhLndhbGxfaW5kZXhdID0gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3YWxsSXRlbS5kYXRhID0gd2FsbERhdGE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVfZGVmZW5zZV9oZXJvKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRlbXBEYXRhID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGE7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGEuZGVmZW5zZV9oZXJvX2luZGV4X2FycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9kYXRhLmRlZmVuc2VfaGVyb19pbmRleF9hcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9kYXRhLmRlZmVuc2VfaGVyb19pbmRleF9hcnJheVtpXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhlcm9EYXRhID0gdGVtcERhdGEuZGVmZW5zZV9oZXJvX2RhdGFfYXJyYXlbaW5kZXguZGVmZW5zZV9oZXJvX2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChoZXJvRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9EYXRhLmdyaWRfaW5kZXggPSB0aGlzLl9kYXRhLmNlbGxfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0RhdGEuZ3JpZF9wb3NpdGlvbi54ID0gdGhpcy5fZGF0YS5ncmlkX3Bvc2l0aW9uLng7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0RhdGEuZ3JpZF9wb3NpdGlvbi55ID0gdGhpcy5fZGF0YS5ncmlkX3Bvc2l0aW9uLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVyb0l0ZW0gPSB0ZW1wRGF0YS5kZWZlbnNlX2hlcm9fYXJyYXlbaW5kZXguZGVmZW5zZV9oZXJvX2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWhlcm9JdGVtICYmIGhlcm9EYXRhLmhwID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5wb29sLmFzeW5jX2dldChCdW5kbGVOYW1lLkZJR0hULCBcInByZWZhYnMvZmlnaHRfaGVyb19pdGVtXCIsIEZpZ2h0SGVyb0l0ZW0sIChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVtcERhdGEuZGVmZW5zZV9oZXJvX2FycmF5W2luZGV4LmRlZmVuc2VfaGVyb19pbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5wb29sLnB1dChpdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXllciA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmdldF9keW5hbWljX25vZGVfbGF5ZXIoaGVyb0RhdGEuZ3JpZF9pbmRleCwgRmlnaHREeW5hbWljTm9kZUxheWVyLk1PVkUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmZpZ2h0Lm1hcF9ub2RlLmFkZENoaWxkKGl0ZW0ubm9kZSwgbGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubm9kZS5wb3NpdGlvbiA9IHRlbXBEYXRhLmdyaWRfcG9zaXRpb25fdG9fcG9zaXRpb24oaGVyb0RhdGEuZ3JpZF9wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBEYXRhLmlzX2RlYnVnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubm9kZS5uYW1lID0gY2MuanMuZm9ybWF0U3RyKFwiZmlnaHRfaGVyb19pdGVtX2dyaWRJbmRleEAlZF96SW5kZXhAJWRcIiwgaGVyb0RhdGEuZ3JpZF9pbmRleCwgbGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmRhdGEgPSBoZXJvRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRGF0YS5kZWZlbnNlX2hlcm9fYXJyYXlbaW5kZXguZGVmZW5zZV9oZXJvX2luZGV4XSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaGVyb0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0l0ZW0uZGF0YSA9IGhlcm9EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZV9oZXJvKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGZpZ2h0VGVtcERhdGEgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGEuaGVyb19pbmRleF9hcnJheS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGhlcm9JbmRleCBvZiB0aGlzLl9kYXRhLmhlcm9faW5kZXhfYXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhlcm9EYXRhSW5kZXggPSBoZXJvSW5kZXguaGVyb19pbmRleDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhlcm9EYXRhID0gZmlnaHRUZW1wRGF0YS5oZXJvX2RhdGFfYXJyYXlbaGVyb0RhdGFJbmRleF07XHJcblxyXG4gICAgICAgICAgICAgICAgaGVyb0RhdGEuZ3JpZF9pbmRleCA9IHRoaXMuX2RhdGEuY2VsbF9pZDtcclxuICAgICAgICAgICAgICAgIGhlcm9EYXRhLmdyaWRfcG9zaXRpb24ueCA9IHRoaXMuX2RhdGEuZ3JpZF9wb3NpdGlvbi54O1xyXG4gICAgICAgICAgICAgICAgaGVyb0RhdGEuZ3JpZF9wb3NpdGlvbi55ID0gdGhpcy5fZGF0YS5ncmlkX3Bvc2l0aW9uLnk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGhlcm9JdGVtID0gZmlnaHRUZW1wRGF0YS5oZXJvX2l0ZW1fYXJyYXlbaGVyb0RhdGFJbmRleF07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFoZXJvSXRlbSAmJiBoZXJvRGF0YS5ocCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5wb29sLmFzeW5jX2dldChCdW5kbGVOYW1lLkZJR0hULCBcInByZWZhYnMvZmlnaHRfaGVyb19pdGVtXCIsIEZpZ2h0SGVyb0l0ZW0sIChsb2FkZWRJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9JdGVtID0gZmlnaHRUZW1wRGF0YS5oZXJvX2l0ZW1fYXJyYXlbaGVyb0RhdGFJbmRleF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGVyb0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KGxvYWRlZEl0ZW0ubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkeW5hbWljTm9kZUxheWVyID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuZ2V0X2R5bmFtaWNfbm9kZV9sYXllcihoZXJvRGF0YS5ncmlkX2luZGV4LCBGaWdodER5bmFtaWNOb2RlTGF5ZXIuTU9WRSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5maWdodC5tYXBfbm9kZS5hZGRDaGlsZChsb2FkZWRJdGVtLm5vZGUsIGR5bmFtaWNOb2RlTGF5ZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlZEl0ZW0ubm9kZS5wb3NpdGlvbiA9IGZpZ2h0VGVtcERhdGEuZ3JpZF9wb3NpdGlvbl90b19wb3NpdGlvbihoZXJvRGF0YS5ncmlkX3Bvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlnaHRUZW1wRGF0YS5pc19kZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlZEl0ZW0ubm9kZS5uYW1lID0gYGZpZ2h0X2hlcm9faXRlbV9ncmlkSW5kZXhAJHtoZXJvRGF0YS5ncmlkX2luZGV4fV96SW5kZXhAJHtkeW5hbWljTm9kZUxheWVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGVkSXRlbS5kYXRhID0gaGVyb0RhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWdodFRlbXBEYXRhLmhlcm9faXRlbV9hcnJheVtoZXJvRGF0YUluZGV4XSA9IGxvYWRlZEl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaGVyb0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvSXRlbS5kYXRhID0gaGVyb0RhdGE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVfcHJvcCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0ZW1wRGF0YSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhO1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhLnByb3BfaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9wRGF0YSA9IHRlbXBEYXRhLnByb3BfZGF0YV9hcnJheVt0aGlzLl9kYXRhLnByb3BfaW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAocHJvcERhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BJdGVtID0gdGVtcERhdGEucHJvcF9pdGVtX2FycmF5W3RoaXMuX2RhdGEucHJvcF9pbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvcEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wSXRlbS5kYXRhID0gcHJvcERhdGE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuRklHSFQsIFwicHJlZmFicy9maWdodF9wcm9wX2l0ZW1cIiwgRmlnaHRQcm9wSXRlbSwgKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBEYXRhLnByb3BfaXRlbV9hcnJheVt0aGlzLl9kYXRhLnByb3BfaW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbS5wb29sLnB1dChpdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGF5ZXIgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5nZXRfZHluYW1pY19ub2RlX2xheWVyKHByb3BEYXRhLmdyaWRfaW5kZXgsIEZpZ2h0RHluYW1pY05vZGVMYXllci5QUk9QKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmZpZ2h0Lm1hcF9ub2RlLmFkZENoaWxkKGl0ZW0ubm9kZSwgbGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5ub2RlLnBvc2l0aW9uID0gdGVtcERhdGEuZ3JpZF9wb3NpdGlvbl90b19wb3NpdGlvbihwcm9wRGF0YS5ncmlkX3Bvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZGF0YSA9IHByb3BEYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBEYXRhLmlzX2RlYnVnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5ub2RlLm5hbWUgPSBjYy5qcy5mb3JtYXRTdHIoXCJmaWdodF9wcm9wX2l0ZW1fZ3JpZEluZGV4QCVkX3pJbmRleEAlZFwiLCBwcm9wRGF0YS5ncmlkX2luZGV4LCBsYXllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRGF0YS5wcm9wX2l0ZW1fYXJyYXlbdGhpcy5fZGF0YS5wcm9wX2luZGV4XSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGlja191cF9wcm9wKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRlbXBEYXRhID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGE7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGEucHJvcF9pbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb3BJdGVtID0gdGVtcERhdGEucHJvcF9pdGVtX2FycmF5W3RoaXMuX2RhdGEucHJvcF9pbmRleF07XHJcbiAgICAgICAgICAgIGlmIChwcm9wSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgdGVtcERhdGEucGlja191cF9wcm9wKHRoaXMuX2RhdGEucHJvcF9pbmRleCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhLnByb3BfaW5kZXggPSAtMTtcclxuICAgICAgICAgICAgICAgIGdtLnVpLmZpZ2h0LmZseV90b19ib2F0KHByb3BJdGVtLm5vZGUsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdW51c2UoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIudW51c2UoKTtcclxuICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGFuZF9zcHIuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub2RlLmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IHRoaXMubm9kZS5jaGlsZHJlbltpXS5nZXRDb21wb25lbnQoTm9kZVBvb2xJdGVtKTtcclxuICAgICAgICAgICAgaWYgKGNoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICBnbS5wb29sLnB1dChjaGlsZC5ub2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uX3RvdWNoX2VuZF9oYW5kbGVyKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRlbXBEYXRhID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGE7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjbGljayBjZWxsIGluZGV4OiVkIHg6JWQgeTolZFwiLCB0aGlzLl9kYXRhLmNlbGxfaWQsIHRoaXMuX2RhdGEuZ3JpZF9wb3NpdGlvbi54LCB0aGlzLl9kYXRhLmdyaWRfcG9zaXRpb24ueSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGEuZWRnZV9mbGFnID4gMCAmJiB0aGlzLl9kYXRhLmVudGVyID4gMCAmJiB0aGlzLl9kYXRhLmlzX29ic3RydWN0IDw9IDAgJiYgdGhpcy5fZGF0YS5idWlsZGluZ19pbmRleCA9PSAtMSAmJiB0ZW1wRGF0YS5nb3RvX2JhdHRsZV9jb3VudCA8IHRlbXBEYXRhLmhlcm9fZGF0YV9hcnJheS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZ20udWkuZmlnaHQuZ290b19iYXR0bGUodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd19udW0oaXRlbURhdGE6IEZpZ2h0TnVtSXRlbURhdGEpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB3b3JsZFBvc2l0aW9uID0gdGhpcy5sYW5kX25vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYzKDAsIDEwMCkpO1xyXG4gICAgICAgIGNvbnN0IGxvY2FsUG9zaXRpb24gPSBnbS51aS5maWdodC50ZXh0X25vZGUuY29udmVydFRvTm9kZVNwYWNlQVIod29ybGRQb3NpdGlvbik7XHJcbiAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoQnVuZGxlTmFtZS5GSUdIVCwgXCJwcmVmYWJzL2ZpZ2h0X251bV9pdGVtXCIsIEZpZ2h0TnVtSXRlbSwgKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaXRlbS5kYXRhID0gaXRlbURhdGE7XHJcbiAgICAgICAgICAgIGl0ZW0ubm9kZS5wb3NpdGlvbiA9IGxvY2FsUG9zaXRpb247XHJcbiAgICAgICAgICAgIGdtLnVpLmZpZ2h0LnRleHRfbm9kZS5hZGRDaGlsZChpdGVtLm5vZGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19