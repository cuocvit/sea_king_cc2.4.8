
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/fight/scripts/FightWallItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'aa2cdFfFmVOLKbKY5RpEJwJ', 'FightWallItem');
// fight/scripts/FightWallItem.ts

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
exports.FightWallItem = void 0;
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var Constants_1 = require("../../start-scene/scripts/Constants");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var SkillItem_1 = require("./SkillItem");
var FightConstants_1 = require("../../start-scene/scripts/FightConstants");
var GraphicsUtils_1 = require("../../start-scene/scripts/GraphicsUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FightWallItem = /** @class */ (function (_super) {
    __extends(FightWallItem, _super);
    function FightWallItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model_node = null;
        _this.hp_prg = null;
        _this.top_node = null;
        _this._data = null;
        _this._spine = null;
        _this._anim_name = "";
        _this._anim_index = 0;
        _this._next_anim_name = "";
        _this._spine_track = null;
        return _this;
    }
    Object.defineProperty(FightWallItem.prototype, "data", {
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
    FightWallItem.prototype.update_view = function () {
        var _this = this;
        if (GameManager_1.gm.data.fight_temp_data.is_debug) {
            GraphicsUtils_1.GraphicsUtils.draw_circle(this.node, cc.Color.BLUE, cc.Vec3.ZERO, this._data.search_range);
            GraphicsUtils_1.GraphicsUtils.draw_circle(this.node, cc.Color.RED, cc.Vec3.ZERO, this._data.attack_range);
        }
        if (this.model_node.childrenCount == 0) {
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + this._data.id, NodePoolItem_1.NodePoolItem, function (item) {
                if (_this.model_node.childrenCount == 0) {
                    _this.model_node.addChild(item.node);
                    _this._spine = item.getComponentInChildren(sp.Skeleton);
                    if (_this._spine) {
                        _this._anim_name = "fstay";
                        _this._anim_index = 2;
                        _this._spine_track = _this._spine.setAnimation(0, _this._anim_name, true);
                        _this._spine.timeScale = cc.director.getScheduler().getTimeScale();
                    }
                    _this.update_wall_part_view();
                }
                else {
                    GameManager_1.gm.pool.put(item.node);
                }
            });
        }
        else {
            this.update_wall_part_view();
        }
        this.hp_prg.progress = this._data.max_hp > 0 ? this._data.hp / this._data.max_hp : 0;
    };
    FightWallItem.prototype.update_wall_part_view = function () {
        if (this._data && this.model_node.childrenCount > 0) {
            var edgeMap = GameManager_1.gm.data.fight_temp_data.edge_map;
            var modelChild = this.model_node.children[0];
            for (var key in edgeMap) {
                var edgeData = edgeMap[key];
                var wallItem = modelChild.getChildByName(key.toLowerCase());
                if (wallItem) {
                    wallItem.active = GameManager_1.gm.data.fight_temp_data.has_wall_item_data(edgeData.add(this._data.grid_position));
                }
            }
        }
    };
    FightWallItem.prototype.reset = function () {
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
        GameManager_1.gm.pool.put_children(this.model_node);
        GameManager_1.gm.pool.put_children(this.top_node);
    };
    FightWallItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.reset();
    };
    FightWallItem.prototype.change_hp = function (amount) {
        if (this._data && amount < 0) {
            amount = Math.min(0, amount + this._data.real_defense_value);
            this._data.hp = Math.max(0, Math.min(this._data.max_hp, this._data.hp + amount));
            GameManager_1.gm.ui.fight.building_call_defense_hero(this._data);
        }
        this.update_view();
    };
    FightWallItem.prototype.play_hit_anim = function (position, animationName) {
        if (animationName === void 0) { animationName = "hit"; }
        GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + animationName, NodePoolItem_1.NodePoolItem, function (item) {
            GameManager_1.gm.ui.fight.effect_node.addChild(item.node);
            item.node.scale = 0.5;
            item.node.position = GameManager_1.gm.ui.fight.convert_to_scene_point(position);
            var animation = item.getComponent(cc.Animation);
            if (animation) {
                animation.once(cc.Animation.EventType.FINISHED, function () {
                    GameManager_1.gm.pool.put(animation.node);
                });
                animation.play();
            }
        });
    };
    FightWallItem.prototype.play_skill_hit_anim = function (position, skillName, effectNode, zIndex) {
        if (effectNode === void 0) { effectNode = GameManager_1.gm.ui.fight.effect_node; }
        if (zIndex === void 0) { zIndex = 0; }
        GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + skillName, NodePoolItem_1.NodePoolItem, function (item) {
            effectNode.addChild(item.node);
            item.node.zIndex = zIndex;
            item.node.position = GameManager_1.gm.ui.fight.convert_to_scene_point(position);
            item.node.scale = 0.5;
            var animation = item.getComponent(cc.Animation);
            if (animation) {
                animation.once(cc.Animation.EventType.FINISHED, function () {
                    GameManager_1.gm.pool.put(animation.node);
                });
                animation.play();
            }
        });
    };
    FightWallItem.prototype.apply_passive_skill = function (skillData) {
        var _this = this;
        var data = this._data;
        data.damage_ratio = skillData.damage_ratio;
        data.defense_ratio = skillData.defense_ratio;
        if (skillData.skill_name !== "") {
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + skillData.skill_name, NodePoolItem_1.NodePoolItem, function (item) {
                _this.top_node.addChild(item.node);
                var animation = item.getComponent(cc.Animation);
                if (animation) {
                    animation.play();
                }
            });
        }
    };
    FightWallItem.prototype.put_to_pool = function () {
        var data = this._data;
        if (data) {
            var gridIndex_1 = data.grid_index;
            var tempData_1 = GameManager_1.gm.data.fight_temp_data;
            tempData_1.wall_item_array[data.array_index] = null;
            tempData_1.wall_data_array[data.array_index] = null;
            var parentNode_1 = this.node.parent;
            var position_1 = this.node.position;
            GameManager_1.gm.pool.put(this.node);
            var timeScaleSuffix = cc.director.getScheduler().getTimeScale() == GameManager_1.gm.const.FIGHT_SPEED_X2 ? "_x2" : "";
            var heroConfig = GameManager_1.gm.config.get_row_data("HeroConfigData", data.id + "");
            if (heroConfig && heroConfig.death_audio) {
                GameManager_1.gm.audio.play_effect(heroConfig.death_audio + timeScaleSuffix);
            }
            else {
                GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_23_HERO_DEATH + timeScaleSuffix);
            }
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.FIGHT, "prefabs/building_destroy", NodePoolItem_1.NodePoolItem, function (item) {
                tempData_1.building_destroy_array.push(item);
                var effectPosition = data && tempData_1.is_lighthouse(data.id) ? cc.v3(31, 51, 0) : cc.Vec3.ZERO;
                effectPosition.addSelf(cc.v3(0, 4, 0)).addSelf(position_1);
                item.node.position = GameManager_1.gm.ui.fight.convert_to_map_point(parentNode_1, effectPosition);
                var dynamicLayer = tempData_1.get_dynamic_node_layer(gridIndex_1, FightConstants_1.FightDynamicNodeLayer.DESTROY_EFFECT);
                GameManager_1.gm.ui.fight.map_node.addChild(item.node, dynamicLayer);
                if (tempData_1.is_debug) {
                    item.node.name = cc.js.formatStr("building_destroy_gridIndex@%d_zIndex@%d", gridIndex_1, dynamicLayer);
                }
                var animation = item.getComponent(cc.Animation);
                if (animation) {
                    animation.play();
                }
            });
        }
    };
    FightWallItem.prototype.play_attack_audio = function () {
        var data = this._data;
        var heroConfig = GameManager_1.gm.config.get_row_data("HeroConfigData", data.id + "");
        if (heroConfig && heroConfig.attack_audio) {
            var timeScaleSuffix = cc.director.getScheduler().getTimeScale() == GameManager_1.gm.const.FIGHT_SPEED_X2 ? "_x2" : "";
            GameManager_1.gm.audio.play_effect(heroConfig.attack_audio + timeScaleSuffix);
        }
    };
    FightWallItem.prototype.play_skill_audio = function () {
        var data = this._data;
        var heroConfig = GameManager_1.gm.config.get_row_data("HeroConfigData", data.id + "");
        if (heroConfig && heroConfig.skill_audio) {
            var timeScaleSuffix = cc.director.getScheduler().getTimeScale() == GameManager_1.gm.const.FIGHT_SPEED_X2 ? "_x2" : "";
            GameManager_1.gm.audio.play_effect(heroConfig.skill_audio + timeScaleSuffix);
        }
    };
    FightWallItem.prototype.play_spine_anim = function (radian, delay, callback, duration, endCallback) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        if (callback === void 0) { callback = null; }
        if (duration === void 0) { duration = 0; }
        if (endCallback === void 0) { endCallback = null; }
        var normalizedRadian = ((this._data.radian = radian) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        var attackAnim = "";
        var stayAnim = "";
        var animIndex = 0;
        if (normalizedRadian >= Math.PI / 4 && normalizedRadian < 3 * Math.PI / 4) {
            attackAnim = "battack";
            stayAnim = "bstay";
            animIndex = 0;
        }
        else if (normalizedRadian >= 3 * Math.PI / 4 && normalizedRadian < 5 * Math.PI / 4) {
            attackAnim = "lattack";
            stayAnim = "lstay";
            animIndex = 3;
        }
        else if (normalizedRadian >= 5 * Math.PI / 4 && normalizedRadian < 7 * Math.PI / 4) {
            attackAnim = "fattack";
            stayAnim = "fstay";
            animIndex = 2;
        }
        else {
            attackAnim = "rattack";
            stayAnim = "rstay";
            animIndex = 1;
        }
        this._anim_name = attackAnim;
        this._anim_index = animIndex;
        this._next_anim_name = stayAnim;
        if (callback) {
            if (delay > 0 && callback) {
                this.scheduleOnce(function () {
                    callback();
                }, delay);
            }
            else {
                cc.error("play_spine_anim 参数错误");
            }
        }
        if (duration > 0 && endCallback) {
            this.scheduleOnce(function () {
                endCallback();
            }, duration);
        }
        if (this._spine_track) {
            this._spine_track.trackTime = 0;
        }
        this._spine.setToSetupPose();
        this._spine_track = this._spine.setAnimation(0, attackAnim, false);
        this._spine.setCompleteListener(function () {
            _this._spine.setCompleteListener(null);
            _this._spine_track = _this._spine.setAnimation(0, stayAnim, true);
        });
        this._spine.timeScale = cc.director.getScheduler().getTimeScale();
    };
    FightWallItem.prototype.play_weapon_fly_anim = function (target, duration, callback) {
        var _this = this;
        GameManager_1.gm.pool.async_get(Constants_1.BundleName.FIGHT, "prefabs/skill_item", SkillItem_1.SkillItem, function (item) {
            GameManager_1.gm.ui.fight.effect_node.addChild(item.node);
            GameManager_1.gm.data.fight_temp_data.skill_item_array.push(item);
            var effectPosition = cc.v3(0, 10);
            if (_this._data.occupation == 12 && _this._anim_index >= 0 && _this._anim_index <= 3) {
                effectPosition = [cc.v3(8, 66), cc.v3(19, 67), cc.v3(-6, 77), cc.v3(-20, 69)][_this._anim_index];
            }
            item.set_building_attack_target(_this, effectPosition, cc.v3(0, 10, 0), 1, target, callback);
        });
    };
    __decorate([
        property(cc.Node)
    ], FightWallItem.prototype, "model_node", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], FightWallItem.prototype, "hp_prg", void 0);
    __decorate([
        property(cc.Node)
    ], FightWallItem.prototype, "top_node", void 0);
    FightWallItem = __decorate([
        ccclass
    ], FightWallItem);
    return FightWallItem;
}(NodePoolItem_1.NodePoolItem));
exports.FightWallItem = FightWallItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZmlnaHRcXHNjcmlwdHNcXEZpZ2h0V2FsbEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVFQUFzRTtBQUN0RSxpRUFBaUU7QUFDakUscUVBQTJEO0FBQzNELHlDQUF3QztBQUN4QywyRUFBaUY7QUFDakYseUVBQXdFO0FBS2xFLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTRCLGlDQUFZO0lBQXhDO1FBQUEscUVBMFFDO1FBeFFXLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLFlBQU0sR0FBbUIsSUFBSSxDQUFDO1FBRzlCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsV0FBSyxHQUFzQixJQUFJLENBQUM7UUFDaEMsWUFBTSxHQUFnQixJQUFJLENBQUM7UUFDM0IsZ0JBQVUsR0FBVyxFQUFFLENBQUM7UUFDeEIsaUJBQVcsR0FBVyxDQUFDLENBQUM7UUFDeEIscUJBQWUsR0FBVyxFQUFFLENBQUM7UUFDN0Isa0JBQVksR0FBd0IsSUFBSSxDQUFDOztJQTJQckQsQ0FBQztJQXpQRyxzQkFBVywrQkFBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7YUFFRCxVQUFnQixLQUF3QjtZQUNwQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQzs7O09BTEE7SUFPTSxtQ0FBVyxHQUFsQjtRQUFBLGlCQXlCQztRQXhCRyxJQUFJLGdCQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUU7WUFDbEMsNkJBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNGLDZCQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUM3RjtRQUNELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLElBQUksQ0FBQyxFQUFFO1lBQ3BDLGdCQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBVSxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSwyQkFBWSxFQUFFLFVBQUMsSUFBSTtnQkFDdEYsSUFBSSxLQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsSUFBSSxDQUFDLEVBQUU7b0JBQ3BDLEtBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDcEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN2RCxJQUFJLEtBQUksQ0FBQyxNQUFNLEVBQUU7d0JBQ2IsS0FBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7d0JBQzFCLEtBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO3dCQUNyQixLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxLQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUN2RSxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO3FCQUNyRTtvQkFDRCxLQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztpQkFDaEM7cUJBQU07b0JBQ0gsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDMUI7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztTQUNoQztRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBRU0sNkNBQXFCLEdBQTVCO1FBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxHQUFHLENBQUMsRUFBRTtZQUNqRCxJQUFNLE9BQU8sR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO1lBQ2pELElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLEtBQUssSUFBTSxHQUFHLElBQUksT0FBTyxFQUFFO2dCQUN2QixJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzlCLElBQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7Z0JBQzlELElBQUksUUFBUSxFQUFFO29CQUNWLFFBQVEsQ0FBQyxNQUFNLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2lCQUN4RzthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRU0sNkJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQzlCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDdEI7UUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQzVCO1FBQ0QsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0QyxnQkFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTSw2QkFBSyxHQUFaO1FBQ0ksaUJBQU0sS0FBSyxXQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVNLGlDQUFTLEdBQWhCLFVBQWlCLE1BQWM7UUFDM0IsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDMUIsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2pGLGdCQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEQ7UUFDRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVNLHFDQUFhLEdBQXBCLFVBQXFCLFFBQWlCLEVBQUUsYUFBNkI7UUFBN0IsOEJBQUEsRUFBQSxxQkFBNkI7UUFDakUsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLHNCQUFVLENBQUMsTUFBTSxFQUFFLGdCQUFnQixHQUFHLGFBQWEsRUFBRSwyQkFBWSxFQUFFLFVBQUMsSUFBSTtZQUN0RixnQkFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLGdCQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRSxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNsRCxJQUFJLFNBQVMsRUFBRTtnQkFDWCxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRTtvQkFDNUMsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3BCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sMkNBQW1CLEdBQTFCLFVBQTJCLFFBQWlCLEVBQUUsU0FBaUIsRUFBRSxVQUE2QyxFQUFFLE1BQWtCO1FBQWpFLDJCQUFBLEVBQUEsYUFBc0IsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVc7UUFBRSx1QkFBQSxFQUFBLFVBQWtCO1FBQzlILGdCQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBVSxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsR0FBRyxTQUFTLEVBQUUsMkJBQVksRUFBRSxVQUFDLElBQUk7WUFDbEYsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLGdCQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDdEIsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEQsSUFBSSxTQUFTLEVBQUU7Z0JBQ1gsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7b0JBQzVDLGdCQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxDQUFDO2dCQUNILFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNwQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLDJDQUFtQixHQUExQixVQUEyQixTQUFzQjtRQUFqRCxpQkFhQztRQVpHLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDO1FBQzNDLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztRQUM3QyxJQUFJLFNBQVMsQ0FBQyxVQUFVLEtBQUssRUFBRSxFQUFFO1lBQzdCLGdCQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBVSxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsR0FBRyxTQUFTLENBQUMsVUFBVSxFQUFFLDJCQUFZLEVBQUUsVUFBQyxJQUFJO2dCQUM3RixLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLFNBQVMsRUFBRTtvQkFDWCxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQ3BCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFTSxtQ0FBVyxHQUFsQjtRQUNJLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFNLFdBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ2xDLElBQU0sVUFBUSxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUN6QyxVQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDbEQsVUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ2xELElBQU0sWUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3BDLElBQU0sVUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3BDLGdCQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsSUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxnQkFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzFHLElBQU0sVUFBVSxHQUFHLGdCQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBZSxDQUFDO1lBQ3hGLElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3RDLGdCQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHLGVBQWUsQ0FBQyxDQUFDO2FBQ2xFO2lCQUFNO2dCQUNILGdCQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsR0FBRyxlQUFlLENBQUMsQ0FBQzthQUN4RTtZQUNELGdCQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBVSxDQUFDLEtBQUssRUFBRSwwQkFBMEIsRUFBRSwyQkFBWSxFQUFFLFVBQUMsSUFBSTtnQkFDL0UsVUFBUSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0MsSUFBTSxjQUFjLEdBQUcsSUFBSSxJQUFJLFVBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNqRyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFRLENBQUMsQ0FBQztnQkFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLFlBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDbEYsSUFBTSxZQUFZLEdBQUcsVUFBUSxDQUFDLHNCQUFzQixDQUFDLFdBQVMsRUFBRSxzQ0FBcUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDdEcsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDdkQsSUFBSSxVQUFRLENBQUMsUUFBUSxFQUFFO29CQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyx5Q0FBeUMsRUFBRSxXQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7aUJBQ3hHO2dCQUNELElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLFNBQVMsRUFBRTtvQkFDWCxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQ3BCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFTSx5Q0FBaUIsR0FBeEI7UUFDSSxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQU0sVUFBVSxHQUFHLGdCQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBZSxDQUFDO1FBQ3hGLElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxZQUFZLEVBQUU7WUFDdkMsSUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxnQkFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzFHLGdCQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQyxDQUFDO1NBQ25FO0lBQ0wsQ0FBQztJQUVPLHdDQUFnQixHQUF4QjtRQUNJLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBTSxVQUFVLEdBQUcsZ0JBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFlLENBQUM7UUFDeEYsSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLFdBQVcsRUFBRTtZQUN0QyxJQUFNLGVBQWUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLGdCQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDMUcsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDLENBQUM7U0FDbEU7SUFDTCxDQUFDO0lBRU0sdUNBQWUsR0FBdEIsVUFBdUIsTUFBYyxFQUFFLEtBQWlCLEVBQUUsUUFBeUIsRUFBRSxRQUFvQixFQUFFLFdBQTRCO1FBQXZJLGlCQXNEQztRQXREc0Msc0JBQUEsRUFBQSxTQUFpQjtRQUFFLHlCQUFBLEVBQUEsZUFBeUI7UUFBRSx5QkFBQSxFQUFBLFlBQW9CO1FBQUUsNEJBQUEsRUFBQSxrQkFBNEI7UUFDbkksSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BHLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBRWxCLElBQUksZ0JBQWdCLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZFLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDdkIsUUFBUSxHQUFHLE9BQU8sQ0FBQztZQUNuQixTQUFTLEdBQUcsQ0FBQyxDQUFDO1NBQ2pCO2FBQU0sSUFBSSxnQkFBZ0IsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ2xGLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDdkIsUUFBUSxHQUFHLE9BQU8sQ0FBQztZQUNuQixTQUFTLEdBQUcsQ0FBQyxDQUFDO1NBQ2pCO2FBQU0sSUFBSSxnQkFBZ0IsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ2xGLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDdkIsUUFBUSxHQUFHLE9BQU8sQ0FBQztZQUNuQixTQUFTLEdBQUcsQ0FBQyxDQUFDO1NBQ2pCO2FBQU07WUFDSCxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQ3ZCLFFBQVEsR0FBRyxPQUFPLENBQUM7WUFDbkIsU0FBUyxHQUFHLENBQUMsQ0FBQztTQUNqQjtRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO1FBQzdCLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1FBRWhDLElBQUksUUFBUSxFQUFFO1lBQ1YsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLFFBQVEsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQztvQkFDZCxRQUFRLEVBQUUsQ0FBQztnQkFDZixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDYjtpQkFBTTtnQkFDSCxFQUFFLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7YUFDcEM7U0FDSjtRQUVELElBQUksUUFBUSxHQUFHLENBQUMsSUFBSSxXQUFXLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDZCxXQUFXLEVBQUUsQ0FBQztZQUNsQixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDaEI7UUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztZQUM1QixLQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRSxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEUsQ0FBQztJQUVNLDRDQUFvQixHQUEzQixVQUE0QixNQUFlLEVBQUUsUUFBZ0IsRUFBRSxRQUFvQjtRQUFuRixpQkFVQztRQVRHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBVSxDQUFDLEtBQUssRUFBRSxvQkFBb0IsRUFBRSxxQkFBUyxFQUFFLFVBQUMsSUFBSTtZQUN0RSxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUMsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwRCxJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNsQyxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLEVBQUUsSUFBSSxLQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxLQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsRUFBRTtnQkFDL0UsY0FBYyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ25HO1lBQ0QsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEtBQUksRUFBRSxjQUFjLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDaEcsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBdlFEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ2lCO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7aURBQ2E7SUFHdEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzttREFDZTtJQVIvQixhQUFhO1FBRGxCLE9BQU87T0FDRixhQUFhLENBMFFsQjtJQUFELG9CQUFDO0NBMVFELEFBMFFDLENBMVEyQiwyQkFBWSxHQTBRdkM7QUFFUSxzQ0FBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5vZGVQb29sSXRlbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTm9kZVBvb2xJdGVtJztcclxuaW1wb3J0IHsgQnVuZGxlTmFtZSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgU2tpbGxJdGVtIH0gZnJvbSAnLi9Ta2lsbEl0ZW0nO1xyXG5pbXBvcnQgeyBGaWdodER5bmFtaWNOb2RlTGF5ZXIgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0ZpZ2h0Q29uc3RhbnRzJztcclxuaW1wb3J0IHsgR3JhcGhpY3NVdGlscyB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR3JhcGhpY3NVdGlscyc7XHJcbmltcG9ydCB7IEhlcm9Db25maWcgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9oZXJvJztcclxuaW1wb3J0IHsgRmlnaHRXYWxsSXRlbURhdGEgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0ZpZ2h0VGVtcERhdGEnO1xyXG5pbXBvcnQgeyBTa2lsbENvbmZpZyB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25maWdzL3NraWxsJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBGaWdodFdhbGxJdGVtIGV4dGVuZHMgTm9kZVBvb2xJdGVtIHtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBtb2RlbF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXHJcbiAgICBwcml2YXRlIGhwX3ByZzogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSB0b3Bfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfZGF0YTogRmlnaHRXYWxsSXRlbURhdGEgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfc3BpbmU6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2FuaW1fbmFtZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgX2FuaW1faW5kZXg6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9uZXh0X2FuaW1fbmFtZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgX3NwaW5lX3RyYWNrOiBzcC5zcGluZS5UcmFja0VudHJ5ID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGEoKTogRmlnaHRXYWxsSXRlbURhdGEge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZGF0YSh2YWx1ZTogRmlnaHRXYWxsSXRlbURhdGEpIHtcclxuICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVfdmlldygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuaXNfZGVidWcpIHtcclxuICAgICAgICAgICAgR3JhcGhpY3NVdGlscy5kcmF3X2NpcmNsZSh0aGlzLm5vZGUsIGNjLkNvbG9yLkJMVUUsIGNjLlZlYzMuWkVSTywgdGhpcy5fZGF0YS5zZWFyY2hfcmFuZ2UpO1xyXG4gICAgICAgICAgICBHcmFwaGljc1V0aWxzLmRyYXdfY2lyY2xlKHRoaXMubm9kZSwgY2MuQ29sb3IuUkVELCBjYy5WZWMzLlpFUk8sIHRoaXMuX2RhdGEuYXR0YWNrX3JhbmdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWxfbm9kZS5jaGlsZHJlbkNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoQnVuZGxlTmFtZS5DT01NT04sIFwicHJlZmFicy9tb2RlbC9cIiArIHRoaXMuX2RhdGEuaWQsIE5vZGVQb29sSXRlbSwgKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsX25vZGUuY2hpbGRyZW5Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbF9ub2RlLmFkZENoaWxkKGl0ZW0ubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3BpbmUgPSBpdGVtLmdldENvbXBvbmVudEluQ2hpbGRyZW4oc3AuU2tlbGV0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zcGluZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmltX25hbWUgPSBcImZzdGF5XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1faW5kZXggPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcGluZV90cmFjayA9IHRoaXMuX3NwaW5lLnNldEFuaW1hdGlvbigwLCB0aGlzLl9hbmltX25hbWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcGluZS50aW1lU2NhbGUgPSBjYy5kaXJlY3Rvci5nZXRTY2hlZHVsZXIoKS5nZXRUaW1lU2NhbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVfd2FsbF9wYXJ0X3ZpZXcoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5wdXQoaXRlbS5ub2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVfd2FsbF9wYXJ0X3ZpZXcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ocF9wcmcucHJvZ3Jlc3MgPSB0aGlzLl9kYXRhLm1heF9ocCA+IDAgPyB0aGlzLl9kYXRhLmhwIC8gdGhpcy5fZGF0YS5tYXhfaHAgOiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVfd2FsbF9wYXJ0X3ZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGEgJiYgdGhpcy5tb2RlbF9ub2RlLmNoaWxkcmVuQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVkZ2VNYXAgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5lZGdlX21hcDtcclxuICAgICAgICAgICAgY29uc3QgbW9kZWxDaGlsZCA9IHRoaXMubW9kZWxfbm9kZS5jaGlsZHJlblswXTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZWRnZU1hcCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWRnZURhdGEgPSBlZGdlTWFwW2tleV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB3YWxsSXRlbSA9IG1vZGVsQ2hpbGQuZ2V0Q2hpbGRCeU5hbWUoa2V5LnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHdhbGxJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2FsbEl0ZW0uYWN0aXZlID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuaGFzX3dhbGxfaXRlbV9kYXRhKGVkZ2VEYXRhLmFkZCh0aGlzLl9kYXRhLmdyaWRfcG9zaXRpb24pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fYW5pbV9uYW1lID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9hbmltX2luZGV4ID0gMDtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICBpZiAodGhpcy5fc3BpbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3BpbmUuc2V0VG9TZXR1cFBvc2UoKTtcclxuICAgICAgICAgICAgdGhpcy5fc3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcihudWxsKTtcclxuICAgICAgICAgICAgdGhpcy5fc3BpbmUudGltZVNjYWxlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5fc3BpbmUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fc3BpbmVfdHJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5fc3BpbmVfdHJhY2sudHJhY2tUaW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fc3BpbmVfdHJhY2sgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbS5wb29sLnB1dF9jaGlsZHJlbih0aGlzLm1vZGVsX25vZGUpO1xyXG4gICAgICAgIGdtLnBvb2wucHV0X2NoaWxkcmVuKHRoaXMudG9wX25vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bnVzZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci51bnVzZSgpO1xyXG4gICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hhbmdlX2hwKGFtb3VudDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGEgJiYgYW1vdW50IDwgMCkge1xyXG4gICAgICAgICAgICBhbW91bnQgPSBNYXRoLm1pbigwLCBhbW91bnQgKyB0aGlzLl9kYXRhLnJlYWxfZGVmZW5zZV92YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEuaHAgPSBNYXRoLm1heCgwLCBNYXRoLm1pbih0aGlzLl9kYXRhLm1heF9ocCwgdGhpcy5fZGF0YS5ocCArIGFtb3VudCkpO1xyXG4gICAgICAgICAgICBnbS51aS5maWdodC5idWlsZGluZ19jYWxsX2RlZmVuc2VfaGVybyh0aGlzLl9kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwbGF5X2hpdF9hbmltKHBvc2l0aW9uOiBjYy5Ob2RlLCBhbmltYXRpb25OYW1lOiBzdHJpbmcgPSBcImhpdFwiKTogdm9pZCB7XHJcbiAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoQnVuZGxlTmFtZS5DT01NT04sIFwicHJlZmFicy9tb2RlbC9cIiArIGFuaW1hdGlvbk5hbWUsIE5vZGVQb29sSXRlbSwgKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgZ20udWkuZmlnaHQuZWZmZWN0X25vZGUuYWRkQ2hpbGQoaXRlbS5ub2RlKTtcclxuICAgICAgICAgICAgaXRlbS5ub2RlLnNjYWxlID0gMC41O1xyXG4gICAgICAgICAgICBpdGVtLm5vZGUucG9zaXRpb24gPSBnbS51aS5maWdodC5jb252ZXJ0X3RvX3NjZW5lX3BvaW50KHBvc2l0aW9uKTtcclxuICAgICAgICAgICAgY29uc3QgYW5pbWF0aW9uID0gaXRlbS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLm9uY2UoY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KGFuaW1hdGlvbi5ub2RlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwbGF5X3NraWxsX2hpdF9hbmltKHBvc2l0aW9uOiBjYy5Ob2RlLCBza2lsbE5hbWU6IHN0cmluZywgZWZmZWN0Tm9kZTogY2MuTm9kZSA9IGdtLnVpLmZpZ2h0LmVmZmVjdF9ub2RlLCB6SW5kZXg6IG51bWJlciA9IDApOiB2b2lkIHtcclxuICAgICAgICBnbS5wb29sLmFzeW5jX2dldChCdW5kbGVOYW1lLkNPTU1PTiwgXCJwcmVmYWJzL21vZGVsL1wiICsgc2tpbGxOYW1lLCBOb2RlUG9vbEl0ZW0sIChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGVmZmVjdE5vZGUuYWRkQ2hpbGQoaXRlbS5ub2RlKTtcclxuICAgICAgICAgICAgaXRlbS5ub2RlLnpJbmRleCA9IHpJbmRleDtcclxuICAgICAgICAgICAgaXRlbS5ub2RlLnBvc2l0aW9uID0gZ20udWkuZmlnaHQuY29udmVydF90b19zY2VuZV9wb2ludChwb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGl0ZW0ubm9kZS5zY2FsZSA9IDAuNTtcclxuICAgICAgICAgICAgY29uc3QgYW5pbWF0aW9uID0gaXRlbS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLm9uY2UoY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KGFuaW1hdGlvbi5ub2RlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhcHBseV9wYXNzaXZlX3NraWxsKHNraWxsRGF0YTogU2tpbGxDb25maWcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5fZGF0YTtcclxuICAgICAgICBkYXRhLmRhbWFnZV9yYXRpbyA9IHNraWxsRGF0YS5kYW1hZ2VfcmF0aW87XHJcbiAgICAgICAgZGF0YS5kZWZlbnNlX3JhdGlvID0gc2tpbGxEYXRhLmRlZmVuc2VfcmF0aW87XHJcbiAgICAgICAgaWYgKHNraWxsRGF0YS5za2lsbF9uYW1lICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuQ09NTU9OLCBcInByZWZhYnMvbW9kZWwvXCIgKyBza2lsbERhdGEuc2tpbGxfbmFtZSwgTm9kZVBvb2xJdGVtLCAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3Bfbm9kZS5hZGRDaGlsZChpdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYW5pbWF0aW9uID0gaXRlbS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24ucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHB1dF90b19wb29sKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9kYXRhO1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdyaWRJbmRleCA9IGRhdGEuZ3JpZF9pbmRleDtcclxuICAgICAgICAgICAgY29uc3QgdGVtcERhdGEgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YTtcclxuICAgICAgICAgICAgdGVtcERhdGEud2FsbF9pdGVtX2FycmF5W2RhdGEuYXJyYXlfaW5kZXhdID0gbnVsbDtcclxuICAgICAgICAgICAgdGVtcERhdGEud2FsbF9kYXRhX2FycmF5W2RhdGEuYXJyYXlfaW5kZXhdID0gbnVsbDtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IHRoaXMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBnbS5wb29sLnB1dCh0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICBjb25zdCB0aW1lU2NhbGVTdWZmaXggPSBjYy5kaXJlY3Rvci5nZXRTY2hlZHVsZXIoKS5nZXRUaW1lU2NhbGUoKSA9PSBnbS5jb25zdC5GSUdIVF9TUEVFRF9YMiA/IFwiX3gyXCIgOiBcIlwiO1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvQ29uZmlnID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkhlcm9Db25maWdEYXRhXCIsIGRhdGEuaWQgKyBcIlwiKSBhcyBIZXJvQ29uZmlnO1xyXG4gICAgICAgICAgICBpZiAoaGVyb0NvbmZpZyAmJiBoZXJvQ29uZmlnLmRlYXRoX2F1ZGlvKSB7XHJcbiAgICAgICAgICAgICAgICBnbS5hdWRpby5wbGF5X2VmZmVjdChoZXJvQ29uZmlnLmRlYXRoX2F1ZGlvICsgdGltZVNjYWxlU3VmZml4KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdtLmF1ZGlvLnBsYXlfZWZmZWN0KGdtLmNvbnN0LkFVRElPXzIzX0hFUk9fREVBVEggKyB0aW1lU2NhbGVTdWZmaXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuRklHSFQsIFwicHJlZmFicy9idWlsZGluZ19kZXN0cm95XCIsIE5vZGVQb29sSXRlbSwgKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIHRlbXBEYXRhLmJ1aWxkaW5nX2Rlc3Ryb3lfYXJyYXkucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVmZmVjdFBvc2l0aW9uID0gZGF0YSAmJiB0ZW1wRGF0YS5pc19saWdodGhvdXNlKGRhdGEuaWQpID8gY2MudjMoMzEsIDUxLCAwKSA6IGNjLlZlYzMuWkVSTztcclxuICAgICAgICAgICAgICAgIGVmZmVjdFBvc2l0aW9uLmFkZFNlbGYoY2MudjMoMCwgNCwgMCkpLmFkZFNlbGYocG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5ub2RlLnBvc2l0aW9uID0gZ20udWkuZmlnaHQuY29udmVydF90b19tYXBfcG9pbnQocGFyZW50Tm9kZSwgZWZmZWN0UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZHluYW1pY0xheWVyID0gdGVtcERhdGEuZ2V0X2R5bmFtaWNfbm9kZV9sYXllcihncmlkSW5kZXgsIEZpZ2h0RHluYW1pY05vZGVMYXllci5ERVNUUk9ZX0VGRkVDVCk7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5maWdodC5tYXBfbm9kZS5hZGRDaGlsZChpdGVtLm5vZGUsIGR5bmFtaWNMYXllcik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcERhdGEuaXNfZGVidWcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLm5vZGUubmFtZSA9IGNjLmpzLmZvcm1hdFN0cihcImJ1aWxkaW5nX2Rlc3Ryb3lfZ3JpZEluZGV4QCVkX3pJbmRleEAlZFwiLCBncmlkSW5kZXgsIGR5bmFtaWNMYXllcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhbmltYXRpb24gPSBpdGVtLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGxheV9hdHRhY2tfYXVkaW8oKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuX2RhdGE7XHJcbiAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJIZXJvQ29uZmlnRGF0YVwiLCBkYXRhLmlkICsgXCJcIikgYXMgSGVyb0NvbmZpZztcclxuICAgICAgICBpZiAoaGVyb0NvbmZpZyAmJiBoZXJvQ29uZmlnLmF0dGFja19hdWRpbykge1xyXG4gICAgICAgICAgICBjb25zdCB0aW1lU2NhbGVTdWZmaXggPSBjYy5kaXJlY3Rvci5nZXRTY2hlZHVsZXIoKS5nZXRUaW1lU2NhbGUoKSA9PSBnbS5jb25zdC5GSUdIVF9TUEVFRF9YMiA/IFwiX3gyXCIgOiBcIlwiO1xyXG4gICAgICAgICAgICBnbS5hdWRpby5wbGF5X2VmZmVjdChoZXJvQ29uZmlnLmF0dGFja19hdWRpbyArIHRpbWVTY2FsZVN1ZmZpeCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGxheV9za2lsbF9hdWRpbygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5fZGF0YTtcclxuICAgICAgICBjb25zdCBoZXJvQ29uZmlnID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkhlcm9Db25maWdEYXRhXCIsIGRhdGEuaWQgKyBcIlwiKSBhcyBIZXJvQ29uZmlnO1xyXG4gICAgICAgIGlmIChoZXJvQ29uZmlnICYmIGhlcm9Db25maWcuc2tpbGxfYXVkaW8pIHtcclxuICAgICAgICAgICAgY29uc3QgdGltZVNjYWxlU3VmZml4ID0gY2MuZGlyZWN0b3IuZ2V0U2NoZWR1bGVyKCkuZ2V0VGltZVNjYWxlKCkgPT0gZ20uY29uc3QuRklHSFRfU1BFRURfWDIgPyBcIl94MlwiIDogXCJcIjtcclxuICAgICAgICAgICAgZ20uYXVkaW8ucGxheV9lZmZlY3QoaGVyb0NvbmZpZy5za2lsbF9hdWRpbyArIHRpbWVTY2FsZVN1ZmZpeCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwbGF5X3NwaW5lX2FuaW0ocmFkaWFuOiBudW1iZXIsIGRlbGF5OiBudW1iZXIgPSAwLCBjYWxsYmFjazogRnVuY3Rpb24gPSBudWxsLCBkdXJhdGlvbjogbnVtYmVyID0gMCwgZW5kQ2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBub3JtYWxpemVkUmFkaWFuID0gKCh0aGlzLl9kYXRhLnJhZGlhbiA9IHJhZGlhbikgJSAoMiAqIE1hdGguUEkpICsgMiAqIE1hdGguUEkpICUgKDIgKiBNYXRoLlBJKTtcclxuICAgICAgICBsZXQgYXR0YWNrQW5pbSA9IFwiXCI7XHJcbiAgICAgICAgbGV0IHN0YXlBbmltID0gXCJcIjtcclxuICAgICAgICBsZXQgYW5pbUluZGV4ID0gMDtcclxuXHJcbiAgICAgICAgaWYgKG5vcm1hbGl6ZWRSYWRpYW4gPj0gTWF0aC5QSSAvIDQgJiYgbm9ybWFsaXplZFJhZGlhbiA8IDMgKiBNYXRoLlBJIC8gNCkge1xyXG4gICAgICAgICAgICBhdHRhY2tBbmltID0gXCJiYXR0YWNrXCI7XHJcbiAgICAgICAgICAgIHN0YXlBbmltID0gXCJic3RheVwiO1xyXG4gICAgICAgICAgICBhbmltSW5kZXggPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobm9ybWFsaXplZFJhZGlhbiA+PSAzICogTWF0aC5QSSAvIDQgJiYgbm9ybWFsaXplZFJhZGlhbiA8IDUgKiBNYXRoLlBJIC8gNCkge1xyXG4gICAgICAgICAgICBhdHRhY2tBbmltID0gXCJsYXR0YWNrXCI7XHJcbiAgICAgICAgICAgIHN0YXlBbmltID0gXCJsc3RheVwiO1xyXG4gICAgICAgICAgICBhbmltSW5kZXggPSAzO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobm9ybWFsaXplZFJhZGlhbiA+PSA1ICogTWF0aC5QSSAvIDQgJiYgbm9ybWFsaXplZFJhZGlhbiA8IDcgKiBNYXRoLlBJIC8gNCkge1xyXG4gICAgICAgICAgICBhdHRhY2tBbmltID0gXCJmYXR0YWNrXCI7XHJcbiAgICAgICAgICAgIHN0YXlBbmltID0gXCJmc3RheVwiO1xyXG4gICAgICAgICAgICBhbmltSW5kZXggPSAyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGF0dGFja0FuaW0gPSBcInJhdHRhY2tcIjtcclxuICAgICAgICAgICAgc3RheUFuaW0gPSBcInJzdGF5XCI7XHJcbiAgICAgICAgICAgIGFuaW1JbmRleCA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9hbmltX25hbWUgPSBhdHRhY2tBbmltO1xyXG4gICAgICAgIHRoaXMuX2FuaW1faW5kZXggPSBhbmltSW5kZXg7XHJcbiAgICAgICAgdGhpcy5fbmV4dF9hbmltX25hbWUgPSBzdGF5QW5pbTtcclxuXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIGlmIChkZWxheSA+IDAgJiYgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoXCJwbGF5X3NwaW5lX2FuaW0g5Y+C5pWw6ZSZ6K+vXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZHVyYXRpb24gPiAwICYmIGVuZENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGVuZENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0sIGR1cmF0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zcGluZV90cmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLl9zcGluZV90cmFjay50cmFja1RpbWUgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zcGluZS5zZXRUb1NldHVwUG9zZSgpO1xyXG4gICAgICAgIHRoaXMuX3NwaW5lX3RyYWNrID0gdGhpcy5fc3BpbmUuc2V0QW5pbWF0aW9uKDAsIGF0dGFja0FuaW0sIGZhbHNlKTtcclxuICAgICAgICB0aGlzLl9zcGluZS5zZXRDb21wbGV0ZUxpc3RlbmVyKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fc3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcihudWxsKTtcclxuICAgICAgICAgICAgdGhpcy5fc3BpbmVfdHJhY2sgPSB0aGlzLl9zcGluZS5zZXRBbmltYXRpb24oMCwgc3RheUFuaW0sIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX3NwaW5lLnRpbWVTY2FsZSA9IGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpLmdldFRpbWVTY2FsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwbGF5X3dlYXBvbl9mbHlfYW5pbSh0YXJnZXQ6IGNjLk5vZGUsIGR1cmF0aW9uOiBudW1iZXIsIGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoQnVuZGxlTmFtZS5GSUdIVCwgXCJwcmVmYWJzL3NraWxsX2l0ZW1cIiwgU2tpbGxJdGVtLCAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBnbS51aS5maWdodC5lZmZlY3Rfbm9kZS5hZGRDaGlsZChpdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5za2lsbF9pdGVtX2FycmF5LnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIGxldCBlZmZlY3RQb3NpdGlvbiA9IGNjLnYzKDAsIDEwKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGEub2NjdXBhdGlvbiA9PSAxMiAmJiB0aGlzLl9hbmltX2luZGV4ID49IDAgJiYgdGhpcy5fYW5pbV9pbmRleCA8PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBlZmZlY3RQb3NpdGlvbiA9IFtjYy52Myg4LCA2NiksIGNjLnYzKDE5LCA2NyksIGNjLnYzKC02LCA3NyksIGNjLnYzKC0yMCwgNjkpXVt0aGlzLl9hbmltX2luZGV4XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpdGVtLnNldF9idWlsZGluZ19hdHRhY2tfdGFyZ2V0KHRoaXMsIGVmZmVjdFBvc2l0aW9uLCBjYy52MygwLCAxMCwgMCksIDEsIHRhcmdldCwgY2FsbGJhY2spO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBGaWdodFdhbGxJdGVtIH07Il19