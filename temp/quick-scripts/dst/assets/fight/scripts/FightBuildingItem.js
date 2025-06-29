
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/fight/scripts/FightBuildingItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZmlnaHRcXHNjcmlwdHNcXEZpZ2h0QnVpbGRpbmdJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1RUFBc0U7QUFDdEUsaUVBQWlFO0FBQ2pFLHlEQUF3RDtBQUN4RCxxRUFBMkQ7QUFDM0QseUNBQXdDO0FBQ3hDLCtEQUF1RTtBQUN2RSwyRUFBaUY7QUFDakYseUVBQXdFO0FBSWxFLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXVDLHFDQUFZO0lBQW5EO1FBQUEscUVBdU5DO1FBck5XLGtCQUFZLEdBQWMsSUFBSSxDQUFDO1FBRy9CLFlBQU0sR0FBYSxJQUFJLENBQUM7UUFHeEIsWUFBTSxHQUFtQixJQUFJLENBQUM7UUFHOUIsZ0JBQVUsR0FBYSxJQUFJLENBQUM7UUFHNUIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0Isd0JBQWtCLEdBQWMsRUFBRSxDQUFDO1FBR25DLDBCQUFvQixHQUFjLEVBQUUsQ0FBQztRQUdyQyxxQkFBZSxHQUFjLEVBQUUsQ0FBQztRQUdqQyxzQkFBZ0IsR0FBZ0IsRUFBRSxDQUFDOztJQTZMOUMsQ0FBQztJQXhMRyxzQkFBVyxtQ0FBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7YUFFRCxVQUFnQixLQUE0QjtZQUN4QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQzs7O09BTEE7SUFPTSx1Q0FBVyxHQUFsQjtRQUNJLElBQUksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRTtZQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQy9CLElBQUks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QyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQzsrREFDb0I7SUExQmpDLGlCQUFpQjtRQUQ3QixPQUFPO09BQ0ssaUJBQWlCLENBdU43QjtJQUFELHdCQUFDO0NBdk5ELEFBdU5DLENBdk5zQywyQkFBWSxHQXVObEQ7QUF2TlksOENBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTm9kZVBvb2xJdGVtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Ob2RlUG9vbEl0ZW0nO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvVXRpbHMnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBTa2lsbEl0ZW0gfSBmcm9tICcuL1NraWxsSXRlbSc7XHJcbmltcG9ydCB7IFRhc2tDb25kaXRpb25UeXBlIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9UYXNrRGF0YSc7XHJcbmltcG9ydCB7IEZpZ2h0RHluYW1pY05vZGVMYXllciB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvRmlnaHRDb25zdGFudHMnO1xyXG5pbXBvcnQgeyBHcmFwaGljc1V0aWxzIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HcmFwaGljc1V0aWxzJztcclxuaW1wb3J0IHsgRmlnaHRNYXBJdGVtIH0gZnJvbSAnLi9GaWdodE1hcEl0ZW0nO1xyXG5pbXBvcnQgeyBGaWdodEJ1aWxkaW5nSXRlbURhdGEgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0ZpZ2h0VGVtcERhdGEnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBGaWdodEJ1aWxkaW5nSXRlbSBleHRlbmRzIE5vZGVQb29sSXRlbSB7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBidWlsZGluZ19zcHI6IGNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBsdl9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXHJcbiAgICBwcml2YXRlIGhwX3ByZzogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgc3Rhcl9jb3VudDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5WZWMzKVxyXG4gICAgcHJpdmF0ZSBvbmVfc3Rhcl9wb3M6IGNjLlZlYzMgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuVmVjM10pXHJcbiAgICBwcml2YXRlIHR3b19zdGFyX3Bvc19hcnJheTogY2MuVmVjM1tdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5WZWMzXSlcclxuICAgIHByaXZhdGUgdGhyZWVfc3Rhcl9wb3NfYXJyYXk6IGNjLlZlYzNbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuTm9kZV0pXHJcbiAgICBwcml2YXRlIHN0YXJfbm9kZV9hcnJheTogY2MuTm9kZVtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVdKVxyXG4gICAgcHVibGljIHJld2FyZF9zcHJfYXJyYXk6IGNjLlNwcml0ZVtdID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBfZGF0YTogRmlnaHRCdWlsZGluZ0l0ZW1EYXRhO1xyXG4gICAgcHJpdmF0ZSBfaGl0X2FuaW06IGNjLkFuaW1hdGlvbjtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGEoKTogRmlnaHRCdWlsZGluZ0l0ZW1EYXRhIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGRhdGEodmFsdWU6IEZpZ2h0QnVpbGRpbmdJdGVtRGF0YSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZV92aWV3KCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5pc19kZWJ1Zykge1xyXG4gICAgICAgICAgICB0aGlzLmx2X2xibC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubHZfbGJsLnN0cmluZyA9IFwiXCIgKyB0aGlzLl9kYXRhLmx2O1xyXG4gICAgICAgICAgICBHcmFwaGljc1V0aWxzLmRyYXdfbGluZSh0aGlzLm5vZGUsIGNjLkNvbG9yLldISVRFLCBjYy5WZWMzLlpFUk8sIGNjLnYzKDAsIHRoaXMuX2RhdGEuY2FsbF9yYW5nZSksIDEsIHRoaXMuX2RhdGEuY2FsbF9yYW5nZSk7XHJcbiAgICAgICAgICAgIEdyYXBoaWNzVXRpbHMuZHJhd19jaXJjbGUodGhpcy5ub2RlLCBjYy5Db2xvci5XSElURSwgY2MuVmVjMy5aRVJPLCB0aGlzLl9kYXRhLmNhbGxfcmFuZ2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubHZfbGJsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3VycmVudE1hcEl0ZW07XHJcbiAgICAgICAgbGV0IGJ1aWxkaW5nQ29uZmlnID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkJ1aWxkQ29uZmlnRGF0YVwiLCB0aGlzLl9kYXRhLmlkICsgXCJcIikgYXMgRmlnaHRNYXBJdGVtO1xyXG5cclxuICAgICAgICBpZiAoYnVpbGRpbmdDb25maWcpIHtcclxuICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmJ1aWxkaW5nX3NwciwgQnVuZGxlTmFtZS5NQVAsIFwicmVzL2J1aWxkL1wiICsgYnVpbGRpbmdDb25maWcubW9kZWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmlzX2xpZ2h0aG91c2UodGhpcy5fZGF0YS5pZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5idWlsZGluZ19zcHIubm9kZS5wb3NpdGlvbiA9IGNjLnYzKDE5LCAtNDApO1xyXG4gICAgICAgICAgICBjdXJyZW50TWFwSXRlbSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmdldF9maWdodF9tYXBfaXRlbSh0aGlzLl9kYXRhLmdyaWRfcG9zaXRpb24ueCwgdGhpcy5fZGF0YS5ncmlkX3Bvc2l0aW9uLnkpO1xyXG4gICAgICAgICAgICBidWlsZGluZ0NvbmZpZyA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmdldF9maWdodF9tYXBfaXRlbSh0aGlzLl9kYXRhLmdyaWRfcG9zaXRpb24ueCwgdGhpcy5fZGF0YS5ncmlkX3Bvc2l0aW9uLnkgLSAxKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50TWFwSXRlbSAmJiBidWlsZGluZ0NvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgYnVpbGRpbmdDb25maWcubGFuZF9ub2RlLnBvc2l0aW9uID0gY3VycmVudE1hcEl0ZW0ubGFuZF9ub2RlLnBvc2l0aW9uLmFkZChjYy52MygtMSwgMykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRpbmdfc3ByLm5vZGUucG9zaXRpb24gPSBjYy52MygwLCAtMzcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ocF9wcmcucHJvZ3Jlc3MgPSAwIDwgdGhpcy5fZGF0YS5tYXhfaHAgPyB0aGlzLl9kYXRhLmhwIC8gdGhpcy5fZGF0YS5tYXhfaHAgOiAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5zdGFyX25vZGVfYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Rhcl9ub2RlX2FycmF5W2luZGV4XS5hY3RpdmUgPSBpbmRleCA8IHRoaXMuX2RhdGEuc3Rhcl9jb3VudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhLnN0YXJfY291bnQgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJfY291bnQubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICgxID09IHRoaXMuX2RhdGEuc3Rhcl9jb3VudCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJfY291bnQubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdGFyX25vZGVfYXJyYXlbMF0ucG9zaXRpb24gPSB0aGlzLm9uZV9zdGFyX3BvcztcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICgyID09IHRoaXMuX2RhdGEuc3Rhcl9jb3VudCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJfY291bnQubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMudHdvX3N0YXJfcG9zX2FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFyX25vZGVfYXJyYXlbaW5kZXhdLnBvc2l0aW9uID0gdGhpcy50d29fc3Rhcl9wb3NfYXJyYXlbaW5kZXhdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Rhcl9jb3VudC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc3Rhcl9jb3VudC5zdHJpbmcgPSBcInhcIiArIHRoaXMuX2RhdGEuc3Rhcl9jb3VudDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMudGhyZWVfc3Rhcl9wb3NfYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJfbm9kZV9hcnJheVtpbmRleF0ucG9zaXRpb24gPSB0aGlzLnRocmVlX3N0YXJfcG9zX2FycmF5W2luZGV4XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMucmV3YXJkX3Nwcl9hcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKGluZGV4IDwgdGhpcy5fZGF0YS5yZXdhcmRfYXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJld2FyZF9zcHJfYXJyYXlbaW5kZXhdLm5vZGUucGFyZW50LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXdhcmQgPSB0aGlzLl9kYXRhLnJld2FyZF9hcnJheVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMucmV3YXJkX3Nwcl9hcnJheVtpbmRleF0sIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9oYW5kYm9vay9cIiArIHJld2FyZC5pZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJld2FyZF9zcHJfYXJyYXlbaW5kZXhdLm5vZGUucGFyZW50LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHsgfVxyXG5cclxuICAgIHB1YmxpYyBjaGFuZ2VfaHAodmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhICYmIHZhbHVlIDwgMCkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IE1hdGgubWluKDAsIHZhbHVlICsgdGhpcy5fZGF0YS5kZWZlbnNlKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YS5ocCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMuX2RhdGEubWF4X2hwLCB0aGlzLl9kYXRhLmhwICsgdmFsdWUpKTtcclxuICAgICAgICAgICAgZ20udWkuZmlnaHQuYnVpbGRpbmdfY2FsbF9kZWZlbnNlX2hlcm8odGhpcy5fZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGxheV9oaXRfYW5pbShwb3NpdGlvbjogY2MuTm9kZSwgYW5pbWF0aW9uTmFtZTogc3RyaW5nID0gXCJoaXRcIik6IHZvaWQge1xyXG4gICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuQ09NTU9OLCBcInByZWZhYnMvbW9kZWwvXCIgKyAoYW5pbWF0aW9uTmFtZSA9IHZvaWQgMCA9PT0gYW5pbWF0aW9uTmFtZSA/IFwiaGl0XCIgOiBhbmltYXRpb25OYW1lKSwgTm9kZVBvb2xJdGVtLCAodCkgPT4ge1xyXG4gICAgICAgICAgICBnbS51aS5maWdodC5lZmZlY3Rfbm9kZS5hZGRDaGlsZCh0Lm5vZGUpO1xyXG4gICAgICAgICAgICB0Lm5vZGUuc2NhbGUgPSAwLjU7XHJcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmlzX2xpZ2h0aG91c2UodGhpcy5fZGF0YS5pZCkgPyBjYy52MygzMSwgNTEpIDogY2MuVmVjMy5aRVJPO1xyXG4gICAgICAgICAgICB0Lm5vZGUucG9zaXRpb24gPSBnbS51aS5maWdodC5jb252ZXJ0X3RvX3NjZW5lX3BvaW50KHBvc2l0aW9uLCBvZmZzZXQpO1xyXG4gICAgICAgICAgICBjb25zdCBhbmltYXRpb24gPSB0LmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgICAgICBpZiAoYW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24ub25jZShjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5wdXQoYW5pbWF0aW9uLm5vZGUpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9oaXRfYW5pbSkge1xyXG4gICAgICAgICAgICB0aGlzLl9oaXRfYW5pbSA9IHRoaXMuYnVpbGRpbmdfc3ByLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5faGl0X2FuaW0pIHtcclxuICAgICAgICAgICAgdGhpcy5faGl0X2FuaW0ucGxheSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGxheV9za2lsbF9oaXRfYW5pbShwb3NpdGlvbjogY2MuTm9kZSwgYW5pbWF0aW9uTmFtZTogc3RyaW5nLCBlZmZlY3ROb2RlOiBjYy5Ob2RlID0gZ20udWkuZmlnaHQuZWZmZWN0X25vZGUsIHpJbmRleDogbnVtYmVyID0gMCk6IHZvaWQge1xyXG4gICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuQ09NTU9OLCBcInByZWZhYnMvbW9kZWwvXCIgKyBhbmltYXRpb25OYW1lLCBOb2RlUG9vbEl0ZW0sICh0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBmaWdodFRlbXBEYXRhID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGE7XHJcbiAgICAgICAgICAgIGVmZmVjdE5vZGUuYWRkQ2hpbGQodC5ub2RlKTtcclxuICAgICAgICAgICAgdC5ub2RlLnpJbmRleCA9IHpJbmRleDtcclxuICAgICAgICAgICAgY29uc3QgbGlnaHRob3VzZSA9IGZpZ2h0VGVtcERhdGEuaXNfbGlnaHRob3VzZSh0aGlzLl9kYXRhLmlkKSA/IGNjLnYzKDMxLCA1MSkgOiBjYy5WZWMzLlpFUk87XHJcbiAgICAgICAgICAgIHQubm9kZS5wb3NpdGlvbiA9IGdtLnVpLmZpZ2h0LmNvbnZlcnRfdG9fc2NlbmVfcG9pbnQocG9zaXRpb24sIGxpZ2h0aG91c2UpO1xyXG4gICAgICAgICAgICB0Lm5vZGUuc2NhbGUgPSAwLjU7XHJcbiAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IHQuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgIGlmIChhbmltYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5vbmNlKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5wb29sLnB1dChhbmltYXRpb24ubm9kZSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX2hpdF9hbmltKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hpdF9hbmltID0gdGhpcy5idWlsZGluZ19zcHIuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9oaXRfYW5pbSkge1xyXG4gICAgICAgICAgICB0aGlzLl9oaXRfYW5pbS5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwdXRfdG9fcG9vbCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5fZGF0YTtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faGl0X2FuaW0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2hpdF9hbmltLnNldEN1cnJlbnRUaW1lKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faGl0X2FuaW0uc3RvcCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBncmlkSW5kZXggPSBkYXRhLmdyaWRfaW5kZXg7XHJcbiAgICAgICAgICAgIGRhdGEuZ3JpZF9wb3NpdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZpZ2h0VGVtcERhdGEgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YTtcclxuICAgICAgICAgICAgZmlnaHRUZW1wRGF0YS5nZXRfYnVpbGRpbmdfZGVzdHJveV9yZXdhcmQoZGF0YS5hcnJheV9pbmRleCwgZGF0YSk7XHJcbiAgICAgICAgICAgIGZpZ2h0VGVtcERhdGEuYnVpbGRpbmdfaXRlbV9hcnJheVtkYXRhLmFycmF5X2luZGV4XSA9IG51bGw7XHJcbiAgICAgICAgICAgIGZpZ2h0VGVtcERhdGEuYnVpbGRpbmdfZGF0YV9hcnJheVtkYXRhLmFycmF5X2luZGV4XSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLm5vZGUucGFyZW50O1xyXG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMubm9kZS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgZ20ucG9vbC5wdXQodGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgZ20uZGF0YS50YXNrX2RhdGEudXBkYXRlX3Rhc2tfcHJvZ3Jlc3MoVGFza0NvbmRpdGlvblR5cGUuREVTVFJPWV9CVUlMRElORyk7XHJcbiAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuRklHSFQsIFwicHJlZmFicy9idWlsZGluZ19kZXN0cm95XCIsIE5vZGVQb29sSXRlbSwgKHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGZpZ2h0VGVtcERhdGEuYnVpbGRpbmdfZGVzdHJveV9hcnJheS5wdXNoKHQpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNjaGVjayA9IGRhdGEgJiYgZmlnaHRUZW1wRGF0YS5pc19saWdodGhvdXNlKGRhdGEuaWQpID8gY2MudjMoMzEsIDUxKSA6IGNjLlZlYzMuWkVSTztcclxuICAgICAgICAgICAgICAgIGlzY2hlY2suYWRkU2VsZihjYy52MygwLCA0KSkuYWRkU2VsZihwb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0Lm5vZGUucG9zaXRpb24gPSBnbS51aS5maWdodC5jb252ZXJ0X3RvX21hcF9wb2ludChwYXJlbnQsIGlzY2hlY2spO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZHluYW1pYyA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmdldF9keW5hbWljX25vZGVfbGF5ZXIoZ3JpZEluZGV4LCBGaWdodER5bmFtaWNOb2RlTGF5ZXIuREVTVFJPWV9FRkZFQ1QpO1xyXG4gICAgICAgICAgICAgICAgZ20udWkuZmlnaHQubWFwX25vZGUuYWRkQ2hpbGQodC5ub2RlLCBkeW5hbWljKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuaXNfZGVidWcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0Lm5vZGUubmFtZSA9IGNjLmpzLmZvcm1hdFN0cihcImJ1aWxkaW5nX2Rlc3Ryb3lfZ3JpZEluZGV4QCVkX3pJbmRleEAlZFwiLCBncmlkSW5kZXgsIGR5bmFtaWMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGFuaW0gPSB0LmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFuaW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBhbmltLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXlfd2VhcG9uX2ZseV9hbmltKHRhcmdldDogY2MuTm9kZSwgc2tpbGxOYW1lOiBudW1iZXIsIGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoQnVuZGxlTmFtZS5GSUdIVCwgXCJwcmVmYWJzL3NraWxsX2l0ZW1cIiwgU2tpbGxJdGVtLCAodCkgPT4ge1xyXG4gICAgICAgICAgICBnbS51aS5maWdodC5lZmZlY3Rfbm9kZS5hZGRDaGlsZCh0Lm5vZGUpO1xyXG4gICAgICAgICAgICBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5za2lsbF9pdGVtX2FycmF5LnB1c2godCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IGNjLnYzKDAsIDQwKTtcclxuICAgICAgICAgICAgdC5zZXRfYnVpbGRpbmdfYXR0YWNrX3RhcmdldCh0aGlzLCBvZmZzZXQsIGNjLnYzKDAsIDEwKSwgMCwgdGFyZ2V0LCBjYWxsYmFjaylcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59Il19