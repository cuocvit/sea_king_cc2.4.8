"use strict";
cc._RF.push(module, 'fe784RPy79FmYP2QopWyuCk', 'FightNumItem');
// fight/scripts/FightNumItem.ts

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
exports.FightNumItem = void 0;
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FightNumItem = /** @class */ (function (_super) {
    __extends(FightNumItem, _super);
    function FightNumItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text_lbl = null;
        _this._data = null;
        return _this;
    }
    Object.defineProperty(FightNumItem.prototype, "data", {
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
    FightNumItem.prototype.onEnable = function () {
        if (this._data) {
            cc.tween(this.node)
                .hide()
                .delay(this._data.delay)
                .show()
                .to(0.5, {
                position: cc.v3(this.node.position.x, this.node.position.y + 60),
                opacity: 255
            })
                .removeSelf()
                .start();
        }
    };
    FightNumItem.prototype.update_view = function () {
        if (this._data) {
            var displayText = this._data.num.toString();
            switch (this._data.id) {
                case 0:
                    displayText = "" + this._data.num;
                    break;
                case 1:
                    displayText = "\u66B4\u51FB " + this._data.num;
                    break;
                case 2:
                    displayText = "+" + this._data.num;
                    break;
                default:
                    console.error("NumItem不存在数字类型");
            }
            this.text_lbl.node.color = NUM_COLOR_ARRAY[this._data.id];
            this.text_lbl.string = displayText;
        }
    };
    FightNumItem.prototype.reset = function () {
        this._data = null;
        if (this.text_lbl) {
            this.text_lbl.string = "";
        }
        cc.tween(this.node).stop();
    };
    FightNumItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.reset();
    };
    __decorate([
        property(cc.Label)
    ], FightNumItem.prototype, "text_lbl", void 0);
    FightNumItem = __decorate([
        ccclass
    ], FightNumItem);
    return FightNumItem;
}(NodePoolItem_1.NodePoolItem));
exports.FightNumItem = FightNumItem;
var NUM_COLOR_ARRAY = [
    GameManager_1.gm.const.COLOR_RED,
    GameManager_1.gm.const.COLOR_RED,
    cc.Color.GREEN,
    GameManager_1.gm.const.COLOR_YELLOW
];

cc._RF.pop();