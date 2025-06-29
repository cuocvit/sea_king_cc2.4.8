"use strict";
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