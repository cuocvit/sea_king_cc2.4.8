"use strict";
cc._RF.push(module, '31039U0JJlPXaKM4yOJeoTn', 'MapEditor');
// test/scripts/MapEditor.ts

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
var MapItem_1 = require("./MapItem");
var LandRes_1 = require("./LandRes");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MapEditor = /** @class */ (function (_super) {
    __extends(MapEditor, _super);
    function MapEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.delBtn = null;
        _this.resNode = null;
        _this.mapNode = null;
        _this.mapContent = null;
        _this.mapItem = null;
        _this.treeItem = null;
        _this.mapIDLbl = null;
        _this.mapIndexLbl = null;
        _this.mapImgIDEdit = null;
        _this.mapY = null;
        _this.treeID = null;
        _this.treex = null;
        _this.treey = null;
        _this.isObtrustNode = null;
        _this.selCombNode = null;
        _this.selContent = null;
        _this.attrNode = null;
        _this.areaNode = null;
        _this.landNode = null;
        _this._tempIndex = 1;
        _this._row = 0;
        _this._col = 0;
        _this._mapList = [];
        _this.maxNum = 55;
        _this._plantNum = 53;
        _this._landNum = 42;
        _this._curtxt = 0;
        _this._curType = 0;
        _this._curShowID = 0;
        _this._mapItem = null;
        return _this;
    }
    MapEditor.prototype.initData = function (row, col, mapList) {
        this._row = row;
        this._col = col;
        this._mapList = mapList;
    };
    MapEditor.prototype.initMap = function () {
        this.mapNode.removeAllChildren();
        for (var index = 0; index < this._mapList.length; index++) {
            if (null != this._mapList[index]) {
                var column = index % this._row;
                var row = Math.floor(index / this._row);
                var mapItemNode = cc.instantiate(this.mapItem);
                mapItemNode.getComponent(MapItem_1.default).initData(this._mapList[index], this);
                this.mapNode.addChild(mapItemNode);
                mapItemNode.y = -95 - 51 * row - 20 * column;
                mapItemNode.x = 60 - 31 * row + 75 * column;
            }
        }
        for (var index = 0; index < this.areaNode.childrenCount; index++) {
            this.areaNode.children[index].children[0].children[1].getComponent(cc.Label).string = index + 1 + "";
        }
        for (var index = 0; index < this.maxNum; index++) {
            var n = cc.instantiate(this.landNode);
            this.selContent.addChild(n);
        }
    };
    MapEditor.prototype.onClickAreaID = function (event, areaID) {
        var parsedAreaID = parseInt(areaID);
        event.target.children[0].active = !event.target.children[0].active;
        for (var i = 0; i < this.mapNode.childrenCount; i++) {
            if (this.mapNode.children[i].getComponent(MapItem_1.default)._mapItemData.areaID == parsedAreaID) {
                this.mapNode.children[i].active = event.target.children[0].active;
            }
        }
    };
    MapEditor.prototype.onEnable = function () {
        var _this = this;
        this.initMap();
        this.attrNode.active = false;
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            _this.mapNode.setPosition(_this.mapNode.position.x + event.getDelta().x, _this.mapNode.position.y + event.getDelta().y);
        }, this);
    };
    MapEditor.prototype.onClickShowSprItem = function (event, type) {
        if (this.selCombNode.active) {
            this.selCombNode.active = false;
        }
        else {
            this.selCombNode.active = true;
            var num = "1" == type ? this._plantNum : this._landNum;
            this.selCombNode.y = "1" == type ? 110 : 175;
            this._curType = "1" == type ? 1 : 0;
            this._curtxt = "1" == type ? parseInt(this.treeID.string) + 1 : parseInt(this.mapImgIDEdit.string);
            for (var index = 0; index < this.selContent.childrenCount; index++) {
                this.selContent.children[index].active = index < num;
                if (this.selContent.children[index].active) {
                    this.selContent.children[index].getComponent(LandRes_1.default).initData(parseInt(type), 0 == parseInt(type) ? index + 1 : 100 + index, this.clickSelSprItem.bind(this), this);
                }
            }
            this.selContent.children[this._curtxt - 1].getComponent(LandRes_1.default).setSelectColor(true);
        }
    };
    MapEditor.prototype.clickSelSprItem = function (index) {
        if (0 == this._curType) {
            (this._mapItem.setLandImg(index),
                this.mapImgIDEdit.string = index + "",
                this.selContent.children[this._curtxt - 1].getComponent(LandRes_1.default).setSelectColor(false),
                this._curtxt = index);
        }
        else {
            if (0 == index) {
                this.treex.string = "0";
                this.treey.string = "0";
            }
            this.treeID.string = index.toString();
            this._mapItem.setTreeShowOrHide(index);
            this.selContent.children[this._curtxt - 1].getComponent(LandRes_1.default).setSelectColor(false);
            this._curtxt = index + 1;
        }
    };
    MapEditor.prototype.onClickHideSprItem = function () {
        this.selCombNode.active = false;
    };
    MapEditor.prototype.onClickChangeBg = function (event, bgID) {
        if (this._curShowID != parseInt(bgID))
            for (var index = 0; index < this.mapNode.childrenCount; index++) {
                if (this.mapNode.children[index] && this.mapNode.children[index].getComponent(MapItem_1.default)) {
                    this.mapNode.children[index].getComponent(MapItem_1.default).setImgListBg(parseInt(bgID));
                }
            }
    };
    MapEditor.prototype.onClickPlayAnim = function () {
        var plantID = "let plantID = [";
        var landImgID = "let landImgID = [";
        var landYOffset = "let landYOffset = [";
        var plantXOffset = "let plantXOffset = [";
        var plantYOffset = "let plantYOffset = [";
        for (var r = 0; r < this._mapList.length; r++) {
            if (this._mapList[r]) {
                plantID += this._mapList[r].itemTreeId + ",";
                landImgID += this._mapList[r].itemImgIndex + ",";
                landYOffset += this._mapList[r].itemYOffset + ",";
                plantXOffset += this._mapList[r].itemTreeX + ",";
                plantYOffset += this._mapList[r].itemTreeY + ",";
            }
        }
        plantID += "];";
        landImgID += "];";
        landYOffset += "];";
        plantXOffset += "];";
        plantYOffset += "];";
        console.log(plantID);
        console.log(landImgID);
        console.log(landYOffset);
        console.log(plantXOffset);
        console.log(plantYOffset);
    };
    MapEditor.prototype.onClickMapItem = function (item, data) {
        this._mapItem = item;
        this.attrNode.active = true;
        this.onShowInfo(data);
        if (this.selCombNode.active) {
            var num = 1 == this._curType ? this._plantNum : this._landNum;
            for (var i = 0; i < this.selContent.childrenCount; i++) {
                this.selContent.children[i].active = i < num;
                if (this.selContent.children[i].active) {
                    this.selContent.children[i].getComponent(LandRes_1.default).initData(this._curType, 0 == this._curType ? i + 1 : 100 + i, this.clickSelSprItem.bind(this), this);
                }
            }
            this._curtxt = 0 == this._curType ? parseInt(this.mapImgIDEdit.string) : parseInt(this.treeID.string) + 1;
            this.selContent.children[this._curtxt - 1].getComponent(LandRes_1.default).setSelectColor(true);
        }
    };
    MapEditor.prototype.onShowInfo = function (data) {
        if (this._mapList[data.itemID])
            this._mapList[data.itemID] = data;
        this.mapIDLbl.string = "地块ID" + data.itemIndex;
        this.mapIndexLbl.string = "地图表ID：" + data.itemID;
        this.mapImgIDEdit.string = data.itemImgIndex.toString();
        this.mapY.string = data.itemYOffset.toString();
        this.treeID.string = data.itemTreeId.toString();
        this.treex.string = data.itemTreeX.toString();
        this.treey.string = data.itemTreeY.toString();
        this.isObtrustNode.children[1].active = data.isObstruct == 1;
    };
    MapEditor.prototype.editItemLandImg = function () {
        var imgID = parseInt(this.mapImgIDEdit.string);
        if (imgID >= 0 && imgID <= 24) {
            this._mapItem.setLandImg(imgID);
        }
        else {
            console.log("没有对应的图片ID");
        }
    };
    MapEditor.prototype.editItemLandY = function () {
        var yOffset = parseInt(this.mapY.string);
        this._mapItem.showMapImgY(yOffset);
    };
    MapEditor.prototype.editItemTreeID = function () {
        var treeID = parseInt(this.treeID.string);
        if (treeID === 0) {
            this.treex.string = "0";
            this.treey.string = "0";
        }
        this._mapItem.setTreeShowOrHide(treeID);
    };
    MapEditor.prototype.editItemTreeX = function () {
        var treeX = parseInt(this.treex.string);
        var treeY = parseInt(this.treey.string);
        if (parseInt(this.treeID.string) == 0) {
            this.treex.string = "0";
            this.treey.string = "0";
            return;
        }
        this._mapItem.setTreePos(treeX, treeY);
    };
    MapEditor.prototype.showIsObtrust = function () {
        this.isObtrustNode.children[1].active = !this.isObtrustNode.children[1].active;
        this._mapItem.setIsObtrust(this.isObtrustNode.children[1].active);
    };
    MapEditor.prototype.onClickSave = function () {
        var data = {
            row: this._row,
            col: this._col,
            mapData: this._mapList
        };
        cc.sys.localStorage.setItem("mapData_sailing", JSON.stringify(data));
    };
    MapEditor.prototype.onClickExport = function () {
        var data = {
            row: this._row,
            col: this._col,
            mapData: this._mapList
        };
        var jsonData = JSON.stringify(data);
        cc.sys.localStorage.setItem("mapData_sailing", jsonData);
        Utils_1.Utils.save_json_file("mapData_sailing.json", jsonData);
    };
    __decorate([
        property(cc.Node)
    ], MapEditor.prototype, "delBtn", void 0);
    __decorate([
        property(cc.Node)
    ], MapEditor.prototype, "resNode", void 0);
    __decorate([
        property(cc.Node)
    ], MapEditor.prototype, "mapNode", void 0);
    __decorate([
        property(cc.Node)
    ], MapEditor.prototype, "mapContent", void 0);
    __decorate([
        property(cc.Prefab)
    ], MapEditor.prototype, "mapItem", void 0);
    __decorate([
        property(cc.Prefab)
    ], MapEditor.prototype, "treeItem", void 0);
    __decorate([
        property(cc.Label)
    ], MapEditor.prototype, "mapIDLbl", void 0);
    __decorate([
        property(cc.Label)
    ], MapEditor.prototype, "mapIndexLbl", void 0);
    __decorate([
        property(cc.EditBox)
    ], MapEditor.prototype, "mapImgIDEdit", void 0);
    __decorate([
        property(cc.EditBox)
    ], MapEditor.prototype, "mapY", void 0);
    __decorate([
        property(cc.EditBox)
    ], MapEditor.prototype, "treeID", void 0);
    __decorate([
        property(cc.EditBox)
    ], MapEditor.prototype, "treex", void 0);
    __decorate([
        property(cc.EditBox)
    ], MapEditor.prototype, "treey", void 0);
    __decorate([
        property(cc.Node)
    ], MapEditor.prototype, "isObtrustNode", void 0);
    __decorate([
        property(cc.Node)
    ], MapEditor.prototype, "selCombNode", void 0);
    __decorate([
        property(cc.Node)
    ], MapEditor.prototype, "selContent", void 0);
    __decorate([
        property(cc.Node)
    ], MapEditor.prototype, "attrNode", void 0);
    __decorate([
        property(cc.Node)
    ], MapEditor.prototype, "areaNode", void 0);
    __decorate([
        property(cc.Prefab)
    ], MapEditor.prototype, "landNode", void 0);
    MapEditor = __decorate([
        ccclass
    ], MapEditor);
    return MapEditor;
}(cc.Component));
exports.default = MapEditor;

cc._RF.pop();