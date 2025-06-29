"use strict";
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