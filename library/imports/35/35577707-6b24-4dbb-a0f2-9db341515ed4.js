"use strict";
cc._RF.push(module, '35577cHayRNu6DynbNBUV7U', 'FlyNoticeItem');
// start-scene/scripts/FlyNoticeItem.ts

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
exports.FlyNoticeItem = void 0;
// +-+
var NodePoolItem_1 = require("./NodePoolItem");
var GameManager_1 = require("./GameManager");
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FlyNoticeItem = /** @class */ (function (_super) {
    __extends(FlyNoticeItem, _super);
    function FlyNoticeItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item_spr = null;
        _this.value_lbl = null;
        return _this;
    }
    FlyNoticeItem.prototype.set_data = function (key, num) {
        Utils_1.Utils.async_set_sprite_frame(this.item_spr, Constants_1.BundleName.COMMON, "res/item/" + key);
        this.value_lbl.string = (num > 0 ? "+" : "") + Utils_1.Utils.numFormat(num, 2);
        this.node.runAction(cc.sequence(cc.moveTo(1, this.node.x, this.node.y + 60), cc.callFunc(function () {
            GameManager_1.gm.pool.put(this.node);
        })));
    };
    FlyNoticeItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.value_lbl.string = "";
        this.node.stopAllActions();
    };
    __decorate([
        property(cc.Sprite)
    ], FlyNoticeItem.prototype, "item_spr", void 0);
    __decorate([
        property(cc.Label)
    ], FlyNoticeItem.prototype, "value_lbl", void 0);
    FlyNoticeItem = __decorate([
        ccclass
    ], FlyNoticeItem);
    return FlyNoticeItem;
}(NodePoolItem_1.NodePoolItem));
exports.FlyNoticeItem = FlyNoticeItem;

cc._RF.pop();