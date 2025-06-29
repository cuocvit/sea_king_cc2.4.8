
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/test/scripts/TreeItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '71669mtLtxKMYNCFLdw5n4a', 'TreeItem');
// test/scripts/TreeItem.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TreeItem = /** @class */ (function (_super) {
    __extends(TreeItem, _super);
    function TreeItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lblTxt = null;
        _this._mapIndex = Array.from({ length: 21 }, function () { return []; });
        return _this;
    }
    TreeItem.prototype.initData = function (t, e) {
        var _this = this;
        this.lblTxt.string = "" + e;
        cc.loader.loadRes("texture/Res/item" + (e + 1), cc.SpriteFrame, function (err, spriteFrame) {
            if (!err) {
                _this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
        });
    };
    TreeItem.prototype.onEnable = function () {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            _this.node.y += event.getDelta().y;
            _this.node.x += event.getDelta().x;
        }, this);
    };
    TreeItem.prototype.onDisable = function () {
        this.node.targetOff(this);
    };
    TreeItem.prototype.onClickDel = function () {
        if (this.node) {
            this.node.removeFromParent();
            this.node.destroy();
        }
    };
    __decorate([
        property(cc.Label)
    ], TreeItem.prototype, "lblTxt", void 0);
    TreeItem = __decorate([
        ccclass
    ], TreeItem);
    return TreeItem;
}(cc.Component));
exports.default = TreeItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcdGVzdFxcc2NyaXB0c1xcVHJlZUl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBdUIsNEJBQVk7SUFBbkM7UUFBQSxxRUFnQ0M7UUE5QlcsWUFBTSxHQUFvQixJQUFJLENBQUM7UUFFL0IsZUFBUyxHQUFlLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsY0FBTSxPQUFBLEVBQUUsRUFBRixDQUFFLENBQUMsQ0FBQzs7SUE0QnpFLENBQUM7SUExQlUsMkJBQVEsR0FBZixVQUFnQixDQUFNLEVBQUUsQ0FBUztRQUFqQyxpQkFPQztRQU5HLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUcsQ0FBRyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLHNCQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFFLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFDLEdBQWlCLEVBQUUsV0FBa0M7WUFDaEgsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDTixLQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQzthQUMvRDtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVTLDJCQUFRLEdBQWxCO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsVUFBQyxLQUEwQjtZQUNsRSxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVTLDRCQUFTLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVPLDZCQUFVLEdBQWxCO1FBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBN0JEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NENBQ29CO0lBRnJDLFFBQVE7UUFEYixPQUFPO09BQ0YsUUFBUSxDQWdDYjtJQUFELGVBQUM7Q0FoQ0QsQUFnQ0MsQ0FoQ3NCLEVBQUUsQ0FBQyxTQUFTLEdBZ0NsQztBQUVELGtCQUFlLFFBQVEsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBUcmVlSXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxibFR4dDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9tYXBJbmRleDogbnVtYmVyW11bXSA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDIxIH0sICgpID0+IFtdKTtcclxuXHJcbiAgICBwdWJsaWMgaW5pdERhdGEodDogYW55LCBlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxibFR4dC5zdHJpbmcgPSBgJHtlfWA7XHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoYHRleHR1cmUvUmVzL2l0ZW0ke2UgKyAxfWAsIGNjLlNwcml0ZUZyYW1lLCAoZXJyOiBFcnJvciB8IG51bGwsIHNwcml0ZUZyYW1lOiBjYy5TcHJpdGVGcmFtZSB8IG51bGwpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFlcnIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCAoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnkgKz0gZXZlbnQuZ2V0RGVsdGEoKS55O1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueCArPSBldmVudC5nZXREZWx0YSgpLng7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vZGUudGFyZ2V0T2ZmKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja0RlbCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5ub2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUcmVlSXRlbTsiXX0=