"use strict";
cc._RF.push(module, 'e178dj/OCFMVKY2U4AWdqSN', 'FightLost');
// fight/scripts/FightLost.ts

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
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var ListView_1 = require("../../start-scene/scripts/ListView");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FightLost = /** @class */ (function (_super) {
    __extends(FightLost, _super);
    function FightLost() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name_lbl = null;
        _this.gold_lbl = null;
        _this.lost_sv = null;
        _this.prop_list = null;
        _this.death_hero_list = null;
        _this.ok_btn = null;
        return _this;
    }
    FightLost.prototype.onEnable = function () {
        this.update_view();
    };
    FightLost.prototype.onDisable = function () {
        this.prop_list.reset();
        this.death_hero_list.reset();
        this.lost_sv.scrollToTop();
    };
    FightLost.prototype.update_view = function () {
        var fightResultData = GameManager_1.gm.data.fight_temp_data.fight_result_data;
        this.name_lbl.string = fightResultData.attacker_name;
        this.gold_lbl.string = "-" + fightResultData.gold_num;
        this.prop_list.setData(fightResultData.prop_data_array);
        this.death_hero_list.setData(fightResultData.death_hero_data_array);
    };
    FightLost.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.ok_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.FightLost);
        }
    };
    __decorate([
        property(cc.Label)
    ], FightLost.prototype, "name_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], FightLost.prototype, "gold_lbl", void 0);
    __decorate([
        property(cc.ScrollView)
    ], FightLost.prototype, "lost_sv", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], FightLost.prototype, "prop_list", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], FightLost.prototype, "death_hero_list", void 0);
    __decorate([
        property(cc.Button)
    ], FightLost.prototype, "ok_btn", void 0);
    FightLost = __decorate([
        ccclass
    ], FightLost);
    return FightLost;
}(GameModule_1.GameModule));
exports.default = FightLost;

cc._RF.pop();