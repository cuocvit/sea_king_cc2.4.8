"use strict";
cc._RF.push(module, 'daf1dGLuepP2JXCQwd0fpBF', 'MapMgr');
// test/scripts/MapMgr.ts

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
var MapEditor_1 = require("./MapEditor");
var MapItemVo_1 = require("./MapItemVo");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MapMgr = /** @class */ (function (_super) {
    __extends(MapMgr, _super);
    function MapMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.edit1 = null;
        _this.edit2 = null;
        _this.mapNode = null;
        _this.itemNode = null;
        _this.bigMapNode = null;
        _this.num1 = 0;
        _this.num2 = 0;
        _this._mapList = [];
        return _this;
    }
    MapMgr.prototype.onEnable = function () {
        var _this = this;
        this.bigMapNode.on(cc.Node.EventType.TOUCH_MOVE, function (t) {
            _this.bigMapNode.y += t.getDelta().y;
        }, this);
        this.itemNode.removeFromParent();
        this.clearAllNode();
        this._mapList = [];
        var map = cc.sys.localStorage.getItem("mapData_sailing");
        console.log("Map: ", map);
        if (map) {
            var data = JSON.parse(map);
            this.num1 = data.row;
            this.num2 = data.col;
            this._mapList = data.mapData;
            if (!(20 < this.num1 || this.num1 <= 0 || 23 < this.num2 || this.num2 <= 0)) {
                this.mapNode.width = 50 * this.num1, this.clearAllNode();
                for (var num2 = this.bigMapNode.y = 0; num2 < this.num2; num2++) {
                    for (var num1 = 0; num1 < this.num1; num1++) {
                        var instant = cc.instantiate(this.itemNode);
                        instant.children[0].getComponent(cc.Label).string = num2 * this.num1 + num1 + "";
                        instant.color = null == data.mapData[num2 * this.num1 + num1] ? cc.Color.WHITE : cc.Color.RED;
                        data.mapData[num2 * this.num1 + num1];
                        this.mapNode.addChild(instant);
                        this.mapNode.children[num2].targetOff(this);
                    }
                }
                for (var index = 0; index < this.mapNode.childrenCount; index++) {
                    (function (index) {
                        _this.mapNode.children[index].targetOff(_this);
                        _this.mapNode.children[index].on(cc.Node.EventType.TOUCH_END, function () {
                            if (_this.mapNode.children[index].color.toString() == cc.Color.WHITE.toString()) {
                                _this.mapNode.children[index].color = cc.Color.RED;
                                var mapItemVo = new MapItemVo_1.MapItemVo;
                                mapItemVo.itemID = index;
                                mapItemVo.itemIndex = 0;
                                mapItemVo.itemImgIndex = 1;
                                mapItemVo.itemYOffset = 9;
                                mapItemVo.itemTreeId = 0;
                                mapItemVo.itemTreeX = 0;
                                mapItemVo.itemTreeY = 76;
                                mapItemVo.isObstruct = 0;
                                _this._mapList[index] = mapItemVo;
                            }
                            else {
                                _this.mapNode.children[index].color = cc.Color.WHITE;
                                _this._mapList[index] = null;
                            }
                        }, _this);
                    })(index);
                }
            }
        }
    };
    MapMgr.prototype.onDisable = function () { };
    MapMgr.prototype.clearAllNode = function () {
        var _this = this;
        this.mapNode.children.forEach(function (child) {
            child.targetOff(_this);
            child.destroy();
            child.removeFromParent();
        });
        this.mapNode.removeAllChildren();
        this.edit1.string = "0";
        this.edit2.string = "0";
    };
    MapMgr.prototype.onClickNewEdit = function () {
        var _this = this;
        this.num1 = parseInt(this.edit1.string);
        this.num2 = parseInt(this.edit2.string);
        if (!(20 < this.num1 || this.num1 <= 0 || 23 < this.num2 || this.num2 <= 0)) {
            this.mapNode.width = 50 * this.num1;
            this.clearAllNode();
            for (var num2 = this.bigMapNode.y = 0; num2 < this.num2; num2++) {
                for (var num1 = 0; num1 < this.num1; num1++) {
                    var o = cc.instantiate(this.itemNode);
                    o.children[0].getComponent(cc.Label).string = num2 * this.num1 + num1 + "";
                    o.color = cc.Color.WHITE;
                    this.mapNode.addChild(o);
                    this.mapNode.children[num2].targetOff(this);
                    this._mapList.push(null);
                }
            }
            this.bigMapNode.on(cc.Node.EventType.TOUCH_MOVE, function (t) {
                _this.bigMapNode.y += t.getDelta().y;
            }, this);
            for (var index = 0; index < this.mapNode.childrenCount; index++) {
                (function (index) {
                    _this.mapNode.children[index].on(cc.Node.EventType.TOUCH_END, function () {
                        if (_this.mapNode.children[index].color.toString() == cc.Color.WHITE.toString()) {
                            _this.mapNode.children[index].color = cc.Color.RED;
                            var mapItemVo = new MapItemVo_1.MapItemVo;
                            mapItemVo.itemID = index;
                            mapItemVo.itemIndex = 0;
                            mapItemVo.itemImgIndex = 1;
                            mapItemVo.itemYOffset = 9;
                            mapItemVo.itemTreeId = 0;
                            mapItemVo.itemTreeX = 0;
                            mapItemVo.itemTreeY = 76;
                            mapItemVo.isObstruct = 0;
                            mapItemVo.areaID = 0;
                            _this._mapList[index] = mapItemVo;
                        }
                        else {
                            _this.mapNode.children[index].color = cc.Color.WHITE;
                            _this._mapList[index] = null;
                        }
                    }, _this);
                })(index);
            }
        }
    };
    MapMgr.prototype.onClickCreateMap = function () {
        var itemIndex = 0;
        for (var i = 0; i < this._mapList.length; i++) {
            if (this._mapList[i]) {
                this._mapList[i].itemIndex = itemIndex;
                itemIndex++;
            }
        }
        console.log(this._mapList);
        var mapData = { row: this.num1, col: this.num2, mapData: this._mapList };
        cc.sys.localStorage.setItem("mapData_sailing", JSON.stringify(mapData));
        this.node.parent.getChildByName("MapEdit").getComponent(MapEditor_1.default).initData(this.num1, this.num2, this._mapList);
        this.node.parent.getChildByName("MapEdit").active = true;
        this.node.active = false;
    };
    __decorate([
        property(cc.EditBox)
    ], MapMgr.prototype, "edit1", void 0);
    __decorate([
        property(cc.EditBox)
    ], MapMgr.prototype, "edit2", void 0);
    __decorate([
        property(cc.Node)
    ], MapMgr.prototype, "mapNode", void 0);
    __decorate([
        property(cc.Node)
    ], MapMgr.prototype, "itemNode", void 0);
    __decorate([
        property(cc.Node)
    ], MapMgr.prototype, "bigMapNode", void 0);
    MapMgr = __decorate([
        ccclass
    ], MapMgr);
    return MapMgr;
}(cc.Component));

cc._RF.pop();