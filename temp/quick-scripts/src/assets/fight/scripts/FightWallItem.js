"use strict";
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