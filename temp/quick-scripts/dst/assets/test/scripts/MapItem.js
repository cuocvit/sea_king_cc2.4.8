
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/test/scripts/MapItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4d48aB7aAhOl78KZjdr3tri', 'MapItem');
// test/scripts/MapItem.ts

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
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MapItem = /** @class */ (function (_super) {
    __extends(MapItem, _super);
    function MapItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lblTxt = null;
        _this.landNode = null;
        _this.treeNode = null;
        _this.landBg = null;
        _this.landBgSprList = [];
        _this.animNodeList = [];
        _this._mapEdir = null;
        _this._mapItemData = null; //
        _this._startTime = 0;
        return _this;
    }
    MapItem.prototype.initData = function (mapItemData, mapEdir) {
        this._mapItemData = mapItemData;
        this._mapEdir = mapEdir;
        this.lblTxt.string = "" + this._mapItemData.itemID;
        Utils_1.Utils.async_set_sprite_frame(this.node.children[0].getComponent(cc.Sprite), Constants_1.BundleName.TEST, "res/" + this._mapItemData.itemImgIndex);
        this.treeNode.active = this._mapItemData.itemTreeId > 0;
        this.node.children[0].y = this._mapItemData.itemYOffset;
        this.treeNode.removeAllChildren();
        this.treeNode.getComponent(cc.Sprite).spriteFrame = null;
        if (this.treeNode.active) {
            this.treeNode.x = this._mapItemData.itemTreeX;
            this.treeNode.y = this._mapItemData.itemTreeY;
            if (this._mapItemData.itemTreeId >= 42) {
                if (this.treeNode.childrenCount === 0) {
                    this.treeNode.addChild(cc.instantiate(this.animNodeList[this._mapItemData.itemTreeId - 42]));
                }
            }
            else {
                this._mapItemData.itemTreeY = 72;
                Utils_1.Utils.async_set_sprite_frame(this.treeNode.getComponent(cc.Sprite), Constants_1.BundleName.TEST, "res/item" + this._mapItemData.itemTreeId);
            }
        }
    };
    MapItem.prototype.setImgListBg = function (index) {
        this.landBg.spriteFrame = this.landBgSprList[index];
    };
    MapItem.prototype.setLandImg = function (index) {
        this._mapItemData.itemImgIndex = index;
        Utils_1.Utils.async_set_sprite_frame(this.node.children[0].getComponent(cc.Sprite), Constants_1.BundleName.TEST, "res/" + this._mapItemData.itemImgIndex);
    };
    MapItem.prototype.setTreeShowOrHide = function (treeId) {
        this.treeNode.removeAllChildren();
        this.treeNode.getComponent(cc.Sprite).spriteFrame = null;
        if (treeId <= 0) {
            this.treeNode.active = false;
            this._mapItemData.itemTreeId = 0;
        }
        else {
            this._mapItemData.itemTreeId = treeId;
            this.treeNode.active = true;
            if (treeId >= 42) {
                if (this.treeNode.childrenCount === 0) {
                    this.treeNode.addChild(cc.instantiate(this.animNodeList[treeId - 42]));
                }
            }
            else {
                this._mapItemData.itemTreeY = 72;
                Utils_1.Utils.async_set_sprite_frame(this.treeNode.getComponent(cc.Sprite), Constants_1.BundleName.TEST, "res/item" + this._mapItemData.itemTreeId);
            }
        }
    };
    MapItem.prototype.setIsObtrust = function (isObstruct, showInfo) {
        if (showInfo === void 0) { showInfo = false; }
        this._mapItemData.isObstruct = isObstruct;
        if (showInfo) {
            this._mapEdir.onShowInfo(this._mapItemData);
        }
    };
    MapItem.prototype.setTreePos = function (x, y, showInfo) {
        if (showInfo === void 0) { showInfo = false; }
        this._mapItemData.itemTreeX = x;
        this._mapItemData.itemTreeY = y;
        if (showInfo) {
            this._mapEdir.onShowInfo(this._mapItemData);
        }
    };
    MapItem.prototype.onClickHideTree = function () {
        if (this.treeNode.active) {
            this.treeNode.active = false;
            this._mapItemData.itemTreeId = 0;
            this._mapEdir.onShowInfo(this._mapItemData);
        }
    };
    MapItem.prototype.setMapImgY = function (y, showInfo) {
        if (showInfo === void 0) { showInfo = false; }
        this._mapItemData.itemYOffset = y;
        if (showInfo) {
            this._mapEdir.onShowInfo(this._mapItemData);
        }
    };
    MapItem.prototype.showMapImgY = function (y, showInfo) {
        if (showInfo === void 0) { showInfo = false; }
        this._mapItemData.itemYOffset = y;
        this.node.children[0].y = y;
        if (showInfo) {
            this._mapEdir.onShowInfo(this._mapItemData);
        }
    };
    MapItem.prototype.onEnable = function () {
        var _this = this;
        this.landNode.on(cc.Node.EventType.TOUCH_START, function () {
            _this.onClick();
        }, this);
        this.landNode.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            if (_this.treeNode.active) {
                _this.treeNode.y += event.getDelta().y;
                _this.treeNode.x += event.getDelta().x;
                _this.setTreePos(_this.treeNode.x, _this.treeNode.y, true);
            }
            else {
                _this.node.children[0].y += event.getDelta().y;
                _this.setMapImgY(_this.node.children[0].y, true);
            }
        }, this);
    };
    MapItem.prototype.onDisable = function () {
        this.landNode.targetOff(this);
        this.node.targetOff(this);
    };
    MapItem.prototype.onClickDel = function () {
        if (this.node) {
            this.node.removeFromParent();
            this.node.destroy();
        }
    };
    MapItem.prototype.onClick = function () {
        this._mapEdir.onClickMapItem(this, this._mapItemData);
    };
    __decorate([
        property(cc.Label)
    ], MapItem.prototype, "lblTxt", void 0);
    __decorate([
        property(cc.Node)
    ], MapItem.prototype, "landNode", void 0);
    __decorate([
        property(cc.Node)
    ], MapItem.prototype, "treeNode", void 0);
    __decorate([
        property(cc.Sprite)
    ], MapItem.prototype, "landBg", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], MapItem.prototype, "landBgSprList", void 0);
    __decorate([
        property([cc.Prefab])
    ], MapItem.prototype, "animNodeList", void 0);
    MapItem = __decorate([
        ccclass
    ], MapItem);
    return MapItem;
}(cc.Component));
exports.default = MapItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcdGVzdFxcc2NyaXB0c1xcTWFwSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBd0Q7QUFDeEQsaUVBQWlFO0FBSTNELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNCLDJCQUFZO0lBQWxDO1FBQUEscUVBcUpDO1FBbkpXLFlBQU0sR0FBYSxJQUFJLENBQUM7UUFHeEIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3pCLFlBQU0sR0FBYyxJQUFJLENBQUM7UUFHekIsbUJBQWEsR0FBcUIsRUFBRSxDQUFDO1FBR3JDLGtCQUFZLEdBQWdCLEVBQUUsQ0FBQztRQUUvQixjQUFRLEdBQWMsSUFBSSxDQUFDO1FBQzVCLGtCQUFZLEdBQWMsSUFBSSxDQUFDLENBQUMsRUFBRTtRQUNqQyxnQkFBVSxHQUFXLENBQUMsQ0FBQzs7SUFnSW5DLENBQUM7SUE5SFUsMEJBQVEsR0FBZixVQUFnQixXQUFzQixFQUFFLE9BQWtCO1FBQ3RELElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFRLENBQUM7UUFDbkQsYUFBSyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsc0JBQVUsQ0FBQyxJQUFJLEVBQUUsU0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQWMsQ0FBQyxDQUFDO1FBQ3RJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFH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REMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NkNBQ2U7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzsyQ0FDYTtJQUdqQztRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztrREFDa0I7SUFHN0M7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7aURBQ2lCO0lBakJyQyxPQUFPO1FBRFosT0FBTztPQUNGLE9BQU8sQ0FxSlo7SUFBRCxjQUFDO0NBckpELEFBcUpDLENBckpxQixFQUFFLENBQUMsU0FBUyxHQXFKakM7QUFFRCxrQkFBZSxPQUFPLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvVXRpbHMnO1xyXG5pbXBvcnQgeyBCdW5kbGVOYW1lIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBNYXBJdGVtVm8gfSBmcm9tICcuL01hcEl0ZW1Wbyc7XHJcbmltcG9ydCBNYXBFZGl0b3IgZnJvbSAnLi9NYXBFZGl0b3InO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIE1hcEl0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBsYmxUeHQ6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgbGFuZE5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSB0cmVlTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgbGFuZEJnOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgcHJpdmF0ZSBsYW5kQmdTcHJMaXN0OiBjYy5TcHJpdGVGcmFtZVtdID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5QcmVmYWJdKVxyXG4gICAgcHJpdmF0ZSBhbmltTm9kZUxpc3Q6IGNjLlByZWZhYltdID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBfbWFwRWRpcjogTWFwRWRpdG9yID0gbnVsbDtcclxuICAgIHB1YmxpYyBfbWFwSXRlbURhdGE6IE1hcEl0ZW1WbyA9IG51bGw7IC8vXHJcbiAgICBwcml2YXRlIF9zdGFydFRpbWU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHVibGljIGluaXREYXRhKG1hcEl0ZW1EYXRhOiBNYXBJdGVtVm8sIG1hcEVkaXI6IE1hcEVkaXRvcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21hcEl0ZW1EYXRhID0gbWFwSXRlbURhdGE7XHJcbiAgICAgICAgdGhpcy5fbWFwRWRpciA9IG1hcEVkaXI7XHJcbiAgICAgICAgdGhpcy5sYmxUeHQuc3RyaW5nID0gYCR7dGhpcy5fbWFwSXRlbURhdGEuaXRlbUlEfWA7XHJcbiAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLm5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIEJ1bmRsZU5hbWUuVEVTVCwgYHJlcy8ke3RoaXMuX21hcEl0ZW1EYXRhLml0ZW1JbWdJbmRleH1gKTtcclxuICAgICAgICB0aGlzLnRyZWVOb2RlLmFjdGl2ZSA9IHRoaXMuX21hcEl0ZW1EYXRhLml0ZW1UcmVlSWQgPiAwO1xyXG4gICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblswXS55ID0gdGhpcy5fbWFwSXRlbURhdGEuaXRlbVlPZmZzZXQ7XHJcbiAgICAgICAgdGhpcy50cmVlTm9kZS5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIHRoaXMudHJlZU5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50cmVlTm9kZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy50cmVlTm9kZS54ID0gdGhpcy5fbWFwSXRlbURhdGEuaXRlbVRyZWVYO1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVOb2RlLnkgPSB0aGlzLl9tYXBJdGVtRGF0YS5pdGVtVHJlZVk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbWFwSXRlbURhdGEuaXRlbVRyZWVJZCA+PSA0Mikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJlZU5vZGUuY2hpbGRyZW5Db3VudCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZU5vZGUuYWRkQ2hpbGQoY2MuaW5zdGFudGlhdGUodGhpcy5hbmltTm9kZUxpc3RbdGhpcy5fbWFwSXRlbURhdGEuaXRlbVRyZWVJZCAtIDQyXSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwSXRlbURhdGEuaXRlbVRyZWVZID0gNzI7XHJcbiAgICAgICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMudHJlZU5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIEJ1bmRsZU5hbWUuVEVTVCwgYHJlcy9pdGVtJHt0aGlzLl9tYXBJdGVtRGF0YS5pdGVtVHJlZUlkfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRJbWdMaXN0QmcoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGFuZEJnLnNwcml0ZUZyYW1lID0gdGhpcy5sYW5kQmdTcHJMaXN0W2luZGV4XTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TGFuZEltZyhpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbWFwSXRlbURhdGEuaXRlbUltZ0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLm5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIEJ1bmRsZU5hbWUuVEVTVCwgYHJlcy8ke3RoaXMuX21hcEl0ZW1EYXRhLml0ZW1JbWdJbmRleH1gKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0VHJlZVNob3dPckhpZGUodHJlZUlkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRyZWVOb2RlLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy50cmVlTm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmICh0cmVlSWQgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBJdGVtRGF0YS5pdGVtVHJlZUlkID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBJdGVtRGF0YS5pdGVtVHJlZUlkID0gdHJlZUlkO1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVOb2RlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAodHJlZUlkID49IDQyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmVlTm9kZS5jaGlsZHJlbkNvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlTm9kZS5hZGRDaGlsZChjYy5pbnN0YW50aWF0ZSh0aGlzLmFuaW1Ob2RlTGlzdFt0cmVlSWQgLSA0Ml0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hcEl0ZW1EYXRhLml0ZW1UcmVlWSA9IDcyO1xyXG4gICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLnRyZWVOb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLCBCdW5kbGVOYW1lLlRFU1QsIGByZXMvaXRlbSR7dGhpcy5fbWFwSXRlbURhdGEuaXRlbVRyZWVJZH1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0SXNPYnRydXN0KGlzT2JzdHJ1Y3Q6IGJvb2xlYW4sIHNob3dJbmZvOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tYXBJdGVtRGF0YS5pc09ic3RydWN0ID0gaXNPYnN0cnVjdDtcclxuICAgICAgICBpZiAoc2hvd0luZm8pIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwRWRpci5vblNob3dJbmZvKHRoaXMuX21hcEl0ZW1EYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFRyZWVQb3MoeDogbnVtYmVyLCB5OiBudW1iZXIsIHNob3dJbmZvOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tYXBJdGVtRGF0YS5pdGVtVHJlZVggPSB4O1xyXG4gICAgICAgIHRoaXMuX21hcEl0ZW1EYXRhLml0ZW1UcmVlWSA9IHk7XHJcbiAgICAgICAgaWYgKHNob3dJbmZvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcEVkaXIub25TaG93SW5mbyh0aGlzLl9tYXBJdGVtRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja0hpZGVUcmVlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnRyZWVOb2RlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXBJdGVtRGF0YS5pdGVtVHJlZUlkID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fbWFwRWRpci5vblNob3dJbmZvKHRoaXMuX21hcEl0ZW1EYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRNYXBJbWdZKHk6IG51bWJlciwgc2hvd0luZm86IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21hcEl0ZW1EYXRhLml0ZW1ZT2Zmc2V0ID0geTtcclxuICAgICAgICBpZiAoc2hvd0luZm8pIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwRWRpci5vblNob3dJbmZvKHRoaXMuX21hcEl0ZW1EYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dNYXBJbWdZKHk6IG51bWJlciwgc2hvd0luZm86IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21hcEl0ZW1EYXRhLml0ZW1ZT2Zmc2V0ID0geTtcclxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0ueSA9IHk7XHJcbiAgICAgICAgaWYgKHNob3dJbmZvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hcEVkaXIub25TaG93SW5mbyh0aGlzLl9tYXBJdGVtRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxhbmROb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25DbGljaygpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLmxhbmROb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIChldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmVlTm9kZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJlZU5vZGUueSArPSBldmVudC5nZXREZWx0YSgpLnk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWVOb2RlLnggKz0gZXZlbnQuZ2V0RGVsdGEoKS54O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUcmVlUG9zKHRoaXMudHJlZU5vZGUueCwgdGhpcy50cmVlTm9kZS55LCB0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblswXS55ICs9IGV2ZW50LmdldERlbHRhKCkueTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TWFwSW1nWSh0aGlzLm5vZGUuY2hpbGRyZW5bMF0ueSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGFuZE5vZGUudGFyZ2V0T2ZmKHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS50YXJnZXRPZmYodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrRGVsKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21hcEVkaXIub25DbGlja01hcEl0ZW0odGhpcywgdGhpcy5fbWFwSXRlbURhdGEpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYXBJdGVtOyJdfQ==