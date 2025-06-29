"use strict";
cc._RF.push(module, 'c12b2XBzJNC0KYokuYE2jmJ', 'PropLockItem');
// start-scene/scripts/PropLockItem.ts

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
// *-*
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PropLockItem = /** @class */ (function (_super) {
    __extends(PropLockItem, _super);
    function PropLockItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemImg = null;
        _this._parent = null;
        _this._itemData = null;
        return _this;
    }
    PropLockItem.prototype.initData = function (type, path) {
        var resourcePath = type == 3 ? "res/build/" + path : "res/" + path;
        this.itemImg.node.scale = type == 3 ? 0.6666667 : 1;
        Utils_1.Utils.async_set_sprite_frame(this.itemImg, Constants_1.BundleName.TEST, resourcePath);
    };
    PropLockItem.prototype.onEnable = function () {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            _this.itemNode.y += event.getDelta().y;
            _this.itemNode.x += event.getDelta().x;
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            _this.node.zIndex;
            _this.itemNode.y = 0;
            _this.itemNode.x = 0;
        }, this);
    };
    PropLockItem.prototype.onDisable = function () { };
    __decorate([
        property(cc.Sprite)
    ], PropLockItem.prototype, "itemImg", void 0);
    PropLockItem = __decorate([
        ccclass
    ], PropLockItem);
    return PropLockItem;
}(cc.Component));
exports.default = PropLockItem;

cc._RF.pop();