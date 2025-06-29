"use strict";
cc._RF.push(module, '72985+V6JxDMLIuI6/HFba3', 'LandRes');
// test/scripts/LandRes.ts

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
var Utils_1 = require("../../start-scene/scripts/Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LandRes = /** @class */ (function (_super) {
    __extends(LandRes, _super);
    function LandRes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lblTxt = null;
        _this.landNode = null;
        _this.landSpr = null;
        _this.treeparentNode = null;
        _this.treeNode = null;
        _this.animNodeList = [];
        _this._curIndex = 0;
        _this._cb = null;
        _this._cbtarget = null;
        _this._treeAnim = [0.5, 0.5, 0.5, 0.5, 0.5, 0.4, 0.5, 0.3, 0.3, 0.3, 0.3];
        return _this;
    }
    LandRes.prototype.initData = function (index, currentIndex, callback, callbackTarget) {
        this._curIndex = currentIndex;
        this._cb = callback;
        this._cbtarget = callbackTarget;
        this.landNode.active = false;
        this.treeparentNode.active = false;
        if (0 == index) {
            (this.landNode.active = !0,
                Utils_1.Utils.async_set_sprite_frame(this.landSpr, c.BundleName.TEST, "res/" + this._curIndex));
        }
        else {
            this.treeparentNode.active = true;
            this.treeNode.removeAllChildren();
            this.treeNode.getComponent(cc.Sprite).spriteFrame = null;
            if (100 < this._curIndex) {
                if (142 <= this._curIndex) {
                    if (0 == this.treeNode.childrenCount) {
                        this.treeNode.addChild(cc.instantiate(this.animNodeList[this._curIndex - 142]));
                        this.treeNode.children[0].scale = this._treeAnim[this._curIndex - 142];
                        this.treeNode.children[0].y = 143 == this._curIndex || 144 == this._curIndex || 147 == this._curIndex ? -10 : 0;
                        if (149 <= this._curIndex) {
                            this.treeNode.children[0].y = -13;
                        }
                    }
                }
                else {
                    Utils_1.Utils.async_set_sprite_frame(this.treeNode.getComponent(cc.Sprite), c.BundleName.TEST, "res/item" + this._curIndex % 100);
                }
            }
        }
        this.lblTxt.string = "" + this._curIndex;
        this.setSelectColor();
    };
    LandRes.prototype.setSelectColor = function (isSelect) {
        if (isSelect === void 0) { isSelect = false; }
        this.node.color = isSelect ? cc.Color.RED : cc.Color.GRAY;
        this.lblTxt.node.color = isSelect ? cc.Color.RED : cc.Color.BLACK;
    };
    LandRes.prototype.onClick = function () {
        if (this._cb) {
            this._cb(this._curIndex >= 100 ? this._curIndex % 100 : this._curIndex);
            this.setSelectColor(true);
        }
    };
    __decorate([
        property(cc.Label)
    ], LandRes.prototype, "lblTxt", void 0);
    __decorate([
        property(cc.Node)
    ], LandRes.prototype, "landNode", void 0);
    __decorate([
        property(cc.Sprite)
    ], LandRes.prototype, "landSpr", void 0);
    __decorate([
        property(cc.Node)
    ], LandRes.prototype, "treeparentNode", void 0);
    __decorate([
        property(cc.Node)
    ], LandRes.prototype, "treeNode", void 0);
    __decorate([
        property([cc.Prefab])
    ], LandRes.prototype, "animNodeList", void 0);
    LandRes = __decorate([
        ccclass
    ], LandRes);
    return LandRes;
}(cc.Component));
exports.default = LandRes;

cc._RF.pop();