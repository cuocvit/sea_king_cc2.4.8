"use strict";
cc._RF.push(module, 'ed423J5qidAg5HGURiVbSeP', 'LadderMyItem');
// ladder/scripts/LadderMyItem.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LadderMyItem = /** @class */ (function (_super) {
    __extends(LadderMyItem, _super);
    function LadderMyItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bg_spr = null;
        _this.star_bg_node = null;
        _this.lv_spr = null;
        _this.name_lbl = null;
        _this.next_lv_star_lbl = null;
        return _this;
    }
    Object.defineProperty(LadderMyItem.prototype, "data", {
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
    LadderMyItem.prototype.update_view = function () { };
    LadderMyItem.prototype.reset = function () {
        if (this.bg_spr)
            this.bg_spr.spriteFrame = null;
        if (this.lv_spr)
            this.lv_spr.spriteFrame = null;
        if (this.next_lv_star_lbl)
            this.next_lv_star_lbl.string = "";
        if (this.name_lbl)
            this.name_lbl.string = "";
    };
    __decorate([
        property(cc.Sprite)
    ], LadderMyItem.prototype, "bg_spr", void 0);
    __decorate([
        property(cc.Node)
    ], LadderMyItem.prototype, "star_bg_node", void 0);
    __decorate([
        property(cc.Sprite)
    ], LadderMyItem.prototype, "lv_spr", void 0);
    __decorate([
        property(cc.Label)
    ], LadderMyItem.prototype, "name_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], LadderMyItem.prototype, "next_lv_star_lbl", void 0);
    LadderMyItem = __decorate([
        ccclass
    ], LadderMyItem);
    return LadderMyItem;
}(ListViewItem_1.ListViewItem));

cc._RF.pop();