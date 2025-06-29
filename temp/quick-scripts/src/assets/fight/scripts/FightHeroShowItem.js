"use strict";
cc._RF.push(module, '864c756to1Bm4SziED0WSuE', 'FightHeroShowItem');
// fight/scripts/FightHeroShowItem.ts

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
// file này ko đc import ở đâu
var ListViewItem_1 = require("../../start-scene/scripts/ListViewItem");
var FightConstants_1 = require("../../start-scene/scripts/FightConstants");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var Utils_1 = require("../../start-scene/scripts/Utils");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FightHeroShowItem = /** @class */ (function (_super) {
    __extends(FightHeroShowItem, _super);
    function FightHeroShowItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.color_spr = null;
        _this.mask_widget = null;
        _this.hero_spr = null;
        _this.lv_spr = null;
        _this.hp_prg = null;
        _this.in_battle_node = null;
        _this.black_btn = null;
        return _this;
    }
    Object.defineProperty(FightHeroShowItem.prototype, "data", {
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
    Object.defineProperty(FightHeroShowItem.prototype, "in_battle_state", {
        get: function () {
            return this._data ? this._data.in_battle_state : FightConstants_1.HeroInBattleState.NOT_IN_BATTLE;
        },
        set: function (value) {
            if (!this._data)
                return;
            this._data.in_battle_state = value;
            this.in_battle_node.active = value == FightConstants_1.HeroInBattleState.WILL_IN_BATTLE;
            this.black_btn.node.active = value == FightConstants_1.HeroInBattleState.NOT_IN_BATTLE;
        },
        enumerable: false,
        configurable: true
    });
    FightHeroShowItem.prototype.onEnable = function () {
        GameManager_1.gm.data.event_emitter.on("fight_in_battle", this.on_fight_in_battle_handler, this);
    };
    FightHeroShowItem.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off("fight_in_battle", this.on_fight_in_battle_handler, this);
    };
    FightHeroShowItem.prototype.update_view = function () {
        Utils_1.Utils.async_set_sprite_frame(this.color_spr, Constants_1.BundleName.COMMON, "res/color_" + this._data.lv);
        Utils_1.Utils.async_set_sprite_frame(this.hero_spr, Constants_1.BundleName.COMMON, "res/handbook/" + this._data.id);
        Utils_1.Utils.async_set_sprite_frame(this.lv_spr, Constants_1.BundleName.FIGHT, "res/lv_" + this._data.lv);
        this.hp_prg.progress = this._data.max_hp > 0 ? this._data.hp / this._data.max_hp : 0;
        this.in_battle_state = this._data.in_battle_state;
        var height = this._data.in_battle_state == FightConstants_1.HeroInBattleState.HAS_IN_BATTLE ? 80 : 128;
        if (height !== this.color_spr.node.height) {
            this.color_spr.node.height = height;
            this.mask_widget.updateAlignment();
        }
        Utils_1.Utils.set_sprite_state(this.node, this._data.hp <= 0 ? cc.Sprite.State.GRAY : cc.Sprite.State.NORMAL, true);
    };
    FightHeroShowItem.prototype.on_fight_in_battle_handler = function (eventData) {
        if (eventData.in_battle_state !== FightConstants_1.HeroInBattleState.HAS_IN_BATTLE && this._data.in_battle_state !== FightConstants_1.HeroInBattleState.HAS_IN_BATTLE) {
            this._data.in_battle_state = eventData == this._data ? FightConstants_1.HeroInBattleState.WILL_IN_BATTLE : FightConstants_1.HeroInBattleState.NOT_IN_BATTLE;
            this.update_view();
        }
        else if (eventData == this._data) {
            this.update_view();
        }
    };
    FightHeroShowItem.prototype.reset = function () {
        this.color_spr.spriteFrame = null;
        this.hero_spr.spriteFrame = null;
        this.lv_spr.spriteFrame = null;
        this.in_battle_node.active = false;
        this.black_btn.node.active = true;
    };
    FightHeroShowItem.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.black_btn.node && this._data.in_battle_state == FightConstants_1.HeroInBattleState.NOT_IN_BATTLE) {
            GameManager_1.gm.data.fight_temp_data.in_battle_hero_data = this._data;
            GameManager_1.gm.data.event_emitter.emit("fight_in_battle", this._data);
        }
    };
    __decorate([
        property(cc.Sprite)
    ], FightHeroShowItem.prototype, "color_spr", void 0);
    __decorate([
        property(cc.Widget)
    ], FightHeroShowItem.prototype, "mask_widget", void 0);
    __decorate([
        property(cc.Sprite)
    ], FightHeroShowItem.prototype, "hero_spr", void 0);
    __decorate([
        property(cc.Sprite)
    ], FightHeroShowItem.prototype, "lv_spr", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], FightHeroShowItem.prototype, "hp_prg", void 0);
    __decorate([
        property(cc.Node)
    ], FightHeroShowItem.prototype, "in_battle_node", void 0);
    __decorate([
        property(cc.Button)
    ], FightHeroShowItem.prototype, "black_btn", void 0);
    FightHeroShowItem = __decorate([
        ccclass
    ], FightHeroShowItem);
    return FightHeroShowItem;
}(ListViewItem_1.ListViewItem));

cc._RF.pop();