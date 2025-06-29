"use strict";
cc._RF.push(module, 'd0ed7ybOelHw6PsbKMMdwZd', 'NodePoolItem');
// start-scene/scripts/NodePoolItem.ts

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
exports.NodePoolItem = void 0;
// @
var GameObject_1 = require("./GameObject");
var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, disallowMultiple = _a.disallowMultiple;
var NodePoolItem = /** @class */ (function (_super) {
    __extends(NodePoolItem, _super);
    function NodePoolItem() {
        var _this = _super.call(this) || this;
        _this.__can_reuse = true;
        _this.is_can_use = true;
        _this.load_url = "";
        return _this;
    }
    // @
    NodePoolItem.prototype.destroy = function () {
        var t = _super.prototype.destroy.call(this);
        if (this.__can_reuse) {
            this.unuse();
        }
        else if (this.node && this.node.isValid) {
            this.node.destroy();
        }
        return t;
    };
    // @
    NodePoolItem.prototype.reuse = function () {
        this.node.position = cc.Vec3.ZERO;
        this.node.scale = 1;
        this.node.angle = 0;
        this.node.opacity = 255;
        this.node.zIndex = 0;
        this.is_can_use = true;
    };
    // @
    NodePoolItem.prototype.unuse = function () {
        this.is_can_use = false;
    };
    NodePoolItem = __decorate([
        ccclass,
        menu('Adding custom components/NodePoolItem'),
        disallowMultiple
    ], NodePoolItem);
    return NodePoolItem;
}(GameObject_1.GameObject));
exports.NodePoolItem = NodePoolItem;

cc._RF.pop();