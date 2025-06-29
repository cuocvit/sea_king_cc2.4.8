"use strict";
cc._RF.push(module, '640d8e8JUpJfLo75rWwfWxW', 'ItemRender');
// start-scene/scripts/ItemRender.ts

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
exports.ItemRenderVO = exports.ItemRender = void 0;
// +-+
var ListViewItem_1 = require("./ListViewItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ItemRender = /** @class */ (function (_super) {
    __extends(ItemRender, _super);
    function ItemRender() {
        var _this = _super.call(this) || this;
        _this.select_node = null;
        _this.num_lbl = null;
        return _this;
    }
    Object.defineProperty(ItemRender.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            if (value) {
                this.num_lbl.string = value.id.toString();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ItemRender.prototype, "select", {
        set: function (value) {
            this._select = value;
            if (this.select_node) {
                this.select_node.active = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    ItemRender.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this._data = null;
    };
    __decorate([
        property(cc.Node)
    ], ItemRender.prototype, "select_node", void 0);
    __decorate([
        property(cc.Label)
    ], ItemRender.prototype, "num_lbl", void 0);
    ItemRender = __decorate([
        ccclass
    ], ItemRender);
    return ItemRender;
}(ListViewItem_1.ListViewItem));
exports.ItemRender = ItemRender;
var ItemRenderVO = /** @class */ (function () {
    function ItemRenderVO() {
        this.id = 0;
    }
    return ItemRenderVO;
}());
exports.ItemRenderVO = ItemRenderVO;

cc._RF.pop();