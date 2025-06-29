
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/Loading.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '68d99yKhdVJRIe1RfEr7EyW', 'Loading');
// start-scene/scripts/Loading.ts

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
exports.Loading = void 0;
// qg ??????
var GameModule_1 = require("./GameModule");
var Constants_1 = require("./Constants");
var NodePoolItem_1 = require("./NodePoolItem");
var Utils_1 = require("./Utils");
var GameManager_1 = require("./GameManager");
var Launch_1 = require("./Launch");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Loading = /** @class */ (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prompt_lbl = null;
        _this.bar_node = null;
        _this.bar_node_2 = null;
        _this.start_node = null;
        _this.start_full_node = null;
        _this.caves_node = null;
        _this.reward_node = null;
        _this.boat_node = null;
        _this.boat_anim = null;
        _this.hero_node_array = [];
        _this.people_spr = null;
        _this.people_text_spr = null;
        _this._low_speed = 20;
        _this._low_speed_2 = 100;
        _this._total_len = 0;
        _this._total_len_2 = 0;
        _this._high_speed = 500;
        _this._count = 0;
        return _this;
    }
    Object.defineProperty(Loading.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (value) {
            if (this._state != value) {
                this._last_state = this._state;
                this._state = value;
                if (this._state !== Launch_1.LoadingState.COMPLETE) {
                    this.start_load();
                }
                else if (this._state === Launch_1.LoadingState.COMPLETE) {
                    this.complete_load();
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Loading.prototype.update = function (deltaTime) {
        if (this._state == Launch_1.LoadingState.COMPLETE) {
            this._total_len += deltaTime * this._high_speed;
            this._total_len_2 += deltaTime * this._high_speed;
            this.bar_node.progress = Math.floor(this._total_len) / 100;
            this.bar_node_2.progress = this._total_len_2 % 100 / 100;
            if (this._total_len >= 100) {
                this.node.active = false;
            }
            if (cc.sys.platform == cc.sys.OPPO_GAME) {
                qg.setLoadingProgress({ progress: this._total_len });
            }
        }
        else {
            if (this._total_len < 90) {
                this._total_len += deltaTime * this._low_speed;
                this.bar_node.progress = Math.floor(this._total_len) / 100;
            }
            this._total_len_2 += deltaTime * this._low_speed_2;
            this.bar_node_2.progress = this._total_len_2 % 100 / 100;
        }
    };
    Loading.prototype.start_load = function () {
        var _this = this;
        this.node.active = true;
        this.start_node.active = this._state == Launch_1.LoadingState.START;
        this.start_full_node.active = this._state == Launch_1.LoadingState.START_FULL;
        this.caves_node.active = this._state == Launch_1.LoadingState.CAVES_FULL;
        this.reward_node.active = this._state == Launch_1.LoadingState.REWARD_FULL;
        this.boat_node.active = this._state == Launch_1.LoadingState.BOAT_IN || this._state == Launch_1.LoadingState.BOAT_OUT;
        if (this._state == Launch_1.LoadingState.BOAT_IN) {
            this.people_spr.node.active = false;
            this.people_text_spr.node.active = false;
        }
        else if (this._state == Launch_1.LoadingState.BOAT_OUT) {
            var t = this._count % 2 + 1;
            this.people_spr.node.active = true;
            this.people_text_spr.node.active = true;
            Utils_1.Utils.async_set_sprite_frame(this.people_spr, Constants_1.BundleName.LOADING, "res/people_" + t);
            Utils_1.Utils.async_set_sprite_frame(this.people_text_spr, Constants_1.BundleName.LOADING, "res/people_text_" + t);
            this._count++;
        }
        this._total_len = 0;
        this._total_len_2 = 0;
        if (this._state == Launch_1.LoadingState.BOAT_IN) {
            this.boat_anim.once(cc.Animation.EventType.FINISHED, function () {
                _this.boat_anim.play("loding_ship_innormal");
            });
            this.boat_anim.play("loding_ship_inopen");
            var aliveHeroDataArray = GameManager_1.gm.data.fight_temp_data.fight_result_data.alive_hero_data_array;
            for (var i = 0; i < this.hero_node_array.length; i++) {
                var heroData = aliveHeroDataArray[i];
                var heroNode = this.hero_node_array[i];
                this.load_hero_model(heroNode, heroData ? heroData.id : 0, i, aliveHeroDataArray.length);
            }
        }
        else if (this._state == Launch_1.LoadingState.BOAT_OUT) {
            this.boat_anim.once(cc.Animation.EventType.FINISHED, function () {
                _this.boat_anim.play("loding_ship_outnormal");
            });
            this.boat_anim.play("loding_ship_outopen");
            var battleHeroArray = GameManager_1.gm.data.fight_temp_data.battle_hero_array;
            for (var i = 0; i < this.hero_node_array.length; i++) {
                var heroData = battleHeroArray[i];
                var heroNode = this.hero_node_array[i];
                this.load_hero_model(heroNode, heroData ? heroData.itemID : 0, i, battleHeroArray.length);
            }
        }
    };
    Loading.prototype.load_hero_model = function (heroNode, heroId, index, total) {
        if (heroId > 0) {
            if (heroNode.childrenCount == 0) {
                if (index < total) {
                    heroNode.active = true;
                    GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + heroId, NodePoolItem_1.NodePoolItem, function (item) {
                        if (!item)
                            return;
                        if (heroNode.childrenCount == 0) {
                            heroNode.addChild(item.node);
                            var skeleton = item.getComponent(sp.Skeleton);
                            if (skeleton) {
                                skeleton.setSkin("front");
                                skeleton.setAnimation(0, "stay", true);
                            }
                        }
                        else {
                            GameManager_1.gm.pool.put(item.node);
                        }
                    });
                }
            }
            else {
                heroNode.active = false;
                GameManager_1.gm.pool.put_children(heroNode);
            }
        }
    };
    Loading.prototype.complete_load = function () {
        var _this = this;
        if (this._last_state == Launch_1.LoadingState.BOAT_IN) {
            this.boat_anim.once(cc.Animation.EventType.FINISHED, function () {
                _this.do_complete_load();
            });
            this.boat_anim.play("loding_ship_inclose");
        }
        else if (this._last_state == Launch_1.LoadingState.BOAT_OUT) {
            this.boat_anim.once(cc.Animation.EventType.FINISHED, function () {
                _this.do_complete_load();
            });
            this.boat_anim.play("loding_ship_outclose");
        }
        else {
            this.do_complete_load();
        }
    };
    Loading.prototype.do_complete_load = function () {
        for (var i = 0; i < this.hero_node_array.length; i++) {
            var heroNode = this.hero_node_array[i];
            heroNode.active = false;
            GameManager_1.gm.pool.put_children(heroNode);
        }
        this.start_node.active = false;
        this.start_full_node.active = false;
        this.caves_node.active = false;
        this.reward_node.active = false;
        this.boat_node.active = false;
        this.node.active = false;
    };
    Loading.prototype.onDisable = function () {
        this.start_node.active = false;
        this.start_full_node.active = false;
        this.caves_node.active = false;
        this.reward_node.active = false;
        this.boat_node.active = false;
        if (cc.sys.platform == cc.sys.OPPO_GAME) {
            qg.loadingComplete({});
        }
    };
    __decorate([
        property(cc.Label)
    ], Loading.prototype, "prompt_lbl", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], Loading.prototype, "bar_node", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], Loading.prototype, "bar_node_2", void 0);
    __decorate([
        property(cc.Node)
    ], Loading.prototype, "start_node", void 0);
    __decorate([
        property(cc.Node)
    ], Loading.prototype, "start_full_node", void 0);
    __decorate([
        property(cc.Node)
    ], Loading.prototype, "caves_node", void 0);
    __decorate([
        property(cc.Node)
    ], Loading.prototype, "reward_node", void 0);
    __decorate([
        property(cc.Node)
    ], Loading.prototype, "boat_node", void 0);
    __decorate([
        property(cc.Animation)
    ], Loading.prototype, "boat_anim", void 0);
    __decorate([
        property([cc.Node])
    ], Loading.prototype, "hero_node_array", void 0);
    __decorate([
        property(cc.Sprite)
    ], Loading.prototype, "people_spr", void 0);
    __decorate([
        property(cc.Sprite)
    ], Loading.prototype, "people_text_spr", void 0);
    Loading = __decorate([
        ccclass
    ], Loading);
    return Loading;
}(GameModule_1.GameModule));
exports.Loading = Loading;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXExvYWRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFlBQVk7QUFDWiwyQ0FBMEM7QUFDMUMseUNBQXlDO0FBQ3pDLCtDQUE4QztBQUM5QyxpQ0FBZ0M7QUFDaEMsNkNBQW1DO0FBQ25DLG1DQUF1QztBQUVqQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFzQiwyQkFBVTtJQUFoQztRQUFBLHFFQXNNQztRQXBNVyxnQkFBVSxHQUFvQixJQUFJLENBQUM7UUFHbkMsY0FBUSxHQUEwQixJQUFJLENBQUM7UUFHdkMsZ0JBQVUsR0FBMEIsSUFBSSxDQUFDO1FBR3pDLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUdsQyxxQkFBZSxHQUFtQixJQUFJLENBQUM7UUFHdkMsZ0JBQVUsR0FBbUIsSUFBSSxDQUFDO1FBR2xDLGlCQUFXLEdBQW1CLElBQUksQ0FBQztRQUduQyxlQUFTLEdBQW1CLElBQUksQ0FBQztRQUdqQyxlQUFTLEdBQXdCLElBQUksQ0FBQztRQUd0QyxxQkFBZSxHQUFjLEVBQUUsQ0FBQztRQUdoQyxnQkFBVSxHQUFxQixJQUFJLENBQUM7UUFHcEMscUJBQWUsR0FBcUIsSUFBSSxDQUFDO1FBRXpDLGdCQUFVLEdBQVcsRUFBRSxDQUFDO1FBQ3hCLGtCQUFZLEdBQVcsR0FBRyxDQUFDO1FBQzNCLGdCQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLGtCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLGlCQUFXLEdBQVcsR0FBRyxDQUFDO1FBQzFCLFlBQU0sR0FBVyxDQUFDLENBQUM7O0lBNEovQixDQUFDO0lBeEpHLHNCQUFJLDBCQUFLO2FBQVQ7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzthQUVELFVBQVUs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RDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUN3QjtJQUcxQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUM2QjtJQUcvQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUN3QjtJQUcxQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUN5QjtJQUczQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUN1QjtJQUd6QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDOzhDQUN1QjtJQUc5QztRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztvREFDb0I7SUFHeEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzsrQ0FDd0I7SUFHNUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztvREFDNkI7SUFuQy9DLE9BQU87UUFEWixPQUFPO09BQ0YsT0FBTyxDQXNNWjtJQUFELGNBQUM7Q0F0TUQsQUFzTUMsQ0F0TXFCLHVCQUFVLEdBc00vQjtBQUVRLDBCQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcWcgPz8/Pz8/XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tICcuL0dhbWVNb2R1bGUnO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lIH0gZnJvbSAnLi9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBOb2RlUG9vbEl0ZW0gfSBmcm9tICcuL05vZGVQb29sSXRlbSc7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi9VdGlscyc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IExvYWRpbmdTdGF0ZSB9IGZyb20gXCIuL0xhdW5jaFwiXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgTG9hZGluZyBleHRlbmRzIEdhbWVNb2R1bGUge1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBwcm9tcHRfbGJsOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Qcm9ncmVzc0JhcilcclxuICAgIHByaXZhdGUgYmFyX25vZGU6IGNjLlByb2dyZXNzQmFyIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByb2dyZXNzQmFyKVxyXG4gICAgcHJpdmF0ZSBiYXJfbm9kZV8yOiBjYy5Qcm9ncmVzc0JhciB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBzdGFydF9ub2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHN0YXJ0X2Z1bGxfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBjYXZlc19ub2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHJld2FyZF9ub2RlOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGJvYXRfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5BbmltYXRpb24pXHJcbiAgICBwcml2YXRlIGJvYXRfYW5pbTogY2MuQW5pbWF0aW9uIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5Ob2RlXSlcclxuICAgIHByaXZhdGUgaGVyb19ub2RlX2FycmF5OiBjYy5Ob2RlW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBwZW9wbGVfc3ByOiBjYy5TcHJpdGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBwZW9wbGVfdGV4dF9zcHI6IGNjLlNwcml0ZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX2xvd19zcGVlZDogbnVtYmVyID0gMjA7XHJcbiAgICBwcml2YXRlIF9sb3dfc3BlZWRfMjogbnVtYmVyID0gMTAwO1xyXG4gICAgcHJpdmF0ZSBfdG90YWxfbGVuOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfdG90YWxfbGVuXzI6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9oaWdoX3NwZWVkOiBudW1iZXIgPSA1MDA7XHJcbiAgICBwcml2YXRlIF9jb3VudDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX3N0YXRlOiBMb2FkaW5nU3RhdGU7XHJcbiAgICBwcml2YXRlIF9sYXN0X3N0YXRlOiBMb2FkaW5nU3RhdGU7XHJcblxyXG4gICAgZ2V0IHN0YXRlKCk6IExvYWRpbmdTdGF0ZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBzdGF0ZSh2YWx1ZTogTG9hZGluZ1N0YXRlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlICE9IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3Rfc3RhdGUgPSB0aGlzLl9zdGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXRlICE9PSBMb2FkaW5nU3RhdGUuQ09NUExFVEUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRfbG9hZCgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3N0YXRlID09PSBMb2FkaW5nU3RhdGUuQ09NUExFVEUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVfbG9hZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCB1cGRhdGUoZGVsdGFUaW1lOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc3RhdGUgPT0gTG9hZGluZ1N0YXRlLkNPTVBMRVRFKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RvdGFsX2xlbiArPSBkZWx0YVRpbWUgKiB0aGlzLl9oaWdoX3NwZWVkO1xyXG4gICAgICAgICAgICB0aGlzLl90b3RhbF9sZW5fMiArPSBkZWx0YVRpbWUgKiB0aGlzLl9oaWdoX3NwZWVkO1xyXG4gICAgICAgICAgICB0aGlzLmJhcl9ub2RlIS5wcm9ncmVzcyA9IE1hdGguZmxvb3IodGhpcy5fdG90YWxfbGVuKSAvIDEwMDtcclxuICAgICAgICAgICAgdGhpcy5iYXJfbm9kZV8yIS5wcm9ncmVzcyA9IHRoaXMuX3RvdGFsX2xlbl8yICUgMTAwIC8gMTAwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdG90YWxfbGVuID49IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLk9QUE9fR0FNRSkge1xyXG4gICAgICAgICAgICAgICAgcWcuc2V0TG9hZGluZ1Byb2dyZXNzKHsgcHJvZ3Jlc3M6IHRoaXMuX3RvdGFsX2xlbiB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90b3RhbF9sZW4gPCA5MCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG90YWxfbGVuICs9IGRlbHRhVGltZSAqIHRoaXMuX2xvd19zcGVlZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFyX25vZGUhLnByb2dyZXNzID0gTWF0aC5mbG9vcih0aGlzLl90b3RhbF9sZW4pIC8gMTAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3RvdGFsX2xlbl8yICs9IGRlbHRhVGltZSAqIHRoaXMuX2xvd19zcGVlZF8yO1xyXG4gICAgICAgICAgICB0aGlzLmJhcl9ub2RlXzIhLnByb2dyZXNzID0gdGhpcy5fdG90YWxfbGVuXzIgJSAxMDAgLyAxMDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhcnRfbG9hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnN0YXJ0X25vZGUhLmFjdGl2ZSA9IHRoaXMuX3N0YXRlID09IExvYWRpbmdTdGF0ZS5TVEFSVDtcclxuICAgICAgICB0aGlzLnN0YXJ0X2Z1bGxfbm9kZSEuYWN0aXZlID0gdGhpcy5fc3RhdGUgPT0gTG9hZGluZ1N0YXRlLlNUQVJUX0ZVTEw7XHJcbiAgICAgICAgdGhpcy5jYXZlc19ub2RlIS5hY3RpdmUgPSB0aGlzLl9zdGF0ZSA9PSBMb2FkaW5nU3RhdGUuQ0FWRVNfRlVMTDtcclxuICAgICAgICB0aGlzLnJld2FyZF9ub2RlIS5hY3RpdmUgPSB0aGlzLl9zdGF0ZSA9PSBMb2FkaW5nU3RhdGUuUkVXQVJEX0ZVTEw7XHJcbiAgICAgICAgdGhpcy5ib2F0X25vZGUhLmFjdGl2ZSA9IHRoaXMuX3N0YXRlID09IExvYWRpbmdTdGF0ZS5CT0FUX0lOIHx8IHRoaXMuX3N0YXRlID09IExvYWRpbmdTdGF0ZS5CT0FUX09VVDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlID09IExvYWRpbmdTdGF0ZS5CT0FUX0lOKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGVvcGxlX3NwciEubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5wZW9wbGVfdGV4dF9zcHIhLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zdGF0ZSA9PSBMb2FkaW5nU3RhdGUuQk9BVF9PVVQpIHtcclxuICAgICAgICAgICAgY29uc3QgdDogbnVtYmVyID0gdGhpcy5fY291bnQgJSAyICsgMTtcclxuICAgICAgICAgICAgdGhpcy5wZW9wbGVfc3ByIS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucGVvcGxlX3RleHRfc3ByIS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5wZW9wbGVfc3ByISwgQnVuZGxlTmFtZS5MT0FESU5HLCBgcmVzL3Blb3BsZV8ke3R9YCk7XHJcbiAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5wZW9wbGVfdGV4dF9zcHIhLCBCdW5kbGVOYW1lLkxPQURJTkcsIGByZXMvcGVvcGxlX3RleHRfJHt0fWApO1xyXG4gICAgICAgICAgICB0aGlzLl9jb3VudCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdG90YWxfbGVuID0gMDtcclxuICAgICAgICB0aGlzLl90b3RhbF9sZW5fMiA9IDA7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZSA9PSBMb2FkaW5nU3RhdGUuQk9BVF9JTikge1xyXG4gICAgICAgICAgICB0aGlzLmJvYXRfYW5pbSEub25jZShjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXRfYW5pbSEucGxheShcImxvZGluZ19zaGlwX2lubm9ybWFsXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5ib2F0X2FuaW0hLnBsYXkoXCJsb2Rpbmdfc2hpcF9pbm9wZW5cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGFsaXZlSGVyb0RhdGFBcnJheSA9IGdtLmRhdGEuZmlnaHRfdGVtcF9kYXRhLmZpZ2h0X3Jlc3VsdF9kYXRhLmFsaXZlX2hlcm9fZGF0YV9hcnJheTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmhlcm9fbm9kZV9hcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVyb0RhdGEgPSBhbGl2ZUhlcm9EYXRhQXJyYXlbaV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoZXJvTm9kZSA9IHRoaXMuaGVyb19ub2RlX2FycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkX2hlcm9fbW9kZWwoaGVyb05vZGUsIGhlcm9EYXRhID8gaGVyb0RhdGEuaWQgOiAwLCBpLCBhbGl2ZUhlcm9EYXRhQXJyYXkubGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fc3RhdGUgPT0gTG9hZGluZ1N0YXRlLkJPQVRfT1VUKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYm9hdF9hbmltIS5vbmNlKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9hdF9hbmltIS5wbGF5KFwibG9kaW5nX3NoaXBfb3V0bm9ybWFsXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5ib2F0X2FuaW0hLnBsYXkoXCJsb2Rpbmdfc2hpcF9vdXRvcGVuXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBiYXR0bGVIZXJvQXJyYXkgPSBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5iYXR0bGVfaGVyb19hcnJheTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmhlcm9fbm9kZV9hcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVyb0RhdGEgPSBiYXR0bGVIZXJvQXJyYXlbaV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoZXJvTm9kZSA9IHRoaXMuaGVyb19ub2RlX2FycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkX2hlcm9fbW9kZWwoaGVyb05vZGUsIGhlcm9EYXRhID8gaGVyb0RhdGEuaXRlbUlEIDogMCwgaSwgYmF0dGxlSGVyb0FycmF5Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkX2hlcm9fbW9kZWwoaGVyb05vZGU6IGNjLk5vZGUsIGhlcm9JZDogbnVtYmVyLCBpbmRleDogbnVtYmVyLCB0b3RhbDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGhlcm9JZCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKGhlcm9Ob2RlLmNoaWxkcmVuQ291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgdG90YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnBvb2wuYXN5bmNfZ2V0KEJ1bmRsZU5hbWUuQ09NTU9OLCBgcHJlZmFicy9tb2RlbC8ke2hlcm9JZH1gLCBOb2RlUG9vbEl0ZW0sIChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXRlbSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGVyb05vZGUuY2hpbGRyZW5Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXJvTm9kZS5hZGRDaGlsZChpdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2tlbGV0b24gPSBpdGVtLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2tlbGV0b24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2VsZXRvbi5zZXRTa2luKFwiZnJvbnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tlbGV0b24uc2V0QW5pbWF0aW9uKDAsIFwic3RheVwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0KGl0ZW0ubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhlcm9Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZ20ucG9vbC5wdXRfY2hpbGRyZW4oaGVyb05vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29tcGxldGVfbG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fbGFzdF9zdGF0ZSA9PSBMb2FkaW5nU3RhdGUuQk9BVF9JTikge1xyXG4gICAgICAgICAgICB0aGlzLmJvYXRfYW5pbSEub25jZShjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvX2NvbXBsZXRlX2xvYWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuYm9hdF9hbmltIS5wbGF5KFwibG9kaW5nX3NoaXBfaW5jbG9zZVwiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2xhc3Rfc3RhdGUgPT0gTG9hZGluZ1N0YXRlLkJPQVRfT1VUKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYm9hdF9hbmltIS5vbmNlKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZG9fY29tcGxldGVfbG9hZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5ib2F0X2FuaW0hLnBsYXkoXCJsb2Rpbmdfc2hpcF9vdXRjbG9zZVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRvX2NvbXBsZXRlX2xvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkb19jb21wbGV0ZV9sb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5oZXJvX25vZGVfYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgaGVyb05vZGUgPSB0aGlzLmhlcm9fbm9kZV9hcnJheVtpXTtcclxuICAgICAgICAgICAgaGVyb05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGdtLnBvb2wucHV0X2NoaWxkcmVuKGhlcm9Ob2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGFydF9ub2RlIS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXJ0X2Z1bGxfbm9kZSEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYXZlc19ub2RlIS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJld2FyZF9ub2RlIS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJvYXRfbm9kZSEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXJ0X25vZGUhLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhcnRfZnVsbF9ub2RlIS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNhdmVzX25vZGUhLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmV3YXJkX25vZGUhLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYm9hdF9ub2RlIS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09IGNjLnN5cy5PUFBPX0dBTUUpIHtcclxuICAgICAgICAgICAgcWcubG9hZGluZ0NvbXBsZXRlKHt9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IExvYWRpbmcgfTsiXX0=