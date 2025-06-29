
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/fight/scripts/FightHeroItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd3893nWszJNPJflW8xwNwsM', 'FightHeroItem');
// fight/scripts/FightHeroItem.ts

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
exports.FightHeroItem = void 0;
var Constants_1 = require("../../start-scene/scripts/Constants");
var ConfigData_1 = require("../../start-scene/scripts/ConfigData");
var FightConstants_1 = require("../../start-scene/scripts/FightConstants");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var GraphicsUtils_1 = require("../../start-scene/scripts/GraphicsUtils");
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var SkillItem_1 = require("./SkillItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FightHeroItem = /** @class */ (function (_super) {
    __extends(FightHeroItem, _super);
    function FightHeroItem() {
        var _this = _super.call(this) || this;
        _this.model_node = null;
        _this.bottom_node = null;
        _this.middle_node = null;
        _this.top_node = null;
        _this.hp_prg = null;
        _this.bar_node = null;
        return _this;
    }
    Object.defineProperty(FightHeroItem.prototype, "data", {
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
    FightHeroItem.prototype.update_view = function () {
        var _this = this;
        if (GameManager_1.gm.data.fight_temp_data.is_debug) {
            GraphicsUtils_1.GraphicsUtils.draw_circle(this.node, cc.Color.BLUE, cc.Vec3.ZERO, this._data.search_range);
            GraphicsUtils_1.GraphicsUtils.draw_fill_circle(this.node, cc.color(cc.Color.RED.r, cc.Color.RED.g, cc.Color.RED.b, 20), cc.Vec3.ZERO, this._data.attack_range);
        }
        if (this.model_node.childrenCount == 0) {
            var data = GameManager_1.gm.config.get_row_data("HeroConfigData", this._data.id + "");
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + data.icon, NodePoolItem_1.NodePoolItem, function (t) {
                if (_this.model_node.childrenCount == 0) {
                    _this.model_node.addChild(t.node);
                    _this._spine = t.getComponent(sp.Skeleton);
                    if (_this._spine) {
                        _this._skin_name = "front";
                        _this._anim_name = "stay";
                        _this._spine.setSkin(_this._skin_name);
                        _this._spine_track = _this._spine.setAnimation(0, _this._anim_name, true);
                        _this._spine.timeScale = cc.director.getScheduler().getTimeScale();
                    }
                }
                else {
                    GameManager_1.gm.pool.put(t.node);
                }
            });
        }
        if (this._data.type == FightConstants_1.HeroType.ATTACK) {
            this.bar_node.color = FightConstants_1.FightConstants.HP_GREEN_COLOR_LIGHT;
        }
        else {
            this.bar_node.color = FightConstants_1.FightConstants.HP_RED_COLOR_LIGHT;
        }
        this.hp_prg.progress = 0 < this._data.max_hp ? this._data.hp / this._data.max_hp : 0;
    };
    FightHeroItem.prototype.reset = function () {
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
        GameManager_1.gm.pool.put_children(this.model_node);
        GameManager_1.gm.pool.put_children(this.bottom_node);
        GameManager_1.gm.pool.put_children(this.middle_node);
        GameManager_1.gm.pool.put_children(this.top_node);
    };
    FightHeroItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.reset();
    };
    FightHeroItem.prototype.change_hp = function (value) {
        if (this._data) {
            this._data.change_hp(value);
            this.update_view();
        }
    };
    FightHeroItem.prototype.play_hit_anim = function (position, animName) {
        if (animName === void 0) { animName = "hit"; }
        GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + (animName = void 0 === animName ? "hit" : animName), NodePoolItem_1.NodePoolItem, function (t) {
            GameManager_1.gm.ui.fight.effect_node.addChild(t.node);
            t.node.position = GameManager_1.gm.ui.fight.convert_to_scene_point(position);
            t.node.scale = 0.5;
            var Anim = t.getComponent(cc.Animation);
            if (Anim) {
                Anim.once(cc.Animation.EventType.FINISHED, function () {
                    GameManager_1.gm.pool.put(Anim.node);
                });
                Anim.play();
            }
        });
    };
    FightHeroItem.prototype.play_skill_hit_anim = function (position, animName, parent, zIndex) {
        if (parent === void 0) { parent = GameManager_1.gm.ui.fight.effect_node; }
        if (zIndex === void 0) { zIndex = 0; }
        GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + animName, NodePoolItem_1.NodePoolItem, function (t) {
            parent.addChild(t.node);
            t.node.zIndex = zIndex;
            t.node.position = GameManager_1.gm.ui.fight.convert_to_scene_point(position);
            t.node.scale = 0.5;
            var Anim = t.getComponent(cc.Animation);
            if (Anim) {
                Anim.once(cc.Animation.EventType.FINISHED, function () {
                    GameManager_1.gm.pool.put(Anim.node);
                });
                Anim.play();
            }
        });
    };
    FightHeroItem.prototype.add_buff_data = function (buff) {
        var data = this._data;
        for (var index = 0; index < data.buff_data_array.length; index++) {
            var existingBuff = data.buff_data_array[index];
            if (existingBuff.id == buff.id && existingBuff.start_time != buff.start_time) {
                data.buff_data_array.splice(index, 1);
                break;
            }
        }
        data.buff_data_array.push(buff);
    };
    FightHeroItem.prototype.remove_buff_data = function (buff) {
        var data = this._data;
        var buffData = data.buff_data_array.indexOf(buff);
        if (-1 < buffData) {
            data.buff_data_array.splice(buffData, 1);
        }
    };
    FightHeroItem.prototype.check_hero_buff = function (time) {
        var data = this._data;
        if (null != data) {
            for (var index = data.buff_data_array.length - 1; 0 <= index; index--) {
                var buff = data.buff_data_array[index];
                var triggerTimes = Math.floor((time - buff.start_time) / buff.valid_time);
                if (buff.is_start && 0 == triggerTimes && 0 == buff.trigger_count || triggerTimes > buff.trigger_count) {
                    this.buff_change_attribute(buff);
                }
            }
            var removedCount = 0;
            for (var index = data.buff_data_array.length - 1; 0 <= index; index--) {
                var buff = data.buff_data_array[index];
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
    };
    FightHeroItem.prototype.buff_change_attribute = function (buff) {
        var data = this._data;
        if (!(null == data || data.hp <= 0)) {
            if (buff.trigger_count < buff.max_trigger_count) {
                switch (buff.id) {
                    case ConfigData_1.SkillEffectId.REDUCE_DAMAGE:
                        data.reduce_damage_ratio = this.get_buff_reduce_damage_ratio();
                        break;
                    case ConfigData_1.SkillEffectId.ATTACK_SPEED_UP:
                        data.attack_speed_ratio = this.get_buff_attack_speed_ratio();
                        break;
                    case ConfigData_1.SkillEffectId.ATTACK_BONUS:
                        data.attack_bonus_ratio = this.get_buff_attack_bonus_ratio();
                        break;
                    case ConfigData_1.SkillEffectId.DIZZINESS:
                        data.move_speed_scale = this.get_buff_move_speed_scale();
                        break;
                    case ConfigData_1.SkillEffectId.DEFENSE_BONUS:
                        data.defense_bonus_ratio = this.get_buff_defense_bonus_ratio();
                        break;
                    case ConfigData_1.SkillEffectId.RESTORE_HP:
                        data.change_hp(data.real_restore_hp), data.restore_hp_ratio = this.get_buff_restore_hp_ratio();
                        break;
                    case ConfigData_1.SkillEffectId.FIRE:
                        data.change_hp(-buff.damage_value);
                        break;
                    case ConfigData_1.SkillEffectId.REDUCE_SPEED:
                        data.move_speed_scale = this.get_buff_move_speed_scale();
                        break;
                    default:
                        console.error("未知的buff类型");
                }
            }
            buff.trigger_count++;
        }
    };
    FightHeroItem.prototype.get_buff_move_speed_scale = function () {
        var data = this._data;
        var scale = 1;
        if (data) {
            for (var index = 0; index < data.buff_data_array.length; index++) {
                scale *= data.buff_data_array[index].move_speed_scale;
            }
        }
        return scale;
    };
    FightHeroItem.prototype.get_buff_reduce_damage_ratio = function () {
        var data = this._data;
        var ratio = 0;
        if (data) {
            for (var index = 0; index < data.buff_data_array.length; index++) {
                ratio += data.buff_data_array[index].reduce_damage_ratio;
            }
        }
        return ratio;
    };
    FightHeroItem.prototype.get_buff_attack_speed_ratio = function () {
        var data = this._data;
        var ratio = 0;
        if (data) {
            for (var index = 0; index < data.buff_data_array.length; index++) {
                ratio += data.buff_data_array[index].attack_speed_ratio;
            }
        }
        return ratio;
    };
    FightHeroItem.prototype.get_buff_attack_bonus_ratio = function () {
        var data = this._data;
        var ratio = 0;
        if (data) {
            for (var index = 0; index < data.buff_data_array.length; index++) {
                ratio += data.buff_data_array[index].attack_bonus_ratio;
            }
        }
        return ratio;
    };
    FightHeroItem.prototype.get_buff_defense_bonus_ratio = function () {
        var data = this._data;
        var ratio = 0;
        if (data) {
            for (var index = 0; index < data.buff_data_array.length; index++) {
                ratio += data.buff_data_array[index].defense_bonus_ratio;
            }
        }
        return ratio;
    };
    FightHeroItem.prototype.get_buff_restore_hp_ratio = function () {
        var data = this._data;
        var ratio = 0;
        if (data) {
            for (var index = 0; index < data.buff_data_array.length; index++) {
                ratio += data.buff_data_array[index].restore_hp_ratio;
            }
        }
        return ratio;
    };
    FightHeroItem.prototype.update_buff_view = function () {
        var _this = this;
        var data = this._data;
        if (null != data) {
            if (0 < data.buff_data_array.length) {
                var latestBuff_1 = data.buff_data_array[data.buff_data_array.length - 1];
                if (!this._loading_buff_data || this._loading_buff_data.id != latestBuff_1.id) {
                    var allNodes = [].concat(this.top_node.children, this.middle_node.children, this.bottom_node.children);
                    for (var index = allNodes.length - 1; 0 <= index; index--) {
                        var node = allNodes[index];
                        node.name != "buff_" + latestBuff_1.id && GameManager_1.gm.pool.put(node);
                    }
                    var buff = "buff_" + latestBuff_1.id;
                    if (0 == allNodes.length && buff) {
                        this._loading_buff_data = latestBuff_1;
                        GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + buff, NodePoolItem_1.NodePoolItem, function (t) {
                            var parentNode = _this.get_buff_parent_node(latestBuff_1.id);
                            parentNode.childrenCount;
                            if (_this._loading_buff_data && latestBuff_1.id == _this._loading_buff_data.id) {
                                parentNode.addChild(t.node);
                                _this._loading_buff_data = null;
                            }
                            else {
                                GameManager_1.gm.pool.put(t.node);
                            }
                        });
                    }
                }
            }
            else {
                GameManager_1.gm.pool.put_children(this.bottom_node);
                GameManager_1.gm.pool.put_children(this.middle_node);
                GameManager_1.gm.pool.put_children(this.top_node);
            }
        }
    };
    FightHeroItem.prototype.get_buff_parent_node = function (buffId) {
        if (-1 < [4, 6].indexOf(buffId)) {
            return this.top_node;
        }
        else if (-1 < [1, 2, 3, 5, 7, 8].indexOf(buffId)) {
            return this.bottom_node;
        }
        else {
            this.middle_node;
        }
    };
    FightHeroItem.prototype.apply_passive_skill_ui = function (skillData) {
        var _this = this;
        if ("" != skillData.skill_name) {
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + skillData.skill_name, NodePoolItem_1.NodePoolItem, function (skillData) {
                _this.top_node.addChild(skillData.node);
                var Anim = skillData.getComponent(cc.Animation);
                if (Anim) {
                    Anim.play();
                }
            });
        }
    };
    FightHeroItem.prototype.put_to_pool = function () {
        var _this = this;
        var data = this._data;
        if (data) {
            var fightData = GameManager_1.gm.data.fight_temp_data;
            if (data.type == FightConstants_1.HeroType.ATTACK) {
                fightData.hero_item_array[data.array_index] = null;
                fightData.hero_data_array[data.array_index].find_path_target = null;
            }
            else if (data.type == FightConstants_1.HeroType.DEFENSE) {
                fightData.defense_hero_array[data.array_index] = null;
                fightData.defense_hero_data_array[data.array_index] = null;
            }
            GameManager_1.gm.pool.put(this.node);
            var speedSuffix = cc.director.getScheduler().getTimeScale() == GameManager_1.gm.const.FIGHT_SPEED_X2 ? "_x2" : "";
            var configData = GameManager_1.gm.config.get_row_data("HeroConfigData", data.id + "");
            if (configData && configData.death_audio) {
                GameManager_1.gm.audio.play_effect(configData.death_audio + speedSuffix);
            }
            else {
                GameManager_1.gm.audio.play_effect(GameManager_1.gm.const.AUDIO_23_HERO_DEATH + speedSuffix);
            }
            var scenePoint_1 = GameManager_1.gm.ui.fight.convert_to_scene_point(this.node);
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.FIGHT, "prefabs/hero_death", NodePoolItem_1.NodePoolItem, function (e) {
                GameManager_1.gm.ui.fight.effect_node.addChild(e.node);
                GameManager_1.gm.data.fight_temp_data.hero_death_array.push(e);
                e.node.position = scenePoint_1;
                var Anim = e.getComponent(cc.Animation);
                if (Anim) {
                    Anim.once(cc.Animation.EventType.FINISHED, function () {
                        var t = GameManager_1.gm.data.fight_temp_data.hero_death_array.indexOf(e);
                        -1 < t && GameManager_1.gm.data.fight_temp_data.hero_death_array.splice(t, 1);
                        GameManager_1.gm.pool.put(Anim.node);
                        _this.death_drop_soul(data);
                    });
                    Anim.play();
                }
            });
        }
    };
    FightHeroItem.prototype.death_drop_soul = function (heroData) {
        var heroConfig = GameManager_1.gm.config.get_row_data("HeroConfigData", heroData.id + "");
        if (heroData && heroData.type == FightConstants_1.HeroType.ATTACK && heroConfig && 0 < heroConfig.souls && 0 < heroConfig.quantity) {
            var rewardData = GameManager_1.gm.data.fight_temp_data.get_reward_data(heroConfig.souls);
            rewardData.num += heroConfig.quantity;
            GameManager_1.gm.data.event_emitter.emit("pick_up_prop", rewardData.index);
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.MAP, "prefabs/item/" + heroConfig.souls, NodePoolItem_1.NodePoolItem, function (t) {
                var mapItem = GameManager_1.gm.data.fight_temp_data.get_fight_map_item(heroData.grid_position.x, heroData.grid_position.y);
                mapItem && mapItem.land_node.addChild(t.node);
                var Anim = t.getComponent(cc.Animation);
                Anim && Anim.play();
                GameManager_1.gm.ui.fight.fly_to_boat(t.node, false);
            });
        }
    };
    FightHeroItem.prototype.play_attack_audio = function () {
        var data = this._data;
        var configData = GameManager_1.gm.config.get_row_data("HeroConfigData", data.id + "");
        if (configData && "" != configData.attack_audio) {
            var speed = cc.director.getScheduler().getTimeScale() == GameManager_1.gm.const.FIGHT_SPEED_X2 ? "_x2" : "";
            GameManager_1.gm.audio.play_effect(configData.attack_audio + speed);
        }
    };
    FightHeroItem.prototype.play_skill_audio = function () {
        var data = this._data;
        var configData = GameManager_1.gm.config.get_row_data("HeroConfigData", data.id + "");
        if (configData && "" != configData.skill_audio) {
            var speed = cc.director.getScheduler().getTimeScale() == GameManager_1.gm.const.FIGHT_SPEED_X2 ? "_x2" : "";
            GameManager_1.gm.audio.play_effect(configData.skill_audio + speed);
        }
    };
    FightHeroItem.prototype.play_spine_anim = function (animationName, rotationAngle, loop, delayBeforeCallback1, callback1, delayBeforeCallback2, callback2) {
        if (loop === void 0) { loop = true; }
        if (delayBeforeCallback1 === void 0) { delayBeforeCallback1 = 0; }
        if (callback1 === void 0) { callback1 = null; }
        if (delayBeforeCallback2 === void 0) { delayBeforeCallback2 = 0; }
        if (callback2 === void 0) { callback2 = null; }
        if (this._spine) {
            var radianAngle = ((this._data.radian = rotationAngle) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
            var skinDirection = "";
            var scaleXDirection = 1;
            var degreeToRadian = Math.PI / 180;
            if (18 * degreeToRadian <= radianAngle && radianAngle < 120 * degreeToRadian) {
                skinDirection = "back";
                scaleXDirection = -1;
            }
            else if (120 * degreeToRadian <= radianAngle && radianAngle < 195 * degreeToRadian) {
                skinDirection = "back";
                scaleXDirection = 1;
            }
            else if (195 * degreeToRadian <= radianAngle && radianAngle < 300 * degreeToRadian) {
                skinDirection = "front";
                scaleXDirection = 1;
            }
            else if (300 * degreeToRadian <= radianAngle && radianAngle < 360 * degreeToRadian || 0 <= radianAngle && radianAngle < 18 * degreeToRadian) {
                skinDirection = "front";
                scaleXDirection = -1;
            }
            else {
                console.log(rotationAngle);
            }
            if (skinDirection != this._skin_name) {
                this._skin_name = skinDirection;
                this._spine.setSkin(skinDirection);
            }
            if (animationName == this._anim_name && loop) {
            }
            else {
                this._anim_name = animationName;
                if (!loop && callback1) {
                    if (0 < delayBeforeCallback1 && callback1) {
                        this.scheduleOnce(function () {
                            callback1();
                        }, delayBeforeCallback1);
                    }
                    else {
                        cc.error("play_spine_anim 参数错误");
                    }
                    if (0 < delayBeforeCallback2 && callback2) {
                        this.scheduleOnce(function () {
                            callback2();
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
    };
    FightHeroItem.prototype.play_weapon_fly_anim = function (attackTarget, rotationAngle, callback) {
        var _this = this;
        var data = this._data;
        if (this._data.type === FightConstants_1.HeroType.ATTACK) {
            data = GameManager_1.gm.data.fight_temp_data.hero_data_array[this._data.array_index];
        }
        else if (this._data.type === FightConstants_1.HeroType.DEFENSE) {
            data = GameManager_1.gm.data.fight_temp_data.defense_hero_data_array[this._data.array_index];
        }
        GameManager_1.gm.pool.async_get(Constants_1.BundleName.FIGHT, "prefabs/skill_item", SkillItem_1.SkillItem, function (skill) {
            GameManager_1.gm.ui.fight.effect_node.addChild(skill.node);
            GameManager_1.gm.data.fight_temp_data.skill_item_array.push(skill);
            var radianAngle = (rotationAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
            var startPosition = cc.v3();
            if (data.fly_weapon_position_array && 2 == data.fly_weapon_position_array.length) {
                if (radianAngle >= Math.PI / 4 && radianAngle < 3 * Math.PI / 4) {
                    startPosition = cc.v3(-data.fly_weapon_position_array[1].x, data.fly_weapon_position_array[1].y).mulSelf(_this.model_node.scale);
                }
                else if (radianAngle >= 3 * Math.PI / 4 && radianAngle < 5 * Math.PI / 4) {
                    startPosition = cc.v3(data.fly_weapon_position_array[1]).mulSelf(_this.model_node.scale);
                }
                else if (radianAngle >= 5 * Math.PI / 4 && radianAngle < 7 * Math.PI / 4) {
                    startPosition = cc.v3(data.fly_weapon_position_array[0]).mulSelf(_this.model_node.scale);
                }
                else if (radianAngle >= 7 * Math.PI / 4 && radianAngle < 2 * Math.PI || 0 <= radianAngle && radianAngle < Math.PI / 4) {
                    startPosition = cc.v3(-data.fly_weapon_position_array[0].x, data.fly_weapon_position_array[0].y).mulSelf(_this.model_node.scale);
                }
                skill.set_attack_target(_this, startPosition, cc.v3(0, 80), 1, attackTarget, callback);
            }
            else {
                cc.error("这里不应该出现fly_weapon_position_array为空或者长度不是2");
            }
        });
    };
    FightHeroItem.prototype.play_skill_fly_anim = function (target, flyType, rotationAngle, callback) {
        var _this = this;
        var data = this._data;
        if (this._data.type === FightConstants_1.HeroType.ATTACK) {
            data = GameManager_1.gm.data.fight_temp_data.hero_data_array[this._data.array_index];
        }
        else if (this._data.type === FightConstants_1.HeroType.DEFENSE) {
            data = GameManager_1.gm.data.fight_temp_data.defense_hero_data_array[this._data.array_index];
        }
        GameManager_1.gm.pool.async_get(Constants_1.BundleName.FIGHT, "prefabs/skill_item", SkillItem_1.SkillItem, function (skill) {
            GameManager_1.gm.ui.fight.effect_node.addChild(skill.node);
            GameManager_1.gm.data.fight_temp_data.skill_item_array.push(skill);
            var radianAngle = (rotationAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
            var startPosition = cc.v3();
            if (data.fly_weapon_position_array && 2 == data.fly_weapon_position_array.length) {
                if (radianAngle >= Math.PI / 4 && radianAngle < 3 * Math.PI / 4) {
                    startPosition = cc.v3(-data.fly_weapon_position_array[1].x, data.fly_weapon_position_array[1].y).mulSelf(_this.model_node.scale);
                }
                else if (radianAngle >= 3 * Math.PI / 4 && radianAngle < 5 * Math.PI / 4) {
                    startPosition = cc.v3(data.fly_weapon_position_array[1]).mulSelf(_this.model_node.scale);
                }
                else if (radianAngle >= 5 * Math.PI / 4 && radianAngle < 7 * Math.PI / 4) {
                    startPosition = cc.v3(data.fly_weapon_position_array[0]).mulSelf(_this.model_node.scale);
                }
                else if (radianAngle >= 7 * Math.PI / 4 && radianAngle < 2 * Math.PI || 0 <= radianAngle && radianAngle < Math.PI / 4) {
                    startPosition = cc.v3(-data.fly_weapon_position_array[0].x, data.fly_weapon_position_array[0].y).mulSelf(_this.model_node.scale);
                }
                skill.set_fly_skill_target(target, _this, startPosition, cc.v3(0, 80), target.fly_type, flyType, callback);
            }
            else {
                cc.error("这里不应该出现fly_weapon_position_array为空或者长度不是2");
            }
        });
    };
    FightHeroItem.prototype.play_skill_anim = function (target, effectPositionY, animationType, callback) {
        var _this = this;
        this._data;
        if (this._data.type === FightConstants_1.HeroType.ATTACK) {
            GameManager_1.gm.data.fight_temp_data.hero_data_array[this._data.array_index];
        }
        else if (this._data.type === FightConstants_1.HeroType.DEFENSE) {
            GameManager_1.gm.data.fight_temp_data.defense_hero_data_array[this._data.array_index];
        }
        GameManager_1.gm.pool.async_get(Constants_1.BundleName.FIGHT, "prefabs/skill_item", SkillItem_1.SkillItem, function (skill) {
            _this.node.addChild(skill.node);
            GameManager_1.gm.data.fight_temp_data.skill_item_array.push(skill);
            skill.set_skill_target(target, _this, cc.v3(0, 80), effectPositionY, callback);
        });
    };
    __decorate([
        property(cc.Node)
    ], FightHeroItem.prototype, "model_node", void 0);
    __decorate([
        property(cc.Node)
    ], FightHeroItem.prototype, "bottom_node", void 0);
    __decorate([
        property(cc.Node)
    ], FightHeroItem.prototype, "middle_node", void 0);
    __decorate([
        property(cc.Node)
    ], FightHeroItem.prototype, "top_node", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], FightHeroItem.prototype, "hp_prg", void 0);
    __decorate([
        property(cc.Node)
    ], FightHeroItem.prototype, "bar_node", void 0);
    FightHeroItem = __decorate([
        ccclass
    ], FightHeroItem);
    return FightHeroItem;
}(NodePoolItem_1.NodePoolItem));
exports.FightHeroItem = FightHeroItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZmlnaHRcXHNjcmlwdHNcXEZpZ2h0SGVyb0l0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlFQUFpRTtBQUNqRSxtRUFBcUU7QUFDckUsMkVBQW9GO0FBQ3BGLHFFQUEyRDtBQUMzRCx5RUFBd0U7QUFDeEUsdUVBQXNFO0FBQ3RFLHlDQUF3QztBQUtsQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFtQyxpQ0FBWTtJQTBCM0M7UUFBQSxZQUNJLGlCQUFPLFNBT1Y7UUFORyxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQTs7SUFDeEIsQ0FBQztJQUVELHNCQUFXLCtCQUFJO2FBQWY7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzthQUVELFVBQWdCLEtBQXdCO1lBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDOzs7T0FMQTtJQU9NLG1DQUFXLEdBQWxCO1FBQUEsaUJBaUNDO1FBaENHLElBQUksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRTtZQUNsQyw2QkFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENB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QUQsb0JBQUM7Q0F6bEJELEFBeWxCQyxDQXpsQmtDLDJCQUFZLEdBeWxCOUM7QUF6bEJZLHNDQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnVuZGxlTmFtZSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgU2tpbGxFZmZlY3RJZCB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvQ29uZmlnRGF0YSc7XHJcbmltcG9ydCB7IEhlcm9UeXBlLCBGaWdodENvbnN0YW50cyB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvRmlnaHRDb25zdGFudHMnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBHcmFwaGljc1V0aWxzIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HcmFwaGljc1V0aWxzJztcclxuaW1wb3J0IHsgTm9kZVBvb2xJdGVtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Ob2RlUG9vbEl0ZW0nO1xyXG5pbXBvcnQgeyBTa2lsbEl0ZW0gfSBmcm9tICcuL1NraWxsSXRlbSc7XHJcbmltcG9ydCB7IEJ1ZmZJdGVtRGF0YSwgRmlnaHRIZXJvSXRlbURhdGEgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0ZpZ2h0VGVtcERhdGEnXHJcbmltcG9ydCB7IEhlcm9Db25maWcgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9oZXJvJztcclxuaW1wb3J0IHsgU2tpbGxDb25maWcgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9za2lsbCc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIEZpZ2h0SGVyb0l0ZW0gZXh0ZW5kcyBOb2RlUG9vbEl0ZW0ge1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIG1vZGVsX25vZGU6IGNjLk5vZGUgfCBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBib3R0b21fbm9kZTogY2MuTm9kZSB8IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIG1pZGRsZV9ub2RlOiBjYy5Ob2RlIHwgbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgdG9wX25vZGU6IGNjLk5vZGUgfCBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Qcm9ncmVzc0JhcilcclxuICAgIHByaXZhdGUgaHBfcHJnOiBjYy5Qcm9ncmVzc0JhciB8IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGJhcl9ub2RlOiBjYy5Ob2RlIHwgbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9kYXRhOiBGaWdodEhlcm9JdGVtRGF0YTtcclxuICAgIHByaXZhdGUgX3NwaW5lOiBzcC5Ta2VsZXRvbiB8IG51bGw7XHJcbiAgICBwcml2YXRlIF9zcGluZV90cmFjazogc3Auc3BpbmUuVHJhY2tFbnRyeSB8IG51bGw7XHJcbiAgICBwcml2YXRlIF9za2luX25hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2FuaW1fbmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfbG9hZGluZ19idWZmX2RhdGE6IEJ1ZmZJdGVtRGF0YTtcclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tb2RlbF9ub2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmJvdHRvbV9ub2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLm1pZGRsZV9ub2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLnRvcF9ub2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmhwX3ByZyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5iYXJfbm9kZSA9IG51bGxcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRhdGEoKTogRmlnaHRIZXJvSXRlbURhdGEge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZGF0YSh2YWx1ZTogRmlnaHRIZXJvSXRlbURhdGEpIHtcclxuICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVfdmlldygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuaXNfZGVidWcpIHtcclxuICAgICAgICAgICAgR3JhcGhpY3NVdGlscy5kcmF3X2NpcmNsZSh0aGlzLm5vZGUsIGNjLkNvbG9yLkJMVUUsIGNjLlZlYzMuWkVSTywgdGhpcy5fZGF0YS5zZWFyY2hfcmFuZ2UpO1xyXG4gICAgICAgICAgICBHcmFwaGljc1V0aWxzLmRyYXdfZmlsbF9jaXJjbGUodGhpcy5ub2RlLCBjYy5jb2xvcihjYy5Db2xvci5SRUQuciwgY2MuQ29sb3IuUkVELmcsIGNjLkNvbG9yLlJFRC5iLCAyMCksIGNjLlZlYzMuWkVSTywgdGhpcy5fZGF0YS5hdHRhY2tfcmFuZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWxfbm9kZS5jaGlsZHJlbkNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJIZXJvQ29uZmlnRGF0YVwiLCB0aGlzLl9kYXRhLmlkICsgXCJcIikgYXMgSGVyb0NvbmZpZztcclxuICAgICAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoQnVuZGxlTmFtZS5DT01NT04sIFwicHJlZmFicy9tb2RlbC9cIiArIGRhdGEuaWNvbiwgTm9kZVBvb2xJdGVtLCAodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kZWxfbm9kZS5jaGlsZHJlbkNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsX25vZGUuYWRkQ2hpbGQodC5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcGluZSA9IHQuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3BpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2tpbl9uYW1lID0gXCJmcm9udFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmltX25hbWUgPSBcInN0YXlcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3BpbmUuc2V0U2tpbih0aGlzLl9za2luX25hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcGluZV90cmFjayA9IHRoaXMuX3NwaW5lLnNldEFuaW1hdGlvbigwLCB0aGlzLl9hbmltX25hbWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcGluZS50aW1lU2NhbGUgPSBjYy5kaXJlY3Rvci5nZXRTY2hlZHVsZXIoKS5nZXRUaW1lU2NhbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KHQubm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGEudHlwZSA9PSBIZXJvVHlwZS5BVFRBQ0spIHtcclxuICAgICAgICAgICAgdGhpcy5iYXJfbm9kZS5jb2xvciA9IEZpZ2h0Q29uc3RhbnRzLkhQX0dSRUVOX0NPTE9SX0xJR0hUO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmFyX25vZGUuY29sb3IgPSBGaWdodENvbnN0YW50cy5IUF9SRURfQ09MT1JfTElHSFQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmhwX3ByZy5wcm9ncmVzcyA9IDAgPCB0aGlzLl9kYXRhLm1heF9ocCA/IHRoaXMuX2RhdGEuaHAgLyB0aGlzLl9kYXRhLm1heF9ocCA6IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3NraW5fbmFtZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fYW5pbV9uYW1lID0gXCJcIjtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3NwaW5lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwaW5lLnNldFRvU2V0dXBQb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIobnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwaW5lLnRpbWVTY2FsZSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuX3NwaW5lID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zcGluZV90cmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLl9zcGluZV90cmFjay50cmFja1RpbWUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9zcGluZV90cmFjayA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdtLnBvb2wucHV0X2NoaWxkcmVuKHRoaXMubW9kZWxfbm9kZSk7XHJcbiAgICAgICAgZ20ucG9vbC5wdXRfY2hpbGRyZW4odGhpcy5ib3R0b21fbm9kZSk7XHJcbiAgICAgICAgZ20ucG9vbC5wdXRfY2hpbGRyZW4odGhpcy5taWRkbGVfbm9kZSk7XHJcbiAgICAgICAgZ20ucG9vbC5wdXRfY2hpbGRyZW4odGhpcy50b3Bfbm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVudXNlKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnVudXNlKCk7XHJcbiAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGFuZ2VfaHAodmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEuY2hhbmdlX2hwKHZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGxheV9oaXRfYW5pbShwb3NpdGlvbjogY2MuTm9kZSwgYW5pbU5hbWU6IHN0cmluZyA9IFwiaGl0XCIpOiB2b2lkIHtcclxuICAgICAgICBnbS5wb29sLmFzeW5jX2dldChCdW5kbGVOYW1lLkNPTU1PTiwgXCJwcmVmYWJzL21vZGVsL1wiICsgKGFuaW1OYW1lID0gdm9pZCAwID09PSBhbmltTmFtZSA/IFwiaGl0XCIgOiBhbmltTmFtZSksIE5vZGVQb29sSXRlbSwgKHQpID0+IHtcclxuICAgICAgICAgICAgZ20udWkuZmlnaHQuZWZmZWN0X25vZGUuYWRkQ2hpbGQodC5ub2RlKTtcclxuICAgICAgICAgICAgdC5ub2RlLnBvc2l0aW9uID0gZ20udWkuZmlnaHQuY29udmVydF90b19zY2VuZV9wb2ludChwb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHQubm9kZS5zY2FsZSA9IDAuNTtcclxuICAgICAgICAgICAgY29uc3QgQW5pbSA9IHQuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcblxyXG4gICAgICAgICAgICBpZiAoQW5pbSkge1xyXG4gICAgICAgICAgICAgICAgQW5pbS5vbmNlKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5wb29sLnB1dChBbmltLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBBbmltLnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXlfc2tpbGxfaGl0X2FuaW0ocG9zaXRpb246IGNjLk5vZGUsIGFuaW1OYW1lOiBzdHJpbmcsIHBhcmVudDogY2MuTm9kZSA9IGdtLnVpLmZpZ2h0LmVmZmVjdF9ub2RlLCB6SW5kZXg6IG51bWJlciA9IDApOiB2b2lkIHtcclxuXHJcbiAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoQnVuZGxlTmFtZS5DT01NT04sIFwicHJlZmFicy9tb2RlbC9cIiArIGFuaW1OYW1lLCBOb2RlUG9vbEl0ZW0sICh0KSA9PiB7XHJcbiAgICAgICAgICAgIHBhcmVudC5hZGRDaGlsZCh0Lm5vZGUpO1xyXG4gICAgICAgICAgICB0Lm5vZGUuekluZGV4ID0gekluZGV4O1xyXG4gICAgICAgICAgICB0Lm5vZGUucG9zaXRpb24gPSBnbS51aS5maWdodC5jb252ZXJ0X3RvX3NjZW5lX3BvaW50KHBvc2l0aW9uKTtcclxuICAgICAgICAgICAgdC5ub2RlLnNjYWxlID0gMC41O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgQW5pbSA9IHQuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgIGlmIChBbmltKSB7XHJcbiAgICAgICAgICAgICAgICBBbmltLm9uY2UoY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KEFuaW0ubm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIEFuaW0ucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkX2J1ZmZfZGF0YShidWZmOiBCdWZmSXRlbURhdGEpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5fZGF0YTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZGF0YS5idWZmX2RhdGFfYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nQnVmZiA9IGRhdGEuYnVmZl9kYXRhX2FycmF5W2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nQnVmZi5pZCA9PSBidWZmLmlkICYmIGV4aXN0aW5nQnVmZi5zdGFydF90aW1lICE9IGJ1ZmYuc3RhcnRfdGltZSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5idWZmX2RhdGFfYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRhdGEuYnVmZl9kYXRhX2FycmF5LnB1c2goYnVmZik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVfYnVmZl9kYXRhKGJ1ZmY6IEJ1ZmZJdGVtRGF0YSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9kYXRhO1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZEYXRhID0gZGF0YS5idWZmX2RhdGFfYXJyYXkuaW5kZXhPZihidWZmKTtcclxuICAgICAgICBpZiAoLSAxIDwgYnVmZkRhdGEpIHtcclxuICAgICAgICAgICAgZGF0YS5idWZmX2RhdGFfYXJyYXkuc3BsaWNlKGJ1ZmZEYXRhLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrX2hlcm9fYnVmZih0aW1lOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5fZGF0YTtcclxuICAgICAgICBpZiAobnVsbCAhPSBkYXRhKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gZGF0YS5idWZmX2RhdGFfYXJyYXkubGVuZ3RoIC0gMTsgMCA8PSBpbmRleDsgaW5kZXgtLSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnVmZiA9IGRhdGEuYnVmZl9kYXRhX2FycmF5W2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRyaWdnZXJUaW1lcyA9IE1hdGguZmxvb3IoKHRpbWUgLSBidWZmLnN0YXJ0X3RpbWUpIC8gYnVmZi52YWxpZF90aW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChidWZmLmlzX3N0YXJ0ICYmIDAgPT0gdHJpZ2dlclRpbWVzICYmIDAgPT0gYnVmZi50cmlnZ2VyX2NvdW50IHx8IHRyaWdnZXJUaW1lcyA+IGJ1ZmYudHJpZ2dlcl9jb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZl9jaGFuZ2VfYXR0cmlidXRlKGJ1ZmYpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVtb3ZlZENvdW50ID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSBkYXRhLmJ1ZmZfZGF0YV9hcnJheS5sZW5ndGggLSAxOyAwIDw9IGluZGV4OyBpbmRleC0tKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBidWZmID0gZGF0YS5idWZmX2RhdGFfYXJyYXlbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmYudHJpZ2dlcl9jb3VudCA9PSBidWZmLm1heF90cmlnZ2VyX2NvdW50ICYmIGJ1ZmYuaXNfZW5kIHx8IGJ1ZmYudHJpZ2dlcl9jb3VudCA+IGJ1ZmYubWF4X3RyaWdnZXJfY291bnQgJiYgIWJ1ZmYuaXNfZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5idWZmX2RhdGFfYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVkQ291bnQrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKDAgPCByZW1vdmVkQ291bnQpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEucmVkdWNlX2RhbWFnZV9yYXRpbyA9IHRoaXMuZ2V0X2J1ZmZfcmVkdWNlX2RhbWFnZV9yYXRpbygpO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5hdHRhY2tfc3BlZWRfcmF0aW8gPSB0aGlzLmdldF9idWZmX2F0dGFja19zcGVlZF9yYXRpbygpO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5hdHRhY2tfYm9udXNfcmF0aW8gPSB0aGlzLmdldF9idWZmX2F0dGFja19ib251c19yYXRpbygpO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5tb3ZlX3NwZWVkX3NjYWxlID0gdGhpcy5nZXRfYnVmZl9tb3ZlX3NwZWVkX3NjYWxlKCk7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnJlc3RvcmVfaHBfcmF0aW8gPSB0aGlzLmdldF9idWZmX3Jlc3RvcmVfaHBfcmF0aW8oKTtcclxuICAgICAgICAgICAgICAgIGRhdGEuZGVmZW5zZV9ib251c19yYXRpbyA9IHRoaXMuZ2V0X2J1ZmZfZGVmZW5zZV9ib251c19yYXRpbygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV9idWZmX3ZpZXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWZmX2NoYW5nZV9hdHRyaWJ1dGUoYnVmZjogQnVmZkl0ZW1EYXRhKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuX2RhdGE7XHJcbiAgICAgICAgaWYgKCEobnVsbCA9PSBkYXRhIHx8IGRhdGEuaHAgPD0gMCkpIHtcclxuICAgICAgICAgICAgaWYgKGJ1ZmYudHJpZ2dlcl9jb3VudCA8IGJ1ZmYubWF4X3RyaWdnZXJfY291bnQpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYnVmZi5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU2tpbGxFZmZlY3RJZC5SRURVQ0VfREFNQUdFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnJlZHVjZV9kYW1hZ2VfcmF0aW8gPSB0aGlzLmdldF9idWZmX3JlZHVjZV9kYW1hZ2VfcmF0aW8oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTa2lsbEVmZmVjdElkLkFUVEFDS19TUEVFRF9VUDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5hdHRhY2tfc3BlZWRfcmF0aW8gPSB0aGlzLmdldF9idWZmX2F0dGFja19zcGVlZF9yYXRpbygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFNraWxsRWZmZWN0SWQuQVRUQUNLX0JPTlVTOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmF0dGFja19ib251c19yYXRpbyA9IHRoaXMuZ2V0X2J1ZmZfYXR0YWNrX2JvbnVzX3JhdGlvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU2tpbGxFZmZlY3RJZC5ESVpaSU5FU1M6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubW92ZV9zcGVlZF9zY2FsZSA9IHRoaXMuZ2V0X2J1ZmZfbW92ZV9zcGVlZF9zY2FsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFNraWxsRWZmZWN0SWQuREVGRU5TRV9CT05VUzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5kZWZlbnNlX2JvbnVzX3JhdGlvID0gdGhpcy5nZXRfYnVmZl9kZWZlbnNlX2JvbnVzX3JhdGlvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU2tpbGxFZmZlY3RJZC5SRVNUT1JFX0hQOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmNoYW5nZV9ocChkYXRhLnJlYWxfcmVzdG9yZV9ocCksIGRhdGEucmVzdG9yZV9ocF9yYXRpbyA9IHRoaXMuZ2V0X2J1ZmZfcmVzdG9yZV9ocF9yYXRpbygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFNraWxsRWZmZWN0SWQuRklSRTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5jaGFuZ2VfaHAoLWJ1ZmYuZGFtYWdlX3ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTa2lsbEVmZmVjdElkLlJFRFVDRV9TUEVFRDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5tb3ZlX3NwZWVkX3NjYWxlID0gdGhpcy5nZXRfYnVmZl9tb3ZlX3NwZWVkX3NjYWxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmnKrnn6XnmoRidWZm57G75Z6LXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnVmZi50cmlnZ2VyX2NvdW50Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0X2J1ZmZfbW92ZV9zcGVlZF9zY2FsZSgpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9kYXRhO1xyXG4gICAgICAgIGxldCBzY2FsZSA9IDE7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGRhdGEuYnVmZl9kYXRhX2FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgc2NhbGUgKj0gZGF0YS5idWZmX2RhdGFfYXJyYXlbaW5kZXhdLm1vdmVfc3BlZWRfc2NhbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0X2J1ZmZfcmVkdWNlX2RhbWFnZV9yYXRpbygpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9kYXRhO1xyXG4gICAgICAgIGxldCByYXRpbyA9IDA7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGRhdGEuYnVmZl9kYXRhX2FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgcmF0aW8gKz0gZGF0YS5idWZmX2RhdGFfYXJyYXlbaW5kZXhdLnJlZHVjZV9kYW1hZ2VfcmF0aW87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJhdGlvO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0X2J1ZmZfYXR0YWNrX3NwZWVkX3JhdGlvKCk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuX2RhdGE7XHJcbiAgICAgICAgbGV0IHJhdGlvID0gMDtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZGF0YS5idWZmX2RhdGFfYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICByYXRpbyArPSBkYXRhLmJ1ZmZfZGF0YV9hcnJheVtpbmRleF0uYXR0YWNrX3NwZWVkX3JhdGlvO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByYXRpbztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldF9idWZmX2F0dGFja19ib251c19yYXRpbygpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9kYXRhO1xyXG4gICAgICAgIGxldCByYXRpbyA9IDA7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGRhdGEuYnVmZl9kYXRhX2FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgcmF0aW8gKz0gZGF0YS5idWZmX2RhdGFfYXJyYXlbaW5kZXhdLmF0dGFja19ib251c19yYXRpbztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmF0aW87XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRfYnVmZl9kZWZlbnNlX2JvbnVzX3JhdGlvKCk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuX2RhdGE7XHJcbiAgICAgICAgbGV0IHJhdGlvID0gMDtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZGF0YS5idWZmX2RhdGFfYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICByYXRpbyArPSBkYXRhLmJ1ZmZfZGF0YV9hcnJheVtpbmRleF0uZGVmZW5zZV9ib251c19yYXRpbztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmF0aW87XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRfYnVmZl9yZXN0b3JlX2hwX3JhdGlvKCk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuX2RhdGE7XHJcbiAgICAgICAgbGV0IHJhdGlvID0gMDtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZGF0YS5idWZmX2RhdGFfYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICByYXRpbyArPSBkYXRhLmJ1ZmZfZGF0YV9hcnJheVtpbmRleF0ucmVzdG9yZV9ocF9yYXRpbztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmF0aW87XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVfYnVmZl92aWV3KCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9kYXRhO1xyXG4gICAgICAgIGlmIChudWxsICE9IGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKDAgPCBkYXRhLmJ1ZmZfZGF0YV9hcnJheS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxhdGVzdEJ1ZmYgPSBkYXRhLmJ1ZmZfZGF0YV9hcnJheVtkYXRhLmJ1ZmZfZGF0YV9hcnJheS5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fbG9hZGluZ19idWZmX2RhdGEgfHwgdGhpcy5fbG9hZGluZ19idWZmX2RhdGEuaWQgIT0gbGF0ZXN0QnVmZi5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFsbE5vZGVzID0gW10uY29uY2F0KHRoaXMudG9wX25vZGUuY2hpbGRyZW4sIHRoaXMubWlkZGxlX25vZGUuY2hpbGRyZW4sIHRoaXMuYm90dG9tX25vZGUuY2hpbGRyZW4pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IGFsbE5vZGVzLmxlbmd0aCAtIDE7IDAgPD0gaW5kZXg7IGluZGV4LS0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9kZSA9IGFsbE5vZGVzW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5uYW1lICE9IFwiYnVmZl9cIiArIGxhdGVzdEJ1ZmYuaWQgJiYgZ20ucG9vbC5wdXQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBidWZmID0gXCJidWZmX1wiICsgbGF0ZXN0QnVmZi5pZDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSBhbGxOb2Rlcy5sZW5ndGggJiYgYnVmZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkaW5nX2J1ZmZfZGF0YSA9IGxhdGVzdEJ1ZmY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuQ09NTU9OLCBcInByZWZhYnMvbW9kZWwvXCIgKyBidWZmLCBOb2RlUG9vbEl0ZW0sICh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnROb2RlID0gdGhpcy5nZXRfYnVmZl9wYXJlbnRfbm9kZShsYXRlc3RCdWZmLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGUuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sb2FkaW5nX2J1ZmZfZGF0YSAmJiBsYXRlc3RCdWZmLmlkID09IHRoaXMuX2xvYWRpbmdfYnVmZl9kYXRhLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZS5hZGRDaGlsZCh0Lm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRpbmdfYnVmZl9kYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ20ucG9vbC5wdXQodC5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBnbS5wb29sLnB1dF9jaGlsZHJlbih0aGlzLmJvdHRvbV9ub2RlKTtcclxuICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0X2NoaWxkcmVuKHRoaXMubWlkZGxlX25vZGUpO1xyXG4gICAgICAgICAgICAgICAgZ20ucG9vbC5wdXRfY2hpbGRyZW4odGhpcy50b3Bfbm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRfYnVmZl9wYXJlbnRfbm9kZShidWZmSWQ6IG51bWJlcik6IGNjLk5vZGUge1xyXG4gICAgICAgIGlmICgtMSA8IFs0LCA2XS5pbmRleE9mKGJ1ZmZJZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9wX25vZGU7XHJcbiAgICAgICAgfSBlbHNlIGlmICgtMSA8IFsxLCAyLCAzLCA1LCA3LCA4XS5pbmRleE9mKGJ1ZmZJZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYm90dG9tX25vZGU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5taWRkbGVfbm9kZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgYXBwbHlfcGFzc2l2ZV9za2lsbF91aShza2lsbERhdGE6IHsgc2tpbGxfbmFtZTogc3RyaW5nIH0pOiB2b2lkIHsgLy8ga28gdGjhuqV5IHPhu60gZOG7pW5nIOG7nyDEkcOidVxyXG4gICAgICAgIGlmIChcIlwiICE9IHNraWxsRGF0YS5za2lsbF9uYW1lKSB7XHJcbiAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuQ09NTU9OLCBcInByZWZhYnMvbW9kZWwvXCIgKyBza2lsbERhdGEuc2tpbGxfbmFtZSwgTm9kZVBvb2xJdGVtLCAoc2tpbGxEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvcF9ub2RlLmFkZENoaWxkKHNraWxsRGF0YS5ub2RlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IEFuaW0gPSBza2lsbERhdGEuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoQW5pbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEFuaW0ucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHV0X3RvX3Bvb2woKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuX2RhdGE7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgY29uc3QgZmlnaHREYXRhID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGE7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgPT0gSGVyb1R5cGUuQVRUQUNLKSB7XHJcbiAgICAgICAgICAgICAgICBmaWdodERhdGEuaGVyb19pdGVtX2FycmF5W2RhdGEuYXJyYXlfaW5kZXhdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGZpZ2h0RGF0YS5oZXJvX2RhdGFfYXJyYXlbZGF0YS5hcnJheV9pbmRleF0uZmluZF9wYXRoX3RhcmdldCA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09IEhlcm9UeXBlLkRFRkVOU0UpIHtcclxuICAgICAgICAgICAgICAgIGZpZ2h0RGF0YS5kZWZlbnNlX2hlcm9fYXJyYXlbZGF0YS5hcnJheV9pbmRleF0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZmlnaHREYXRhLmRlZmVuc2VfaGVyb19kYXRhX2FycmF5W2RhdGEuYXJyYXlfaW5kZXhdID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ20ucG9vbC5wdXQodGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgY29uc3Qgc3BlZWRTdWZmaXggPSBjYy5kaXJlY3Rvci5nZXRTY2hlZHVsZXIoKS5nZXRUaW1lU2NhbGUoKSA9PSBnbS5jb25zdC5GSUdIVF9TUEVFRF9YMiA/IFwiX3gyXCIgOiBcIlwiO1xyXG4gICAgICAgICAgICBjb25zdCBjb25maWdEYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkhlcm9Db25maWdEYXRhXCIsIGRhdGEuaWQgKyBcIlwiKSBhcyBIZXJvQ29uZmlnO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbmZpZ0RhdGEgJiYgY29uZmlnRGF0YS5kZWF0aF9hdWRpbykge1xyXG4gICAgICAgICAgICAgICAgZ20uYXVkaW8ucGxheV9lZmZlY3QoY29uZmlnRGF0YS5kZWF0aF9hdWRpbyArIHNwZWVkU3VmZml4KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdtLmF1ZGlvLnBsYXlfZWZmZWN0KGdtLmNvbnN0LkFVRElPXzIzX0hFUk9fREVBVEggKyBzcGVlZFN1ZmZpeCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNjZW5lUG9pbnQgPSBnbS51aS5maWdodC5jb252ZXJ0X3RvX3NjZW5lX3BvaW50KHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuRklHSFQsIFwicHJlZmFicy9oZXJvX2RlYXRoXCIsIE5vZGVQb29sSXRlbSwgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGdtLnVpLmZpZ2h0LmVmZmVjdF9ub2RlLmFkZENoaWxkKGUubm9kZSk7XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5oZXJvX2RlYXRoX2FycmF5LnB1c2goZSk7XHJcbiAgICAgICAgICAgICAgICBlLm5vZGUucG9zaXRpb24gPSBzY2VuZVBvaW50O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IEFuaW0gPSBlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKEFuaW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBBbmltLm9uY2UoY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuaGVyb19kZWF0aF9hcnJheS5pbmRleE9mKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAtIDEgPCB0ICYmIGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmhlcm9fZGVhdGhfYXJyYXkuc3BsaWNlKHQsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5wb29sLnB1dChBbmltLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlYXRoX2Ryb3Bfc291bChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBBbmltLnBsYXkoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZGVhdGhfZHJvcF9zb3VsKGhlcm9EYXRhOiBGaWdodEhlcm9JdGVtRGF0YSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGhlcm9Db25maWcgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiSGVyb0NvbmZpZ0RhdGFcIiwgaGVyb0RhdGEuaWQgKyBcIlwiKSBhcyBIZXJvQ29uZmlnO1xyXG4gICAgICAgIGlmIChoZXJvRGF0YSAmJiBoZXJvRGF0YS50eXBlID09IEhlcm9UeXBlLkFUVEFDSyAmJiBoZXJvQ29uZmlnICYmIDAgPCBoZXJvQ29uZmlnLnNvdWxzICYmIDAgPCBoZXJvQ29uZmlnLnF1YW50aXR5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJld2FyZERhdGEgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5nZXRfcmV3YXJkX2RhdGEoaGVyb0NvbmZpZy5zb3Vscyk7XHJcbiAgICAgICAgICAgIHJld2FyZERhdGEubnVtICs9IGhlcm9Db25maWcucXVhbnRpdHk7XHJcbiAgICAgICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5lbWl0KFwicGlja191cF9wcm9wXCIsIHJld2FyZERhdGEuaW5kZXgpO1xyXG4gICAgICAgICAgICBnbS5wb29sLmFzeW5jX2dldChCdW5kbGVOYW1lLk1BUCwgXCJwcmVmYWJzL2l0ZW0vXCIgKyBoZXJvQ29uZmlnLnNvdWxzLCBOb2RlUG9vbEl0ZW0sICh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXBJdGVtID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuZ2V0X2ZpZ2h0X21hcF9pdGVtKGhlcm9EYXRhLmdyaWRfcG9zaXRpb24ueCwgaGVyb0RhdGEuZ3JpZF9wb3NpdGlvbi55KTtcclxuXHJcbiAgICAgICAgICAgICAgICBtYXBJdGVtICYmIG1hcEl0ZW0ubGFuZF9ub2RlLmFkZENoaWxkKHQubm9kZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBBbmltID0gdC5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgICAgIEFuaW0gJiYgQW5pbS5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5maWdodC5mbHlfdG9fYm9hdCh0Lm5vZGUsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwbGF5X2F0dGFja19hdWRpbygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5fZGF0YTtcclxuICAgICAgICBjb25zdCBjb25maWdEYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkhlcm9Db25maWdEYXRhXCIsIGRhdGEuaWQgKyBcIlwiKSBhcyBIZXJvQ29uZmlnO1xyXG4gICAgICAgIGlmIChjb25maWdEYXRhICYmIFwiXCIgIT0gY29uZmlnRGF0YS5hdHRhY2tfYXVkaW8pIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BlZWQgPSBjYy5kaXJlY3Rvci5nZXRTY2hlZHVsZXIoKS5nZXRUaW1lU2NhbGUoKSA9PSBnbS5jb25zdC5GSUdIVF9TUEVFRF9YMiA/IFwiX3gyXCIgOiBcIlwiO1xyXG4gICAgICAgICAgICBnbS5hdWRpby5wbGF5X2VmZmVjdChjb25maWdEYXRhLmF0dGFja19hdWRpbyArIHNwZWVkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXlfc2tpbGxfYXVkaW8oKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuX2RhdGE7XHJcbiAgICAgICAgY29uc3QgY29uZmlnRGF0YSA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJIZXJvQ29uZmlnRGF0YVwiLCBkYXRhLmlkICsgXCJcIikgYXMgSGVyb0NvbmZpZztcclxuICAgICAgICBpZiAoY29uZmlnRGF0YSAmJiBcIlwiICE9IGNvbmZpZ0RhdGEuc2tpbGxfYXVkaW8pIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BlZWQgPSBjYy5kaXJlY3Rvci5nZXRTY2hlZHVsZXIoKS5nZXRUaW1lU2NhbGUoKSA9PSBnbS5jb25zdC5GSUdIVF9TUEVFRF9YMiA/IFwiX3gyXCIgOiBcIlwiO1xyXG4gICAgICAgICAgICBnbS5hdWRpby5wbGF5X2VmZmVjdChjb25maWdEYXRhLnNraWxsX2F1ZGlvICsgc3BlZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXlfc3BpbmVfYW5pbShcclxuICAgICAgICBhbmltYXRpb25OYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgcm90YXRpb25BbmdsZTogbnVtYmVyLFxyXG4gICAgICAgIGxvb3A6IGJvb2xlYW4gPSB0cnVlLFxyXG4gICAgICAgIGRlbGF5QmVmb3JlQ2FsbGJhY2sxOiBudW1iZXIgPSAwLFxyXG4gICAgICAgIGNhbGxiYWNrMTogKCgpID0+IHZvaWQpIHwgbnVsbCA9IG51bGwsXHJcbiAgICAgICAgZGVsYXlCZWZvcmVDYWxsYmFjazI6IG51bWJlciA9IDAsXHJcbiAgICAgICAgY2FsbGJhY2syOiAoKCkgPT4gdm9pZCkgfCBudWxsID0gbnVsbFxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NwaW5lKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJhZGlhbkFuZ2xlID0gKCh0aGlzLl9kYXRhLnJhZGlhbiA9IHJvdGF0aW9uQW5nbGUpICUgKDIgKiBNYXRoLlBJKSArIDIgKiBNYXRoLlBJKSAlICgyICogTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIGxldCBza2luRGlyZWN0aW9uID0gXCJcIjtcclxuICAgICAgICAgICAgbGV0IHNjYWxlWERpcmVjdGlvbiA9IDE7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlZ3JlZVRvUmFkaWFuID0gTWF0aC5QSSAvIDE4MFxyXG5cclxuICAgICAgICAgICAgaWYgKDE4ICogZGVncmVlVG9SYWRpYW4gPD0gcmFkaWFuQW5nbGUgJiYgcmFkaWFuQW5nbGUgPCAxMjAgKiBkZWdyZWVUb1JhZGlhbikge1xyXG4gICAgICAgICAgICAgICAgc2tpbkRpcmVjdGlvbiA9IFwiYmFja1wiO1xyXG4gICAgICAgICAgICAgICAgc2NhbGVYRGlyZWN0aW9uID0gLTE7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoMTIwICogZGVncmVlVG9SYWRpYW4gPD0gcmFkaWFuQW5nbGUgJiYgcmFkaWFuQW5nbGUgPCAxOTUgKiBkZWdyZWVUb1JhZGlhbikge1xyXG4gICAgICAgICAgICAgICAgc2tpbkRpcmVjdGlvbiA9IFwiYmFja1wiO1xyXG4gICAgICAgICAgICAgICAgc2NhbGVYRGlyZWN0aW9uID0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgxOTUgKiBkZWdyZWVUb1JhZGlhbiA8PSByYWRpYW5BbmdsZSAmJiByYWRpYW5BbmdsZSA8IDMwMCAqIGRlZ3JlZVRvUmFkaWFuKSB7XHJcbiAgICAgICAgICAgICAgICBza2luRGlyZWN0aW9uID0gXCJmcm9udFwiO1xyXG4gICAgICAgICAgICAgICAgc2NhbGVYRGlyZWN0aW9uID0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgzMDAgKiBkZWdyZWVUb1JhZGlhbiA8PSByYWRpYW5BbmdsZSAmJiByYWRpYW5BbmdsZSA8IDM2MCAqIGRlZ3JlZVRvUmFkaWFuIHx8IDAgPD0gcmFkaWFuQW5nbGUgJiYgcmFkaWFuQW5nbGUgPCAxOCAqIGRlZ3JlZVRvUmFkaWFuKSB7XHJcbiAgICAgICAgICAgICAgICBza2luRGlyZWN0aW9uID0gXCJmcm9udFwiO1xyXG4gICAgICAgICAgICAgICAgc2NhbGVYRGlyZWN0aW9uID0gLTE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyb3RhdGlvbkFuZ2xlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNraW5EaXJlY3Rpb24gIT0gdGhpcy5fc2tpbl9uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9za2luX25hbWUgPSBza2luRGlyZWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpbmUuc2V0U2tpbihza2luRGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbk5hbWUgPT0gdGhpcy5fYW5pbV9uYW1lICYmIGxvb3ApIHtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltX25hbWUgPSBhbmltYXRpb25OYW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFsb29wICYmIGNhbGxiYWNrMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgwIDwgZGVsYXlCZWZvcmVDYWxsYmFjazEgJiYgY2FsbGJhY2sxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrMSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGRlbGF5QmVmb3JlQ2FsbGJhY2sxKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihcInBsYXlfc3BpbmVfYW5pbSDlj4LmlbDplJnor69cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoMCA8IGRlbGF5QmVmb3JlQ2FsbGJhY2syICYmIGNhbGxiYWNrMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazIoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBkZWxheUJlZm9yZUNhbGxiYWNrMik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpbmVfdHJhY2sgJiYgKHRoaXMuX3NwaW5lX3RyYWNrLnRyYWNrVGltZSA9IDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpbmUuc2V0VG9TZXR1cFBvc2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NwaW5lX3RyYWNrID0gdGhpcy5fc3BpbmUuc2V0QW5pbWF0aW9uKDAsIGFuaW1hdGlvbk5hbWUsIGxvb3ApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc2NhbGVYRGlyZWN0aW9uICE9IHRoaXMuX3NwaW5lLm5vZGUuc2NhbGVYKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGluZS5ub2RlLnNjYWxlWCA9IHNjYWxlWERpcmVjdGlvbjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NwaW5lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGluZS50aW1lU2NhbGUgPSBjYy5kaXJlY3Rvci5nZXRTY2hlZHVsZXIoKS5nZXRUaW1lU2NhbGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHBsYXlfd2VhcG9uX2ZseV9hbmltKGF0dGFja1RhcmdldDogY2MuTm9kZSwgcm90YXRpb25BbmdsZTogbnVtYmVyLCBjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5fZGF0YTtcclxuICAgICAgICBpZiAodGhpcy5fZGF0YS50eXBlID09PSBIZXJvVHlwZS5BVFRBQ0spIHtcclxuICAgICAgICAgICAgZGF0YSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmhlcm9fZGF0YV9hcnJheVt0aGlzLl9kYXRhLmFycmF5X2luZGV4XTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2RhdGEudHlwZSA9PT0gSGVyb1R5cGUuREVGRU5TRSkge1xyXG4gICAgICAgICAgICBkYXRhID0gZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuZGVmZW5zZV9oZXJvX2RhdGFfYXJyYXlbdGhpcy5fZGF0YS5hcnJheV9pbmRleF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnbS5wb29sLmFzeW5jX2dldChCdW5kbGVOYW1lLkZJR0hULCBcInByZWZhYnMvc2tpbGxfaXRlbVwiLCBTa2lsbEl0ZW0sIChza2lsbCkgPT4ge1xyXG4gICAgICAgICAgICBnbS51aS5maWdodC5lZmZlY3Rfbm9kZS5hZGRDaGlsZChza2lsbC5ub2RlKTtcclxuICAgICAgICAgICAgZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuc2tpbGxfaXRlbV9hcnJheS5wdXNoKHNraWxsKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJhZGlhbkFuZ2xlID0gKHJvdGF0aW9uQW5nbGUgJSAoMiAqIE1hdGguUEkpICsgMiAqIE1hdGguUEkpICUgKDIgKiBNYXRoLlBJKTtcclxuICAgICAgICAgICAgbGV0IHN0YXJ0UG9zaXRpb24gPSBjYy52MygpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5mbHlfd2VhcG9uX3Bvc2l0aW9uX2FycmF5ICYmIDIgPT0gZGF0YS5mbHlfd2VhcG9uX3Bvc2l0aW9uX2FycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJhZGlhbkFuZ2xlID49IE1hdGguUEkgLyA0ICYmIHJhZGlhbkFuZ2xlIDwgMyAqIE1hdGguUEkgLyA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRQb3NpdGlvbiA9IGNjLnYzKC1kYXRhLmZseV93ZWFwb25fcG9zaXRpb25fYXJyYXlbMV0ueCwgZGF0YS5mbHlfd2VhcG9uX3Bvc2l0aW9uX2FycmF5WzFdLnkpLm11bFNlbGYodGhpcy5tb2RlbF9ub2RlLnNjYWxlKVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmFkaWFuQW5nbGUgPj0gMyAqIE1hdGguUEkgLyA0ICYmIHJhZGlhbkFuZ2xlIDwgNSAqIE1hdGguUEkgLyA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRQb3NpdGlvbiA9IGNjLnYzKGRhdGEuZmx5X3dlYXBvbl9wb3NpdGlvbl9hcnJheVsxXSkubXVsU2VsZih0aGlzLm1vZGVsX25vZGUuc2NhbGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmFkaWFuQW5nbGUgPj0gNSAqIE1hdGguUEkgLyA0ICYmIHJhZGlhbkFuZ2xlIDwgNyAqIE1hdGguUEkgLyA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRQb3NpdGlvbiA9IGNjLnYzKGRhdGEuZmx5X3dlYXBvbl9wb3NpdGlvbl9hcnJheVswXSkubXVsU2VsZih0aGlzLm1vZGVsX25vZGUuc2NhbGUpXHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyYWRpYW5BbmdsZSA+PSA3ICogTWF0aC5QSSAvIDQgJiYgcmFkaWFuQW5nbGUgPCAyICogTWF0aC5QSSB8fCAwIDw9IHJhZGlhbkFuZ2xlICYmIHJhZGlhbkFuZ2xlIDwgTWF0aC5QSSAvIDQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydFBvc2l0aW9uID0gY2MudjMoLWRhdGEuZmx5X3dlYXBvbl9wb3NpdGlvbl9hcnJheVswXS54LCBkYXRhLmZseV93ZWFwb25fcG9zaXRpb25fYXJyYXlbMF0ueSkubXVsU2VsZih0aGlzLm1vZGVsX25vZGUuc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNraWxsLnNldF9hdHRhY2tfdGFyZ2V0KHRoaXMsIHN0YXJ0UG9zaXRpb24sIGNjLnYzKDAsIDgwKSwgMSwgYXR0YWNrVGFyZ2V0LCBjYWxsYmFjayk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoXCLov5nph4zkuI3lupTor6Xlh7rnjrBmbHlfd2VhcG9uX3Bvc2l0aW9uX2FycmF55Li656m65oiW6ICF6ZW/5bqm5LiN5pivMlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwbGF5X3NraWxsX2ZseV9hbmltKHRhcmdldDogU2tpbGxDb25maWcsIGZseVR5cGU6IGNjLk5vZGUsIHJvdGF0aW9uQW5nbGU6IG51bWJlciwgY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuX2RhdGE7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RhdGEudHlwZSA9PT0gSGVyb1R5cGUuQVRUQUNLKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5oZXJvX2RhdGFfYXJyYXlbdGhpcy5fZGF0YS5hcnJheV9pbmRleF07XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9kYXRhLnR5cGUgPT09IEhlcm9UeXBlLkRFRkVOU0UpIHtcclxuICAgICAgICAgICAgZGF0YSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmRlZmVuc2VfaGVyb19kYXRhX2FycmF5W3RoaXMuX2RhdGEuYXJyYXlfaW5kZXhdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoQnVuZGxlTmFtZS5GSUdIVCwgXCJwcmVmYWJzL3NraWxsX2l0ZW1cIiwgU2tpbGxJdGVtLCAoc2tpbGwpID0+IHtcclxuICAgICAgICAgICAgZ20udWkuZmlnaHQuZWZmZWN0X25vZGUuYWRkQ2hpbGQoc2tpbGwubm9kZSk7XHJcbiAgICAgICAgICAgIGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLnNraWxsX2l0ZW1fYXJyYXkucHVzaChza2lsbCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCByYWRpYW5BbmdsZSA9IChyb3RhdGlvbkFuZ2xlICUgKDIgKiBNYXRoLlBJKSArIDIgKiBNYXRoLlBJKSAlICgyICogTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIGxldCBzdGFydFBvc2l0aW9uID0gY2MudjMoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmZseV93ZWFwb25fcG9zaXRpb25fYXJyYXkgJiYgMiA9PSBkYXRhLmZseV93ZWFwb25fcG9zaXRpb25fYXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmFkaWFuQW5nbGUgPj0gTWF0aC5QSSAvIDQgJiYgcmFkaWFuQW5nbGUgPCAzICogTWF0aC5QSSAvIDQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydFBvc2l0aW9uID0gY2MudjMoLWRhdGEuZmx5X3dlYXBvbl9wb3NpdGlvbl9hcnJheVsxXS54LCBkYXRhLmZseV93ZWFwb25fcG9zaXRpb25fYXJyYXlbMV0ueSkubXVsU2VsZih0aGlzLm1vZGVsX25vZGUuc2NhbGUpXHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyYWRpYW5BbmdsZSA+PSAzICogTWF0aC5QSSAvIDQgJiYgcmFkaWFuQW5nbGUgPCA1ICogTWF0aC5QSSAvIDQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydFBvc2l0aW9uID0gY2MudjMoZGF0YS5mbHlfd2VhcG9uX3Bvc2l0aW9uX2FycmF5WzFdKS5tdWxTZWxmKHRoaXMubW9kZWxfbm9kZS5zY2FsZSlcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJhZGlhbkFuZ2xlID49IDUgKiBNYXRoLlBJIC8gNCAmJiByYWRpYW5BbmdsZSA8IDcgKiBNYXRoLlBJIC8gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0UG9zaXRpb24gPSBjYy52MyhkYXRhLmZseV93ZWFwb25fcG9zaXRpb25fYXJyYXlbMF0pLm11bFNlbGYodGhpcy5tb2RlbF9ub2RlLnNjYWxlKVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmFkaWFuQW5nbGUgPj0gNyAqIE1hdGguUEkgLyA0ICYmIHJhZGlhbkFuZ2xlIDwgMiAqIE1hdGguUEkgfHwgMCA8PSByYWRpYW5BbmdsZSAmJiByYWRpYW5BbmdsZSA8IE1hdGguUEkgLyA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRQb3NpdGlvbiA9IGNjLnYzKC1kYXRhLmZseV93ZWFwb25fcG9zaXRpb25fYXJyYXlbMF0ueCwgZGF0YS5mbHlfd2VhcG9uX3Bvc2l0aW9uX2FycmF5WzBdLnkpLm11bFNlbGYodGhpcy5tb2RlbF9ub2RlLnNjYWxlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNraWxsLnNldF9mbHlfc2tpbGxfdGFyZ2V0KHRhcmdldCwgdGhpcywgc3RhcnRQb3NpdGlvbiwgY2MudjMoMCwgODApLCB0YXJnZXQuZmx5X3R5cGUsIGZseVR5cGUsIGNhbGxiYWNrKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYy5lcnJvcihcIui/memHjOS4jeW6lOivpeWHuueOsGZseV93ZWFwb25fcG9zaXRpb25fYXJyYXnkuLrnqbrmiJbogIXplb/luqbkuI3mmK8yXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwbGF5X3NraWxsX2FuaW0odGFyZ2V0OiBTa2lsbENvbmZpZywgZWZmZWN0UG9zaXRpb25ZOiBjYy5Ob2RlLCBhbmltYXRpb25UeXBlOiBudW1iZXIsIGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZGF0YTtcclxuICAgICAgICBpZiAodGhpcy5fZGF0YS50eXBlID09PSBIZXJvVHlwZS5BVFRBQ0spIHtcclxuICAgICAgICAgICAgZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuaGVyb19kYXRhX2FycmF5W3RoaXMuX2RhdGEuYXJyYXlfaW5kZXhdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZGF0YS50eXBlID09PSBIZXJvVHlwZS5ERUZFTlNFKSB7XHJcbiAgICAgICAgICAgIGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmRlZmVuc2VfaGVyb19kYXRhX2FycmF5W3RoaXMuX2RhdGEuYXJyYXlfaW5kZXhdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoQnVuZGxlTmFtZS5GSUdIVCwgXCJwcmVmYWJzL3NraWxsX2l0ZW1cIiwgU2tpbGxJdGVtLCAoc2tpbGwpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHNraWxsLm5vZGUpO1xyXG4gICAgICAgICAgICBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5za2lsbF9pdGVtX2FycmF5LnB1c2goc2tpbGwpO1xyXG4gICAgICAgICAgICBza2lsbC5zZXRfc2tpbGxfdGFyZ2V0KHRhcmdldCwgdGhpcywgY2MudjMoMCwgODApLCBlZmZlY3RQb3NpdGlvblksIGNhbGxiYWNrKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIl19