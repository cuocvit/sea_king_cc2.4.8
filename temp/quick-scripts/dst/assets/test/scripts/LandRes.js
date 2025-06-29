
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/test/scripts/LandRes.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcdGVzdFxcc2NyaXB0c1xcTGFuZFJlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBd0Q7QUFHbEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0IsMkJBQVk7SUFBbEM7UUFBQSxxRUFvRUM7UUFsRVcsWUFBTSxHQUFhLElBQUksQ0FBQztRQUd4QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3pCLGFBQU8sR0FBYyxJQUFJLENBQUM7UUFHMUIsb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFHL0IsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixrQkFBWSxHQUFnQixFQUFFLENBQUM7UUFFL0IsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixTQUFHLEdBQXFDLElBQUksQ0FBQztRQUM3QyxlQUFTLEdBQWMsSUFBSSxDQUFDO1FBQzVCLGVBQVMsR0FBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQzs7SUE4QzFGLENBQUM7SUE1Q1UsMEJBQVEsR0FBZixVQUFnQixLQUFhLEVBQUUsWUFBb0IsRUFBRSxRQUFpQyxFQUFFLGNBQTBCO1FBQzlHLElBQUksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO1FBQzlCLElBQUksQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFD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QUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0I7SUFDTCxDQUFDO0lBakVEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MkNBQ2E7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2Q0FDZTtJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzRDQUNjO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ3FCO0lBR3ZDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NkNBQ2U7SUFHakM7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7aURBQ2lCO0lBakJyQyxPQUFPO1FBRFosT0FBTztPQUNGLE9BQU8sQ0FvRVo7SUFBRCxjQUFDO0NBcEVELEFBb0VDLENBcEVxQixFQUFFLENBQUMsU0FBUyxHQW9FakM7QUFFRCxrQkFBZSxPQUFPLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1V0aWxzXCI7XHJcbmltcG9ydCBNYXBFZGl0b3IgZnJvbSBcIi4vTWFwRWRpdG9yXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgTGFuZFJlcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxibFR4dDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBsYW5kTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgbGFuZFNwcjogY2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgdHJlZXBhcmVudE5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSB0cmVlTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5QcmVmYWJdKVxyXG4gICAgcHJpdmF0ZSBhbmltTm9kZUxpc3Q6IGNjLlByZWZhYltdID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBfY3VySW5kZXg6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9jYjogKChpbmRleDogbnVtYmVyKSA9PiB2b2lkKSB8IG51bGwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfY2J0YXJnZXQ6IE1hcEVkaXRvciA9IG51bGw7XHJcbiAgICBwcml2YXRlIF90cmVlQW5pbTogbnVtYmVyW10gPSBbMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIDAuNCwgMC41LCAwLjMsIDAuMywgMC4zLCAwLjNdO1xyXG5cclxuICAgIHB1YmxpYyBpbml0RGF0YShpbmRleDogbnVtYmVyLCBjdXJyZW50SW5kZXg6IG51bWJlciwgY2FsbGJhY2s6IChpbmRleDogbnVtYmVyKSA9PiB2b2lkLCBjYWxsYmFja1RhcmdldD86IE1hcEVkaXRvcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2N1ckluZGV4ID0gY3VycmVudEluZGV4O1xyXG4gICAgICAgIHRoaXMuX2NiID0gY2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5fY2J0YXJnZXQgPSBjYWxsYmFja1RhcmdldDtcclxuICAgICAgICB0aGlzLmxhbmROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudHJlZXBhcmVudE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKDAgPT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgKHRoaXMubGFuZE5vZGUuYWN0aXZlID0gITAsXHJcbiAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMubGFuZFNwciwgYy5CdW5kbGVOYW1lLlRFU1QsIFwicmVzL1wiICsgdGhpcy5fY3VySW5kZXgpKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJlZXBhcmVudE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy50cmVlTm9kZS5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVOb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKDEwMCA8IHRoaXMuX2N1ckluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoMTQyIDw9IHRoaXMuX2N1ckluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT0gdGhpcy50cmVlTm9kZS5jaGlsZHJlbkNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZU5vZGUuYWRkQ2hpbGQoY2MuaW5zdGFudGlhdGUodGhpcy5hbmltTm9kZUxpc3RbdGhpcy5fY3VySW5kZXggLSAxNDJdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZU5vZGUuY2hpbGRyZW5bMF0uc2NhbGUgPSB0aGlzLl90cmVlQW5pbVt0aGlzLl9jdXJJbmRleCAtIDE0Ml07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZU5vZGUuY2hpbGRyZW5bMF0ueSA9IDE0MyA9PSB0aGlzLl9jdXJJbmRleCB8fCAxNDQgPT0gdGhpcy5fY3VySW5kZXggfHwgMTQ3ID09IHRoaXMuX2N1ckluZGV4ID8gLTEwIDogMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgxNDkgPD0gdGhpcy5fY3VySW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZU5vZGUuY2hpbGRyZW5bMF0ueSA9IC0xMztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLnRyZWVOb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLCBjLkJ1bmRsZU5hbWUuVEVTVCwgXCJyZXMvaXRlbVwiICsgdGhpcy5fY3VySW5kZXggJSAxMDApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYmxUeHQuc3RyaW5nID0gXCJcIiArIHRoaXMuX2N1ckluZGV4O1xyXG4gICAgICAgIHRoaXMuc2V0U2VsZWN0Q29sb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0U2VsZWN0Q29sb3IoaXNTZWxlY3Q6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm9kZS5jb2xvciA9IGlzU2VsZWN0ID8gY2MuQ29sb3IuUkVEIDogY2MuQ29sb3IuR1JBWTtcclxuICAgICAgICB0aGlzLmxibFR4dC5ub2RlLmNvbG9yID0gaXNTZWxlY3QgPyBjYy5Db2xvci5SRUQgOiBjYy5Db2xvci5CTEFDSztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2soKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NiKHRoaXMuX2N1ckluZGV4ID49IDEwMCA/IHRoaXMuX2N1ckluZGV4ICUgMTAwIDogdGhpcy5fY3VySW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdENvbG9yKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGFuZFJlczsiXX0=