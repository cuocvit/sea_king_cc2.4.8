"use strict";
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