
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/fight/scripts/SkillItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZmlnaHRcXHNjcmlwdHNcXFNraWxsSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUVBQXNFO0FBQ3RFLHFFQUEyRDtBQUMzRCxpRUFBaUU7QUFDakUsMkVBQTBFO0FBQzFFLHVFQUFzRTtBQU05RCxJQUFBLE9BQU8sR0FBSyxFQUFFLENBQUMsVUFBVSxRQUFsQixDQUFtQjtBQUVsQztJQU1FO1FBQ0UsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO0lBQ3hCLENBQUM7SUFDSCxvQkFBQztBQUFELENBWkEsQUFZQyxJQUFBO0FBWlksc0NBQWE7QUFnQjFCO0lBQStCLDZCQUFZO0lBQTNDO1FBQUEscUVBcVFDO1FBcFFTLFdBQUssR0FBeUIsSUFBSSxDQUFDO1FBQ25DLGNBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsZ0JBQVUsR0FBNkQsSUFBSSxDQUFDO1FBQzVFLGFBQU8sR0FBbUIsSUFBSSxDQUFDO1FBQy9CLGlCQUFXLEdBQW1CLElBQUksQ0FBQztRQUNuQyxrQkFBWSxHQUFtQixJQUFJLENBQUM7UUFDcEMsWUFBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixpQkFBVyxHQUFtQixJQUFJLENBQUM7UUFDbkMsb0JBQWMsR0FBVyxDQUFDLENBQUM7UUFDM0IsZUFBUyxHQUF3QixJQUFJLENBQUM7UUFDdEMsbUJBQWEsR0FBd0IsSUFBSSxDQUFDO1FBQzFDLGdCQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLFdBQUssR0FBd0IsSUFBSSxDQUFDOztJQXdQNUMsQ0FBQztJQXRQQyxzQkFBSSwyQkFBSTthQUFSO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FB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Q0FBQztvQkFDOUQsS0FBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO29CQUNsQyxJQUFNLFFBQVEsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDNUYsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztvQkFDNUUsS0FBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7b0JBQzFCLEtBQUksQ0FBQyxhQUFhLEdBQUc7d0JBQ25CLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzt3QkFDakIsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNyQixDQUFDLENBQUE7aUJBQ0Y7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVNLCtCQUFXLEdBQWxCO1FBQ0UsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQXBRVSxTQUFTO1FBRHJCLE9BQU87T0FDSyxTQUFTLENBcVFyQjtJQUFELGdCQUFDO0NBclFELEFBcVFDLENBclE4QiwyQkFBWSxHQXFRMUM7QUFyUVksOEJBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOb2RlUG9vbEl0ZW0gfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL05vZGVQb29sSXRlbSc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IEJ1bmRsZU5hbWUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IEZpZ2h0Q29uc3RhbnRzIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9GaWdodENvbnN0YW50cyc7XHJcbmltcG9ydCB7IFBhcmFib2xhUGF0aCB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvUGFyYWJvbGFQYXRoJztcclxuaW1wb3J0IHsgU2tpbGxDb25maWcgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9za2lsbCc7XHJcbmltcG9ydCB7IEZpZ2h0SGVyb0l0ZW0gfSBmcm9tICcuL0ZpZ2h0SGVyb0l0ZW0nO1xyXG5pbXBvcnQgeyBGaWdodEJ1aWxkaW5nSXRlbSB9IGZyb20gJy4vRmlnaHRCdWlsZGluZ0l0ZW0nO1xyXG5pbXBvcnQgeyBGaWdodFdhbGxJdGVtIH0gZnJvbSAnLi9GaWdodFdhbGxJdGVtJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcyB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTa2lsbEl0ZW1EYXRhIHtcclxuICBwdWJsaWMgaWQ6IG51bWJlcjtcclxuICBwdWJsaWMgdHlwZTogbnVtYmVyO1xyXG4gIHB1YmxpYyBza2lsbF9kYW1hZ2U6IG51bWJlcjtcclxuICBwdWJsaWMgbW92ZV9zcGVlZDogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuaWQgPSAwO1xyXG4gICAgdGhpcy50eXBlID0gMDtcclxuICAgIHRoaXMuc2tpbGxfZGFtYWdlID0gMDtcclxuICAgIHRoaXMubW92ZV9zcGVlZCA9IDEwMDtcclxuICB9XHJcbn1cclxuXHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgU2tpbGxJdGVtIGV4dGVuZHMgTm9kZVBvb2xJdGVtIHtcclxuICBwcml2YXRlIF9kYXRhOiBTa2lsbEl0ZW1EYXRhIHwgbnVsbCA9IG51bGw7XHJcbiAgcHJpdmF0ZSBfaXNfbW92ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX2hlcm9faXRlbTogRmlnaHRXYWxsSXRlbSB8IG51bGwgfCBGaWdodEJ1aWxkaW5nSXRlbSB8IEZpZ2h0SGVyb0l0ZW0gPSBudWxsO1xyXG4gIHByaXZhdGUgX29mZnNldDogY2MuVmVjMyB8IG51bGwgPSBudWxsO1xyXG4gIHByaXZhdGUgX2VuZF9vZmZzZXQ6IGNjLlZlYzMgfCBudWxsID0gbnVsbDtcclxuICBwcml2YXRlIF90YXJnZXRfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG4gIHByaXZhdGUgX3NwZWVkOiBudW1iZXIgPSAwO1xyXG4gIHByaXZhdGUgX3NraWxsX25vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuICBwcml2YXRlIF9pc19mbHlfcm90YXRlOiBudW1iZXIgPSAwO1xyXG4gIHByaXZhdGUgX2NhbGxiYWNrOiAoKCkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcclxuICBwcml2YXRlIF9mbHlfY2FsbGJhY2s6ICgoKSA9PiB2b2lkKSB8IG51bGwgPSBudWxsO1xyXG4gIHByaXZhdGUgX21vdmVfdHlwZTogbnVtYmVyID0gMDtcclxuICBwcml2YXRlIF9wYXRoOiBQYXJhYm9sYVBhdGggfCBudWxsID0gbnVsbDtcclxuXHJcbiAgZ2V0IGRhdGEoKTogU2tpbGxJdGVtRGF0YSB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgfVxyXG5cclxuICBzZXQgZGF0YSh2YWx1ZTogU2tpbGxJdGVtRGF0YSB8IG51bGwpIHtcclxuICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgIHRoaXMuX2RhdGEgPSBudWxsO1xyXG4gICAgdGhpcy5faXNfbW92ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5faGVyb19pdGVtID0gbnVsbDtcclxuICAgIHRoaXMuX29mZnNldCA9IG51bGw7XHJcbiAgICB0aGlzLl9lbmRfb2Zmc2V0ID0gbnVsbDtcclxuICAgIHRoaXMuX3RhcmdldF9ub2RlID0gbnVsbDtcclxuICAgIHRoaXMuX3NwZWVkID0gMDtcclxuICAgIHRoaXMuX3NraWxsX25vZGUgPSBudWxsO1xyXG4gICAgdGhpcy5faXNfZmx5X3JvdGF0ZSA9IDA7XHJcbiAgICB0aGlzLl9jYWxsYmFjayA9IG51bGw7XHJcbiAgICB0aGlzLl9mbHlfY2FsbGJhY2sgPSBudWxsO1xyXG4gICAgZ20ucG9vbC5wdXRfY2hpbGRyZW4odGhpcy5ub2RlKTtcclxuXHJcbiAgICBjb25zdCBza2lsbEl0ZW1BcnJheSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLnNraWxsX2l0ZW1fYXJyYXk7XHJcbiAgICBsZXQgaW5kZXggPSBza2lsbEl0ZW1BcnJheS5pbmRleE9mKHRoaXMpO1xyXG4gICAgaWYgKC0gMSA8IGluZGV4KSB7XHJcbiAgICAgIGNvbnN0IGUgPSBza2lsbEl0ZW1BcnJheS5zcGxpY2UoaW5kZXgsIDEpWzBdO1xyXG4gICAgICBnbS5wb29sLnB1dChlLm5vZGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHVudXNlKCk6IHZvaWQge1xyXG4gICAgc3VwZXIudW51c2UoKTtcclxuICAgIHRoaXMucmVzZXQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXVzZSgpOiB2b2lkIHtcclxuICAgIHN1cGVyLnJldXNlKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlKGRlbHRhVGltZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5faXNfbW92ZSkge1xyXG4gICAgICBpZiAodGhpcy5fbW92ZV90eXBlID09IDApIHtcclxuICAgICAgICBjb25zdCBzdGFydFBvaW50ID0gZ20udWkuZmlnaHQuY29udmVydF90b19zY2VuZV9wb2ludCh0aGlzLl9oZXJvX2l0ZW0ubm9kZSwgdGhpcy5fb2Zmc2V0KTtcclxuICAgICAgICBjb25zdCBlbmRQb2ludCA9IGdtLnVpLmZpZ2h0LmNvbnZlcnRfdG9fc2NlbmVfcG9pbnQodGhpcy5fdGFyZ2V0X25vZGUsIHRoaXMuX2VuZF9vZmZzZXQpO1xyXG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IGVuZFBvaW50LnN1YihzdGFydFBvaW50KTtcclxuICAgICAgICBsZXQgYW5nbGUgPSBNYXRoLmF0YW4yKGRpcmVjdGlvbi55LCBkaXJlY3Rpb24ueCkgLyBNYXRoLlBJICogMTgwO1xyXG4gICAgICAgIHRoaXMuX3NraWxsX25vZGUuYW5nbGUgPSAwIDwgdGhpcy5faXNfZmx5X3JvdGF0ZSA/IGFuZ2xlIDogMDtcclxuICAgICAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSB0aGlzLl9za2lsbF9ub2RlLnBvc2l0aW9uLmFkZChkaXJlY3Rpb24ubm9ybWFsaXplKCkubXVsU2VsZihkZWx0YVRpbWUgKiB0aGlzLl9zcGVlZCAqIGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpLmdldFRpbWVTY2FsZSgpKSk7XHJcblxyXG4gICAgICAgIGlmIChjdXJyZW50UG9zaXRpb24uc3ViKHN0YXJ0UG9pbnQpLm1hZygpID4gZGlyZWN0aW9uLm1hZygpKSB7XHJcbiAgICAgICAgICB0aGlzLl9za2lsbF9ub2RlLnBvc2l0aW9uID0gZW5kUG9pbnQ7XHJcbiAgICAgICAgICB0aGlzLl9pc19tb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgICBpZiAodGhpcy5fZmx5X2NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZseV9jYWxsYmFjaygpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLl9za2lsbF9ub2RlLnBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fbW92ZV90eXBlID09IDEpIHtcclxuICAgICAgICBpZiAodGhpcy5fcGF0aC50aW1lIDwgdGhpcy5fcGF0aC50b3RhbFRpbWUpIHtcclxuICAgICAgICAgIGNvbnN0IHNwZWVkRmFjdG9yID0gY2MuZGlyZWN0b3IuZ2V0U2NoZWR1bGVyKCkuZ2V0VGltZVNjYWxlKCkgPT0gZ20uY29uc3QuRklHSFRfU1BFRURfWDIgPyA2MCA6IDIwO1xyXG4gICAgICAgICAgdGhpcy5fcGF0aC50aW1lICs9IGRlbHRhVGltZSAqIHNwZWVkRmFjdG9yO1xyXG4gICAgICAgICAgdGhpcy5fc2tpbGxfbm9kZS5wb3NpdGlvbiA9IHRoaXMuX3BhdGgucG9zaXRpb247XHJcbiAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSB0aGlzLl9wYXRoLmdldFBvc2l0aW9uKHRoaXMuX3BhdGgudGltZSArIGRlbHRhVGltZSkuc3ViKHRoaXMuX3NraWxsX25vZGUucG9zaXRpb24pO1xyXG4gICAgICAgICAgdGhpcy5fc2tpbGxfbm9kZS5hbmdsZSA9IDE4MCAqIE1hdGguYXRhbjIoZGlyZWN0aW9uLnksIGRpcmVjdGlvbi54KSAvIE1hdGguUEk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLl9za2lsbF9ub2RlLnBvc2l0aW9uID0gdGhpcy5fcGF0aC5lbmQ7XHJcbiAgICAgICAgICB0aGlzLl9pc19tb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgICBpZiAodGhpcy5fZmx5X2NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZseV9jYWxsYmFjaygpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldF9hdHRhY2tfdGFyZ2V0KGhlcm9JdGVtOiBGaWdodEhlcm9JdGVtLCBvZmZzZXQ6IGNjLlZlYzMsIGVuZE9mZnNldDogY2MuVmVjMywgdGFyZ2V0Tm9kZTogbnVtYmVyLCBza2lsbFR5cGU6IGNjLk5vZGUsIGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcblxyXG4gICAgaWYgKGNjLmlzVmFsaWQoc2tpbGxUeXBlKSkge1xyXG4gICAgICBjb25zdCBza2lsbERhdGEgPSBoZXJvSXRlbS5kYXRhO1xyXG4gICAgICBnbS5wb29sLmFzeW5jX2dldChCdW5kbGVOYW1lLkNPTU1PTiwgXCJwcmVmYWJzL21vZGVsL1wiICsgc2tpbGxEYXRhLmZseV93ZWFwb25fbmFtZSwgTm9kZVBvb2xJdGVtLCAodCkgPT4ge1xyXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0Lm5vZGUpO1xyXG4gICAgICAgIHRoaXMuX2lzX21vdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX21vdmVfdHlwZSA9IHRhcmdldE5vZGU7XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXROb2RlID09IDApIHtcclxuICAgICAgICAgIGNvbnN0IHN0YXJ0UG9pbnQgPSBnbS51aS5maWdodC5jb252ZXJ0X3RvX3NjZW5lX3BvaW50KGhlcm9JdGVtLm5vZGUsIG9mZnNldCk7XHJcbiAgICAgICAgICBjb25zdCBzY2VuZVBvaW50ID0gZ20udWkuZmlnaHQuY29udmVydF90b19zY2VuZV9wb2ludChza2lsbFR5cGUsIGVuZE9mZnNldCk7XHJcbiAgICAgICAgICBjb25zdCBlbmRQb2ludCA9IHNjZW5lUG9pbnQuc3ViKHN0YXJ0UG9pbnQpO1xyXG4gICAgICAgICAgY29uc3QgYW5nbGUgPSBNYXRoLmF0YW4yKGVuZFBvaW50LnksIGVuZFBvaW50LngpIC8gTWF0aC5QSSAqIDE4MDtcclxuXHJcbiAgICAgICAgICB0aGlzLm5vZGUucG9zaXRpb24gPSBzdGFydFBvaW50O1xyXG4gICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gYW5nbGU7XHJcbiAgICAgICAgICB0aGlzLl9oZXJvX2l0ZW0gPSBoZXJvSXRlbTtcclxuICAgICAgICAgIHRoaXMuX29mZnNldCA9IG9mZnNldDtcclxuICAgICAgICAgIHRoaXMuX2VuZF9vZmZzZXQgPSBlbmRPZmZzZXQ7XHJcbiAgICAgICAgICB0aGlzLl90YXJnZXRfbm9kZSA9IHNraWxsVHlwZTtcclxuICAgICAgICAgIHRoaXMuX3NwZWVkID0gRmlnaHRDb25zdGFudHMuRkxZX1dFQVBPTl9TUEVFRDtcclxuICAgICAgICAgIHRoaXMuX3NraWxsX25vZGUgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgICB0aGlzLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgICAgdGhpcy5fZmx5X2NhbGxiYWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB0aGlzLnB1dF90b19wb29sKCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0Tm9kZSA9PSAxKSB7XHJcbiAgICAgICAgICBjb25zdCBzdGFydFBvaW50ID0gZ20udWkuZmlnaHQuY29udmVydF90b19lZmZlY3RfcG9pbnQoaGVyb0l0ZW0ubm9kZSwgb2Zmc2V0KTtcclxuICAgICAgICAgIGNvbnN0IHNjZW5lUG9pbnQgPSBnbS51aS5maWdodC5jb252ZXJ0X3RvX2VmZmVjdF9wb2ludChza2lsbFR5cGUsIGVuZE9mZnNldCk7XHJcbiAgICAgICAgICB0aGlzLm5vZGUucG9zaXRpb24gPSBzdGFydFBvaW50O1xyXG4gICAgICAgICAgdGhpcy5fc2tpbGxfbm9kZSA9IHRoaXMubm9kZTtcclxuICAgICAgICAgIHRoaXMuX29mZnNldCA9IG9mZnNldCwgdGhpcy5fZW5kX29mZnNldCA9IGVuZE9mZnNldDtcclxuICAgICAgICAgIHRoaXMuX3BhdGggPSBuZXcgUGFyYWJvbGFQYXRoKHN0YXJ0UG9pbnQsIHNjZW5lUG9pbnQsIDE2LCAtOS44KTtcclxuICAgICAgICAgIHRoaXMuX3BhdGguaXNDbGFtcFN0YXJ0RW5kID0gdHJ1ZTtcclxuICAgICAgICAgIGNvbnN0IGVuZFBvaW50ID0gdGhpcy5fcGF0aC5nZXRQb3NpdGlvbih0aGlzLl9wYXRoLnRpbWUgKyAxKS5zdWIodGhpcy5fc2tpbGxfbm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICB0aGlzLl9za2lsbF9ub2RlLmFuZ2xlID0gMTgwICogTWF0aC5hdGFuMihlbmRQb2ludC55LCBlbmRQb2ludC54KSAvIE1hdGguUEk7XHJcbiAgICAgICAgICB0aGlzLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgICAgdGhpcy5fZmx5X2NhbGxiYWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB0aGlzLnB1dF90b19wb29sKCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRfZmx5X3NraWxsX3RhcmdldChza2lsbDogU2tpbGxDb25maWcsIGhlcm9JdGVtOiBGaWdodEhlcm9JdGVtLCBvZmZzZXQ6IGNjLlZlYzMsIGVuZE9mZnNldDogY2MuVmVjMywgdGFyZ2V0Tm9kZTogbnVtYmVyLCBza2lsbFR5cGU6IGNjLk5vZGUsIGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcblxyXG4gICAgaWYgKGNjLmlzVmFsaWQoc2tpbGxUeXBlKSkge1xyXG4gICAgICBoZXJvSXRlbS5kYXRhO1xyXG4gICAgICBnbS5wb29sLmFzeW5jX2dldChCdW5kbGVOYW1lLkNPTU1PTiwgXCJwcmVmYWJzL21vZGVsL1wiICsgc2tpbGwuc2tpbGxfbmFtZSwgTm9kZVBvb2xJdGVtLCAodCkgPT4ge1xyXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0Lm5vZGUpO1xyXG4gICAgICAgIHRoaXMuX2lzX21vdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX21vdmVfdHlwZSA9IHRhcmdldE5vZGU7XHJcbiAgICAgICAgaWYgKHRhcmdldE5vZGUgPT0gMCkge1xyXG4gICAgICAgICAgY29uc3Qgc3RhcnRQb2ludCA9IGdtLnVpLmZpZ2h0LmNvbnZlcnRfdG9fc2NlbmVfcG9pbnQoaGVyb0l0ZW0ubm9kZSwgb2Zmc2V0KTtcclxuICAgICAgICAgIGNvbnN0IHNjZW5lUG9pbnQgPSBnbS51aS5maWdodC5jb252ZXJ0X3RvX3NjZW5lX3BvaW50KHNraWxsVHlwZSwgZW5kT2Zmc2V0KTtcclxuICAgICAgICAgIGNvbnN0IGVuZFBvaW50ID0gc2NlbmVQb2ludC5zdWIoc3RhcnRQb2ludCk7XHJcbiAgICAgICAgICBjb25zdCBhbmdsZSA9IE1hdGguYXRhbjIoZW5kUG9pbnQueSwgZW5kUG9pbnQueCkgLyBNYXRoLlBJICogMTgwO1xyXG5cclxuICAgICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IDAgPCBza2lsbC5pc19mbHlfcm90YXRlID8gYW5nbGUgOiAwO1xyXG4gICAgICAgICAgdGhpcy5ub2RlLnBvc2l0aW9uID0gc3RhcnRQb2ludDtcclxuICAgICAgICAgIHRoaXMuX2hlcm9faXRlbSA9IGhlcm9JdGVtO1xyXG4gICAgICAgICAgdGhpcy5fb2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICAgICAgdGhpcy5fZW5kX29mZnNldCA9IGVuZE9mZnNldDtcclxuICAgICAgICAgIHRoaXMuX3RhcmdldF9ub2RlID0gc2tpbGxUeXBlO1xyXG4gICAgICAgICAgdGhpcy5fc3BlZWQgPSBGaWdodENvbnN0YW50cy5GTFlfV0VBUE9OX1NQRUVEO1xyXG4gICAgICAgICAgdGhpcy5fc2tpbGxfbm9kZSA9IHRoaXMubm9kZTtcclxuICAgICAgICAgIHRoaXMuX2lzX2ZseV9yb3RhdGUgPSBza2lsbC5pc19mbHlfcm90YXRlO1xyXG4gICAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICAgIHRoaXMuX2ZseV9jYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgdGhpcy5wdXRfdG9fcG9vbCgpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldE5vZGUgPT0gMSkge1xyXG4gICAgICAgICAgY29uc3Qgc3RhcnRQb2ludCA9IGdtLnVpLmZpZ2h0LmNvbnZlcnRfdG9fZWZmZWN0X3BvaW50KGhlcm9JdGVtLm5vZGUsIG9mZnNldCk7XHJcbiAgICAgICAgICBjb25zdCBlZmZlY3RQb2ludCA9IGdtLnVpLmZpZ2h0LmNvbnZlcnRfdG9fZWZmZWN0X3BvaW50KHNraWxsVHlwZSwgZW5kT2Zmc2V0KTtcclxuXHJcbiAgICAgICAgICB0aGlzLm5vZGUucG9zaXRpb24gPSBzdGFydFBvaW50O1xyXG4gICAgICAgICAgdGhpcy5fc2tpbGxfbm9kZSA9IHRoaXMubm9kZTtcclxuICAgICAgICAgIHRoaXMuX29mZnNldCA9IG9mZnNldDtcclxuICAgICAgICAgIHRoaXMuX2VuZF9vZmZzZXQgPSBlbmRPZmZzZXQ7XHJcbiAgICAgICAgICB0aGlzLl9wYXRoID0gbmV3IFBhcmFib2xhUGF0aChzdGFydFBvaW50LCBlZmZlY3RQb2ludCwgMTYsIC05LjgpO1xyXG4gICAgICAgICAgdGhpcy5fcGF0aC5pc0NsYW1wU3RhcnRFbmQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgIGNvbnN0IGVuZFBvaW50ID0gdGhpcy5fcGF0aC5nZXRQb3NpdGlvbih0aGlzLl9wYXRoLnRpbWUgKyAxKS5zdWIodGhpcy5fc2tpbGxfbm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICB0aGlzLl9za2lsbF9ub2RlLmFuZ2xlID0gMTgwICogTWF0aC5hdGFuMihlbmRQb2ludC55LCBlbmRQb2ludC54KSAvIE1hdGguUEk7XHJcbiAgICAgICAgICB0aGlzLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cclxuICAgICAgICAgIHRoaXMuX2ZseV9jYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgdGhpcy5wdXRfdG9fcG9vbCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRfc2tpbGxfdGFyZ2V0KHNraWxsOiBTa2lsbENvbmZpZywgdGFyZ2V0Tm9kZTogRmlnaHRIZXJvSXRlbSwgb2Zmc2V0OiBjYy5WZWMzLCBlbmRPZmZzZXQ6IGNjLk5vZGUsIGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcblxyXG4gICAgZ20ucG9vbC5hc3luY19nZXQoQnVuZGxlTmFtZS5DT01NT04sIFwicHJlZmFicy9tb2RlbC9cIiArIHNraWxsLnNraWxsX25hbWUsIE5vZGVQb29sSXRlbSwgKHQpID0+IHtcclxuICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHQubm9kZSk7XHJcbiAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgIHRoaXMucHV0X3RvX3Bvb2woKTtcclxuICAgICAgfSwgc2tpbGwuaGl0X3RpbWUpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldF9idWlsZGluZ19hdHRhY2tfdGFyZ2V0KGJ1aWxkaW5nOiBGaWdodEJ1aWxkaW5nSXRlbSB8IEZpZ2h0V2FsbEl0ZW0sIG9mZnNldDogY2MuVmVjMywgZW5kT2Zmc2V0OiBjYy5WZWMzLCB0YXJnZXROb2RlOiBudW1iZXIsIHNraWxsVHlwZTogY2MuTm9kZSwgY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuXHJcbiAgICBpZiAoY2MuaXNWYWxpZChza2lsbFR5cGUpKSB7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSBidWlsZGluZy5kYXRhO1xyXG4gICAgICBnbS5wb29sLmFzeW5jX2dldChCdW5kbGVOYW1lLkNPTU1PTiwgXCJwcmVmYWJzL21vZGVsL1wiICsgZGF0YS5mbHlfd2VhcG9uX25hbWUsIE5vZGVQb29sSXRlbSwgKHQpID0+IHtcclxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodC5ub2RlKTtcclxuICAgICAgICB0aGlzLl9pc19tb3ZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9tb3ZlX3R5cGUgPSB0YXJnZXROb2RlO1xyXG5cclxuICAgICAgICBpZiAodGFyZ2V0Tm9kZSA9PSAwKSB7XHJcbiAgICAgICAgICBjb25zdCBzdGFydFBvaW50ID0gZ20udWkuZmlnaHQuY29udmVydF90b19zY2VuZV9wb2ludChidWlsZGluZy5ub2RlLCBvZmZzZXQpO1xyXG4gICAgICAgICAgY29uc3QgZW5kUG9pbnQgPSBnbS51aS5maWdodC5jb252ZXJ0X3RvX3NjZW5lX3BvaW50KHNraWxsVHlwZSkuc3ViKHN0YXJ0UG9pbnQpO1xyXG4gICAgICAgICAgY29uc3QgYW5nbGUgPSBNYXRoLmF0YW4yKGVuZFBvaW50LnksIGVuZFBvaW50LngpIC8gTWF0aC5QSSAqIDE4MDtcclxuXHJcbiAgICAgICAgICB0aGlzLm5vZGUucG9zaXRpb24gPSBzdGFydFBvaW50O1xyXG4gICAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gYW5nbGU7XHJcbiAgICAgICAgICB0aGlzLl9oZXJvX2l0ZW0gPSBidWlsZGluZztcclxuICAgICAgICAgIHRoaXMuX29mZnNldCA9IG9mZnNldDtcclxuICAgICAgICAgIHRoaXMuX21vdmVfdHlwZSA9IDA7XHJcbiAgICAgICAgICB0aGlzLl9lbmRfb2Zmc2V0ID0gY2MuVmVjMy5aRVJPO1xyXG4gICAgICAgICAgdGhpcy5fdGFyZ2V0X25vZGUgPSBza2lsbFR5cGU7XHJcbiAgICAgICAgICB0aGlzLl9zcGVlZCA9IEZpZ2h0Q29uc3RhbnRzLkZMWV9XRUFQT05fU1BFRUQ7XHJcbiAgICAgICAgICB0aGlzLl9za2lsbF9ub2RlID0gdGhpcy5ub2RlO1xyXG4gICAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICAgIHRoaXMuX2ZseV9jYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgdGhpcy5wdXRfdG9fcG9vbCgpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldE5vZGUgPT0gMSkge1xyXG4gICAgICAgICAgY29uc3Qgc3RhcnRQb2ludCA9IGdtLnVpLmZpZ2h0LmNvbnZlcnRfdG9fZWZmZWN0X3BvaW50KGJ1aWxkaW5nLm5vZGUsIG9mZnNldCk7XHJcbiAgICAgICAgICBjb25zdCBlbmRQb2ludCA9IGdtLnVpLmZpZ2h0LmNvbnZlcnRfdG9fZWZmZWN0X3BvaW50KHNraWxsVHlwZSwgZW5kT2Zmc2V0KTtcclxuICAgICAgICAgIHRoaXMubm9kZS5wb3NpdGlvbiA9IHN0YXJ0UG9pbnQ7XHJcbiAgICAgICAgICB0aGlzLl9za2lsbF9ub2RlID0gdGhpcy5ub2RlO1xyXG4gICAgICAgICAgdGhpcy5fb2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICAgICAgdGhpcy5fZW5kX29mZnNldCA9IGVuZE9mZnNldDtcclxuICAgICAgICAgIHRoaXMuX3BhdGggPSBuZXcgUGFyYWJvbGFQYXRoKHN0YXJ0UG9pbnQsIGVuZFBvaW50LCAxNiwgLTkuOCk7XHJcbiAgICAgICAgICB0aGlzLl9wYXRoLmlzQ2xhbXBTdGFydEVuZCA9IHRydWU7XHJcbiAgICAgICAgICBjb25zdCBwb3NpdGlvbSA9IHRoaXMuX3BhdGguZ2V0UG9zaXRpb24odGhpcy5fcGF0aC50aW1lICsgMSkuc3ViKHRoaXMuX3NraWxsX25vZGUucG9zaXRpb24pO1xyXG4gICAgICAgICAgdGhpcy5fc2tpbGxfbm9kZS5hbmdsZSA9IDE4MCAqIE1hdGguYXRhbjIocG9zaXRpb20ueSwgcG9zaXRpb20ueCkgLyBNYXRoLlBJO1xyXG4gICAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICAgIHRoaXMuX2ZseV9jYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgdGhpcy5wdXRfdG9fcG9vbCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcHV0X3RvX3Bvb2woKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlc2V0KCk7XHJcbiAgfVxyXG59Il19