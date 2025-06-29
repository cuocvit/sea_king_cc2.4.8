"use strict";
cc._RF.push(module, 'ef51a8fi/dKRolLS4/fUq7K', 'SkillItem');
// fight/scripts/SkillItem.ts

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
exports.SkillItem = exports.SkillItemData = void 0;
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var Constants_1 = require("../../start-scene/scripts/Constants");
var FightConstants_1 = require("../../start-scene/scripts/FightConstants");
var ParabolaPath_1 = require("../../start-scene/scripts/ParabolaPath");
var ccclass = cc._decorator.ccclass;
var SkillItemData = /** @class */ (function () {
    function SkillItemData() {
        this.id = 0;
        this.type = 0;
        this.skill_damage = 0;
        this.move_speed = 100;
    }
    return SkillItemData;
}());
exports.SkillItemData = SkillItemData;
var SkillItem = /** @class */ (function (_super) {
    __extends(SkillItem, _super);
    function SkillItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._data = null;
        _this._is_move = false;
        _this._hero_item = null;
        _this._offset = null;
        _this._end_offset = null;
        _this._target_node = null;
        _this._speed = 0;
        _this._skill_node = null;
        _this._is_fly_rotate = 0;
        _this._callback = null;
        _this._fly_callback = null;
        _this._move_type = 0;
        _this._path = null;
        return _this;
    }
    Object.defineProperty(SkillItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: false,
        configurable: true
    });
    SkillItem.prototype.reset = function () {
        this._data = null;
        this._is_move = false;
        this._hero_item = null;
        this._offset = null;
        this._end_offset = null;
        this._target_node = null;
        this._speed = 0;
        this._skill_node = null;
        this._is_fly_rotate = 0;
        this._callback = null;
        this._fly_callback = null;
        GameManager_1.gm.pool.put_children(this.node);
        var skillItemArray = GameManager_1.gm.data.fight_temp_data.skill_item_array;
        var index = skillItemArray.indexOf(this);
        if (-1 < index) {
            var e = skillItemArray.splice(index, 1)[0];
            GameManager_1.gm.pool.put(e.node);
        }
    };
    SkillItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.reset();
    };
    SkillItem.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    SkillItem.prototype.update = function (deltaTime) {
        if (this._is_move) {
            if (this._move_type == 0) {
                var startPoint = GameManager_1.gm.ui.fight.convert_to_scene_point(this._hero_item.node, this._offset);
                var endPoint = GameManager_1.gm.ui.fight.convert_to_scene_point(this._target_node, this._end_offset);
                var direction = endPoint.sub(startPoint);
                var angle = Math.atan2(direction.y, direction.x) / Math.PI * 180;
                this._skill_node.angle = 0 < this._is_fly_rotate ? angle : 0;
                var currentPosition = this._skill_node.position.add(direction.normalize().mulSelf(deltaTime * this._speed * cc.director.getScheduler().getTimeScale()));
                if (currentPosition.sub(startPoint).mag() > direction.mag()) {
                    this._skill_node.position = endPoint;
                    this._is_move = false;
                    if (this._fly_callback) {
                        this._fly_callback();
                    }
                }
                else {
                    this._skill_node.position = currentPosition;
                }
            }
            else if (this._move_type == 1) {
                if (this._path.time < this._path.totalTime) {
                    var speedFactor = cc.director.getScheduler().getTimeScale() == GameManager_1.gm.const.FIGHT_SPEED_X2 ? 60 : 20;
                    this._path.time += deltaTime * speedFactor;
                    this._skill_node.position = this._path.position;
                    var direction = this._path.getPosition(this._path.time + deltaTime).sub(this._skill_node.position);
                    this._skill_node.angle = 180 * Math.atan2(direction.y, direction.x) / Math.PI;
                }
                else {
                    this._skill_node.position = this._path.end;
                    this._is_move = false;
                    if (this._fly_callback) {
                        this._fly_callback();
                    }
                }
            }
        }
    };
    SkillItem.prototype.set_attack_target = function (heroItem, offset, endOffset, targetNode, skillType, callback) {
        var _this = this;
        if (cc.isValid(skillType)) {
            var skillData = heroItem.data;
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + skillData.fly_weapon_name, NodePoolItem_1.NodePoolItem, function (t) {
                _this.node.addChild(t.node);
                _this._is_move = true;
                _this._move_type = targetNode;
                if (targetNode == 0) {
                    var startPoint = GameManager_1.gm.ui.fight.convert_to_scene_point(heroItem.node, offset);
                    var scenePoint = GameManager_1.gm.ui.fight.convert_to_scene_point(skillType, endOffset);
                    var endPoint = scenePoint.sub(startPoint);
                    var angle = Math.atan2(endPoint.y, endPoint.x) / Math.PI * 180;
                    _this.node.position = startPoint;
                    _this.node.angle = angle;
                    _this._hero_item = heroItem;
                    _this._offset = offset;
                    _this._end_offset = endOffset;
                    _this._target_node = skillType;
                    _this._speed = FightConstants_1.FightConstants.FLY_WEAPON_SPEED;
                    _this._skill_node = _this.node;
                    _this._callback = callback;
                    _this._fly_callback = function () {
                        _this._callback();
                        _this.put_to_pool();
                    };
                }
                else if (targetNode == 1) {
                    var startPoint = GameManager_1.gm.ui.fight.convert_to_effect_point(heroItem.node, offset);
                    var scenePoint = GameManager_1.gm.ui.fight.convert_to_effect_point(skillType, endOffset);
                    _this.node.position = startPoint;
                    _this._skill_node = _this.node;
                    _this._offset = offset, _this._end_offset = endOffset;
                    _this._path = new ParabolaPath_1.ParabolaPath(startPoint, scenePoint, 16, -9.8);
                    _this._path.isClampStartEnd = true;
                    var endPoint = _this._path.getPosition(_this._path.time + 1).sub(_this._skill_node.position);
                    _this._skill_node.angle = 180 * Math.atan2(endPoint.y, endPoint.x) / Math.PI;
                    _this._callback = callback;
                    _this._fly_callback = function () {
                        _this._callback();
                        _this.put_to_pool();
                    };
                }
            });
        }
    };
    SkillItem.prototype.set_fly_skill_target = function (skill, heroItem, offset, endOffset, targetNode, skillType, callback) {
        var _this = this;
        if (cc.isValid(skillType)) {
            heroItem.data;
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + skill.skill_name, NodePoolItem_1.NodePoolItem, function (t) {
                _this.node.addChild(t.node);
                _this._is_move = true;
                _this._move_type = targetNode;
                if (targetNode == 0) {
                    var startPoint = GameManager_1.gm.ui.fight.convert_to_scene_point(heroItem.node, offset);
                    var scenePoint = GameManager_1.gm.ui.fight.convert_to_scene_point(skillType, endOffset);
                    var endPoint = scenePoint.sub(startPoint);
                    var angle = Math.atan2(endPoint.y, endPoint.x) / Math.PI * 180;
                    _this.node.angle = 0 < skill.is_fly_rotate ? angle : 0;
                    _this.node.position = startPoint;
                    _this._hero_item = heroItem;
                    _this._offset = offset;
                    _this._end_offset = endOffset;
                    _this._target_node = skillType;
                    _this._speed = FightConstants_1.FightConstants.FLY_WEAPON_SPEED;
                    _this._skill_node = _this.node;
                    _this._is_fly_rotate = skill.is_fly_rotate;
                    _this._callback = callback;
                    _this._fly_callback = function () {
                        _this._callback();
                        _this.put_to_pool();
                    };
                }
                else if (targetNode == 1) {
                    var startPoint = GameManager_1.gm.ui.fight.convert_to_effect_point(heroItem.node, offset);
                    var effectPoint = GameManager_1.gm.ui.fight.convert_to_effect_point(skillType, endOffset);
                    _this.node.position = startPoint;
                    _this._skill_node = _this.node;
                    _this._offset = offset;
                    _this._end_offset = endOffset;
                    _this._path = new ParabolaPath_1.ParabolaPath(startPoint, effectPoint, 16, -9.8);
                    _this._path.isClampStartEnd = true;
                    var endPoint = _this._path.getPosition(_this._path.time + 1).sub(_this._skill_node.position);
                    _this._skill_node.angle = 180 * Math.atan2(endPoint.y, endPoint.x) / Math.PI;
                    _this._callback = callback;
                    _this._fly_callback = function () {
                        _this._callback();
                        _this.put_to_pool();
                    };
                }
            });
        }
    };
    SkillItem.prototype.set_skill_target = function (skill, targetNode, offset, endOffset, callback) {
        var _this = this;
        GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + skill.skill_name, NodePoolItem_1.NodePoolItem, function (t) {
            _this.node.addChild(t.node);
            _this.scheduleOnce(function () {
                callback();
                _this.put_to_pool();
            }, skill.hit_time);
        });
    };
    SkillItem.prototype.set_building_attack_target = function (building, offset, endOffset, targetNode, skillType, callback) {
        var _this = this;
        if (cc.isValid(skillType)) {
            var data = building.data;
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + data.fly_weapon_name, NodePoolItem_1.NodePoolItem, function (t) {
                _this.node.addChild(t.node);
                _this._is_move = true;
                _this._move_type = targetNode;
                if (targetNode == 0) {
                    var startPoint = GameManager_1.gm.ui.fight.convert_to_scene_point(building.node, offset);
                    var endPoint = GameManager_1.gm.ui.fight.convert_to_scene_point(skillType).sub(startPoint);
                    var angle = Math.atan2(endPoint.y, endPoint.x) / Math.PI * 180;
                    _this.node.position = startPoint;
                    _this.node.angle = angle;
                    _this._hero_item = building;
                    _this._offset = offset;
                    _this._move_type = 0;
                    _this._end_offset = cc.Vec3.ZERO;
                    _this._target_node = skillType;
                    _this._speed = FightConstants_1.FightConstants.FLY_WEAPON_SPEED;
                    _this._skill_node = _this.node;
                    _this._callback = callback;
                    _this._fly_callback = function () {
                        _this._callback();
                        _this.put_to_pool();
                    };
                }
                else if (targetNode == 1) {
                    var startPoint = GameManager_1.gm.ui.fight.convert_to_effect_point(building.node, offset);
                    var endPoint = GameManager_1.gm.ui.fight.convert_to_effect_point(skillType, endOffset);
                    _this.node.position = startPoint;
                    _this._skill_node = _this.node;
                    _this._offset = offset;
                    _this._end_offset = endOffset;
                    _this._path = new ParabolaPath_1.ParabolaPath(startPoint, endPoint, 16, -9.8);
                    _this._path.isClampStartEnd = true;
                    var positiom = _this._path.getPosition(_this._path.time + 1).sub(_this._skill_node.position);
                    _this._skill_node.angle = 180 * Math.atan2(positiom.y, positiom.x) / Math.PI;
                    _this._callback = callback;
                    _this._fly_callback = function () {
                        _this._callback();
                        _this.put_to_pool();
                    };
                }
            });
        }
    };
    SkillItem.prototype.put_to_pool = function () {
        this.reset();
    };
    SkillItem = __decorate([
        ccclass
    ], SkillItem);
    return SkillItem;
}(NodePoolItem_1.NodePoolItem));
exports.SkillItem = SkillItem;

cc._RF.pop();