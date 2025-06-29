"use strict";
cc._RF.push(module, 'bf144i/RJlCFYD/H6eHO1bp', 'FightPropItem');
// fight/scripts/FightPropItem.ts

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
exports.FightPropItem = void 0;
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var Utils_1 = require("../../start-scene/scripts/Utils");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FightPropItem = /** @class */ (function (_super) {
    __extends(FightPropItem, _super);
    function FightPropItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prop_spr = null;
        _this.num_lbl = null;
        return _this;
    }
    Object.defineProperty(FightPropItem.prototype, "data", {
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
    FightPropItem.prototype.update_view = function () {
        var _this = this;
        var itemData = GameManager_1.gm.config.get_row_data("ItemConfigData", this._data.id.toString());
        if (itemData) {
            if (itemData.anim_name == "") {
                Utils_1.Utils.async_set_sprite_frame(this.prop_spr, Constants_1.BundleName.MAP, "res/" + this._data.id);
                GameManager_1.gm.pool.put_children(this.prop_spr.node);
            }
            else {
                this.prop_spr.spriteFrame = null;
                GameManager_1.gm.pool.put_children(this.prop_spr.node);
                GameManager_1.gm.pool.async_get(Constants_1.BundleName.MAP, "prefabs/item/" + itemData.anim_name, NodePoolItem_1.NodePoolItem, function (item) {
                    if (_this.prop_spr.node.childrenCount == 0) {
                        _this.prop_spr.node.addChild(item.node);
                        var animation = item.getComponent(cc.Animation);
                        if (animation)
                            animation.play();
                    }
                });
            }
            if (GameManager_1.gm.data.fight_temp_data.is_debug) {
                this.num_lbl.node.active = true;
                this.num_lbl.string = this._data.num.toString();
            }
            else {
                this.num_lbl.node.active = false;
            }
        }
    };
    FightPropItem.prototype.reset = function () {
        if (this.prop_spr)
            this.prop_spr.spriteFrame = null;
        if (this.num_lbl)
            this.num_lbl.string = "";
    };
    __decorate([
        property(cc.Sprite)
    ], FightPropItem.prototype, "prop_spr", void 0);
    __decorate([
        property(cc.Label)
    ], FightPropItem.prototype, "num_lbl", void 0);
    FightPropItem = __decorate([
        ccclass
    ], FightPropItem);
    return FightPropItem;
}(NodePoolItem_1.NodePoolItem));
exports.FightPropItem = FightPropItem;

cc._RF.pop();