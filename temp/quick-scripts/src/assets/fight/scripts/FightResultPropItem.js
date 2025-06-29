"use strict";
cc._RF.push(module, 'e80f4/ZUqlNGIwtvecmxcQI', 'FightResultPropItem');
// fight/scripts/FightResultPropItem.ts

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
var ListViewItem_1 = require("../../start-scene/scripts/ListViewItem");
var Utils_1 = require("../../start-scene/scripts/Utils");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FightResultPropItem = /** @class */ (function (_super) {
    __extends(FightResultPropItem, _super);
    function FightResultPropItem() {
        var _this = _super.call(this) || this;
        _this.color_spr = null;
        _this.prop_spr = null;
        _this.num_lbl = null;
        return _this;
    }
    Object.defineProperty(FightResultPropItem.prototype, "data", {
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
    FightResultPropItem.prototype.update_view = function () {
        if (!this._data)
            return;
        Utils_1.Utils.async_set_sprite_frame(this.color_spr, Constants_1.BundleName.COMMON, "res/color_" + this._data.color);
        if (this._data.type == 1) {
            Utils_1.Utils.async_set_sprite_frame(this.prop_spr, Constants_1.BundleName.COMMON, "res/handbook/" + this._data.id);
            this.num_lbl.string = this._data.num.toString();
            this.num_lbl.node.active = true;
        }
        else {
            Utils_1.Utils.async_set_sprite_frame(this.prop_spr, Constants_1.BundleName.COMMON, "res/handbook/" + this._data.id);
            this.num_lbl.node.active = false;
            Utils_1.Utils.set_sprite_state(this.color_spr.node, cc.Sprite.State.GRAY);
            Utils_1.Utils.set_sprite_state(this.prop_spr.node, cc.Sprite.State.GRAY);
        }
        this.num_lbl.node.active = this._data.type == 1;
    };
    FightResultPropItem.prototype.reset = function () {
        this.prop_spr.spriteFrame = null;
        this.num_lbl.string = "";
    };
    __decorate([
        property(cc.Sprite)
    ], FightResultPropItem.prototype, "color_spr", void 0);
    __decorate([
        property(cc.Sprite)
    ], FightResultPropItem.prototype, "prop_spr", void 0);
    __decorate([
        property(cc.Label)
    ], FightResultPropItem.prototype, "num_lbl", void 0);
    FightResultPropItem = __decorate([
        ccclass
    ], FightResultPropItem);
    return FightResultPropItem;
}(ListViewItem_1.ListViewItem));

cc._RF.pop();