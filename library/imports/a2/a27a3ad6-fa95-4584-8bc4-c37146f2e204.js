"use strict";
cc._RF.push(module, 'a27a3rW+pVFhIvEw3FG8uIE', 'FightBuildingItem');
// fight/scripts/FightBuildingItem.ts

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
exports.FightBuildingItem = void 0;
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var Constants_1 = require("../../start-scene/scripts/Constants");
var Utils_1 = require("../../start-scene/scripts/Utils");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var SkillItem_1 = require("./SkillItem");
var TaskData_1 = require("../../start-scene/scripts/TaskData");
var FightConstants_1 = require("../../start-scene/scripts/FightConstants");
var GraphicsUtils_1 = require("../../start-scene/scripts/GraphicsUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FightBuildingItem = /** @class */ (function (_super) {
    __extends(FightBuildingItem, _super);
    function FightBuildingItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.building_spr = null;
        _this.lv_lbl = null;
        _this.hp_prg = null;
        _this.star_count = null;
        _this.one_star_pos = null;
        _this.two_star_pos_array = [];
        _this.three_star_pos_array = [];
        _this.star_node_array = [];
        _this.reward_spr_array = [];
        return _this;
    }
    Object.defineProperty(FightBuildingItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            this.update_view();
        },
        enumerable: false,
        configurable: true
    });
    FightBuildingItem.prototype.update_view = function () {
        if (GameManager_1.gm.data.fight_temp_data.is_debug) {
            this.lv_lbl.node.active = true;
            this.lv_lbl.string = "" + this._data.lv;
            GraphicsUtils_1.GraphicsUtils.draw_line(this.node, cc.Color.WHITE, cc.Vec3.ZERO, cc.v3(0, this._data.call_range), 1, this._data.call_range);
            GraphicsUtils_1.GraphicsUtils.draw_circle(this.node, cc.Color.WHITE, cc.Vec3.ZERO, this._data.call_range);
        }
        else {
            this.lv_lbl.node.active = false;
        }
        var currentMapItem;
        var buildingConfig = GameManager_1.gm.config.get_row_data("BuildConfigData", this._data.id + "");
        if (buildingConfig) {
            Utils_1.Utils.async_set_sprite_frame(this.building_spr, Constants_1.BundleName.MAP, "res/build/" + buildingConfig.model);
        }
        if (GameManager_1.gm.data.fight_temp_data.is_lighthouse(this._data.id)) {
            this.building_spr.node.position = cc.v3(19, -40);
            currentMapItem = GameManager_1.gm.data.fight_temp_data.get_fight_map_item(this._data.grid_position.x, this._data.grid_position.y);
            buildingConfig = GameManager_1.gm.data.fight_temp_data.get_fight_map_item(this._data.grid_position.x, this._data.grid_position.y - 1);
            if (currentMapItem && buildingConfig) {
                buildingConfig.land_node.position = currentMapItem.land_node.position.add(cc.v3(-1, 3));
            }
        }
        else {
            this.building_spr.node.position = cc.v3(0, -37);
        }
        this.hp_prg.progress = 0 < this._data.max_hp ? this._data.hp / this._data.max_hp : 0;
        for (var index = 0; index < this.star_node_array.length; index++) {
            this.star_node_array[index].active = index < this._data.star_count;
        }
        if (this._data.star_count <= 0) {
            this.star_count.node.active = false;
        }
        else if (1 == this._data.star_count) {
            this.star_count.node.active = false;
            this.star_node_array[0].position = this.one_star_pos;
        }
        else if (2 == this._data.star_count) {
            this.star_count.node.active = false;
            for (var index = 0; index < this.two_star_pos_array.length; index++) {
                this.star_node_array[index].position = this.two_star_pos_array[index];
            }
        }
        else {
            this.star_count.node.active = true;
            this.star_count.string = "x" + this._data.star_count;
            for (var index = 0; index < this.three_star_pos_array.length; index++) {
                this.star_node_array[index].position = this.three_star_pos_array[index];
            }
        }
        for (var index = 0; index < this.reward_spr_array.length; index++) {
            if (index < this._data.reward_array.length) {
                this.reward_spr_array[index].node.parent.active = true;
                var reward = this._data.reward_array[index];
                Utils_1.Utils.async_set_sprite_frame(this.reward_spr_array[index], Constants_1.BundleName.COMMON, "res/handbook/" + reward.id);
            }
            else {
                this.reward_spr_array[index].node.parent.active = false;
            }
        }
    };
    FightBuildingItem.prototype.reset = function () { };
    FightBuildingItem.prototype.change_hp = function (value) {
        if (this._data && value < 0) {
            value = Math.min(0, value + this._data.defense);
            this._data.hp = Math.max(0, Math.min(this._data.max_hp, this._data.hp + value));
            GameManager_1.gm.ui.fight.building_call_defense_hero(this._data);
        }
        this.update_view();
    };
    FightBuildingItem.prototype.play_hit_anim = function (position, animationName) {
        var _this = this;
        if (animationName === void 0) { animationName = "hit"; }
        GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + (animationName = void 0 === animationName ? "hit" : animationName), NodePoolItem_1.NodePoolItem, function (t) {
            GameManager_1.gm.ui.fight.effect_node.addChild(t.node);
            t.node.scale = 0.5;
            var offset = GameManager_1.gm.data.fight_temp_data.is_lighthouse(_this._data.id) ? cc.v3(31, 51) : cc.Vec3.ZERO;
            t.node.position = GameManager_1.gm.ui.fight.convert_to_scene_point(position, offset);
            var animation = t.getComponent(cc.Animation);
            if (animation) {
                animation.once(cc.Animation.EventType.FINISHED, function () {
                    GameManager_1.gm.pool.put(animation.node);
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
    };
    FightBuildingItem.prototype.play_skill_hit_anim = function (position, animationName, effectNode, zIndex) {
        var _this = this;
        if (effectNode === void 0) { effectNode = GameManager_1.gm.ui.fight.effect_node; }
        if (zIndex === void 0) { zIndex = 0; }
        GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + animationName, NodePoolItem_1.NodePoolItem, function (t) {
            var fightTempData = GameManager_1.gm.data.fight_temp_data;
            effectNode.addChild(t.node);
            t.node.zIndex = zIndex;
            var lighthouse = fightTempData.is_lighthouse(_this._data.id) ? cc.v3(31, 51) : cc.Vec3.ZERO;
            t.node.position = GameManager_1.gm.ui.fight.convert_to_scene_point(position, lighthouse);
            t.node.scale = 0.5;
            var animation = t.getComponent(cc.Animation);
            if (animation) {
                animation.once(cc.Animation.EventType.FINISHED, function () {
                    GameManager_1.gm.pool.put(animation.node);
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
    };
    FightBuildingItem.prototype.put_to_pool = function () {
        var data = this._data;
        if (data) {
            if (this._hit_anim) {
                this._hit_anim.setCurrentTime(0);
                this._hit_anim.stop();
            }
            var gridIndex_1 = data.grid_index;
            data.grid_position;
            var fightTempData_1 = GameManager_1.gm.data.fight_temp_data;
            fightTempData_1.get_building_destroy_reward(data.array_index, data);
            fightTempData_1.building_item_array[data.array_index] = null;
            fightTempData_1.building_data_array[data.array_index] = null;
            var parent_1 = this.node.parent;
            var position_1 = this.node.position;
            GameManager_1.gm.pool.put(this.node);
            GameManager_1.gm.data.task_data.update_task_progress(TaskData_1.TaskConditionType.DESTROY_BUILDING);
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.FIGHT, "prefabs/building_destroy", NodePoolItem_1.NodePoolItem, function (t) {
                fightTempData_1.building_destroy_array.push(t);
                var ischeck = data && fightTempData_1.is_lighthouse(data.id) ? cc.v3(31, 51) : cc.Vec3.ZERO;
                ischeck.addSelf(cc.v3(0, 4)).addSelf(position_1);
                t.node.position = GameManager_1.gm.ui.fight.convert_to_map_point(parent_1, ischeck);
                var dynamic = GameManager_1.gm.data.fight_temp_data.get_dynamic_node_layer(gridIndex_1, FightConstants_1.FightDynamicNodeLayer.DESTROY_EFFECT);
                GameManager_1.gm.ui.fight.map_node.addChild(t.node, dynamic);
                if (GameManager_1.gm.data.fight_temp_data.is_debug) {
                    t.node.name = cc.js.formatStr("building_destroy_gridIndex@%d_zIndex@%d", gridIndex_1, dynamic);
                }
                var anim = t.getComponent(cc.Animation);
                if (anim) {
                    anim.play();
                }
            });
        }
    };
    FightBuildingItem.prototype.play_weapon_fly_anim = function (target, skillName, callback) {
        var _this = this;
        GameManager_1.gm.pool.async_get(Constants_1.BundleName.FIGHT, "prefabs/skill_item", SkillItem_1.SkillItem, function (t) {
            GameManager_1.gm.ui.fight.effect_node.addChild(t.node);
            GameManager_1.gm.data.fight_temp_data.skill_item_array.push(t);
            var offset = cc.v3(0, 40);
            t.set_building_attack_target(_this, offset, cc.v3(0, 10), 0, target, callback);
        });
    };
    __decorate([
        property(cc.Sprite)
    ], FightBuildingItem.prototype, "building_spr", void 0);
    __decorate([
        property(cc.Label)
    ], FightBuildingItem.prototype, "lv_lbl", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], FightBuildingItem.prototype, "hp_prg", void 0);
    __decorate([
        property(cc.Label)
    ], FightBuildingItem.prototype, "star_count", void 0);
    __decorate([
        property(cc.Vec3)
    ], FightBuildingItem.prototype, "one_star_pos", void 0);
    __decorate([
        property([cc.Vec3])
    ], FightBuildingItem.prototype, "two_star_pos_array", void 0);
    __decorate([
        property([cc.Vec3])
    ], FightBuildingItem.prototype, "three_star_pos_array", void 0);
    __decorate([
        property([cc.Node])
    ], FightBuildingItem.prototype, "star_node_array", void 0);
    __decorate([
        property([cc.Sprite])
    ], FightBuildingItem.prototype, "reward_spr_array", void 0);
    FightBuildingItem = __decorate([
        ccclass
    ], FightBuildingItem);
    return FightBuildingItem;
}(NodePoolItem_1.NodePoolItem));
exports.FightBuildingItem = FightBuildingItem;

cc._RF.pop();