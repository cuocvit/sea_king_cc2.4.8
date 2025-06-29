
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/fight/scripts/FightHeroShowItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZmlnaHRcXHNjcmlwdHNcXEZpZ2h0SGVyb1Nob3dJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhCQUE4QjtBQUM5Qix1RUFBc0U7QUFDdEUsMkVBQTZFO0FBQzdFLHFFQUEyRDtBQUMzRCx5REFBd0Q7QUFDeEQsaUVBQWlFO0FBRzNELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWdDLHFDQUFZO0lBQTVDO1FBQUEscUVBMEZDO1FBeEZXLGVBQVMsR0FBYyxJQUFJLENBQUM7UUFHNUIsaUJBQVcsR0FBYyxJQUFJLENBQUM7UUFHOUIsY0FBUSxHQUFjLElBQUksQ0FBQztRQUczQixZQUFNLEdBQWMsSUFBSSxDQUFDO1FBR3pCLFlBQU0sR0FBbUIsSUFBSSxDQUFDO1FBRzlCLG9CQUFjLEdBQVksSUFBSSxDQUFDO1FBRy9CLGVBQVMsR0FBYyxJQUFJLENBQUM7O0lBc0V4QyxDQUFDO0lBbEVHLHNCQUFXLG1DQUFJO2FBQWY7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzthQUVELFVBQWdCLEtBQXdCO1lBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDOzs7T0FMQTtJQU9ELHNCQUFXLDhDQUFlO2FBQTFCO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsa0NBQWlCLENBQUMsYUFBYSxDQUFDO1FBQ3JGLENBQUM7YUFFRCxVQUEyQixLQUF3QjtZQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUs7Z0JBQUUsT0FBTztZQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLGVB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O0lBR3RDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NkRBQ3FCO0lBR3ZDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7d0RBQ2dCO0lBcEJsQyxpQkFBaUI7UUFEdEIsT0FBTztPQUNGLGlCQUFpQixDQTBGdEI7SUFBRCx3QkFBQztDQTFGRCxBQTBGQyxDQTFGK0IsMkJBQVksR0EwRjNDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZmlsZSBuw6B5IGtvIMSRYyBpbXBvcnQg4bufIMSRw6J1XHJcbmltcG9ydCB7IExpc3RWaWV3SXRlbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvTGlzdFZpZXdJdGVtJztcclxuaW1wb3J0IHsgSGVyb0luQmF0dGxlU3RhdGUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0ZpZ2h0Q29uc3RhbnRzJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1V0aWxzJztcclxuaW1wb3J0IHsgQnVuZGxlTmFtZSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgRmlnaHRIZXJvSXRlbURhdGEgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0ZpZ2h0VGVtcERhdGEnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIEZpZ2h0SGVyb1Nob3dJdGVtIGV4dGVuZHMgTGlzdFZpZXdJdGVtIHtcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIGNvbG9yX3NwcjogY2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuV2lkZ2V0KVxyXG4gICAgcHJpdmF0ZSBtYXNrX3dpZGdldDogY2MuV2lkZ2V0ID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBoZXJvX3NwcjogY2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBsdl9zcHI6IGNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByb2dyZXNzQmFyKVxyXG4gICAgcHJpdmF0ZSBocF9wcmc6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgaW5fYmF0dGxlX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIGJsYWNrX2J0bjogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgX2RhdGE6IEZpZ2h0SGVyb0l0ZW1EYXRhO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgZGF0YSgpOiBGaWdodEhlcm9JdGVtRGF0YSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBkYXRhKHZhbHVlOiBGaWdodEhlcm9JdGVtRGF0YSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpbl9iYXR0bGVfc3RhdGUoKTogSGVyb0luQmF0dGxlU3RhdGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhID8gdGhpcy5fZGF0YS5pbl9iYXR0bGVfc3RhdGUgOiBIZXJvSW5CYXR0bGVTdGF0ZS5OT1RfSU5fQkFUVExFO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgaW5fYmF0dGxlX3N0YXRlKHZhbHVlOiBIZXJvSW5CYXR0bGVTdGF0ZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fZGF0YSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX2RhdGEuaW5fYmF0dGxlX3N0YXRlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5pbl9iYXR0bGVfbm9kZS5hY3RpdmUgPSB2YWx1ZSA9PSBIZXJvSW5CYXR0bGVTdGF0ZS5XSUxMX0lOX0JBVFRMRTtcclxuICAgICAgICB0aGlzLmJsYWNrX2J0bi5ub2RlLmFjdGl2ZSA9IHZhbHVlID09IEhlcm9JbkJhdHRsZVN0YXRlLk5PVF9JTl9CQVRUTEU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5vbihcImZpZ2h0X2luX2JhdHRsZVwiLCB0aGlzLm9uX2ZpZ2h0X2luX2JhdHRsZV9oYW5kbGVyLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5vZmYoXCJmaWdodF9pbl9iYXR0bGVcIiwgdGhpcy5vbl9maWdodF9pbl9iYXR0bGVfaGFuZGxlciwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZV92aWV3KCk6IHZvaWQge1xyXG4gICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5jb2xvcl9zcHIsIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9jb2xvcl9cIiArIHRoaXMuX2RhdGEubHYpO1xyXG4gICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5oZXJvX3NwciwgQnVuZGxlTmFtZS5DT01NT04sIFwicmVzL2hhbmRib29rL1wiICsgdGhpcy5fZGF0YS5pZCk7XHJcbiAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmx2X3NwciwgQnVuZGxlTmFtZS5GSUdIVCwgXCJyZXMvbHZfXCIgKyB0aGlzLl9kYXRhLmx2KTtcclxuICAgICAgICB0aGlzLmhwX3ByZy5wcm9ncmVzcyA9IHRoaXMuX2RhdGEubWF4X2hwID4gMCA/IHRoaXMuX2RhdGEuaHAgLyB0aGlzLl9kYXRhLm1heF9ocCA6IDA7XHJcbiAgICAgICAgdGhpcy5pbl9iYXR0bGVfc3RhdGUgPSB0aGlzLl9kYXRhLmluX2JhdHRsZV9zdGF0ZTtcclxuXHJcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5fZGF0YS5pbl9iYXR0bGVfc3RhdGUgPT0gSGVyb0luQmF0dGxlU3RhdGUuSEFTX0lOX0JBVFRMRSA/IDgwIDogMTI4O1xyXG4gICAgICAgIGlmIChoZWlnaHQgIT09IHRoaXMuY29sb3Jfc3ByLm5vZGUuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29sb3Jfc3ByLm5vZGUuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLm1hc2tfd2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBVdGlscy5zZXRfc3ByaXRlX3N0YXRlKHRoaXMubm9kZSwgdGhpcy5fZGF0YS5ocCA8PSAwID8gY2MuU3ByaXRlLlN0YXRlLkdSQVkgOiBjYy5TcHJpdGUuU3RhdGUuTk9STUFMLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uX2ZpZ2h0X2luX2JhdHRsZV9oYW5kbGVyKGV2ZW50RGF0YTogRmlnaHRIZXJvSXRlbURhdGEpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZlbnREYXRhLmluX2JhdHRsZV9zdGF0ZSAhPT0gSGVyb0luQmF0dGxlU3RhdGUuSEFTX0lOX0JBVFRMRSAmJiB0aGlzLl9kYXRhLmluX2JhdHRsZV9zdGF0ZSAhPT0gSGVyb0luQmF0dGxlU3RhdGUuSEFTX0lOX0JBVFRMRSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhLmluX2JhdHRsZV9zdGF0ZSA9IGV2ZW50RGF0YSA9PSB0aGlzLl9kYXRhID8gSGVyb0luQmF0dGxlU3RhdGUuV0lMTF9JTl9CQVRUTEUgOiBIZXJvSW5CYXR0bGVTdGF0ZS5OT1RfSU5fQkFUVExFO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudERhdGEgPT0gdGhpcy5fZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvbG9yX3Nwci5zcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5oZXJvX3Nwci5zcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sdl9zcHIuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaW5fYmF0dGxlX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ibGFja19idG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBlZGl0b3Jfb25fYnV0dG9uX2NsaWNrX2hhbmRsZXIoZXZlbnQ6IGNjLkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLmJsYWNrX2J0bi5ub2RlICYmIHRoaXMuX2RhdGEuaW5fYmF0dGxlX3N0YXRlID09IEhlcm9JbkJhdHRsZVN0YXRlLk5PVF9JTl9CQVRUTEUpIHtcclxuICAgICAgICAgICAgZ20uZGF0YS5maWdodF90ZW1wX2RhdGEuaW5fYmF0dGxlX2hlcm9fZGF0YSA9IHRoaXMuX2RhdGE7XHJcbiAgICAgICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5lbWl0KFwiZmlnaHRfaW5fYmF0dGxlXCIsIHRoaXMuX2RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=