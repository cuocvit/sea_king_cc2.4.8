"use strict";
cc._RF.push(module, 'e22bei3BkNGEpb/zI8wlqkG', 'FightDecorationItem');
// fight/scripts/FightDecorationItem.ts

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
exports.FightDecorationItem = void 0;
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var Constants_1 = require("../../start-scene/scripts/Constants");
var Utils_1 = require("../../start-scene/scripts/Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FightDecorationItem = /** @class */ (function (_super) {
    __extends(FightDecorationItem, _super);
    function FightDecorationItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.decoration_node = null;
        _this.decoration_spr = null;
        return _this;
    }
    Object.defineProperty(FightDecorationItem.prototype, "data", {
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
    FightDecorationItem.prototype.update_view = function () {
        var _this = this;
        if (this._data) {
            this.decoration_node.x = this._data.plant_x_offset;
            this.decoration_node.y = this._data.plant_y_offset - 48;
            var decorationConfig = GameManager_1.gm.config.get_row_data("DecorateConfigData", this._data.decoration_id + "");
            if (decorationConfig) {
                if (decorationConfig.animID !== "") {
                    if (this.decoration_node.childrenCount == 0) {
                        GameManager_1.gm.pool.async_get(Constants_1.BundleName.MAP, decorationConfig.animID, NodePoolItem_1.NodePoolItem, function (nodeItem) {
                            if (_this.decoration_node.childrenCount == 0) {
                                _this.decoration_node.addChild(nodeItem.node);
                            }
                        });
                    }
                }
                else {
                    Utils_1.Utils.async_set_sprite_frame(this.decoration_spr, Constants_1.BundleName.TEST, "res/" + decorationConfig.imgID);
                }
            }
        }
    };
    FightDecorationItem.prototype.reset = function () {
        this.decoration_spr.spriteFrame = null;
        GameManager_1.gm.pool.put_children(this.decoration_node);
    };
    FightDecorationItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.reset();
    };
    __decorate([
        property(cc.Node)
    ], FightDecorationItem.prototype, "decoration_node", void 0);
    __decorate([
        property(cc.Sprite)
    ], FightDecorationItem.prototype, "decoration_spr", void 0);
    FightDecorationItem = __decorate([
        ccclass
    ], FightDecorationItem);
    return FightDecorationItem;
}(NodePoolItem_1.NodePoolItem));
exports.FightDecorationItem = FightDecorationItem;

cc._RF.pop();